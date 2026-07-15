export const LIFECYCLE_HOOKS = [
  'setup',
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted',
] as const

export type LifecycleHookName = (typeof LIFECYCLE_HOOKS)[number]
