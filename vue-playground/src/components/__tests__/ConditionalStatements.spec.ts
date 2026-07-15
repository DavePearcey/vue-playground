import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConditionalStatements from '../ConditionalStatements.vue'

describe('ConditionalStatements', () => {
  it('shows idle status by default', () => {
    const wrapper = mount(ConditionalStatements)

    expect(wrapper.text()).toContain('Idle — nothing is loading yet.')
  })

  it('switches v-if branches when status buttons are clicked', async () => {
    const wrapper = mount(ConditionalStatements)

    await wrapper.get('button.capitalize').trigger('click') // idle already active
    const buttons = wrapper.findAll('button.capitalize')

    await buttons[1]!.trigger('click')
    expect(wrapper.text()).toContain('Loading — waiting for a response…')

    await buttons[2]!.trigger('click')
    expect(wrapper.text()).toContain('Ready — data has arrived.')

    await buttons[3]!.trigger('click')
    expect(wrapper.text()).toContain('Error — something went wrong.')
  })

  it('toggles details with v-show without removing them from the DOM', async () => {
    const wrapper = mount(ConditionalStatements)
    const details = wrapper.findAll('p').find((p) => p.text().includes('remain mounted'))!

    expect(details.element.style.display).not.toBe('none')

    await wrapper.get('button.w-fit').trigger('click')

    expect(details.exists()).toBe(true)
    expect(details.element.style.display).toBe('none')
    expect(wrapper.get('button.w-fit').text()).toContain('Show details')
  })

  it('renders initial list items and pending filtered items', () => {
    const wrapper = mount(ConditionalStatements)

    expect(wrapper.text()).toContain('Apples')
    expect(wrapper.text()).toContain('Bread')
    expect(wrapper.text()).toContain('Milk')
    expect(wrapper.text()).toContain('Pending')
  })

  it('adds a new item from the form', async () => {
    const wrapper = mount(ConditionalStatements)

    await wrapper.get('input[type="text"]').setValue('Eggs')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('Eggs')
    expect(wrapper.get('input[type="text"]').element).toHaveProperty('value', '')
  })

  it('does not add blank items', async () => {
    const wrapper = mount(ConditionalStatements)
    const before = wrapper.findAll('li').length

    await wrapper.get('input[type="text"]').setValue('   ')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.findAll('li').length).toBe(before)
  })

  it('toggles and removes list items', async () => {
    const wrapper = mount(ConditionalStatements)
    const firstCheckbox = wrapper.findAll('input[type="checkbox"]')[0]!

    await firstCheckbox.setValue(true)
    expect(wrapper.text()).not.toMatch(/Pending[\s\S]*Apples/)

    await wrapper
      .findAll('button')
      .find((b) => b.text() === 'Remove')!
      .trigger('click')
    expect(wrapper.text()).not.toContain('Apples')
  })

  it('shows empty state when all items are removed', async () => {
    const wrapper = mount(ConditionalStatements)
    const removeButtons = () => wrapper.findAll('button').filter((b) => b.text() === 'Remove')

    while (removeButtons().length) {
      await removeButtons()[0]!.trigger('click')
    }

    expect(wrapper.text()).toContain('No items')
  })
})
