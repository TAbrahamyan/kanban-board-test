import { createStore } from 'vuex';
import auth from './modules/auth';
import card from './modules/card';

export default createStore({
  state: {
    apiURL: 'https://trello.backend.tests.nekidaem.ru/api/v1',
  },
  getters: {
    apiURL: (state) => state.apiURL,
  },
  modules: {
    auth, card,
  },
});
