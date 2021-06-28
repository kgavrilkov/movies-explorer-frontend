import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies() {
  return(
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}

export default SavedMovies;