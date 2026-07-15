import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import 'pinia-plugin-persistedstate'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    function double() {
      count.value *= 2
    }

    function reset() {
      count.value = 0
    }

    return { count, doubleCount, increment, double, reset }
  },
  {
    persist: true,
  },
)
