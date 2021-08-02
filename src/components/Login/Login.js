/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link } from 'react-router-dom';
import InfoMessages from '../InfoMessages/InfoMessages';
import './Login.css';

function Login({ onLogin, infoLoginMessages }) {
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
  const initialData={ email: '', password: ''} 
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
    if (!data.email || !data.password) { 
      return; 
    } 
     
    onLogin(data) 
      .catch(err => { 
        console.log(`Пользователь с email не найден: ${err}`); 
      }) 
  }

  return(
    <div className="login">
      <form className="form" name="signin" onSubmit={handleSubmit} noValidate>
        <label className="form__label">E-mail</label>
        <input className="form__input" type="email" name="email" 
        value={state.email.value} onChange={handleChange} required />
        {state.email.error && <span style={errorStyle}>{state.email.error}</span>}
        <label className="form__label">Пароль</label>
        <input className="form__input" type="password" name="password" 
        value={state.password.value} onChange={handleChange} required style={{color: '#EE3465'}} />
        {state.password.error && <span style={errorStyle}>{state.password.error}</span>}
        {infoLoginMessages && <InfoMessages />}
        <label className="form__label" style={{visibility: 'hidden'}}>Имя</label>
        <input className="form__input" style={{visibility: 'hidden'}} 
        type="text" name="name" required />
        <button className="form__button" type="submit" name="submit" disabled={disable}>
        Войти</button>
        <p className="form__info">Ещё не зарегистрированы?
          <Link className="form__link" to="/signup"> Регистрация</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;