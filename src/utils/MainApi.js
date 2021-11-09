export const BASE_URL='https://api.filman.kirill.nomoredomains.monster';
export const URL = 'https://api.nomoreparties.co';

export const getResponseData = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
  

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    } 
  })
  .then(getResponseData) 
};
  
export const setUserInfo = (token, {name, email}) => { 
  return fetch(`${BASE_URL}/users/me`, { 
    method: 'PATCH', 
    headers: { 
      authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      name, 
      email 
    }) 
  }) 
  .then(getResponseData) 
} 

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(getResponseData) 
}

export const saveMovie = (token, movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      director: movie.director,
      country: movie.country,
      year: movie.year,
      duration: movie.duration,
      description: movie.description,
      trailer: movie.trailerLink,
      image: URL + movie.image.url,
      thumbnail: URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    })
  })
  .then(getResponseData)
}

export const deleteMovie = (token, movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  .then(getResponseData)
}