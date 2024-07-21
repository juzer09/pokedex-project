import { useRouter } from 'next/router';
import SinglePokemonPage from '../../components/SinglePokemonPage';
import Head from 'next/head';
import NavBar from '@/components/navBar';
import { capitalizeFirstLetter } from '../../inc/global-functions';

const PokemonDetailPage = () => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <>
            <Head>
                <title>{capitalizeFirstLetter(name)} Pokédex: stats, moves, evolution &amp; locations | Pokémon Database</title>
            </Head>
            <NavBar />
            <SinglePokemonPage pokemonName={name as string} />;
        </>
    );
};

export default PokemonDetailPage;