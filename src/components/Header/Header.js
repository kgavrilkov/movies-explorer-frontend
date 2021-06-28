import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation.js';
import './Header.css';

function Header() {
  return(
    <Switch>
      <Route exact path="/">
        <header className="header">
          <div className="header__container">
            <img className="logo" src={logoPath} alt="Логотип" />
            <Navigation />
          </div>  
        </header>
      </Route>
      <Route path="/(movies|saved-movies|profile)">
        <header className="header header_dark">
          <div className="header__container">
            <Link className="header__link" to="/">
              <img className="logo" src={logoPath} alt="Логотип" />
            </Link>
            <Navigation />
          </div>  
        </header>
      </Route>
      <Route path="/(signup|signin)">
        <header className="header header_signup-signin">
          <div className="header__container header__container_signup-signin">
            <Link className="header__link" to="/">
              <img className="logo" style={{margin: 0}} src={logoPath} alt="Логотип" />
            </Link>
            <Route path="/signup"><h2 className="header__title">Добро пожаловать!</h2></Route>
            <Route path="/signin"><h2 className="header__title">Рады видеть!</h2></Route>
          </div>  
        </header>
      </Route>
    </Switch>
  );
}

export default Header;