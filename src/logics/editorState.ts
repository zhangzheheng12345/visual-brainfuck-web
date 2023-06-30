import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { defaultCodes } from './defaultCode'
import { minimize } from './minimize'
import { runCode } from './run'

export const useCodes = defineStore('code-storage', () => {
  const codes = useLocalStorage('v-bf-web-codes', defaultCodes)
  function _minimize() {
    codes.value = minimize(codes.value)
  }
  function clearCode() {
    codes.value = ''
  }
  return { codes, minimize: _minimize, clearCode }
})

// unit: ms
export const DEFAULT_RUNNING_DELAY = 100
export const MAX_RUNNING_DELAY = 300

export const useRuntimeData = defineStore('runtime-data', {
  state: () => {
    return {
      memory: [0],
      pointer: 0,
      output: '',
      input: '',
      stack: [] as Array<number>,
      delay: DEFAULT_RUNNING_DELAY,
      code: '', // minimized code for running. shouldn't be changed when paused
      index: 0
    }
  },
  actions: {
    initialize() {
      this.memory = [0]
      this.pointer = 0
      this.clearOutput()
      this.stack = []
      this.code = useCodes().codes
      this.index = 0
    },
    // for memory
    setValue(value: number) {
      this.memory[this.pointer] = value
    },
    plus() {
      this.memory[this.pointer]++
      if (this.memory[this.pointer] > 255) this.setValue(0)
    },
    minus() {
      this.memory[this.pointer] -= 1
      if (this.memory[this.pointer] < 0) this.setValue(255)
    },
    forward() {
      if (this.pointer + 1 >= this.memory.length) this.memory.push(0)
      this.pointer++
    },
    backward() {
      if (this.pointer > 0) this.pointer--
    },
    clearMemory() {
      this.memory = []
    },
    // for output
    writeToOutput() {
      this.output += String.fromCharCode(this.memory[this.pointer])
    },
    clearOutput() {
      this.output = ''
    },
    // for input
    readInput() {
      if (this.input === '') this.setValue(0)
      else {
        const res = this.input.charCodeAt(0)
        this.input = this.input.slice(1, this.input.length)
        this.setValue(res)
      }
    },
    clearInput() {
      this.input = ''
    }
  }
})

export const useRunningState = defineStore('running-state', {
  state: () => {
    return {
      runningState: 'stopped' as 'stopped' | 'running' | 'paused',
      runMode: 'delay' as 'delay' | 'no-delay'
    }
  },
  actions: {
    run() {
      if (this.runningState === 'stopped') useRuntimeData().initialize()
      this.runningState = 'running'
      runCode(useCodes().codes)
    },
    stop() {
      this.runningState = 'stopped'
    },
    pause() {
      this.runningState = 'paused'
    }
  }
})
