import Axios from 'axios';
import store from './store';

const axios = Axios.create({
  baseURL: window.location.origin,
});

axios.interceptors.request.use(
  (config) => {
    try {
      config.headers.Authorization = `JWT ${localStorage.getItem('token')}`;
      return config;
    } catch (err) {
      console.log('err:', err);
      return config;
    }
  },
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response && err.response.status === 401) {
      store.dispatch('refreshToken')
        .then(({ data }) => localStorage.setItem('token', data.token))
        .catch(() => store.dispatch('logout'));
    }

    return Promise.reject(err);
  },
);

export default axios;
