import React from 'react';
import { useLocation } from 'react-router-dom';
import { URL } from '../../utils/MainApi.js'
import './MoviesCard.css';

function MoviesCard({ movie, savedMovies, saveMovie, deleteMovie }) {
  const location = useLocation();

  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч' + minutes + 'м';
  };

  const isLiked = savedMovies.some(item => item.movieId === movie.id);

  const className = `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`;

  const toggleMovieState = (movie, isLiked) => {
    isLiked ? saveMovie(movie) : deleteMovie(movie);
  };

  const handleToggleMovieStateClick = () => {
    toggleMovieState(movie, !isLiked);
  };

  const handleDeleteClick = () => {
    deleteMovie(movie);
  };

  return(
    <div className="card">
      <a className="card__link" href={location.pathname === ('/movies') ? movie.trailerLink : movie.trailer} target="blank">
        <img className="card__image" src={location.pathname === ('/movies') ? URL + movie.image.url : movie.image} alt={movie.nameRU} />
      </a>
      <div className="card__content">
        <h2 className="card__title">{movie.nameRU}</h2>
        {location.pathname === ('/movies') && <button className={className} onClick={handleToggleMovieStateClick}></button>}
        {location.pathname === ('/saved-movies') && <button className="card__close-button" onClick={handleDeleteClick}></button>}
        <span className="card__counter">{getTimeFromMins(movie.duration)}</span>
      </div>
    </div> 
  );
}

export default MoviesCard;