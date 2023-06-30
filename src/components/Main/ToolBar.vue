<template>
  <button
    title="run the program"
    class="bg-light-green border-deep-green"
    v-show="
      runningState.runningState === 'stopped' ||
      runningState.runningState === 'paused'
    "
    @click="runningState.run"
  >
    <span class="i-mingcute-play-fill"></span>
  </button>
  <button
    title="pause the program"
    class="bg-light-green border-deep-green"
    v-show="runningState.runningState === 'running'"
    @click="runningState.pause"
  >
    <span class="i-mingcute-pause-fill"></span>
  </button>
  <button
    title="stop the program"
    class="bg-light-green border-deep-green"
    v-show="
      runningState.runningState === 'running' ||
      runningState.runningState === 'paused'
    "
    @click="runningState.stop"
  >
    <span class="i-mingcute-stop-fill"></span>
  </button>
  <button
    class="bg-light-purple border-deep-purple"
    title="minimize the codes"
    @click="codes.minimize"
  >
    <span class="i-mingcute-lightning-fill"></span>
  </button>
  <input
    type="range"
    min="0"
    :max="MAX_RUNNING_DELAY"
    v-model="speed"
    step="2"
    title="change the speed"
    class="m-7px"
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
  border-radius: 5px;
  border-style: solid;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-width: 3px;
}
button span {
  background-color: #fff;
  font-size: 25px;
}
</style>
