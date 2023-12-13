import { describe, it, expect, vi, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ModalConfirme from '@/components/modals/ModalConfirme.vue'
import i18n from '@/i18n/index'

function mountModalConfirme() {
  const wrapper = shallowMount(ModalConfirme, {
    props: { displayProp: true },
    global: {
      plugins: [i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: ModalConfirme', () => {
  const wrapper = mountModalConfirme()
  it('renders properly', async () => {
    expect(ModalConfirme).toBeTruthy()
    expect(wrapper.find('[id="modal-title"]').exists()).toBe(true)
    expect(wrapper.find('[id="modal-body"]').exists()).toBe(true)
    expect(wrapper.find('[id="modal-btn-close"]').exists()).toBe(true)
    expect(wrapper.find('[id="modal-btn-confirme"]').exists()).toBe(true)
  })

  test('click close button', async () => {
    const spyClose = vi.spyOn(wrapper.vm, 'close')
    await wrapper.find('[id="modal-btn-close"]').trigger('click')
    await wrapper.find('[id="modal-btn-close-header"]').trigger('click')

    // assert event has been emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted().closeModal.length).toBe(2)

    expect(spyClose).toHaveBeenCalledTimes(2)
  })
  test('click confirm button', async () => {
    const spyConfirme = vi.spyOn(wrapper.vm, 'confirme')
    await wrapper.find('[id="modal-btn-confirme"]').trigger('click')
    // assert event has been emitted
    expect(wrapper.emitted('confirmeModal')).toBeTruthy()

    // assert event count
    expect(wrapper.emitted().closeModal.length).toBe(3)

    // assert event has been emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy()

    expect(spyConfirme).toHaveBeenCalledTimes(1)
  })
})
