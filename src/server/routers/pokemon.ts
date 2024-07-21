import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const formatPokemonName = (name: string) =>
	name.toLowerCase().replace(/\s+/g, "-");

export const pokemonRouter = router({
	getPokemon: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			input = formatPokemonName(input);
			const pokemon = await ctx.prisma.pokemon.findUnique({
				where: { name: input },
				include: {
					pokemonTypes: {
						include: { type: true },
					},
					pokemonMoves: {
						include: { move: true },
					},
					stats: true,
					pokemonAbilities: {
						include: { ability: true },
					},
					pokedexEntries: true,
				},
			});

			if (!pokemon) {
				throw new Error("Pokemon not found");
			}

			return {
				id: pokemon.id,
				name: pokemon.name,
				height: pokemon.height,
				weight: pokemon.weight,
				types: pokemon.pokemonTypes.map((pt) => pt.type),
				moves: pokemon.pokemonMoves.map((pm) => pm.move),
				stats: pokemon.stats,
				sprite: pokemon.sprite,
				cries: pokemon.cries,
				pokedexEntries: pokemon.pokedexEntries,
				abilities: pokemon.pokemonAbilities,
			};
		}),

	getMultiplePokemon: publicProcedure
		.input(z.array(z.string()))
		.query(async ({ ctx, input }) => {
			input = input.map(formatPokemonName);
			const pokemons = await ctx.prisma.pokemon.findMany({
				where: {
					name: {
						in: input,
					},
				},
				include: {
					pokemonTypes: {
						include: { type: true },
					},
					pokemonMoves: {
						include: { move: true },
					},
					stats: true,
					pokemonAbilities: {
						include: { ability: true },
					},
					pokedexEntries: true,
				},
			});

			return pokemons.map((pokemon) => ({
				id: pokemon.id,
				name: pokemon.name,
				types: pokemon.pokemonTypes.map((pt) => pt.type),
				moves: pokemon.pokemonMoves.map((pm) => pm.move),
				stats: pokemon.stats,
				sprite: pokemon.sprite,
				pokedexEntries: pokemon.pokedexEntries,
				abilities: pokemon.pokemonAbilities,
				weight: pokemon.weight,
				height: pokemon.height,
				cries: pokemon.cries,
			}));
		}),

	getAllPokemon: publicProcedure
		.input(
			z
				.object({
					limit: z.number().min(1).max(300).optional().default(300),
					offset: z.number().min(0).optional().default(0),
					type: z.string().optional(),
				})
				.default({}) // Provide a default value for the input object
		)
		.query(async ({ ctx, input = {} }) => {
			try {
				const { limit = 300, offset = 0, type } = input;
				const pokemons = await ctx.prisma.pokemon.findMany({
					where: type
						? {
								pokemonTypes: {
									some: {
										type: {
											name: type,
										},
									},
								},
						  }
						: undefined,
					take: limit,
					skip: offset,
					include: {
						pokemonTypes: {
							include: { type: true },
						},
						pokemonAbilities: {
							include: { ability: true },
						},
						pokemonMoves: {
							include: { move: true },
						},
						stats: true,
					},
					orderBy: {
						id: "asc",
					},
				});

				return pokemons.map((pokemon) => ({
					id: pokemon.id,
					name: pokemon.name,
					types: pokemon.pokemonTypes.map((pt) => pt.type),
					sprite: pokemon.sprite,
					moves: pokemon.pokemonMoves.map((pm) => pm.move),
					stats: pokemon.stats,
					weight: pokemon.weight,
					height: pokemon.height,
					cries: pokemon.cries,
					abilities: pokemon.pokemonAbilities,
				}));
			} catch (error) {
				console.error(error);
				throw new Error("Failed to fetch pokemon");
			}
		}),

	getAllTypes: publicProcedure.query(async ({ ctx }) => {
		const types = await ctx.prisma.type.findMany({
			distinct: ["name"],
			select: { name: true },
		});
		return types.map((type: any) => type.name);
	}),
});
