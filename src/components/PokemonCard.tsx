import { Pokemon } from '../types/pokemon';
import React from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-400',
  ice: 'bg-cyan-400',
  fighting: 'bg-orange-700',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dark: 'bg-gray-700',
  dragon: 'bg-violet-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const bgColor = typeColors[mainType] || 'bg-gray-400';
  
  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <div
      className={`${bgColor} rounded-xl p-3 cursor-pointer transform transition-transform hover:scale-105 relative overflow-hidden h-32`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div>
          <h3 className="text-white font-bold text-lg capitalize">{pokemon.name}</h3>
          <div className="flex gap-1 mt-1">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="relative self-end mt-auto">
          <span className="absolute -top-12 right-6 text-white/50 font-bold text-sm">
            #{formattedId}
          </span>
          <div className="absolute bottom-[-5px] right-[-16px] w-28 h-28 bg-white/30 rounded-full" />
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-20 h-20 object-contain relative z-10 translate-y-[-15px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;