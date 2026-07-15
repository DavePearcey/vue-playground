<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from './components/BaseLayout.vue'
</script>

<template>
  <header class="p-5">
    <nav class="flex justify-end gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <BaseLayout title="Vue Playground">
    <RouterView />
  </BaseLayout>

  <footer class="mt-5 p-5">
    <p class="text-center text-sm opacity-70">Built with curiosity and caffeine.</p>
  </footer>
</template>
