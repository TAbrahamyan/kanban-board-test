import axios from '../../axios';
import router from '../../router';

export default {
  state: {
    isAuth: !!localStorage.getItem('token'),
  },
  getters: {
    isAuth: (state) => state.isAuth,
  },
  actions: {
    signup(_, { username, email, password }) {
      return axios.post(`${this.getters.apiURL}/users/create/`, { username, email, password });
    },
    login(_, { username, password }) {
      return axios.post(`${this.getters.apiURL}/users/login/`, { username, password });
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setIsAuth', false);
      router.go({ path: '/auth' });
    },
    refreshToken() {
      const { apiURL } = this.getters;
      const token = localStorage.getItem('token');
      return axios.post(`${apiURL}/users/refresh_token/`, { token });
    },
  },
  mutations: {
    setIsAuth(state, bool) {
      state.isAuth = bool;
    }
  },
};
