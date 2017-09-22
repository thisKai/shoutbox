<template>
    <main id="app" class="root">
        <div class="message-list">
            <div v-for="message in messages" :key="message" class="message-item"></div>
        </div>
        <footer class="message-form">
            <input class="message-input" v-model="newMessage"/>
            <button class="send-button">Send</button>
        </footer>
    </main>
</template>

<script>
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
                case 'REFRESH_MESSAGES':
                    this.messages = message.messages;
                    break;
            }
        },
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
}
.message-form{
    display: flex;
}
.message-input{
    flex-grow: 1;
}
</style>