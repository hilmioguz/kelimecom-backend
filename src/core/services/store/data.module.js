// action types
export const UPDATE_PAKETLER_INFO = 'updatePaketlerInfo';
export const UPDATE_KURUMLAR_INFO = 'updateKurumlarInfo';

// mutation types
export const SET_PAKETLER_INFO = 'setPaketlerInfo';
export const SET_KURUMLAR_INFO = 'setKurumlarInfo';

const state = {
  paketler: [],
  kurumlar: [],
};

const getters = {
  paketlerInfo(state) {
    return state.paketler;
  },

  kurumlarInfo(state) {
    return state.kurumlar;
  },

};

const actions = {
  [UPDATE_PAKETLER_INFO](context, payload) {
    context.commit(SET_PAKETLER_INFO, payload);
  },
  [UPDATE_KURUMLAR_INFO](context, payload) {
    context.commit(SET_KURUMLAR_INFO, payload);
  },
};

const mutations = {
  [SET_PAKETLER_INFO](state, paketler) {
    state.paketler = paketler;
  },
  [SET_KURUMLAR_INFO](state, kurumlar) {
    state.kurumlar = kurumlar;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
