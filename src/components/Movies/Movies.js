import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function Movies() {
  return(
    <div className="movies">
      <SearchForm />
      <Preloader />
      <InfoMessages />
      <MoviesCardList />
    </div>
  );
}

export default Movies;