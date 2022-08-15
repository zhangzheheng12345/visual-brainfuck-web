<template>
    <button id="run" class="tool-button" title="run the program" v-show="toPause || !toRun" @click="$emit('run')">
        <img src="./svgs/play.svg" type="image/svg+xml" /></button>
    <button id="pause" class="tool-button" title="pause the program" v-show="toRun && !toPause" @click="$emit('pause')">
        <img src="./svgs/pause.svg" type="image/svg+xml" /></button>
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
    props: ["toRun", "toPause", "minified", "inSpeed"],
    emits: ["run", "pause", "stop", "minify", "revert", "update:inSpeed"],
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
    height: 40px;
    width: 45px;
    margin: 5px;
    border-width: 0px;
    border-radius: 10px;
    border-style: solid;
}

.tool-button:hover {
    transform: scale(1.1, 1.1);
}

#run,
#pause,
#stop {
    background-color: var(--green);
    border-color: var(--deep-green);
    border-width: 3px;
}

#stop>* {
    transform: translate(0px, 2px);
}

#minify>* {
    transform: translate(2px, 2px);
}

#revert>* {
    transform: scale(1.2, 1.4) translate(0px, 1px);
}

#minify,
#revert {
    background-color: var(--purple);
    border-color: var(--deep-purple);
    border-width: 3px;
}

#speed {
    margin: 7px;
}
</style>