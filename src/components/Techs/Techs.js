import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs techs_mobile">
      <div className="container container_description">
        <div className="techs__content">
          <div className="heading">
            <h2 className="heading__title heading__title_techs">Технологии</h2>
          </div>
          <div className="techs__info">
            <h2 className="techs__info-title">7 технологий</h2>
            <p className="techs__info-text">На курсе веб-разработки мы освоили 
            технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__info-list">
              <li className="techs__info-item">
                <p className="techs__info-item-name">HTML</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">CSS</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">JS</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">React</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">Git</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">Express.js</p>
              </li>
              <li className="techs__info-item">
                <p className="techs__info-item-name">mongoDB</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;