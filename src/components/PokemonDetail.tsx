import { ArrowLeft, Heart } from "lucide-react";
import { EvolutionChain, Pokemon, PokemonSpecies } from "../types/pokemon";
import React, { useState } from "react";

interface PokemonDetailProps {
	pokemon: Pokemon;
	evolutionChain: EvolutionChain | null;
	pokemonSpecies: PokemonSpecies | null;
	onBack: () => void;
}

const typeColors: Record<string, string> = {
	normal: "bg-gray-400",
	fire: "bg-red-400",
	water: "bg-blue-400",
	grass: "bg-green-400",
	electric: "bg-yellow-400",
	ice: "bg-cyan-400",
	fighting: "bg-orange-700",
	poison: "bg-purple-400",
	ground: "bg-yellow-700",
	flying: "bg-indigo-400",
	psychic: "bg-pink-400",
	bug: "bg-lime-500",
	rock: "bg-yellow-800",
	ghost: "bg-purple-700",
	dark: "bg-gray-700",
	dragon: "bg-violet-700",
	steel: "bg-gray-500",
	fairy: "bg-pink-300",
};

type Tab = "about" | "base-stats" | "evolution" | "moves";

const PokemonDetail: React.FC<PokemonDetailProps> = ({
	pokemon,
	onBack,
	evolutionChain,
	pokemonSpecies,
}) => {
	const [activeTab, setActiveTab] = useState<Tab>("about");
	const mainType = pokemon.types[0]?.type.name || "normal";
	const bgColor = typeColors[mainType] || "bg-gray-400";

	const getIdFromUrl = (url: string) => {
		const parts = url.split("/");
		return parts[parts.length - 2];
	};

	return (
		<div className={`min-h-screen ${bgColor}`}>
			<div className="">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<button
							onClick={onBack}
							className="text-white hover:opacity-80"
						>
							<ArrowLeft size={24} />
						</button>
						<button className="text-white hover:opacity-80">
							<Heart size={24} />
						</button>
					</div>

					<div className="flex justify-between items-center mb-4">
						<h1 className="text-4xl font-bold text-white">
							{pokemon.name}
						</h1>
						<span className="text-white opacity-80">
							#{String(pokemon.id).padStart(3, "0")}
						</span>
					</div>

					<div className="flex gap-2 mb-6">
						{pokemon.types.map((type, index) => (
							<span
								key={index}
								className="px-4 py-1 rounded-full bg-white/20 text-white"
							>
								{type.type.name}
							</span>
						))}
					</div>

					<div className="relative mb-4">
						<img
							src={
								pokemon.sprites.other["official-artwork"].front_default
							}
							alt={pokemon.name}
							className="w-64 h-64 mx-auto relative z-10"
						/>
						<div className="absolute inset-0 bg-white/10 rounded-full filter blur-3xl transform scale-75 translate-y-10"></div>
					</div>
				</div>

				<div className="bg-white rounded-t-3xl p-6 mt-8 min-h-[587px]">
					<div className="flex gap-6 mb-6 border-b border-[#e5e7eb]">
						{(["about", "base-stats", "evolution", "moves"] as const).map(
							(tab) => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`pb-4 px-2 ${
										activeTab === tab
											? "text-blue-500 border-b-2 border-blue-500"
											: "text-gray-400"
									}`}
								>
									{tab
										.split("-")
										.map(
											(word) =>
												word.charAt(0).toUpperCase() + word.slice(1)
										)
										.join(" ")}
								</button>
							)
						)}
					</div>

					{activeTab === "about" && (
						<div className="space-y-6">
							<div className="flex gap-10">
								<h3 className="text-gray-500 min-w-[80px]">Species</h3>
								<h3 className="font-medium">{pokemon.species.name}</h3>
							</div>

							<div className="flex gap-10">
								<h3 className="text-gray-500 min-w-[80px]">Height</h3>
								<h3 className="font-medium">
									{`${Math.floor(pokemon.height * 0.328084)}'${((pokemon.height * 0.328084) % 1 * 12).toFixed(1)}"`} 
									({(pokemon.height * 10).toFixed(1)} cm)
								</h3>
							</div>
							<div className="flex gap-10">
								<h3 className="text-gray-500 min-w-[80px]">Weight</h3>
								<h3 className="font-medium">
									{(pokemon.weight * 0.220462).toFixed(2)} lbs 
									({(pokemon.weight * 0.1).toFixed(1)} kg)
								</h3>
							</div>
							

							<div className="flex gap-10">
								<h3 className="text-gray-500 min-w-[80px]">Abilities</h3>
								<h3 className="font-medium capitalize">
									{pokemon.abilities
										.map((a) => a.ability.name)
										.join(", ")}
								</h3>
							</div>

							<div>
								<h3 className="text-lg font-bold mb-4">Breeding</h3>
								<div className="space-y-4">
									<div className="flex gap-10">
										<h4 className="text-gray-500 min-w-[80px]">Gender</h4>
										<div className="flex gap-4">
											<span className="text-blue-500">♂ 87.5%</span>
											<span className="text-pink-500">♀ 12.5%</span>
										</div>
									</div>
									<div className="flex gap-10">
										<h4 className="text-gray-500 min-w-[80px]">Egg Groups</h4>
										<p className="font-medium">
											{pokemonSpecies?.egg_groups
												.map((g) => g.name)
												.join(", ")}
										</p>
									</div>
									{/* <div>
										<h4 className="text-gray-500 mb-1">Egg Cycle</h4>
										<p className="font-medium">Grass</p>
									</div> */}
								</div>
							</div>
						</div>
					)}

					{activeTab === "base-stats" && (
						<div className="space-y-4">
							{pokemon.stats.map((stat, index) => (
								<div key={index}>
									<div className="flex justify-between mb-1">
										<span className="text-gray-600 capitalize">
											{stat.stat.name.replace("-", " ")}
										</span>
										<span className="font-semibold">
											{stat.base_stat}
										</span>
									</div>
									<div className="h-2 bg-gray-200 rounded-full">
										<div
											className={`h-full rounded-full ${
												stat.base_stat < 50
													? "bg-red-500"
													: "bg-green-500"
											}`}
											style={{
												width: `${(stat.base_stat / 255) * 100}%`,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					)}

					{activeTab === "evolution" && (
						<div className="space-y-8">
							{evolutionChain?.chain && (
								<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
									{/* First Evolution */}
									<div className="text-center w-full md:w-auto">
										<img
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
												evolutionChain.chain.species.url
											)}.png`}
											alt={evolutionChain.chain.species.name}
											className="w-24 h-24 md:w-32 md:h-32 mx-auto"
										/>
										<p className="mt-2 capitalize font-medium">
											{evolutionChain.chain.species.name}
										</p>
									</div>

									{evolutionChain.chain.evolves_to.length > 0 && (
										<>
											{/* Evolution Arrow */}
											<div className="flex flex-col items-center">
												<div className="h-8 w-0.5 md:h-0.5 md:w-16 bg-gray-300"></div>
												<span className="text-sm text-gray-500 mt-1">
													Lvl{" "}
													{evolutionChain.chain.evolves_to[0]
														.evolution_details[0]?.min_level ||
														"?"}
												</span>
											</div>

											{/* Second Evolution */}
											<div className="text-center w-full md:w-auto">
												<img
													src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
														evolutionChain.chain.evolves_to[0]
															.species.url
													)}.png`}
													alt={
														evolutionChain.chain.evolves_to[0]
															.species.name
													}
													className="w-24 h-24 md:w-32 md:h-32 mx-auto"
												/>
												<p className="mt-2 capitalize font-medium">
													{
														evolutionChain.chain.evolves_to[0]
															.species.name
													}
												</p>
											</div>

											{evolutionChain.chain.evolves_to[0].evolves_to
												.length > 0 && (
												<>
													{/* Evolution Arrow */}
													<div className="flex flex-col items-center">
														<div className="h-8 w-0.5 md:h-0.5 md:w-16 bg-gray-300"></div>
														<span className="text-sm text-gray-500 mt-1">
															Lvl{" "}
															{evolutionChain.chain.evolves_to[0]
																.evolves_to[0]
																.evolution_details[0]
																?.min_level || "?"}
														</span>
													</div>

													{/* Third Evolution */}
													<div className="text-center w-full md:w-auto">
														<img
															src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIdFromUrl(
																evolutionChain.chain
																	.evolves_to[0].evolves_to[0]
																	.species.url
															)}.png`}
															alt={
																evolutionChain.chain
																	.evolves_to[0].evolves_to[0]
																	.species.name
															}
															className="w-24 h-24 md:w-32 md:h-32 mx-auto"
														/>
														<p className="mt-2 capitalize font-medium">
															{
																evolutionChain.chain
																	.evolves_to[0].evolves_to[0]
																	.species.name
															}
														</p>
													</div>
												</>
											)}
										</>
									)}
								</div>
							)}
						</div>
					)}

					{activeTab === "moves" && (
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{pokemon.moves.map((moveData, index) => (
									<div
										key={index}
										className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
									>
										<h3 className="font-medium capitalize text-gray-800 mb-2">
											{moveData.move.name.replace("-", " ")}
										</h3>
										<div className="space-y-1">
											{moveData.version_group_details.map(
												(detail, detailIndex) => (
													<div
														key={detailIndex}
														className="text-sm text-gray-600"
													>
														<span className="inline-block w-24">
															{detail.move_learn_method.name ===
															"level-up"
																? `Level ${detail.level_learned_at}`
																: detail.move_learn_method.name.replace(
																		"-",
																		" "
																  )}
														</span>
														<span className="capitalize">
															(
															{detail.version_group.name.replace(
																"-",
																" "
															)}
															)
														</span>
													</div>
												)
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PokemonDetail;
