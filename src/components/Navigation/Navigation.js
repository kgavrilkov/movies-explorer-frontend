import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isNavigationMenuOpen, setIsNavigationMenuOpen]=React.useState();

  const open = () => {
    setIsNavigationMenuOpen(true);
  }

  const close = () => {
    setIsNavigationMenuOpen(false);
  }

  return(
    <Switch>
      <Route exact path="/">
        <nav className="navigation__list">
          <NavLink className="navigation__link" to="/signup">Регистрация</NavLink>
          <NavLink className="navigation__link" to="/signin">
            <p className="navigation__link-content">Войти</p>
          </NavLink>
        </nav>
      </Route>
      <Route path="/(movies|saved-movies|profile)">
        <div className="navigation__container">
          <nav className="navigation__list navigation__list_movies">
            <NavLink className="navigation__link navigation__link_movies" to="/movies">Фильмы</NavLink>
            <NavLink className="navigation__link navigation__link_saved-movies" to="/saved-movies">Сохранённые фильмы</NavLink>
          </nav>
          <nav className="navigation__list navigation__list_profile">
            <NavLink className="navigation__link navigation__link_profile" to="/profile">Аккаунт</NavLink>
            <div className="navigation__image"></div>
          </nav>  
        </div>
        <button className="navigation__button-open" onClick={open}></button>
        <div className={`navigation__menu ${isNavigationMenuOpen && 'navigation__menu_opened'}`}>
          <div className="navigation__menu-container">
            <div className="navigation__menu-content">
              <nav className="navigation__menu-list">
                <NavLink className="navigation__menu-link" to="/">Главная</NavLink>
                <NavLink className="navigation__menu-link" activeClassName="navigation__menu-link_active" to="/movies">Фильмы</NavLink>
                <NavLink className="navigation__menu-link" activeClassName="navigation__menu-link_active" to="/saved-movies">Сохранённые фильмы</NavLink>
              </nav>
              <nav className="navigation__list navigation__list_menu">
                <NavLink className="navigation__menu-link navigation__menu-link_profile" to="/profile">Аккаунт</NavLink>
                <div className="navigation__image"></div>
              </nav>  
            </div>
            <button className="navigation__menu-button" onClick={close}></button>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default Navigation;