import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="container container_description container_presentation">
        <div className="portfolio-content">
          <h3 className="portfolio-title">Портфолио</h3>
          <ul className="portfolio-list">
            <li className="portfolio-item">
              <a className="portfolio-link" href="https://kgavrilkov.github.io/how-to-learn/" 
              target="blank">Статичный сайт</a>
              <a className="portfolio-link" href="https://kgavrilkov.github.io/how-to-learn/" 
              target="blank">↗</a>
            </li>
            <li className="portfolio-item">
              <a className="portfolio-link" href="https://kgavrilkov.github.io/russian-travel/" 
              target="blank">Адаптивный сайт</a>
              <a className="portfolio-link" href="https://kgavrilkov.github.io/russian-travel/" 
              target="blank">↗</a>
            </li>
            <li className="portfolio-item">
              <a className="portfolio-link" href="https://livecon.kirill.nomoredomains.monster/" 
              target="blank">Одностраничное приложение</a>
              <a className="portfolio-link" href="https://livecon.kirill.nomoredomains.monster/" 
              target="blank">↗</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;