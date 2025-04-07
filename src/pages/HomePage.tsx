import { Pokemon, PokemonListResponse } from "../types/pokemon";
import { useEffect, useState } from "react";

import PokemonCard from "../components/PokemonCard";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [nextUrl, setNextUrl] = useState<string | null>(
		"https://pokeapi.co/api/v2/pokemon?limit=20"
	);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const navigate = useNavigate();

	const fetchPokemons = async (url: string, append = false) => {
		try {
			if (append) setIsLoadingMore(true);
			else setLoading(true);

			const response = await fetch(url);
			const data: PokemonListResponse = await response.json();

			const pokemonDetails = await Promise.all(
				data.results.map(async (pokemon) => {
					const res = await fetch(pokemon.url);
					return res.json();
				})
			);

			setPokemons((prev) =>
				append ? [...prev, ...pokemonDetails] : pokemonDetails
			);
			setNextUrl(data.next);
		} catch (error) {
			console.error("Error fetching pokemon:", error);
		} finally {
			setLoading(false);
			setIsLoadingMore(false);
		}
	};

	useEffect(() => {
		if (nextUrl) {
			fetchPokemons(nextUrl);
		}
	}, []);

	const filteredPokemons = pokemons.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleLoadMore = () => {
		if (nextUrl) {
			fetchPokemons(nextUrl, true);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold mb-6">Pokedex</h1>

			<div className="relative mb-6">
				<Search
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					size={20}
				/>
				<input
					type="text"
					placeholder="Search Pokemon..."
					className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
				{filteredPokemons.map((pokemon) => (
					<PokemonCard
						key={pokemon.id}
						pokemon={pokemon}
						onClick={() => navigate(`/detail/${pokemon.id}`)}
					/>
				))}
			</div>

			{nextUrl && !searchTerm && (
				<div className="flex justify-center">
					<button
						onClick={handleLoadMore}
						className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow disabled:opacity-50"
						disabled={isLoadingMore}
					>
						{isLoadingMore ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
		</div>
	);
};

export default HomePage;
