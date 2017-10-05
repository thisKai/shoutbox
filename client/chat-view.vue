<template>
  <div class="wrapper">
    <div class="message-list" v-chat-scroll>
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <loading-box :loading="messageIsSending(message)">
          <pre>{{ message.content }}</pre>
        </loading-box>
      </div>
    </div>
    <footer class="message-form">
      <chat-input class="message-input" v-model="newMessage" @submit="sendMessage" placeholder="Type your message"></chat-input>
      <button class="send-button" @click="sendMessage">Send</button>
    </footer>
  </div>
</template>
<script>
import LoadingBox from './loading-box.vue'
import ChatInput from './chat-input.vue';

export default {
  components: {
    LoadingBox,
    ChatInput,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  props: {
    messages: Array,
  },
  methods: {
    sendMessage() {
      const message = this.newMessage.trim();
      if (message === '') {
        return;
      }
      this.$emit('send', message);
      this.newMessage = '';
    },
    messageIsSending(message) {
      return !message.hasOwnProperty('_id');
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
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
  flex-shrink: 0;
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
  color: #FFF;
}

.send-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.send-button:hover:active {
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
