import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="description" id="description">
      <div className="container container_description">
        <div className="description__content">
          <div className="heading">
            <h2 className="heading__title">О проекте</h2>
          </div>
          <div className="description__info">  
            <div className="description__info-item">
              <h3 className="description__info-title">Дипломный проект 
              включал 5 этапов</h3>
              <p className="description__info-text">Составление плана, работу 
              над бэкендом, вёрстку, добавление функциональности и финальные 
              доработки.</p>
            </div>
            <div className="description__info-item">
              <h3 className="description__info-title">На выполнение диплома 
              ушло 5 недель</h3>
              <p className="description__info-text">У каждого этапа был мягкий 
              и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно 
              защититься.</p>
            </div>
          </div>
          <div className="description__deadlines">
            <div className="description__deadline">
              <p className="description__deadline-length">1 неделя</p>
            </div>
            <div className="description__deadline description__deadline_backend">
              <p className="description__deadline-length description__deadline-length_backend">
              Back-end  
              </p>
            </div>
            <div className="description__deadline description__deadline_frontend">
              <p className="description__deadline-length description__deadline-length_frontend">
              4 недели  
              </p>
            </div>
            <div className="description__deadline description__deadline_name">
              <p className="description__deadline-length description__deadline-length_name">
              Front-end  
              </p> 
            </div>
          </div>  
        </div>
      </div>
    </section>
  );
}

export default AboutProject;