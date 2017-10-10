<template>
  <main id="app" class="root">
    <chat-view class="chat-view" :messages="messages" @send="sendMessage" />
  </main>
</template>
<script>
import ChatView from './chat-view.vue';

export default {
  components: {
    ChatView,
  },
  mounted() {
    this.$store.dispatch('socket/connect');
  },
  computed: {
    messages() {
      return this.$store.state.chat.chatMessages;
    },
  },
  methods: {
    sendMessage(newMessage) {
      this.$store.dispatch('chat/send', newMessage);
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
