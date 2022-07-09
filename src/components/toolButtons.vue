<template>
    <button id="run" class="tool-button" title="run the program" v-show="!toRun" @click="$emit('run')">
        <img src="./svgs/play.svg" type="image/svg+xml" /></button>
    <button id="stop" class="tool-button" title="stop the program" v-show="toRun" @click="$emit('stop')">
        <img src="./svgs/stop.svg" type="image/svg+xml" /></button>
    <button id="minify" class="tool-button" title="minify the codes" v-show="!minified" @click="$emit('minify')">
        <img src="./svgs/lightning.svg" type="image/svg+xml" /></button>
    <button id="revert" class="tool-button" title="revert the codes" v-show="minified" @click="$emit('revert')">
        <img src="./svgs/revert.svg" type="image/svg+xml" /></button>
    <input id="speed" type="range" min="0" max="300" v-model="speed" step="2" title="change the speed" />
</template>

<script>
export default {
    props: ["toRun", "minified", "inSpeed"],
    emits: ["run", "stop", "minify", "revert", "update:inSpeed"],
    computed: {
        speed: {
            get() { return this.inSpeed },
            set(value) { this.$emit("update:inSpeed", value) }
        }
    }
}
</script>

<style scoped>
.tool-button {
    height: 45px;
    width: 70px;
    margin: 5px;
    margin-left: 7px;
    margin-right: 7px;
    border-width: 0px;
    border-radius: 10px;
    box-shadow: 0px 3px 4px var(--light-grey);
}

#run {
    background-color: var(--green);
    border-color: var(--deep-green);
    border-width: 3px;
}

#stop,
#revert {
    border-color: var(--dark-grey);
    border-width: 3px;
    background-color: #fff;
}

#revert>* {
    transform: scale(1.3, 1.5);
}

#minify {
    background-color: var(--purple);
    border-color: var(--deep-purple);
    border-width: 3px;
}

img[src="./svgs/stop.svg"] {
    transform: translate(0px, 2px);
}

img[src="./svgs/lightning.svg"] {
    transform: translate(2px, 2px);
}

#speed {
    margin: 7px;
}
</style>