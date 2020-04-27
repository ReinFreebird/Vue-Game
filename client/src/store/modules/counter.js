const state = {
  counter: 0,
};

const getters = {
  secCounter: state => {
    return state.counter;
  },
  stringCounter: state => {
    return state.counter + ' Ticks';
  },
};

const mutations = {
  increment: (state, payload) => {
    state.counter += payload;
  },
  decrement: (state, payload) => {
    state.counter -= payload;
  },
};

const actions = {
  increment: ({ commit }, payload) => {
    commit('increment', payload);
  },
  decrement: ({ commit }, payload) => {
    commit('decrement', payload);
  },
  asyncIncrement: ({ commit }, payload) => {
    setTimeout(() => {
      commit('increment', payload.step);
    }, payload.timer);
  },
  asyncDecrement: ({ commit }, payload) => {
    setTimeout(() => {
      commit('decrement', payload.step);
    }, payload.timer);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
