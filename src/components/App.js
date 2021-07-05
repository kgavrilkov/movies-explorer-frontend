import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header.js';
import Main from './Main/Main.js';
import Movies from './Movies/Movies.js';
import SavedMovies from './SavedMovies/SavedMovies.js';
import Profile from './Profile/Profile.js';
import Register from './Register/Register.js';
import Login from './Login/Login.js';
import PageNotFound from './PageNotFound/PageNotFound.js'; 
import Footer from './Footer/Footer.js'
import api from '../utils/MoviesApi.js';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    api.getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch(err => console.log(`Ошибка при загрузке карточек: ${err}`))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      <Header/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies
          cards={cards}
          isLoading={isLoading}  
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>  
      <Footer />
    </div>
  );
}

export default App;
