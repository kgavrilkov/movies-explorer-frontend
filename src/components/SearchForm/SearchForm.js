import React from 'react';
import './SearchForm.css';

function SearchForm() {
  const [isSwitched, setIsSwitched] = React.useState(false);

  function handleSwitchClick() {
    setIsSwitched(!isSwitched);
  }

  const className = `finder__switch-button ${isSwitched ? 'finder__switch-button_active' : 'finder__switch-button'}`;

  return(
    <section className="finder">
      <div className="container container_presentation">
        <form className="finder__form" noValidate>
          <input type="text" className="finder__input" required placeholder="Фильм" />
          <button type="submit" className="finder__button"></button>
        </form>
        <div className="finder__switch-section">
          <button className={className} onClick={handleSwitchClick}></button>
          <span className="finder__switch-section-title">Короткометражки</span>
        </div>
        <hr className="finder__line" />
      </div>
    </section>
  );
}

export default SearchForm;