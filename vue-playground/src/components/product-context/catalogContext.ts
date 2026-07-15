import type { InjectionKey, Ref } from 'vue'

export type Product = {
  id: number
  name: string
  description: string
  price: number
}

export type CatalogContext = {
  storeName: string
  currency: string
  products: Ref<Product[]>
  formatPrice: (amount: number) => string
}

export const catalogKey: InjectionKey<CatalogContext> = Symbol('catalog')
