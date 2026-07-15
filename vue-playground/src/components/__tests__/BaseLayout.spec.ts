import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLayout from '../BaseLayout.vue'

describe('BaseLayout', () => {
  it('renders the title', () => {
    const wrapper = mount(BaseLayout, {
      props: { title: 'Vue Playground' },
    })

    expect(wrapper.find('h1').text()).toBe('Vue Playground')
  })

  it('renders default slot content', () => {
    const wrapper = mount(BaseLayout, {
      props: { title: 'Layout' },
      slots: { default: '<p class="slot-content">Hello slot</p>' },
    })

    expect(wrapper.find('.slot-content').text()).toBe('Hello slot')
  })
})
