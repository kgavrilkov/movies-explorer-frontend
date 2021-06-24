import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import useForm from '../../utils/useForm.js';
import '../Form/Form.css';

function LoginForm() {
  const history = useHistory();

  const stateSchema = {
    email: { value: '', error: ''},
    password: { value: '', error: ''},
  };

  const validationStateSchema = {
    email: {
      required: true,
      validator: {
        regEx: /^[^@]+@[^@.]+\.[^@]+$/,
        error: 'Неправильный формат почты. Пожалуйста, попробуйте ещё раз.',
      },
    },
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        error: 'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы.',
      },
    },
  };

  const { state, handleChange, disable } = useForm(
    stateSchema,
    validationStateSchema,
  );

  const errorStyle = {
    marginTop: -10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
  };

  return(
    <form className="form" name="signin" noValidate>
      <label className="form__label">E-mail</label>
      <input className="form__input" type="email" name="email" 
      value={state.email.value} onChange={handleChange} required />
      {state.email.error && <span style={errorStyle}>{state.email.error}</span>}
      <label className="form__label">Пароль</label>
      <input className="form__input" type="password" name="password" 
      value={state.password.value} onChange={handleChange} required style={{color: '#EE3465'}} />
      {state.password.error && <span style={errorStyle}>{state.password.error}</span>}
      <InfoMessages />
      <label className="form__label" style={{visibility: 'hidden'}}>Имя</label>
      <input className="form__input" style={{visibility: 'hidden'}} 
      type="text" name="name" required />
      <button className="form__button" type="submit" name="submit" onClick={() => history.push('/movies')} disabled={disable}>
      Войти</button>
      <p className="form__info">Ещё не зарегистрированы?
        <Link className="form__link" to="/signup"> Регистрация</Link>
      </p>
    </form>
  );
}

export default LoginForm;