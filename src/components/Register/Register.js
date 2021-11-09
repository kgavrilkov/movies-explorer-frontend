/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import './Register.css';

function Register({ onRegister, isLoading, infoMessages }) {
  const stateSchema = {
    name: { value: '', error: ''},
    email: { value: '', error: ''},
    password: { value: '', error: ''},
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
    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
        error: 'Пароль должен содержать 8 символов: 2 заглавные латинские буквы, 1 специальный символ, 2 цифры и 3 строчные латинские буквы.',
      },
    },
  };

  const errorStyle = {
    marginTop: -10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
  };

  const [state, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);
  const initialData={ name: '', email: '', password: ''}; 
  const [data, setData]=React.useState(initialData); 

  React.useEffect(() => {
    setDisable(true);
  }, []);

  const validateState = React.useCallback(() => {
    const hasErrorInState = Object.keys(validationStateSchema).some(key => {
      const isInputFieldRequired = validationStateSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationStateSchema]);

  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const handleChange = React.useCallback(event => {
    setIsDirty(true);
    
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ 
      ...data, 
      [name]: value, 
    })); 

    let error = '';
    if (validationStateSchema[name].required) {
      if (!value) {
        error = 'Пожалуйста, заполните это поле.';
      }
    }
    if (
      validationStateSchema[name].validator !== null &&
      typeof validationStateSchema[name].validator === 'object'
    ) {
      if (value && !validationStateSchema[name].validator.regEx.test(value)) {
        error = validationStateSchema[name].validator.error;
      }
    }
    setState(prevState => ({
      ...prevState,
      [name]: { value, error },
    }));
  }, [validationStateSchema]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.name || !data.email || !data.password) {
      return; 
    }
    
    onRegister(data)
      .catch(err => {
        console.log(`Некорректно заполнено одно из полей: ${err}`);
      })  
  }

  return(
    <div className="register">
      {isLoading ? <Preloader /> : <form className="form" name="signup" onSubmit={handleSubmit} noValidate>
      <label className="form__label">Имя</label>
      <input className="form__input" type="text" name="name" 
      value={state.name.value} onChange={handleChange} required />
      {state.name.error && <span style={errorStyle}>{state.name.error}</span>}
      <label className="form__label">E-mail</label>
      <input className="form__input" type="email" name="email"
      value={state.email.value} onChange={handleChange} required />
      {state.email.error && <span style={errorStyle}>{state.email.error}</span>}
      <label className="form__label">Пароль</label>
      <input className="form__input" type="password" name="password"
      value={state.password.value} onChange={handleChange} required style={{color: '#EE3465'}} />
      {state.password.error && <span style={errorStyle}>{state.password.error}</span>}
      {infoMessages && <InfoMessages />}
      <button className="form__button" type="submit" name="submit" disabled={disable}>
      Зарегистрироваться</button>
      <p className="form__info">Уже зарегистрированы?
        <Link className="form__link" to="/signin"> Войти</Link>
      </p>
    </form>}
    </div>
  );
}

export default Register;