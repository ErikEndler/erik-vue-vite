import { T as C, F as g } from './TextInput-dcat6doo.js'
import { u as M, M as P } from './ModalForm-aP3a_nNn.js'
import {
  d as I,
  r as $,
  g as x,
  h as S,
  c as _,
  i as y,
  j as B,
  e as m,
  T as F,
  a as t,
  b as v,
  w as N,
  k as b,
  o as r,
  l as n,
  n as p,
  p as U,
  f as V,
  m as D,
  _ as E
} from './index-JYrefdxg.js'
const d = (u) => (U('data-v-e6326387'), (u = u()), V(), u),
  L = { class: 'page-tipe' },
  R = d(() => t('p', { class: 'center' }, [n(' SPLI '), t('br'), n(' TTER ')], -1)),
  j = { class: 'card card-1 row' },
  z = { class: 'row' },
  A = { class: 'col-12 col-lg-6' },
  H = { class: 'card-2 card' },
  O = d(() => t('label', { class: 'mt-4', for: 'percent' }, 'Select Tip %', -1)),
  q = { class: 'row mt-3 row-cols-3' },
  G = { class: 'col-4' },
  J = { class: 'col' },
  K = { class: 'col' },
  Q = { class: 'col mt-1' },
  W = { class: 'col mt-1' },
  X = { class: 'col mt-1' },
  Y = { key: 0 },
  Z = { key: 1 },
  tt = d(() => t('div', { class: 'row mt-2' }, null, -1)),
  ot = { class: 'col-12 col-lg-6' },
  st = { class: 'card card-3' },
  et = { class: 'row my-5' },
  lt = d(() =>
    t(
      'div',
      { class: 'col ms-4 center result-label' },
      [n(' Tip Amount '), t('br'), n(' /person ')],
      -1
    )
  ),
  nt = { class: 'col text-coin me-4 result' },
  it = { class: 'row my-3' },
  at = d(() =>
    t('div', { class: 'center col ms-3 result-label' }, [n(' Total '), t('br'), n(' /person ')], -1)
  ),
  pt = { class: 'col text-coin me-3 result' },
  ct = I({
    __name: 'TipCalculator',
    setup(u, { expose: f }) {
      const c = M(),
        o = $({ bill: 0, people: 1, tip: 5, tipCustom: 0, personTotal: 0, tipPerson: 0 })
      function h() {
        ;(c.component.value = D(P)), c.showModal()
      }
      function T(e) {
        ;(o.tipCustom = e), a(e)
      }
      function w() {
        ;(o.tipPerson = (o.bill * (o.tip / 100)) / o.people),
          (o.personTotal = o.bill / o.people + o.tipPerson)
      }
      function i(e) {
        return o.tip === e ? 'btn-custom-select' : ''
      }
      function a(e) {
        o.tip = e
      }
      x(
        () => [o.tip, o.people, o.bill],
        () => {
          w()
        }
      )
      const k = S({
        valueCustom: o.tipCustom,
        label: 'Tip Custom',
        title: 'Tip Custom',
        type: 'number',
        classInput: 'input-tip',
        classLabel: 'label-tip',
        classModal: 'page-tipe',
        classHeader: 'page-tipe'
      })
      return (
        f({ state: o }),
        (e, s) => (
          r(),
          _('div', L, [
            (r(),
            y(F, { to: '#modal' }, [
              (r(),
              y(
                B(m(c).component.value),
                {
                  displayProp: m(c).show.value,
                  config: k.value,
                  onConfirmeModal: T,
                  onCloseModal: m(c).hideModal
                },
                null,
                40,
                ['displayProp', 'config', 'onCloseModal']
              ))
            ])),
            R,
            t('div', j, [
              t('div', z, [
                t('div', A, [
                  t('div', H, [
                    v(m(g), null, {
                      default: N(() => [
                        v(
                          C,
                          {
                            value: o.bill,
                            'onUpdate:value': s[0] || (s[0] = (l) => (o.bill = l)),
                            classInput: 'input-tip',
                            nameProp: 'bill',
                            type: 'number',
                            label: 'Bill',
                            placeholder: '0',
                            id: 'bill'
                          },
                          null,
                          8,
                          ['value']
                        ),
                        n(' state.bill' + b(o.bill) + ' ', 1),
                        O,
                        t('div', q, [
                          t('div', G, [
                            t(
                              'button',
                              {
                                id: 'tip-5',
                                onClick: s[1] || (s[1] = (l) => a(5)),
                                class: p(['btn btn-custom btn-primary', i(5)]),
                                type: 'button'
                              },
                              ' 5% ',
                              2
                            )
                          ]),
                          t('div', J, [
                            t(
                              'button',
                              {
                                id: 'tip-10',
                                onClick: s[2] || (s[2] = (l) => a(10)),
                                class: p(['btn btn-custom btn-primary', i(10)]),
                                type: 'button'
                              },
                              ' 10% ',
                              2
                            )
                          ]),
                          t('div', K, [
                            t(
                              'button',
                              {
                                id: 'tip-15',
                                onClick: s[3] || (s[3] = (l) => a(15)),
                                class: p(['btn btn-custom btn-primary', i(15)]),
                                type: 'button'
                              },
                              ' 15% ',
                              2
                            )
                          ]),
                          t('div', Q, [
                            t(
                              'button',
                              {
                                id: 'tip-25',
                                onClick: s[4] || (s[4] = (l) => a(25)),
                                class: p(['btn btn-custom btn-primary', i(25)]),
                                type: 'button'
                              },
                              ' 25% ',
                              2
                            )
                          ]),
                          t('div', W, [
                            t(
                              'button',
                              {
                                id: 'tip-50',
                                onClick: s[5] || (s[5] = (l) => a(50)),
                                class: p(['btn btn-custom btn-primary position-relative', i(50)]),
                                type: 'button'
                              },
                              ' 50% ',
                              2
                            )
                          ]),
                          t('div', X, [
                            t(
                              'button',
                              {
                                id: 'tip-custom',
                                onClick: s[6] || (s[6] = (l) => h()),
                                class: p([
                                  'btn btn-custom btn-primary btn-tip-custom',
                                  i(o.tipCustom)
                                ]),
                                type: 'button'
                              },
                              [
                                o.tipCustom > 0
                                  ? (r(), _('span', Y, b(o.tipCustom) + '%', 1))
                                  : (r(), _('span', Z, 'CUSTOM'))
                              ],
                              2
                            )
                          ])
                        ]),
                        tt,
                        v(
                          C,
                          {
                            value: o.people,
                            'onUpdate:value': s[7] || (s[7] = (l) => (o.people = l)),
                            classInput: 'input-tip',
                            nameProp: 'people',
                            type: 'number',
                            label: 'Number of People',
                            placeholder: '0',
                            id: 'people'
                          },
                          null,
                          8,
                          ['value']
                        )
                      ]),
                      _: 1
                    })
                  ])
                ]),
                t('div', ot, [
                  t('div', st, [
                    t('div', et, [lt, t('div', nt, b(e.$n(o.tipPerson, 'currencyFormat')), 1)]),
                    t('div', it, [at, t('div', pt, b(e.$n(o.personTotal, 'currencyFormat')), 1)])
                  ])
                ])
              ])
            ])
          ])
        )
      )
    }
  }),
  mt = E(ct, [['__scopeId', 'data-v-e6326387']])
export { mt as default }
