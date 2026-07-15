<script setup lang="ts">
import { computed, ref } from 'vue'

type Status = 'idle' | 'loading' | 'ready' | 'error'

const status = ref<Status>('idle')
const showDetails = ref(true)

const items = ref([
  { id: 1, label: 'Apples', done: false },
  { id: 2, label: 'Bread', done: true },
  { id: 3, label: 'Milk', done: false },
])

const nextId = ref(4)
const newLabel = ref('')

const pendingItems = computed(() => items.value.filter((item) => !item.done))

function setStatus(next: Status) {
  status.value = next
}

function addItem() {
  const label = newLabel.value.trim()
  if (!label) return

  items.value.push({ id: nextId.value++, label, done: false })
  newLabel.value = ''
}

function toggleItem(id: number) {
  const item = items.value.find((entry) => entry.id === id)
  if (item) item.done = !item.done
}

function removeItem(id: number) {
  items.value = items.value.filter((entry) => entry.id !== id)
}
</script>

<template>
  <section class="flex flex-col gap-6 border border-current/15 p-6">
    <header>
      <p class="text-sm opacity-70">
        Interactive examples of v-if, v-else-if, v-else, v-show, and v-for.
      </p>
    </header>

    <div class="flex flex-col gap-3">
      <h3 class="font-bold">v-if / v-else-if / v-else</h3>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="option in ['idle', 'loading', 'ready', 'error'] as const"
          :key="option"
          type="button"
          class="border px-3 py-1.5 text-sm capitalize hover:bg-current/5"
          :class="{ 'bg-current/10': status === option }"
          @click="setStatus(option)"
        >
          {{ option }}
        </button>
      </div>

      <p v-if="status === 'idle'" class="border border-dashed border-current/20 p-3 text-sm">
        Idle — nothing is loading yet.
      </p>
      <p
        v-else-if="status === 'loading'"
        class="border border-dashed border-current/20 p-3 text-sm"
      >
        Loading — waiting for a response…
      </p>
      <p v-else-if="status === 'ready'" class="border border-dashed border-current/20 p-3 text-sm">
        Ready — data has arrived.
      </p>
      <p v-else class="border border-dashed border-current/20 p-3 text-sm">
        Error — something went wrong.
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="font-bold">v-show</h3>
      <p class="text-sm opacity-70">
        Toggles display only — the element stays in the DOM either way.
      </p>

      <button
        type="button"
        class="w-fit border px-3 py-1.5 text-sm hover:bg-current/5"
        @click="showDetails = !showDetails"
      >
        {{ showDetails ? 'Hide' : 'Show' }} details
      </button>

      <p v-show="showDetails" class="border border-dashed border-current/20 p-3 text-sm">
        These details remain mounted when hidden.
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <h3 class="font-bold">v-for</h3>
      <p class="text-sm opacity-70">Renders a list.</p>

      <form class="flex flex-wrap gap-2" @submit.prevent="addItem">
        <input
          v-model="newLabel"
          type="text"
          placeholder="New item"
          class="min-w-40 flex-1 border bg-transparent px-3 py-1.5 text-sm outline-none"
        />
        <button type="submit" class="border px-3 py-1.5 text-sm hover:bg-current/5">Add</button>
      </form>

      <ul v-if="items.length" class="flex flex-col gap-2">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between gap-3 border border-current/10 px-3 py-2 text-sm"
        >
          <label class="flex items-center gap-2">
            <input type="checkbox" :checked="item.done" @change="toggleItem(item.id)" />
            <span :class="{ 'line-through opacity-50': item.done }">{{ item.label }}</span>
          </label>
          <button
            type="button"
            class="border px-2 py-0.5 text-xs hover:bg-current/5"
            @click="removeItem(item.id)"
          >
            Remove
          </button>
        </li>
      </ul>
      <p v-else class="border border-dashed border-current/20 p-3 text-sm opacity-70">
        No items — this empty state is a v-else on the list.
      </p>

      <template v-if="pendingItems.length">
        <p class="text-sm opacity-70">
          Pending (filtered with a computed, then listed with v-for):
        </p>
        <ul class="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li v-for="item in pendingItems" :key="item.id">{{ item.label }}</li>
        </ul>
      </template>
    </div>
  </section>
</template>
