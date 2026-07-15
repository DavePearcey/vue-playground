import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CounterPanel from '../CounterPanel.vue'
import { useCounterStore } from '@/stores/counter'

describe('CounterPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('local state (persist=false)', () => {
    it('renders title and local description', () => {
      const wrapper = mount(CounterPanel, {
        props: { title: 'Local state', persist: false },
      })

      expect(wrapper.find('h2').text()).toBe('Local state')
      expect(wrapper.text()).toContain('Local ref')
      expect(wrapper.find('.text-4xl').text()).toBe('0')
    })

    it('increments, doubles, and resets locally', async () => {
      const wrapper = mount(CounterPanel, {
        props: { title: 'Local', persist: false },
      })

      const [inc, dbl, reset] = wrapper.findAll('button')

      await inc!.trigger('click')
      expect(wrapper.find('.text-4xl').text()).toBe('1')

      await dbl!.trigger('click')
      expect(wrapper.find('.text-4xl').text()).toBe('2')

      await reset!.trigger('click')
      expect(wrapper.find('.text-4xl').text()).toBe('0')
    })

    it('does not mutate the Pinia store', async () => {
      const store = useCounterStore()
      const wrapper = mount(CounterPanel, {
        props: { title: 'Local', persist: false },
      })

      await wrapper.findAll('button')[0]!.trigger('click')

      expect(store.count).toBe(0)
      expect(wrapper.find('.text-4xl').text()).toBe('1')
    })
  })

  describe('Pinia store (persist=true)', () => {
    it('renders store description', () => {
      const wrapper = mount(CounterPanel, {
        props: { title: 'Pinia store', persist: true },
        global: { plugins: [createPinia()] },
      })

      expect(wrapper.text()).toContain('Pinia store')
    })

    it('increments, doubles, and resets via the store', async () => {
      const pinia = createPinia()
      setActivePinia(pinia)
      const store = useCounterStore()

      const wrapper = mount(CounterPanel, {
        props: { title: 'Pinia', persist: true },
        global: { plugins: [pinia] },
      })

      const [inc, dbl, reset] = wrapper.findAll('button')

      await inc!.trigger('click')
      expect(store.count).toBe(1)
      expect(wrapper.find('.text-4xl').text()).toBe('1')

      await dbl!.trigger('click')
      expect(store.count).toBe(2)

      await reset!.trigger('click')
      expect(store.count).toBe(0)
    })

    it('shares count across panels using the same store', async () => {
      const pinia = createPinia()

      const a = mount(CounterPanel, {
        props: { title: 'A', persist: true },
        global: { plugins: [pinia] },
      })
      const b = mount(CounterPanel, {
        props: { title: 'B', persist: true },
        global: { plugins: [pinia] },
      })

      await a.findAll('button')[0]!.trigger('click')

      expect(a.find('.text-4xl').text()).toBe('1')
      expect(b.find('.text-4xl').text()).toBe('1')
    })
  })
})
