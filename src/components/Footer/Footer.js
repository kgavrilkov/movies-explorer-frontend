import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <Switch>
      <Route path="/(|movies|saved-movies)">
        <footer className="footer">
          <div className="footer__container">
            <h2 className="footer__heading">Учебный проект Яндекс.Практикум х 
            BeatFilm.</h2>
            <div className="footer__content">
              <p className="footer__copyright">&copy; 2021</p>
              <nav className="footer__links">
                <a className="footer__link" href="https://praktikum.yandex.ru/" 
                target="blank">Яндекс.Практикум</a>
                <a className="footer__link" href="https://github.com/" 
                target="blank">Github</a>
                <a className="footer__link" href="https://www.linkedin.com/" 
                target="blank">LinkedIn</a>
              </nav>
            </div>
          </div>
        </footer>
      </Route>
    </Switch>
  );
}

export default Footer;