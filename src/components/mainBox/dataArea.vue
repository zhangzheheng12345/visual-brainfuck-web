<template>
    <div id="wrapData">
        <button id="showData" :class="{ toRotate: !dataHidden }" @click="$emit('toggleData')" :title="dataHidden?'show the data area' : 'hide the data area'">
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
    background-color: var(--very-dark-grey);
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

#data>div {
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

#data>div.selected {
    transform: scale(1.1, 1.2);
}

#dataHiddenReminder {
    padding: 10px;
    margin:9px;
    font-size: 20px;
    color: #fff;
    font-family: "TheGoodMonolith", Courier, Menlo, Consolas, monospace;
    background-color: var(--dark-grey);
    border-radius: 5px;
    cursor: default;
}
</style>