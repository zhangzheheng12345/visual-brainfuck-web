<template>
  <div class="bg-transparent">
    <input title="input" v-model="runtimeData.input" />
    <div class="w-100%"></div>
    <input title="out" v-model="runtimeData.output" readonly />
    <button
      @click="codes.clearCode"
      title="clear the codes"
      class="inline-flex justify-center items-center rounded-6px p-7px pl-9px pr-9px float-right bg-light-azure border-deep-azure border-3px border-solid"
    >
      <span class="i-mingcute-delete-fill text-white text-25px"></span>
    </button>
    <textarea
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
textarea {
  height: 80vh;
  width: 100%;
  margin: 5px;
  margin-top: 10px;
  border-radius: 0px;
  border-width: 0px;
  background-color: var(--very-dark-grey);
  color: #fff;
  font-size: 16px;
  font-family: 'IBM Plex Mono', Courier, Menlo, Consolas, monospace;
  box-sizing: border-box;
  resize: none;
  overflow: auto;
  scroll-behavior: smooth;
}

input {
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
