import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmailValidation from '../EmailValidation.vue'

describe('EmailValidation', () => {
  it('shows required error when empty', () => {
    const wrapper = mount(EmailValidation)

    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Please enter a valid email address.')
  })

  it('shows format error for invalid email', async () => {
    const wrapper = mount(EmailValidation)
    const input = wrapper.find('input[type="email"]')

    await input.setValue('not-an-email')

    expect(wrapper.text()).toContain('Enter a valid email address')
    expect(wrapper.text()).toContain('Please enter a valid email address.')
  })

  it('rejects short TLD like a@b.c', async () => {
    const wrapper = mount(EmailValidation)
    const input = wrapper.find('input[type="email"]')

    await input.setValue('a@b.c')

    expect(wrapper.text()).toContain('Enter a valid email address')
  })

  it('accepts a valid email', async () => {
    const wrapper = mount(EmailValidation)
    const input = wrapper.find('input[type="email"]')

    await input.setValue('name@example.com')

    expect(wrapper.text()).toContain('Valid — local part')
    expect(wrapper.find('.text-red-600').exists()).toBe(false)
  })

  it('trims whitespace before validating', async () => {
    const wrapper = mount(EmailValidation)
    const input = wrapper.find('input[type="email"]')

    await input.setValue('  name@example.com  ')

    expect(wrapper.text()).toContain('Valid — local part')
  })
})
