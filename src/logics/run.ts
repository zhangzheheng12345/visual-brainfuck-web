import { useRunningState, useRuntimeData } from './editorState'
import { minimize } from './minimize'

function sleep(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), delay)
  })
}

export async function runCode(codes: string) {
  const runningState = useRunningState()
  const runtimeData = useRuntimeData()
  codes = minimize(codes)
  function runSingleCmd() {
    if (codes[runtimeData.index] == '+') runtimeData.plus()
    else if (codes[runtimeData.index] == '-') runtimeData.minus()
    else if (codes[runtimeData.index] == '>') runtimeData.forward()
    else if (codes[runtimeData.index] == '<') runtimeData.backward()
    else if (codes[runtimeData.index] == '[') {
      if (runtimeData.memory[runtimeData.pointer])
        runtimeData.stack.push(runtimeData.index)
      else {
        runtimeData.index++
        let count = 1
        for (
          ;
          runtimeData.index < codes.length &&
          runningState.runningState === 'running' &&
          count;
          runtimeData.index++
        ) {
          if (codes[runtimeData.index] == '[') count++
          else if (codes[runtimeData.index] == ']') count--
        }
      }
    } else if (codes[runtimeData.index] == ']') {
      if (runtimeData.memory[runtimeData.pointer])
        runtimeData.index = runtimeData.stack[runtimeData.stack.length - 1]
      else runtimeData.stack.pop()
    } else if (codes[runtimeData.index] == ',') runtimeData.readInput()
    else if (codes[runtimeData.index] == '.') runtimeData.writeToOutput()
    runtimeData.index++
  }
  if (runningState.runMode === 'no-delay') {
    while (
      runtimeData.index < codes.length &&
      runningState.runningState === 'running'
    ) {
      runSingleCmd()
    }
  } else {
    while (
      runtimeData.index < codes.length &&
      runningState.runningState === 'running'
    ) {
      await sleep(50)
      runSingleCmd()
      await sleep(runtimeData.delay)
    }
  }
  if (runningState.runningState === 'running') runningState.stop()
}
