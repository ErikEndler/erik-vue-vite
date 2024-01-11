import { describe, it, expect, test } from 'vitest'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import TipCalculator from '@/views/TipCalculator.vue'
import router from '@/router'
import i18n from '@/i18n/index'
import waitForExpect from 'wait-for-expect'

function mountTipCalculator() {
  const wrapper = mount(TipCalculator, {
    attachTo: document.body,
    global: {
      plugins: [router, i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: TipCalculator', () => {
  const el = document.createElement('div')
  el.id = 'modal'
  document.body.appendChild(el)
  const wrapper = mountTipCalculator()
  const billInput = wrapper.find('input[name="bill"]') as DOMWrapper<HTMLInputElement>
  const peopleInput = wrapper.find('input[name="people"]') as DOMWrapper<HTMLInputElement>

  it('renders properly', async () => {
    expect(TipCalculator).toBeTruthy()
  })
  test('input value on field Bill, and calculate Tip correctly', async () => {
    await billInput.setValue(100 as number)
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.vm.state.bill).toEqual(100)
      expect(wrapper.vm.state.tipPerson).toEqual(5)
      expect(wrapper.vm.state.personTotal).toEqual(105)
      expect(billInput.element.value).toEqual('100')
    })
  })
  test('change % to 10s and calculate tip correctly', async () => {
    await wrapper.find('[id="tip-10"]').trigger('click')
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.vm.state.bill).toEqual(100)
      expect(wrapper.vm.state.tipPerson).toEqual(10)
      expect(wrapper.vm.state.personTotal).toEqual(110)
      expect(billInput.element.value).toEqual('100')
    })
  })
  test('change number of people to 4 and calculate tip correctly', async () => {
    await peopleInput.setValue(4)
    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.vm.state.bill).toEqual(100)
      expect(wrapper.vm.state.tipPerson).toEqual(2.5)
      expect(wrapper.vm.state.personTotal).toEqual(27.5)
      expect(billInput.element.value).toEqual('100')
    })
  })
})
