import 'whatwg-fetch'

export const wordAPIKey = '9MG5ZIBA';
export const wordAPIbaseURL = 'https://random-word-api.herokuapp.com/word';

export const getIndexes = (key, word) => {
   return word.split('').reduce((a, e, i) => e === key ? a.concat(i) : a, []);
}
