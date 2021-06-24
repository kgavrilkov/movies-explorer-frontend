import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { cards } from '../../utils/cards.js';
import { filteredCards } from '../../utils/cards.js';
import './MoviesCardList.css';

function MoviesCardList() {
  const [cardCount, setCardCount] = React.useState(4);

  function handleAddClick() {
    setCardCount(value => value + 4);
  }

  return(
    <Switch>
      <Route path="/movies">
        <section className="cards">
          <div className="container container_cards">
            <div className="cards__container">
              {cards.slice(0, cardCount).map((card, id) => (
                <MoviesCard 
                  card={card}
                  key={id}
                />
              ))}
            </div>
            {cardCount < cards.length ? (
              <button className="cards__add-button" onClick={handleAddClick}>Ещё</button>
            ) : (
              <button style={{visibility: 'hidden'}} className="cards__add-button" onClick={handleAddClick}>Ещё</button>
            )}
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
            <button style={{visibility: 'hidden', marginBottom: '54px'}} className="cards__add-button" onClick={handleAddClick}>Ещё</button>
          </div>
        </section>
      </Route>      
    </Switch>
  );
}

export default MoviesCardList;