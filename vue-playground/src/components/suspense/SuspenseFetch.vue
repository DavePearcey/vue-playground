<script setup lang="ts">
import { ref } from 'vue'
import AsyncPosts from './AsyncPosts.vue'

const started = ref(false)
const loadKey = ref(0)

function startFetch() {
  started.value = true
  loadKey.value += 1
}

function reset() {
  started.value = false
}
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header>
      <p class="text-sm opacity-70">
        Suspense wraps an async child that awaits a fake API fetchFakePosts() (2s delay). The child
        is not mounted until you click the button.
      </p>
    </header>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5"
        @click="startFetch"
      >
        {{ started ? 'Fetch again' : 'Fetch posts' }}
      </button>
      <button
        v-if="started"
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5"
        @click="reset"
      >
        Reset
      </button>
    </div>

    <p v-if="!started" class="border border-dashed border-current/20 p-3 text-sm opacity-70">
      Click <strong>Fetch posts</strong> to mount the async child inside <code>Suspense</code>.
    </p>

    <Suspense v-else :key="loadKey">
      <AsyncPosts />
      <template #fallback>
        <p class="border border-dashed border-current/20 p-3 text-sm opacity-70">
          Loading — Suspense fallback while the fake API waits 2 seconds…
        </p>
      </template>
    </Suspense>
  </section>
</template>
