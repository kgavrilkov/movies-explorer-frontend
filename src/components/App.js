/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Movies from './Movies/Movies.js';
import SavedMovies from './SavedMovies/SavedMovies.js';
import Profile from './Profile/Profile.js';
import Register from './Register/Register.js';
import Login from './Login/Login.js';
import PageNotFound from './PageNotFound/PageNotFound.js'; 
import Footer from './Footer/Footer.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js';
import * as MoviesApi from '../utils/MoviesApi.js';
import * as MainApi from '../utils/MainApi.js';
import * as auth from '../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const initialData = { email: '', password: '' }; 
  const [data, setData] = React.useState(initialData); 
  const history = useHistory();
  const [infoMessages, setInfoMessages] = React.useState(false);
  const [infoLoginMessages, setInfoLoginMessages] = React.useState(false);
  const [infoProfileMessages, setInfoProfileMessages] = React.useState(false);
  const [infoProfileUpdateMessages, setInfoProfileUpdateMessages] = React.useState(false);
  const [infoMoviesMessages, setInfoMoviesMessages] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [falseLoading, setFalseLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [filterText, setFilterText] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const location = useLocation();
  const [infoSavedMoviesMessages, setInfoSavedMoviesMessages] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [filtered, setFiltered] = React.useState(false);
  
  const tokenCheck = React.useCallback(() => { 
    const token=localStorage.getItem('token'); 
    if (token) { 
      auth.getContent(token) 
        .then((res) => { 
          if (res) { 
            setLoggedIn(true); 
            setData(res);
            if (location.pathname === '/signin') {
              history.push('/movies'); 
            } else if (location.pathname === '/movies') {
              setMovies(JSON.parse(localStorage.getItem('movies')));
              history.push('/movies');
            } else if (location.pathname === '/saved-movies') {
              setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
              history.push('/saved-movies');
            } else if (location.pathname === '/profile') {
              setCurrentUser(JSON.parse(localStorage.getItem('user')));
              history.push('/profile');
            } 
          }
        }) 
        .catch(() => history.push('/signin')); 
    }
  }, [history]);

  React.useEffect(() => {
    tokenCheck(); 
  }, [tokenCheck, loggedIn]);

  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    return auth.register(name, email, password).then(res => { 
      if (!res || res.statusCode===400) { 
        new Error('Что-то пошло не так!'); 
      } 
      if (res) {
        handleLogin({ email, password });
        setInfoMessages(false);
        return res;
      } 
    }) 
    .catch((err) => {
      setInfoMessages(true);
    })
    .finally(() => setIsLoading(false));
  };
  
  const handleLogin = ({email, password}) => {
    setIsLoading(true);
    return auth.authorize(email, password).then(res => {
      if (!res || res.statusCode===400) { 
        new Error('Что-то пошло не так!'); 
      } 
      if (res.token) { 
        setLoggedIn(true); 
        localStorage.setItem('token', res.token);
      }
    }) 
    .then(() => history.push('/movies'), setInfoLoginMessages(false)) 
    .catch((err) => {  
      setInfoLoginMessages(true); 
    })
    .finally(() => setIsLoading(false));
  };
  
  const handleSignOut = () => { 
    localStorage.removeItem('token');  
    setLoggedIn(false);
    localStorage.removeItem('filtered');
    setFilteredMovies([]);
    history.push('/');
  };

  React.useEffect(() => {
    setIsLoading(true);
    MoviesApi.getInitialCards()
      .then((movie) => {
        localStorage.setItem('movies', JSON.stringify(movie));
        setMovies(JSON.parse(localStorage.getItem('movies')));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке: ${err}`);
        setFalseLoading(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        MainApi.getMovies(token),
        MainApi.getUserInfo(token)
      ]).then((values) => {
        const [savedMovies, userInfo] = values;
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);
        setCurrentUser(userInfo);
        setInfoProfileMessages(false);
        localStorage.setItem('user', JSON.stringify(userInfo));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке: ${err}`);
        setInfoProfileMessages(true);
      }) 
      .finally(() => {
        setIsLoading(false);
      });
    }

  }, [loggedIn]);

  React.useEffect(() => {
    if (location.pathname === ('/movies')) { 
      setArr(movies);
      setInfoMoviesMessages(false);
      if (JSON.parse(localStorage.getItem('filtered') !== null)) {
        setFilteredMovies(JSON.parse(localStorage.getItem('filtered')));
      }
    } else if (location.pathname === ('/saved-movies')) {
      console.log(savedMovies);
      setArr(savedMovies);
      setInfoSavedMoviesMessages(false);
    }
  }, [location.pathname]);

  const handleSearch = () => {
    const filtered = arr.filter((movie) => {
      if (movie.nameRU == null || movie.nameEN == null || movie.director == null || movie.country == null || movie.description ==null) {
        return false
      } else {
        return movie.nameRU.toLowerCase().includes(filterText) || movie.nameEN.toLowerCase().includes(filterText) || movie.director.toLowerCase().includes(filterText) || movie.country.toLowerCase().includes(filterText) || movie.description.toLowerCase().includes(filterText) 
        } 
    });
    if (location.pathname === ('/movies')) {
      setFilteredMovies(filtered);
      localStorage.setItem('filtered', JSON.stringify(filtered)); 
    } else if (location.pathname === ('/saved-movies')) {
      setSavedMovies(filtered);
    }
  };

  const saveMovie = (movie) => {
    const token=localStorage.getItem('token');
    MainApi.saveMovie(token, movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch(err => console.log(`Ошибка при сохранении фильма: ${err}`));
  };

  const deleteMovie = (movie) => {
    const token=localStorage.getItem('token');
    let movieId
    if (movie.id) {
      movieId = savedMovies.find((item) => item.movieId === movie.id)._id;
    } else {
      movieId = savedMovies.find((item) => item.movieId === movie.movieId)._id;
    }
    MainApi.deleteMovie(token, movieId)
      .then((res) => {
        if (res.message === 'Фильм удалён') {
          const newArray = savedMovies.filter((item) => item._id !== movieId);
          setSavedMovies([...newArray]);
        }
      })
      .catch(err => console.log(`Ошибка при удалении фильма: ${err}`));
  };

  const handleUpdateUser = (info) => {
    const token=localStorage.getItem('token');
    setIsLoading(true);
    MainApi.setUserInfo(token, info) 
      .then((data) => { 
        setCurrentUser(data);
        setInfoProfileMessages(false);
        setInfoProfileUpdateMessages(true);
        localStorage.setItem('user', JSON.stringify(data)); 
      }) 
      .catch((err) => {
        console.log(`Ошибка при обновлении: ${err}`);
        setInfoProfileMessages(true);
        setInfoProfileUpdateMessages(false);
      })
      .finally(() => setIsLoading(false));
  }; 

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute path="/movies" 
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            falseLoading={falseLoading}
            setFilterText={setFilterText}
            infoMoviesMessages={infoMoviesMessages}
            setInfoMoviesMessages={setInfoMoviesMessages}
            setInfoSavedMoviesMessages={setInfoSavedMoviesMessages}
            data={filteredMovies}
            handleSearch={handleSearch}
            savedMovies={savedMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            checked={checked}
            setChecked={setChecked}
            filtered={filtered}
            setFiltered={setFiltered}
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            falseLoading={falseLoading}
            setFilterText={setFilterText}
            infoSavedMoviesMessages={infoSavedMoviesMessages}
            setInfoSavedMoviesMessages={setInfoSavedMoviesMessages}
            setInfoMoviesMessages={setInfoMoviesMessages}
            handleSearch={handleSearch}
            savedMovies={savedMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            checked={checked}
            setChecked={setChecked}
            filtered={filtered}
            setFiltered={setFiltered}
          />
          <ProtectedRoute path="/profile" 
            component={Profile}
            loggedIn={loggedIn}
            isLoading={isLoading}
            data={data}
            onUpdateUser={handleUpdateUser}
            infoProfileMessages={infoProfileMessages}
            infoProfileUpdateMessages={infoProfileUpdateMessages}
            onSignOut={handleSignOut}
          />
          <Route path="/signup">
            <Register 
              onRegister={handleRegister}
              isLoading={isLoading}
              infoMessages={infoMessages}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              infoLoginMessages={infoLoginMessages} 
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch> 
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;