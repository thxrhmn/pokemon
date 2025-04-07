import { EvolutionChain, Pokemon, PokemonSpecies } from "../types/pokemon";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PokemonDetail from "../components/PokemonDetail";

const PokemonDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(
		null
	);
	const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAllPokemonData = async () => {
			try {
				setLoading(true);

				const [pokemonResponse, speciesResponse] = await Promise.all([
					fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
					fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
				]);

				const [pokemonData, speciesData] = await Promise.all([
					pokemonResponse.json(),
					speciesResponse.json(),
				]);

				setPokemon(pokemonData);
				setPokemonSpecies(speciesData);

				// Fetch the evolution chain if available
				if (speciesData.evolution_chain?.url) {
					const evolutionResponse = await fetch(
						speciesData.evolution_chain.url
					);
					const evolutionData = await evolutionResponse.json();
					setEvolutionChain(evolutionData);
				}
			} catch (error) {
				console.error("Error fetching pokemon data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllPokemonData();
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (!pokemon) {
		return <div>Pokemon not found</div>;
	}

	return (
		<PokemonDetail
			pokemon={pokemon}
			pokemonSpecies={pokemonSpecies}
			evolutionChain={evolutionChain}
			onBack={() => navigate("/")}
		/>
	);
};

export default PokemonDetailPage;
