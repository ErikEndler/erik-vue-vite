import { describe, it, expect, vi, test } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import i18n from '@/i18n/index'

function mountLanguageSwitcher() {
  const wrapper = mount(LanguageSwitcher, {
    global: {
      plugins: [i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: LanguageSwitcher', () => {
  const wrapper = mountLanguageSwitcher()
  const select = wrapper.find('select')
  it('renders properly', async () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('[id="select-language"]').exists()).toBe(true)
  })

  test('change select', async () => {
    const spy = vi.spyOn(wrapper.vm, 'switchLanguage')
    await select.trigger('change')
    expect(spy).toHaveBeenCalled()
  })
})
