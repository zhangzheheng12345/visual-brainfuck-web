<template>
  <button
    id="run"
    title="run the program"
    v-show="
      runningState.runningState === 'stopped' ||
      runningState.runningState === 'paused'
    "
    @click="runningState.run"
  >
    <span class="i-mingcute-play-fill"></span>
  </button>
  <button
    id="pause"
    title="pause the program"
    v-show="runningState.runningState === 'running'"
    @click="runningState.pause"
  >
    <span class="i-mingcute-pause-fill"></span>
  </button>
  <button
    id="stop"
    title="stop the program"
    v-show="
      runningState.runningState === 'running' ||
      runningState.runningState === 'paused'
    "
    @click="runningState.stop"
  >
    <span class="i-mingcute-stop-fill"></span>
  </button>
  <button id="minify" title="minimize the codes" @click="codes.minimize">
    <span class="i-mingcute-lightning-fill"></span>
  </button>
  <input
    id="speed"
    type="range"
    min="0"
    :max="MAX_RUNNING_DELAY"
    v-model="speed"
    step="2"
    title="change the speed"
  />
</template>

<script setup lang="ts">
import {
  useRunningState,
  useRuntimeData,
  useCodes,
  MAX_RUNNING_DELAY
} from '@/logics/editorState'
import { ref, watchEffect } from 'vue'

const codes = useCodes()
const runningState = useRunningState()
const runtimeData = useRuntimeData()

const speed = ref(300 - runtimeData.delay)

watchEffect(() => {
  runtimeData.delay = 300 - speed.value
})
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
