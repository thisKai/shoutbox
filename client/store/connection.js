import { REFRESH_MESSAGES } from '../../socket-messages';

export const namespaced = true;

export const state = {
  socket: null,
};

export const mutations = {
  create(state) {
    const uri = `ws://${window.location.hostname}:${window.location.port}`;
    const socket = new WebSocket(uri);
    state.socket = socket;
  },
};

export const actions = {
  connect({ state, commit, dispatch }) {
    try {
      commit('create');
      state.socket.addEventListener(
        'message',
        e => dispatch('handle', e.data),
      );
      state.socket.addEventListener(
        'close',
        e => dispatch('connect'),
      );
    } catch (ex) {
      console.log(ex)
      setTimeout(() => {
        dispatch('connect');
      }, 1000);
    }
  },
  handle({ commit }, data) {
    const socketMessage = JSON.parse(data);
    console.log(socketMessage);
    switch(socketMessage.type) {
      case REFRESH_MESSAGES:
        commit('chat/refresh', socketMessage.messages, { root: true });
        break;
    }
  },
  send({ state }, socketMessage) {
    state.socket.send(JSON.stringify(socketMessage));
  },
};
