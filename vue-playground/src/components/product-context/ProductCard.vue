<script setup lang="ts">
import { inject } from 'vue'
import { catalogKey, type Product } from './catalogContext'

const props = defineProps<{
  product: Product
}>()

// Deep child: injects shared context from ProductCatalog (skipped shelf + grid).
// Without provide/inject, currency / formatPrice / storeName would be drilled
// through every parent as props.
const catalog = inject(catalogKey)

if (!catalog) {
  throw new Error('ProductCard must be used inside ProductCatalog')
}

const { storeName, currency, formatPrice } = catalog
</script>

<template>
  <article class="flex h-full flex-col gap-3 border border-current/15 p-4">
    <header class="flex flex-col gap-1">
      <h4 class="font-bold">{{ props.product.name }}</h4>
      <p class="text-sm opacity-70">{{ props.product.description }}</p>
    </header>

    <p class="mt-auto text-2xl font-bold tabular-nums">
      {{ formatPrice(props.product.price) }}
    </p>

    <p class="text-xs opacity-50">
      Injected from context: {{ storeName }} · {{ currency }} — not passed as props through
      ProductShelf / ProductGrid.
    </p>
  </article>
</template>
