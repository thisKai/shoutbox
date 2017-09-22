import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';

import App from './app.vue';

Vue.use(VueChatScroll);

new Vue({
    el: '#app',
    render(h){
        return h(App);
    },
})