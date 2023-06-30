<template>
  <div id="topBarReplacer"></div>
  <div class="flex items-center p-5px">
    <button
      id="menuButton"
      @click="toggleMenu()"
      class="i-mingcute-menu-fill text-35px text-white"
    ></button>
    <div
      id="menu"
      v-show="!menuHidden"
      class="absolute left-15px top-45px z-100"
    >
      <HeaderLink
        href="https://github.com/zhangzheheng12345/visual-brainfuck-web"
      >
        Github Repo
      </HeaderLink>
      <HeaderLink href="https://github.com/zhangzheheng12345">
        My Profile
      </HeaderLink>
      <HeaderLink href="https://esolangs.org/wiki/brainfuck">
        Brainfuck Wiki
      </HeaderLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderLink from './HeaderLink.vue'

const menuHidden = ref(true)

function toggleMenu() {
  menuHidden.value = !menuHidden.value
}
</script>
