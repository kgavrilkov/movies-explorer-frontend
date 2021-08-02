import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './InfoMessages.css';

function InfoMessages({ falseLoading, infoMoviesMessages, infoSavedMoviesMessages }) {
  const message = falseLoading ? falseLoading && 'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз.' : (infoMoviesMessages && 'Ничего не найдено') || (infoSavedMoviesMessages && 'Ничего не найдено');

  const cssRules = {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 5,
    minHeight: 12,
    padding: 0,
  };

  const cssRules1 = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
  };

  const cssRules2 = {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: -10,
    minHeight: 12,
    padding: 0,
  };

  return (
    <Switch>
      <Route path="/(movies|saved-movies)">
        <div className="info">
          <span className="info__message">{message}</span>
        </div>
      </Route>
      <Route path="/profile">
        <div className="info" style={cssRules}>
          <span className="info__message" style={cssRules1}>Что-то пошло не так...</span>
        </div>
      </Route>
      <Route path="/(signup|signin)">
        <div className="info" style={cssRules2}>
          <span className="info__message" style={cssRules1}>Что-то пошло не так...</span>
        </div>
      </Route>
    </Switch>
  );
}

export default InfoMessages;