<script setup lang="ts">
import { provide, ref } from 'vue'
import { catalogKey, type Product } from './catalogContext'
import ProductShelf from './ProductShelf.vue'

const storeName = 'Vue Mart'
const currency = 'GBP'

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Ceramic Mug',
    description: 'Matte finish, 350ml.',
    price: 12.5,
  },
  {
    id: 2,
    name: 'Notebook',
    description: 'A5 ruled, 120 pages.',
    price: 7.99,
  },
  {
    id: 3,
    name: 'Desk Lamp',
    description: 'Adjustable arm, warm LED.',
    price: 34,
  },
])

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}

provide(catalogKey, {
  storeName,
  currency,
  products,
  formatPrice,
})
</script>

<template>
  <section class="flex flex-col gap-4 border border-current/15 p-6">
    <header class="flex flex-col gap-1">
      <p class="text-sm opacity-70">
        Shared catalog data (storeName, currency, formatPrice, products) is provided here. Middle
        layers do not prop-drill it; ProductCard injects it from context.
      </p>
      <p class="text-xs opacity-50">
        Tree: ProductCatalog → ProductShelf → ProductGrid → ProductCard
      </p>
    </header>

    <ProductShelf />
  </section>
</template>
