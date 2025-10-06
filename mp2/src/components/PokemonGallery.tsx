import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon, FilterOption } from '../types/pokemon';
import { fetchPokemonList, fetchPokemonDetails } from '../services/pokemonApi';
import './PokemonGallery.css';

const PokemonGallery: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilters, setTypeFilters] = useState<FilterOption[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const listResponse = await fetchPokemonList(151);
        const pokemonDetails = await fetchPokemonDetails(listResponse.results);
        setPokemonList(pokemonDetails);

        // Extract unique types for filtering
        const allTypes = new Set<string>();
        pokemonDetails.forEach(pokemon => {
          pokemon.types.forEach(type => {
            allTypes.add(type.type.name);
          });
        });

        const typeOptions: FilterOption[] = Array.from(allTypes)
          .sort()
          .map(type => ({ type, selected: false }));
        setTypeFilters(typeOptions);
      } catch (err) {
        setError('Failed to load Pokemon data');
        console.error('Error loading Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    const selectedTypes = typeFilters
      .filter(filter => filter.selected)
      .map(filter => filter.type);

    if (selectedTypes.length === 0) {
      return pokemonList;
    }

    return pokemonList.filter(pokemon =>
      pokemon.types.some(type => selectedTypes.includes(type.type.name))
    );
  }, [pokemonList, typeFilters]);

  const handleTypeFilterChange = (typeName: string) => {
    setTypeFilters(prev =>
      prev.map(filter =>
        filter.type === typeName
          ? { ...filter, selected: !filter.selected }
          : filter
      )
    );
  };

  const clearAllFilters = () => {
    setTypeFilters(prev =>
      prev.map(filter => ({ ...filter, selected: false }))
    );
  };

  const selectAllFilters = () => {
    setTypeFilters(prev =>
      prev.map(filter => ({ ...filter, selected: true }))
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokemon Gallery...</p>
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
    <div className="pokemon-gallery-container">
      <div className="gallery-header">
        <h1>Pokemon Gallery</h1>
        <p className="gallery-description">
          Browse Pokemon by type. Click on any Pokemon to view details.
        </p>
      </div>

      <div className="filter-section">
        <div className="filter-controls">
          <h3>Filter by Type:</h3>
          <div className="filter-buttons">
            <button onClick={selectAllFilters} className="filter-btn select-all">
              Select All
            </button>
            <button onClick={clearAllFilters} className="filter-btn clear-all">
              Clear All
            </button>
          </div>
          <div className="type-filters">
            {typeFilters.map((filter) => (
              <button
                key={filter.type}
                className={`type-filter-btn ${filter.selected ? 'selected' : ''}`}
                onClick={() => handleTypeFilterChange(filter.type)}
              >
                {filter.type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gallery-results">
        <p className="results-count">
          Showing {filteredPokemon.length} of {pokemonList.length} Pokemon
        </p>
        <div className="gallery-grid">
          {filteredPokemon.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="gallery-card"
            >
              <div className="card-image-container">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="gallery-image"
                />
              </div>
              <div className="card-info">
                <h3 className="card-name">
                  #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                </h3>
                <div className="card-types">
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

export default PokemonGallery;
