<template>
    <top-bar></top-bar>
    <main-box></main-box>
</template>

<script>
import topBar from "./components/topBar.vue"
import mainBox from "./components/mainBox/mainBox.vue"

export default {
    components: {
        "top-bar": topBar,
        "main-box": mainBox,
    }
}
</script>

<!-- Global Styles -->
<style>
* {
    padding: 0px;
    margin: 0px;
    -webkit-font-smoothing: antialiased;
}

:root {
    --green: #0aca0a;
    --deep-green: #0f8325;
    --purple: #8a47ee;
    --deep-purple: #672cce;
    --azure: rgb(11, 131, 243);
    --light-grey: #ccc;
    --grey: #999;
    --dark-grey: #555;
    --very-dark-grey: #2c2c2c;
    --extremely-dark-grey: #1c1c1c;
    background-color: var(--very-dark-grey);
}

/* scrollbar style */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: var(--extremely-dark-grey);
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--light-grey);
}
</style>