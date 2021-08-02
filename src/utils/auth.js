export const BASE_URL='https://api.filman.kirill.nomoredomains.monster'; 
 
const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`); 
 
export const register = (name, email, password) => { 
  return fetch(`${BASE_URL}/signup`, { 
    method: 'POST', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ name, email, password }) 
  }) 
    .then(responseCheck)
}; 
 
export const authorize = (email, password) => { 
  return fetch(`${BASE_URL}/signin`, { 
    method: 'POST', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ email, password }) 
  }) 
    .then(responseCheck) 
    .then((data) => { 
      if (data.token) { 
        localStorage.setItem('token', data.token); 
        return data; 
      } else { 
        return; 
      } 
    }) 
}; 
 
export const getContent = (token) => { 
  return fetch(`${BASE_URL}/users/me`, { 
    method: 'GET', 
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}` 
    } 
  }) 
    .then(responseCheck) 
}; 