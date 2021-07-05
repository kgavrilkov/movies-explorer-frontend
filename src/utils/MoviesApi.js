class Api {
  constructor({address}) {
    this._address = address;
  }

  getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._address}`)
    .then(this.getResponse)
  }
}

const api = new Api ({
  address: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default api;