import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ProductCatalog from '../ProductCatalog.vue'
import ProductCard from '../ProductCard.vue'
import ProductShelf from '../ProductShelf.vue'
import ProductGrid from '../ProductGrid.vue'
import { catalogKey, type CatalogContext, type Product } from '../catalogContext'

const sampleProduct: Product = {
  id: 1,
  name: 'Ceramic Mug',
  description: 'Matte finish, 350ml.',
  price: 12.5,
}

function makeCatalog(overrides: Partial<CatalogContext> = {}): CatalogContext {
  return {
    storeName: 'Vue Mart',
    currency: 'GBP',
    products: ref([sampleProduct]),
    formatPrice: (amount: number) => `£${amount.toFixed(2)}`,
    ...overrides,
  }
}

describe('ProductCatalog', () => {
  it('renders the shelf and product cards from provided catalog', () => {
    const wrapper = mount(ProductCatalog)

    expect(wrapper.text()).toContain('Vue Mart')
    expect(wrapper.text()).toContain('Ceramic Mug')
    expect(wrapper.text()).toContain('Notebook')
    expect(wrapper.text()).toContain('Desk Lamp')
    expect(wrapper.text()).toMatch(/£12\.50|£7\.99|£34\.00/)
  })
})

describe('ProductShelf', () => {
  it('shows store name from injected context', () => {
    const wrapper = mount(ProductShelf, {
      global: {
        provide: {
          [catalogKey as symbol]: makeCatalog(),
        },
      },
    })

    expect(wrapper.find('h3').text()).toBe('Vue Mart — catalog')
  })

  it('throws when used outside ProductCatalog', () => {
    expect(() => mount(ProductShelf)).toThrow('ProductShelf must be used inside ProductCatalog')
  })
})

describe('ProductGrid', () => {
  it('renders a card per product', () => {
    const products = ref([
      sampleProduct,
      { id: 2, name: 'Notebook', description: 'A5', price: 7.99 },
    ])

    const wrapper = mount(ProductGrid, {
      global: {
        provide: {
          [catalogKey as symbol]: makeCatalog({ products }),
        },
      },
    })

    expect(wrapper.findAllComponents(ProductCard)).toHaveLength(2)
  })

  it('throws when used outside ProductCatalog', () => {
    expect(() => mount(ProductGrid)).toThrow('ProductGrid must be used inside ProductCatalog')
  })
})

describe('ProductCard', () => {
  it('renders product details and formatted price from context', () => {
    const wrapper = mount(ProductCard, {
      props: { product: sampleProduct },
      global: {
        provide: {
          [catalogKey as symbol]: makeCatalog(),
        },
      },
    })

    expect(wrapper.text()).toContain('Ceramic Mug')
    expect(wrapper.text()).toContain('Matte finish, 350ml.')
    expect(wrapper.text()).toContain('£12.50')
    expect(wrapper.text()).toContain('Vue Mart')
    expect(wrapper.text()).toContain('GBP')
  })

  it('throws when used outside ProductCatalog', () => {
    expect(() => mount(ProductCard, { props: { product: sampleProduct } })).toThrow(
      'ProductCard must be used inside ProductCatalog',
    )
  })
})
