<template>
<main id="app" class="root">
  <div class="message-list" v-chat-scroll>
    <div v-for="(message, index) in messages" :key="index" class="message-item">
      <pre>{{ message }}</pre>
    </div>
  </div>
  <footer class="message-form">
    <chat-input class="message-input" v-model="newMessage" @submit="sendMessage" placeholder="Type your message"></chat-input>
    <button class="send-button" @click="sendMessage">Send</button>
  </footer>
</main>
</template>

<script>
import {
  REFRESH_MESSAGES,
  SEND_MESSAGE,
} from '../socket-messages';
import ChatInput from './chat-input.vue';

export default {
  components: {
    ChatInput,
  },
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
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
    sendMessage() {
      if (this.newMessage.trim() === '') {
        return;
      }
      this.socket.send(JSON.stringify({
        type: SEND_MESSAGE,
        content: this.newMessage,
      }));
      this.newMessage = '';
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-list {
  flex-grow: 1;
  overflow: auto;
  background: #444;
}

.message-item {
  background-color: #999;
  padding: 8px 16px;
  margin: 8px;
  border-radius: 8px;
}

.message-item pre {
  margin: 0;
}

.message-form {
  display: flex;
  background-color: #000;
}

.message-input {
  flex-grow: 1;
}

.message-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #CCC;
}

.message-input::-moz-placeholder {
  /* Firefox 19+ */
  color: #CCC;
}

.message-input:-ms-input-placeholder {
  /* IE 10+ */
  color: #CCC;
}

.message-input:-moz-placeholder {
  /* Firefox 18- */
  color: #CCC;
}

.send-button {
  background: none;
  border: none;
  padding: 8px 16px;
}

.send-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.send-button:hover:active {
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
