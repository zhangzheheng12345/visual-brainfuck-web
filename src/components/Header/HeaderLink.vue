<template>
  <div class="bg-zinc-700 hover:bg-zinc-600 p-7px pl-10px">
    <a :href="props.href" class="text-white decoration-none">
      <slot></slot>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string
}>()
</script>
