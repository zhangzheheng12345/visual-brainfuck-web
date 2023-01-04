<template>
    <div id="mainBox">
        <tool-buttons :toRun="context.toRun" :toPause="context.toPause" :minified="context.minified"
            @run="runCode(context, callbackAfterRun)" @pause="pause()" @stop="stop()" @minify="minifyButton()"
            @revert="revert()" v-model:inSpeed="context.speed"></tool-buttons>
        <data-area :data="context.data" :ptr="context.ptr" :dataHidden="context.dataHidden" @toggleData="toggleData()">
        </data-area>
        <text-editor :textareaReadonly="context.textareaReadonly" @clear="clearCode()" :inCodes="context.codes"
            @update:inCodes="context.codes = $event; saveCode()" v-model:inIn="context.in" v-model:inOut="context.out"
            v-model:inIorO="context.IorO"></text-editor>
    </div>
</template>

<style scoped>
#mainBox {
    padding: 10px;
    background-color: var(--very-dark-grey);
}
</style>

<script setup>
import toolButtons from "./toolButtons.vue"
import dataArea from "./dataArea.vue"
import textEditor from "./textEditor.vue"
import { defaultCodes } from "./defaultCode"
import { minify } from "./minifyCode"
import { runCode } from "./runCode"
import { onMounted, reactive } from "vue"

const bfFileName = "zhangzheheng12345-visual-bf-web-code"
const context = reactive({
    data: [0],
    ptr: 0,
    speed: 200,
    toRun: false,
    toPause: false,
    minified: false,
    in: "",
    out: "",
    codes: defaultCodes,
    codeBeforeMinified: "",
    textareaReadonly: false,
    dataHidden: false,
    IorO: true,
    stack: [],
    cindex: 0,
    iindex: 0
})

// Load saved codes 
onMounted(() => {
    if (window.localStorage.getItem(bfFileName))
        context.codes = window.localStorage.getItem(bfFileName);
})

function callbackAfterRun() {
    if (!context.toRun) context.toPause = false;
    else {
        context.toRun = false
        context.textareaReadonly = !context.textareaReadonly
    }
}
function pause() {
    context.toPause = true; context.textareaReadonly = false
}
function stop() {
    context.toRun = false; context.textareaReadonly = false
}
function minifyButton() {
    context.codeBeforeMinified = context.codes
    context.codes = minify(context.codes)
    context.minified = true
}
function revert() {
    context.codes = context.codeBeforeMinified
    context.minified = false
}
function saveCode() {
    window.localStorage.setItem(bfFileName, context.codes)
    context.minified = false
}
function clearCode() {
    context.codes = ""
    window.localStorage.removeItem(bfFileName) // The storage will also be cleared
}
function toggleData() {
    context.dataHidden = !context.dataHidden
}
</script>