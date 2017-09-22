<template>
    <main id="app" class="root">
        <div class="message-list" v-chat-scroll>
            <div v-for="(message, index) in messages" :key="index" class="message-item">{{ message }}</div>
        </div>
        <footer class="message-form">
            <textarea class="message-input" v-model="newMessage" @keypress.ctrl.enter="sendMessage"></textarea>
            <button class="send-button" @click="sendMessage">Send</button>
        </footer>
    </main>
</template>

<script>
import {
    REFRESH_MESSAGES,
    SEND_MESSAGE,
} from '../socket-messages';

export default {
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
            try{
                const uri = `ws://${window.location.hostname}:${window.location.port}`;
                console.log(uri);
                const socket = new WebSocket(uri);
                socket.addEventListener('open', e => this.handleSocketOpen(e));
                socket.addEventListener('message', e => this.handleSocketMessage(e));

                return socket;
            }catch(e){
                console.error(e, e.message);
            }
        },
        handleSocketOpen(e){
            console.log(e);
        },
        handleSocketMessage(e){
            const message = JSON.parse(e.data);
            console.log(message);
            switch(message.type){
                case REFRESH_MESSAGES:
                    this.messages = message.messages;
                    break;
            }
        },
        sendMessage(){
            this.socket.send(JSON.stringify({
                type: SEND_MESSAGE,
                message: this.newMessage,
            }));
            this.newMessage = '';
        }
    },
};
</script>

<style scoped>
.root{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.message-list{
    flex-grow: 1;
    overflow: auto;
}
.message-form{
    display: flex;
}
.message-input{
    flex-grow: 1;
}
</style>