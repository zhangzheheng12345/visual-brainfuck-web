<template>
  <div id="wrapText">
    <input id="in" title="input" v-model="runtimeData.input" />
    <div class="w-100%"></div>
    <input id="out" title="out" v-model="runtimeData.output" readonly />
    <button
      id="clearCode"
      @click="codes.clearCode"
      title="clear the codes"
      class="inline-flex justify-center items-center"
    >
      <span class="i-mingcute-delete-fill text-white text-25px"></span>
    </button>
    <textarea
      id="text"
      v-model="codes.codes"
      :readonly="
        runningState.runningState === 'running' ||
        runningState.runningState === 'paused'
      "
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { defaultCodes } from '@/logics/defaultCode'
import { useCodes, useRunningState, useRuntimeData } from '@/logics/editorState'
import { onMounted } from 'vue'

const codes = useCodes()
const runningState = useRunningState()
const runtimeData = useRuntimeData()

onMounted(() => {
  if (codes.codes === '') codes.codes = defaultCodes
})
</script>

<style scoped>
#wrapText {
  margin-left: 1px;
  padding: 2px;
  border-radius: 5px;
  background-color: var(--very-dark-grey);
  width: 100%;
}

#clearCode {
  float: right;
  margin: 5px;
  padding: 4px;
  background-color: var(--extremely-dark-grey);
  border-width: 0px;
  border-radius: 10px;
  width: 40px;
  height: 35px;
  color: #fff;
}

#clearCode:hover {
  transform: scale(1.1, 1.1);
}

#text {
  height: 450px;
  width: 100%;
  margin: 5px;
  border-color: var(--very-dark-grey);
  border-radius: 0px;
  background-color: var(--very-dark-grey);
  color: #fff;
  font-size: 16px;
  font-family: 'IBM Plex Mono', Courier, Menlo, Consolas, monospace;
  box-sizing: border-box;
  resize: none;
  overflow: auto;
  scroll-behavior: smooth;
}

#in,
#out {
  float: left;
  height: 25px;
  border-radius: 5px;
  border-width: 0px;
  padding: 5px;
  padding-left: 10px;
  background-color: #fff;
  margin: 5px;
  width: 75%;
  color: var(--very-dark-grey);
  font-size: 18px;
  font-family: 'IBM Plex Mono', Courier, Menlo, Consolas, monospace;
}
</style>
