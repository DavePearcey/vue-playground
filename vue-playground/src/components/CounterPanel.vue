<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const props = defineProps<{
  persist: boolean
  title: string
}>()

const store = useCounterStore()
const { count: storeCount } = storeToRefs(store)
const localCount = ref(0)

const count = computed(() => (props.persist ? storeCount.value : localCount.value))

function increment() {
  if (props.persist) {
    store.increment()
  } else {
    localCount.value++
  }
}

function double() {
  if (props.persist) {
    store.double()
  } else {
    localCount.value *= 2
  }
}

function reset() {
  if (props.persist) {
    store.reset()
  } else {
    localCount.value = 0
  }
}
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header>
      <h2 class="text-lg font-bold">{{ title }}</h2>
      <p class="text-sm opacity-70">
        {{
          persist
            ? 'Pinia store (shared + survives page refresh via localStorage)'
            : 'Local ref (isolated; resets on refresh)'
        }}
      </p>
    </header>

    <p class="text-4xl font-bold tabular-nums">{{ count }}</p>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5"
        @click="increment"
      >
        +1
      </button>
      <button type="button" class="border px-3 py-1.5 text-sm hover:bg-current/5" @click="double">
        ×2
      </button>
      <button type="button" class="border px-3 py-1.5 text-sm hover:bg-current/5" @click="reset">
        Reset
      </button>
    </div>
  </section>
</template>
