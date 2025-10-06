import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { PokemonList, PokemonGallery, PokemonDetail } from './components';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/gallery" element={<PokemonGallery />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
