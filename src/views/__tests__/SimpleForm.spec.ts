import { describe, it, expect, vi, test } from 'vitest'
import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import SimpleForm from '@/views/SimpleForm.vue'
import router from '@/router'
import i18n from '@/i18n/index'
import waitForExpect from 'wait-for-expect'

function mountSimpleForm() {
  const wrapper = mount(SimpleForm, {
    global: {
      plugins: [router, i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: SimpleForm', () => {
  const wrapper = mountSimpleForm()
  const nameInput = wrapper.find('input[name="name"]')
  const emailInput = wrapper.find('input[name="email"]')
  const passwordInput = wrapper.find('input[name="password"]')
  const confirmPasswordInput = wrapper.find('input[name="confirmPassword"]')
  const submitBtn = wrapper.find('[id="submitBtn"]')
  const form = wrapper.find('form')

  it('renders properly', async () => {
    expect(SimpleForm).toBeTruthy()
    expect(nameInput.exists()).toBe(true)
    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
    expect(confirmPasswordInput.exists()).toBe(true)
    expect(submitBtn.exists()).toBe(true)
    expect(form.exists()).toBe(true)
  })
  test('error msg fields', async () => {
    await nameInput.setValue('')
    await nameInput.trigger('blur')
    await emailInput.setValue('')
    await emailInput.trigger('blur')
    await passwordInput.setValue('')
    await passwordInput.trigger('blur')
    await confirmPasswordInput.setValue('')
    await confirmPasswordInput.trigger('blur')
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('[id="nameErrorMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="emailErrorMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="passwordErrorMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="confirmPasswordErrorMsg"]').exists()).toBeTruthy()
    })
  })
  test('submit form invalid', async () => {
    const spyOnInvalidSubmit = vi.spyOn(wrapper.vm, 'onInvalidSubmit')
    await nameInput.setValue('ab12')
    await submitBtn.trigger('submit')
    await flushPromises()
    await waitForExpect(() => {
      expect(spyOnInvalidSubmit).toBeCalledTimes(1)
    })
  })
  test('success msg fields', async () => {
    await nameInput.setValue('my name')
    await emailInput.setValue('email@email.com')
    await passwordInput.setValue('123456')
    await confirmPasswordInput.setValue('123456')
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('[id="nameSuccessMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="emailSuccessMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="passwordSuccessMsg"]').exists()).toBeTruthy()
      expect(wrapper.find('[id="confirmPasswordSuccessMsg"]').exists()).toBeTruthy()
    })
  })

  test('submit form valid', async () => {
    const spyOnInvalidSubmit = vi.spyOn(wrapper.vm, 'onInvalidSubmit')
    const spyOnSubmit = vi.spyOn(wrapper.vm, 'onSubmit')
    await submitBtn.trigger('submit')
    await flushPromises()
    await waitForExpect(() => {
      expect(spyOnInvalidSubmit).toBeCalledTimes(0)
      expect(spyOnSubmit).toBeCalled()
    })
  })
})
