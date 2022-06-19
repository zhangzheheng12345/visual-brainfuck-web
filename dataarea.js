const app = Vue.createApp({
    data() {
        return {
            context: {
                ptr: 0,
                data: [0]
            }
        }
    }
})
app.mount("#data")