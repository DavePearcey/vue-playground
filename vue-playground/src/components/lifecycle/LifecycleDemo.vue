<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { LIFECYCLE_HOOKS, type LifecycleHookName } from './lifecycleHooks'
import LifecycleProbe from './LifecycleProbe.vue'

const HIGHLIGHT_MS = 550

const isMounted = ref(false)
const count = ref(0)
const activeHook = ref<LifecycleHookName | null>(null)
const fireCounts = reactive(
  Object.fromEntries(LIFECYCLE_HOOKS.map((hook) => [hook, 0])) as Record<LifecycleHookName, number>,
)
const recentLog = ref<{ id: number; hook: LifecycleHookName; at: string }[]>([])

let logId = 0
const highlightQueue: LifecycleHookName[] = []
let drainingQueue = false

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function drainHighlightQueue() {
  if (drainingQueue) return
  drainingQueue = true

  while (highlightQueue.length) {
    const hook = highlightQueue.shift()
    if (!hook) break
    activeHook.value = hook
    await wait(HIGHLIGHT_MS)
  }

  activeHook.value = null
  drainingQueue = false
}

function report(hook: LifecycleHookName) {
  fireCounts[hook] += 1

  recentLog.value = [
    {
      id: ++logId,
      hook,
      at: new Date().toLocaleTimeString(),
    },
    ...recentLog.value,
  ].slice(0, 12)

  // Hooks often fire in a tight burst; queue highlights so each turn is visible.
  highlightQueue.push(hook)
  void drainHighlightQueue()
}

function mountProbe() {
  if (!isMounted.value) {
    isMounted.value = true
  }
}

function unmountProbe() {
  if (isMounted.value) {
    isMounted.value = false
  }
}

function triggerUpdate() {
  if (isMounted.value) {
    count.value += 1
  }
}

async function remountProbe() {
  isMounted.value = false
  await nextTick()
  count.value = 0
  isMounted.value = true
}

function clearLog() {
  recentLog.value = []
  highlightQueue.length = 0
  for (const hook of LIFECYCLE_HOOKS) {
    fireCounts[hook] = 0
  }
  activeHook.value = null
}
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header>
      <p class="text-sm opacity-70">
        Interactive lifecycle map. Mount, update, or unmount the probe child and watch each hook
        highlight as it runs.
      </p>
    </header>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5 disabled:opacity-40"
        :disabled="isMounted"
        @click="mountProbe"
      >
        Mount
      </button>
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5 disabled:opacity-40"
        :disabled="!isMounted"
        @click="triggerUpdate"
      >
        Update
      </button>
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5 disabled:opacity-40"
        :disabled="!isMounted"
        @click="unmountProbe"
      >
        Unmount
      </button>
      <button
        type="button"
        class="border px-3 py-1.5 text-sm hover:bg-current/5"
        @click="remountProbe"
      >
        Remount
      </button>
      <button type="button" class="border px-3 py-1.5 text-sm hover:bg-current/5" @click="clearLog">
        Clear counts
      </button>
    </div>

    <LifecycleProbe v-if="isMounted" :count="count" :report="report" />
    <p v-else class="border border-dashed border-current/20 p-3 text-sm opacity-70">
      Probe is unmounted — click <strong>Mount</strong> to start the lifecycle.
    </p>

    <div class="flex flex-col gap-2">
      <h3 class="font-bold">Hooks</h3>
      <ol class="flex flex-col gap-2">
        <li
          v-for="hook in LIFECYCLE_HOOKS"
          :key="hook"
          class="flex items-center justify-between gap-3 border px-3 py-2 text-sm transition-colors duration-300"
          :class="
            activeHook === hook
              ? 'border-current bg-current/15'
              : fireCounts[hook] > 0
                ? 'border-current/25 bg-current/5'
                : 'border-current/10'
          "
        >
          <span class="flex items-center gap-2 font-mono">
            <span
              class="inline-block size-2 rounded-full transition-colors duration-300"
              :class="activeHook === hook ? 'bg-current' : 'bg-current/20'"
            />
            {{ hook }}
          </span>
          <span class="tabular-nums opacity-70">
            ×{{ fireCounts[hook] }}
            <span v-if="activeHook === hook" class="ml-2 font-bold opacity-100">now</span>
          </span>
        </li>
      </ol>
    </div>

    <div v-if="recentLog.length" class="flex flex-col gap-2">
      <h3 class="font-bold">Recent firings</h3>
      <ul class="flex flex-col gap-1 text-sm">
        <li
          v-for="entry in recentLog"
          :key="entry.id"
          class="flex justify-between gap-3 border border-current/10 px-3 py-1.5 font-mono"
        >
          <span>{{ entry.hook }}</span>
          <span class="opacity-50">{{ entry.at }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
