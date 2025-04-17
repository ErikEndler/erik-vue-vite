import { describe, it, expect, vi, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import i18n from '@/i18n/index'
import router from '@/router'

function mountNavBar() {
  const wrapper = shallowMount(NavBar, {
    global: { plugins: [router, i18n], mocks: { t: (key: string) => key } }
  })
  return wrapper
}

describe('mount component: LanguageSwitcher', () => {
  let wrapper: ReturnType<typeof mountNavBar>
  let navbarToggler: ReturnType<typeof wrapper.find>
  let homeNavLink: ReturnType<typeof wrapper.find>
  let simpleFormNavLink: ReturnType<typeof wrapper.find>
  let modalsNavLink: ReturnType<typeof wrapper.find>
  let tipCalculatorNavLink: ReturnType<typeof wrapper.find>
  const push = vi.spyOn(router, 'push')

  beforeEach(() => {
    wrapper = mountNavBar()
    navbarToggler = wrapper.find('[id="navbarToggler"]')
    homeNavLink = wrapper.find('[id="homeNavLink"]')
    simpleFormNavLink = wrapper.find('[id="simpleFormNavLink"]')
    modalsNavLink = wrapper.find('[id="modalsNavLink"]')
    tipCalculatorNavLink = wrapper.find('[id="tipCalculatorNavLink"]')
    push.mockClear() // Limpa as chamadas do mock antes de cada teste
  })

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
    expect(push).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenLastCalledWith('SimpleForm')
  })

  test('click Modals', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    modalsNavLink.trigger('click')
    expect(spy).toHaveBeenCalledWith('Modals')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenLastCalledWith({ name: 'Modals' })
  })

  test('click Tip Calculator', async () => {
    const spy = vi.spyOn(wrapper.vm, 'goTo')
    tipCalculatorNavLink.trigger('click')
    expect(spy).toHaveBeenCalledWith('TipCalculator')
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenLastCalledWith({ name: 'TipCalculator' })
  })
  test('click Tip NavBar', async () => {
    const spy = vi.spyOn(wrapper.vm, 'clickNavBar')
    navbarToggler.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  test('toggles navbar visibility', async () => {
    // Inicialmente, a navbar deve estar colapsada (showNavBar: false)
    expect(wrapper.vm.state.showNavBar).toBe(false)

    // Chama a função para clicar no navbar (simulando o clique no botão)
    await wrapper.vm.clickNavBar()

    // Verifica se o estado foi alterado para visível
    expect(wrapper.vm.state.showNavBar).toBe(true)

    // Chama novamente para simular o fechamento
    await wrapper.vm.clickNavBar()

    // Verifica se o estado voltou para colapsado
    expect(wrapper.vm.state.showNavBar).toBe(false)
  })
})
