/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoMessages from '../InfoMessages/InfoMessages.js';
import './Profile.css';

function Profile({ onUpdateUser, infoProfileMessages, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const profileNameRef = React.useRef(name);
  const profileEmailRef = React.useRef(email);

  React.useEffect(() => {
    profileNameRef.current.value = name;
    profileEmailRef.current.value = email;
  });
  
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

  const errorStyle1 = {
    maxWidth: 220,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#EE3465',
    textAlign: 'right',
  };

  const [state, setState] = React.useState(stateSchema);
  const [disable, setDisable] = React.useState(true);
  const [isDirty, setIsDirty] = React.useState(false);

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

  const handleNameChange = React.useCallback(event => {
    setIsDirty(true);

    setName(event.target.value);

    const value = event.target.value;

    let error = '';
    if (validationStateSchema.name.required) {
      if (!value) {
        error = 'Пожалуйста, заполните это поле.';
      }
    }
    if (
      validationStateSchema.name.validator !== null &&
      typeof validationStateSchema.name.validator === 'object'
    ) {
      if (value && !validationStateSchema.name.validator.regEx.test(value)) {
        error = validationStateSchema.name.validator.error;
      }
    }
    setState(prevState => ({
      ...prevState,
      name: { value, error },
    })); 
  }, [validationStateSchema]);

  const handleEmailChange = React.useCallback(event => {
    setIsDirty(true);

    setEmail(event.target.value);

    const value = event.target.value;

    let error = '';
    if (validationStateSchema.email.required) {
      if (!value) {
        error = 'Пожалуйста, заполните это поле.';
      }
    }
    if (
      validationStateSchema.email.validator !== null &&
      typeof validationStateSchema.email.validator === 'object'
    ) {
      if (value && !validationStateSchema.email.validator.regEx.test(value)) {
        error = validationStateSchema.email.validator.error;
      }
    }
    setState(prevState => ({
      ...prevState,
      email: { value, error },
    })); 
  }, [validationStateSchema]);


  const handleSubmit = (evt) => { 
    evt.preventDefault();
    onUpdateUser({name, email}) 
  }; 

  return(
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {name}!</h2>
        <form className="profile__form" name="edit-profile" onSubmit={handleSubmit} noValidate>
          <div className="profile__form-item">
            <label className="profile__label">Имя</label>
            <div className="profile__input-item">
              <input className="profile__input" type="text" name="name" ref={profileNameRef}
              value={state.name.value} onChange={handleNameChange} required /> 
              {state.name.error && <span style={errorStyle1}>{state.name.error}</span>}
            </div>
          </div>
          <hr className="profile__line" />
          <div className="profile__form-item">
            <label className="profile__label">E-mail</label>
            <div className="profile__input-item">
              <input className="profile__input" type="email" name="email" ref={profileEmailRef} 
              value={state.email.value} onChange={handleEmailChange} required />
              {state.email.error && <span style={errorStyle1}>{state.email.error}</span>}
            </div>
          </div>
          {infoProfileMessages && <InfoMessages />}
          <button className="profile__button" type="submit" name="submit" disabled={disable}>
          Редактировать</button>
        </form>
        <button className="profile__button-exit" onClick={onSignOut}>
        Выйти из аккаунта</button>
      </div>
    </div>
  );
}

export default Profile;