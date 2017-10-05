<template>
  <main id="app" class="root">
    <chat-view class="chat-view" :messages="messages" @send="sendMessage" />
  </main>
</template>
<script>
import {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} from '../socket-messages';
import ChatView from './chat-view.vue';

export default {
  components: {
    ChatView,
  },
  data() {
    return {
      socket: null,
      messages: [],
    };
  },
  mounted() {
    this.socket = this.createSocket();
  },
  methods: {
    createSocket() {
      try {
        const uri = `ws://${window.location.hostname}:${window.location.port}`;
        console.log(uri);
        const socket = new WebSocket(uri);
        socket.addEventListener('open', e => this.handleSocketOpen(e));
        socket.addEventListener('message', e => this.handleSocketMessage(e));

        return socket;
      } catch (e) {
        console.error(e, e.message);
      }
    },
    handleSocketOpen(e) {
      console.log(e);
    },
    handleSocketMessage(e) {
      const message = JSON.parse(e.data);
      console.log(message);
      switch (message.type) {
        case REFRESH_MESSAGES:
          this.messages = message.messages;
          break;
      }
    },
    sendMessage(newMessage) {
      const message = newMessage.trim();
      if (message === '') {
        return;
      }
      this.messages.push({
        content: message,
      });
      this.socket.send(JSON.stringify({
        type: SEND_MESSAGE,
        content: message,
      }));
    },
  },
};
</script>
<style scoped>
.root {
  height: 100%;
}

.chat-view {
  height: 100%;
}
</style>
