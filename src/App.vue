<template>
    <top-bar></top-bar>
    <main-box></main-box>
    <tail></tail>
</template>

<script>
import topBar from "./components/topBar.vue"
import mainBox from "./components/mainBox.vue"
import tail from "./components/tail.vue"

export default {
    components: {
        "top-bar": topBar,
        "main-box": mainBox,
        "tail": tail
    }
}
</script>

<!-- Global Styles -->
<style>
* {
    padding: 0px;
    margin: 0px;
}

:root {
    --green: #0aaf09;
    --deep-green: #0a801f;
    --purple: #7947c2;
    --deep-purple: #5a3796;
    --light-grey: #ddd;
    --grey: #888;
    --dark-grey: #4e4e4e;
    --very-dark-grey: #333;
}
</style>