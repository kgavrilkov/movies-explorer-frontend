import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const URL = 'https://api.nomoreparties.co';

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  const className = `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`;

  function handleDeleteClick() {
    setIsVisible(false);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч' + minutes + 'м';
  }

  return(
    <Switch>
      <Route path="/movies">
        <div className="card">
          <a className="card__link" href={card.trailerLink} target="blank">
            <img className="card__image" src={`${URL}` + card.image.url} alt={card.nameRU} />
          </a>
          <div className="card__content">
            <h2 className="card__title">{card.nameRU}</h2>
            <button className={className} onClick={handleLikeClick}></button>
            <span className="card__counter">{getTimeFromMins(card.duration)}</span>
          </div>
        </div>
      </Route>
      <Route path="/saved-movies">
        {isVisible && <div className="card">
          <img className="card__image" src={card.image} alt="#" />
          <div className="card__content">
            <h2 className="card__title">{card.name}</h2>
            <button className="card__close-button" onClick={handleDeleteClick}></button>
            <span className="card__counter">{card.duration}</span>
          </div>
        </div>}
      </Route>
    </Switch>
  );
}

export default MoviesCard;