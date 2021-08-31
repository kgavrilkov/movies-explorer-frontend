import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function SavedMovies({ falseLoading, setFilterText, infoSavedMoviesMessages, handleSearch, handleCheck, savedMovies, saveMovie, deleteMovie, setSavedMovies, setInfoSavedMoviesMessages }) {
  return(
    <div className="saved-movies">
      <SearchForm setFilterText={setFilterText} handleSearch={handleSearch} handleCheck={handleCheck} setSavedMovies={setSavedMovies} setInfoSavedMoviesMessages={setInfoSavedMoviesMessages} />
      {infoSavedMoviesMessages && <InfoMessages falseLoading={falseLoading} infoSavedMoviesMessages={infoSavedMoviesMessages} />}
      <MoviesCardList data={savedMovies} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} />
    </div>
  );
}

export default SavedMovies;