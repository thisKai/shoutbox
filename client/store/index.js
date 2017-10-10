import Vue from 'vue';
import Vuex from 'vuex';

import * as connection from './connection';
import * as chat from './chat';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    connection,
    chat,
  },
});
