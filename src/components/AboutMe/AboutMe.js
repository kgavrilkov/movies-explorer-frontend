import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="presentation">
      <div className="container container_description container_presentation">
        <div className="presentation__content">
          <div className="heading">
            <h2 className="heading__title heading__title_presentation">Студент</h2>
          </div>
          <div className="presentation__itself">
            <h2 className="presentation__itself-title">Кирилл</h2>
            <div className="presentation__itself-image"></div>
            <h3 className="presentation__itself-subtitle">Веб-разработчик, 
            48 лет</h3>
            <p className="presentation__itself-text">Я родился и живу в 
            Санкт-Петербурге, закончил экономический факультет СПбГУп. На 
            данный момент у меня есть 10-и летний опыт управления продажами. 
            После того как решил сменить направление деятельности, 
            заинтересовался обучением в Яндекс.Пратикум по профессии 
            веб-разработчик. По окончании курса планирую найти работу в 
            этой сфере. В свободное время люблю читать книги, гулять по 
            городу, а так же заниматься плаванием.</p>
            <nav className="presentation__itself-links">
              <a className="presentation__itself-link" href="https://www.linkedin.com/" 
              target="blank">LinkedIn</a>
              <a className="presentation__itself-link" href="https://github.com/" 
              target="blank">Github</a>
            </nav>
          </div> 
        </div>
      </div>
    </section>
  );
}

export default AboutMe;