<template>
  <button
    id="run"
    title="run the program"
    v-show="toPause || !toRun"
    @click="$emit('run')"
  >
    <span class="i-mingcute-play-fill"></span>
  </button>
  <button
    id="pause"
    title="pause the program"
    v-show="toRun && !toPause"
    @click="$emit('pause')"
  >
    <span class="i-mingcute-pause-fill"></span>
  </button>
  <button
    id="stop"
    title="stop the program"
    v-show="toRun"
    @click="$emit('stop')"
  >
    <span class="i-mingcute-stop-fill"></span>
  </button>
  <button
    id="minify"
    title="minimize the codes"
    v-show="!minimized"
    @click="$emit('minimize')"
  >
    <span class="i-mingcute-lightning-fill"></span>
  </button>
  <button
    id="revert"
    title="revert the codes"
    v-show="minimized"
    @click="$emit('revert')"
  >
    <span class="i-mingcute-back-fill"></span>
  </button>
  <input
    id="speed"
    type="range"
    min="0"
    max="300"
    v-model="speed"
    step="2"
    title="change the speed"
  />
</template>

<script>
export default {
  props: ['toRun', 'toPause', 'minimized', 'inSpeed'],
  emits: ['run', 'pause', 'stop', 'miniminimize', 'revert', 'update:inSpeed'],
  computed: {
    speed: {
      get() {
        return this.inSpeed
      },
      set(value) {
        this.$emit('update:inSpeed', value)
      }
    }
  }
}
</script>

<style scoped>
button {
  padding: 6px 9px;
  margin: 6px;
  border-width: 0px;
  border-radius: 10px;
  border-style: solid;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
button span {
  background-color: #fff;
  font-size: 25px;
}

#run,
#pause,
#stop {
  background-color: var(--green);
  border-color: var(--deep-green);
  border-width: 3px;
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
