const state = {
  musicList: [
  {title:'Happiness',genre:'Synthpop'},
  {title:'Sorrow',genre:'Blues'},
  {title:'Melancholy',genre:'Piano Solo'},
  {title:'Peace',genre:'Ballad'},
  {title:'Outlaw',genre:'Hip-Hop'},
  {title:'Thrill',genre:'EDM'},
  {title:'Regret',genre:'Classical'},
  {title:'Trapped',genre:'Lo-fi'},
  {title:'Retribution',genre:'Game'},
  ],
};

const getters = {
  getMusicList: state => {
    return state.musicList;
  },
};

const mutations = {
  
};

const actions = {
  
};

export default {
  state,
  getters,
  mutations,
  actions,
};
