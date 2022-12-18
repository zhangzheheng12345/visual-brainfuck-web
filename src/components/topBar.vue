<template>
    <div id="topBarReplacer"></div>
    <div id="topBar">
        <img id="bfLogo" src="./svgs/v-bf-web-logo.svg" type="image/svg+xml" />
        <button id="menuButton" @click="toggleMenu()">
            <img src="./svgs/menu.svg" type="image/svg+xml" />
        </button>
        <div id="menu" v-show="!menuHidden">
            <div><a href="https://github.com/zhangzheheng12345/visual-brainfuck-web">GitHub Repo</a></div>
            <div><a href="https://github.com/zhangzheheng12345">My Profile</a></div>
            <div><a href="https://esolangs.org/wiki/brainfuck">Brainfuck Wiki</a></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuHidden: true
        }
    },
    methods: {
        toggleMenu() {
            this.menuHidden = !this.menuHidden
        }
    }
}
</script>

<style scoped>
#topBarReplacer {
    width: 100%;
    height: 40px;
    background-color: var(--extremely-dark-grey);
}

#topBar {
    width: 100%;
    height: 40px;
    background-color: var(--very-dark-grey);
    padding: 3px;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index:99;
}

#bfLogo {
    transform-origin: 0px, 0px;
    transform: scale(0.05, 0.05);
}

#menuButton {
    border-width: 0px;
    background-color: var(--very-dark-grey);
    padding: 6px;
    position: absolute;
    top: 2px;
    right: 5px;
    z-index: 99;
}

#menuButton:hover {
    transform: scale(1.1, 1.1);
}

#menuButton>* {
    transform: scale(1.5, 1.6);
}

#menu {
    position: absolute;
    right: 5px;
    top: 55px;
    border-radius: 8px;
    padding: 5px;
    background-color: var(--grey);
    z-index: 99;
}

#menu>div {
    background-color: var(--very-dark-grey);
    border-radius: 5px;
    margin: 8px;
    padding: 5px;
}

#menu>div>a {
    color: #fff;
    font-size: 17px;
    font-family: "SF Mono", Courier, Menlo, Consolas, monospace;
    text-decoration: none;
    padding: 5px;
}

#menu>div:hover {
    transform: scale(1.1, 1.0);
}
</style>