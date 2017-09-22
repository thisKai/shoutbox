<template>
    <main id="app" class="root">
        <div class="message-list">
            <div v-for="message in messages" :key="message" class="message-item"></div>
        </div>
        <footer class="message-form">
            <input class="message-input"/>
            <button class="send-button">Send</button>
        </footer>
    </main>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
        };
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