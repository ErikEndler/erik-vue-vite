import { describe, it, expect, vi, test } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import router from '@/router'
import i18n from '@/i18n/index'

function mountHomeView() {
  const wrapper = mount(HomeView, {
    global: {
      plugins: [router, i18n],
      mocks: { t: (key: string) => key }
    }
  })
  return wrapper
}

describe('mount component: HomeView', () => {
  it('renders properly', async () => {
    expect(HomeView).toBeTruthy()
  })
  test('Clicar btn "Go Simple Form', async () => {
    const push = vi.spyOn(router, 'push')
    await mountHomeView().find('[id="btn-simple-form"]').trigger('click')
    expect(push).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith({ name: 'SimpleForm' })
  })
  test('Clicar btn "Go Modals', async () => {
    const push = vi.spyOn(router, 'push')
    await mountHomeView().find('[id="btn-modal"]').trigger('click')
    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'Modals' })
  })
})
