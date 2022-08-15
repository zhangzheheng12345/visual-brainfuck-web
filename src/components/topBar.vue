<template>
    <div id="topBarReplacer"></div>
    <div id="topBar">
        <div id="bfLogo">+,>[</div>
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
    color: var(--very-dark-grey);
    background-color: #fff;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 3px;
    font-size: 22px;
    border-radius: 15px;
    position: fixed;
    left: 10px;
    top: 9px;
    font-family: "TheGoodMonolith", Courier, Menlo, Consolas, monospace;
    font-weight: bolder;
    letter-spacing: 3px;
    cursor: default;
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