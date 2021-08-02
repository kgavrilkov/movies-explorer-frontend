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
import moviesApi from '../utils/MoviesApi.js';
import mainApi from '../utils/MainApi.js';
import * as auth from '../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const initialData = { name: '', email: '', password: '' }; 
  const [data, setData] = React.useState(initialData); 
  const history = useHistory();
  const [infoMessages, setInfoMessages] = React.useState(false);
  const [infoLoginMessages, setInfoLoginMessages] = React.useState(false);
  const [infoProfileMessages, setInfoProfileMessages] = React.useState(false);
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
  
  const tokenCheck = React.useCallback(() => { 
    const token=localStorage.getItem('token'); 
    if (token) { 
      auth.getContent(token) 
        .then((res) => { 
          if (res) { 
            setLoggedIn(true); 
            setData(res);  
            history.push('/movies'); 
          } 
        }) 
        .catch(() => history.push('/signin')); 
    } 
  }, [history]);

  React.useEffect(() => { 
    tokenCheck(); 
  }, [tokenCheck, loggedIn]);

  const handleRegister = ({ name, email, password }) => { 
    return auth.register(name, email, password).then(res => { 
      if (!res || res.statusCode===400) { 
        new Error('Что-то пошло не так!'); 
      } 
      if (res) {
        history.push('/signin');
        setInfoMessages(false);
        return res;
      } 
    }) 
    .catch((err) => {
      setInfoMessages(true);
    }); 
  };
  
  const handleLogin = ({email, password}) => { 
    return auth.authorize(email, password).then(res => { 
      if (!res || res.statusCode===400) { 
        new Error('Что-то пошло не так!'); 
      } 
      if (res.token) { 
        setLoggedIn(true); 
        auth.getContent(res.token) 
          .then((res) => { 
            if (res) { 
              setData(res) 
            } 
          }) 
          localStorage.setItem('token', res.token); 
      } 
    }) 
    .then(() => history.push('/movies'), setInfoLoginMessages(false)) 
    .catch((err) => {  
      setInfoLoginMessages(true); 
    }); 
  };
  
  const handleSignOut = () => { 
    localStorage.removeItem('token');  
    setLoggedIn(false);
    setFilteredMovies([]); 
    history.push('/'); 
  };

  React.useEffect(() => {
    setIsLoading(true);
    moviesApi.getInitialCards()
      .then((movie) => {
        localStorage.setItem('movies', JSON.stringify(movie));
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке: ${err}`);
        setFalseLoading(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => { 
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getMovies()
        .then(() => {
          setMovies(JSON.parse(localStorage.getItem('movies')));
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке: ${err}`);
          setFalseLoading(true);
        })
        .finally(() => setIsLoading(false));
    }    
  }, [loggedIn]);

   React.useEffect(() => {
    if (location.pathname === ('/movies')) {
      setArr(movies);
      setInfoMoviesMessages(false);
    } else if (location.pathname === ('/saved-movies')) {
      setArr(savedMovies);
      setInfoSavedMoviesMessages(false);
    }
  }, [location.pathname, movies]);

  const handleSearch = (shortMovies) => {
    const filtered = arr.filter((movie) => {
      if (movie.nameRU == null || movie.nameEN == null || movie.director == null || movie.country == null || movie.description ==null) {
        return false
      } else {
        if (shortMovies) {
          return (movie.nameRU.toLowerCase().includes(filterText) && movie.duration <= 40) || (movie.nameEN.toLowerCase().includes(filterText) && movie.duration <= 40) || (movie.director.toLowerCase().includes(filterText) && movie.duration <= 40) || (movie.country.toLowerCase().includes(filterText) && movie.duration <= 40) || (movie.description.toLowerCase().includes(filterText) && movie.duration <= 40)
          } else {
            return movie.nameRU.toLowerCase().includes(filterText) || movie.nameEN.toLowerCase().includes(filterText) || movie.director.toLowerCase().includes(filterText) || movie.country.toLowerCase().includes(filterText) || movie.description.toLowerCase().includes(filterText)
          }  
        } 
    });
    if (filtered.length === 0) {
      setInfoMoviesMessages(true);
      setInfoSavedMoviesMessages(true);
    } else {
      setInfoMoviesMessages(false);
      setInfoSavedMoviesMessages(false);
    }
    if (location.pathname === ('/movies')) {
      setFilteredMovies(filtered);
    } else if (location.pathname === ('/saved-movies')) {
      setSavedMovies(filtered);
    }
  };

  const saveMovie = (movie) => {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch(err => console.log(`Ошибка при сохранении фильма: ${err}`));
  };

  const deleteMovie = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi.deleteMovie(movieId)
      .then((res) => {
        if (res.message === 'Фильм удалён') {
          const newArray = savedMovies.filter((item) => item._id !== movieId);
          setSavedMovies([...newArray]);
        }
      })
      .catch(err => console.log(`Ошибка при удалении фильма: ${err}`));
  };

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo() 
        .then((data) => { 
          setCurrentUser(data);
          setInfoProfileMessages(false); 
        }) 
        .catch((err) => {
          console.log(`Ошибка при загрузке: ${err}`);
          setInfoProfileMessages(true);
        }); 
    }   
  }, [loggedIn]);

  const handleUpdateUser = (info) => { 
    mainApi.setUserInfo(info) 
      .then((data) => { 
        setCurrentUser(data);
        setInfoProfileMessages(false); 
      }) 
      .catch((err) => {
        console.log(`Ошибка при обновлении: ${err}`);
        setInfoProfileMessages(true);
      }); 
  }; 

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
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
            data={filteredMovies}
            handleSearch={handleSearch}
            savedMovies={savedMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
          <ProtectedRoute path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            falseLoading={falseLoading}
            setFilterText={setFilterText}
            infoSavedMoviesMessages={infoSavedMoviesMessages}
            handleSearch={handleSearch}
            savedMovies={savedMovies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
          <ProtectedRoute path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            data={data}
            onUpdateUser={handleUpdateUser}
            infoProfileMessages={infoProfileMessages}
            onSignOut={handleSignOut}
          />
          <Route path="/signup">
            <Register 
              onRegister={handleRegister}
              infoMessages={infoMessages}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
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