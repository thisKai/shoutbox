import { SEND_MESSAGE } from '../../socket-messages';

export const namespaced = true;

export const state = {
  chatMessages: [],
};

export const mutations = {
  refresh(state, chatMessages) {
    state.chatMessages = chatMessages;
  },
  push(state, chatMessage) {
    state.chatMessages.push({
      content: chatMessage,
    });
  },
};

export const actions = {
  send({ commit, dispatch }, text) {
    const chatMessage = text.trim();
    if(chatMessage === '') {
      return;
    }

    commit('push', chatMessage);

    const socketMessage = {
      type: SEND_MESSAGE,
      content: chatMessage,
    };
    dispatch('connection/send', socketMessage, { root: true });
  },
};
