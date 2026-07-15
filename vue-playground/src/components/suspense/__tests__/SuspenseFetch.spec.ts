import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent } from 'vue'
import AsyncPosts from '../AsyncPosts.vue'
import SuspenseFetch from '../SuspenseFetch.vue'

vi.mock('@/api/fakePosts', () => ({
  fetchFakePosts: vi.fn(async () => [
    { id: 1, title: 'Test post', body: 'Test body' },
    { id: 2, title: 'Another', body: 'More body' },
  ]),
}))

describe('AsyncPosts', () => {
  it('renders posts after the fake API resolves', async () => {
    const Host = defineComponent({
      components: { AsyncPosts },
      template: `
        <Suspense>
          <AsyncPosts />
          <template #fallback><p>loading</p></template>
        </Suspense>
      `,
    })

    const wrapper = mount(Host)
    expect(wrapper.text()).toContain('loading')

    await flushPromises()

    expect(wrapper.text()).toContain('Test post')
    expect(wrapper.text()).toContain('Test body')
    expect(wrapper.text()).toContain('Another')
  })
})

describe('SuspenseFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows instructions before fetch starts', () => {
    const wrapper = mount(SuspenseFetch)

    expect(wrapper.text()).toContain('Click')
    expect(wrapper.text()).toContain('Fetch posts')
    expect(wrapper.find('button').text()).toBe('Fetch posts')
  })

  it('shows Suspense fallback then resolved posts', async () => {
    const wrapper = mount(SuspenseFetch)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('Loading — Suspense fallback')
    expect(wrapper.findAll('button').some((b) => b.text() === 'Reset')).toBe(true)
    expect(wrapper.findAll('button')[0]!.text()).toBe('Fetch again')

    await flushPromises()

    expect(wrapper.text()).toContain('Test post')
    expect(wrapper.text()).toContain('Result')
  })

  it('reset returns to the initial idle state', async () => {
    const wrapper = mount(SuspenseFetch)

    await wrapper.get('button').trigger('click')
    await flushPromises()

    const resetBtn = wrapper.findAll('button').find((b) => b.text() === 'Reset')!
    await resetBtn.trigger('click')

    expect(wrapper.text()).toContain('Click')
    expect(wrapper.find('button').text()).toBe('Fetch posts')
    expect(wrapper.text()).not.toContain('Test post')
  })
})
