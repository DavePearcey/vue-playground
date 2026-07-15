import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import HomeView from '../HomeView.vue'
import AboutView from '../AboutView.vue'
import ConditionalStatements from '@/components/ConditionalStatements.vue'
import CounterPanel from '@/components/CounterPanel.vue'
import EmailValidation from '@/components/EmailValidation.vue'
import FormBindingSum from '@/components/FormBindingSum.vue'
import LifecycleDemo from '@/components/lifecycle/LifecycleDemo.vue'
import ProductCatalog from '@/components/product-context/ProductCatalog.vue'
import SuspenseFetch from '@/components/suspense/SuspenseFetch.vue'

describe('HomeView', () => {
  it('renders playground section headings and demo components', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Conditionals & lists')
    expect(wrapper.text()).toContain('Counters')
    expect(wrapper.text()).toContain('Form bindings & watchers')
    expect(wrapper.text()).toContain('Provide / inject')
    expect(wrapper.text()).toContain('Suspense')
    expect(wrapper.text()).toContain('Lifecycle hooks')

    expect(wrapper.findComponent(ConditionalStatements).exists()).toBe(true)
    expect(wrapper.findAllComponents(CounterPanel)).toHaveLength(2)
    expect(wrapper.findComponent(FormBindingSum).exists()).toBe(true)
    expect(wrapper.findComponent(EmailValidation).exists()).toBe(true)
    expect(wrapper.findComponent(ProductCatalog).exists()).toBe(true)
    expect(wrapper.findComponent(SuspenseFetch).exists()).toBe(true)
    expect(wrapper.findComponent(LifecycleDemo).exists()).toBe(true)
  })
})

describe('AboutView', () => {
  it('renders about copy', () => {
    const wrapper = mount(AboutView)

    expect(wrapper.text()).toContain('about page')
    expect(wrapper.text()).toContain('routing')
  })
})
