import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon, SortOption } from '../types/pokemon';
import { fetchPokemonList, fetchPokemonDetails } from '../services/pokemonApi';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'name', direction: 'asc' });

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const listResponse = await fetchPokemonList(151);
        const pokemonDetails = await fetchPokemonDetails(listResponse.results);
        setPokemonList(pokemonDetails);
      } catch (err) {
        setError('Failed to load Pokemon data');
        console.error('Error loading Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortOption.field) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'height':
          aValue = a.height;
          bValue = b.height;
          break;
        case 'weight':
          aValue = a.weight;
          bValue = b.weight;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOption.direction === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [pokemonList, searchQuery, sortOption]);

  const handleSortChange = (field: 'name' | 'id' | 'height' | 'weight') => {
    setSortOption(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokemon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <div className="search-section">
        <h1>Pokemon Search</h1>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search Pokemon by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="sort-controls">
            <label>Sort by:</label>
            <button
              className={`sort-btn ${sortOption.field === 'name' ? 'active' : ''}`}
              onClick={() => handleSortChange('name')}
            >
              Name {sortOption.field === 'name' && (sortOption.direction === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`sort-btn ${sortOption.field === 'id' ? 'active' : ''}`}
              onClick={() => handleSortChange('id')}
            >
              ID {sortOption.field === 'id' && (sortOption.direction === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`sort-btn ${sortOption.field === 'height' ? 'active' : ''}`}
              onClick={() => handleSortChange('height')}
            >
              Height {sortOption.field === 'height' && (sortOption.direction === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`sort-btn ${sortOption.field === 'weight' ? 'active' : ''}`}
              onClick={() => handleSortChange('weight')}
            >
              Weight {sortOption.field === 'weight' && (sortOption.direction === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      <div className="results-section">
        <p className="results-count">
          Showing {filteredAndSortedPokemon.length} of {pokemonList.length} Pokemon
        </p>
        <div className="pokemon-grid">
          {filteredAndSortedPokemon.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="pokemon-card"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <div className="pokemon-info">
                <h3 className="pokemon-name">
                  #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                </h3>
                <div className="pokemon-types">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className={`type-badge type-${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
