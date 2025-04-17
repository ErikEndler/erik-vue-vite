import { describe, it, expect, vi, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import i18n from '@/i18n/index'
import router from '@/router'

function mountLanguageSwitcher() {
  const wrapper = shallowMount(NavBar, {
    global: { plugins: [router, i18n], mocks: { t: (key: string) => key } }
  })
  return wrapper
}

describe('mount component: LanguageSwitcher', () => {
  const wrapper = mountLanguageSwitcher()
  const navbarToggler = wrapper.find('[id="navbarToggler"]')
  const homeNavLink = wrapper.find('[id="homeNavLink"]')
  const simpleFormNavLink = wrapper.find('[id="simpleFormNavLink"]')
  const modalsNavLink = wrapper.find('[id="modalsNavLink"]')
  const tipCalculatorNavLink = wrapper.find('[id="tipCalculatorNavLink"]')
  const push = vi.spyOn(router, 'push')

  it('renders properly', async () => {
    expect(wrapper).toBeTruthy()
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(navbarToggler.exists()).toBe(true)
    expect(wrapper.find('[id="navbarTogglerCollapse"]').exists()).toBe(true)
    expect(wrapper.find('[id="languageSwitcher"]').exists()).toBe(true)
    expect(homeNavLink.exists()).toBe(true)
    expect(simpleFormNavLink.exists()).toBe(true)
    expect(modalsNavLink.exists()).toBe(true)
    expect(tipCalculatorNavLink.exists()).toBe(true)
  })

  test('click Home', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    homeNavLink.trigger('click')
    expect(spy).toHaveBeenCalledWith('Home')
    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenLastCalledWith({ name: 'Home' })
  })
  test('click SimpLe Form', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    simpleFormNavLink.trigger('click')
    expect(push).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenLastCalledWith('SimpleForm')
  })
  test('click Modals', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    modalsNavLink.trigger('click')
    expect(spy).toHaveBeenCalledWith('Modals')
    expect(push).toHaveBeenCalledTimes(3)
    expect(push).toHaveBeenLastCalledWith({ name: 'Modals' })
  })
  test('click Tip Calculator', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    tipCalculatorNavLink.trigger('click')
    expect(spy).toHaveBeenCalledWith('TipCalculator')
    expect(push).toHaveBeenCalledTimes(4)
    expect(push).toHaveBeenLastCalledWith({ name: 'TipCalculator' })
  })
  test('click Tip NavBar', async () => {
    const spy = vi.spyOn(wrapper.vm, 'clickNavBar')
    navbarToggler.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
