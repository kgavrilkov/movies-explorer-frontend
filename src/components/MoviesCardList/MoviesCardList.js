import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { filteredCards } from '../../utils/cards.js';
import './MoviesCardList.css';

function MoviesCardList({ cards }) {
  return(
    <Switch>
      <Route path="/movies">
        <section className="cards">
          <div className="container container_cards">
            <div className="cards__container">
              {cards.map((card, id) => (
                <MoviesCard 
                  card={card}
                  key={id}
                />
              ))}
            </div>
            <button className="cards__add-button">Ещё</button>
          </div>
        </section>
      </Route>
      <Route path="/saved-movies">
        <section className="cards">
          <div className="container container_cards">
            <div className="cards__container">
              {filteredCards.map((card, id) => (
                <MoviesCard 
                  card={card}
                  key={id}
                />
              ))}
            </div>
            <button style={{visibility: 'hidden', marginBottom: '54px'}} className="cards__add-button">Ещё</button>
          </div>
        </section>
      </Route>      
    </Switch>
  );
}

export default MoviesCardList;