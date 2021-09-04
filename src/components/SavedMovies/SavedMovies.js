import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function SavedMovies({ falseLoading, setFilterText, infoSavedMoviesMessages, handleSearch, savedMovies, saveMovie, deleteMovie, setInfoSavedMoviesMessages, checked, setChecked, filtered, setFiltered, setInfoMoviesMessages }) {
  return(
    <div className="saved-movies">
      <SearchForm setFilterText={setFilterText} handleSearch={handleSearch} setChecked={setChecked} />
      {infoSavedMoviesMessages && <InfoMessages falseLoading={falseLoading} infoSavedMoviesMessages={infoSavedMoviesMessages} />}
      <MoviesCardList data={!checked ? savedMovies : savedMovies.filter(movie => {return movie.duration <= SHORT_MOVIE_DURATION})} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} filtered={filtered} setFiltered={setFiltered} setInfoMoviesMessages={setInfoMoviesMessages} setInfoSavedMoviesMessages={setInfoSavedMoviesMessages} />
    </div>
  );
}

export default SavedMovies;