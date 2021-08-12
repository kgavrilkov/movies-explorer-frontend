import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList({ data, displayedMovies, allMovies, savedMovies, saveMovie, deleteMovie }) {
  const location = useLocation();

  return(
    <section className="cards">
      <div className="container container_cards">
        <div className="cards__container">
          {data.slice(0, displayedMovies).map((movie, id) => (
            <MoviesCard 
              movie={movie}
              key={id}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))}
        </div>
        {displayedMovies < data.length && <button className={location.pathname === ('/saved-movies') ? "hidden" : "cards__add-button"} onClick={allMovies}>Ещё</button>}
      </div>
    </section>
  );
}

export default MoviesCardList;