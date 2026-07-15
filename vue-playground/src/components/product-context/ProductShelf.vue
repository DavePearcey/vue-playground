<script setup lang="ts">
import { inject } from 'vue'
import { catalogKey } from './catalogContext'
import ProductGrid from './ProductGrid.vue'

// Middle layer: reads store name from context, but does not receive formatPrice
// or products as props — and does not forward them downward.
const catalog = inject(catalogKey)

if (!catalog) {
  throw new Error('ProductShelf must be used inside ProductCatalog')
}

const { storeName } = catalog
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold">{{ storeName }} — catalog</h3>
    <ProductGrid />
  </div>
</template>
