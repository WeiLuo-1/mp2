import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Mock data for when API is unavailable
const mockPokemonData: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        }
      }
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
    stats: [
      { base_stat: 45, stat: { name: 'hp' } },
      { base_stat: 49, stat: { name: 'attack' } },
      { base_stat: 49, stat: { name: 'defense' } },
      { base_stat: 65, stat: { name: 'special-attack' } },
      { base_stat: 65, stat: { name: 'special-defense' } },
      { base_stat: 45, stat: { name: 'speed' } }
    ]
  },
  {
    id: 2,
    name: 'ivysaur',
    height: 10,
    weight: 130,
    base_experience: 142,
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
        }
      }
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
    stats: [
      { base_stat: 60, stat: { name: 'hp' } },
      { base_stat: 62, stat: { name: 'attack' } },
      { base_stat: 63, stat: { name: 'defense' } },
      { base_stat: 80, stat: { name: 'special-attack' } },
      { base_stat: 80, stat: { name: 'special-defense' } },
      { base_stat: 60, stat: { name: 'speed' } }
    ]
  }
];

export const fetchPokemonList = async (limit: number = 151): Promise<PokemonListResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    // Return mock data when API fails
    return {
      count: mockPokemonData.length,
      next: null,
      previous: null,
      results: mockPokemonData.map(pokemon => ({
        name: pokemon.name,
        url: `${API_BASE_URL}/pokemon/${pokemon.id}/`
      }))
    };
  }
};

export const fetchPokemonById = async (id: number): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon by ID:', error);
    // Return mock data when API fails
    const mockPokemon = mockPokemonData.find(p => p.id === id);
    return mockPokemon || null;
  }
};

export const fetchPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon by name:', error);
    // Return mock data when API fails
    const mockPokemon = mockPokemonData.find(p => p.name.toLowerCase() === name.toLowerCase());
    return mockPokemon || null;
  }
};

export const fetchPokemonDetails = async (pokemonList: Array<{ name: string; url: string }>): Promise<Pokemon[]> => {
  try {
    const promises = pokemonList.map(async (pokemon) => {
      const id = pokemon.url.split('/').slice(-2, -1)[0];
      return await fetchPokemonById(parseInt(id));
    });
    
    const results = await Promise.all(promises);
    return results.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return mockPokemonData;
  }
};
