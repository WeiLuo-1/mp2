import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import { fetchPokemonById } from '../services/pokemonApi';
import './PokemonDetail.css';

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const pokemonData = await fetchPokemonById(parseInt(id));
        if (pokemonData) {
          setPokemon(pokemonData);
        } else {
          setError('Pokemon not found');
        }
      } catch (err) {
        setError('Failed to load Pokemon details');
        console.error('Error loading Pokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  const handlePrevious = () => {
    if (pokemon && pokemon.id > 1) {
      navigate(`/pokemon/${pokemon.id - 1}`);
    }
  };

  const handleNext = () => {
    if (pokemon && pokemon.id < 151) {
      navigate(`/pokemon/${pokemon.id + 1}`);
    }
  };

  const getStatColor = (statName: string): string => {
    const colors: { [key: string]: string } = {
      'hp': '#ff6b6b',
      'attack': '#ff8e53',
      'defense': '#4ecdc4',
      'special-attack': '#45b7d1',
      'special-defense': '#96ceb4',
      'speed': '#feca57'
    };
    return colors[statName] || '#95a5a6';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokemon details...</p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="error-container">
        <p className="error-message">{error || 'Pokemon not found'}</p>
        <Link to="/" className="back-link">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="pokemon-detail-container">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Search</Link>
        <div className="navigation-controls">
          <button
            onClick={handlePrevious}
            disabled={pokemon.id <= 1}
            className="nav-button prev-button"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={pokemon.id >= 151}
            className="nav-button next-button"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="pokemon-detail-content">
        <div className="pokemon-image-section">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-detail-image"
          />
          <h1 className="pokemon-name">
            #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
          </h1>
        </div>

        <div className="pokemon-info-section">
          <div className="info-grid">
            <div className="info-card">
              <h3>Basic Info</h3>
              <div className="info-item">
                <span className="info-label">Height:</span>
                <span className="info-value">{pokemon.height / 10}m</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight:</span>
                <span className="info-value">{pokemon.weight / 10}kg</span>
              </div>
              <div className="info-item">
                <span className="info-label">Base Experience:</span>
                <span className="info-value">{pokemon.base_experience}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Types</h3>
              <div className="types-container">
                {pokemon.types.map((type, index) => (
                  <span key={index} className={`type-badge type-${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3>Abilities</h3>
              <div className="abilities-container">
                {pokemon.abilities.map((ability, index) => (
                  <span key={index} className="ability-badge">
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h3>Base Stats</h3>
            <div className="stats-container">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-header">
                    <span className="stat-name">{stat.stat.name}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${(stat.base_stat / 150) * 100}%`,
                        backgroundColor: getStatColor(stat.stat.name)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
