import React from 'react';
import { useHistory  } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm.js';
import './Profile.css';

function Profile() {
  const history = useHistory();

  return(
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Кирилл!</h2>
        <ProfileForm />
        <button className="profile__button-exit" onClick={() => history.push('/')}>
        Выйти из аккаунта</button>
      </div>
    </div>
  );
}

export default Profile;