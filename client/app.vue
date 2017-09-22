<template>
    <main id="app">
        <div>
            <div v-for="message in messages" :key="message"></div>
        </div>
        <footer>
            <input/>
            <button>Send</button>
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