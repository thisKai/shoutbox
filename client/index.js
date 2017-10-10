import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';

import App from './app.vue';
import store from './store';

Vue.use(VueChatScroll);

new Vue({
  el: '#app',
  store,
  render(h) {
    return h(App);
  },
})
