import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import { 
  VISIBLE_MOVIES_MOBILE,
  MOVIES_TO_LOAD_MOBILE,
  VISIBLE_MOVIES_TABLET,
  MOVIES_TO_LOAD_TABLET,
  VISIBLE_MOVIES_DESKTOP,
  MOVIES_TO_LOAD_DESKTOP 
} from '../../utils/constants';

function Movies({ isLoading, falseLoading, setFilterText, infoMoviesMessages, data, handleSearch, handleCheck, savedMovies, saveMovie, deleteMovie, setSavedMovies }) {
  const [displayedMovies, setDisplayedMovies] = React.useState('');
  const mobile = useMediaQuery({ query: `(max-width: 320px)` });
  const tablet = useMediaQuery({ query: `(max-width: 768px)` });
  const desktop = useMediaQuery({ query: `(min-width: 769px)` });

  React.useEffect(() => {
    if (tablet) {
      setDisplayedMovies(VISIBLE_MOVIES_TABLET);
    }
    if (desktop) {
      setDisplayedMovies(VISIBLE_MOVIES_DESKTOP);
    }
    if (mobile) {
      setDisplayedMovies(VISIBLE_MOVIES_MOBILE);
    }
  }, [mobile, tablet, desktop]);

  const allMovies = () => {
    if (mobile) {
      setDisplayedMovies(displayedMovies + MOVIES_TO_LOAD_MOBILE);
    }
    if (tablet) {
      setDisplayedMovies(displayedMovies + MOVIES_TO_LOAD_TABLET);
    }
    if (desktop) {
      setDisplayedMovies(displayedMovies + MOVIES_TO_LOAD_DESKTOP);
    }
  };

  return(
    <div className="movies">
      <SearchForm setFilterText={setFilterText} handleSearch={handleSearch} handleCheck={handleCheck} setSavedMovies={setSavedMovies} />
      {isLoading && <Preloader />}
      {infoMoviesMessages && <InfoMessages falseLoading={falseLoading} infoMoviesMessages={infoMoviesMessages} />}
      {falseLoading && <InfoMessages falseLoading={falseLoading} infoMoviesMessages={infoMoviesMessages} />}
      <MoviesCardList data={data} displayedMovies={displayedMovies} allMovies={allMovies} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} />
    </div>
  );
}

export default Movies;