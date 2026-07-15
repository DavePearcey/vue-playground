<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'
import type { LifecycleHookName } from './lifecycleHooks'

const props = defineProps<{
  count: number
  report: (hook: LifecycleHookName) => void
}>()

props.report('setup')

onBeforeMount(() => props.report('onBeforeMount'))
onMounted(() => props.report('onMounted'))
onBeforeUpdate(() => props.report('onBeforeUpdate'))
onUpdated(() => props.report('onUpdated'))
onBeforeUnmount(() => props.report('onBeforeUnmount'))
onUnmounted(() => props.report('onUnmounted'))
</script>

<template>
  <div class="border border-dashed border-current/20 p-3 text-sm">
    <p class="font-bold">LifecycleProbe</p>
    <p class="opacity-70">
      Mounted child — count prop is <code>{{ count }}</code
      >. Changing count triggers update hooks.
    </p>
  </div>
</template>
