interface PokemonType {
	name: string;
	url: string;
}
interface PokemonMove {
	moveName: string;
	moveUrl: string;
}
interface PokemonStat {
	name: string;
	value: number;
}
interface PokemonAbility {
	name: string;
	url: string;
}

export interface Pokemon {
	types: any;
	pokemon: {
		[x: string]: any;
		id: number;
		name: string;
		types: PokemonType[];
		sprite: string;
		moves: PokemonMove[];
		stats: PokemonStat[];
		weight: number;
		height: number;
		cries: {
			latest: string;
			legacy: string;
		};
		abilities: PokemonAbility[];
		pokedexEntries: {
			pokedex: string;
			entry: string;
		}[];
	};
}
