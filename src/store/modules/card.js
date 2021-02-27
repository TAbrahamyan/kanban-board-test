import axios from '../../axios';

export default {
  state: {
    cards0: [],
    cards1: [],
    cards2: [],
    cards3: [],
  },
  getters: {
    cards0: (state) => state.cards0,
    cards1: (state) => state.cards1,
    cards2: (state) => state.cards2,
    cards3: (state) => state.cards3,
  },
  actions: {
    getAll() {
      return axios.get(`${this.getters.apiURL}/cards/`);
    },
    create(_, { text, row }) {
      return axios.post(`${this.getters.apiURL}/cards/`, { text, row });
    },
    update(_, { id, seq_num, row }) {
      return axios.patch(`${this.getters.apiURL}/cards/${id}/`, { seq_num, row });
    },
    remove(_, id) {
      axios.delete(`${this.getters.apiURL}/cards/${id}/`);
    },
  },
  mutations: {
    setCards(state, cards) {
      state.cards0.push(...cards.filter((card) => card.row === '0'));
      state.cards1.push(...cards.filter((card) => card.row === '1'));
      state.cards2.push(...cards.filter((card) => card.row === '2'));
      state.cards3.push(...cards.filter((card) => card.row === '3'));
    },
  },
};
