import React from 'react';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import useForm from '../../utils/useForm.js';
import './ProfileForm.css';

function ProfileForm() {
  const stateSchema = {
    name: { value: '', error: ''},
    email: { value: '', error: ''},
  };

  const validationStateSchema = {
    name: {
      required: true,
      validator: {
        regEx: /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/,
        error: 'Пожалуйста, используйте только латиницу, кириллицу, пробел или дефис.',
      },
    },
    email: {
      required: true,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: 'Неправильный формат почты. Пожалуйста, попробуйте ещё раз.',
      },
    },
  };

  const { state, handleChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const errorStyle1 = {
    maxWidth: 220,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
    textAlign: 'right',
  };

  return(
    <form className="profile__form" name="edit-profile" noValidate>
      <div className="profile__form-item">
        <label className="profile__label">Имя</label>
        <div className="profile__input-item">
          <input className="profile__input" type="text" name="name" 
          value={state.name.value} onChange={handleChange} required placeholder="Кирилл" />
          {state.name.error && <span style={errorStyle1}>{state.name.error}</span>}
        </div>
      </div>
      <hr className="profile__line" />
      <div className="profile__form-item">
        <label className="profile__label">E-mail</label>
        <div className="profile__input-item">
          <input className="profile__input" type="email" name="email"
          value={state.email.value} onChange={handleChange} required placeholder="kgavrilkov@yandex.ru" />
          {state.email.error && <span style={errorStyle1}>{state.email.error}</span>}
        </div>
      </div>
      <InfoMessages />
      <button className="profile__button" type="submit" name="submit" disabled={disable}>
      Редактировать</button>
    </form>
  );
}

export default ProfileForm;