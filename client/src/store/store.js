import Vue from 'vue';
import Vuex from 'vuex';


import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

import music from './modules/music'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    value: 0,
    idToken: null,
    userSuccess: null,
    userEmail: null,
  },

  getters,
  mutations,
  actions,

  modules: {
    music,
  },
});
