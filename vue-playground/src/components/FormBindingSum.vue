<script setup lang="ts">
import { ref, watch } from 'vue'

const a = ref(0)
const b = ref(0)
const sum = ref(0)

watch(
  [a, b],
  ([nextA, nextB]) => {
    sum.value = (Number(nextA) || 0) + (Number(nextB) || 0)
  },
  { immediate: true },
)
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header>
      <p class="text-sm opacity-70">
        Two number inputs bound with v-model.number. A watch on both values recalculates their sum
        whenever either changes.
      </p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2">
      <label class="flex flex-col gap-1.5 text-sm">
        <span class="opacity-70">Value A</span>
        <input
          v-model.number="a"
          type="number"
          class="border bg-transparent px-3 py-1.5 outline-none"
        />
      </label>

      <label class="flex flex-col gap-1.5 text-sm">
        <span class="opacity-70">Value B</span>
        <input
          v-model.number="b"
          type="number"
          class="border bg-transparent px-3 py-1.5 outline-none"
        />
      </label>
    </div>

    <p class="text-sm opacity-70">Bound values: a = {{ a }}, b = {{ b }}</p>

    <p class="text-sm opacity-70">Sum from the watcher</p>
    <p class="text-4xl font-bold tabular-nums">{{ sum }}</p>
  </section>
</template>
