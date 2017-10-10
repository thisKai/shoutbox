import Vue from 'vue';
import Vuex from 'vuex';

import * as socket from './socket';
import * as chat from './chat';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    socket,
    chat,
  },
});
