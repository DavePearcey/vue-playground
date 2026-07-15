import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import LifecycleDemo from '../LifecycleDemo.vue'
import LifecycleProbe from '../LifecycleProbe.vue'

describe('LifecycleDemo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows unmounted placeholder initially', () => {
    const wrapper = mount(LifecycleDemo)

    expect(wrapper.text()).toContain('Probe is unmounted')
    expect(wrapper.findComponent(LifecycleProbe).exists()).toBe(false)
  })

  it('mounts the probe and records mount hooks', async () => {
    const wrapper = mount(LifecycleDemo)

    await wrapper.get('button').trigger('click') // Mount
    await nextTick()
    await vi.advanceTimersByTimeAsync(2000)

    expect(wrapper.findComponent(LifecycleProbe).exists()).toBe(true)
    expect(wrapper.text()).toContain('LifecycleProbe')
    expect(wrapper.text()).toContain('×1')
    expect(wrapper.text()).toContain('Recent firings')
  })

  it('disables Mount while mounted and Update/Unmount while unmounted', async () => {
    const wrapper = mount(LifecycleDemo)
    const buttons = () => wrapper.findAll('button')

    expect(buttons()[0]!.attributes('disabled')).toBeUndefined()
    expect(buttons()[1]!.attributes('disabled')).toBeDefined()
    expect(buttons()[2]!.attributes('disabled')).toBeDefined()

    await buttons()[0]!.trigger('click')
    await nextTick()

    expect(buttons()[0]!.attributes('disabled')).toBeDefined()
    expect(buttons()[1]!.attributes('disabled')).toBeUndefined()
    expect(buttons()[2]!.attributes('disabled')).toBeUndefined()
  })

  it('updates the probe count and records update hooks', async () => {
    const wrapper = mount(LifecycleDemo)

    await wrapper.get('button').trigger('click')
    await nextTick()
    await vi.advanceTimersByTimeAsync(2000)

    const updateBtn = wrapper.findAll('button')[1]!
    await updateBtn.trigger('click')
    await nextTick()
    await vi.advanceTimersByTimeAsync(2000)

    expect(wrapper.findComponent(LifecycleProbe).text()).toContain('1')
    expect(wrapper.text()).toMatch(/onBeforeUpdate/)
    expect(wrapper.text()).toMatch(/onUpdated/)
  })

  it('unmounts the probe', async () => {
    const wrapper = mount(LifecycleDemo)

    await wrapper.get('button').trigger('click')
    await nextTick()

    const unmountBtn = wrapper.findAll('button')[2]!
    await unmountBtn.trigger('click')
    await nextTick()

    expect(wrapper.findComponent(LifecycleProbe).exists()).toBe(false)
    expect(wrapper.text()).toContain('Probe is unmounted')
  })

  it('clears counts and recent log', async () => {
    const wrapper = mount(LifecycleDemo)

    await wrapper.get('button').trigger('click')
    await nextTick()
    await vi.advanceTimersByTimeAsync(2000)

    const clearBtn = wrapper.findAll('button').find((b) => b.text() === 'Clear counts')!
    await clearBtn.trigger('click')
    await flushPromises()

    expect(wrapper.text()).not.toContain('Recent firings')
    expect(wrapper.text()).toContain('×0')
  })
})
