import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function Movies({ cards, isLoading }) {
  return(
    <div className="movies">
      <SearchForm />
      <Preloader isLoading={isLoading} />
      <InfoMessages />
      <MoviesCardList cards={cards} />
    </div>
  );
}

export default Movies;