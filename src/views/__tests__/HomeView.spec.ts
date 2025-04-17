import { describe, it, expect, vi, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import router from '@/router'
import i18n from '@/i18n/index'
import { createPinia } from 'pinia'

function mountHomeView() {
  const pinia = createPinia() // Crie uma instância do Pinia

  const wrapper = shallowMount(HomeView, {
    global: {
      plugins: [router, i18n, pinia],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: HomeView', () => {
  it('renders properly', async () => {
    expect(HomeView).toBeTruthy()
  })
  test('Click on btn "Go Simple Form', async () => {
    const push = vi.spyOn(router, 'push')
    await mountHomeView().find('[id="btn-simple-form"]').trigger('click')
    expect(push).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith({ name: 'SimpleForm' })
  })
  test('click on btn "Go Modals', async () => {
    const push = vi.spyOn(router, 'push')
    await mountHomeView().find('[id="btn-modal"]').trigger('click')
    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'Modals' })
  })
})
