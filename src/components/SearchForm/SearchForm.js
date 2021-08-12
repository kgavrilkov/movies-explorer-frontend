/* eslint-disable no-unused-vars */
import React from 'react';
import './SearchForm.css';

function SearchForm({ setFilterText, handleSearch, handleCheck }) {
  const [name, setName] = React.useState('');
  const [nameDirty, setNameDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState('Нужно ввести ключевое слово.');
  const [formValid, setFormValid] = React.useState(false);
  const [shortMovies, setShortMovies] =React.useState(false);

  const focusHandler = (evt) => {
    if (evt.target.name) {
      setNameDirty(true);
    } 
  };

  const nameHandler = (evt) => {
    setName(evt.target.value);
    setNameError(false);
    setFilterText(evt.target.value.toLowerCase());
  };

  const errorStyle = {
    marginTop: -10,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
  };

  React.useEffect(() => {
    if (nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch();
    setName('');
  };

  const selectShortMovies = (evt) => {
    if (evt.target.checked) {
      handleCheck();
      setShortMovies(true);
    } else {
      handleSearch();
      setShortMovies(false);
    }
  };

  return(
    <section className="finder">
      <div className="container container_presentation">
        <form className="finder__form" onSubmit={(evt) => handleSubmit(evt)} noValidate>
          <div className="finder__input-section">
            <input className="finder__input" type="text" name="name" 
            value={name} onFocus={evt => focusHandler(evt)} 
            onChange={evt => nameHandler(evt)} required placeholder="Фильм" />
            {(nameDirty && nameError) && <span style={errorStyle}>{nameError}</span>}
          </div>
          <button type="submit" className="finder__button" disabled={!formValid}></button>
        </form>
        <div className="finder__switch-section">
          <input type="checkbox" onChange={evt => selectShortMovies(evt)} />
          <span className="finder__switch-section-title">Короткометражки</span>
        </div>
        <hr className="finder__line" />
      </div>
    </section>
  );
}

export default SearchForm;