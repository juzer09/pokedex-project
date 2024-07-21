import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

interface PokemonApiResponse {
	name: string;
	url: string;
}

interface SpeciesResponse {
	flavor_text_entries: {
		flavor_text: string;
		language: { name: string };
		version: { name: string };
	}[];
}

interface PokemonDetail {
	name: string;
	height: number;
	weight: number;
	types: { type: { name: string; url: string } }[];
	stats: { base_stat: number; stat: { name: string } }[];
	moves: { move: { name: string; url: string } }[];
	abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
	sprites: { other: { "official-artwork": { front_default: string } } };
	cries: { latest: string; legacy: string };
	species: { url: string };
	pokedex_entries: { flavor_text: string; language: { name: string } }[];
}

async function fetchPokemonData(limit: number = 1025) {
	const response = await axios.get<{ results: PokemonApiResponse[] }>(
		`https://pokeapi.co/api/v2/pokemon?limit=${limit}`
	);
	return Promise.all(
		response.data.results.map(async (pokemon: PokemonApiResponse) => {
			const detailResponse = await axios.get<PokemonDetail>(pokemon.url);
			const speciesResponse = await axios.get<SpeciesResponse>(
				detailResponse.data.species.url
			);

			return {
				name: pokemon.name,
				height: detailResponse.data.height,
				weight: detailResponse.data.weight,
				types: detailResponse.data.types.map((type) => ({
					name: type.type.name,
					url: type.type.url,
				})),
				abilities: detailResponse.data.abilities.map((ability) => ({
					name: ability.ability.name,
					url: ability.ability.url,
					isHidden: ability.is_hidden,
				})),
				stats: detailResponse.data.stats.map((stat) => ({
					name: stat.stat.name,
					value: stat.base_stat,
				})),
				moves: detailResponse.data.moves.slice(0, 10).map((move) => ({
					name: move.move.name,
					url: move.move.url,
					type: "Normal",
					category: "Physical",
					power: 50,
					accuracy: 100,
				})),
				sprite: detailResponse.data.sprites.other["official-artwork"]
					.front_default,
				cries: detailResponse.data.cries,
				evolutionChainId: null,
				pokedexEntries: speciesResponse.data.flavor_text_entries
					.filter((entry) => entry.language.name === "en")
					.slice(0, 5)
					.map((entry) => ({
						entry: entry.flavor_text.replace(/\f/g, " "),
						version: entry.version.name,
					})),
			};
		})
	);
}

async function main() {
	console.log("Start seeding...");
	const pokemonData = await fetchPokemonData();

	for (const pokemon of pokemonData) {
		// Create or update types
		const types = await Promise.all(
			pokemon.types.map(async (type) => {
				return await prisma.type.upsert({
					where: { name: type.name },
					update: { url: type.url },
					create: { name: type.name, url: type.url },
				});
			})
		);

		// Create or update abilities
		const abilities = await Promise.all(
			pokemon.abilities.map(async (ability) => {
				return await prisma.ability.upsert({
					where: { name: ability.name },
					update: { url: ability.url },
					create: { name: ability.name, url: ability.url },
				});
			})
		);

		// Create or update moves
		const moves = await Promise.all(
			pokemon.moves.map(async (move) => {
				return await prisma.move.upsert({
					where: { name: move.name },
					update: {
						url: move.url,
						type: move.type,
						category: move.category,
						power: move.power,
						accuracy: move.accuracy,
					},
					create: {
						name: move.name,
						url: move.url,
						type: move.type,
						category: move.category,
						power: move.power,
						accuracy: move.accuracy,
					},
				});
			})
		);

		// Create or update Pokemon
		const upsertedPokemon = await prisma.pokemon.upsert({
			where: { name: pokemon.name },
			update: {
				height: pokemon.height,
				weight: pokemon.weight,
				sprite: pokemon.sprite,
				cries: pokemon.cries,
				evolutionChainId: pokemon.evolutionChainId,
				pokemonTypes: {
					deleteMany: {},
					create: types.map((type: any) => ({ typeId: type.id })),
				},
				pokemonAbilities: {
					deleteMany: {},
					create: abilities.map((ability: any, index: any) => ({
						abilityId: ability.id,
						isHidden: pokemon.abilities[index].isHidden,
					})),
				},
				pokemonMoves: {
					deleteMany: {},
					create: moves.map((move: any) => ({ moveId: move.id })),
				},
				stats: {
					deleteMany: {},
					create: pokemon.stats,
				},
				pokedexEntries: {
					deleteMany: {},
					create: pokemon.pokedexEntries,
				},
			},
			create: {
				name: pokemon.name,
				height: pokemon.height,
				weight: pokemon.weight,
				sprite: pokemon.sprite,
				cries: pokemon.cries,
				evolutionChainId: pokemon.evolutionChainId,
				pokemonTypes: {
					create: types.map((type: any) => ({ typeId: type.id })),
				},
				pokemonAbilities: {
					create: abilities.map((ability: any, index: any) => ({
						abilityId: ability.id,
						isHidden: pokemon.abilities[index].isHidden,
					})),
				},
				pokemonMoves: {
					create: moves.map((move: any) => ({ moveId: move.id })),
				},
				stats: {
					create: pokemon.stats,
				},
				pokedexEntries: {
					create: pokemon.pokedexEntries,
				},
			},
		});

		console.log(`Updated pokemon with id: ${upsertedPokemon.id}`);
	}
	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
