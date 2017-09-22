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
                socket.addEventListener('open', e => console.log(e));
                socket.addEventListener('message', e => console.log(e));

                return socket;
            }catch(e){
                console.error(e, e.message)
            }
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
}
.message-form{
    display: flex;
}
.message-input{
    flex-grow: 1;
}
</style>