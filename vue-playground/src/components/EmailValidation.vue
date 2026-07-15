<script setup lang="ts">
import { ref, watch } from 'vue'

// Local part + domain labels; TLD must be 2+ letters (rejects a@b.c).
const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

const email = ref('')
const error = ref('')
const isValid = ref(false)

watch(
  email,
  (value) => {
    const trimmed = value.trim()

    if (!trimmed) {
      error.value = 'Email is required.'
      isValid.value = false
      return
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      error.value = 'Enter a valid email address (e.g. name@example.com).'
      isValid.value = false
      return
    }

    error.value = ''
    isValid.value = true
  },
  { immediate: true },
)
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header>
      <p class="text-sm opacity-70">
        An email input bound with v-model. A watch validates the value against a regex on every
        change.
      </p>
    </header>

    <label class="flex flex-col gap-1.5 text-sm">
      <span class="opacity-70">Email</span>
      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        class="border bg-transparent px-3 py-1.5 outline-none"
        :class="{ 'border-red-500': error }"
      />
      <span v-if="error" class="text-xs text-red-600">{{ error }}</span>
    </label>

    <div
      class="border border-dashed border-current/20 p-3 text-sm"
      :class="isValid ? 'opacity-70' : 'text-red-600'"
    >
      <template v-if="isValid">
        Valid — local part, domain labels, and a TLD of 2+ letters.
      </template>
      <template v-else> Please enter a valid email address. </template>
    </div>
  </section>
</template>
