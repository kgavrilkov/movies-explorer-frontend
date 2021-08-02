export const URL = 'https://api.nomoreparties.co';

class MainApi {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() { 
    return fetch(`${this._address}/users/me`, { 
      headers: { 
        authorization: this._token 
      } 
    }) 
    .then(this.getResponseData) 
  }
  
  setUserInfo({name, email}) { 
    return fetch(`${this._address}/users/me`, { 
      method: 'PATCH', 
      headers: { 
        authorization: this._token, 
        'Content-Type': 'application/json' 
      }, 
      body: JSON.stringify({ 
        name, 
        email 
      }) 
    }) 
    .then(this.getResponseData) 
  } 

  getMovies() {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this.getResponseData) 
  }

  saveMovie(movie) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
        movieId: movie.id
      })
    })
    .then(this.getResponseData)
  }

  deleteMovie(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this.getResponseData)
  }
}

const mainApi = new MainApi ({
  address: 'https://api.filman.kirill.nomoredomains.monster',
  token: `Bearer ${localStorage.getItem('token')}`
});

export default mainApi;