import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LifecycleProbe from '../LifecycleProbe.vue'
import { LIFECYCLE_HOOKS } from '../lifecycleHooks'

describe('LifecycleProbe', () => {
  it('reports setup and mount hooks on mount', async () => {
    const report = vi.fn()

    mount(LifecycleProbe, {
      props: { count: 0, report },
    })
    await nextTick()

    expect(report).toHaveBeenCalledWith('setup')
    expect(report).toHaveBeenCalledWith('onBeforeMount')
    expect(report).toHaveBeenCalledWith('onMounted')
  })

  it('reports update hooks when count changes', async () => {
    const report = vi.fn()
    const wrapper = mount(LifecycleProbe, {
      props: { count: 0, report },
    })

    report.mockClear()
    await wrapper.setProps({ count: 1 })

    expect(report).toHaveBeenCalledWith('onBeforeUpdate')
    expect(report).toHaveBeenCalledWith('onUpdated')
  })

  it('reports unmount hooks on unmount', async () => {
    const report = vi.fn()
    const wrapper = mount(LifecycleProbe, {
      props: { count: 0, report },
    })

    report.mockClear()
    wrapper.unmount()
    await nextTick()

    expect(report).toHaveBeenCalledWith('onBeforeUnmount')
    expect(report).toHaveBeenCalledWith('onUnmounted')
  })

  it('renders the count prop', () => {
    const wrapper = mount(LifecycleProbe, {
      props: { count: 42, report: vi.fn() },
    })

    expect(wrapper.text()).toContain('42')
  })
})

describe('LIFECYCLE_HOOKS', () => {
  it('lists hooks in expected order', () => {
    expect(LIFECYCLE_HOOKS).toEqual([
      'setup',
      'onBeforeMount',
      'onMounted',
      'onBeforeUpdate',
      'onUpdated',
      'onBeforeUnmount',
      'onUnmounted',
    ])
  })
})
