import {
  h as m,
  d as w,
  s as u,
  r as x,
  q as I,
  M as L,
  g as M,
  o as B,
  c as H,
  a,
  n as y,
  k as T,
  b as P,
  _ as $
} from './index-JYrefdxg.js'
import { T as F } from './TextInput-dcat6doo.js'
const r = m(!1),
  N = m()
function A() {
  return { component: N, show: r, showModal: () => (r.value = !0), hideModal: () => (r.value = !1) }
}
const R = { class: 'modal-dialog modal-dialog-centered' },
  q = { class: 'modal-title fs-5' },
  z = { class: 'modal-body' },
  D = { class: 'mb-3' },
  E = { class: 'modal-footer' },
  S = w({
    __name: 'ModalForm',
    props: {
      displayProp: { type: Boolean },
      config: {
        default: () => ({
          title: 'Title',
          label: 'Label custom',
          valueCustom: '',
          type: 'string',
          classInput: void 0,
          classLabel: void 0,
          classHeader: void 0,
          classModal: void 0
        })
      }
    },
    emits: ['closeModal', 'confirmeModal'],
    setup(C, { emit: _ }) {
      const s = C,
        g = {
          title: 'Title',
          label: 'Label custom',
          valueCustom: '',
          type: 'string',
          classInput: void 0,
          classLabel: void 0,
          classHeader: void 0,
          classModal: void 0
        },
        e = u(() => ({ ...g, ...s.config })),
        h = u(() => (e.value.classHeader ? e.value.classHeader : 'modal-header-default')),
        k = u(() => (e.value.classModal ? e.value.classModal : 'modal-content-default')),
        o = x({ customValue: void 0 }),
        c = _,
        i = m(null)
      let n
      I(() => {
        i.value && (n = new L(i.value, { backdrop: 'static', keyboard: !1 })),
          s.config.valueCustom && (o.customValue = s.config.valueCustom),
          s.displayProp && n.show()
      }),
        M(
          () => s.displayProp,
          (t) => {
            t ? n.show() : n.hide()
          }
        ),
        M(
          () => s.config.valueCustom,
          (t) => {
            t && (o.customValue = t)
          }
        )
      function f() {
        c('closeModal', !1)
      }
      function V() {
        c('confirmeModal', o.customValue), c('closeModal', !1)
      }
      return (t, l) => {
        var v, p, b
        return (
          B(),
          H(
            'div',
            {
              class: 'modal fade',
              tabindex: '-1',
              'aria-hidden': 'true',
              ref_key: 'modalRef',
              ref: i
            },
            [
              a('div', R, [
                a(
                  'div',
                  { class: y(['modal-content', k.value]) },
                  [
                    a(
                      'div',
                      { class: y(['modal-header', h.value]) },
                      [
                        a('h1', q, T((v = e.value) == null ? void 0 : v.title), 1),
                        a('button', {
                          type: 'button',
                          class: 'btn-close',
                          onClick: l[0] || (l[0] = (d) => f()),
                          'aria-label': 'Close'
                        })
                      ],
                      2
                    ),
                    a('div', z, [
                      a('form', null, [
                        a('div', D, [
                          P(
                            F,
                            {
                              value: o.customValue,
                              'onUpdate:value': l[1] || (l[1] = (d) => (o.customValue = d)),
                              nameProp: 'customModal',
                              type: (p = e.value) == null ? void 0 : p.type,
                              label: (b = e.value) == null ? void 0 : b.label,
                              placeholder: '0',
                              'class-input': e.value.classInput,
                              'class-label': e.value.classLabel
                            },
                            null,
                            8,
                            ['value', 'type', 'label', 'class-input', 'class-label']
                          )
                        ])
                      ])
                    ]),
                    a('div', E, [
                      a(
                        'button',
                        {
                          type: 'button',
                          class: 'btn btn-secondary',
                          onClick: l[2] || (l[2] = (d) => f())
                        },
                        'Close'
                      ),
                      a(
                        'button',
                        {
                          type: 'button',
                          class: 'btn btn-custom btn-primary',
                          onClick: l[3] || (l[3] = (d) => V())
                        },
                        ' Confirme '
                      )
                    ])
                  ],
                  2
                )
              ])
            ],
            512
          )
        )
      }
    }
  }),
  G = $(S, [['__scopeId', 'data-v-55d2da1b']])
export { G as M, A as u }
