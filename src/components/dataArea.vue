<template>
    <div id="wrapData">
        <button id="showData" :class="{ toRotate: !dataHidden }" @click="$emit('toggleData')">
            <img src="./svgs/triangle.svg" />
        </button>
        <div id="data" v-show="!dataHidden">
            <div v-for="(item, index) in data" :class="{ selected: (ptr == index) }">{{ item }}</div>
        </div>
        <div id="dataHiddenReminder" v-show="dataHidden">DATA AREA HIDDEN</div>
    </div>
</template>

<script>
export default {
    props: ["data", "ptr", "dataHidden"]
}
</script>

<style scoped>
#showData {
    height: 25px;
    width: 25px;
    margin-right: 10px;
    margin-top: 10px;
    padding: 2px;
    background-color: #fff;
    border-width: 0px;
    border-radius: 0px;
}

.toRotate {
    transform: rotate(90deg);
}

#wrapData {
    display: flex;
    margin: 10px;
    margin-left: 1px;
    min-height: 42px;
}

#data {
    background-color: var(--light-grey);
    padding: 3px;
    margin-left: 5px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#data>div {
    background-color: var(--grey);
    margin: 2px;
    margin-left: 4px;
    margin-right: 4px;
    padding: 4px;
    width: 50px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-family: sans-serif;
}

#data>div.selected {
    background-color: var(--very-dark-grey);
    transform: scale(1.05, 1.1);
}

#dataHiddenReminder {
    padding: 11px;
    font-size: 18px;
    color: var(--grey);
    font-family: Courier, Menlo, Consolas, monospace;
}
</style>