import { describe, it, expect, vi, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TextInput from '@/components/TextInput.vue'
import i18n from '@/i18n/index'
import waitForExpect from 'wait-for-expect'

function mountTextInput() {
  const wrapper = mount(TextInput, {
    props: {
      type: 'text',
      value: 'initial value',
      nameProp: 'testeAbc',
      label: 'label value',
      successMessage: 'sucesso msg',
      placeholder: 'placeholder',
      classInput: 'classInput',
      classLabel: 'classLabel',
      preventPaste: false
    },
    global: {
      plugins: [i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: TextInput', () => {
  const wrapper = mountTextInput()
  const input = wrapper.find('input')
  const label = wrapper.find('label')
  const errorMsg = wrapper.find('[id="' + wrapper.vm.idErrorMsg + '"]')
  const successMessage = wrapper.find('[id="' + wrapper.vm.idSuccessMsg + '"]')

  it('renders properly', async () => {
    expect(wrapper).toBeTruthy()
    expect(input.exists()).toBe(true)
    expect(label.exists()).toBe(true)
    expect(errorMsg.exists()).toBe(false)
    expect(successMessage.exists()).toBe(true)
    expect(successMessage.isVisible()).toBe(true)
    expect(successMessage.text()).toContain('sucesso msg')
    expect(input.element.value).toBe('initial value')
  })

  test('input value', async () => {
    await input.setValue('ab12')
    expect(input.element.value).toContain('ab12')
  })
  test('paste event', async () => {
    const spy = vi.spyOn(wrapper.vm, 'colar')
    await input.trigger('paste')
    await flushPromises()
    await waitForExpect(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
  test('emits update:value on input change', async () => {
    const newValue = 'new value' // O valor que você espera emitir
    await input.setValue(newValue) // Simula a mudança de valor no input
    expect(wrapper.emitted()['update:value']).toBeTruthy() // Verifica se o evento foi emitido
  })
})
