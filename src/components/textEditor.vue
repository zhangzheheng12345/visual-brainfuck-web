<template>
    <div id="wrapText">
        <div id="box">
            <input id="io" title="input & output" v-model="io" />
            <button id="clearCode" @click="$emit('clear')">
                <img src="./svgs/trash.svg" type="image/svg+xml" />
            </button>
        </div>
        <textarea id="text" v-model="codes" :readonly="textareaReadonly"></textarea>
    </div>
</template>

<script>
export default {
    props: ["textareaReadonly", "inIO", "inCodes"],
    emits: ["clear", "update:inIO", "update:inCodes"],
    computed: {
        io: {
            get() { return this.inIO },
            set(value) { this.$emit("update:inIO", value) }
        },
        codes: {
            get() { return this.inCodes },
            set(value) { this.$emit("update:inCodes", value) }
        }
    }
}
</script>

<style scoped>
#wrapText {
    margin: 5px;
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
    background-color: var(--grey);
    border-width: 0px;
    border-radius: 10px;
    width: 40px;
    height: 35px;
    color: #fff;
}

#text {
    padding: 20px;
    height: 450px;
    width: 100%;
    border-color: var(--very-dark-grey);
    border-radius: 0px;
    background-color: var(--very-dark-grey);
    color: #fff;
    font-size: 16px;
    font-family: "SF Mono", Courier, Menlo, Consolas, monospace;
    box-sizing: border-box;
    resize: none;
    overflow: auto;
    scroll-behavior: smooth;
}

#text:focus,
#io:focus {
    outline: 0px;
}

#box {
    margin: 5px;
}

#io {
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
    font-family: "SF Mono", Courier, Menlo, Consolas, monospace;
}
</style>