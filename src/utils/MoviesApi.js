export const getResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
  
export const getInitialCards = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies')
  .then(getResponse)
};