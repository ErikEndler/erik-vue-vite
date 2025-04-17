import { M as v, u as I } from './ModalForm-aP3a_nNn.js'
import {
  d as M,
  h as y,
  q as S,
  M as B,
  g as P,
  o as m,
  c as C,
  a as o,
  p as $,
  f as k,
  _ as w,
  r as V,
  i as b,
  j as x,
  e as _,
  T as E,
  k as e,
  l as R,
  m as u
} from './index-JYrefdxg.js'
import './TextInput-dcat6doo.js'
const g = (a) => ($('data-v-73b7c764'), (a = a()), k(), a),
  T = { class: 'modal-dialog modal-dialog-centered' },
  D = { class: 'modal-content' },
  F = { class: 'modal-header' },
  N = g(() => o('h5', { id: 'modal-title', class: 'modal-title' }, 'Modal title', -1)),
  j = g(() =>
    o(
      'div',
      { class: 'modal-body', id: 'modal-body' },
      "Woo-hoo, you're reading this text in a modal!",
      -1
    )
  ),
  q = { class: 'modal-footer' },
  W = M({
    __name: 'ModalConfirme',
    props: { displayProp: { type: Boolean } },
    emits: ['closeModal', 'confirmeModal'],
    setup(a, { expose: c, emit: t }) {
      const r = a,
        n = t,
        i = y(null)
      let d
      S(() => {
        i.value && (d = new B(i.value, { backdrop: 'static', keyboard: !1 })),
          r.displayProp && d.show()
      }),
        P(
          () => r.displayProp,
          (f) => {
            f ? d.show() : d.hide()
          }
        )
      function s() {
        n('closeModal', !1)
      }
      function p() {
        n('confirmeModal'), n('closeModal', !1)
      }
      return (
        c({ close: s, confirme: p }),
        (f, l) => (
          m(),
          C(
            'div',
            {
              class: 'modal fade',
              tabindex: '-1',
              'aria-hidden': 'true',
              ref_key: 'modalRef',
              ref: i
            },
            [
              o('div', T, [
                o('div', D, [
                  o('div', F, [
                    N,
                    o('button', {
                      id: 'modal-btn-close-header',
                      type: 'button',
                      class: 'btn-close',
                      onClick: l[0] || (l[0] = (h) => s()),
                      'aria-label': 'Close'
                    })
                  ]),
                  j,
                  o('div', q, [
                    o(
                      'button',
                      {
                        id: 'modal-btn-close',
                        type: 'button',
                        class: 'btn btn-secondary',
                        onClick: l[1] || (l[1] = (h) => s())
                      },
                      ' Close '
                    ),
                    o(
                      'button',
                      {
                        id: 'modal-btn-confirme',
                        type: 'button',
                        class: 'btn btn-primary',
                        onClick: l[2] || (l[2] = (h) => p())
                      },
                      ' Save changes '
                    )
                  ])
                ])
              ])
            ],
            512
          )
        )
      )
    }
  }),
  z = w(W, [['__scopeId', 'data-v-73b7c764']]),
  A = (a) => ($('data-v-6eebe7fc'), (a = a()), k(), a),
  G = { class: 'page' },
  H = A(() => o('div', { id: 'titleModals', class: 'center' }, [o('h1', null, 'Modals')], -1)),
  J = { class: 'mt-5' },
  K = { class: 'main-card' },
  L = { id: 'modalConfirme', class: 'my-cards' },
  O = { class: 'card' },
  Q = { class: 'card-body' },
  U = { class: 'card-title' },
  X = { id: '', class: 'card-text' },
  Y = { id: '', class: 'my-cards' },
  Z = { class: 'card' },
  oo = { class: 'card-body' },
  so = { class: 'card-title' },
  ao = { id: '', class: 'card-text' },
  to = { class: 'value-edit' },
  eo = M({
    __name: 'ModalsView',
    setup(a) {
      const c = V({ valueEdit: '' }),
        t = I(),
        r = y({ valueCustom: '', title: 'Modal Form' }),
        n = () => {
          ;(t.component.value = u(z)), t.showModal()
        },
        i = () => {
          ;(t.component.value = u(v)), t.showModal()
        }
      function d(s) {
        t.component.value === u(v) && (c.valueEdit = s)
      }
      return (s, p) => (
        m(),
        C('div', G, [
          (m(),
          b(E, { to: '#modal' }, [
            (m(),
            b(
              x(_(t).component.value),
              {
                displayProp: _(t).show.value,
                config: r.value,
                onConfirmeModal: d,
                onCloseModal: _(t).hideModal
              },
              null,
              40,
              ['displayProp', 'config', 'onCloseModal']
            ))
          ])),
          H,
          o('div', J, [
            o('div', K, [
              o('div', L, [
                o('div', O, [
                  o('div', Q, [
                    o('h5', U, e(s.$t('modals.card1.title')), 1),
                    o('p', X, e(s.$t('modals.card1.description')), 1),
                    o(
                      'button',
                      { id: '', class: 'btn btn-primary', onClick: n },
                      e(s.$t('modals.card1.button')),
                      1
                    )
                  ])
                ])
              ]),
              o('div', Y, [
                o('div', Z, [
                  o('div', oo, [
                    o('h5', so, e(s.$t('modals.card2.title')), 1),
                    o('p', ao, [
                      R(e(s.$t('modals.card2.description')) + ' ', 1),
                      o('span', to, e(c.valueEdit), 1)
                    ]),
                    o(
                      'button',
                      { id: '', class: 'btn btn-primary', onClick: i },
                      e(s.$t('modals.card2.button')),
                      1
                    )
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    }
  }),
  co = w(eo, [['__scopeId', 'data-v-6eebe7fc']])
export { co as default }
