<template>
  <div class="flex items-center pt-7px pb-7px">
    <button
      class="inline-flex justify-center items-center bg-transparent border-0px m-5px"
      @click="showDataVisualiser = !showDataVisualiser"
      :title="showDataVisualiser ? 'hide the data area' : 'show the data area'"
    >
      <span
        class="i-mingcute-triangle-fill text-white text-26px rotate--90 transition-100"
        :class="showDataVisualiser ? 'rotate-180deg' : 'rotate-90deg'"
      ></span>
    </button>
    <div id="data" v-show="showDataVisualiser">
      <div
        v-for="(item, index) in runtimeData.memory"
        :class="runtimeData.pointer === index ? 'selected' : ''"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRuntimeData, useRunningState } from '@/logics/editorState'

const showDataVisualiser = ref(true)

const runtimeData = useRuntimeData()
const runningState = useRunningState()

watchEffect(() => {
  runningState.runMode = showDataVisualiser.value ? 'delay' : 'no-delay'
})
</script>

<style scoped>
#wrapData {
  display: flex;
  margin: 10px;
  margin-left: 1px;
}

#data {
  min-height: 38px;
  background-color: var(--grey);
  padding: 5px;
  margin-left: 5px;
  border-radius: 7px;
  border-width: 1px;
  border-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#data > div {
  background-color: #fff;
  margin: 4px;
  padding: 3px;
  width: 40px;
  border-radius: 5px;
  text-align: center;
  color: #000;
  font-size: 17px;
  font-family: sans-serif;
  font-weight: bold;
  cursor: default;
}

#data > div.selected {
  transform: scale(1.05, 1.08);
}
</style>
