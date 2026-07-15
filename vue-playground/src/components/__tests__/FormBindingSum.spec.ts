import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormBindingSum from '../FormBindingSum.vue'

describe('FormBindingSum', () => {
  it('shows sum of 0 initially', () => {
    const wrapper = mount(FormBindingSum)

    expect(wrapper.text()).toContain('a = 0')
    expect(wrapper.text()).toContain('b = 0')
    expect(wrapper.find('.text-4xl').text()).toBe('0')
  })

  it('recalculates the sum when either input changes', async () => {
    const wrapper = mount(FormBindingSum)
    const [inputA, inputB] = wrapper.findAll('input[type="number"]')

    await inputA!.setValue(3)
    await inputB!.setValue(7)

    expect(wrapper.text()).toContain('a = 3')
    expect(wrapper.text()).toContain('b = 7')
    expect(wrapper.find('.text-4xl').text()).toBe('10')
  })

  it('treats empty/invalid numbers as 0', async () => {
    const wrapper = mount(FormBindingSum)
    const [inputA, inputB] = wrapper.findAll('input[type="number"]')

    await inputA!.setValue(5)
    await inputB!.setValue('')

    expect(wrapper.find('.text-4xl').text()).toBe('5')
  })
})
