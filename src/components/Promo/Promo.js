import React from 'react';
import iconPath from '../../images/icon.svg';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__content">
          <img className="promo__icon" src={iconPath} alt="Эмблема факультета" />
          <h1 className="promo__title">Учебный проект студента факультета 
          Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше 
          про этот проект и его создателя.</p>
          <a className="promo__link" href="#description">
            <p className="promo__link-content">Узнать больше</p>
          </a>  
        </div>
      </div>
    </section>
  );
}

export default Promo;