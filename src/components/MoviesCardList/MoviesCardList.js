/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

function MoviesCardList({ data, displayedMovies, allMovies, savedMovies, saveMovie, deleteMovie, filtered, setFiltered, setInfoMoviesMessages, setInfoSavedMoviesMessages }) {
  const location = useLocation();

  React.useEffect(() => {
    if (data.length !== 0) {
      setFiltered(true);
      setInfoMoviesMessages(false);
      setInfoSavedMoviesMessages(false);
    } else {
      setFiltered(false);
      setInfoMoviesMessages(true);
      setInfoSavedMoviesMessages(true);
    }
  }, [data]);

  return(
    <section className="cards">
      <div className="container container_cards">
        <div className="cards__container">
          {filtered ? data.slice(0, displayedMovies).map((movie, id) => (
            <MoviesCard 
              movie={movie}
              key={id}
              savedMovies={savedMovies}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          )) : null}
        </div>
        {displayedMovies < data.length && <button className={location.pathname === ('/saved-movies') ? "hidden" : "cards__add-button"} onClick={allMovies}>Ещё</button>}
      </div>
    </section>
  );
}

export default MoviesCardList;