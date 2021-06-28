import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  const className = `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`;

  function handleDeleteClick() {
    setIsVisible(false);
  }

  return(
    <Switch>
      <Route path="/movies">
        <div className="card">
          <img className="card__image" src={card.image} alt="#" />
          <div className="card__content">
            <h2 className="card__title">{card.name}</h2>
            <button className={className} onClick={handleLikeClick}></button>
            <span className="card__counter">{card.duration}</span>
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