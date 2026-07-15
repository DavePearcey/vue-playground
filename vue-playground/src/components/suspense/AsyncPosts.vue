<script setup lang="ts">
import { fetchFakePosts } from '@/api/fakePosts'

// Top-level await makes this an async setup component.
// Suspense shows its fallback until this promise settles.
const posts = await fetchFakePosts()
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-sm opacity-70">Result — <code>fetchFakePosts()</code> resolved after 2s.</p>
    <ul class="flex flex-col gap-2">
      <li v-for="post in posts" :key="post.id" class="border border-current/10 px-3 py-2 text-sm">
        <p class="font-bold">{{ post.title }}</p>
        <p class="opacity-70">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>
