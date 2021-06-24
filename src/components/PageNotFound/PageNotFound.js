import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const history = useHistory();

  return(
    <div className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">
          <span>404</span>Страница не найдена
        </h2>
        <button className="not-found__button" onClick={() => history.goBack()}>Назад</button>
      </div>
    </div>
  );
}

export default PageNotFound;