import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);



  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://www.omdbapi.com/?apikey=f7a56eaa&s=${query}');
      const data = await response.json();


      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
            <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
          </div>
        ))}
      </div>
      <h2>Favorites</h2>
      <div className="favorites">
        {favorites.map((favorite) => 
          <div key={favorite.imdbID} className="favorite">
            <img src={favorite.Poster} alt={favorite.Title} />
            <div className="favorite-info">
              <h2>{favorite.Title}</h2>
              <p>{favorite.Year}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;