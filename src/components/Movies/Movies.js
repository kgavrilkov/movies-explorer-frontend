import React from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

function Movies({ isLoading, falseLoading, setFilterText, infoMoviesMessages, data, handleSearch, savedMovies, saveMovie, deleteMovie }) {
  const [displayedMovies, setDisplayedMovies] = React.useState('');
  const mobile = useMediaQuery({ query: `(max-width: 320px)` });
  const tablet = useMediaQuery({ query: `(max-width: 768px)` });
  const desktop = useMediaQuery({ query: `(min-width: 769px)` });

  React.useEffect(() => {
    if (tablet) {
      setDisplayedMovies(8);
    }
    if (desktop) {
      setDisplayedMovies(16);
    }
    if (mobile) {
      setDisplayedMovies(5);
    }
  }, [mobile, tablet, desktop]);

  const allMovies = () => {
    if (mobile) {
      setDisplayedMovies(displayedMovies + 2);
    }
    if (tablet) {
      setDisplayedMovies(displayedMovies + 2);
    }
    if (desktop) {
      setDisplayedMovies(displayedMovies + 4);
    }
  };

  return(
    <div className="movies">
      <SearchForm setFilterText={setFilterText} handleSearch={handleSearch} />
      {isLoading && <Preloader />}
      {infoMoviesMessages && <InfoMessages falseLoading={falseLoading} infoMoviesMessages={infoMoviesMessages} />}
      {falseLoading && <InfoMessages falseLoading={falseLoading} infoMoviesMessages={infoMoviesMessages} />}
      <MoviesCardList data={data} displayedMovies={displayedMovies} allMovies={allMovies} savedMovies={savedMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} />
    </div>
  );
}

export default Movies;