<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center">{{ title }}</h1>
    <div class="mx-auto mt-4 px-4 max-w-[1280px]">
      <slot />
    </div>
  </div>
</template>
