import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return(
    <section className="finder">
      <div className="container container_presentation">
        <form className="finder__form">
          <input type="text" className="finder__input" required placeholder="Фильм" />
          <button type="submit" className="finder__button"></button>
        </form>
        <label className="finder__label">
          <input type="checkbox" className="finder__checkbox" value="short-movie" />
          <span className="finder__pseudo-item"></span>
          <span className="finder__label-text">Короткометражки</span>
        </label>
        <hr className="finder__line" />
      </div>
    </section>
  );
}

export default SearchForm;