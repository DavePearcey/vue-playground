<script setup lang="ts">
import { inject } from 'vue'
import { catalogKey } from './catalogContext'
import ProductCard from './ProductCard.vue'

const catalog = inject(catalogKey)

if (!catalog) {
  throw new Error('ProductGrid must be used inside ProductCatalog')
}

const { products } = catalog
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-3">
    <li v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </li>
  </ul>
</template>
