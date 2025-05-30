;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === 'childList')
        for (const i of o.addedNodes) i.tagName === 'LINK' && i.rel === 'modulepreload' && r(i)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(s) {
    const o = {}
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    )
  }
  function r(s) {
    if (s.ep) return
    s.ep = !0
    const o = n(s)
    fetch(s.href, o)
  }
})()
function qo(e, t) {
  const n = new Set(e.split(','))
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r)
}
const he = {},
  Cn = [],
  tt = () => {},
  Mf = () => !1,
  ps = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Xo = (e) => e.startsWith('onUpdate:'),
  Pe = Object.assign,
  Qo = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  xf = Object.prototype.hasOwnProperty,
  oe = (e, t) => xf.call(e, t),
  X = Array.isArray,
  Nn = (e) => _s(e) === '[object Map]',
  Zl = (e) => _s(e) === '[object Set]',
  q = (e) => typeof e == 'function',
  ye = (e) => typeof e == 'string',
  Wn = (e) => typeof e == 'symbol',
  me = (e) => e !== null && typeof e == 'object',
  ec = (e) => (me(e) || q(e)) && q(e.then) && q(e.catch),
  tc = Object.prototype.toString,
  _s = (e) => tc.call(e),
  kf = (e) => _s(e).slice(8, -1),
  nc = (e) => _s(e) === '[object Object]',
  Jo = (e) => ye(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  Wr = qo(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  gs = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  zf = /-(\w)/g,
  Tt = gs((e) => e.replace(zf, (t, n) => (n ? n.toUpperCase() : ''))),
  Ff = /\B([A-Z])/g,
  jn = gs((e) => e.replace(Ff, '-$1').toLowerCase()),
  Es = gs((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  jr = gs((e) => (e ? `on${Es(e)}` : '')),
  jt = (e, t) => !Object.is(e, t),
  js = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  Jr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Vf = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Yi
const rc = () =>
  Yi ||
  (Yi =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function Zo(e) {
  if (X(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = ye(r) ? jf(r) : Zo(r)
      if (s) for (const o in s) t[o] = s[o]
    }
    return t
  } else if (ye(e) || me(e)) return e
}
const Hf = /;(?![^(]*\))/g,
  Uf = /:([^]+)/,
  Wf = /\/\*[^]*?\*\//g
function jf(e) {
  const t = {}
  return (
    e
      .replace(Wf, '')
      .split(Hf)
      .forEach((n) => {
        if (n) {
          const r = n.split(Uf)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function vs(e) {
  let t = ''
  if (ye(e)) t = e
  else if (X(e))
    for (let n = 0; n < e.length; n++) {
      const r = vs(e[n])
      r && (t += r + ' ')
    }
  else if (me(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const Bf = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Kf = qo(Bf)
function sc(e) {
  return !!e || e === ''
}
const we = (e) =>
    ye(e)
      ? e
      : e == null
        ? ''
        : X(e) || (me(e) && (e.toString === tc || !q(e.toString)))
          ? JSON.stringify(e, oc, 2)
          : String(e),
  oc = (e, t) =>
    t && t.__v_isRef
      ? oc(e, t.value)
      : Nn(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, s], o) => ((n[Bs(r, o) + ' =>'] = s), n),
              {}
            )
          }
        : Zl(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Bs(n)) }
          : Wn(t)
            ? Bs(t)
            : me(t) && !X(t) && !nc(t)
              ? String(t)
              : t,
  Bs = (e, t = '') => {
    var n
    return Wn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
let at
class ic {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = at),
      !t && at && (this.index = (at.scopes || (at.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = at
      try {
        return (at = this), t()
      } finally {
        at = n
      }
    }
  }
  on() {
    at = this
  }
  off() {
    at = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop()
        s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function ac(e) {
  return new ic(e)
}
function Yf(e, t = at) {
  t && t.active && t.effects.push(e)
}
function Gf() {
  return at
}
let an
class ei {
  constructor(t, n, r, s) {
    ;(this.fn = t),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 3),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._queryings = 0),
      (this._depsLength = 0),
      Yf(this, s)
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      ;(this._dirtyLevel = 0), this._queryings++, pn()
      for (const t of this.deps) if (t.computed && (qf(t.computed), this._dirtyLevel >= 2)) break
      _n(), this._queryings--
    }
    return this._dirtyLevel >= 2
  }
  set dirty(t) {
    this._dirtyLevel = t ? 3 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = Ut,
      n = an
    try {
      return (Ut = !0), (an = this), this._runnings++, Gi(this), this.fn()
    } finally {
      qi(this), this._runnings--, (an = n), (Ut = t)
    }
  }
  stop() {
    var t
    this.active &&
      (Gi(this), qi(this), (t = this.onStop) == null || t.call(this), (this.active = !1))
  }
}
function qf(e) {
  return e.value
}
function Gi(e) {
  e._trackId++, (e._depsLength = 0)
}
function qi(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) lc(e.deps[t], e)
    e.deps.length = e._depsLength
  }
}
function lc(e, t) {
  const n = e.get(t)
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let Ut = !0,
  Eo = 0
const cc = []
function pn() {
  cc.push(Ut), (Ut = !1)
}
function _n() {
  const e = cc.pop()
  Ut = e === void 0 ? !0 : e
}
function ti() {
  Eo++
}
function ni() {
  for (Eo--; !Eo && vo.length; ) vo.shift()()
}
function uc(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId)
    const r = e.deps[e._depsLength]
    r !== t ? (r && lc(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++
  }
}
const vo = []
function fc(e, t, n) {
  ti()
  for (const r of e.keys())
    if (!(!r.allowRecurse && r._runnings) && r._dirtyLevel < t && (!r._runnings || t !== 2)) {
      const s = r._dirtyLevel
      ;(r._dirtyLevel = t),
        s === 0 && (!r._queryings || t !== 2) && (r.trigger(), r.scheduler && vo.push(r.scheduler))
    }
  ni()
}
const dc = (e, t) => {
    const n = new Map()
    return (n.cleanup = e), (n.computed = t), n
  },
  Zr = new WeakMap(),
  ln = Symbol(''),
  bo = Symbol('')
function Ye(e, t, n) {
  if (Ut && an) {
    let r = Zr.get(e)
    r || Zr.set(e, (r = new Map()))
    let s = r.get(n)
    s || r.set(n, (s = dc(() => r.delete(n)))), uc(an, s)
  }
}
function Ct(e, t, n, r, s, o) {
  const i = Zr.get(e)
  if (!i) return
  let l = []
  if (t === 'clear') l = [...i.values()]
  else if (n === 'length' && X(e)) {
    const a = Number(r)
    i.forEach((u, c) => {
      ;(c === 'length' || (!Wn(c) && c >= a)) && l.push(u)
    })
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case 'add':
        X(e) ? Jo(n) && l.push(i.get('length')) : (l.push(i.get(ln)), Nn(e) && l.push(i.get(bo)))
        break
      case 'delete':
        X(e) || (l.push(i.get(ln)), Nn(e) && l.push(i.get(bo)))
        break
      case 'set':
        Nn(e) && l.push(i.get(ln))
        break
    }
  ti()
  for (const a of l) a && fc(a, 3)
  ni()
}
function Xf(e, t) {
  var n
  return (n = Zr.get(e)) == null ? void 0 : n.get(t)
}
const Qf = qo('__proto__,__v_isRef,__isVue'),
  hc = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Wn)
  ),
  Xi = Jf()
function Jf() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = ae(this)
        for (let o = 0, i = this.length; o < i; o++) Ye(r, 'get', o + '')
        const s = r[t](...n)
        return s === -1 || s === !1 ? r[t](...n.map(ae)) : s
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        pn(), ti()
        const r = ae(this)[t].apply(this, n)
        return ni(), _n(), r
      }
    }),
    e
  )
}
function Zf(e) {
  const t = ae(this)
  return Ye(t, 'has', e), t.hasOwnProperty(e)
}
class mc {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._shallow = n)
  }
  get(t, n, r) {
    const s = this._isReadonly,
      o = this._shallow
    if (n === '__v_isReactive') return !s
    if (n === '__v_isReadonly') return s
    if (n === '__v_isShallow') return o
    if (n === '__v_raw')
      return r === (s ? (o ? dd : Ec) : o ? gc : _c).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const i = X(t)
    if (!s) {
      if (i && oe(Xi, n)) return Reflect.get(Xi, n, r)
      if (n === 'hasOwnProperty') return Zf
    }
    const l = Reflect.get(t, n, r)
    return (Wn(n) ? hc.has(n) : Qf(n)) || (s || Ye(t, 'get', n), o)
      ? l
      : De(l)
        ? i && Jo(n)
          ? l
          : l.value
        : me(l)
          ? s
            ? bc(l)
            : br(l)
          : l
  }
}
class pc extends mc {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, s) {
    let o = t[n]
    if (!this._shallow) {
      const a = Rn(o)
      if ((!es(r) && !Rn(r) && ((o = ae(o)), (r = ae(r))), !X(t) && De(o) && !De(r)))
        return a ? !1 : ((o.value = r), !0)
    }
    const i = X(t) && Jo(n) ? Number(n) < t.length : oe(t, n),
      l = Reflect.set(t, n, r, s)
    return t === ae(s) && (i ? jt(r, o) && Ct(t, 'set', n, r) : Ct(t, 'add', n, r)), l
  }
  deleteProperty(t, n) {
    const r = oe(t, n)
    t[n]
    const s = Reflect.deleteProperty(t, n)
    return s && r && Ct(t, 'delete', n, void 0), s
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return (!Wn(n) || !hc.has(n)) && Ye(t, 'has', n), r
  }
  ownKeys(t) {
    return Ye(t, 'iterate', X(t) ? 'length' : ln), Reflect.ownKeys(t)
  }
}
class ed extends mc {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const td = new pc(),
  nd = new ed(),
  rd = new pc(!0),
  ri = (e) => e,
  bs = (e) => Reflect.getPrototypeOf(e)
function Sr(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const s = ae(e),
    o = ae(t)
  n || (jt(t, o) && Ye(s, 'get', t), Ye(s, 'get', o))
  const { has: i } = bs(s),
    l = r ? ri : n ? ai : dr
  if (i.call(s, t)) return l(e.get(t))
  if (i.call(s, o)) return l(e.get(o))
  e !== s && e.get(t)
}
function Lr(e, t = !1) {
  const n = this.__v_raw,
    r = ae(n),
    s = ae(e)
  return (
    t || (jt(e, s) && Ye(r, 'has', e), Ye(r, 'has', s)), e === s ? n.has(e) : n.has(e) || n.has(s)
  )
}
function Ir(e, t = !1) {
  return (e = e.__v_raw), !t && Ye(ae(e), 'iterate', ln), Reflect.get(e, 'size', e)
}
function Qi(e) {
  e = ae(e)
  const t = ae(this)
  return bs(t).has.call(t, e) || (t.add(e), Ct(t, 'add', e, e)), this
}
function Ji(e, t) {
  t = ae(t)
  const n = ae(this),
    { has: r, get: s } = bs(n)
  let o = r.call(n, e)
  o || ((e = ae(e)), (o = r.call(n, e)))
  const i = s.call(n, e)
  return n.set(e, t), o ? jt(t, i) && Ct(n, 'set', e, t) : Ct(n, 'add', e, t), this
}
function Zi(e) {
  const t = ae(this),
    { has: n, get: r } = bs(t)
  let s = n.call(t, e)
  s || ((e = ae(e)), (s = n.call(t, e))), r && r.call(t, e)
  const o = t.delete(e)
  return s && Ct(t, 'delete', e, void 0), o
}
function ea() {
  const e = ae(this),
    t = e.size !== 0,
    n = e.clear()
  return t && Ct(e, 'clear', void 0, void 0), n
}
function Rr(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = ae(i),
      a = t ? ri : e ? ai : dr
    return !e && Ye(l, 'iterate', ln), i.forEach((u, c) => r.call(s, a(u), a(c), o))
  }
}
function Pr(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = ae(s),
      i = Nn(o),
      l = e === 'entries' || (e === Symbol.iterator && i),
      a = e === 'keys' && i,
      u = s[e](...r),
      c = n ? ri : t ? ai : dr
    return (
      !t && Ye(o, 'iterate', a ? bo : ln),
      {
        next() {
          const { value: f, done: h } = u.next()
          return h ? { value: f, done: h } : { value: l ? [c(f[0]), c(f[1])] : c(f), done: h }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function $t(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this
  }
}
function sd() {
  const e = {
      get(o) {
        return Sr(this, o)
      },
      get size() {
        return Ir(this)
      },
      has: Lr,
      add: Qi,
      set: Ji,
      delete: Zi,
      clear: ea,
      forEach: Rr(!1, !1)
    },
    t = {
      get(o) {
        return Sr(this, o, !1, !0)
      },
      get size() {
        return Ir(this)
      },
      has: Lr,
      add: Qi,
      set: Ji,
      delete: Zi,
      clear: ea,
      forEach: Rr(!1, !0)
    },
    n = {
      get(o) {
        return Sr(this, o, !0)
      },
      get size() {
        return Ir(this, !0)
      },
      has(o) {
        return Lr.call(this, o, !0)
      },
      add: $t('add'),
      set: $t('set'),
      delete: $t('delete'),
      clear: $t('clear'),
      forEach: Rr(!0, !1)
    },
    r = {
      get(o) {
        return Sr(this, o, !0, !0)
      },
      get size() {
        return Ir(this, !0)
      },
      has(o) {
        return Lr.call(this, o, !0)
      },
      add: $t('add'),
      set: $t('set'),
      delete: $t('delete'),
      clear: $t('clear'),
      forEach: Rr(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
      ;(e[o] = Pr(o, !1, !1)),
        (n[o] = Pr(o, !0, !1)),
        (t[o] = Pr(o, !1, !0)),
        (r[o] = Pr(o, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [od, id, ad, ld] = sd()
function si(e, t) {
  const n = t ? (e ? ld : ad) : e ? id : od
  return (r, s, o) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
        ? e
        : s === '__v_raw'
          ? r
          : Reflect.get(oe(n, s) && s in r ? n : r, s, o)
}
const cd = { get: si(!1, !1) },
  ud = { get: si(!1, !0) },
  fd = { get: si(!0, !1) },
  _c = new WeakMap(),
  gc = new WeakMap(),
  Ec = new WeakMap(),
  dd = new WeakMap()
function hd(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function md(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : hd(kf(e))
}
function br(e) {
  return Rn(e) ? e : oi(e, !1, td, cd, _c)
}
function vc(e) {
  return oi(e, !1, rd, ud, gc)
}
function bc(e) {
  return oi(e, !0, nd, fd, Ec)
}
function oi(e, t, n, r, s) {
  if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const o = s.get(e)
  if (o) return o
  const i = md(e)
  if (i === 0) return e
  const l = new Proxy(e, i === 2 ? r : n)
  return s.set(e, l), l
}
function Sn(e) {
  return Rn(e) ? Sn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Rn(e) {
  return !!(e && e.__v_isReadonly)
}
function es(e) {
  return !!(e && e.__v_isShallow)
}
function yc(e) {
  return Sn(e) || Rn(e)
}
function ae(e) {
  const t = e && e.__v_raw
  return t ? ae(t) : e
}
function ii(e) {
  return Jr(e, '__v_skip', !0), e
}
const dr = (e) => (me(e) ? br(e) : e),
  ai = (e) => (me(e) ? bc(e) : e)
class Tc {
  constructor(t, n, r, s) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new ei(
        () => t(this._value),
        () => yo(this, 1)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = ae(this)
    return (
      Ac(t),
      (!t._cacheable || t.effect.dirty) && jt(t._value, (t._value = t.effect.run())) && yo(t, 2),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function pd(e, t, n = !1) {
  let r, s
  const o = q(e)
  return o ? ((r = e), (s = tt)) : ((r = e.get), (s = e.set)), new Tc(r, s, o || !s, n)
}
function Ac(e) {
  Ut &&
    an &&
    ((e = ae(e)),
    uc(an, e.dep || (e.dep = dc(() => (e.dep = void 0), e instanceof Tc ? e : void 0))))
}
function yo(e, t = 3, n) {
  e = ae(e)
  const r = e.dep
  r && fc(r, t)
}
function De(e) {
  return !!(e && e.__v_isRef === !0)
}
function ys(e) {
  return wc(e, !1)
}
function Oc(e) {
  return wc(e, !0)
}
function wc(e, t) {
  return De(e) ? e : new _d(e, t)
}
class _d {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ae(t)),
      (this._value = n ? t : dr(t))
  }
  get value() {
    return Ac(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || es(t) || Rn(t)
    ;(t = n ? t : ae(t)),
      jt(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : dr(t)), yo(this, 3))
  }
}
function ct(e) {
  return De(e) ? e.value : e
}
function wT(e) {
  return q(e) ? e() : ct(e)
}
const gd = {
  get: (e, t, n) => ct(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t]
    return De(s) && !De(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r)
  }
}
function Cc(e) {
  return Sn(e) ? e : new Proxy(e, gd)
}
class Ed {
  constructor(t, n, r) {
    ;(this._object = t), (this._key = n), (this._defaultValue = r), (this.__v_isRef = !0)
  }
  get value() {
    const t = this._object[this._key]
    return t === void 0 ? this._defaultValue : t
  }
  set value(t) {
    this._object[this._key] = t
  }
  get dep() {
    return Xf(ae(this._object), this._key)
  }
}
class vd {
  constructor(t) {
    ;(this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0)
  }
  get value() {
    return this._getter()
  }
}
function CT(e, t, n) {
  return De(e) ? e : q(e) ? new vd(e) : me(e) && arguments.length > 1 ? bd(e, t, n) : ys(e)
}
function bd(e, t, n) {
  const r = e[t]
  return De(r) ? r : new Ed(e, t, n)
}
function Wt(e, t, n, r) {
  let s
  try {
    s = r ? e(...r) : e()
  } catch (o) {
    Ts(o, t, n)
  }
  return s
}
function ut(e, t, n, r) {
  if (q(e)) {
    const o = Wt(e, t, n, r)
    return (
      o &&
        ec(o) &&
        o.catch((i) => {
          Ts(i, t, n)
        }),
      o
    )
  }
  const s = []
  for (let o = 0; o < e.length; o++) s.push(ut(e[o], t, n, r))
  return s
}
function Ts(e, t, n, r = !0) {
  const s = t ? t.vnode : null
  if (t) {
    let o = t.parent
    const i = t.proxy,
      l = `https://vuejs.org/errors/#runtime-${n}`
    for (; o; ) {
      const u = o.ec
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, i, l) === !1) return
      }
      o = o.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) {
      Wt(a, null, 10, [e, i, l])
      return
    }
  }
  yd(e, n, s, r)
}
function yd(e, t, n, r = !0) {
  console.error(e)
}
let hr = !1,
  To = !1
const Me = []
let gt = 0
const Ln = []
let zt = null,
  nn = 0
const Nc = Promise.resolve()
let li = null
function ci(e) {
  const t = li || Nc
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Td(e) {
  let t = gt + 1,
    n = Me.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = Me[r],
      o = mr(s)
    o < e || (o === e && s.pre) ? (t = r + 1) : (n = r)
  }
  return t
}
function ui(e) {
  ;(!Me.length || !Me.includes(e, hr && e.allowRecurse ? gt + 1 : gt)) &&
    (e.id == null ? Me.push(e) : Me.splice(Td(e.id), 0, e), Sc())
}
function Sc() {
  !hr && !To && ((To = !0), (li = Nc.then(Ic)))
}
function Ad(e) {
  const t = Me.indexOf(e)
  t > gt && Me.splice(t, 1)
}
function Od(e) {
  X(e) ? Ln.push(...e) : (!zt || !zt.includes(e, e.allowRecurse ? nn + 1 : nn)) && Ln.push(e), Sc()
}
function ta(e, t, n = hr ? gt + 1 : 0) {
  for (; n < Me.length; n++) {
    const r = Me[n]
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue
      Me.splice(n, 1), n--, r()
    }
  }
}
function Lc(e) {
  if (Ln.length) {
    const t = [...new Set(Ln)].sort((n, r) => mr(n) - mr(r))
    if (((Ln.length = 0), zt)) {
      zt.push(...t)
      return
    }
    for (zt = t, nn = 0; nn < zt.length; nn++) zt[nn]()
    ;(zt = null), (nn = 0)
  }
}
const mr = (e) => (e.id == null ? 1 / 0 : e.id),
  wd = (e, t) => {
    const n = mr(e) - mr(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Ic(e) {
  ;(To = !1), (hr = !0), Me.sort(wd)
  try {
    for (gt = 0; gt < Me.length; gt++) {
      const t = Me[gt]
      t && t.active !== !1 && Wt(t, null, 14)
    }
  } finally {
    ;(gt = 0), (Me.length = 0), Lc(), (hr = !1), (li = null), (Me.length || Ln.length) && Ic()
  }
}
function Cd(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || he
  let s = n
  const o = t.startsWith('update:'),
    i = o && t.slice(7)
  if (i && i in r) {
    const c = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: f, trim: h } = r[c] || he
    h && (s = n.map((p) => (ye(p) ? p.trim() : p))), f && (s = n.map(Vf))
  }
  let l,
    a = r[(l = jr(t))] || r[(l = jr(Tt(t)))]
  !a && o && (a = r[(l = jr(jn(t)))]), a && ut(a, e, 6, s)
  const u = r[l + 'Once']
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), ut(u, e, 6, s)
  }
}
function Rc(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e)
  if (s !== void 0) return s
  const o = e.emits
  let i = {},
    l = !1
  if (!q(e)) {
    const a = (u) => {
      const c = Rc(u, t, !0)
      c && ((l = !0), Pe(i, c))
    }
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a)
  }
  return !o && !l
    ? (me(e) && r.set(e, null), null)
    : (X(o) ? o.forEach((a) => (i[a] = null)) : Pe(i, o), me(e) && r.set(e, i), i)
}
function As(e, t) {
  return !e || !ps(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, jn(t)) || oe(e, t))
}
let He = null,
  Os = null
function ts(e) {
  const t = He
  return (He = e), (Os = (e && e.type.__scopeId) || null), t
}
function Pc(e) {
  Os = e
}
function Dc() {
  Os = null
}
function Nd(e, t = He, n) {
  if (!t || e._n) return e
  const r = (...s) => {
    r._d && ma(-1)
    const o = ts(t)
    let i
    try {
      i = e(...s)
    } finally {
      ts(o), r._d && ma(1)
    }
    return i
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function Ks(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: h,
    setupState: p,
    ctx: v,
    inheritAttrs: b
  } = e
  let N, y
  const I = ts(e)
  try {
    if (n.shapeFlag & 4) {
      const w = s || r,
        x = w
      ;(N = _t(c.call(x, w, f, o, p, h, v))), (y = a)
    } else {
      const w = t
      ;(N = _t(w.length > 1 ? w(o, { attrs: a, slots: l, emit: u }) : w(o, null))),
        (y = t.props ? a : Sd(a))
    }
  } catch (w) {
    ;(ir.length = 0), Ts(w, e, 1), (N = Re(dn))
  }
  let D = N
  if (y && b !== !1) {
    const w = Object.keys(y),
      { shapeFlag: x } = D
    w.length && x & 7 && (i && w.some(Xo) && (y = Ld(y, i)), (D = Pn(D, y)))
  }
  return (
    n.dirs && ((D = Pn(D)), (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (D.transition = n.transition),
    (N = D),
    ts(I),
    N
  )
}
const Sd = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || ps(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Ld = (e, t) => {
    const n = {}
    for (const r in e) (!Xo(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function Id(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: a } = t,
    u = o.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && a >= 0) {
    if (a & 1024) return !0
    if (a & 16) return r ? na(r, i, u) : !!i
    if (a & 8) {
      const c = t.dynamicProps
      for (let f = 0; f < c.length; f++) {
        const h = c[f]
        if (i[h] !== r[h] && !As(u, h)) return !0
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? (i ? na(r, i, u) : !0) : !!i
  return !1
}
function na(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let s = 0; s < r.length; s++) {
    const o = r[s]
    if (t[o] !== e[o] && !As(n, o)) return !0
  }
  return !1
}
function Rd({ vnode: e, parent: t }, n) {
  if (n)
    for (; t; ) {
      const r = t.subTree
      if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
        ((e = t.vnode).el = n), (t = t.parent)
      else break
    }
}
const $c = 'components',
  Mc = Symbol.for('v-ndc')
function NT(e) {
  return ye(e) ? Pd($c, e, !1) || e : e || Mc
}
function Pd(e, t, n = !0, r = !1) {
  const s = He || Le
  if (s) {
    const o = s.type
    if (e === $c) {
      const l = Lh(o, !1)
      if (l && (l === t || l === Tt(t) || l === Es(Tt(t)))) return o
    }
    const i = ra(s[e] || o[e], t) || ra(s.appContext[e], t)
    return !i && r ? o : i
  }
}
function ra(e, t) {
  return e && (e[t] || e[Tt(t)] || e[Es(Tt(t))])
}
const Dd = (e) => e.__isSuspense
function $d(e, t) {
  t && t.pendingBranch ? (X(e) ? t.effects.push(...e) : t.effects.push(e)) : Od(e)
}
const Md = Symbol.for('v-scx'),
  xd = () => vt(Md)
function ST(e, t) {
  return fi(e, null, t)
}
const Dr = {}
function cn(e, t, n) {
  return fi(e, t, n)
}
function fi(e, t, { immediate: n, deep: r, flush: s, once: o, onTrack: i, onTrigger: l } = he) {
  if (t && o) {
    const C = t
    t = (...j) => {
      C(...j), x()
    }
  }
  const a = Le,
    u = (C) => (r === !0 ? C : rn(C, r === !1 ? 1 : void 0))
  let c,
    f = !1,
    h = !1
  if (
    (De(e)
      ? ((c = () => e.value), (f = es(e)))
      : Sn(e)
        ? ((c = () => u(e)), (f = !0))
        : X(e)
          ? ((h = !0),
            (f = e.some((C) => Sn(C) || es(C))),
            (c = () =>
              e.map((C) => {
                if (De(C)) return C.value
                if (Sn(C)) return u(C)
                if (q(C)) return Wt(C, a, 2)
              })))
          : q(e)
            ? t
              ? (c = () => Wt(e, a, 2))
              : (c = () => (p && p(), ut(e, a, 3, [v])))
            : (c = tt),
    t && r)
  ) {
    const C = c
    c = () => rn(C())
  }
  let p,
    v = (C) => {
      p = D.onStop = () => {
        Wt(C, a, 4), (p = D.onStop = void 0)
      }
    },
    b
  if (Ns)
    if (((v = tt), t ? n && ut(t, a, 3, [c(), h ? [] : void 0, v]) : c(), s === 'sync')) {
      const C = xd()
      b = C.__watcherHandles || (C.__watcherHandles = [])
    } else return tt
  let N = h ? new Array(e.length).fill(Dr) : Dr
  const y = () => {
    if (!(!D.active || !D.dirty))
      if (t) {
        const C = D.run()
        ;(r || f || (h ? C.some((j, P) => jt(j, N[P])) : jt(C, N))) &&
          (p && p(), ut(t, a, 3, [C, N === Dr ? void 0 : h && N[0] === Dr ? [] : N, v]), (N = C))
      } else D.run()
  }
  y.allowRecurse = !!t
  let I
  s === 'sync'
    ? (I = y)
    : s === 'post'
      ? (I = () => Be(y, a && a.suspense))
      : ((y.pre = !0), a && (y.id = a.uid), (I = () => ui(y)))
  const D = new ei(c, tt, I),
    w = Gf(),
    x = () => {
      D.stop(), w && Qo(w.effects, D)
    }
  return (
    t ? (n ? y() : (N = D.run())) : s === 'post' ? Be(D.run.bind(D), a && a.suspense) : D.run(),
    b && b.push(x),
    x
  )
}
function kd(e, t, n) {
  const r = this.proxy,
    s = ye(e) ? (e.includes('.') ? xc(r, e) : () => r[e]) : e.bind(r, r)
  let o
  q(t) ? (o = t) : ((o = t.handler), (n = t))
  const i = Tr(this),
    l = fi(s, o.bind(r), n)
  return i(), l
}
function xc(e, t) {
  const n = t.split('.')
  return () => {
    let r = e
    for (let s = 0; s < n.length && r; s++) r = r[n[s]]
    return r
  }
}
function rn(e, t, n = 0, r) {
  if (!me(e) || e.__v_skip) return e
  if (t && t > 0) {
    if (n >= t) return e
    n++
  }
  if (((r = r || new Set()), r.has(e))) return e
  if ((r.add(e), De(e))) rn(e.value, t, n, r)
  else if (X(e)) for (let s = 0; s < e.length; s++) rn(e[s], t, n, r)
  else if (Zl(e) || Nn(e))
    e.forEach((s) => {
      rn(s, t, n, r)
    })
  else if (nc(e)) for (const s in e) rn(e[s], t, n, r)
  return e
}
function LT(e, t) {
  if (He === null) return e
  const n = Ss(He) || He.proxy,
    r = e.dirs || (e.dirs = [])
  for (let s = 0; s < t.length; s++) {
    let [o, i, l, a = he] = t[s]
    o &&
      (q(o) && (o = { mounted: o, updated: o }),
      o.deep && rn(i),
      r.push({ dir: o, instance: n, value: i, oldValue: void 0, arg: l, modifiers: a }))
  }
  return e
}
function Zt(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs
  for (let i = 0; i < s.length; i++) {
    const l = s[i]
    o && (l.oldValue = o[i].value)
    let a = l.dir[r]
    a && (pn(), ut(a, n, 8, [e.el, l, e, t]), _n())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function It(e, t) {
  return q(e) ? Pe({ name: e.name }, t, { setup: e }) : e
}
const Br = (e) => !!e.type.__asyncLoader,
  kc = (e) => e.type.__isKeepAlive
function zd(e, t) {
  zc(e, 'a', t)
}
function Fd(e, t) {
  zc(e, 'da', t)
}
function zc(e, t, n = Le) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n
      for (; s; ) {
        if (s.isDeactivated) return
        s = s.parent
      }
      return e()
    })
  if ((ws(t, r, n), n)) {
    let s = n.parent
    for (; s && s.parent; ) kc(s.parent.vnode) && Vd(r, t, n, s), (s = s.parent)
  }
}
function Vd(e, t, n, r) {
  const s = ws(t, e, r, !0)
  di(() => {
    Qo(r[t], s)
  }, n)
}
function ws(e, t, n = Le, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return
          pn()
          const l = Tr(n),
            a = ut(t, n, e, i)
          return l(), _n(), a
        })
    return r ? s.unshift(o) : s.push(o), o
  }
}
const Rt =
    (e) =>
    (t, n = Le) =>
      (!Ns || e === 'sp') && ws(e, (...r) => t(...r), n),
  Hd = Rt('bm'),
  Fc = Rt('m'),
  Ud = Rt('bu'),
  Wd = Rt('u'),
  jd = Rt('bum'),
  di = Rt('um'),
  Bd = Rt('sp'),
  Kd = Rt('rtg'),
  Yd = Rt('rtc')
function Gd(e, t = Le) {
  ws('ec', e, t)
}
function qd(e, t, n, r) {
  let s
  const o = n && n[r]
  if (X(e) || ye(e)) {
    s = new Array(e.length)
    for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, o && o[i])
  } else if (typeof e == 'number') {
    s = new Array(e)
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i])
  } else if (me(e))
    if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]))
    else {
      const i = Object.keys(e)
      s = new Array(i.length)
      for (let l = 0, a = i.length; l < a; l++) {
        const u = i[l]
        s[l] = t(e[u], u, l, o && o[l])
      }
    }
  else s = []
  return n && (n[r] = s), s
}
function IT(e, t) {
  const n = {}
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : jr(r)] = e[r]
  return n
}
const Ao = (e) => (e ? (Qc(e) ? Ss(e) || e.proxy : Ao(e.parent)) : null),
  sr = Pe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ao(e.parent),
    $root: (e) => Ao(e.root),
    $emit: (e) => e.emit,
    $options: (e) => hi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ;(e.effect.dirty = !0), ui(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = ci.bind(e.proxy)),
    $watch: (e) => kd.bind(e)
  }),
  Ys = (e, t) => e !== he && !e.__isScriptSetup && oe(e, t),
  Xd = {
    get({ _: e }, t) {
      const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: l, appContext: a } = e
      let u
      if (t[0] !== '$') {
        const p = i[t]
        if (p !== void 0)
          switch (p) {
            case 1:
              return r[t]
            case 2:
              return s[t]
            case 4:
              return n[t]
            case 3:
              return o[t]
          }
        else {
          if (Ys(r, t)) return (i[t] = 1), r[t]
          if (s !== he && oe(s, t)) return (i[t] = 2), s[t]
          if ((u = e.propsOptions[0]) && oe(u, t)) return (i[t] = 3), o[t]
          if (n !== he && oe(n, t)) return (i[t] = 4), n[t]
          Oo && (i[t] = 0)
        }
      }
      const c = sr[t]
      let f, h
      if (c) return t === '$attrs' && Ye(e, 'get', t), c(e)
      if ((f = l.__cssModules) && (f = f[t])) return f
      if (n !== he && oe(n, t)) return (i[t] = 4), n[t]
      if (((h = a.config.globalProperties), oe(h, t))) return h[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e
      return Ys(s, t)
        ? ((s[t] = n), !0)
        : r !== he && oe(r, t)
          ? ((r[t] = n), !0)
          : oe(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o } },
      i
    ) {
      let l
      return (
        !!n[i] ||
        (e !== he && oe(e, i)) ||
        Ys(t, i) ||
        ((l = o[0]) && oe(l, i)) ||
        oe(r, i) ||
        oe(sr, i) ||
        oe(s.config.globalProperties, i)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : oe(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    }
  }
function sa(e) {
  return X(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let Oo = !0
function Qd(e) {
  const t = hi(e),
    n = e.proxy,
    r = e.ctx
  ;(Oo = !1), t.beforeCreate && oa(t.beforeCreate, e, 'bc')
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: p,
    updated: v,
    activated: b,
    deactivated: N,
    beforeDestroy: y,
    beforeUnmount: I,
    destroyed: D,
    unmounted: w,
    render: x,
    renderTracked: C,
    renderTriggered: j,
    errorCaptured: P,
    serverPrefetch: te,
    expose: J,
    inheritAttrs: Z,
    components: le,
    directives: ce,
    filters: ke
  } = t
  if ((u && Jd(u, r, null), i))
    for (const Q in i) {
      const ee = i[Q]
      q(ee) && (r[Q] = ee.bind(n))
    }
  if (s) {
    const Q = s.call(n, n)
    me(Q) && (e.data = br(Q))
  }
  if (((Oo = !0), o))
    for (const Q in o) {
      const ee = o[Q],
        Te = q(ee) ? ee.bind(n, n) : q(ee.get) ? ee.get.bind(n, n) : tt,
        be = !q(ee) && q(ee.set) ? ee.set.bind(n) : tt,
        Ne = Ie({ get: Te, set: be })
      Object.defineProperty(r, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (ge) => (Ne.value = ge)
      })
    }
  if (l) for (const Q in l) Vc(l[Q], r, n, Q)
  if (a) {
    const Q = q(a) ? a.call(n) : a
    Reflect.ownKeys(Q).forEach((ee) => {
      Kr(ee, Q[ee])
    })
  }
  c && oa(c, e, 'c')
  function re(Q, ee) {
    X(ee) ? ee.forEach((Te) => Q(Te.bind(n))) : ee && Q(ee.bind(n))
  }
  if (
    (re(Hd, f),
    re(Fc, h),
    re(Ud, p),
    re(Wd, v),
    re(zd, b),
    re(Fd, N),
    re(Gd, P),
    re(Yd, C),
    re(Kd, j),
    re(jd, I),
    re(di, w),
    re(Bd, te),
    X(J))
  )
    if (J.length) {
      const Q = e.exposed || (e.exposed = {})
      J.forEach((ee) => {
        Object.defineProperty(Q, ee, { get: () => n[ee], set: (Te) => (n[ee] = Te) })
      })
    } else e.exposed || (e.exposed = {})
  x && e.render === tt && (e.render = x),
    Z != null && (e.inheritAttrs = Z),
    le && (e.components = le),
    ce && (e.directives = ce)
}
function Jd(e, t, n = tt) {
  X(e) && (e = wo(e))
  for (const r in e) {
    const s = e[r]
    let o
    me(s)
      ? 'default' in s
        ? (o = vt(s.from || r, s.default, !0))
        : (o = vt(s.from || r))
      : (o = vt(s)),
      De(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i)
          })
        : (t[r] = o)
  }
}
function oa(e, t, n) {
  ut(X(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Vc(e, t, n, r) {
  const s = r.includes('.') ? xc(n, r) : () => n[r]
  if (ye(e)) {
    const o = t[e]
    q(o) && cn(s, o)
  } else if (q(e)) cn(s, e.bind(n))
  else if (me(e))
    if (X(e)) e.forEach((o) => Vc(o, t, n, r))
    else {
      const o = q(e.handler) ? e.handler.bind(n) : t[e.handler]
      q(o) && cn(s, o, e)
    }
}
function hi(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i }
    } = e.appContext,
    l = o.get(t)
  let a
  return (
    l
      ? (a = l)
      : !s.length && !n && !r
        ? (a = t)
        : ((a = {}), s.length && s.forEach((u) => ns(a, u, i, !0)), ns(a, t, i)),
    me(t) && o.set(t, a),
    a
  )
}
function ns(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t
  o && ns(e, o, n, !0), s && s.forEach((i) => ns(e, i, n, !0))
  for (const i in t)
    if (!(r && i === 'expose')) {
      const l = Zd[i] || (n && n[i])
      e[i] = l ? l(e[i], t[i]) : t[i]
    }
  return e
}
const Zd = {
  data: ia,
  props: aa,
  emits: aa,
  methods: nr,
  computed: nr,
  beforeCreate: Ve,
  created: Ve,
  beforeMount: Ve,
  mounted: Ve,
  beforeUpdate: Ve,
  updated: Ve,
  beforeDestroy: Ve,
  beforeUnmount: Ve,
  destroyed: Ve,
  unmounted: Ve,
  activated: Ve,
  deactivated: Ve,
  errorCaptured: Ve,
  serverPrefetch: Ve,
  components: nr,
  directives: nr,
  watch: th,
  provide: ia,
  inject: eh
}
function ia(e, t) {
  return t
    ? e
      ? function () {
          return Pe(q(e) ? e.call(this, this) : e, q(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function eh(e, t) {
  return nr(wo(e), wo(t))
}
function wo(e) {
  if (X(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function Ve(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function nr(e, t) {
  return e ? Pe(Object.create(null), e, t) : t
}
function aa(e, t) {
  return e
    ? X(e) && X(t)
      ? [...new Set([...e, ...t])]
      : Pe(Object.create(null), sa(e), sa(t ?? {}))
    : t
}
function th(e, t) {
  if (!e) return t
  if (!t) return e
  const n = Pe(Object.create(null), e)
  for (const r in t) n[r] = Ve(e[r], t[r])
  return n
}
function Hc() {
  return {
    app: null,
    config: {
      isNativeTag: Mf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let nh = 0
function rh(e, t) {
  return function (r, s = null) {
    q(r) || (r = Pe({}, r)), s != null && !me(s) && (s = null)
    const o = Hc(),
      i = new WeakSet()
    let l = !1
    const a = (o.app = {
      _uid: nh++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Rh,
      get config() {
        return o.config
      },
      set config(u) {},
      use(u, ...c) {
        return (
          i.has(u) ||
            (u && q(u.install) ? (i.add(u), u.install(a, ...c)) : q(u) && (i.add(u), u(a, ...c))),
          a
        )
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), a
      },
      component(u, c) {
        return c ? ((o.components[u] = c), a) : o.components[u]
      },
      directive(u, c) {
        return c ? ((o.directives[u] = c), a) : o.directives[u]
      },
      mount(u, c, f) {
        if (!l) {
          const h = Re(r, s)
          return (
            (h.appContext = o),
            f === !0 ? (f = 'svg') : f === !1 && (f = void 0),
            c && t ? t(h, u) : e(h, u, f),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Ss(h.component) || h.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__)
      },
      provide(u, c) {
        return (o.provides[u] = c), a
      },
      runWithContext(u) {
        rs = a
        try {
          return u()
        } finally {
          rs = null
        }
      }
    })
    return a
  }
}
let rs = null
function Kr(e, t) {
  if (Le) {
    let n = Le.provides
    const r = Le.parent && Le.parent.provides
    r === n && (n = Le.provides = Object.create(r)), (n[e] = t)
  }
}
function vt(e, t, n = !1) {
  const r = Le || He
  if (r || rs) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : rs._context.provides
    if (s && e in s) return s[e]
    if (arguments.length > 1) return n && q(t) ? t.call(r && r.proxy) : t
  }
}
function sh(e, t, n, r = !1) {
  const s = {},
    o = {}
  Jr(o, Cs, 1), (e.propsDefaults = Object.create(null)), Uc(e, t, s, o)
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0)
  n ? (e.props = r ? s : vc(s)) : e.type.props ? (e.props = s) : (e.props = o), (e.attrs = o)
}
function oh(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i }
    } = e,
    l = ae(s),
    [a] = e.propsOptions
  let u = !1
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const c = e.vnode.dynamicProps
      for (let f = 0; f < c.length; f++) {
        let h = c[f]
        if (As(e.emitsOptions, h)) continue
        const p = t[h]
        if (a)
          if (oe(o, h)) p !== o[h] && ((o[h] = p), (u = !0))
          else {
            const v = Tt(h)
            s[v] = Co(a, l, v, p, e, !1)
          }
        else p !== o[h] && ((o[h] = p), (u = !0))
      }
    }
  } else {
    Uc(e, t, s, o) && (u = !0)
    let c
    for (const f in l)
      (!t || (!oe(t, f) && ((c = jn(f)) === f || !oe(t, c)))) &&
        (a
          ? n && (n[f] !== void 0 || n[c] !== void 0) && (s[f] = Co(a, l, f, void 0, e, !0))
          : delete s[f])
    if (o !== l) for (const f in o) (!t || !oe(t, f)) && (delete o[f], (u = !0))
  }
  u && Ct(e, 'set', '$attrs')
}
function Uc(e, t, n, r) {
  const [s, o] = e.propsOptions
  let i = !1,
    l
  if (t)
    for (let a in t) {
      if (Wr(a)) continue
      const u = t[a]
      let c
      s && oe(s, (c = Tt(a)))
        ? !o || !o.includes(c)
          ? (n[c] = u)
          : ((l || (l = {}))[c] = u)
        : As(e.emitsOptions, a) || ((!(a in r) || u !== r[a]) && ((r[a] = u), (i = !0)))
    }
  if (o) {
    const a = ae(n),
      u = l || he
    for (let c = 0; c < o.length; c++) {
      const f = o[c]
      n[f] = Co(s, a, f, u[f], e, !oe(u, f))
    }
  }
  return i
}
function Co(e, t, n, r, s, o) {
  const i = e[n]
  if (i != null) {
    const l = oe(i, 'default')
    if (l && r === void 0) {
      const a = i.default
      if (i.type !== Function && !i.skipFactory && q(a)) {
        const { propsDefaults: u } = s
        if (n in u) r = u[n]
        else {
          const c = Tr(s)
          ;(r = u[n] = a.call(null, t)), c()
        }
      } else r = a
    }
    i[0] && (o && !l ? (r = !1) : i[1] && (r === '' || r === jn(n)) && (r = !0))
  }
  return r
}
function Wc(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e)
  if (s) return s
  const o = e.props,
    i = {},
    l = []
  let a = !1
  if (!q(e)) {
    const c = (f) => {
      a = !0
      const [h, p] = Wc(f, t, !0)
      Pe(i, h), p && l.push(...p)
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!o && !a) return me(e) && r.set(e, Cn), Cn
  if (X(o))
    for (let c = 0; c < o.length; c++) {
      const f = Tt(o[c])
      la(f) && (i[f] = he)
    }
  else if (o)
    for (const c in o) {
      const f = Tt(c)
      if (la(f)) {
        const h = o[c],
          p = (i[f] = X(h) || q(h) ? { type: h } : Pe({}, h))
        if (p) {
          const v = fa(Boolean, p.type),
            b = fa(String, p.type)
          ;(p[0] = v > -1), (p[1] = b < 0 || v < b), (v > -1 || oe(p, 'default')) && l.push(f)
        }
      }
    }
  const u = [i, l]
  return me(e) && r.set(e, u), u
}
function la(e) {
  return e[0] !== '$'
}
function ca(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function ua(e, t) {
  return ca(e) === ca(t)
}
function fa(e, t) {
  return X(t) ? t.findIndex((n) => ua(n, e)) : q(t) && ua(t, e) ? 0 : -1
}
const jc = (e) => e[0] === '_' || e === '$stable',
  mi = (e) => (X(e) ? e.map(_t) : [_t(e)]),
  ih = (e, t, n) => {
    if (t._n) return t
    const r = Nd((...s) => mi(t(...s)), n)
    return (r._c = !1), r
  },
  Bc = (e, t, n) => {
    const r = e._ctx
    for (const s in e) {
      if (jc(s)) continue
      const o = e[s]
      if (q(o)) t[s] = ih(s, o, r)
      else if (o != null) {
        const i = mi(o)
        t[s] = () => i
      }
    }
  },
  Kc = (e, t) => {
    const n = mi(t)
    e.slots.default = () => n
  },
  ah = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = ae(t)), Jr(t, '_', n)) : Bc(t, (e.slots = {}))
    } else (e.slots = {}), t && Kc(e, t)
    Jr(e.slots, Cs, 1)
  },
  lh = (e, t, n) => {
    const { vnode: r, slots: s } = e
    let o = !0,
      i = he
    if (r.shapeFlag & 32) {
      const l = t._
      l
        ? n && l === 1
          ? (o = !1)
          : (Pe(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), Bc(t, s)),
        (i = t)
    } else t && (Kc(e, t), (i = { default: 1 }))
    if (o) for (const l in s) !jc(l) && i[l] == null && delete s[l]
  }
function No(e, t, n, r, s = !1) {
  if (X(e)) {
    e.forEach((h, p) => No(h, t && (X(t) ? t[p] : t), n, r, s))
    return
  }
  if (Br(r) && !s) return
  const o = r.shapeFlag & 4 ? Ss(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: a } = e,
    u = t && t.r,
    c = l.refs === he ? (l.refs = {}) : l.refs,
    f = l.setupState
  if (
    (u != null &&
      u !== a &&
      (ye(u) ? ((c[u] = null), oe(f, u) && (f[u] = null)) : De(u) && (u.value = null)),
    q(a))
  )
    Wt(a, l, 12, [i, c])
  else {
    const h = ye(a),
      p = De(a)
    if (h || p) {
      const v = () => {
        if (e.f) {
          const b = h ? (oe(f, a) ? f[a] : c[a]) : a.value
          s
            ? X(b) && Qo(b, o)
            : X(b)
              ? b.includes(o) || b.push(o)
              : h
                ? ((c[a] = [o]), oe(f, a) && (f[a] = c[a]))
                : ((a.value = [o]), e.k && (c[e.k] = a.value))
        } else h ? ((c[a] = i), oe(f, a) && (f[a] = i)) : p && ((a.value = i), e.k && (c[e.k] = i))
      }
      i ? ((v.id = -1), Be(v, n)) : v()
    }
  }
}
const Be = $d
function ch(e) {
  return uh(e)
}
function uh(e, t) {
  const n = rc()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: h,
      setScopeId: p = tt,
      insertStaticContent: v
    } = e,
    b = (d, m, g, O = null, T = null, $ = null, F = void 0, R = null, M = !!m.dynamicChildren) => {
      if (d === m) return
      d && !Xn(d, m) && ((O = A(d)), ge(d, T, $, !0), (d = null)),
        m.patchFlag === -2 && ((M = !1), (m.dynamicChildren = null))
      const { type: L, ref: H, shapeFlag: V } = m
      switch (L) {
        case yr:
          N(d, m, g, O)
          break
        case dn:
          y(d, m, g, O)
          break
        case qs:
          d == null && I(m, g, O, F)
          break
        case Xe:
          le(d, m, g, O, T, $, F, R, M)
          break
        default:
          V & 1
            ? x(d, m, g, O, T, $, F, R, M)
            : V & 6
              ? ce(d, m, g, O, T, $, F, R, M)
              : (V & 64 || V & 128) && L.process(d, m, g, O, T, $, F, R, M, W)
      }
      H != null && T && No(H, d && d.ref, $, m || d, !m)
    },
    N = (d, m, g, O) => {
      if (d == null) r((m.el = l(m.children)), g, O)
      else {
        const T = (m.el = d.el)
        m.children !== d.children && u(T, m.children)
      }
    },
    y = (d, m, g, O) => {
      d == null ? r((m.el = a(m.children || '')), g, O) : (m.el = d.el)
    },
    I = (d, m, g, O) => {
      ;[d.el, d.anchor] = v(d.children, m, g, O, d.el, d.anchor)
    },
    D = ({ el: d, anchor: m }, g, O) => {
      let T
      for (; d && d !== m; ) (T = h(d)), r(d, g, O), (d = T)
      r(m, g, O)
    },
    w = ({ el: d, anchor: m }) => {
      let g
      for (; d && d !== m; ) (g = h(d)), s(d), (d = g)
      s(m)
    },
    x = (d, m, g, O, T, $, F, R, M) => {
      m.type === 'svg' ? (F = 'svg') : m.type === 'math' && (F = 'mathml'),
        d == null ? C(m, g, O, T, $, F, R, M) : te(d, m, T, $, F, R, M)
    },
    C = (d, m, g, O, T, $, F, R) => {
      let M, L
      const { props: H, shapeFlag: V, transition: _, dirs: E } = d
      if (
        ((M = d.el = i(d.type, $, H && H.is, H)),
        V & 8 ? c(M, d.children) : V & 16 && P(d.children, M, null, O, T, Gs(d, $), F, R),
        E && Zt(d, null, O, 'created'),
        j(M, d, d.scopeId, F, O),
        H)
      ) {
        for (const K in H) K !== 'value' && !Wr(K) && o(M, K, null, H[K], $, d.children, O, T, pe)
        'value' in H && o(M, 'value', null, H.value, $), (L = H.onVnodeBeforeMount) && pt(L, O, d)
      }
      E && Zt(d, null, O, 'beforeMount')
      const U = fh(T, _)
      U && _.beforeEnter(M),
        r(M, m, g),
        ((L = H && H.onVnodeMounted) || U || E) &&
          Be(() => {
            L && pt(L, O, d), U && _.enter(M), E && Zt(d, null, O, 'mounted')
          }, T)
    },
    j = (d, m, g, O, T) => {
      if ((g && p(d, g), O)) for (let $ = 0; $ < O.length; $++) p(d, O[$])
      if (T) {
        let $ = T.subTree
        if (m === $) {
          const F = T.vnode
          j(d, F, F.scopeId, F.slotScopeIds, T.parent)
        }
      }
    },
    P = (d, m, g, O, T, $, F, R, M = 0) => {
      for (let L = M; L < d.length; L++) {
        const H = (d[L] = R ? Ft(d[L]) : _t(d[L]))
        b(null, H, m, g, O, T, $, F, R)
      }
    },
    te = (d, m, g, O, T, $, F) => {
      const R = (m.el = d.el)
      let { patchFlag: M, dynamicChildren: L, dirs: H } = m
      M |= d.patchFlag & 16
      const V = d.props || he,
        _ = m.props || he
      let E
      if (
        (g && en(g, !1),
        (E = _.onVnodeBeforeUpdate) && pt(E, g, m, d),
        H && Zt(m, d, g, 'beforeUpdate'),
        g && en(g, !0),
        L
          ? J(d.dynamicChildren, L, R, g, O, Gs(m, T), $)
          : F || ee(d, m, R, null, g, O, Gs(m, T), $, !1),
        M > 0)
      ) {
        if (M & 16) Z(R, m, V, _, g, O, T)
        else if (
          (M & 2 && V.class !== _.class && o(R, 'class', null, _.class, T),
          M & 4 && o(R, 'style', V.style, _.style, T),
          M & 8)
        ) {
          const U = m.dynamicProps
          for (let K = 0; K < U.length; K++) {
            const ie = U[K],
              _e = V[ie],
              Oe = _[ie]
            ;(Oe !== _e || ie === 'value') && o(R, ie, _e, Oe, T, d.children, g, O, pe)
          }
        }
        M & 1 && d.children !== m.children && c(R, m.children)
      } else !F && L == null && Z(R, m, V, _, g, O, T)
      ;((E = _.onVnodeUpdated) || H) &&
        Be(() => {
          E && pt(E, g, m, d), H && Zt(m, d, g, 'updated')
        }, O)
    },
    J = (d, m, g, O, T, $, F) => {
      for (let R = 0; R < m.length; R++) {
        const M = d[R],
          L = m[R],
          H = M.el && (M.type === Xe || !Xn(M, L) || M.shapeFlag & 70) ? f(M.el) : g
        b(M, L, H, null, O, T, $, F, !0)
      }
    },
    Z = (d, m, g, O, T, $, F) => {
      if (g !== O) {
        if (g !== he)
          for (const R in g) !Wr(R) && !(R in O) && o(d, R, g[R], null, F, m.children, T, $, pe)
        for (const R in O) {
          if (Wr(R)) continue
          const M = O[R],
            L = g[R]
          M !== L && R !== 'value' && o(d, R, L, M, F, m.children, T, $, pe)
        }
        'value' in O && o(d, 'value', g.value, O.value, F)
      }
    },
    le = (d, m, g, O, T, $, F, R, M) => {
      const L = (m.el = d ? d.el : l('')),
        H = (m.anchor = d ? d.anchor : l(''))
      let { patchFlag: V, dynamicChildren: _, slotScopeIds: E } = m
      E && (R = R ? R.concat(E) : E),
        d == null
          ? (r(L, g, O), r(H, g, O), P(m.children || [], g, H, T, $, F, R, M))
          : V > 0 && V & 64 && _ && d.dynamicChildren
            ? (J(d.dynamicChildren, _, g, T, $, F, R),
              (m.key != null || (T && m === T.subTree)) && pi(d, m, !0))
            : ee(d, m, g, H, T, $, F, R, M)
    },
    ce = (d, m, g, O, T, $, F, R, M) => {
      ;(m.slotScopeIds = R),
        d == null
          ? m.shapeFlag & 512
            ? T.ctx.activate(m, g, O, F, M)
            : ke(m, g, O, T, $, F, M)
          : $e(d, m, M)
    },
    ke = (d, m, g, O, T, $, F) => {
      const R = (d.component = Oh(d, O, T))
      if ((kc(d) && (R.ctx.renderer = W), wh(R), R.asyncDep)) {
        if ((T && T.registerDep(R, re), !d.el)) {
          const M = (R.subTree = Re(dn))
          y(null, M, m, g)
        }
      } else re(R, d, m, g, T, $, F)
    },
    $e = (d, m, g) => {
      const O = (m.component = d.component)
      if (Id(d, m, g))
        if (O.asyncDep && !O.asyncResolved) {
          Q(O, m, g)
          return
        } else (O.next = m), Ad(O.update), (O.effect.dirty = !0), O.update()
      else (m.el = d.el), (O.vnode = m)
    },
    re = (d, m, g, O, T, $, F) => {
      const R = () => {
          if (d.isMounted) {
            let { next: H, bu: V, u: _, parent: E, vnode: U } = d
            {
              const Dt = Yc(d)
              if (Dt) {
                H && ((H.el = U.el), Q(d, H, F)),
                  Dt.asyncDep.then(() => {
                    d.isUnmounted || R()
                  })
                return
              }
            }
            let K = H,
              ie
            en(d, !1),
              H ? ((H.el = U.el), Q(d, H, F)) : (H = U),
              V && js(V),
              (ie = H.props && H.props.onVnodeBeforeUpdate) && pt(ie, E, H, U),
              en(d, !0)
            const _e = Ks(d),
              Oe = d.subTree
            ;(d.subTree = _e),
              b(Oe, _e, f(Oe.el), A(Oe), d, T, $),
              (H.el = _e.el),
              K === null && Rd(d, _e.el),
              _ && Be(_, T),
              (ie = H.props && H.props.onVnodeUpdated) && Be(() => pt(ie, E, H, U), T)
          } else {
            let H
            const { el: V, props: _ } = m,
              { bm: E, m: U, parent: K } = d,
              ie = Br(m)
            if (
              (en(d, !1),
              E && js(E),
              !ie && (H = _ && _.onVnodeBeforeMount) && pt(H, K, m),
              en(d, !0),
              V && de)
            ) {
              const _e = () => {
                ;(d.subTree = Ks(d)), de(V, d.subTree, d, T, null)
              }
              ie ? m.type.__asyncLoader().then(() => !d.isUnmounted && _e()) : _e()
            } else {
              const _e = (d.subTree = Ks(d))
              b(null, _e, g, O, d, T, $), (m.el = _e.el)
            }
            if ((U && Be(U, T), !ie && (H = _ && _.onVnodeMounted))) {
              const _e = m
              Be(() => pt(H, K, _e), T)
            }
            ;(m.shapeFlag & 256 || (K && Br(K.vnode) && K.vnode.shapeFlag & 256)) &&
              d.a &&
              Be(d.a, T),
              (d.isMounted = !0),
              (m = g = O = null)
          }
        },
        M = (d.effect = new ei(R, tt, () => ui(L), d.scope)),
        L = (d.update = () => {
          M.dirty && M.run()
        })
      ;(L.id = d.uid), en(d, !0), L()
    },
    Q = (d, m, g) => {
      m.component = d
      const O = d.vnode.props
      ;(d.vnode = m), (d.next = null), oh(d, m.props, O, g), lh(d, m.children, g), pn(), ta(d), _n()
    },
    ee = (d, m, g, O, T, $, F, R, M = !1) => {
      const L = d && d.children,
        H = d ? d.shapeFlag : 0,
        V = m.children,
        { patchFlag: _, shapeFlag: E } = m
      if (_ > 0) {
        if (_ & 128) {
          be(L, V, g, O, T, $, F, R, M)
          return
        } else if (_ & 256) {
          Te(L, V, g, O, T, $, F, R, M)
          return
        }
      }
      E & 8
        ? (H & 16 && pe(L, T, $), V !== L && c(g, V))
        : H & 16
          ? E & 16
            ? be(L, V, g, O, T, $, F, R, M)
            : pe(L, T, $, !0)
          : (H & 8 && c(g, ''), E & 16 && P(V, g, O, T, $, F, R, M))
    },
    Te = (d, m, g, O, T, $, F, R, M) => {
      ;(d = d || Cn), (m = m || Cn)
      const L = d.length,
        H = m.length,
        V = Math.min(L, H)
      let _
      for (_ = 0; _ < V; _++) {
        const E = (m[_] = M ? Ft(m[_]) : _t(m[_]))
        b(d[_], E, g, null, T, $, F, R, M)
      }
      L > H ? pe(d, T, $, !0, !1, V) : P(m, g, O, T, $, F, R, M, V)
    },
    be = (d, m, g, O, T, $, F, R, M) => {
      let L = 0
      const H = m.length
      let V = d.length - 1,
        _ = H - 1
      for (; L <= V && L <= _; ) {
        const E = d[L],
          U = (m[L] = M ? Ft(m[L]) : _t(m[L]))
        if (Xn(E, U)) b(E, U, g, null, T, $, F, R, M)
        else break
        L++
      }
      for (; L <= V && L <= _; ) {
        const E = d[V],
          U = (m[_] = M ? Ft(m[_]) : _t(m[_]))
        if (Xn(E, U)) b(E, U, g, null, T, $, F, R, M)
        else break
        V--, _--
      }
      if (L > V) {
        if (L <= _) {
          const E = _ + 1,
            U = E < H ? m[E].el : O
          for (; L <= _; ) b(null, (m[L] = M ? Ft(m[L]) : _t(m[L])), g, U, T, $, F, R, M), L++
        }
      } else if (L > _) for (; L <= V; ) ge(d[L], T, $, !0), L++
      else {
        const E = L,
          U = L,
          K = new Map()
        for (L = U; L <= _; L++) {
          const qe = (m[L] = M ? Ft(m[L]) : _t(m[L]))
          qe.key != null && K.set(qe.key, L)
        }
        let ie,
          _e = 0
        const Oe = _ - U + 1
        let Dt = !1,
          Ws = 0
        const qn = new Array(Oe)
        for (L = 0; L < Oe; L++) qn[L] = 0
        for (L = E; L <= V; L++) {
          const qe = d[L]
          if (_e >= Oe) {
            ge(qe, T, $, !0)
            continue
          }
          let mt
          if (qe.key != null) mt = K.get(qe.key)
          else
            for (ie = U; ie <= _; ie++)
              if (qn[ie - U] === 0 && Xn(qe, m[ie])) {
                mt = ie
                break
              }
          mt === void 0
            ? ge(qe, T, $, !0)
            : ((qn[mt - U] = L + 1),
              mt >= Ws ? (Ws = mt) : (Dt = !0),
              b(qe, m[mt], g, null, T, $, F, R, M),
              _e++)
        }
        const Bi = Dt ? dh(qn) : Cn
        for (ie = Bi.length - 1, L = Oe - 1; L >= 0; L--) {
          const qe = U + L,
            mt = m[qe],
            Ki = qe + 1 < H ? m[qe + 1].el : O
          qn[L] === 0
            ? b(null, mt, g, Ki, T, $, F, R, M)
            : Dt && (ie < 0 || L !== Bi[ie] ? Ne(mt, g, Ki, 2) : ie--)
        }
      }
    },
    Ne = (d, m, g, O, T = null) => {
      const { el: $, type: F, transition: R, children: M, shapeFlag: L } = d
      if (L & 6) {
        Ne(d.component.subTree, m, g, O)
        return
      }
      if (L & 128) {
        d.suspense.move(m, g, O)
        return
      }
      if (L & 64) {
        F.move(d, m, g, W)
        return
      }
      if (F === Xe) {
        r($, m, g)
        for (let V = 0; V < M.length; V++) Ne(M[V], m, g, O)
        r(d.anchor, m, g)
        return
      }
      if (F === qs) {
        D(d, m, g)
        return
      }
      if (O !== 2 && L & 1 && R)
        if (O === 0) R.beforeEnter($), r($, m, g), Be(() => R.enter($), T)
        else {
          const { leave: V, delayLeave: _, afterLeave: E } = R,
            U = () => r($, m, g),
            K = () => {
              V($, () => {
                U(), E && E()
              })
            }
          _ ? _($, U, K) : K()
        }
      else r($, m, g)
    },
    ge = (d, m, g, O = !1, T = !1) => {
      const {
        type: $,
        props: F,
        ref: R,
        children: M,
        dynamicChildren: L,
        shapeFlag: H,
        patchFlag: V,
        dirs: _
      } = d
      if ((R != null && No(R, null, g, d, !0), H & 256)) {
        m.ctx.deactivate(d)
        return
      }
      const E = H & 1 && _,
        U = !Br(d)
      let K
      if ((U && (K = F && F.onVnodeBeforeUnmount) && pt(K, m, d), H & 6)) Fe(d.component, g, O)
      else {
        if (H & 128) {
          d.suspense.unmount(g, O)
          return
        }
        E && Zt(d, null, m, 'beforeUnmount'),
          H & 64
            ? d.type.remove(d, m, g, T, W, O)
            : L && ($ !== Xe || (V > 0 && V & 64))
              ? pe(L, m, g, !1, !0)
              : (($ === Xe && V & 384) || (!T && H & 16)) && pe(M, m, g),
          O && Ge(d)
      }
      ;((U && (K = F && F.onVnodeUnmounted)) || E) &&
        Be(() => {
          K && pt(K, m, d), E && Zt(d, null, m, 'unmounted')
        }, g)
    },
    Ge = (d) => {
      const { type: m, el: g, anchor: O, transition: T } = d
      if (m === Xe) {
        ze(g, O)
        return
      }
      if (m === qs) {
        w(d)
        return
      }
      const $ = () => {
        s(g), T && !T.persisted && T.afterLeave && T.afterLeave()
      }
      if (d.shapeFlag & 1 && T && !T.persisted) {
        const { leave: F, delayLeave: R } = T,
          M = () => F(g, $)
        R ? R(d.el, $, M) : M()
      } else $()
    },
    ze = (d, m) => {
      let g
      for (; d !== m; ) (g = h(d)), s(d), (d = g)
      s(m)
    },
    Fe = (d, m, g) => {
      const { bum: O, scope: T, update: $, subTree: F, um: R } = d
      O && js(O),
        T.stop(),
        $ && (($.active = !1), ge(F, d, m, g)),
        R && Be(R, m),
        Be(() => {
          d.isUnmounted = !0
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve())
    },
    pe = (d, m, g, O = !1, T = !1, $ = 0) => {
      for (let F = $; F < d.length; F++) ge(d[F], m, g, O, T)
    },
    A = (d) =>
      d.shapeFlag & 6
        ? A(d.component.subTree)
        : d.shapeFlag & 128
          ? d.suspense.next()
          : h(d.anchor || d.el)
  let z = !1
  const k = (d, m, g) => {
      d == null
        ? m._vnode && ge(m._vnode, null, null, !0)
        : b(m._vnode || null, d, m, null, null, null, g),
        z || ((z = !0), ta(), Lc(), (z = !1)),
        (m._vnode = d)
    },
    W = { p: b, um: ge, m: Ne, r: Ge, mt: ke, mc: P, pc: ee, pbc: J, n: A, o: e }
  let ne, de
  return t && ([ne, de] = t(W)), { render: k, hydrate: ne, createApp: rh(k, ne) }
}
function Gs({ type: e, props: t }, n) {
  return (n === 'svg' && e === 'foreignObject') ||
    (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : n
}
function en({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function fh(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function pi(e, t, n = !1) {
  const r = e.children,
    s = t.children
  if (X(r) && X(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o]
      let l = s[o]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = s[o] = Ft(s[o])), (l.el = i.el)),
        n || pi(i, l)),
        l.type === yr && (l.el = i.el)
    }
}
function dh(e) {
  const t = e.slice(),
    n = [0]
  let r, s, o, i, l
  const a = e.length
  for (r = 0; r < a; r++) {
    const u = e[r]
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        ;(t[r] = s), n.push(r)
        continue
      }
      for (o = 0, i = n.length - 1; o < i; ) (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l)
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r))
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i])
  return n
}
function Yc(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Yc(t)
}
const hh = (e) => e.__isTeleport,
  or = (e) => e && (e.disabled || e.disabled === ''),
  da = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  ha = (e) => typeof MathMLElement == 'function' && e instanceof MathMLElement,
  So = (e, t) => {
    const n = e && e.to
    return ye(n) ? (t ? t(n) : null) : n
  },
  mh = {
    name: 'Teleport',
    __isTeleport: !0,
    process(e, t, n, r, s, o, i, l, a, u) {
      const {
          mc: c,
          pc: f,
          pbc: h,
          o: { insert: p, querySelector: v, createText: b, createComment: N }
        } = u,
        y = or(t.props)
      let { shapeFlag: I, children: D, dynamicChildren: w } = t
      if (e == null) {
        const x = (t.el = b('')),
          C = (t.anchor = b(''))
        p(x, n, r), p(C, n, r)
        const j = (t.target = So(t.props, v)),
          P = (t.targetAnchor = b(''))
        j &&
          (p(P, j),
          i === 'svg' || da(j) ? (i = 'svg') : (i === 'mathml' || ha(j)) && (i = 'mathml'))
        const te = (J, Z) => {
          I & 16 && c(D, J, Z, s, o, i, l, a)
        }
        y ? te(n, C) : j && te(j, P)
      } else {
        t.el = e.el
        const x = (t.anchor = e.anchor),
          C = (t.target = e.target),
          j = (t.targetAnchor = e.targetAnchor),
          P = or(e.props),
          te = P ? n : C,
          J = P ? x : j
        if (
          (i === 'svg' || da(C) ? (i = 'svg') : (i === 'mathml' || ha(C)) && (i = 'mathml'),
          w
            ? (h(e.dynamicChildren, w, te, s, o, i, l), pi(e, t, !0))
            : a || f(e, t, te, J, s, o, i, l, !1),
          y)
        )
          P
            ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to)
            : $r(t, n, x, u, 1)
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const Z = (t.target = So(t.props, v))
          Z && $r(t, Z, null, u, 0)
        } else P && $r(t, C, j, u, 1)
      }
      Gc(t)
    },
    remove(e, t, n, r, { um: s, o: { remove: o } }, i) {
      const { shapeFlag: l, children: a, anchor: u, targetAnchor: c, target: f, props: h } = e
      if ((f && o(c), i && o(u), l & 16)) {
        const p = i || !or(h)
        for (let v = 0; v < a.length; v++) {
          const b = a[v]
          s(b, t, n, p, !!b.dynamicChildren)
        }
      }
    },
    move: $r,
    hydrate: ph
  }
function $r(e, t, n, { o: { insert: r }, m: s }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n)
  const { el: i, anchor: l, shapeFlag: a, children: u, props: c } = e,
    f = o === 2
  if ((f && r(i, t, n), (!f || or(c)) && a & 16))
    for (let h = 0; h < u.length; h++) s(u[h], t, n, 2)
  f && r(l, t, n)
}
function ph(e, t, n, r, s, o, { o: { nextSibling: i, parentNode: l, querySelector: a } }, u) {
  const c = (t.target = So(t.props, a))
  if (c) {
    const f = c._lpa || c.firstChild
    if (t.shapeFlag & 16)
      if (or(t.props)) (t.anchor = u(i(e), t, l(e), n, r, s, o)), (t.targetAnchor = f)
      else {
        t.anchor = i(e)
        let h = f
        for (; h; )
          if (((h = i(h)), h && h.nodeType === 8 && h.data === 'teleport anchor')) {
            ;(t.targetAnchor = h), (c._lpa = t.targetAnchor && i(t.targetAnchor))
            break
          }
        u(f, t, c, n, r, s, o)
      }
    Gc(t)
  }
  return t.anchor && i(t.anchor)
}
const RT = mh
function Gc(e) {
  const t = e.ctx
  if (t && t.ut) {
    let n = e.children[0].el
    for (; n && n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling)
    t.ut()
  }
}
const Xe = Symbol.for('v-fgt'),
  yr = Symbol.for('v-txt'),
  dn = Symbol.for('v-cmt'),
  qs = Symbol.for('v-stc'),
  ir = []
let lt = null
function un(e = !1) {
  ir.push((lt = e ? null : []))
}
function _h() {
  ir.pop(), (lt = ir[ir.length - 1] || null)
}
let pr = 1
function ma(e) {
  pr += e
}
function qc(e) {
  return (e.dynamicChildren = pr > 0 ? lt || Cn : null), _h(), pr > 0 && lt && lt.push(e), e
}
function In(e, t, n, r, s, o) {
  return qc(G(e, t, n, r, s, o, !0))
}
function gh(e, t, n, r, s) {
  return qc(Re(e, t, n, r, s, !0))
}
function Lo(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Xn(e, t) {
  return e.type === t.type && e.key === t.key
}
const Cs = '__vInternal',
  Xc = ({ key: e }) => e ?? null,
  Yr = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (ye(e) || De(e) || q(e) ? { i: He, r: e, k: t, f: !!n } : e) : null
  )
function G(e, t = null, n = null, r = 0, s = null, o = e === Xe ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xc(t),
    ref: t && Yr(t),
    scopeId: Os,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: He
  }
  return (
    l ? (_i(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16),
    pr > 0 && !i && lt && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && lt.push(a),
    a
  )
}
const Re = Eh
function Eh(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === Mc) && (e = dn), Lo(e))) {
    const l = Pn(e, t, !0)
    return (
      n && _i(l, n),
      pr > 0 && !o && lt && (l.shapeFlag & 6 ? (lt[lt.indexOf(e)] = l) : lt.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((Ih(e) && (e = e.__vccOpts), t)) {
    t = vh(t)
    let { class: l, style: a } = t
    l && !ye(l) && (t.class = vs(l)),
      me(a) && (yc(a) && !X(a) && (a = Pe({}, a)), (t.style = Zo(a)))
  }
  const i = ye(e) ? 1 : Dd(e) ? 128 : hh(e) ? 64 : me(e) ? 4 : q(e) ? 2 : 0
  return G(e, t, n, r, s, i, o, !0)
}
function vh(e) {
  return e ? (yc(e) || Cs in e ? Pe({}, e) : e) : null
}
function Pn(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? yh(r || {}, t) : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Xc(l),
    ref: t && t.ref ? (n && s ? (X(s) ? s.concat(Yr(t)) : [s, Yr(t)]) : Yr(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Xe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Pn(e.ssContent),
    ssFallback: e.ssFallback && Pn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  }
}
function bh(e = ' ', t = 0) {
  return Re(yr, null, e, t)
}
function PT(e = '', t = !1) {
  return t ? (un(), gh(dn, null, e)) : Re(dn, null, e)
}
function _t(e) {
  return e == null || typeof e == 'boolean'
    ? Re(dn)
    : X(e)
      ? Re(Xe, null, e.slice())
      : typeof e == 'object'
        ? Ft(e)
        : Re(yr, null, String(e))
}
function Ft(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Pn(e)
}
function _i(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (X(t)) n = 16
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default
      s && (s._c && (s._d = !1), _i(e, s()), s._c && (s._d = !0))
      return
    } else {
      n = 32
      const s = t._
      !s && !(Cs in t)
        ? (t._ctx = He)
        : s === 3 && He && (He.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    q(t)
      ? ((t = { default: t, _ctx: He }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [bh(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function yh(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const s in r)
      if (s === 'class') t.class !== r.class && (t.class = vs([t.class, r.class]))
      else if (s === 'style') t.style = Zo([t.style, r.style])
      else if (ps(s)) {
        const o = t[s],
          i = r[s]
        i && o !== i && !(X(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i)
      } else s !== '' && (t[s] = r[s])
  }
  return t
}
function pt(e, t, n, r = null) {
  ut(e, t, 7, [n, r])
}
const Th = Hc()
let Ah = 0
function Oh(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Th,
    o = {
      uid: Ah++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ic(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Wc(r, s),
      emitsOptions: Rc(r, s),
      emit: null,
      emitted: null,
      propsDefaults: he,
      inheritAttrs: r.inheritAttrs,
      ctx: he,
      data: he,
      props: he,
      attrs: he,
      slots: he,
      refs: he,
      setupState: he,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (
    (o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = Cd.bind(null, o)), e.ce && e.ce(o), o
  )
}
let Le = null
const gi = () => Le || He
let ss, Io
{
  const e = rc(),
    t = (n, r) => {
      let s
      return (
        (s = e[n]) || (s = e[n] = []),
        s.push(r),
        (o) => {
          s.length > 1 ? s.forEach((i) => i(o)) : s[0](o)
        }
      )
    }
  ;(ss = t('__VUE_INSTANCE_SETTERS__', (n) => (Le = n))),
    (Io = t('__VUE_SSR_SETTERS__', (n) => (Ns = n)))
}
const Tr = (e) => {
    const t = Le
    return (
      ss(e),
      e.scope.on(),
      () => {
        e.scope.off(), ss(t)
      }
    )
  },
  pa = () => {
    Le && Le.scope.off(), ss(null)
  }
function Qc(e) {
  return e.vnode.shapeFlag & 4
}
let Ns = !1
function wh(e, t = !1) {
  t && Io(t)
  const { props: n, children: r } = e.vnode,
    s = Qc(e)
  sh(e, n, s, t), ah(e, r)
  const o = s ? Ch(e, t) : void 0
  return t && Io(!1), o
}
function Ch(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = ii(new Proxy(e.ctx, Xd)))
  const { setup: r } = n
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Sh(e) : null),
      o = Tr(e)
    pn()
    const i = Wt(r, e, 0, [e.props, s])
    if ((_n(), o(), ec(i))) {
      if ((i.then(pa, pa), t))
        return i
          .then((l) => {
            _a(e, l, t)
          })
          .catch((l) => {
            Ts(l, e, 0)
          })
      e.asyncDep = i
    } else _a(e, i, t)
  } else Jc(e, t)
}
function _a(e, t, n) {
  q(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : me(t) && (e.setupState = Cc(t)),
    Jc(e, n)
}
let ga
function Jc(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && ga && !r.render) {
      const s = r.template || hi(e).template
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = r,
          u = Pe(Pe({ isCustomElement: o, delimiters: l }, i), a)
        r.render = ga(s, u)
      }
    }
    e.render = r.render || tt
  }
  {
    const s = Tr(e)
    pn()
    try {
      Qd(e)
    } finally {
      _n(), s()
    }
  }
}
function Nh(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Ye(e, 'get', '$attrs'), t[n]
      }
    }))
  )
}
function Sh(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return Nh(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  }
}
function Ss(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Cc(ii(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in sr) return sr[n](e)
        },
        has(t, n) {
          return n in t || n in sr
        }
      }))
    )
}
function Lh(e, t = !0) {
  return q(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function Ih(e) {
  return q(e) && '__vccOpts' in e
}
const Ie = (e, t) => pd(e, t, Ns)
function Ls(e, t, n) {
  const r = arguments.length
  return r === 2
    ? me(t) && !X(t)
      ? Lo(t)
        ? Re(e, null, [t])
        : Re(e, t)
      : Re(e, null, t)
    : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Lo(n) && (n = [n]),
      Re(e, t, n))
}
const Rh = '3.4.7',
  Ph = 'http://www.w3.org/2000/svg',
  Dh = 'http://www.w3.org/1998/Math/MathML',
  Vt = typeof document < 'u' ? document : null,
  Ea = Vt && Vt.createElement('template'),
  $h = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const s =
        t === 'svg'
          ? Vt.createElementNS(Ph, e)
          : t === 'mathml'
            ? Vt.createElementNS(Dh, e)
            : Vt.createElement(e, n ? { is: n } : void 0)
      return e === 'select' && r && r.multiple != null && s.setAttribute('multiple', r.multiple), s
    },
    createText: (e) => Vt.createTextNode(e),
    createComment: (e) => Vt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Vt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild
      if (s && (s === o || s.nextSibling))
        for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); );
      else {
        Ea.innerHTML = r === 'svg' ? `<svg>${e}</svg>` : r === 'mathml' ? `<math>${e}</math>` : e
        const l = Ea.content
        if (r === 'svg' || r === 'mathml') {
          const a = l.firstChild
          for (; a.firstChild; ) l.appendChild(a.firstChild)
          l.removeChild(a)
        }
        t.insertBefore(l, n)
      }
      return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
  },
  Mh = Symbol('_vtc')
function xh(e, t, n) {
  const r = e[Mh]
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
const Ei = Symbol('_vod'),
  DT = {
    beforeMount(e, { value: t }, { transition: n }) {
      ;(e[Ei] = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : Qn(e, t)
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e)
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), Qn(e, !0), r.enter(e))
            : r.leave(e, () => {
                Qn(e, !1)
              })
          : Qn(e, t))
    },
    beforeUnmount(e, { value: t }) {
      Qn(e, t)
    }
  }
function Qn(e, t) {
  e.style.display = t ? e[Ei] : 'none'
}
const kh = Symbol('')
function zh(e, t, n) {
  const r = e.style,
    s = ye(n)
  if (n && !s) {
    if (t && !ye(t)) for (const o in t) n[o] == null && Ro(r, o, '')
    for (const o in n) Ro(r, o, n[o])
  } else {
    const o = r.display
    if (s) {
      if (t !== n) {
        const i = r[kh]
        i && (n += ';' + i), (r.cssText = n)
      }
    } else t && e.removeAttribute('style')
    Ei in e && (r.display = o)
  }
}
const va = /\s*!important$/
function Ro(e, t, n) {
  if (X(n)) n.forEach((r) => Ro(e, t, r))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const r = Fh(e, t)
    va.test(n) ? e.setProperty(jn(r), n.replace(va, ''), 'important') : (e[r] = n)
  }
}
const ba = ['Webkit', 'Moz', 'ms'],
  Xs = {}
function Fh(e, t) {
  const n = Xs[t]
  if (n) return n
  let r = Tt(t)
  if (r !== 'filter' && r in e) return (Xs[t] = r)
  r = Es(r)
  for (let s = 0; s < ba.length; s++) {
    const o = ba[s] + r
    if (o in e) return (Xs[t] = o)
  }
  return t
}
const ya = 'http://www.w3.org/1999/xlink'
function Vh(e, t, n, r, s) {
  if (r && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(ya, t.slice(6, t.length)) : e.setAttributeNS(ya, t, n)
  else {
    const o = Kf(t)
    n == null || (o && !sc(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? '' : n)
  }
}
function Hh(e, t, n, r, s, o, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, s, o), (e[t] = n ?? '')
    return
  }
  const l = e.tagName
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    e._value = n
    const u = l === 'OPTION' ? e.getAttribute('value') : e.value,
      c = n ?? ''
    u !== c && (e.value = c), n == null && e.removeAttribute(t)
    return
  }
  let a = !1
  if (n === '' || n == null) {
    const u = typeof e[t]
    u === 'boolean'
      ? (n = sc(n))
      : n == null && u === 'string'
        ? ((n = ''), (a = !0))
        : u === 'number' && ((n = 0), (a = !0))
  }
  try {
    e[t] = n
  } catch {}
  a && e.removeAttribute(t)
}
function Uh(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function Wh(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const Ta = Symbol('_vei')
function jh(e, t, n, r, s = null) {
  const o = e[Ta] || (e[Ta] = {}),
    i = o[t]
  if (r && i) i.value = r
  else {
    const [l, a] = Bh(t)
    if (r) {
      const u = (o[t] = Gh(r, s))
      Uh(e, l, u, a)
    } else i && (Wh(e, l, i, a), (o[t] = void 0))
  }
}
const Aa = /(?:Once|Passive|Capture)$/
function Bh(e) {
  let t
  if (Aa.test(e)) {
    t = {}
    let r
    for (; (r = e.match(Aa)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : jn(e.slice(2)), t]
}
let Qs = 0
const Kh = Promise.resolve(),
  Yh = () => Qs || (Kh.then(() => (Qs = 0)), (Qs = Date.now()))
function Gh(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    ut(qh(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = Yh()), n
}
function qh(e, t) {
  if (X(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    )
  } else return t
}
const Oa = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Xh = (e, t, n, r, s, o, i, l, a) => {
    const u = s === 'svg'
    t === 'class'
      ? xh(e, r, u)
      : t === 'style'
        ? zh(e, n, r)
        : ps(t)
          ? Xo(t) || jh(e, t, n, r, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Qh(e, t, r, u)
              )
            ? Hh(e, t, r, o, i, l, a)
            : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r),
              Vh(e, t, r, u))
  }
function Qh(e, t, n, r) {
  if (r) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Oa(t) && q(n)))
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1
  if (t === 'width' || t === 'height') {
    const s = e.tagName
    if (s === 'IMG' || s === 'VIDEO' || s === 'CANVAS' || s === 'SOURCE') return !1
  }
  return Oa(t) && ye(n) ? !1 : t in e
}
const Jh = Pe({ patchProp: Xh }, $h)
let wa
function Zh() {
  return wa || (wa = ch(Jh))
}
const em = (...e) => {
  const t = Zh().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const s = nm(r)
      if (!s) return
      const o = t._component
      !q(o) && !o.render && !o.template && (o.template = s.innerHTML), (s.innerHTML = '')
      const i = n(s, !1, tm(s))
      return (
        s instanceof Element && (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')), i
      )
    }),
    t
  )
}
function tm(e) {
  if (e instanceof SVGElement) return 'svg'
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml'
}
function nm(e) {
  return ye(e) ? document.querySelector(e) : e
}
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const yn = typeof window < 'u'
function rm(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module'
}
const fe = Object.assign
function Js(e, t) {
  const n = {}
  for (const r in t) {
    const s = t[r]
    n[r] = ft(s) ? s.map(e) : e(s)
  }
  return n
}
const ar = () => {},
  ft = Array.isArray,
  sm = /\/$/,
  om = (e) => e.replace(sm, '')
function Zs(e, t, n = '/') {
  let r,
    s = {},
    o = '',
    i = ''
  const l = t.indexOf('#')
  let a = t.indexOf('?')
  return (
    l < a && l >= 0 && (a = -1),
    a > -1 && ((r = t.slice(0, a)), (o = t.slice(a + 1, l > -1 ? l : t.length)), (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = cm(r ?? t, n)),
    { fullPath: r + (o && '?') + o + i, path: r, query: s, hash: i }
  )
}
function im(e, t) {
  const n = t.query ? e(t.query) : ''
  return t.path + (n && '?') + n + (t.hash || '')
}
function Ca(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/'
}
function am(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1
  return (
    r > -1 &&
    r === s &&
    Dn(t.matched[r], n.matched[s]) &&
    Zc(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function Dn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function Zc(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!lm(e[n], t[n])) return !1
  return !0
}
function lm(e, t) {
  return ft(e) ? Na(e, t) : ft(t) ? Na(t, e) : e === t
}
function Na(e, t) {
  return ft(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t
}
function cm(e, t) {
  if (e.startsWith('/')) return e
  if (!e) return t
  const n = t.split('/'),
    r = e.split('/'),
    s = r[r.length - 1]
  ;(s === '..' || s === '.') && r.push('')
  let o = n.length - 1,
    i,
    l
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== '.'))
      if (l === '..') o > 1 && o--
      else break
  return n.slice(0, o).join('/') + '/' + r.slice(i - (i === r.length ? 1 : 0)).join('/')
}
var _r
;(function (e) {
  ;(e.pop = 'pop'), (e.push = 'push')
})(_r || (_r = {}))
var lr
;(function (e) {
  ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(lr || (lr = {}))
function um(e) {
  if (!e)
    if (yn) {
      const t = document.querySelector('base')
      ;(e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
    } else e = '/'
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), om(e)
}
const fm = /^[^#]+#/
function dm(e, t) {
  return e.replace(fm, '#') + t
}
function hm(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  }
}
const Is = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function mm(e) {
  let t
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!s) return
    t = hm(s, e)
  } else t = e
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function Sa(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const Po = new Map()
function pm(e, t) {
  Po.set(e, t)
}
function _m(e) {
  const t = Po.get(e)
  return Po.delete(e), t
}
let gm = () => location.protocol + '//' + location.host
function eu(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf('#')
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      a = s.slice(l)
    return a[0] !== '/' && (a = '/' + a), Ca(a, '')
  }
  return Ca(n, e) + r + s
}
function Em(e, t, n, r) {
  let s = [],
    o = [],
    i = null
  const l = ({ state: h }) => {
    const p = eu(e, location),
      v = n.value,
      b = t.value
    let N = 0
    if (h) {
      if (((n.value = p), (t.value = h), i && i === v)) {
        i = null
        return
      }
      N = b ? h.position - b.position : 0
    } else r(p)
    s.forEach((y) => {
      y(n.value, v, {
        delta: N,
        type: _r.pop,
        direction: N ? (N > 0 ? lr.forward : lr.back) : lr.unknown
      })
    })
  }
  function a() {
    i = n.value
  }
  function u(h) {
    s.push(h)
    const p = () => {
      const v = s.indexOf(h)
      v > -1 && s.splice(v, 1)
    }
    return o.push(p), p
  }
  function c() {
    const { history: h } = window
    h.state && h.replaceState(fe({}, h.state, { scroll: Is() }), '')
  }
  function f() {
    for (const h of o) h()
    ;(o = []),
      window.removeEventListener('popstate', l),
      window.removeEventListener('beforeunload', c)
  }
  return (
    window.addEventListener('popstate', l),
    window.addEventListener('beforeunload', c, { passive: !0 }),
    { pauseListeners: a, listen: u, destroy: f }
  )
}
function La(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Is() : null
  }
}
function vm(e) {
  const { history: t, location: n } = window,
    r = { value: eu(e, n) },
    s = { value: t.state }
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
      },
      !0
    )
  function o(a, u, c) {
    const f = e.indexOf('#'),
      h = f > -1 ? (n.host && document.querySelector('base') ? e : e.slice(f)) + a : gm() + e + a
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', h), (s.value = u)
    } catch (p) {
      console.error(p), n[c ? 'replace' : 'assign'](h)
    }
  }
  function i(a, u) {
    const c = fe({}, t.state, La(s.value.back, a, s.value.forward, !0), u, {
      position: s.value.position
    })
    o(a, c, !0), (r.value = a)
  }
  function l(a, u) {
    const c = fe({}, s.value, t.state, { forward: a, scroll: Is() })
    o(c.current, c, !0)
    const f = fe({}, La(r.value, a, null), { position: c.position + 1 }, u)
    o(a, f, !1), (r.value = a)
  }
  return { location: r, state: s, push: l, replace: i }
}
function bm(e) {
  e = um(e)
  const t = vm(e),
    n = Em(e, t.state, t.location, t.replace)
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o)
  }
  const s = fe({ location: '', base: e, go: r, createHref: dm.bind(null, e) }, t, n)
  return (
    Object.defineProperty(s, 'location', { enumerable: !0, get: () => t.location.value }),
    Object.defineProperty(s, 'state', { enumerable: !0, get: () => t.state.value }),
    s
  )
}
function ym(e) {
  return typeof e == 'string' || (e && typeof e == 'object')
}
function tu(e) {
  return typeof e == 'string' || typeof e == 'symbol'
}
const Mt = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  nu = Symbol('')
var Ia
;(function (e) {
  ;(e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated')
})(Ia || (Ia = {}))
function $n(e, t) {
  return fe(new Error(), { type: e, [nu]: !0 }, t)
}
function Ot(e, t) {
  return e instanceof Error && nu in e && (t == null || !!(e.type & t))
}
const Ra = '[^/]+?',
  Tm = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Am = /[.+*?^${}()[\]/\\]/g
function Om(e, t) {
  const n = fe({}, Tm, t),
    r = []
  let s = n.start ? '^' : ''
  const o = []
  for (const u of e) {
    const c = u.length ? [] : [90]
    n.strict && !u.length && (s += '/')
    for (let f = 0; f < u.length; f++) {
      const h = u[f]
      let p = 40 + (n.sensitive ? 0.25 : 0)
      if (h.type === 0) f || (s += '/'), (s += h.value.replace(Am, '\\$&')), (p += 40)
      else if (h.type === 1) {
        const { value: v, repeatable: b, optional: N, regexp: y } = h
        o.push({ name: v, repeatable: b, optional: N })
        const I = y || Ra
        if (I !== Ra) {
          p += 10
          try {
            new RegExp(`(${I})`)
          } catch (w) {
            throw new Error(`Invalid custom RegExp for param "${v}" (${I}): ` + w.message)
          }
        }
        let D = b ? `((?:${I})(?:/(?:${I}))*)` : `(${I})`
        f || (D = N && u.length < 2 ? `(?:/${D})` : '/' + D),
          N && (D += '?'),
          (s += D),
          (p += 20),
          N && (p += -8),
          b && (p += -20),
          I === '.*' && (p += -50)
      }
      c.push(p)
    }
    r.push(c)
  }
  if (n.strict && n.end) {
    const u = r.length - 1
    r[u][r[u].length - 1] += 0.7000000000000001
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)')
  const i = new RegExp(s, n.sensitive ? '' : 'i')
  function l(u) {
    const c = u.match(i),
      f = {}
    if (!c) return null
    for (let h = 1; h < c.length; h++) {
      const p = c[h] || '',
        v = o[h - 1]
      f[v.name] = p && v.repeatable ? p.split('/') : p
    }
    return f
  }
  function a(u) {
    let c = '',
      f = !1
    for (const h of e) {
      ;(!f || !c.endsWith('/')) && (c += '/'), (f = !1)
      for (const p of h)
        if (p.type === 0) c += p.value
        else if (p.type === 1) {
          const { value: v, repeatable: b, optional: N } = p,
            y = v in u ? u[v] : ''
          if (ft(y) && !b)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`
            )
          const I = ft(y) ? y.join('/') : y
          if (!I)
            if (N) h.length < 2 && (c.endsWith('/') ? (c = c.slice(0, -1)) : (f = !0))
            else throw new Error(`Missing required param "${v}"`)
          c += I
        }
    }
    return c || '/'
  }
  return { re: i, score: r, keys: o, parse: l, stringify: a }
}
function wm(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n]
    if (r) return r
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0
}
function Cm(e, t) {
  let n = 0
  const r = e.score,
    s = t.score
  for (; n < r.length && n < s.length; ) {
    const o = wm(r[n], s[n])
    if (o) return o
    n++
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Pa(r)) return 1
    if (Pa(s)) return -1
  }
  return s.length - r.length
}
function Pa(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Nm = { type: 0, value: '' },
  Sm = /[a-zA-Z0-9_]/
function Lm(e) {
  if (!e) return [[]]
  if (e === '/') return [[Nm]]
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
  function t(p) {
    throw new Error(`ERR (${n})/"${u}": ${p}`)
  }
  let n = 0,
    r = n
  const s = []
  let o
  function i() {
    o && s.push(o), (o = [])
  }
  let l = 0,
    a,
    u = '',
    c = ''
  function f() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (a === '*' || a === '+') &&
              t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),
            o.push({
              type: 1,
              value: u,
              regexp: c,
              repeatable: a === '*' || a === '+',
              optional: a === '*' || a === '?'
            }))
          : t('Invalid state to consume buffer'),
      (u = ''))
  }
  function h() {
    u += a
  }
  for (; l < e.length; ) {
    if (((a = e[l++]), a === '\\' && n !== 2)) {
      ;(r = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        a === '/' ? (u && f(), i()) : a === ':' ? (f(), (n = 1)) : h()
        break
      case 4:
        h(), (n = r)
        break
      case 1:
        a === '('
          ? (n = 2)
          : Sm.test(a)
            ? h()
            : (f(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--)
        break
      case 2:
        a === ')' ? (c[c.length - 1] == '\\' ? (c = c.slice(0, -1) + a) : (n = 3)) : (c += a)
        break
      case 3:
        f(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--, (c = '')
        break
      default:
        t('Unknown state')
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), s
}
function Im(e, t, n) {
  const r = Om(Lm(e.path), n),
    s = fe(r, { record: e, parent: t, children: [], alias: [] })
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s
}
function Rm(e, t) {
  const n = [],
    r = new Map()
  t = Ma({ strict: !1, end: !0, sensitive: !1 }, t)
  function s(c) {
    return r.get(c)
  }
  function o(c, f, h) {
    const p = !h,
      v = Pm(c)
    v.aliasOf = h && h.record
    const b = Ma(t, c),
      N = [v]
    if ('alias' in c) {
      const D = typeof c.alias == 'string' ? [c.alias] : c.alias
      for (const w of D)
        N.push(
          fe({}, v, {
            components: h ? h.record.components : v.components,
            path: w,
            aliasOf: h ? h.record : v
          })
        )
    }
    let y, I
    for (const D of N) {
      const { path: w } = D
      if (f && w[0] !== '/') {
        const x = f.record.path,
          C = x[x.length - 1] === '/' ? '' : '/'
        D.path = f.record.path + (w && C + w)
      }
      if (
        ((y = Im(D, f, b)),
        h
          ? h.alias.push(y)
          : ((I = I || y), I !== y && I.alias.push(y), p && c.name && !$a(y) && i(c.name)),
        v.children)
      ) {
        const x = v.children
        for (let C = 0; C < x.length; C++) o(x[C], y, h && h.children[C])
      }
      ;(h = h || y),
        ((y.record.components && Object.keys(y.record.components).length) ||
          y.record.name ||
          y.record.redirect) &&
          a(y)
    }
    return I
      ? () => {
          i(I)
        }
      : ar
  }
  function i(c) {
    if (tu(c)) {
      const f = r.get(c)
      f && (r.delete(c), n.splice(n.indexOf(f), 1), f.children.forEach(i), f.alias.forEach(i))
    } else {
      const f = n.indexOf(c)
      f > -1 &&
        (n.splice(f, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(i),
        c.alias.forEach(i))
    }
  }
  function l() {
    return n
  }
  function a(c) {
    let f = 0
    for (
      ;
      f < n.length && Cm(c, n[f]) >= 0 && (c.record.path !== n[f].record.path || !ru(c, n[f]));

    )
      f++
    n.splice(f, 0, c), c.record.name && !$a(c) && r.set(c.record.name, c)
  }
  function u(c, f) {
    let h,
      p = {},
      v,
      b
    if ('name' in c && c.name) {
      if (((h = r.get(c.name)), !h)) throw $n(1, { location: c })
      ;(b = h.record.name),
        (p = fe(
          Da(
            f.params,
            h.keys.filter((I) => !I.optional).map((I) => I.name)
          ),
          c.params &&
            Da(
              c.params,
              h.keys.map((I) => I.name)
            )
        )),
        (v = h.stringify(p))
    } else if ('path' in c)
      (v = c.path), (h = n.find((I) => I.re.test(v))), h && ((p = h.parse(v)), (b = h.record.name))
    else {
      if (((h = f.name ? r.get(f.name) : n.find((I) => I.re.test(f.path))), !h))
        throw $n(1, { location: c, currentLocation: f })
      ;(b = h.record.name), (p = fe({}, f.params, c.params)), (v = h.stringify(p))
    }
    const N = []
    let y = h
    for (; y; ) N.unshift(y.record), (y = y.parent)
    return { name: b, path: v, params: p, matched: N, meta: $m(N) }
  }
  return (
    e.forEach((c) => o(c)),
    { addRoute: o, resolve: u, removeRoute: i, getRoutes: l, getRecordMatcher: s }
  )
}
function Da(e, t) {
  const n = {}
  for (const r of t) r in e && (n[r] = e[r])
  return n
}
function Pm(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Dm(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components: 'components' in e ? e.components || null : e.component && { default: e.component }
  }
}
function Dm(e) {
  const t = {},
    n = e.props || !1
  if ('component' in e) t.default = n
  else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n
  return t
}
function $a(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function $m(e) {
  return e.reduce((t, n) => fe(t, n.meta), {})
}
function Ma(e, t) {
  const n = {}
  for (const r in e) n[r] = r in t ? t[r] : e[r]
  return n
}
function ru(e, t) {
  return t.children.some((n) => n === e || ru(e, n))
}
const su = /#/g,
  Mm = /&/g,
  xm = /\//g,
  km = /=/g,
  zm = /\?/g,
  ou = /\+/g,
  Fm = /%5B/g,
  Vm = /%5D/g,
  iu = /%5E/g,
  Hm = /%60/g,
  au = /%7B/g,
  Um = /%7C/g,
  lu = /%7D/g,
  Wm = /%20/g
function vi(e) {
  return encodeURI('' + e)
    .replace(Um, '|')
    .replace(Fm, '[')
    .replace(Vm, ']')
}
function jm(e) {
  return vi(e).replace(au, '{').replace(lu, '}').replace(iu, '^')
}
function Do(e) {
  return vi(e)
    .replace(ou, '%2B')
    .replace(Wm, '+')
    .replace(su, '%23')
    .replace(Mm, '%26')
    .replace(Hm, '`')
    .replace(au, '{')
    .replace(lu, '}')
    .replace(iu, '^')
}
function Bm(e) {
  return Do(e).replace(km, '%3D')
}
function Km(e) {
  return vi(e).replace(su, '%23').replace(zm, '%3F')
}
function Ym(e) {
  return e == null ? '' : Km(e).replace(xm, '%2F')
}
function os(e) {
  try {
    return decodeURIComponent('' + e)
  } catch {}
  return '' + e
}
function Gm(e) {
  const t = {}
  if (e === '' || e === '?') return t
  const r = (e[0] === '?' ? e.slice(1) : e).split('&')
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(ou, ' '),
      i = o.indexOf('='),
      l = os(i < 0 ? o : o.slice(0, i)),
      a = i < 0 ? null : os(o.slice(i + 1))
    if (l in t) {
      let u = t[l]
      ft(u) || (u = t[l] = [u]), u.push(a)
    } else t[l] = a
  }
  return t
}
function xa(e) {
  let t = ''
  for (let n in e) {
    const r = e[n]
    if (((n = Bm(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n)
      continue
    }
    ;(ft(r) ? r.map((o) => o && Do(o)) : [r && Do(r)]).forEach((o) => {
      o !== void 0 && ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o))
    })
  }
  return t
}
function qm(e) {
  const t = {}
  for (const n in e) {
    const r = e[n]
    r !== void 0 &&
      (t[n] = ft(r) ? r.map((s) => (s == null ? null : '' + s)) : r == null ? r : '' + r)
  }
  return t
}
const Xm = Symbol(''),
  ka = Symbol(''),
  bi = Symbol(''),
  cu = Symbol(''),
  $o = Symbol('')
function Jn() {
  let e = []
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r)
        s > -1 && e.splice(s, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function Ht(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || [])
  return () =>
    new Promise((i, l) => {
      const a = (f) => {
          f === !1
            ? l($n(4, { from: n, to: t }))
            : f instanceof Error
              ? l(f)
              : ym(f)
                ? l($n(2, { from: t, to: f }))
                : (o && r.enterCallbacks[s] === o && typeof f == 'function' && o.push(f), i())
        },
        u = e.call(r && r.instances[s], t, n, a)
      let c = Promise.resolve(u)
      e.length < 3 && (c = c.then(a)), c.catch((f) => l(f))
    })
}
function eo(e, t, n, r) {
  const s = []
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i]
      if (!(t !== 'beforeRouteEnter' && !o.instances[i]))
        if (Qm(l)) {
          const u = (l.__vccOpts || l)[t]
          u && s.push(Ht(u, n, r, o, i))
        } else {
          let a = l()
          s.push(() =>
            a.then((u) => {
              if (!u)
                return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${o.path}"`))
              const c = rm(u) ? u.default : u
              o.components[i] = c
              const h = (c.__vccOpts || c)[t]
              return h && Ht(h, n, r, o, i)()
            })
          )
        }
    }
  return s
}
function Qm(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e
}
function za(e) {
  const t = vt(bi),
    n = vt(cu),
    r = Ie(() => t.resolve(ct(e.to))),
    s = Ie(() => {
      const { matched: a } = r.value,
        { length: u } = a,
        c = a[u - 1],
        f = n.matched
      if (!c || !f.length) return -1
      const h = f.findIndex(Dn.bind(null, c))
      if (h > -1) return h
      const p = Fa(a[u - 2])
      return u > 1 && Fa(c) === p && f[f.length - 1].path !== p
        ? f.findIndex(Dn.bind(null, a[u - 2]))
        : h
    }),
    o = Ie(() => s.value > -1 && tp(n.params, r.value.params)),
    i = Ie(() => s.value > -1 && s.value === n.matched.length - 1 && Zc(n.params, r.value.params))
  function l(a = {}) {
    return ep(a) ? t[ct(e.replace) ? 'replace' : 'push'](ct(e.to)).catch(ar) : Promise.resolve()
  }
  return { route: r, href: Ie(() => r.value.href), isActive: o, isExactActive: i, navigate: l }
}
const Jm = It({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: za,
    setup(e, { slots: t }) {
      const n = br(za(e)),
        { options: r } = vt(bi),
        s = Ie(() => ({
          [Va(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
          [Va(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]:
            n.isExactActive
        }))
      return () => {
        const o = t.default && t.default(n)
        return e.custom
          ? o
          : Ls(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
              },
              o
            )
      }
    }
  }),
  Zm = Jm
function ep(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target')
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function tp(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n]
    if (typeof r == 'string') {
      if (r !== s) return !1
    } else if (!ft(s) || s.length !== r.length || r.some((o, i) => o !== s[i])) return !1
  }
  return !0
}
function Fa(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const Va = (e, t, n) => e ?? t ?? n,
  np = It({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = vt($o),
        s = Ie(() => e.route || r.value),
        o = vt(ka, 0),
        i = Ie(() => {
          let u = ct(o)
          const { matched: c } = s.value
          let f
          for (; (f = c[u]) && !f.components; ) u++
          return u
        }),
        l = Ie(() => s.value.matched[i.value])
      Kr(
        ka,
        Ie(() => i.value + 1)
      ),
        Kr(Xm, l),
        Kr($o, s)
      const a = ys()
      return (
        cn(
          () => [a.value, l.value, e.name],
          ([u, c, f], [h, p, v]) => {
            c &&
              ((c.instances[f] = u),
              p &&
                p !== c &&
                u &&
                u === h &&
                (c.leaveGuards.size || (c.leaveGuards = p.leaveGuards),
                c.updateGuards.size || (c.updateGuards = p.updateGuards))),
              u && c && (!p || !Dn(c, p) || !h) && (c.enterCallbacks[f] || []).forEach((b) => b(u))
          },
          { flush: 'post' }
        ),
        () => {
          const u = s.value,
            c = e.name,
            f = l.value,
            h = f && f.components[c]
          if (!h) return Ha(n.default, { Component: h, route: u })
          const p = f.props[c],
            v = p ? (p === !0 ? u.params : typeof p == 'function' ? p(u) : p) : null,
            N = Ls(
              h,
              fe({}, v, t, {
                onVnodeUnmounted: (y) => {
                  y.component.isUnmounted && (f.instances[c] = null)
                },
                ref: a
              })
            )
          return Ha(n.default, { Component: N, route: u }) || N
        }
      )
    }
  })
function Ha(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const uu = np
function rp(e) {
  const t = Rm(e.routes, e),
    n = e.parseQuery || Gm,
    r = e.stringifyQuery || xa,
    s = e.history,
    o = Jn(),
    i = Jn(),
    l = Jn(),
    a = Oc(Mt)
  let u = Mt
  yn && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual')
  const c = Js.bind(null, (A) => '' + A),
    f = Js.bind(null, Ym),
    h = Js.bind(null, os)
  function p(A, z) {
    let k, W
    return tu(A) ? ((k = t.getRecordMatcher(A)), (W = z)) : (W = A), t.addRoute(W, k)
  }
  function v(A) {
    const z = t.getRecordMatcher(A)
    z && t.removeRoute(z)
  }
  function b() {
    return t.getRoutes().map((A) => A.record)
  }
  function N(A) {
    return !!t.getRecordMatcher(A)
  }
  function y(A, z) {
    if (((z = fe({}, z || a.value)), typeof A == 'string')) {
      const m = Zs(n, A, z.path),
        g = t.resolve({ path: m.path }, z),
        O = s.createHref(m.fullPath)
      return fe(m, g, { params: h(g.params), hash: os(m.hash), redirectedFrom: void 0, href: O })
    }
    let k
    if ('path' in A) k = fe({}, A, { path: Zs(n, A.path, z.path).path })
    else {
      const m = fe({}, A.params)
      for (const g in m) m[g] == null && delete m[g]
      ;(k = fe({}, A, { params: f(m) })), (z.params = f(z.params))
    }
    const W = t.resolve(k, z),
      ne = A.hash || ''
    W.params = c(h(W.params))
    const de = im(r, fe({}, A, { hash: jm(ne), path: W.path })),
      d = s.createHref(de)
    return fe({ fullPath: de, hash: ne, query: r === xa ? qm(A.query) : A.query || {} }, W, {
      redirectedFrom: void 0,
      href: d
    })
  }
  function I(A) {
    return typeof A == 'string' ? Zs(n, A, a.value.path) : fe({}, A)
  }
  function D(A, z) {
    if (u !== A) return $n(8, { from: z, to: A })
  }
  function w(A) {
    return j(A)
  }
  function x(A) {
    return w(fe(I(A), { replace: !0 }))
  }
  function C(A) {
    const z = A.matched[A.matched.length - 1]
    if (z && z.redirect) {
      const { redirect: k } = z
      let W = typeof k == 'function' ? k(A) : k
      return (
        typeof W == 'string' &&
          ((W = W.includes('?') || W.includes('#') ? (W = I(W)) : { path: W }), (W.params = {})),
        fe({ query: A.query, hash: A.hash, params: 'path' in W ? {} : A.params }, W)
      )
    }
  }
  function j(A, z) {
    const k = (u = y(A)),
      W = a.value,
      ne = A.state,
      de = A.force,
      d = A.replace === !0,
      m = C(k)
    if (m)
      return j(
        fe(I(m), { state: typeof m == 'object' ? fe({}, ne, m.state) : ne, force: de, replace: d }),
        z || k
      )
    const g = k
    g.redirectedFrom = z
    let O
    return (
      !de && am(r, W, k) && ((O = $n(16, { to: g, from: W })), Ne(W, W, !0, !1)),
      (O ? Promise.resolve(O) : J(g, W))
        .catch((T) => (Ot(T) ? (Ot(T, 2) ? T : be(T)) : ee(T, g, W)))
        .then((T) => {
          if (T) {
            if (Ot(T, 2))
              return j(
                fe({ replace: d }, I(T.to), {
                  state: typeof T.to == 'object' ? fe({}, ne, T.to.state) : ne,
                  force: de
                }),
                z || g
              )
          } else T = le(g, W, !0, d, ne)
          return Z(g, W, T), T
        })
    )
  }
  function P(A, z) {
    const k = D(A, z)
    return k ? Promise.reject(k) : Promise.resolve()
  }
  function te(A) {
    const z = ze.values().next().value
    return z && typeof z.runWithContext == 'function' ? z.runWithContext(A) : A()
  }
  function J(A, z) {
    let k
    const [W, ne, de] = sp(A, z)
    k = eo(W.reverse(), 'beforeRouteLeave', A, z)
    for (const m of W)
      m.leaveGuards.forEach((g) => {
        k.push(Ht(g, A, z))
      })
    const d = P.bind(null, A, z)
    return (
      k.push(d),
      pe(k)
        .then(() => {
          k = []
          for (const m of o.list()) k.push(Ht(m, A, z))
          return k.push(d), pe(k)
        })
        .then(() => {
          k = eo(ne, 'beforeRouteUpdate', A, z)
          for (const m of ne)
            m.updateGuards.forEach((g) => {
              k.push(Ht(g, A, z))
            })
          return k.push(d), pe(k)
        })
        .then(() => {
          k = []
          for (const m of de)
            if (m.beforeEnter)
              if (ft(m.beforeEnter)) for (const g of m.beforeEnter) k.push(Ht(g, A, z))
              else k.push(Ht(m.beforeEnter, A, z))
          return k.push(d), pe(k)
        })
        .then(
          () => (
            A.matched.forEach((m) => (m.enterCallbacks = {})),
            (k = eo(de, 'beforeRouteEnter', A, z)),
            k.push(d),
            pe(k)
          )
        )
        .then(() => {
          k = []
          for (const m of i.list()) k.push(Ht(m, A, z))
          return k.push(d), pe(k)
        })
        .catch((m) => (Ot(m, 8) ? m : Promise.reject(m)))
    )
  }
  function Z(A, z, k) {
    l.list().forEach((W) => te(() => W(A, z, k)))
  }
  function le(A, z, k, W, ne) {
    const de = D(A, z)
    if (de) return de
    const d = z === Mt,
      m = yn ? history.state : {}
    k &&
      (W || d
        ? s.replace(A.fullPath, fe({ scroll: d && m && m.scroll }, ne))
        : s.push(A.fullPath, ne)),
      (a.value = A),
      Ne(A, z, k, d),
      be()
  }
  let ce
  function ke() {
    ce ||
      (ce = s.listen((A, z, k) => {
        if (!Fe.listening) return
        const W = y(A),
          ne = C(W)
        if (ne) {
          j(fe(ne, { replace: !0 }), W).catch(ar)
          return
        }
        u = W
        const de = a.value
        yn && pm(Sa(de.fullPath, k.delta), Is()),
          J(W, de)
            .catch((d) =>
              Ot(d, 12)
                ? d
                : Ot(d, 2)
                  ? (j(d.to, W)
                      .then((m) => {
                        Ot(m, 20) && !k.delta && k.type === _r.pop && s.go(-1, !1)
                      })
                      .catch(ar),
                    Promise.reject())
                  : (k.delta && s.go(-k.delta, !1), ee(d, W, de))
            )
            .then((d) => {
              ;(d = d || le(W, de, !1)),
                d &&
                  (k.delta && !Ot(d, 8)
                    ? s.go(-k.delta, !1)
                    : k.type === _r.pop && Ot(d, 20) && s.go(-1, !1)),
                Z(W, de, d)
            })
            .catch(ar)
      }))
  }
  let $e = Jn(),
    re = Jn(),
    Q
  function ee(A, z, k) {
    be(A)
    const W = re.list()
    return W.length ? W.forEach((ne) => ne(A, z, k)) : console.error(A), Promise.reject(A)
  }
  function Te() {
    return Q && a.value !== Mt
      ? Promise.resolve()
      : new Promise((A, z) => {
          $e.add([A, z])
        })
  }
  function be(A) {
    return Q || ((Q = !A), ke(), $e.list().forEach(([z, k]) => (A ? k(A) : z())), $e.reset()), A
  }
  function Ne(A, z, k, W) {
    const { scrollBehavior: ne } = e
    if (!yn || !ne) return Promise.resolve()
    const de =
      (!k && _m(Sa(A.fullPath, 0))) || ((W || !k) && history.state && history.state.scroll) || null
    return ci()
      .then(() => ne(A, z, de))
      .then((d) => d && mm(d))
      .catch((d) => ee(d, A, z))
  }
  const ge = (A) => s.go(A)
  let Ge
  const ze = new Set(),
    Fe = {
      currentRoute: a,
      listening: !0,
      addRoute: p,
      removeRoute: v,
      hasRoute: N,
      getRoutes: b,
      resolve: y,
      options: e,
      push: w,
      replace: x,
      go: ge,
      back: () => ge(-1),
      forward: () => ge(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: re.add,
      isReady: Te,
      install(A) {
        const z = this
        A.component('RouterLink', Zm),
          A.component('RouterView', uu),
          (A.config.globalProperties.$router = z),
          Object.defineProperty(A.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => ct(a)
          }),
          yn && !Ge && a.value === Mt && ((Ge = !0), w(s.location).catch((ne) => {}))
        const k = {}
        for (const ne in Mt)
          Object.defineProperty(k, ne, { get: () => a.value[ne], enumerable: !0 })
        A.provide(bi, z), A.provide(cu, vc(k)), A.provide($o, a)
        const W = A.unmount
        ze.add(A),
          (A.unmount = function () {
            ze.delete(A),
              ze.size < 1 &&
                ((u = Mt), ce && ce(), (ce = null), (a.value = Mt), (Ge = !1), (Q = !1)),
              W()
          })
      }
    }
  function pe(A) {
    return A.reduce((z, k) => z.then(() => te(k)), Promise.resolve())
  }
  return Fe
}
function sp(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length)
  for (let i = 0; i < o; i++) {
    const l = t.matched[i]
    l && (e.matched.find((u) => Dn(u, l)) ? r.push(l) : n.push(l))
    const a = e.matched[i]
    a && (t.matched.find((u) => Dn(u, a)) || s.push(a))
  }
  return [n, r, s]
}
const op = 'modulepreload',
  ip = function (e) {
    return '/erik-vue-vite/' + e
  },
  Ua = {},
  cr = function (t, n, r) {
    let s = Promise.resolve()
    if (n && n.length > 0) {
      const o = document.getElementsByTagName('link')
      s = Promise.all(
        n.map((i) => {
          if (((i = ip(i)), i in Ua)) return
          Ua[i] = !0
          const l = i.endsWith('.css'),
            a = l ? '[rel="stylesheet"]' : ''
          if (!!r)
            for (let f = o.length - 1; f >= 0; f--) {
              const h = o[f]
              if (h.href === i && (!l || h.rel === 'stylesheet')) return
            }
          else if (document.querySelector(`link[href="${i}"]${a}`)) return
          const c = document.createElement('link')
          if (
            ((c.rel = l ? 'stylesheet' : op),
            l || ((c.as = 'script'), (c.crossOrigin = '')),
            (c.href = i),
            document.head.appendChild(c),
            l)
          )
            return new Promise((f, h) => {
              c.addEventListener('load', f),
                c.addEventListener('error', () => h(new Error(`Unable to preload CSS for ${i}`)))
            })
        })
      )
    }
    return s
      .then(() => t())
      .catch((o) => {
        const i = new Event('vite:preloadError', { cancelable: !0 })
        if (((i.payload = o), window.dispatchEvent(i), !i.defaultPrevented)) throw o
      })
  },
  ap = (e) => (Pc('data-v-cac12968'), (e = e()), Dc(), e),
  lp = { class: 'pagina' },
  cp = ap(() =>
    G(
      'div',
      { id: 'title', class: 'center' },
      [G('h1', null, "Welcome to Erik's vue3 project")],
      -1
    )
  ),
  up = { class: 'about' },
  fp = { class: 'main-card' },
  dp = { class: 'my-cards' },
  hp = { class: 'card' },
  mp = { class: 'card-body' },
  pp = { class: 'card-title' },
  _p = { class: 'card-text' },
  gp = { class: 'my-cards' },
  Ep = { class: 'card' },
  vp = { class: 'card-body' },
  bp = { class: 'card-title' },
  yp = { class: 'card-text' },
  Tp = { class: 'my-cards' },
  Ap = { class: 'card' },
  Op = { class: 'card-body' },
  wp = { class: 'card-title' },
  Cp = { class: 'card-text' },
  Np = It({
    __name: 'HomeView',
    setup(e) {
      function t(n) {
        yi.push({ name: n })
      }
      return (n, r) => (
        un(),
        In('div', lp, [
          cp,
          G('div', up, [
            G('p', null, we(n.$t('home.description.p1')), 1),
            G('p', null, we(n.$t('home.description.p2', { bootstrap: '5.3' })), 1),
            G('p', null, we(n.$t('home.description.p3')), 1),
            G('p', null, we(n.$t('home.description.p4')), 1)
          ]),
          G('div', null, [
            G('div', fp, [
              G('div', dp, [
                G('div', hp, [
                  G('div', mp, [
                    G('h5', pp, we(n.$t('home.card1.title')), 1),
                    G('p', _p, we(n.$t('home.card1.description')), 1),
                    G(
                      'button',
                      {
                        id: 'btn-simple-form',
                        class: 'btn btn-primary',
                        onClick: r[0] || (r[0] = (s) => t('SimpleForm'))
                      },
                      we(n.$t('home.card1.button')),
                      1
                    )
                  ])
                ])
              ]),
              G('div', gp, [
                G('div', Ep, [
                  G('div', vp, [
                    G('h5', bp, we(n.$t('home.card2.title')), 1),
                    G('p', yp, we(n.$t('home.card2.description')), 1),
                    G(
                      'button',
                      {
                        id: 'btn-modal',
                        class: 'btn btn-primary',
                        onClick: r[1] || (r[1] = (s) => t('Modals'))
                      },
                      we(n.$t('home.card2.button')),
                      1
                    )
                  ])
                ])
              ]),
              G('div', Tp, [
                G('div', Ap, [
                  G('div', Op, [
                    G('h5', wp, we(n.$t('home.card3.title')), 1),
                    G('p', Cp, we(n.$t('home.card3.description')), 1),
                    G(
                      'button',
                      {
                        id: 'btn-simple-form',
                        class: 'btn btn-primary',
                        onClick: r[2] || (r[2] = (s) => t('TipCalculator'))
                      },
                      we(n.$t('home.card3.button')),
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
  fu = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, s] of t) n[r] = s
    return n
  },
  Sp = fu(Np, [['__scopeId', 'data-v-cac12968']]),
  yi = rp({
    history: bm('/'),
    routes: [
      { path: '/erik-vue-vite', name: 'Home', component: Sp },
      {
        path: '/erik-vue-vite/simple-form',
        name: 'SimpleForm',
        component: () => cr(() => import('./SimpleForm-7W1Q4k1G.js'), __vite__mapDeps([0, 1, 2, 3]))
      },
      {
        path: '/erik-vue-vite/tip-calculator',
        name: 'TipCalculator',
        component: () =>
          cr(() => import('./TipCalculator-dwOFPs7d.js'), __vite__mapDeps([4, 1, 2, 5, 6, 7]))
      },
      {
        path: '/erik-vue-vite/modals',
        name: 'Modals',
        component: () =>
          cr(() => import('./ModalsView-_bcU2bwM.js'), __vite__mapDeps([8, 5, 1, 2, 6, 9]))
      },
      { path: '/:pathMatch(.*)*', redirect: '/erik-vue-vite' }
    ]
  })
/*!
 * shared v9.9.0
 * (c) 2024 kazuya kawaguchi
 * Released under the MIT License.
 */ const is = typeof window < 'u',
  Gt = (e, t = !1) => (t ? Symbol.for(e) : Symbol(e)),
  Lp = (e, t, n) => Ip({ l: e, k: t, s: n }),
  Ip = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027'),
  Ce = (e) => typeof e == 'number' && isFinite(e),
  Rp = (e) => hu(e) === '[object Date]',
  as = (e) => hu(e) === '[object RegExp]',
  Rs = (e) => se(e) && Object.keys(e).length === 0,
  xe = Object.assign
let Wa
const Ti = () =>
  Wa ||
  (Wa =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function ja(e) {
  return e
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
const Pp = Object.prototype.hasOwnProperty
function ls(e, t) {
  return Pp.call(e, t)
}
const Ae = Array.isArray,
  Ee = (e) => typeof e == 'function',
  B = (e) => typeof e == 'string',
  ve = (e) => typeof e == 'boolean',
  ue = (e) => e !== null && typeof e == 'object',
  Dp = (e) => ue(e) && Ee(e.then) && Ee(e.catch),
  du = Object.prototype.toString,
  hu = (e) => du.call(e),
  se = (e) => {
    if (!ue(e)) return !1
    const t = Object.getPrototypeOf(e)
    return t === null || t.constructor === Object
  },
  $p = (e) =>
    e == null ? '' : Ae(e) || (se(e) && e.toString === du) ? JSON.stringify(e, null, 2) : String(e)
function Mp(e, t = '') {
  return e.reduce((n, r, s) => (s === 0 ? n + r : n + t + r), '')
}
function Ai(e) {
  let t = e
  return () => ++t
}
function xp(e, t) {
  typeof console < 'u' && (console.warn('[intlify] ' + e), t && console.warn(t.stack))
}
const Mr = (e) => !ue(e) || Ae(e)
function Gr(e, t) {
  if (Mr(e) || Mr(t)) throw new Error('Invalid value')
  const n = [{ src: e, des: t }]
  for (; n.length; ) {
    const { src: r, des: s } = n.pop()
    Object.keys(r).forEach((o) => {
      Mr(r[o]) || Mr(s[o]) ? (s[o] = r[o]) : n.push({ src: r[o], des: s[o] })
    })
  }
}
/*!
 * message-compiler v9.9.0
 * (c) 2024 kazuya kawaguchi
 * Released under the MIT License.
 */ const kp = /\{([0-9a-zA-Z]+)\}/g
function zp(e, ...t) {
  return (
    t.length === 1 && Fp(t[0]) && (t = t[0]),
    (!t || !t.hasOwnProperty) && (t = {}),
    e.replace(kp, (n, r) => (t.hasOwnProperty(r) ? t[r] : ''))
  )
}
const Fp = (e) => e !== null && typeof e == 'object',
  Se = {
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    UNHANDLED_CODEGEN_NODE_TYPE: 15,
    UNHANDLED_MINIFIER_NODE_TYPE: 16,
    __EXTEND_POINT__: 17
  },
  Vp = {
    [Se.EXPECTED_TOKEN]: "Expected token: '{0}'",
    [Se.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
    [Se.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: 'Unterminated single quote in placeholder',
    [Se.UNKNOWN_ESCAPE_SEQUENCE]: 'Unknown escape sequence: \\{0}',
    [Se.INVALID_UNICODE_ESCAPE_SEQUENCE]: 'Invalid unicode escape sequence: {0}',
    [Se.UNBALANCED_CLOSING_BRACE]: 'Unbalanced closing brace',
    [Se.UNTERMINATED_CLOSING_BRACE]: 'Unterminated closing brace',
    [Se.EMPTY_PLACEHOLDER]: 'Empty placeholder',
    [Se.NOT_ALLOW_NEST_PLACEHOLDER]: 'Not allowed nest placeholder',
    [Se.INVALID_LINKED_FORMAT]: 'Invalid linked format',
    [Se.MUST_HAVE_MESSAGES_IN_PLURAL]: 'Plural must have messages',
    [Se.UNEXPECTED_EMPTY_LINKED_MODIFIER]: 'Unexpected empty linked modifier',
    [Se.UNEXPECTED_EMPTY_LINKED_KEY]: 'Unexpected empty linked key',
    [Se.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
    [Se.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
    [Se.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
  }
function mu(e, t, n = {}) {
  const { domain: r, messages: s, args: o } = n,
    i = zp((s || Vp)[e] || '', ...(o || [])),
    l = new SyntaxError(String(i))
  return (l.code = e), t && (l.location = t), (l.domain = r), l
}
/*!
 * core-base v9.9.0
 * (c) 2024 kazuya kawaguchi
 * Released under the MIT License.
 */ function Hp() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != 'boolean' && (Ti().__INTLIFY_PROD_DEVTOOLS__ = !1)
}
const qt = []
qt[0] = { w: [0], i: [3, 0], '[': [4], o: [7] }
qt[1] = { w: [1], '.': [2], '[': [4], o: [7] }
qt[2] = { w: [2], i: [3, 0], 0: [3, 0] }
qt[3] = { i: [3, 0], 0: [3, 0], w: [1, 1], '.': [2, 1], '[': [4, 1], o: [7, 1] }
qt[4] = { "'": [5, 0], '"': [6, 0], '[': [4, 2], ']': [1, 3], o: 8, l: [4, 0] }
qt[5] = { "'": [4, 0], o: 8, l: [5, 0] }
qt[6] = { '"': [4, 0], o: 8, l: [6, 0] }
const Up = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/
function Wp(e) {
  return Up.test(e)
}
function jp(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1)
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e
}
function Bp(e) {
  if (e == null) return 'o'
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e
    case 95:
    case 36:
    case 45:
      return 'i'
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return 'w'
  }
  return 'i'
}
function Kp(e) {
  const t = e.trim()
  return e.charAt(0) === '0' && isNaN(parseInt(e)) ? !1 : Wp(t) ? jp(t) : '*' + t
}
function Yp(e) {
  const t = []
  let n = -1,
    r = 0,
    s = 0,
    o,
    i,
    l,
    a,
    u,
    c,
    f
  const h = []
  ;(h[0] = () => {
    i === void 0 ? (i = l) : (i += l)
  }),
    (h[1] = () => {
      i !== void 0 && (t.push(i), (i = void 0))
    }),
    (h[2] = () => {
      h[0](), s++
    }),
    (h[3] = () => {
      if (s > 0) s--, (r = 4), h[0]()
      else {
        if (((s = 0), i === void 0 || ((i = Kp(i)), i === !1))) return !1
        h[1]()
      }
    })
  function p() {
    const v = e[n + 1]
    if ((r === 5 && v === "'") || (r === 6 && v === '"')) return n++, (l = '\\' + v), h[0](), !0
  }
  for (; r !== null; )
    if ((n++, (o = e[n]), !(o === '\\' && p()))) {
      if (
        ((a = Bp(o)),
        (f = qt[r]),
        (u = f[a] || f.l || 8),
        u === 8 || ((r = u[0]), u[1] !== void 0 && ((c = h[u[1]]), c && ((l = o), c() === !1))))
      )
        return
      if (r === 7) return t
    }
}
const Ba = new Map()
function Gp(e, t) {
  return ue(e) ? e[t] : null
}
function qp(e, t) {
  if (!ue(e)) return null
  let n = Ba.get(t)
  if ((n || ((n = Yp(t)), n && Ba.set(t, n)), !n)) return null
  const r = n.length
  let s = e,
    o = 0
  for (; o < r; ) {
    const i = s[n[o]]
    if (i === void 0 || Ee(s)) return null
    ;(s = i), o++
  }
  return s
}
const Xp = (e) => e,
  Qp = (e) => '',
  Jp = 'text',
  Zp = (e) => (e.length === 0 ? '' : Mp(e)),
  e_ = $p
function Ka(e, t) {
  return (e = Math.abs(e)), t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
}
function t_(e) {
  const t = Ce(e.pluralIndex) ? e.pluralIndex : -1
  return e.named && (Ce(e.named.count) || Ce(e.named.n))
    ? Ce(e.named.count)
      ? e.named.count
      : Ce(e.named.n)
        ? e.named.n
        : t
    : t
}
function n_(e, t) {
  t.count || (t.count = e), t.n || (t.n = e)
}
function r_(e = {}) {
  const t = e.locale,
    n = t_(e),
    r = ue(e.pluralRules) && B(t) && Ee(e.pluralRules[t]) ? e.pluralRules[t] : Ka,
    s = ue(e.pluralRules) && B(t) && Ee(e.pluralRules[t]) ? Ka : void 0,
    o = (y) => y[r(n, y.length, s)],
    i = e.list || [],
    l = (y) => i[y],
    a = e.named || {}
  Ce(e.pluralIndex) && n_(n, a)
  const u = (y) => a[y]
  function c(y) {
    const I = Ee(e.messages) ? e.messages(y) : ue(e.messages) ? e.messages[y] : !1
    return I || (e.parent ? e.parent.message(y) : Qp)
  }
  const f = (y) => (e.modifiers ? e.modifiers[y] : Xp),
    h = se(e.processor) && Ee(e.processor.normalize) ? e.processor.normalize : Zp,
    p = se(e.processor) && Ee(e.processor.interpolate) ? e.processor.interpolate : e_,
    v = se(e.processor) && B(e.processor.type) ? e.processor.type : Jp,
    N = {
      list: l,
      named: u,
      plural: o,
      linked: (y, ...I) => {
        const [D, w] = I
        let x = 'text',
          C = ''
        I.length === 1
          ? ue(D)
            ? ((C = D.modifier || C), (x = D.type || x))
            : B(D) && (C = D || C)
          : I.length === 2 && (B(D) && (C = D || C), B(w) && (x = w || x))
        const j = c(y)(N),
          P = x === 'vnode' && Ae(j) && C ? j[0] : j
        return C ? f(C)(P, x) : P
      },
      message: c,
      type: v,
      interpolate: p,
      normalize: h,
      values: xe({}, i, a)
    }
  return N
}
let gr = null
function s_(e) {
  gr = e
}
function o_(e, t, n) {
  gr && gr.emit('i18n:init', { timestamp: Date.now(), i18n: e, version: t, meta: n })
}
const i_ = a_('function:translate')
function a_(e) {
  return (t) => gr && gr.emit(e, t)
}
const l_ = {
    NOT_FOUND_KEY: 1,
    FALLBACK_TO_TRANSLATE: 2,
    CANNOT_FORMAT_NUMBER: 3,
    FALLBACK_TO_NUMBER_FORMAT: 4,
    CANNOT_FORMAT_DATE: 5,
    FALLBACK_TO_DATE_FORMAT: 6,
    EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
    __EXTEND_POINT__: 8
  },
  pu = Se.__EXTEND_POINT__,
  tn = Ai(pu),
  Et = {
    INVALID_ARGUMENT: pu,
    INVALID_DATE_ARGUMENT: tn(),
    INVALID_ISO_DATE_ARGUMENT: tn(),
    NOT_SUPPORT_NON_STRING_MESSAGE: tn(),
    NOT_SUPPORT_LOCALE_PROMISE_VALUE: tn(),
    NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: tn(),
    NOT_SUPPORT_LOCALE_TYPE: tn(),
    __EXTEND_POINT__: tn()
  }
function wt(e) {
  return mu(e, null, void 0)
}
function Oi(e, t) {
  return t.locale != null ? Ya(t.locale) : Ya(e.locale)
}
let to
function Ya(e) {
  if (B(e)) return e
  if (Ee(e)) {
    if (e.resolvedOnce && to != null) return to
    if (e.constructor.name === 'Function') {
      const t = e()
      if (Dp(t)) throw wt(Et.NOT_SUPPORT_LOCALE_PROMISE_VALUE)
      return (to = t)
    } else throw wt(Et.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION)
  } else throw wt(Et.NOT_SUPPORT_LOCALE_TYPE)
}
function c_(e, t, n) {
  return [...new Set([n, ...(Ae(t) ? t : ue(t) ? Object.keys(t) : B(t) ? [t] : [n])])]
}
function _u(e, t, n) {
  const r = B(n) ? n : cs,
    s = e
  s.__localeChainCache || (s.__localeChainCache = new Map())
  let o = s.__localeChainCache.get(r)
  if (!o) {
    o = []
    let i = [n]
    for (; Ae(i); ) i = Ga(o, i, t)
    const l = Ae(t) || !se(t) ? t : t.default ? t.default : null
    ;(i = B(l) ? [l] : l), Ae(i) && Ga(o, i, !1), s.__localeChainCache.set(r, o)
  }
  return o
}
function Ga(e, t, n) {
  let r = !0
  for (let s = 0; s < t.length && ve(r); s++) {
    const o = t[s]
    B(o) && (r = u_(e, t[s], n))
  }
  return r
}
function u_(e, t, n) {
  let r
  const s = t.split('-')
  do {
    const o = s.join('-')
    ;(r = f_(e, o, n)), s.splice(-1, 1)
  } while (s.length && r === !0)
  return r
}
function f_(e, t, n) {
  let r = !1
  if (!e.includes(t) && ((r = !0), t)) {
    r = t[t.length - 1] !== '!'
    const s = t.replace(/!/g, '')
    e.push(s), (Ae(n) || se(n)) && n[s] && (r = n[s])
  }
  return r
}
const d_ = '9.9.0',
  Ps = -1,
  cs = 'en-US',
  qa = '',
  Xa = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`
function h_() {
  return {
    upper: (e, t) =>
      t === 'text' && B(e)
        ? e.toUpperCase()
        : t === 'vnode' && ue(e) && '__v_isVNode' in e
          ? e.children.toUpperCase()
          : e,
    lower: (e, t) =>
      t === 'text' && B(e)
        ? e.toLowerCase()
        : t === 'vnode' && ue(e) && '__v_isVNode' in e
          ? e.children.toLowerCase()
          : e,
    capitalize: (e, t) =>
      t === 'text' && B(e)
        ? Xa(e)
        : t === 'vnode' && ue(e) && '__v_isVNode' in e
          ? Xa(e.children)
          : e
  }
}
let m_, gu
function p_(e) {
  gu = e
}
let Eu
function __(e) {
  Eu = e
}
let vu = null
const g_ = (e) => {
    vu = e
  },
  E_ = () => vu
let bu = null
const Qa = (e) => {
    bu = e
  },
  v_ = () => bu
let Ja = 0
function b_(e = {}) {
  const t = Ee(e.onWarn) ? e.onWarn : xp,
    n = B(e.version) ? e.version : d_,
    r = B(e.locale) || Ee(e.locale) ? e.locale : cs,
    s = Ee(r) ? cs : r,
    o =
      Ae(e.fallbackLocale) || se(e.fallbackLocale) || B(e.fallbackLocale) || e.fallbackLocale === !1
        ? e.fallbackLocale
        : s,
    i = se(e.messages) ? e.messages : { [s]: {} },
    l = se(e.datetimeFormats) ? e.datetimeFormats : { [s]: {} },
    a = se(e.numberFormats) ? e.numberFormats : { [s]: {} },
    u = xe({}, e.modifiers || {}, h_()),
    c = e.pluralRules || {},
    f = Ee(e.missing) ? e.missing : null,
    h = ve(e.missingWarn) || as(e.missingWarn) ? e.missingWarn : !0,
    p = ve(e.fallbackWarn) || as(e.fallbackWarn) ? e.fallbackWarn : !0,
    v = !!e.fallbackFormat,
    b = !!e.unresolving,
    N = Ee(e.postTranslation) ? e.postTranslation : null,
    y = se(e.processor) ? e.processor : null,
    I = ve(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    D = !!e.escapeParameter,
    w = Ee(e.messageCompiler) ? e.messageCompiler : m_,
    x = Ee(e.messageResolver) ? e.messageResolver : gu || Gp,
    C = Ee(e.localeFallbacker) ? e.localeFallbacker : Eu || c_,
    j = ue(e.fallbackContext) ? e.fallbackContext : void 0,
    P = e,
    te = ue(P.__datetimeFormatters) ? P.__datetimeFormatters : new Map(),
    J = ue(P.__numberFormatters) ? P.__numberFormatters : new Map(),
    Z = ue(P.__meta) ? P.__meta : {}
  Ja++
  const le = {
    version: n,
    cid: Ja,
    locale: r,
    fallbackLocale: o,
    messages: i,
    modifiers: u,
    pluralRules: c,
    missing: f,
    missingWarn: h,
    fallbackWarn: p,
    fallbackFormat: v,
    unresolving: b,
    postTranslation: N,
    processor: y,
    warnHtmlMessage: I,
    escapeParameter: D,
    messageCompiler: w,
    messageResolver: x,
    localeFallbacker: C,
    fallbackContext: j,
    onWarn: t,
    __meta: Z
  }
  return (
    (le.datetimeFormats = l),
    (le.numberFormats = a),
    (le.__datetimeFormatters = te),
    (le.__numberFormatters = J),
    __INTLIFY_PROD_DEVTOOLS__ && o_(le, n, Z),
    le
  )
}
function wi(e, t, n, r, s) {
  const { missing: o, onWarn: i } = e
  if (o !== null) {
    const l = o(e, n, t, s)
    return B(l) ? l : t
  } else return t
}
function Zn(e, t, n) {
  const r = e
  ;(r.__localeChainCache = new Map()), e.localeFallbacker(e, n, t)
}
const Mn = (e) => ue(e) && (e.t === 0 || e.type === 0) && ('b' in e || 'body' in e),
  Za = () => '',
  et = (e) => Ee(e)
function el(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: r,
      unresolving: s,
      messageCompiler: o,
      fallbackLocale: i,
      messages: l
    } = e,
    [a, u] = Mo(...t),
    c = ve(u.missingWarn) ? u.missingWarn : e.missingWarn,
    f = ve(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn,
    h = ve(u.escapeParameter) ? u.escapeParameter : e.escapeParameter,
    p = !!u.resolvedMessage,
    v =
      B(u.default) || ve(u.default)
        ? ve(u.default)
          ? o
            ? a
            : () => a
          : u.default
        : n
          ? o
            ? a
            : () => a
          : '',
    b = n || v !== '',
    N = Oi(e, u)
  h && y_(u)
  let [y, I, D] = p ? [a, N, l[N] || {}] : yu(e, a, N, i, f, c),
    w = y,
    x = a
  if (
    (!p && !(B(w) || Mn(w) || et(w)) && b && ((w = v), (x = w)),
    !p && (!(B(w) || Mn(w) || et(w)) || !B(I)))
  )
    return s ? Ps : a
  let C = !1
  const j = () => {
      C = !0
    },
    P = et(w) ? w : Tu(e, a, I, w, x, j)
  if (C) return w
  const te = O_(e, I, D, u),
    J = r_(te),
    Z = T_(e, P, J),
    le = r ? r(Z, a) : Z
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const ce = {
      timestamp: Date.now(),
      key: B(a) ? a : et(w) ? w.key : '',
      locale: I || (et(w) ? w.locale : ''),
      format: B(w) ? w : et(w) ? w.source : '',
      message: le
    }
    ;(ce.meta = xe({}, e.__meta, E_() || {})), i_(ce)
  }
  return le
}
function y_(e) {
  Ae(e.list)
    ? (e.list = e.list.map((t) => (B(t) ? ja(t) : t)))
    : ue(e.named) &&
      Object.keys(e.named).forEach((t) => {
        B(e.named[t]) && (e.named[t] = ja(e.named[t]))
      })
}
function yu(e, t, n, r, s, o) {
  const { messages: i, onWarn: l, messageResolver: a, localeFallbacker: u } = e,
    c = u(e, r, n)
  let f = {},
    h,
    p = null
  const v = 'translate'
  for (
    let b = 0;
    b < c.length &&
    ((h = c[b]), (f = i[h] || {}), (p = a(f, t)) === null && (p = f[t]), !(B(p) || Mn(p) || et(p)));
    b++
  ) {
    const N = wi(e, t, h, o, v)
    N !== t && (p = N)
  }
  return [p, h, f]
}
function Tu(e, t, n, r, s, o) {
  const { messageCompiler: i, warnHtmlMessage: l } = e
  if (et(r)) {
    const u = r
    return (u.locale = u.locale || n), (u.key = u.key || t), u
  }
  if (i == null) {
    const u = () => r
    return (u.locale = n), (u.key = t), u
  }
  const a = i(r, A_(e, n, s, r, l, o))
  return (a.locale = n), (a.key = t), (a.source = r), a
}
function T_(e, t, n) {
  return t(n)
}
function Mo(...e) {
  const [t, n, r] = e,
    s = {}
  if (!B(t) && !Ce(t) && !et(t) && !Mn(t)) throw wt(Et.INVALID_ARGUMENT)
  const o = Ce(t) ? String(t) : (et(t), t)
  return (
    Ce(n)
      ? (s.plural = n)
      : B(n)
        ? (s.default = n)
        : se(n) && !Rs(n)
          ? (s.named = n)
          : Ae(n) && (s.list = n),
    Ce(r) ? (s.plural = r) : B(r) ? (s.default = r) : se(r) && xe(s, r),
    [o, s]
  )
}
function A_(e, t, n, r, s, o) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: s,
    onError: (i) => {
      throw (o && o(i), i)
    },
    onCacheKey: (i) => Lp(t, n, i)
  }
}
function O_(e, t, n, r) {
  const {
      modifiers: s,
      pluralRules: o,
      messageResolver: i,
      fallbackLocale: l,
      fallbackWarn: a,
      missingWarn: u,
      fallbackContext: c
    } = e,
    h = {
      locale: t,
      modifiers: s,
      pluralRules: o,
      messages: (p) => {
        let v = i(n, p)
        if (v == null && c) {
          const [, , b] = yu(c, p, t, l, a, u)
          v = i(b, p)
        }
        if (B(v) || Mn(v)) {
          let b = !1
          const y = Tu(e, p, t, v, p, () => {
            b = !0
          })
          return b ? Za : y
        } else return et(v) ? v : Za
      }
    }
  return (
    e.processor && (h.processor = e.processor),
    r.list && (h.list = r.list),
    r.named && (h.named = r.named),
    Ce(r.plural) && (h.pluralIndex = r.plural),
    h
  )
}
function tl(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: r,
      fallbackLocale: s,
      onWarn: o,
      localeFallbacker: i
    } = e,
    { __datetimeFormatters: l } = e,
    [a, u, c, f] = xo(...t),
    h = ve(c.missingWarn) ? c.missingWarn : e.missingWarn
  ve(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn
  const p = !!c.part,
    v = Oi(e, c),
    b = i(e, s, v)
  if (!B(a) || a === '') return new Intl.DateTimeFormat(v, f).format(u)
  let N = {},
    y,
    I = null
  const D = 'datetime format'
  for (let C = 0; C < b.length && ((y = b[C]), (N = n[y] || {}), (I = N[a]), !se(I)); C++)
    wi(e, a, y, h, D)
  if (!se(I) || !B(y)) return r ? Ps : a
  let w = `${y}__${a}`
  Rs(f) || (w = `${w}__${JSON.stringify(f)}`)
  let x = l.get(w)
  return (
    x || ((x = new Intl.DateTimeFormat(y, xe({}, I, f))), l.set(w, x)),
    p ? x.formatToParts(u) : x.format(u)
  )
}
const Au = [
  'localeMatcher',
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'timeZoneName',
  'formatMatcher',
  'hour12',
  'timeZone',
  'dateStyle',
  'timeStyle',
  'calendar',
  'dayPeriod',
  'numberingSystem',
  'hourCycle',
  'fractionalSecondDigits'
]
function xo(...e) {
  const [t, n, r, s] = e,
    o = {}
  let i = {},
    l
  if (B(t)) {
    const a = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/)
    if (!a) throw wt(Et.INVALID_ISO_DATE_ARGUMENT)
    const u = a[3]
      ? a[3].trim().startsWith('T')
        ? `${a[1].trim()}${a[3].trim()}`
        : `${a[1].trim()}T${a[3].trim()}`
      : a[1].trim()
    l = new Date(u)
    try {
      l.toISOString()
    } catch {
      throw wt(Et.INVALID_ISO_DATE_ARGUMENT)
    }
  } else if (Rp(t)) {
    if (isNaN(t.getTime())) throw wt(Et.INVALID_DATE_ARGUMENT)
    l = t
  } else if (Ce(t)) l = t
  else throw wt(Et.INVALID_ARGUMENT)
  return (
    B(n)
      ? (o.key = n)
      : se(n) &&
        Object.keys(n).forEach((a) => {
          Au.includes(a) ? (i[a] = n[a]) : (o[a] = n[a])
        }),
    B(r) ? (o.locale = r) : se(r) && (i = r),
    se(s) && (i = s),
    [o.key || '', l, o, i]
  )
}
function nl(e, t, n) {
  const r = e
  for (const s in n) {
    const o = `${t}__${s}`
    r.__datetimeFormatters.has(o) && r.__datetimeFormatters.delete(o)
  }
}
function rl(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: s, onWarn: o, localeFallbacker: i } = e,
    { __numberFormatters: l } = e,
    [a, u, c, f] = ko(...t),
    h = ve(c.missingWarn) ? c.missingWarn : e.missingWarn
  ve(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn
  const p = !!c.part,
    v = Oi(e, c),
    b = i(e, s, v)
  if (!B(a) || a === '') return new Intl.NumberFormat(v, f).format(u)
  let N = {},
    y,
    I = null
  const D = 'number format'
  for (let C = 0; C < b.length && ((y = b[C]), (N = n[y] || {}), (I = N[a]), !se(I)); C++)
    wi(e, a, y, h, D)
  if (!se(I) || !B(y)) return r ? Ps : a
  let w = `${y}__${a}`
  Rs(f) || (w = `${w}__${JSON.stringify(f)}`)
  let x = l.get(w)
  return (
    x || ((x = new Intl.NumberFormat(y, xe({}, I, f))), l.set(w, x)),
    p ? x.formatToParts(u) : x.format(u)
  )
}
const Ou = [
  'localeMatcher',
  'style',
  'currency',
  'currencyDisplay',
  'currencySign',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'compactDisplay',
  'notation',
  'signDisplay',
  'unit',
  'unitDisplay',
  'roundingMode',
  'roundingPriority',
  'roundingIncrement',
  'trailingZeroDisplay'
]
function ko(...e) {
  const [t, n, r, s] = e,
    o = {}
  let i = {}
  if (!Ce(t)) throw wt(Et.INVALID_ARGUMENT)
  const l = t
  return (
    B(n)
      ? (o.key = n)
      : se(n) &&
        Object.keys(n).forEach((a) => {
          Ou.includes(a) ? (i[a] = n[a]) : (o[a] = n[a])
        }),
    B(r) ? (o.locale = r) : se(r) && (i = r),
    se(s) && (i = s),
    [o.key || '', l, o, i]
  )
}
function sl(e, t, n) {
  const r = e
  for (const s in n) {
    const o = `${t}__${s}`
    r.__numberFormatters.has(o) && r.__numberFormatters.delete(o)
  }
}
Hp()
/*!
 * vue-i18n v9.9.0
 * (c) 2024 kazuya kawaguchi
 * Released under the MIT License.
 */ const w_ = '9.9.0'
function C_() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != 'boolean' && (Ti().__INTLIFY_PROD_DEVTOOLS__ = !1)
}
const wu = l_.__EXTEND_POINT__,
  xt = Ai(wu)
xt(), xt(), xt(), xt(), xt(), xt(), xt(), xt()
const Cu = Et.__EXTEND_POINT__,
  je = Ai(Cu),
  rt = {
    UNEXPECTED_RETURN_TYPE: Cu,
    INVALID_ARGUMENT: je(),
    MUST_BE_CALL_SETUP_TOP: je(),
    NOT_INSTALLED: je(),
    NOT_AVAILABLE_IN_LEGACY_MODE: je(),
    REQUIRED_VALUE: je(),
    INVALID_VALUE: je(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: je(),
    NOT_INSTALLED_WITH_PROVIDE: je(),
    UNEXPECTED_ERROR: je(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: je(),
    BRIDGE_SUPPORT_VUE_2_ONLY: je(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: je(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: je(),
    __EXTEND_POINT__: je()
  }
function dt(e, ...t) {
  return mu(e, null, void 0)
}
const zo = Gt('__translateVNode'),
  Fo = Gt('__datetimeParts'),
  Vo = Gt('__numberParts'),
  N_ = Gt('__setPluralRules'),
  S_ = Gt('__injectWithOption'),
  Ho = Gt('__dispose')
function Er(e) {
  if (!ue(e)) return e
  for (const t in e)
    if (ls(e, t))
      if (!t.includes('.')) ue(e[t]) && Er(e[t])
      else {
        const n = t.split('.'),
          r = n.length - 1
        let s = e,
          o = !1
        for (let i = 0; i < r; i++) {
          if ((n[i] in s || (s[n[i]] = {}), !ue(s[n[i]]))) {
            o = !0
            break
          }
          s = s[n[i]]
        }
        o || ((s[n[r]] = e[t]), delete e[t]), ue(s[n[r]]) && Er(s[n[r]])
      }
  return e
}
function Nu(e, t) {
  const { messages: n, __i18n: r, messageResolver: s, flatJson: o } = t,
    i = se(n) ? n : Ae(r) ? {} : { [e]: {} }
  if (
    (Ae(r) &&
      r.forEach((l) => {
        if ('locale' in l && 'resource' in l) {
          const { locale: a, resource: u } = l
          a ? ((i[a] = i[a] || {}), Gr(u, i[a])) : Gr(u, i)
        } else B(l) && Gr(JSON.parse(l), i)
      }),
    s == null && o)
  )
    for (const l in i) ls(i, l) && Er(i[l])
  return i
}
function Su(e) {
  return e.type
}
function L_(e, t, n) {
  let r = ue(t.messages) ? t.messages : {}
  '__i18nGlobal' in n && (r = Nu(e.locale.value, { messages: r, __i18n: n.__i18nGlobal }))
  const s = Object.keys(r)
  s.length &&
    s.forEach((o) => {
      e.mergeLocaleMessage(o, r[o])
    })
  {
    if (ue(t.datetimeFormats)) {
      const o = Object.keys(t.datetimeFormats)
      o.length &&
        o.forEach((i) => {
          e.mergeDateTimeFormat(i, t.datetimeFormats[i])
        })
    }
    if (ue(t.numberFormats)) {
      const o = Object.keys(t.numberFormats)
      o.length &&
        o.forEach((i) => {
          e.mergeNumberFormat(i, t.numberFormats[i])
        })
    }
  }
}
function ol(e) {
  return Re(yr, null, e, 0)
}
const il = '__INTLIFY_META__',
  al = () => [],
  I_ = () => !1
let ll = 0
function cl(e) {
  return (t, n, r, s) => e(n, r, gi() || void 0, s)
}
const R_ = () => {
  const e = gi()
  let t = null
  return e && (t = Su(e)[il]) ? { [il]: t } : null
}
function Lu(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e,
    s = n === void 0,
    o = e.flatJson,
    i = is ? ys : Oc
  let l = ve(e.inheritLocale) ? e.inheritLocale : !0
  const a = i(n && l ? n.locale.value : B(e.locale) ? e.locale : cs),
    u = i(
      n && l
        ? n.fallbackLocale.value
        : B(e.fallbackLocale) ||
            Ae(e.fallbackLocale) ||
            se(e.fallbackLocale) ||
            e.fallbackLocale === !1
          ? e.fallbackLocale
          : a.value
    ),
    c = i(Nu(a.value, e)),
    f = i(se(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }),
    h = i(se(e.numberFormats) ? e.numberFormats : { [a.value]: {} })
  let p = n ? n.missingWarn : ve(e.missingWarn) || as(e.missingWarn) ? e.missingWarn : !0,
    v = n ? n.fallbackWarn : ve(e.fallbackWarn) || as(e.fallbackWarn) ? e.fallbackWarn : !0,
    b = n ? n.fallbackRoot : ve(e.fallbackRoot) ? e.fallbackRoot : !0,
    N = !!e.fallbackFormat,
    y = Ee(e.missing) ? e.missing : null,
    I = Ee(e.missing) ? cl(e.missing) : null,
    D = Ee(e.postTranslation) ? e.postTranslation : null,
    w = n ? n.warnHtmlMessage : ve(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    x = !!e.escapeParameter
  const C = n ? n.modifiers : se(e.modifiers) ? e.modifiers : {}
  let j = e.pluralRules || (n && n.pluralRules),
    P
  ;(P = (() => {
    s && Qa(null)
    const _ = {
      version: w_,
      locale: a.value,
      fallbackLocale: u.value,
      messages: c.value,
      modifiers: C,
      pluralRules: j,
      missing: I === null ? void 0 : I,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: N,
      unresolving: !0,
      postTranslation: D === null ? void 0 : D,
      warnHtmlMessage: w,
      escapeParameter: x,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: 'vue' }
    }
    ;(_.datetimeFormats = f.value),
      (_.numberFormats = h.value),
      (_.__datetimeFormatters = se(P) ? P.__datetimeFormatters : void 0),
      (_.__numberFormatters = se(P) ? P.__numberFormatters : void 0)
    const E = b_(_)
    return s && Qa(E), E
  })()),
    Zn(P, a.value, u.value)
  function J() {
    return [a.value, u.value, c.value, f.value, h.value]
  }
  const Z = Ie({
      get: () => a.value,
      set: (_) => {
        ;(a.value = _), (P.locale = a.value)
      }
    }),
    le = Ie({
      get: () => u.value,
      set: (_) => {
        ;(u.value = _), (P.fallbackLocale = u.value), Zn(P, a.value, _)
      }
    }),
    ce = Ie(() => c.value),
    ke = Ie(() => f.value),
    $e = Ie(() => h.value)
  function re() {
    return Ee(D) ? D : null
  }
  function Q(_) {
    ;(D = _), (P.postTranslation = _)
  }
  function ee() {
    return y
  }
  function Te(_) {
    _ !== null && (I = cl(_)), (y = _), (P.missing = I)
  }
  const be = (_, E, U, K, ie, _e) => {
    J()
    let Oe
    try {
      __INTLIFY_PROD_DEVTOOLS__, s || (P.fallbackContext = n ? v_() : void 0), (Oe = _(P))
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, s || (P.fallbackContext = void 0)
    }
    if ((U !== 'translate exists' && Ce(Oe) && Oe === Ps) || (U === 'translate exists' && !Oe)) {
      const [Dt, Ws] = E()
      return n && b ? K(n) : ie(Dt)
    } else {
      if (_e(Oe)) return Oe
      throw dt(rt.UNEXPECTED_RETURN_TYPE)
    }
  }
  function Ne(..._) {
    return be(
      (E) => Reflect.apply(el, null, [E, ..._]),
      () => Mo(..._),
      'translate',
      (E) => Reflect.apply(E.t, E, [..._]),
      (E) => E,
      (E) => B(E)
    )
  }
  function ge(..._) {
    const [E, U, K] = _
    if (K && !ue(K)) throw dt(rt.INVALID_ARGUMENT)
    return Ne(E, U, xe({ resolvedMessage: !0 }, K || {}))
  }
  function Ge(..._) {
    return be(
      (E) => Reflect.apply(tl, null, [E, ..._]),
      () => xo(..._),
      'datetime format',
      (E) => Reflect.apply(E.d, E, [..._]),
      () => qa,
      (E) => B(E)
    )
  }
  function ze(..._) {
    return be(
      (E) => Reflect.apply(rl, null, [E, ..._]),
      () => ko(..._),
      'number format',
      (E) => Reflect.apply(E.n, E, [..._]),
      () => qa,
      (E) => B(E)
    )
  }
  function Fe(_) {
    return _.map((E) => (B(E) || Ce(E) || ve(E) ? ol(String(E)) : E))
  }
  const A = { normalize: Fe, interpolate: (_) => _, type: 'vnode' }
  function z(..._) {
    return be(
      (E) => {
        let U
        const K = E
        try {
          ;(K.processor = A), (U = Reflect.apply(el, null, [K, ..._]))
        } finally {
          K.processor = null
        }
        return U
      },
      () => Mo(..._),
      'translate',
      (E) => E[zo](..._),
      (E) => [ol(E)],
      (E) => Ae(E)
    )
  }
  function k(..._) {
    return be(
      (E) => Reflect.apply(rl, null, [E, ..._]),
      () => ko(..._),
      'number format',
      (E) => E[Vo](..._),
      al,
      (E) => B(E) || Ae(E)
    )
  }
  function W(..._) {
    return be(
      (E) => Reflect.apply(tl, null, [E, ..._]),
      () => xo(..._),
      'datetime format',
      (E) => E[Fo](..._),
      al,
      (E) => B(E) || Ae(E)
    )
  }
  function ne(_) {
    ;(j = _), (P.pluralRules = j)
  }
  function de(_, E) {
    return be(
      () => {
        if (!_) return !1
        const U = B(E) ? E : a.value,
          K = g(U),
          ie = P.messageResolver(K, _)
        return Mn(ie) || et(ie) || B(ie)
      },
      () => [_],
      'translate exists',
      (U) => Reflect.apply(U.te, U, [_, E]),
      I_,
      (U) => ve(U)
    )
  }
  function d(_) {
    let E = null
    const U = _u(P, u.value, a.value)
    for (let K = 0; K < U.length; K++) {
      const ie = c.value[U[K]] || {},
        _e = P.messageResolver(ie, _)
      if (_e != null) {
        E = _e
        break
      }
    }
    return E
  }
  function m(_) {
    const E = d(_)
    return E ?? (n ? n.tm(_) || {} : {})
  }
  function g(_) {
    return c.value[_] || {}
  }
  function O(_, E) {
    if (o) {
      const U = { [_]: E }
      for (const K in U) ls(U, K) && Er(U[K])
      E = U[_]
    }
    ;(c.value[_] = E), (P.messages = c.value)
  }
  function T(_, E) {
    c.value[_] = c.value[_] || {}
    const U = { [_]: E }
    for (const K in U) ls(U, K) && Er(U[K])
    ;(E = U[_]), Gr(E, c.value[_]), (P.messages = c.value)
  }
  function $(_) {
    return f.value[_] || {}
  }
  function F(_, E) {
    ;(f.value[_] = E), (P.datetimeFormats = f.value), nl(P, _, E)
  }
  function R(_, E) {
    ;(f.value[_] = xe(f.value[_] || {}, E)), (P.datetimeFormats = f.value), nl(P, _, E)
  }
  function M(_) {
    return h.value[_] || {}
  }
  function L(_, E) {
    ;(h.value[_] = E), (P.numberFormats = h.value), sl(P, _, E)
  }
  function H(_, E) {
    ;(h.value[_] = xe(h.value[_] || {}, E)), (P.numberFormats = h.value), sl(P, _, E)
  }
  ll++,
    n &&
      is &&
      (cn(n.locale, (_) => {
        l && ((a.value = _), (P.locale = _), Zn(P, a.value, u.value))
      }),
      cn(n.fallbackLocale, (_) => {
        l && ((u.value = _), (P.fallbackLocale = _), Zn(P, a.value, u.value))
      }))
  const V = {
    id: ll,
    locale: Z,
    fallbackLocale: le,
    get inheritLocale() {
      return l
    },
    set inheritLocale(_) {
      ;(l = _),
        _ &&
          n &&
          ((a.value = n.locale.value), (u.value = n.fallbackLocale.value), Zn(P, a.value, u.value))
    },
    get availableLocales() {
      return Object.keys(c.value).sort()
    },
    messages: ce,
    get modifiers() {
      return C
    },
    get pluralRules() {
      return j || {}
    },
    get isGlobal() {
      return s
    },
    get missingWarn() {
      return p
    },
    set missingWarn(_) {
      ;(p = _), (P.missingWarn = p)
    },
    get fallbackWarn() {
      return v
    },
    set fallbackWarn(_) {
      ;(v = _), (P.fallbackWarn = v)
    },
    get fallbackRoot() {
      return b
    },
    set fallbackRoot(_) {
      b = _
    },
    get fallbackFormat() {
      return N
    },
    set fallbackFormat(_) {
      ;(N = _), (P.fallbackFormat = N)
    },
    get warnHtmlMessage() {
      return w
    },
    set warnHtmlMessage(_) {
      ;(w = _), (P.warnHtmlMessage = _)
    },
    get escapeParameter() {
      return x
    },
    set escapeParameter(_) {
      ;(x = _), (P.escapeParameter = _)
    },
    t: Ne,
    getLocaleMessage: g,
    setLocaleMessage: O,
    mergeLocaleMessage: T,
    getPostTranslationHandler: re,
    setPostTranslationHandler: Q,
    getMissingHandler: ee,
    setMissingHandler: Te,
    [N_]: ne
  }
  return (
    (V.datetimeFormats = ke),
    (V.numberFormats = $e),
    (V.rt = ge),
    (V.te = de),
    (V.tm = m),
    (V.d = Ge),
    (V.n = ze),
    (V.getDateTimeFormat = $),
    (V.setDateTimeFormat = F),
    (V.mergeDateTimeFormat = R),
    (V.getNumberFormat = M),
    (V.setNumberFormat = L),
    (V.mergeNumberFormat = H),
    (V[S_] = r),
    (V[zo] = z),
    (V[Fo] = W),
    (V[Vo] = k),
    V
  )
}
const Ci = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: { type: String, validator: (e) => e === 'parent' || e === 'global', default: 'parent' },
  i18n: { type: Object }
}
function P_({ slots: e }, t) {
  return t.length === 1 && t[0] === 'default'
    ? (e.default ? e.default() : []).reduce(
        (r, s) => [...r, ...(s.type === Xe ? s.children : [s])],
        []
      )
    : t.reduce((n, r) => {
        const s = e[r]
        return s && (n[r] = s()), n
      }, {})
}
function Iu(e) {
  return Xe
}
const D_ = It({
    name: 'i18n-t',
    props: xe(
      {
        keypath: { type: String, required: !0 },
        plural: { type: [Number, String], validator: (e) => Ce(e) || !isNaN(e) }
      },
      Ci
    ),
    setup(e, t) {
      const { slots: n, attrs: r } = t,
        s = e.i18n || Ds({ useScope: e.scope, __useComponent: !0 })
      return () => {
        const o = Object.keys(n).filter((f) => f !== '_'),
          i = {}
        e.locale && (i.locale = e.locale),
          e.plural !== void 0 && (i.plural = B(e.plural) ? +e.plural : e.plural)
        const l = P_(t, o),
          a = s[zo](e.keypath, l, i),
          u = xe({}, r),
          c = B(e.tag) || ue(e.tag) ? e.tag : Iu()
        return Ls(c, u, a)
      }
    }
  }),
  ul = D_
function $_(e) {
  return Ae(e) && !B(e[0])
}
function Ru(e, t, n, r) {
  const { slots: s, attrs: o } = t
  return () => {
    const i = { part: !0 }
    let l = {}
    e.locale && (i.locale = e.locale),
      B(e.format)
        ? (i.key = e.format)
        : ue(e.format) &&
          (B(e.format.key) && (i.key = e.format.key),
          (l = Object.keys(e.format).reduce(
            (h, p) => (n.includes(p) ? xe({}, h, { [p]: e.format[p] }) : h),
            {}
          )))
    const a = r(e.value, i, l)
    let u = [i.key]
    Ae(a)
      ? (u = a.map((h, p) => {
          const v = s[h.type],
            b = v ? v({ [h.type]: h.value, index: p, parts: a }) : [h.value]
          return $_(b) && (b[0].key = `${h.type}-${p}`), b
        }))
      : B(a) && (u = [a])
    const c = xe({}, o),
      f = B(e.tag) || ue(e.tag) ? e.tag : Iu()
    return Ls(f, c, u)
  }
}
const M_ = It({
    name: 'i18n-n',
    props: xe({ value: { type: Number, required: !0 }, format: { type: [String, Object] } }, Ci),
    setup(e, t) {
      const n = e.i18n || Ds({ useScope: 'parent', __useComponent: !0 })
      return Ru(e, t, Ou, (...r) => n[Vo](...r))
    }
  }),
  fl = M_,
  x_ = It({
    name: 'i18n-d',
    props: xe(
      { value: { type: [Number, Date], required: !0 }, format: { type: [String, Object] } },
      Ci
    ),
    setup(e, t) {
      const n = e.i18n || Ds({ useScope: 'parent', __useComponent: !0 })
      return Ru(e, t, Au, (...r) => n[Fo](...r))
    }
  }),
  dl = x_
function k_(e, t) {
  const n = e
  if (e.mode === 'composition') return n.__getInstance(t) || e.global
  {
    const r = n.__getInstance(t)
    return r != null ? r.__composer : e.global.__composer
  }
}
function z_(e) {
  const t = (i) => {
    const { instance: l, modifiers: a, value: u } = i
    if (!l || !l.$) throw dt(rt.UNEXPECTED_ERROR)
    const c = k_(e, l.$),
      f = hl(u)
    return [Reflect.apply(c.t, c, [...ml(f)]), c]
  }
  return {
    created: (i, l) => {
      const [a, u] = t(l)
      is &&
        e.global === u &&
        (i.__i18nWatcher = cn(u.locale, () => {
          l.instance && l.instance.$forceUpdate()
        })),
        (i.__composer = u),
        (i.textContent = a)
    },
    unmounted: (i) => {
      is &&
        i.__i18nWatcher &&
        (i.__i18nWatcher(), (i.__i18nWatcher = void 0), delete i.__i18nWatcher),
        i.__composer && ((i.__composer = void 0), delete i.__composer)
    },
    beforeUpdate: (i, { value: l }) => {
      if (i.__composer) {
        const a = i.__composer,
          u = hl(l)
        i.textContent = Reflect.apply(a.t, a, [...ml(u)])
      }
    },
    getSSRProps: (i) => {
      const [l] = t(i)
      return { textContent: l }
    }
  }
}
function hl(e) {
  if (B(e)) return { path: e }
  if (se(e)) {
    if (!('path' in e)) throw dt(rt.REQUIRED_VALUE, 'path')
    return e
  } else throw dt(rt.INVALID_VALUE)
}
function ml(e) {
  const { path: t, locale: n, args: r, choice: s, plural: o } = e,
    i = {},
    l = r || {}
  return B(n) && (i.locale = n), Ce(s) && (i.plural = s), Ce(o) && (i.plural = o), [t, l, i]
}
function F_(e, t, ...n) {
  const r = se(n[0]) ? n[0] : {},
    s = !!r.useI18nComponentName
  ;(ve(r.globalInstall) ? r.globalInstall : !0) &&
    ([s ? 'i18n' : ul.name, 'I18nT'].forEach((i) => e.component(i, ul)),
    [fl.name, 'I18nN'].forEach((i) => e.component(i, fl)),
    [dl.name, 'I18nD'].forEach((i) => e.component(i, dl))),
    e.directive('t', z_(t))
}
const V_ = Gt('global-vue-i18n')
function H_(e = {}, t) {
  const n = ve(e.globalInjection) ? e.globalInjection : !0,
    r = !0,
    s = new Map(),
    [o, i] = U_(e),
    l = Gt('')
  function a(f) {
    return s.get(f) || null
  }
  function u(f, h) {
    s.set(f, h)
  }
  function c(f) {
    s.delete(f)
  }
  {
    const f = {
      get mode() {
        return 'composition'
      },
      get allowComposition() {
        return r
      },
      async install(h, ...p) {
        if (((h.__VUE_I18N_SYMBOL__ = l), h.provide(h.__VUE_I18N_SYMBOL__, f), se(p[0]))) {
          const N = p[0]
          ;(f.__composerExtend = N.__composerExtend), (f.__vueI18nExtend = N.__vueI18nExtend)
        }
        let v = null
        n && (v = X_(h, f.global)), F_(h, f, ...p)
        const b = h.unmount
        h.unmount = () => {
          v && v(), f.dispose(), b()
        }
      },
      get global() {
        return i
      },
      dispose() {
        o.stop()
      },
      __instances: s,
      __getInstance: a,
      __setInstance: u,
      __deleteInstance: c
    }
    return f
  }
}
function Ds(e = {}) {
  const t = gi()
  if (t == null) throw dt(rt.MUST_BE_CALL_SETUP_TOP)
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw dt(rt.NOT_INSTALLED)
  const n = W_(t),
    r = B_(n),
    s = Su(t),
    o = j_(e, s)
  if (o === 'global') return L_(r, e, s), r
  if (o === 'parent') {
    let a = K_(n, t, e.__useComponent)
    return a == null && (a = r), a
  }
  const i = n
  let l = i.__getInstance(t)
  if (l == null) {
    const a = xe({}, e)
    '__i18n' in s && (a.__i18n = s.__i18n),
      r && (a.__root = r),
      (l = Lu(a)),
      i.__composerExtend && (l[Ho] = i.__composerExtend(l)),
      G_(i, t, l),
      i.__setInstance(t, l)
  }
  return l
}
function U_(e, t, n) {
  const r = ac()
  {
    const s = r.run(() => Lu(e))
    if (s == null) throw dt(rt.UNEXPECTED_ERROR)
    return [r, s]
  }
}
function W_(e) {
  {
    const t = vt(e.isCE ? V_ : e.appContext.app.__VUE_I18N_SYMBOL__)
    if (!t) throw dt(e.isCE ? rt.NOT_INSTALLED_WITH_PROVIDE : rt.UNEXPECTED_ERROR)
    return t
  }
}
function j_(e, t) {
  return Rs(e) ? ('__i18n' in t ? 'local' : 'global') : e.useScope ? e.useScope : 'local'
}
function B_(e) {
  return e.mode === 'composition' ? e.global : e.global.__composer
}
function K_(e, t, n = !1) {
  let r = null
  const s = t.root
  let o = Y_(t, n)
  for (; o != null; ) {
    const i = e
    if ((e.mode === 'composition' && (r = i.__getInstance(o)), r != null || s === o)) break
    o = o.parent
  }
  return r
}
function Y_(e, t = !1) {
  return e == null ? null : (t && e.vnode.ctx) || e.parent
}
function G_(e, t, n) {
  Fc(() => {}, t),
    di(() => {
      const r = n
      e.__deleteInstance(t)
      const s = r[Ho]
      s && (s(), delete r[Ho])
    }, t)
}
const q_ = ['locale', 'fallbackLocale', 'availableLocales'],
  pl = ['t', 'rt', 'd', 'n', 'tm', 'te']
function X_(e, t) {
  const n = Object.create(null)
  return (
    q_.forEach((s) => {
      const o = Object.getOwnPropertyDescriptor(t, s)
      if (!o) throw dt(rt.UNEXPECTED_ERROR)
      const i = De(o.value)
        ? {
            get() {
              return o.value.value
            },
            set(l) {
              o.value.value = l
            }
          }
        : {
            get() {
              return o.get && o.get()
            }
          }
      Object.defineProperty(n, s, i)
    }),
    (e.config.globalProperties.$i18n = n),
    pl.forEach((s) => {
      const o = Object.getOwnPropertyDescriptor(t, s)
      if (!o || !o.value) throw dt(rt.UNEXPECTED_ERROR)
      Object.defineProperty(e.config.globalProperties, `$${s}`, o)
    }),
    () => {
      delete e.config.globalProperties.$i18n,
        pl.forEach((s) => {
          delete e.config.globalProperties[`$${s}`]
        })
    }
  )
}
C_()
p_(qp)
__(_u)
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Ti()
  ;(e.__INTLIFY__ = !0), s_(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
}
const Q_ = (e, t) => {
  const n = e[t]
  return n
    ? typeof n == 'function'
      ? n()
      : Promise.resolve(n)
    : new Promise((r, s) => {
        ;(typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
          s.bind(null, new Error('Unknown variable dynamic import: ' + t))
        )
      })
}
function J_(e, t) {
  if (e === 0) return 0
  const n = e > 10 && e < 20,
    r = e % 10 === 1
  return !n && r ? 1 : (!n && e % 10 >= 2 && e % 10 <= 4) || t < 4 ? 2 : 3
}
const Z_ = { ru: J_ },
  eg = {
    en: { currencyFormat: { style: 'currency', currency: 'USD' } },
    pt: { currencyFormat: { style: 'currency', currency: 'BRL' } }
  },
  Pu = {
    locale: {
      en: (e) => {
        const { normalize: t } = e
        return t(['English'])
      },
      pt: (e) => {
        const { normalize: t } = e
        return t(['Portuguese'])
      }
    },
    nav: {
      home: (e) => {
        const { normalize: t } = e
        return t(['Home'])
      },
      about: (e) => {
        const { normalize: t } = e
        return t(['About'])
      },
      'simple-form': (e) => {
        const { normalize: t } = e
        return t(['Simple Form'])
      },
      modals: (e) => {
        const { normalize: t } = e
        return t(['Modals'])
      },
      search: (e) => {
        const { normalize: t } = e
        return t(['Search'])
      }
    },
    about: {
      header: (e) => {
        const { normalize: t } = e
        return t(['About us'])
      },
      donations: (e) => {
        const { normalize: t, interpolate: n, named: r } = e
        return t(['Donations raised: ', n(r('donations'))])
      }
    },
    modals: {
      card1: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Simple Modal'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Here you will see a simple modal'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Open Modal'])
        }
      },
      card2: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Form Modal'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t([
            'Here you will see a Form Modal, enter a value it returns and will be displayed here =>'
          ])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Open Modal'])
        }
      }
    },
    home: {
      description: {
        p1: (e) => {
          const { normalize: t } = e
          return t([
            'This project is intended for study and improvement in Vue3 and front-end skills.'
          ])
        },
        p2: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t([
            'The project uses Vue 3 with Vite, Bootstrap ',
            n(r('bootstrap')),
            ' and TypeScript.'
          ])
        },
        p3: (e) => {
          const { normalize: t } = e
          return t(['Used Pinia to access store.'])
        },
        p4: (e) => {
          const { normalize: t } = e
          return t(['Used vitest for unit testing'])
        }
      },
      card1: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Simple Form'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Here you will see a simple form that uses vee-validate and yup.'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Go Simple Form'])
        }
      },
      card2: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Modals'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Here you will see a Modals exemple.'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Go Modals'])
        }
      },
      card3: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Tip Caculator'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t([
            'Here you will see a Tip Calculator. Enter the bill amount, number of people, choose a percentage.'
          ])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Go Tip Caculator'])
        }
      }
    },
    simpleForm: {
      title: (e) => {
        const { normalize: t } = e
        return t(['Learn to code by watching others'])
      },
      description: (e) => {
        const { normalize: t } = e
        return t([
          'See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.'
        ])
      },
      button: {
        submit: (e) => {
          const { normalize: t } = e
          return t(['Submit'])
        }
      },
      fields: {
        label: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Full Name'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['E-mail'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Password'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Confirm Password'])
          }
        },
        placeholder: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Your Name'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['Your email adress'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Your password'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Type it again'])
          }
        },
        successMessage: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Nice to meet you!'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(["Got it, we won't spam you!"])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Nice and secure!'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Glad you remembered it!'])
          }
        },
        errorMessage: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Name is a required field'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['Email is a required field'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Password is a required field'])
          },
          passwordMin: (e) => {
            const { normalize: t, interpolate: n, named: r } = e
            return t(['password must be at least ', n(r('min')), ' characters'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Confirm Password'])
          },
          passwordNotMatch: (e) => {
            const { normalize: t } = e
            return t(['Passwords do not match'])
          }
        }
      }
    },
    validation: {
      mixed: {
        default: (e) => {
          const { normalize: t } = e
          return t(['is invalid'])
        },
        required: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t([n(r('field')), ' is a required field'])
        },
        oneOf: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be one of the following values: ', n(r('values'))])
        },
        notOneOf: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['cannot be one of the following values: ', n(r('values'))])
        }
      },
      string: {
        length: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must have exactly ', n(r('length')), ' characters'])
        },
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must have at least ', n(r('min')), ' characters hehe'])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must have at most ', n(r('max')), ' characters'])
        },
        email: (e) => {
          const { normalize: t } = e
          return t(['has the invalid e-mail format'])
        },
        url: (e) => {
          const { normalize: t } = e
          return t(['must have a valid URL format'])
        },
        trim: (e) => {
          const { normalize: t } = e
          return t(['must not contain spaces at the beginning or end.'])
        },
        lowercase: (e) => {
          const { normalize: t } = e
          return t(['must be capitalized'])
        },
        uppercase: (e) => {
          const { normalize: t } = e
          return t(['must be in lowercase'])
        }
      },
      number: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be at least ', n(r('min'))])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['should be at most ', n(r('max'))])
        },
        lessThan: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be smaller than ', n(r('less'))])
        },
        moreThan: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be greater than ', n(r('more'))])
        },
        positive: (e) => {
          const { normalize: t } = e
          return t(['must be a positive number'])
        },
        negative: (e) => {
          const { normalize: t } = e
          return t(['must be a negative number'])
        },
        integer: (e) => {
          const { normalize: t } = e
          return t(['must be an integer'])
        }
      },
      date: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be greater than the date ', n(r('min'))])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must be less than the date ', n(r('max'))])
        }
      },
      array: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['must have at least ', n(r('min')), ' items'])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['should be at most ', n(r('max')), ' items'])
        }
      }
    }
  },
  tg = Object.freeze(
    Object.defineProperty({ __proto__: null, default: Pu }, Symbol.toStringTag, { value: 'Module' })
  ),
  Du = {
    locale: {
      en: (e) => {
        const { normalize: t } = e
        return t(['Inglês'])
      },
      pt: (e) => {
        const { normalize: t } = e
        return t(['Português'])
      }
    },
    nav: {
      home: (e) => {
        const { normalize: t } = e
        return t(['Home'])
      },
      about: (e) => {
        const { normalize: t } = e
        return t(['Sobre'])
      },
      'simple-form': (e) => {
        const { normalize: t } = e
        return t(['Formulário Simples'])
      },
      modals: (e) => {
        const { normalize: t } = e
        return t(['Modais'])
      },
      search: (e) => {
        const { normalize: t } = e
        return t(['Buscar'])
      }
    },
    about: {
      header: (e) => {
        const { normalize: t } = e
        return t(['Sobre nós'])
      },
      donations: (e) => {
        const { normalize: t, interpolate: n, named: r } = e
        return t(['Doações arrecadadas: ', n(r('donations'))])
      }
    },
    modals: {
      card1: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Modal Simples'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Aqui você verá um modal simples'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Abrir Modal'])
        }
      },
      card2: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Modal Formulário'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t([
            'Aqui voce vera um modal com formulário, digite um valor ele retorna e sera exibido aqui =>'
          ])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Abrir Modal'])
        }
      }
    },
    home: {
      description: {
        p1: (e) => {
          const { normalize: t } = e
          return t([
            'Este projeto é destinado ao estudo e aperfeiçoamento em Vue3 e front-end skills.'
          ])
        },
        p2: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t([
            'O projeto usa Vue 3 com Vite, Bootstrap ',
            n(r('bootstrap')),
            ' e TypeScript.'
          ])
        },
        p3: (e) => {
          const { normalize: t } = e
          return t(['Usado Pinia para acessar o store.'])
        },
        p4: (e) => {
          const { normalize: t } = e
          return t(['Usado vitest para testes unitários'])
        }
      },
      card1: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Formulário Simples'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Aqui você verá um formulário simples que usa vee-validate e yup.'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Ir Formulário Simple'])
        }
      },
      card2: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Modais'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t(['Aqui você verá exemplos de modais.'])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Ir Modais'])
        }
      },
      card3: {
        title: (e) => {
          const { normalize: t } = e
          return t(['Calculadora de gorjeta'])
        },
        description: (e) => {
          const { normalize: t } = e
          return t([
            'Aqui você verá um Calculadora de gorjetas. Insira o valor da conta, numero de pessoas, escolha uma porcentagem.'
          ])
        },
        button: (e) => {
          const { normalize: t } = e
          return t(['Ir Calculadora de gorjeta'])
        }
      }
    },
    simpleForm: {
      title: (e) => {
        const { normalize: t } = e
        return t(['Aprenda a codificar observando os outros'])
      },
      description: (e) => {
        const { normalize: t } = e
        return t([
          'Veja como desenvolvedores experientes resolvem problemas em tempo real. Assistir a tutoriais com script é ótimo, mas entender como os desenvolvedores pensam é inestimável.'
        ])
      },
      button: {
        submit: (e) => {
          const { normalize: t } = e
          return t(['Enviar'])
        }
      },
      fields: {
        label: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Nome Completo'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['E-mail'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Senha'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Confirmar Senha'])
          }
        },
        placeholder: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Seu Nome'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['Seu email'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Sua senha'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Digite novamente'])
          }
        },
        successMessage: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Prazer em conhecê-lo!'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['Entendi, não enviaremos spam!'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Agradável e seguro!'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Que bom que você lembrou!'])
          }
        },
        errorMessage: {
          name: (e) => {
            const { normalize: t } = e
            return t(['Nome é um campo obrigatório'])
          },
          email: (e) => {
            const { normalize: t } = e
            return t(['Email é um campo obrigatório'])
          },
          password: (e) => {
            const { normalize: t } = e
            return t(['Senha é um campo obrigatório'])
          },
          passwordMin: (e) => {
            const { normalize: t, interpolate: n, named: r } = e
            return t(['Senha deve ter pelo menos ', n(r('min')), ' caracteres'])
          },
          confirmPassword: (e) => {
            const { normalize: t } = e
            return t(['Confirmar Senha'])
          },
          passwordNotMatch: (e) => {
            const { normalize: t } = e
            return t(['As senhas não coincidem'])
          }
        }
      }
    },
    validation: {
      mixed: {
        default: (e) => {
          const { normalize: t } = e
          return t(['é inválido'])
        },
        required: (e) => {
          const { normalize: t } = e
          return t(['é um campo obrigatório'])
        },
        oneOf: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser um dos seguintes valores: ', n(r('values'))])
        },
        notOneOf: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['não pode ser um dos seguintes valores: ', n(r('values'))])
        }
      },
      string: {
        length: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ter exatamente ', n(r('length')), ' caracteres'])
        },
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ter pelo menos ', n(r('min')), ' caracteres hehe'])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ter no máximo ', n(r('max')), ' caracteres'])
        },
        email: (e) => {
          const { normalize: t } = e
          return t(['tem o formato de e-mail inválido'])
        },
        url: (e) => {
          const { normalize: t } = e
          return t(['deve ter um formato de URL válida'])
        },
        trim: (e) => {
          const { normalize: t } = e
          return t(['não deve conter espaços no início ou no fim.'])
        },
        lowercase: (e) => {
          const { normalize: t } = e
          return t(['deve estar em maiúsculo'])
        },
        uppercase: (e) => {
          const { normalize: t } = e
          return t(['deve estar em minúsculo'])
        }
      },
      number: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser no mínimo ', n(r('min'))])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser no máximo ', n(r('max'))])
        },
        lessThan: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser menor que ', n(r('less'))])
        },
        moreThan: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser maior que ', n(r('more'))])
        },
        positive: (e) => {
          const { normalize: t } = e
          return t(['deve ser um número posítivo'])
        },
        negative: (e) => {
          const { normalize: t } = e
          return t(['deve ser um número negativo'])
        },
        integer: (e) => {
          const { normalize: t } = e
          return t(['deve ser um número inteiro'])
        }
      },
      date: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser maior que a data ', n(r('min'))])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ser menor que a data ', n(r('max'))])
        }
      },
      array: {
        min: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ter no mínimo ', n(r('min')), ' itens'])
        },
        max: (e) => {
          const { normalize: t, interpolate: n, named: r } = e
          return t(['deve ter no máximo ', n(r('max')), ' itens'])
        }
      }
    }
  },
  ng = Object.freeze(
    Object.defineProperty({ __proto__: null, default: Du }, Symbol.toStringTag, { value: 'Module' })
  ),
  rr = H_({
    locale: 'en',
    fallbackLocale: 'pt',
    legacy: !1,
    globalInjection: !0,
    messages: { en: Pu, pt: Du },
    pluralRules: Z_,
    numberFormats: eg
  }),
  us = {
    get defaultLocale() {
      return 'en'
    },
    get supportedLocales() {
      return 'en,pt'.split(',')
    },
    get currentLocale() {
      return rr.global.locale.value
    },
    set currentLocale(e) {
      rr.global.locale.value = e
    },
    async switchLanguage(e) {
      var t
      await us.loadLocaleMessages(e),
        (us.currentLocale = e),
        (t = document.querySelector('html')) == null || t.setAttribute('lang', e),
        localStorage.setItem('user-locale', e)
    },
    async loadLocaleMessages(e) {
      if (!rr.global.availableLocales.includes(e)) {
        const t = await Q_(
          Object.assign({
            './locales/en.json': () => cr(() => Promise.resolve().then(() => tg), void 0),
            './locales/pt-br.json': () => cr(() => Promise.resolve().then(() => ng), void 0)
          }),
          `./locales/${e}.json`
        )
        rr.global.setLocaleMessage(e, t.default)
      }
      return ci()
    }
  },
  rg = ['value', 'selected', 'id'],
  sg = It({
    __name: 'LanguageSwitcher',
    setup(e, { expose: t }) {
      const { t: n, locale: r } = Ds(),
        s = us.supportedLocales,
        o = async (i) => {
          const l = i.target.value
          await us.switchLanguage(l)
        }
      return (
        t({ switchLanguage: o }),
        (i, l) => (
          un(),
          In(
            'select',
            {
              id: 'select-language',
              class: 'form-select form-select-sm',
              onChange: l[0] || (l[0] = (a) => o(a))
            },
            [
              (un(!0),
              In(
                Xe,
                null,
                qd(
                  ct(s),
                  (a) => (
                    un(),
                    In(
                      'option',
                      { key: `locale-${a}`, value: a, selected: ct(r) === a, id: a },
                      we(ct(n)(`locale.${a}`)),
                      9,
                      rg
                    )
                  )
                ),
                128
              ))
            ],
            32
          )
        )
      )
    }
  }),
  og = (e) => (Pc('data-v-695fc750'), (e = e()), Dc(), e),
  ig = { class: 'navbar navbar-dark navbar-expand-lg' },
  ag = { class: 'container-fluid' },
  lg = og(() => G('span', { class: 'navbar-toggler-icon' }, null, -1)),
  cg = [lg],
  ug = { class: 'navbar-nav me-auto mb-2 mb-lg-0' },
  fg = { class: 'nav-item' },
  dg = { class: 'nav-item' },
  hg = { class: 'nav-item' },
  mg = { class: 'nav-item' },
  pg = { class: 'nav-item' },
  _g = { class: 'd-flex' },
  gg = ['placeholder'],
  Eg = { id: 'btn-search-nav-bar', class: 'btn btn-outline-success' },
  vg = It({
    __name: 'NavBar',
    setup(e, { expose: t }) {
      const n = br({ showNavBar: !1 })
      function r(i) {
        yi.push({ name: i })
      }
      function s() {
        n.showNavBar = !n.showNavBar
      }
      const o = Ie(() => (n.showNavBar ? '' : 'collapse'))
      return (
        t({ clickNavBar: s, goTo: r }),
        (i, l) => (
          un(),
          In('div', null, [
            G('nav', ig, [
              G('div', ag, [
                G(
                  'button',
                  {
                    id: 'navbarToggler',
                    class: 'navbar-toggler',
                    type: 'button',
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#navbarTogglerDemo01',
                    'aria-controls': 'navbarTogglerDemo01',
                    'aria-expanded': 'false',
                    'aria-label': 'Toggle navigation',
                    onClick: l[0] || (l[0] = (a) => s())
                  },
                  cg
                ),
                G(
                  'div',
                  {
                    class: vs(['navbar-collapse', o.value]),
                    id: 'navbarTogglerCollapse',
                    style: {}
                  },
                  [
                    G('ul', ug, [
                      G('li', fg, [
                        G(
                          'a',
                          {
                            class: 'nav-link',
                            'aria-current': 'page',
                            id: 'homeNavLink',
                            onClick: l[1] || (l[1] = (a) => r('Home'))
                          },
                          we(i.$t('nav.home')),
                          1
                        )
                      ]),
                      G('li', dg, [
                        G(
                          'a',
                          {
                            class: 'nav-link',
                            id: 'simpleFormNavLink',
                            onClick: l[2] || (l[2] = (a) => r('SimpleForm'))
                          },
                          we(i.$t('nav.simple-form')),
                          1
                        )
                      ]),
                      G('li', hg, [
                        G(
                          'a',
                          {
                            class: 'nav-link',
                            id: 'modalsNavLink',
                            onClick: l[3] || (l[3] = (a) => r('Modals'))
                          },
                          we(i.$t('nav.modals')),
                          1
                        )
                      ]),
                      G('li', mg, [
                        G(
                          'a',
                          {
                            class: 'nav-link',
                            id: 'tipCalculatorNavLink',
                            onClick: l[4] || (l[4] = (a) => r('TipCalculator'))
                          },
                          'Tip Calculator'
                        )
                      ]),
                      G('li', pg, [Re(sg, { id: 'languageSwitcher' })])
                    ]),
                    G('div', _g, [
                      G(
                        'input',
                        {
                          id: 'input-search-nav-bar',
                          class: 'form-control me-2',
                          type: 'search',
                          placeholder: i.$t('nav.search'),
                          'aria-label': 'Search'
                        },
                        null,
                        8,
                        gg
                      ),
                      G('button', Eg, we(i.$t('nav.search')), 1)
                    ])
                  ],
                  2
                )
              ])
            ])
          ])
        )
      )
    }
  }),
  bg = fu(vg, [['__scopeId', 'data-v-695fc750']]),
  yg = It({
    __name: 'App',
    setup(e) {
      return (t, n) => (
        un(), In(Xe, null, [Re(bg, { class: 'myHeader' }), Re(ct(uu), { class: 'myContent' })], 64)
      )
    }
  })
var Tg = !1
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Ag = Symbol()
var _l
;(function (e) {
  ;(e.direct = 'direct'), (e.patchObject = 'patch object'), (e.patchFunction = 'patch function')
})(_l || (_l = {}))
function Og() {
  const e = ac(!0),
    t = e.run(() => ys({}))
  let n = [],
    r = []
  const s = ii({
    install(o) {
      ;(s._a = o),
        o.provide(Ag, s),
        (o.config.globalProperties.$pinia = s),
        r.forEach((i) => n.push(i)),
        (r = [])
    },
    use(o) {
      return !this._a && !Tg ? r.push(o) : n.push(o), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t
  })
  return s
}
var Ue = 'top',
  Qe = 'bottom',
  Je = 'right',
  We = 'left',
  $s = 'auto',
  Bn = [Ue, Qe, Je, We],
  hn = 'start',
  xn = 'end',
  $u = 'clippingParents',
  Ni = 'viewport',
  Tn = 'popper',
  Mu = 'reference',
  Uo = Bn.reduce(function (e, t) {
    return e.concat([t + '-' + hn, t + '-' + xn])
  }, []),
  Si = [].concat(Bn, [$s]).reduce(function (e, t) {
    return e.concat([t, t + '-' + hn, t + '-' + xn])
  }, []),
  xu = 'beforeRead',
  ku = 'read',
  zu = 'afterRead',
  Fu = 'beforeMain',
  Vu = 'main',
  Hu = 'afterMain',
  Uu = 'beforeWrite',
  Wu = 'write',
  ju = 'afterWrite',
  Bu = [xu, ku, zu, Fu, Vu, Hu, Uu, Wu, ju]
function At(e) {
  return e ? (e.nodeName || '').toLowerCase() : null
}
function Ze(e) {
  if (e == null) return window
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument
    return (t && t.defaultView) || window
  }
  return e
}
function mn(e) {
  var t = Ze(e).Element
  return e instanceof t || e instanceof Element
}
function nt(e) {
  var t = Ze(e).HTMLElement
  return e instanceof t || e instanceof HTMLElement
}
function Li(e) {
  if (typeof ShadowRoot > 'u') return !1
  var t = Ze(e).ShadowRoot
  return e instanceof t || e instanceof ShadowRoot
}
function wg(e) {
  var t = e.state
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      s = t.attributes[n] || {},
      o = t.elements[n]
    !nt(o) ||
      !At(o) ||
      (Object.assign(o.style, r),
      Object.keys(s).forEach(function (i) {
        var l = s[i]
        l === !1 ? o.removeAttribute(i) : o.setAttribute(i, l === !0 ? '' : l)
      }))
  })
}
function Cg(e) {
  var t = e.state,
    n = {
      popper: { position: t.options.strategy, left: '0', top: '0', margin: '0' },
      arrow: { position: 'absolute' },
      reference: {}
    }
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var s = t.elements[r],
          o = t.attributes[r] || {},
          i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          l = i.reduce(function (a, u) {
            return (a[u] = ''), a
          }, {})
        !nt(s) ||
          !At(s) ||
          (Object.assign(s.style, l),
          Object.keys(o).forEach(function (a) {
            s.removeAttribute(a)
          }))
      })
    }
  )
}
const Ii = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: wg,
  effect: Cg,
  requires: ['computeStyles']
}
function bt(e) {
  return e.split('-')[0]
}
var fn = Math.max,
  fs = Math.min,
  kn = Math.round
function Wo() {
  var e = navigator.userAgentData
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version
        })
        .join(' ')
    : navigator.userAgent
}
function Ku() {
  return !/^((?!chrome|android).)*safari/i.test(Wo())
}
function zn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1)
  var r = e.getBoundingClientRect(),
    s = 1,
    o = 1
  t &&
    nt(e) &&
    ((s = (e.offsetWidth > 0 && kn(r.width) / e.offsetWidth) || 1),
    (o = (e.offsetHeight > 0 && kn(r.height) / e.offsetHeight) || 1))
  var i = mn(e) ? Ze(e) : window,
    l = i.visualViewport,
    a = !Ku() && n,
    u = (r.left + (a && l ? l.offsetLeft : 0)) / s,
    c = (r.top + (a && l ? l.offsetTop : 0)) / o,
    f = r.width / s,
    h = r.height / o
  return { width: f, height: h, top: c, right: u + f, bottom: c + h, left: u, x: u, y: c }
}
function Ri(e) {
  var t = zn(e),
    n = e.offsetWidth,
    r = e.offsetHeight
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  )
}
function Yu(e, t) {
  var n = t.getRootNode && t.getRootNode()
  if (e.contains(t)) return !0
  if (n && Li(n)) {
    var r = t
    do {
      if (r && e.isSameNode(r)) return !0
      r = r.parentNode || r.host
    } while (r)
  }
  return !1
}
function Lt(e) {
  return Ze(e).getComputedStyle(e)
}
function Ng(e) {
  return ['table', 'td', 'th'].indexOf(At(e)) >= 0
}
function Xt(e) {
  return ((mn(e) ? e.ownerDocument : e.document) || window.document).documentElement
}
function Ms(e) {
  return At(e) === 'html' ? e : e.assignedSlot || e.parentNode || (Li(e) ? e.host : null) || Xt(e)
}
function gl(e) {
  return !nt(e) || Lt(e).position === 'fixed' ? null : e.offsetParent
}
function Sg(e) {
  var t = /firefox/i.test(Wo()),
    n = /Trident/i.test(Wo())
  if (n && nt(e)) {
    var r = Lt(e)
    if (r.position === 'fixed') return null
  }
  var s = Ms(e)
  for (Li(s) && (s = s.host); nt(s) && ['html', 'body'].indexOf(At(s)) < 0; ) {
    var o = Lt(s)
    if (
      o.transform !== 'none' ||
      o.perspective !== 'none' ||
      o.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(o.willChange) !== -1 ||
      (t && o.willChange === 'filter') ||
      (t && o.filter && o.filter !== 'none')
    )
      return s
    s = s.parentNode
  }
  return null
}
function Ar(e) {
  for (var t = Ze(e), n = gl(e); n && Ng(n) && Lt(n).position === 'static'; ) n = gl(n)
  return n && (At(n) === 'html' || (At(n) === 'body' && Lt(n).position === 'static'))
    ? t
    : n || Sg(e) || t
}
function Pi(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y'
}
function ur(e, t, n) {
  return fn(e, fs(t, n))
}
function Lg(e, t, n) {
  var r = ur(e, t, n)
  return r > n ? n : r
}
function Gu() {
  return { top: 0, right: 0, bottom: 0, left: 0 }
}
function qu(e) {
  return Object.assign({}, Gu(), e)
}
function Xu(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n
  }, {})
}
var Ig = function (t, n) {
  return (
    (t = typeof t == 'function' ? t(Object.assign({}, n.rects, { placement: n.placement })) : t),
    qu(typeof t != 'number' ? t : Xu(t, Bn))
  )
}
function Rg(e) {
  var t,
    n = e.state,
    r = e.name,
    s = e.options,
    o = n.elements.arrow,
    i = n.modifiersData.popperOffsets,
    l = bt(n.placement),
    a = Pi(l),
    u = [We, Je].indexOf(l) >= 0,
    c = u ? 'height' : 'width'
  if (!(!o || !i)) {
    var f = Ig(s.padding, n),
      h = Ri(o),
      p = a === 'y' ? Ue : We,
      v = a === 'y' ? Qe : Je,
      b = n.rects.reference[c] + n.rects.reference[a] - i[a] - n.rects.popper[c],
      N = i[a] - n.rects.reference[a],
      y = Ar(o),
      I = y ? (a === 'y' ? y.clientHeight || 0 : y.clientWidth || 0) : 0,
      D = b / 2 - N / 2,
      w = f[p],
      x = I - h[c] - f[v],
      C = I / 2 - h[c] / 2 + D,
      j = ur(w, C, x),
      P = a
    n.modifiersData[r] = ((t = {}), (t[P] = j), (t.centerOffset = j - C), t)
  }
}
function Pg(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    s = r === void 0 ? '[data-popper-arrow]' : r
  s != null &&
    ((typeof s == 'string' && ((s = t.elements.popper.querySelector(s)), !s)) ||
      (Yu(t.elements.popper, s) && (t.elements.arrow = s)))
}
const Qu = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: Rg,
  effect: Pg,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
}
function Fn(e) {
  return e.split('-')[1]
}
var Dg = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }
function $g(e, t) {
  var n = e.x,
    r = e.y,
    s = t.devicePixelRatio || 1
  return { x: kn(n * s) / s || 0, y: kn(r * s) / s || 0 }
}
function El(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    s = e.placement,
    o = e.variation,
    i = e.offsets,
    l = e.position,
    a = e.gpuAcceleration,
    u = e.adaptive,
    c = e.roundOffsets,
    f = e.isFixed,
    h = i.x,
    p = h === void 0 ? 0 : h,
    v = i.y,
    b = v === void 0 ? 0 : v,
    N = typeof c == 'function' ? c({ x: p, y: b }) : { x: p, y: b }
  ;(p = N.x), (b = N.y)
  var y = i.hasOwnProperty('x'),
    I = i.hasOwnProperty('y'),
    D = We,
    w = Ue,
    x = window
  if (u) {
    var C = Ar(n),
      j = 'clientHeight',
      P = 'clientWidth'
    if (
      (C === Ze(n) &&
        ((C = Xt(n)),
        Lt(C).position !== 'static' &&
          l === 'absolute' &&
          ((j = 'scrollHeight'), (P = 'scrollWidth'))),
      (C = C),
      s === Ue || ((s === We || s === Je) && o === xn))
    ) {
      w = Qe
      var te = f && C === x && x.visualViewport ? x.visualViewport.height : C[j]
      ;(b -= te - r.height), (b *= a ? 1 : -1)
    }
    if (s === We || ((s === Ue || s === Qe) && o === xn)) {
      D = Je
      var J = f && C === x && x.visualViewport ? x.visualViewport.width : C[P]
      ;(p -= J - r.width), (p *= a ? 1 : -1)
    }
  }
  var Z = Object.assign({ position: l }, u && Dg),
    le = c === !0 ? $g({ x: p, y: b }, Ze(n)) : { x: p, y: b }
  if (((p = le.x), (b = le.y), a)) {
    var ce
    return Object.assign(
      {},
      Z,
      ((ce = {}),
      (ce[w] = I ? '0' : ''),
      (ce[D] = y ? '0' : ''),
      (ce.transform =
        (x.devicePixelRatio || 1) <= 1
          ? 'translate(' + p + 'px, ' + b + 'px)'
          : 'translate3d(' + p + 'px, ' + b + 'px, 0)'),
      ce)
    )
  }
  return Object.assign(
    {},
    Z,
    ((t = {}), (t[w] = I ? b + 'px' : ''), (t[D] = y ? p + 'px' : ''), (t.transform = ''), t)
  )
}
function Mg(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    s = r === void 0 ? !0 : r,
    o = n.adaptive,
    i = o === void 0 ? !0 : o,
    l = n.roundOffsets,
    a = l === void 0 ? !0 : l,
    u = {
      placement: bt(t.placement),
      variation: Fn(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: s,
      isFixed: t.options.strategy === 'fixed'
    }
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      El(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: i,
          roundOffsets: a
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        El(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: a
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-placement': t.placement
    }))
}
const Di = { name: 'computeStyles', enabled: !0, phase: 'beforeWrite', fn: Mg, data: {} }
var xr = { passive: !0 }
function xg(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    s = r.scroll,
    o = s === void 0 ? !0 : s,
    i = r.resize,
    l = i === void 0 ? !0 : i,
    a = Ze(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper)
  return (
    o &&
      u.forEach(function (c) {
        c.addEventListener('scroll', n.update, xr)
      }),
    l && a.addEventListener('resize', n.update, xr),
    function () {
      o &&
        u.forEach(function (c) {
          c.removeEventListener('scroll', n.update, xr)
        }),
        l && a.removeEventListener('resize', n.update, xr)
    }
  )
}
const $i = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: xg,
  data: {}
}
var kg = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function qr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return kg[t]
  })
}
var zg = { start: 'end', end: 'start' }
function vl(e) {
  return e.replace(/start|end/g, function (t) {
    return zg[t]
  })
}
function Mi(e) {
  var t = Ze(e),
    n = t.pageXOffset,
    r = t.pageYOffset
  return { scrollLeft: n, scrollTop: r }
}
function xi(e) {
  return zn(Xt(e)).left + Mi(e).scrollLeft
}
function Fg(e, t) {
  var n = Ze(e),
    r = Xt(e),
    s = n.visualViewport,
    o = r.clientWidth,
    i = r.clientHeight,
    l = 0,
    a = 0
  if (s) {
    ;(o = s.width), (i = s.height)
    var u = Ku()
    ;(u || (!u && t === 'fixed')) && ((l = s.offsetLeft), (a = s.offsetTop))
  }
  return { width: o, height: i, x: l + xi(e), y: a }
}
function Vg(e) {
  var t,
    n = Xt(e),
    r = Mi(e),
    s = (t = e.ownerDocument) == null ? void 0 : t.body,
    o = fn(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
    i = fn(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
    l = -r.scrollLeft + xi(e),
    a = -r.scrollTop
  return (
    Lt(s || n).direction === 'rtl' && (l += fn(n.clientWidth, s ? s.clientWidth : 0) - o),
    { width: o, height: i, x: l, y: a }
  )
}
function ki(e) {
  var t = Lt(e),
    n = t.overflow,
    r = t.overflowX,
    s = t.overflowY
  return /auto|scroll|overlay|hidden/.test(n + s + r)
}
function Ju(e) {
  return ['html', 'body', '#document'].indexOf(At(e)) >= 0
    ? e.ownerDocument.body
    : nt(e) && ki(e)
      ? e
      : Ju(Ms(e))
}
function fr(e, t) {
  var n
  t === void 0 && (t = [])
  var r = Ju(e),
    s = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    o = Ze(r),
    i = s ? [o].concat(o.visualViewport || [], ki(r) ? r : []) : r,
    l = t.concat(i)
  return s ? l : l.concat(fr(Ms(i)))
}
function jo(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height })
}
function Hg(e, t) {
  var n = zn(e, !1, t === 'fixed')
  return (
    (n.top = n.top + e.clientTop),
    (n.left = n.left + e.clientLeft),
    (n.bottom = n.top + e.clientHeight),
    (n.right = n.left + e.clientWidth),
    (n.width = e.clientWidth),
    (n.height = e.clientHeight),
    (n.x = n.left),
    (n.y = n.top),
    n
  )
}
function bl(e, t, n) {
  return t === Ni ? jo(Fg(e, n)) : mn(t) ? Hg(t, n) : jo(Vg(Xt(e)))
}
function Ug(e) {
  var t = fr(Ms(e)),
    n = ['absolute', 'fixed'].indexOf(Lt(e).position) >= 0,
    r = n && nt(e) ? Ar(e) : e
  return mn(r)
    ? t.filter(function (s) {
        return mn(s) && Yu(s, r) && At(s) !== 'body'
      })
    : []
}
function Wg(e, t, n, r) {
  var s = t === 'clippingParents' ? Ug(e) : [].concat(t),
    o = [].concat(s, [n]),
    i = o[0],
    l = o.reduce(
      function (a, u) {
        var c = bl(e, u, r)
        return (
          (a.top = fn(c.top, a.top)),
          (a.right = fs(c.right, a.right)),
          (a.bottom = fs(c.bottom, a.bottom)),
          (a.left = fn(c.left, a.left)),
          a
        )
      },
      bl(e, i, r)
    )
  return (
    (l.width = l.right - l.left), (l.height = l.bottom - l.top), (l.x = l.left), (l.y = l.top), l
  )
}
function Zu(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    s = r ? bt(r) : null,
    o = r ? Fn(r) : null,
    i = t.x + t.width / 2 - n.width / 2,
    l = t.y + t.height / 2 - n.height / 2,
    a
  switch (s) {
    case Ue:
      a = { x: i, y: t.y - n.height }
      break
    case Qe:
      a = { x: i, y: t.y + t.height }
      break
    case Je:
      a = { x: t.x + t.width, y: l }
      break
    case We:
      a = { x: t.x - n.width, y: l }
      break
    default:
      a = { x: t.x, y: t.y }
  }
  var u = s ? Pi(s) : null
  if (u != null) {
    var c = u === 'y' ? 'height' : 'width'
    switch (o) {
      case hn:
        a[u] = a[u] - (t[c] / 2 - n[c] / 2)
        break
      case xn:
        a[u] = a[u] + (t[c] / 2 - n[c] / 2)
        break
    }
  }
  return a
}
function Vn(e, t) {
  t === void 0 && (t = {})
  var n = t,
    r = n.placement,
    s = r === void 0 ? e.placement : r,
    o = n.strategy,
    i = o === void 0 ? e.strategy : o,
    l = n.boundary,
    a = l === void 0 ? $u : l,
    u = n.rootBoundary,
    c = u === void 0 ? Ni : u,
    f = n.elementContext,
    h = f === void 0 ? Tn : f,
    p = n.altBoundary,
    v = p === void 0 ? !1 : p,
    b = n.padding,
    N = b === void 0 ? 0 : b,
    y = qu(typeof N != 'number' ? N : Xu(N, Bn)),
    I = h === Tn ? Mu : Tn,
    D = e.rects.popper,
    w = e.elements[v ? I : h],
    x = Wg(mn(w) ? w : w.contextElement || Xt(e.elements.popper), a, c, i),
    C = zn(e.elements.reference),
    j = Zu({ reference: C, element: D, strategy: 'absolute', placement: s }),
    P = jo(Object.assign({}, D, j)),
    te = h === Tn ? P : C,
    J = {
      top: x.top - te.top + y.top,
      bottom: te.bottom - x.bottom + y.bottom,
      left: x.left - te.left + y.left,
      right: te.right - x.right + y.right
    },
    Z = e.modifiersData.offset
  if (h === Tn && Z) {
    var le = Z[s]
    Object.keys(J).forEach(function (ce) {
      var ke = [Je, Qe].indexOf(ce) >= 0 ? 1 : -1,
        $e = [Ue, Qe].indexOf(ce) >= 0 ? 'y' : 'x'
      J[ce] += le[$e] * ke
    })
  }
  return J
}
function jg(e, t) {
  t === void 0 && (t = {})
  var n = t,
    r = n.placement,
    s = n.boundary,
    o = n.rootBoundary,
    i = n.padding,
    l = n.flipVariations,
    a = n.allowedAutoPlacements,
    u = a === void 0 ? Si : a,
    c = Fn(r),
    f = c
      ? l
        ? Uo
        : Uo.filter(function (v) {
            return Fn(v) === c
          })
      : Bn,
    h = f.filter(function (v) {
      return u.indexOf(v) >= 0
    })
  h.length === 0 && (h = f)
  var p = h.reduce(function (v, b) {
    return (v[b] = Vn(e, { placement: b, boundary: s, rootBoundary: o, padding: i })[bt(b)]), v
  }, {})
  return Object.keys(p).sort(function (v, b) {
    return p[v] - p[b]
  })
}
function Bg(e) {
  if (bt(e) === $s) return []
  var t = qr(e)
  return [vl(e), t, vl(t)]
}
function Kg(e) {
  var t = e.state,
    n = e.options,
    r = e.name
  if (!t.modifiersData[r]._skip) {
    for (
      var s = n.mainAxis,
        o = s === void 0 ? !0 : s,
        i = n.altAxis,
        l = i === void 0 ? !0 : i,
        a = n.fallbackPlacements,
        u = n.padding,
        c = n.boundary,
        f = n.rootBoundary,
        h = n.altBoundary,
        p = n.flipVariations,
        v = p === void 0 ? !0 : p,
        b = n.allowedAutoPlacements,
        N = t.options.placement,
        y = bt(N),
        I = y === N,
        D = a || (I || !v ? [qr(N)] : Bg(N)),
        w = [N].concat(D).reduce(function (ze, Fe) {
          return ze.concat(
            bt(Fe) === $s
              ? jg(t, {
                  placement: Fe,
                  boundary: c,
                  rootBoundary: f,
                  padding: u,
                  flipVariations: v,
                  allowedAutoPlacements: b
                })
              : Fe
          )
        }, []),
        x = t.rects.reference,
        C = t.rects.popper,
        j = new Map(),
        P = !0,
        te = w[0],
        J = 0;
      J < w.length;
      J++
    ) {
      var Z = w[J],
        le = bt(Z),
        ce = Fn(Z) === hn,
        ke = [Ue, Qe].indexOf(le) >= 0,
        $e = ke ? 'width' : 'height',
        re = Vn(t, { placement: Z, boundary: c, rootBoundary: f, altBoundary: h, padding: u }),
        Q = ke ? (ce ? Je : We) : ce ? Qe : Ue
      x[$e] > C[$e] && (Q = qr(Q))
      var ee = qr(Q),
        Te = []
      if (
        (o && Te.push(re[le] <= 0),
        l && Te.push(re[Q] <= 0, re[ee] <= 0),
        Te.every(function (ze) {
          return ze
        }))
      ) {
        ;(te = Z), (P = !1)
        break
      }
      j.set(Z, Te)
    }
    if (P)
      for (
        var be = v ? 3 : 1,
          Ne = function (Fe) {
            var pe = w.find(function (A) {
              var z = j.get(A)
              if (z)
                return z.slice(0, Fe).every(function (k) {
                  return k
                })
            })
            if (pe) return (te = pe), 'break'
          },
          ge = be;
        ge > 0;
        ge--
      ) {
        var Ge = Ne(ge)
        if (Ge === 'break') break
      }
    t.placement !== te && ((t.modifiersData[r]._skip = !0), (t.placement = te), (t.reset = !0))
  }
}
const ef = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Kg,
  requiresIfExists: ['offset'],
  data: { _skip: !1 }
}
function yl(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x
    }
  )
}
function Tl(e) {
  return [Ue, Je, Qe, We].some(function (t) {
    return e[t] >= 0
  })
}
function Yg(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    s = t.rects.popper,
    o = t.modifiersData.preventOverflow,
    i = Vn(t, { elementContext: 'reference' }),
    l = Vn(t, { altBoundary: !0 }),
    a = yl(i, r),
    u = yl(l, s, o),
    c = Tl(a),
    f = Tl(u)
  ;(t.modifiersData[n] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: f
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': c,
      'data-popper-escaped': f
    }))
}
const tf = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: Yg
}
function Gg(e, t, n) {
  var r = bt(e),
    s = [We, Ue].indexOf(r) >= 0 ? -1 : 1,
    o = typeof n == 'function' ? n(Object.assign({}, t, { placement: e })) : n,
    i = o[0],
    l = o[1]
  return (
    (i = i || 0), (l = (l || 0) * s), [We, Je].indexOf(r) >= 0 ? { x: l, y: i } : { x: i, y: l }
  )
}
function qg(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    s = n.offset,
    o = s === void 0 ? [0, 0] : s,
    i = Si.reduce(function (c, f) {
      return (c[f] = Gg(f, t.rects, o)), c
    }, {}),
    l = i[t.placement],
    a = l.x,
    u = l.y
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += a), (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = i)
}
const nf = { name: 'offset', enabled: !0, phase: 'main', requires: ['popperOffsets'], fn: qg }
function Xg(e) {
  var t = e.state,
    n = e.name
  t.modifiersData[n] = Zu({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement
  })
}
const zi = { name: 'popperOffsets', enabled: !0, phase: 'read', fn: Xg, data: {} }
function Qg(e) {
  return e === 'x' ? 'y' : 'x'
}
function Jg(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    s = n.mainAxis,
    o = s === void 0 ? !0 : s,
    i = n.altAxis,
    l = i === void 0 ? !1 : i,
    a = n.boundary,
    u = n.rootBoundary,
    c = n.altBoundary,
    f = n.padding,
    h = n.tether,
    p = h === void 0 ? !0 : h,
    v = n.tetherOffset,
    b = v === void 0 ? 0 : v,
    N = Vn(t, { boundary: a, rootBoundary: u, padding: f, altBoundary: c }),
    y = bt(t.placement),
    I = Fn(t.placement),
    D = !I,
    w = Pi(y),
    x = Qg(w),
    C = t.modifiersData.popperOffsets,
    j = t.rects.reference,
    P = t.rects.popper,
    te = typeof b == 'function' ? b(Object.assign({}, t.rects, { placement: t.placement })) : b,
    J =
      typeof te == 'number'
        ? { mainAxis: te, altAxis: te }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, te),
    Z = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    le = { x: 0, y: 0 }
  if (C) {
    if (o) {
      var ce,
        ke = w === 'y' ? Ue : We,
        $e = w === 'y' ? Qe : Je,
        re = w === 'y' ? 'height' : 'width',
        Q = C[w],
        ee = Q + N[ke],
        Te = Q - N[$e],
        be = p ? -P[re] / 2 : 0,
        Ne = I === hn ? j[re] : P[re],
        ge = I === hn ? -P[re] : -j[re],
        Ge = t.elements.arrow,
        ze = p && Ge ? Ri(Ge) : { width: 0, height: 0 },
        Fe = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Gu(),
        pe = Fe[ke],
        A = Fe[$e],
        z = ur(0, j[re], ze[re]),
        k = D ? j[re] / 2 - be - z - pe - J.mainAxis : Ne - z - pe - J.mainAxis,
        W = D ? -j[re] / 2 + be + z + A + J.mainAxis : ge + z + A + J.mainAxis,
        ne = t.elements.arrow && Ar(t.elements.arrow),
        de = ne ? (w === 'y' ? ne.clientTop || 0 : ne.clientLeft || 0) : 0,
        d = (ce = Z == null ? void 0 : Z[w]) != null ? ce : 0,
        m = Q + k - d - de,
        g = Q + W - d,
        O = ur(p ? fs(ee, m) : ee, Q, p ? fn(Te, g) : Te)
      ;(C[w] = O), (le[w] = O - Q)
    }
    if (l) {
      var T,
        $ = w === 'x' ? Ue : We,
        F = w === 'x' ? Qe : Je,
        R = C[x],
        M = x === 'y' ? 'height' : 'width',
        L = R + N[$],
        H = R - N[F],
        V = [Ue, We].indexOf(y) !== -1,
        _ = (T = Z == null ? void 0 : Z[x]) != null ? T : 0,
        E = V ? L : R - j[M] - P[M] - _ + J.altAxis,
        U = V ? R + j[M] + P[M] - _ - J.altAxis : H,
        K = p && V ? Lg(E, R, U) : ur(p ? E : L, R, p ? U : H)
      ;(C[x] = K), (le[x] = K - R)
    }
    t.modifiersData[r] = le
  }
}
const rf = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: Jg,
  requiresIfExists: ['offset']
}
function Zg(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
}
function eE(e) {
  return e === Ze(e) || !nt(e) ? Mi(e) : Zg(e)
}
function tE(e) {
  var t = e.getBoundingClientRect(),
    n = kn(t.width) / e.offsetWidth || 1,
    r = kn(t.height) / e.offsetHeight || 1
  return n !== 1 || r !== 1
}
function nE(e, t, n) {
  n === void 0 && (n = !1)
  var r = nt(t),
    s = nt(t) && tE(t),
    o = Xt(t),
    i = zn(e, s, n),
    l = { scrollLeft: 0, scrollTop: 0 },
    a = { x: 0, y: 0 }
  return (
    (r || (!r && !n)) &&
      ((At(t) !== 'body' || ki(o)) && (l = eE(t)),
      nt(t) ? ((a = zn(t, !0)), (a.x += t.clientLeft), (a.y += t.clientTop)) : o && (a.x = xi(o))),
    {
      x: i.left + l.scrollLeft - a.x,
      y: i.top + l.scrollTop - a.y,
      width: i.width,
      height: i.height
    }
  )
}
function rE(e) {
  var t = new Map(),
    n = new Set(),
    r = []
  e.forEach(function (o) {
    t.set(o.name, o)
  })
  function s(o) {
    n.add(o.name)
    var i = [].concat(o.requires || [], o.requiresIfExists || [])
    i.forEach(function (l) {
      if (!n.has(l)) {
        var a = t.get(l)
        a && s(a)
      }
    }),
      r.push(o)
  }
  return (
    e.forEach(function (o) {
      n.has(o.name) || s(o)
    }),
    r
  )
}
function sE(e) {
  var t = rE(e)
  return Bu.reduce(function (n, r) {
    return n.concat(
      t.filter(function (s) {
        return s.phase === r
      })
    )
  }, [])
}
function oE(e) {
  var t
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            ;(t = void 0), n(e())
          })
        })),
      t
    )
  }
}
function iE(e) {
  var t = e.reduce(function (n, r) {
    var s = n[r.name]
    return (
      (n[r.name] = s
        ? Object.assign({}, s, r, {
            options: Object.assign({}, s.options, r.options),
            data: Object.assign({}, s.data, r.data)
          })
        : r),
      n
    )
  }, {})
  return Object.keys(t).map(function (n) {
    return t[n]
  })
}
var Al = { placement: 'bottom', modifiers: [], strategy: 'absolute' }
function Ol() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n]
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function')
  })
}
function xs(e) {
  e === void 0 && (e = {})
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    s = t.defaultOptions,
    o = s === void 0 ? Al : s
  return function (l, a, u) {
    u === void 0 && (u = o)
    var c = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, Al, o),
        modifiersData: {},
        elements: { reference: l, popper: a },
        attributes: {},
        styles: {}
      },
      f = [],
      h = !1,
      p = {
        state: c,
        setOptions: function (y) {
          var I = typeof y == 'function' ? y(c.options) : y
          b(),
            (c.options = Object.assign({}, o, c.options, I)),
            (c.scrollParents = {
              reference: mn(l) ? fr(l) : l.contextElement ? fr(l.contextElement) : [],
              popper: fr(a)
            })
          var D = sE(iE([].concat(r, c.options.modifiers)))
          return (
            (c.orderedModifiers = D.filter(function (w) {
              return w.enabled
            })),
            v(),
            p.update()
          )
        },
        forceUpdate: function () {
          if (!h) {
            var y = c.elements,
              I = y.reference,
              D = y.popper
            if (Ol(I, D)) {
              ;(c.rects = {
                reference: nE(I, Ar(D), c.options.strategy === 'fixed'),
                popper: Ri(D)
              }),
                (c.reset = !1),
                (c.placement = c.options.placement),
                c.orderedModifiers.forEach(function (J) {
                  return (c.modifiersData[J.name] = Object.assign({}, J.data))
                })
              for (var w = 0; w < c.orderedModifiers.length; w++) {
                if (c.reset === !0) {
                  ;(c.reset = !1), (w = -1)
                  continue
                }
                var x = c.orderedModifiers[w],
                  C = x.fn,
                  j = x.options,
                  P = j === void 0 ? {} : j,
                  te = x.name
                typeof C == 'function' &&
                  (c = C({ state: c, options: P, name: te, instance: p }) || c)
              }
            }
          }
        },
        update: oE(function () {
          return new Promise(function (N) {
            p.forceUpdate(), N(c)
          })
        }),
        destroy: function () {
          b(), (h = !0)
        }
      }
    if (!Ol(l, a)) return p
    p.setOptions(u).then(function (N) {
      !h && u.onFirstUpdate && u.onFirstUpdate(N)
    })
    function v() {
      c.orderedModifiers.forEach(function (N) {
        var y = N.name,
          I = N.options,
          D = I === void 0 ? {} : I,
          w = N.effect
        if (typeof w == 'function') {
          var x = w({ state: c, name: y, instance: p, options: D }),
            C = function () {}
          f.push(x || C)
        }
      })
    }
    function b() {
      f.forEach(function (N) {
        return N()
      }),
        (f = [])
    }
    return p
  }
}
var aE = xs(),
  lE = [$i, zi, Di, Ii],
  cE = xs({ defaultModifiers: lE }),
  uE = [$i, zi, Di, Ii, nf, ef, rf, Qu, tf],
  Fi = xs({ defaultModifiers: uE })
const sf = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      afterMain: Hu,
      afterRead: zu,
      afterWrite: ju,
      applyStyles: Ii,
      arrow: Qu,
      auto: $s,
      basePlacements: Bn,
      beforeMain: Fu,
      beforeRead: xu,
      beforeWrite: Uu,
      bottom: Qe,
      clippingParents: $u,
      computeStyles: Di,
      createPopper: Fi,
      createPopperBase: aE,
      createPopperLite: cE,
      detectOverflow: Vn,
      end: xn,
      eventListeners: $i,
      flip: ef,
      hide: tf,
      left: We,
      main: Vu,
      modifierPhases: Bu,
      offset: nf,
      placements: Si,
      popper: Tn,
      popperGenerator: xs,
      popperOffsets: zi,
      preventOverflow: rf,
      read: ku,
      reference: Mu,
      right: Je,
      start: hn,
      top: Ue,
      variationPlacements: Uo,
      viewport: Ni,
      write: Wu
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
)
/*!
 * Bootstrap v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const kt = new Map(),
  no = {
    set(e, t, n) {
      kt.has(e) || kt.set(e, new Map())
      const r = kt.get(e)
      if (!r.has(t) && r.size !== 0) {
        console.error(
          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`
        )
        return
      }
      r.set(t, n)
    },
    get(e, t) {
      return (kt.has(e) && kt.get(e).get(t)) || null
    },
    remove(e, t) {
      if (!kt.has(e)) return
      const n = kt.get(e)
      n.delete(t), n.size === 0 && kt.delete(e)
    }
  },
  fE = 1e6,
  dE = 1e3,
  Bo = 'transitionend',
  of = (e) => (
    e &&
      window.CSS &&
      window.CSS.escape &&
      (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)),
    e
  ),
  hE = (e) =>
    e == null
      ? `${e}`
      : Object.prototype.toString
          .call(e)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  mE = (e) => {
    do e += Math.floor(Math.random() * fE)
    while (document.getElementById(e))
    return e
  },
  pE = (e) => {
    if (!e) return 0
    let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e)
    const r = Number.parseFloat(t),
      s = Number.parseFloat(n)
    return !r && !s
      ? 0
      : ((t = t.split(',')[0]),
        (n = n.split(',')[0]),
        (Number.parseFloat(t) + Number.parseFloat(n)) * dE)
  },
  af = (e) => {
    e.dispatchEvent(new Event(Bo))
  },
  Nt = (e) =>
    !e || typeof e != 'object'
      ? !1
      : (typeof e.jquery < 'u' && (e = e[0]), typeof e.nodeType < 'u'),
  Bt = (e) =>
    Nt(e)
      ? e.jquery
        ? e[0]
        : e
      : typeof e == 'string' && e.length > 0
        ? document.querySelector(of(e))
        : null,
  Kn = (e) => {
    if (!Nt(e) || e.getClientRects().length === 0) return !1
    const t = getComputedStyle(e).getPropertyValue('visibility') === 'visible',
      n = e.closest('details:not([open])')
    if (!n) return t
    if (n !== e) {
      const r = e.closest('summary')
      if ((r && r.parentNode !== n) || r === null) return !1
    }
    return t
  },
  Kt = (e) =>
    !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains('disabled')
      ? !0
      : typeof e.disabled < 'u'
        ? e.disabled
        : e.hasAttribute('disabled') && e.getAttribute('disabled') !== 'false',
  lf = (e) => {
    if (!document.documentElement.attachShadow) return null
    if (typeof e.getRootNode == 'function') {
      const t = e.getRootNode()
      return t instanceof ShadowRoot ? t : null
    }
    return e instanceof ShadowRoot ? e : e.parentNode ? lf(e.parentNode) : null
  },
  ds = () => {},
  Or = (e) => {
    e.offsetHeight
  },
  cf = () =>
    window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null,
  ro = [],
  _E = (e) => {
    document.readyState === 'loading'
      ? (ro.length ||
          document.addEventListener('DOMContentLoaded', () => {
            for (const t of ro) t()
          }),
        ro.push(e))
      : e()
  },
  st = () => document.documentElement.dir === 'rtl',
  it = (e) => {
    _E(() => {
      const t = cf()
      if (t) {
        const n = e.NAME,
          r = t.fn[n]
        ;(t.fn[n] = e.jQueryInterface),
          (t.fn[n].Constructor = e),
          (t.fn[n].noConflict = () => ((t.fn[n] = r), e.jQueryInterface))
      }
    })
  },
  Ke = (e, t = [], n = e) => (typeof e == 'function' ? e(...t) : n),
  uf = (e, t, n = !0) => {
    if (!n) {
      Ke(e)
      return
    }
    const r = 5,
      s = pE(t) + r
    let o = !1
    const i = ({ target: l }) => {
      l === t && ((o = !0), t.removeEventListener(Bo, i), Ke(e))
    }
    t.addEventListener(Bo, i),
      setTimeout(() => {
        o || af(t)
      }, s)
  },
  Vi = (e, t, n, r) => {
    const s = e.length
    let o = e.indexOf(t)
    return o === -1
      ? !n && r
        ? e[s - 1]
        : e[0]
      : ((o += n ? 1 : -1), r && (o = (o + s) % s), e[Math.max(0, Math.min(o, s - 1))])
  },
  gE = /[^.]*(?=\..*)\.|.*/,
  EE = /\..*/,
  vE = /::\d+$/,
  so = {}
let wl = 1
const ff = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
  bE = new Set([
    'click',
    'dblclick',
    'mouseup',
    'mousedown',
    'contextmenu',
    'mousewheel',
    'DOMMouseScroll',
    'mouseover',
    'mouseout',
    'mousemove',
    'selectstart',
    'selectend',
    'keydown',
    'keypress',
    'keyup',
    'orientationchange',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointerleave',
    'pointercancel',
    'gesturestart',
    'gesturechange',
    'gestureend',
    'focus',
    'blur',
    'change',
    'reset',
    'select',
    'submit',
    'focusin',
    'focusout',
    'load',
    'unload',
    'beforeunload',
    'resize',
    'move',
    'DOMContentLoaded',
    'readystatechange',
    'error',
    'abort',
    'scroll'
  ])
function df(e, t) {
  return (t && `${t}::${wl++}`) || e.uidEvent || wl++
}
function hf(e) {
  const t = df(e)
  return (e.uidEvent = t), (so[t] = so[t] || {}), so[t]
}
function yE(e, t) {
  return function n(r) {
    return Hi(r, { delegateTarget: e }), n.oneOff && S.off(e, r.type, t), t.apply(e, [r])
  }
}
function TE(e, t, n) {
  return function r(s) {
    const o = e.querySelectorAll(t)
    for (let { target: i } = s; i && i !== this; i = i.parentNode)
      for (const l of o)
        if (l === i)
          return Hi(s, { delegateTarget: i }), r.oneOff && S.off(e, s.type, t, n), n.apply(i, [s])
  }
}
function mf(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n)
}
function pf(e, t, n) {
  const r = typeof t == 'string',
    s = r ? n : t || n
  let o = _f(e)
  return bE.has(o) || (o = e), [r, s, o]
}
function Cl(e, t, n, r, s) {
  if (typeof t != 'string' || !e) return
  let [o, i, l] = pf(t, n, r)
  t in ff &&
    (i = ((v) =>
      function (b) {
        if (
          !b.relatedTarget ||
          (b.relatedTarget !== b.delegateTarget && !b.delegateTarget.contains(b.relatedTarget))
        )
          return v.call(this, b)
      })(i))
  const a = hf(e),
    u = a[l] || (a[l] = {}),
    c = mf(u, i, o ? n : null)
  if (c) {
    c.oneOff = c.oneOff && s
    return
  }
  const f = df(i, t.replace(gE, '')),
    h = o ? TE(e, n, i) : yE(e, i)
  ;(h.delegationSelector = o ? n : null),
    (h.callable = i),
    (h.oneOff = s),
    (h.uidEvent = f),
    (u[f] = h),
    e.addEventListener(l, h, o)
}
function Ko(e, t, n, r, s) {
  const o = mf(t[n], r, s)
  o && (e.removeEventListener(n, o, !!s), delete t[n][o.uidEvent])
}
function AE(e, t, n, r) {
  const s = t[n] || {}
  for (const [o, i] of Object.entries(s))
    o.includes(r) && Ko(e, t, n, i.callable, i.delegationSelector)
}
function _f(e) {
  return (e = e.replace(EE, '')), ff[e] || e
}
const S = {
  on(e, t, n, r) {
    Cl(e, t, n, r, !1)
  },
  one(e, t, n, r) {
    Cl(e, t, n, r, !0)
  },
  off(e, t, n, r) {
    if (typeof t != 'string' || !e) return
    const [s, o, i] = pf(t, n, r),
      l = i !== t,
      a = hf(e),
      u = a[i] || {},
      c = t.startsWith('.')
    if (typeof o < 'u') {
      if (!Object.keys(u).length) return
      Ko(e, a, i, o, s ? n : null)
      return
    }
    if (c) for (const f of Object.keys(a)) AE(e, a, f, t.slice(1))
    for (const [f, h] of Object.entries(u)) {
      const p = f.replace(vE, '')
      ;(!l || t.includes(p)) && Ko(e, a, i, h.callable, h.delegationSelector)
    }
  },
  trigger(e, t, n) {
    if (typeof t != 'string' || !e) return null
    const r = cf(),
      s = _f(t),
      o = t !== s
    let i = null,
      l = !0,
      a = !0,
      u = !1
    o &&
      r &&
      ((i = r.Event(t, n)),
      r(e).trigger(i),
      (l = !i.isPropagationStopped()),
      (a = !i.isImmediatePropagationStopped()),
      (u = i.isDefaultPrevented()))
    const c = Hi(new Event(t, { bubbles: l, cancelable: !0 }), n)
    return (
      u && c.preventDefault(),
      a && e.dispatchEvent(c),
      c.defaultPrevented && i && i.preventDefault(),
      c
    )
  }
}
function Hi(e, t = {}) {
  for (const [n, r] of Object.entries(t))
    try {
      e[n] = r
    } catch {
      Object.defineProperty(e, n, {
        configurable: !0,
        get() {
          return r
        }
      })
    }
  return e
}
function Nl(e) {
  if (e === 'true') return !0
  if (e === 'false') return !1
  if (e === Number(e).toString()) return Number(e)
  if (e === '' || e === 'null') return null
  if (typeof e != 'string') return e
  try {
    return JSON.parse(decodeURIComponent(e))
  } catch {
    return e
  }
}
function oo(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`)
}
const St = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${oo(t)}`, n)
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${oo(t)}`)
  },
  getDataAttributes(e) {
    if (!e) return {}
    const t = {},
      n = Object.keys(e.dataset).filter((r) => r.startsWith('bs') && !r.startsWith('bsConfig'))
    for (const r of n) {
      let s = r.replace(/^bs/, '')
      ;(s = s.charAt(0).toLowerCase() + s.slice(1, s.length)), (t[s] = Nl(e.dataset[r]))
    }
    return t
  },
  getDataAttribute(e, t) {
    return Nl(e.getAttribute(`data-bs-${oo(t)}`))
  }
}
class wr {
  static get Default() {
    return {}
  }
  static get DefaultType() {
    return {}
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!')
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t
    )
  }
  _configAfterMerge(t) {
    return t
  }
  _mergeConfigObj(t, n) {
    const r = Nt(n) ? St.getDataAttribute(n, 'config') : {}
    return {
      ...this.constructor.Default,
      ...(typeof r == 'object' ? r : {}),
      ...(Nt(n) ? St.getDataAttributes(n) : {}),
      ...(typeof t == 'object' ? t : {})
    }
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, s] of Object.entries(n)) {
      const o = t[r],
        i = Nt(o) ? 'element' : hE(o)
      if (!new RegExp(s).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${s}".`
        )
    }
  }
}
const OE = '5.3.2'
class ht extends wr {
  constructor(t, n) {
    super(),
      (t = Bt(t)),
      t &&
        ((this._element = t),
        (this._config = this._getConfig(n)),
        no.set(this._element, this.constructor.DATA_KEY, this))
  }
  dispose() {
    no.remove(this._element, this.constructor.DATA_KEY),
      S.off(this._element, this.constructor.EVENT_KEY)
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null
  }
  _queueCallback(t, n, r = !0) {
    uf(t, n, r)
  }
  _getConfig(t) {
    return (
      (t = this._mergeConfigObj(t, this._element)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    )
  }
  static getInstance(t) {
    return no.get(Bt(t), this.DATA_KEY)
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == 'object' ? n : null)
  }
  static get VERSION() {
    return OE
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`
  }
}
const io = (e) => {
    let t = e.getAttribute('data-bs-target')
    if (!t || t === '#') {
      let n = e.getAttribute('href')
      if (!n || (!n.includes('#') && !n.startsWith('.'))) return null
      n.includes('#') && !n.startsWith('#') && (n = `#${n.split('#')[1]}`),
        (t = n && n !== '#' ? of(n.trim()) : null)
    }
    return t
  },
  Y = {
    find(e, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, e))
    },
    findOne(e, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, e)
    },
    children(e, t) {
      return [].concat(...e.children).filter((n) => n.matches(t))
    },
    parents(e, t) {
      const n = []
      let r = e.parentNode.closest(t)
      for (; r; ) n.push(r), (r = r.parentNode.closest(t))
      return n
    },
    prev(e, t) {
      let n = e.previousElementSibling
      for (; n; ) {
        if (n.matches(t)) return [n]
        n = n.previousElementSibling
      }
      return []
    },
    next(e, t) {
      let n = e.nextElementSibling
      for (; n; ) {
        if (n.matches(t)) return [n]
        n = n.nextElementSibling
      }
      return []
    },
    focusableChildren(e) {
      const t = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'details',
        '[tabindex]',
        '[contenteditable="true"]'
      ]
        .map((n) => `${n}:not([tabindex^="-"])`)
        .join(',')
      return this.find(t, e).filter((n) => !Kt(n) && Kn(n))
    },
    getSelectorFromElement(e) {
      const t = io(e)
      return t && Y.findOne(t) ? t : null
    },
    getElementFromSelector(e) {
      const t = io(e)
      return t ? Y.findOne(t) : null
    },
    getMultipleElementsFromSelector(e) {
      const t = io(e)
      return t ? Y.find(t) : []
    }
  },
  ks = (e, t = 'hide') => {
    const n = `click.dismiss${e.EVENT_KEY}`,
      r = e.NAME
    S.on(document, n, `[data-bs-dismiss="${r}"]`, function (s) {
      if ((['A', 'AREA'].includes(this.tagName) && s.preventDefault(), Kt(this))) return
      const o = Y.getElementFromSelector(this) || this.closest(`.${r}`)
      e.getOrCreateInstance(o)[t]()
    })
  },
  wE = 'alert',
  CE = 'bs.alert',
  gf = `.${CE}`,
  NE = `close${gf}`,
  SE = `closed${gf}`,
  LE = 'fade',
  IE = 'show'
class zs extends ht {
  static get NAME() {
    return wE
  }
  close() {
    if (S.trigger(this._element, NE).defaultPrevented) return
    this._element.classList.remove(IE)
    const n = this._element.classList.contains(LE)
    this._queueCallback(() => this._destroyElement(), this._element, n)
  }
  _destroyElement() {
    this._element.remove(), S.trigger(this._element, SE), this.dispose()
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = zs.getOrCreateInstance(this)
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
          throw new TypeError(`No method named "${t}"`)
        n[t](this)
      }
    })
  }
}
ks(zs, 'close')
it(zs)
const RE = 'button',
  PE = 'bs.button',
  DE = `.${PE}`,
  $E = '.data-api',
  ME = 'active',
  Sl = '[data-bs-toggle="button"]',
  xE = `click${DE}${$E}`
class Fs extends ht {
  static get NAME() {
    return RE
  }
  toggle() {
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(ME))
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Fs.getOrCreateInstance(this)
      t === 'toggle' && n[t]()
    })
  }
}
S.on(document, xE, Sl, (e) => {
  e.preventDefault()
  const t = e.target.closest(Sl)
  Fs.getOrCreateInstance(t).toggle()
})
it(Fs)
const kE = 'swipe',
  Yn = '.bs.swipe',
  zE = `touchstart${Yn}`,
  FE = `touchmove${Yn}`,
  VE = `touchend${Yn}`,
  HE = `pointerdown${Yn}`,
  UE = `pointerup${Yn}`,
  WE = 'touch',
  jE = 'pen',
  BE = 'pointer-event',
  KE = 40,
  YE = { endCallback: null, leftCallback: null, rightCallback: null },
  GE = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)'
  }
class hs extends wr {
  constructor(t, n) {
    super(),
      (this._element = t),
      !(!t || !hs.isSupported()) &&
        ((this._config = this._getConfig(n)),
        (this._deltaX = 0),
        (this._supportPointerEvents = !!window.PointerEvent),
        this._initEvents())
  }
  static get Default() {
    return YE
  }
  static get DefaultType() {
    return GE
  }
  static get NAME() {
    return kE
  }
  dispose() {
    S.off(this._element, Yn)
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX
      return
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX),
      this._handleSwipe(),
      Ke(this._config.endCallback)
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX)
    if (t <= KE) return
    const n = t / this._deltaX
    ;(this._deltaX = 0), n && Ke(n > 0 ? this._config.rightCallback : this._config.leftCallback)
  }
  _initEvents() {
    this._supportPointerEvents
      ? (S.on(this._element, HE, (t) => this._start(t)),
        S.on(this._element, UE, (t) => this._end(t)),
        this._element.classList.add(BE))
      : (S.on(this._element, zE, (t) => this._start(t)),
        S.on(this._element, FE, (t) => this._move(t)),
        S.on(this._element, VE, (t) => this._end(t)))
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === jE || t.pointerType === WE)
  }
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
  }
}
const qE = 'carousel',
  XE = 'bs.carousel',
  Qt = `.${XE}`,
  Ef = '.data-api',
  QE = 'ArrowLeft',
  JE = 'ArrowRight',
  ZE = 500,
  er = 'next',
  vn = 'prev',
  An = 'left',
  Xr = 'right',
  ev = `slide${Qt}`,
  ao = `slid${Qt}`,
  tv = `keydown${Qt}`,
  nv = `mouseenter${Qt}`,
  rv = `mouseleave${Qt}`,
  sv = `dragstart${Qt}`,
  ov = `load${Qt}${Ef}`,
  iv = `click${Qt}${Ef}`,
  vf = 'carousel',
  kr = 'active',
  av = 'slide',
  lv = 'carousel-item-end',
  cv = 'carousel-item-start',
  uv = 'carousel-item-next',
  fv = 'carousel-item-prev',
  bf = '.active',
  yf = '.carousel-item',
  dv = bf + yf,
  hv = '.carousel-item img',
  mv = '.carousel-indicators',
  pv = '[data-bs-slide], [data-bs-slide-to]',
  _v = '[data-bs-ride="carousel"]',
  gv = { [QE]: Xr, [JE]: An },
  Ev = { interval: 5e3, keyboard: !0, pause: 'hover', ride: !1, touch: !0, wrap: !0 },
  vv = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean'
  }
class Cr extends ht {
  constructor(t, n) {
    super(t, n),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = Y.findOne(mv, this._element)),
      this._addEventListeners(),
      this._config.ride === vf && this.cycle()
  }
  static get Default() {
    return Ev
  }
  static get DefaultType() {
    return vv
  }
  static get NAME() {
    return qE
  }
  next() {
    this._slide(er)
  }
  nextWhenVisible() {
    !document.hidden && Kn(this._element) && this.next()
  }
  prev() {
    this._slide(vn)
  }
  pause() {
    this._isSliding && af(this._element), this._clearInterval()
  }
  cycle() {
    this._clearInterval(),
      this._updateInterval(),
      (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval))
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        S.one(this._element, ao, () => this.cycle())
        return
      }
      this.cycle()
    }
  }
  to(t) {
    const n = this._getItems()
    if (t > n.length - 1 || t < 0) return
    if (this._isSliding) {
      S.one(this._element, ao, () => this.to(t))
      return
    }
    const r = this._getItemIndex(this._getActive())
    if (r === t) return
    const s = t > r ? er : vn
    this._slide(s, n[t])
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t
  }
  _addEventListeners() {
    this._config.keyboard && S.on(this._element, tv, (t) => this._keydown(t)),
      this._config.pause === 'hover' &&
        (S.on(this._element, nv, () => this.pause()),
        S.on(this._element, rv, () => this._maybeEnableCycle())),
      this._config.touch && hs.isSupported() && this._addTouchEventListeners()
  }
  _addTouchEventListeners() {
    for (const r of Y.find(hv, this._element)) S.on(r, sv, (s) => s.preventDefault())
    const n = {
      leftCallback: () => this._slide(this._directionToOrder(An)),
      rightCallback: () => this._slide(this._directionToOrder(Xr)),
      endCallback: () => {
        this._config.pause === 'hover' &&
          (this.pause(),
          this.touchTimeout && clearTimeout(this.touchTimeout),
          (this.touchTimeout = setTimeout(
            () => this._maybeEnableCycle(),
            ZE + this._config.interval
          )))
      }
    }
    this._swipeHelper = new hs(this._element, n)
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return
    const n = gv[t.key]
    n && (t.preventDefault(), this._slide(this._directionToOrder(n)))
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t)
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return
    const n = Y.findOne(bf, this._indicatorsElement)
    n.classList.remove(kr), n.removeAttribute('aria-current')
    const r = Y.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement)
    r && (r.classList.add(kr), r.setAttribute('aria-current', 'true'))
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive()
    if (!t) return
    const n = Number.parseInt(t.getAttribute('data-bs-interval'), 10)
    this._config.interval = n || this._config.defaultInterval
  }
  _slide(t, n = null) {
    if (this._isSliding) return
    const r = this._getActive(),
      s = t === er,
      o = n || Vi(this._getItems(), r, s, this._config.wrap)
    if (o === r) return
    const i = this._getItemIndex(o),
      l = (p) =>
        S.trigger(this._element, p, {
          relatedTarget: o,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(r),
          to: i
        })
    if (l(ev).defaultPrevented || !r || !o) return
    const u = !!this._interval
    this.pause(),
      (this._isSliding = !0),
      this._setActiveIndicatorElement(i),
      (this._activeElement = o)
    const c = s ? cv : lv,
      f = s ? uv : fv
    o.classList.add(f), Or(o), r.classList.add(c), o.classList.add(c)
    const h = () => {
      o.classList.remove(c, f),
        o.classList.add(kr),
        r.classList.remove(kr, f, c),
        (this._isSliding = !1),
        l(ao)
    }
    this._queueCallback(h, r, this._isAnimated()), u && this.cycle()
  }
  _isAnimated() {
    return this._element.classList.contains(av)
  }
  _getActive() {
    return Y.findOne(dv, this._element)
  }
  _getItems() {
    return Y.find(yf, this._element)
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null))
  }
  _directionToOrder(t) {
    return st() ? (t === An ? vn : er) : t === An ? er : vn
  }
  _orderToDirection(t) {
    return st() ? (t === vn ? An : Xr) : t === vn ? Xr : An
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Cr.getOrCreateInstance(this, t)
      if (typeof t == 'number') {
        n.to(t)
        return
      }
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
          throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
}
S.on(document, iv, pv, function (e) {
  const t = Y.getElementFromSelector(this)
  if (!t || !t.classList.contains(vf)) return
  e.preventDefault()
  const n = Cr.getOrCreateInstance(t),
    r = this.getAttribute('data-bs-slide-to')
  if (r) {
    n.to(r), n._maybeEnableCycle()
    return
  }
  if (St.getDataAttribute(this, 'slide') === 'next') {
    n.next(), n._maybeEnableCycle()
    return
  }
  n.prev(), n._maybeEnableCycle()
})
S.on(window, ov, () => {
  const e = Y.find(_v)
  for (const t of e) Cr.getOrCreateInstance(t)
})
it(Cr)
const bv = 'collapse',
  yv = 'bs.collapse',
  Nr = `.${yv}`,
  Tv = '.data-api',
  Av = `show${Nr}`,
  Ov = `shown${Nr}`,
  wv = `hide${Nr}`,
  Cv = `hidden${Nr}`,
  Nv = `click${Nr}${Tv}`,
  lo = 'show',
  wn = 'collapse',
  zr = 'collapsing',
  Sv = 'collapsed',
  Lv = `:scope .${wn} .${wn}`,
  Iv = 'collapse-horizontal',
  Rv = 'width',
  Pv = 'height',
  Dv = '.collapse.show, .collapse.collapsing',
  Yo = '[data-bs-toggle="collapse"]',
  $v = { parent: null, toggle: !0 },
  Mv = { parent: '(null|element)', toggle: 'boolean' }
class vr extends ht {
  constructor(t, n) {
    super(t, n), (this._isTransitioning = !1), (this._triggerArray = [])
    const r = Y.find(Yo)
    for (const s of r) {
      const o = Y.getSelectorFromElement(s),
        i = Y.find(o).filter((l) => l === this._element)
      o !== null && i.length && this._triggerArray.push(s)
    }
    this._initializeChildren(),
      this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle()
  }
  static get Default() {
    return $v
  }
  static get DefaultType() {
    return Mv
  }
  static get NAME() {
    return bv
  }
  toggle() {
    this._isShown() ? this.hide() : this.show()
  }
  show() {
    if (this._isTransitioning || this._isShown()) return
    let t = []
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(Dv)
          .filter((l) => l !== this._element)
          .map((l) => vr.getOrCreateInstance(l, { toggle: !1 }))),
      (t.length && t[0]._isTransitioning) || S.trigger(this._element, Av).defaultPrevented)
    )
      return
    for (const l of t) l.hide()
    const r = this._getDimension()
    this._element.classList.remove(wn),
      this._element.classList.add(zr),
      (this._element.style[r] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0)
    const s = () => {
        ;(this._isTransitioning = !1),
          this._element.classList.remove(zr),
          this._element.classList.add(wn, lo),
          (this._element.style[r] = ''),
          S.trigger(this._element, Ov)
      },
      i = `scroll${r[0].toUpperCase() + r.slice(1)}`
    this._queueCallback(s, this._element, !0), (this._element.style[r] = `${this._element[i]}px`)
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || S.trigger(this._element, wv).defaultPrevented)
      return
    const n = this._getDimension()
    ;(this._element.style[n] = `${this._element.getBoundingClientRect()[n]}px`),
      Or(this._element),
      this._element.classList.add(zr),
      this._element.classList.remove(wn, lo)
    for (const s of this._triggerArray) {
      const o = Y.getElementFromSelector(s)
      o && !this._isShown(o) && this._addAriaAndCollapsedClass([s], !1)
    }
    this._isTransitioning = !0
    const r = () => {
      ;(this._isTransitioning = !1),
        this._element.classList.remove(zr),
        this._element.classList.add(wn),
        S.trigger(this._element, Cv)
    }
    ;(this._element.style[n] = ''), this._queueCallback(r, this._element, !0)
  }
  _isShown(t = this._element) {
    return t.classList.contains(lo)
  }
  _configAfterMerge(t) {
    return (t.toggle = !!t.toggle), (t.parent = Bt(t.parent)), t
  }
  _getDimension() {
    return this._element.classList.contains(Iv) ? Rv : Pv
  }
  _initializeChildren() {
    if (!this._config.parent) return
    const t = this._getFirstLevelChildren(Yo)
    for (const n of t) {
      const r = Y.getElementFromSelector(n)
      r && this._addAriaAndCollapsedClass([n], this._isShown(r))
    }
  }
  _getFirstLevelChildren(t) {
    const n = Y.find(Lv, this._config.parent)
    return Y.find(t, this._config.parent).filter((r) => !n.includes(r))
  }
  _addAriaAndCollapsedClass(t, n) {
    if (t.length) for (const r of t) r.classList.toggle(Sv, !n), r.setAttribute('aria-expanded', n)
  }
  static jQueryInterface(t) {
    const n = {}
    return (
      typeof t == 'string' && /show|hide/.test(t) && (n.toggle = !1),
      this.each(function () {
        const r = vr.getOrCreateInstance(this, n)
        if (typeof t == 'string') {
          if (typeof r[t] > 'u') throw new TypeError(`No method named "${t}"`)
          r[t]()
        }
      })
    )
  }
}
S.on(document, Nv, Yo, function (e) {
  ;(e.target.tagName === 'A' || (e.delegateTarget && e.delegateTarget.tagName === 'A')) &&
    e.preventDefault()
  for (const t of Y.getMultipleElementsFromSelector(this))
    vr.getOrCreateInstance(t, { toggle: !1 }).toggle()
})
it(vr)
const Ll = 'dropdown',
  xv = 'bs.dropdown',
  gn = `.${xv}`,
  Ui = '.data-api',
  kv = 'Escape',
  Il = 'Tab',
  zv = 'ArrowUp',
  Rl = 'ArrowDown',
  Fv = 2,
  Vv = `hide${gn}`,
  Hv = `hidden${gn}`,
  Uv = `show${gn}`,
  Wv = `shown${gn}`,
  Tf = `click${gn}${Ui}`,
  Af = `keydown${gn}${Ui}`,
  jv = `keyup${gn}${Ui}`,
  On = 'show',
  Bv = 'dropup',
  Kv = 'dropend',
  Yv = 'dropstart',
  Gv = 'dropup-center',
  qv = 'dropdown-center',
  sn = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  Xv = `${sn}.${On}`,
  Qr = '.dropdown-menu',
  Qv = '.navbar',
  Jv = '.navbar-nav',
  Zv = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
  eb = st() ? 'top-end' : 'top-start',
  tb = st() ? 'top-start' : 'top-end',
  nb = st() ? 'bottom-end' : 'bottom-start',
  rb = st() ? 'bottom-start' : 'bottom-end',
  sb = st() ? 'left-start' : 'right-start',
  ob = st() ? 'right-start' : 'left-start',
  ib = 'top',
  ab = 'bottom',
  lb = {
    autoClose: !0,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  },
  cb = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  }
class yt extends ht {
  constructor(t, n) {
    super(t, n),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu =
        Y.next(this._element, Qr)[0] ||
        Y.prev(this._element, Qr)[0] ||
        Y.findOne(Qr, this._parent)),
      (this._inNavbar = this._detectNavbar())
  }
  static get Default() {
    return lb
  }
  static get DefaultType() {
    return cb
  }
  static get NAME() {
    return Ll
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show()
  }
  show() {
    if (Kt(this._element) || this._isShown()) return
    const t = { relatedTarget: this._element }
    if (!S.trigger(this._element, Uv, t).defaultPrevented) {
      if (
        (this._createPopper(),
        'ontouchstart' in document.documentElement && !this._parent.closest(Jv))
      )
        for (const r of [].concat(...document.body.children)) S.on(r, 'mouseover', ds)
      this._element.focus(),
        this._element.setAttribute('aria-expanded', !0),
        this._menu.classList.add(On),
        this._element.classList.add(On),
        S.trigger(this._element, Wv, t)
    }
  }
  hide() {
    if (Kt(this._element) || !this._isShown()) return
    const t = { relatedTarget: this._element }
    this._completeHide(t)
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose()
  }
  update() {
    ;(this._inNavbar = this._detectNavbar()), this._popper && this._popper.update()
  }
  _completeHide(t) {
    if (!S.trigger(this._element, Vv, t).defaultPrevented) {
      if ('ontouchstart' in document.documentElement)
        for (const r of [].concat(...document.body.children)) S.off(r, 'mouseover', ds)
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(On),
        this._element.classList.remove(On),
        this._element.setAttribute('aria-expanded', 'false'),
        St.removeDataAttribute(this._menu, 'popper'),
        S.trigger(this._element, Hv, t)
    }
  }
  _getConfig(t) {
    if (
      ((t = super._getConfig(t)),
      typeof t.reference == 'object' &&
        !Nt(t.reference) &&
        typeof t.reference.getBoundingClientRect != 'function')
    )
      throw new TypeError(
        `${Ll.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
      )
    return t
  }
  _createPopper() {
    if (typeof sf > 'u')
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)")
    let t = this._element
    this._config.reference === 'parent'
      ? (t = this._parent)
      : Nt(this._config.reference)
        ? (t = Bt(this._config.reference))
        : typeof this._config.reference == 'object' && (t = this._config.reference)
    const n = this._getPopperConfig()
    this._popper = Fi(t, this._menu, n)
  }
  _isShown() {
    return this._menu.classList.contains(On)
  }
  _getPlacement() {
    const t = this._parent
    if (t.classList.contains(Kv)) return sb
    if (t.classList.contains(Yv)) return ob
    if (t.classList.contains(Gv)) return ib
    if (t.classList.contains(qv)) return ab
    const n = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end'
    return t.classList.contains(Bv) ? (n ? tb : eb) : n ? rb : nb
  }
  _detectNavbar() {
    return this._element.closest(Qv) !== null
  }
  _getOffset() {
    const { offset: t } = this._config
    return typeof t == 'string'
      ? t.split(',').map((n) => Number.parseInt(n, 10))
      : typeof t == 'function'
        ? (n) => t(n, this._element)
        : t
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        { name: 'preventOverflow', options: { boundary: this._config.boundary } },
        { name: 'offset', options: { offset: this._getOffset() } }
      ]
    }
    return (
      (this._inNavbar || this._config.display === 'static') &&
        (St.setDataAttribute(this._menu, 'popper', 'static'),
        (t.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
      { ...t, ...Ke(this._config.popperConfig, [t]) }
    )
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = Y.find(Zv, this._menu).filter((s) => Kn(s))
    r.length && Vi(r, n, t === Rl, !r.includes(n)).focus()
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = yt.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
  static clearMenus(t) {
    if (t.button === Fv || (t.type === 'keyup' && t.key !== Il)) return
    const n = Y.find(Xv)
    for (const r of n) {
      const s = yt.getInstance(r)
      if (!s || s._config.autoClose === !1) continue
      const o = t.composedPath(),
        i = o.includes(s._menu)
      if (
        o.includes(s._element) ||
        (s._config.autoClose === 'inside' && !i) ||
        (s._config.autoClose === 'outside' && i) ||
        (s._menu.contains(t.target) &&
          ((t.type === 'keyup' && t.key === Il) ||
            /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue
      const l = { relatedTarget: s._element }
      t.type === 'click' && (l.clickEvent = t), s._completeHide(l)
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName),
      r = t.key === kv,
      s = [zv, Rl].includes(t.key)
    if ((!s && !r) || (n && !r)) return
    t.preventDefault()
    const o = this.matches(sn)
        ? this
        : Y.prev(this, sn)[0] || Y.next(this, sn)[0] || Y.findOne(sn, t.delegateTarget.parentNode),
      i = yt.getOrCreateInstance(o)
    if (s) {
      t.stopPropagation(), i.show(), i._selectMenuItem(t)
      return
    }
    i._isShown() && (t.stopPropagation(), i.hide(), o.focus())
  }
}
S.on(document, Af, sn, yt.dataApiKeydownHandler)
S.on(document, Af, Qr, yt.dataApiKeydownHandler)
S.on(document, Tf, yt.clearMenus)
S.on(document, jv, yt.clearMenus)
S.on(document, Tf, sn, function (e) {
  e.preventDefault(), yt.getOrCreateInstance(this).toggle()
})
it(yt)
const Of = 'backdrop',
  ub = 'fade',
  Pl = 'show',
  Dl = `mousedown.bs.${Of}`,
  fb = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: 'body'
  },
  db = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)'
  }
class wf extends wr {
  constructor(t) {
    super(), (this._config = this._getConfig(t)), (this._isAppended = !1), (this._element = null)
  }
  static get Default() {
    return fb
  }
  static get DefaultType() {
    return db
  }
  static get NAME() {
    return Of
  }
  show(t) {
    if (!this._config.isVisible) {
      Ke(t)
      return
    }
    this._append()
    const n = this._getElement()
    this._config.isAnimated && Or(n),
      n.classList.add(Pl),
      this._emulateAnimation(() => {
        Ke(t)
      })
  }
  hide(t) {
    if (!this._config.isVisible) {
      Ke(t)
      return
    }
    this._getElement().classList.remove(Pl),
      this._emulateAnimation(() => {
        this.dispose(), Ke(t)
      })
  }
  dispose() {
    this._isAppended && (S.off(this._element, Dl), this._element.remove(), (this._isAppended = !1))
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement('div')
      ;(t.className = this._config.className),
        this._config.isAnimated && t.classList.add(ub),
        (this._element = t)
    }
    return this._element
  }
  _configAfterMerge(t) {
    return (t.rootElement = Bt(t.rootElement)), t
  }
  _append() {
    if (this._isAppended) return
    const t = this._getElement()
    this._config.rootElement.append(t),
      S.on(t, Dl, () => {
        Ke(this._config.clickCallback)
      }),
      (this._isAppended = !0)
  }
  _emulateAnimation(t) {
    uf(t, this._getElement(), this._config.isAnimated)
  }
}
const hb = 'focustrap',
  mb = 'bs.focustrap',
  ms = `.${mb}`,
  pb = `focusin${ms}`,
  _b = `keydown.tab${ms}`,
  gb = 'Tab',
  Eb = 'forward',
  $l = 'backward',
  vb = { autofocus: !0, trapElement: null },
  bb = { autofocus: 'boolean', trapElement: 'element' }
class Cf extends wr {
  constructor(t) {
    super(),
      (this._config = this._getConfig(t)),
      (this._isActive = !1),
      (this._lastTabNavDirection = null)
  }
  static get Default() {
    return vb
  }
  static get DefaultType() {
    return bb
  }
  static get NAME() {
    return hb
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      S.off(document, ms),
      S.on(document, pb, (t) => this._handleFocusin(t)),
      S.on(document, _b, (t) => this._handleKeydown(t)),
      (this._isActive = !0))
  }
  deactivate() {
    this._isActive && ((this._isActive = !1), S.off(document, ms))
  }
  _handleFocusin(t) {
    const { trapElement: n } = this._config
    if (t.target === document || t.target === n || n.contains(t.target)) return
    const r = Y.focusableChildren(n)
    r.length === 0
      ? n.focus()
      : this._lastTabNavDirection === $l
        ? r[r.length - 1].focus()
        : r[0].focus()
  }
  _handleKeydown(t) {
    t.key === gb && (this._lastTabNavDirection = t.shiftKey ? $l : Eb)
  }
}
const Ml = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  xl = '.sticky-top',
  Fr = 'padding-right',
  kl = 'margin-right'
class Go {
  constructor() {
    this._element = document.body
  }
  getWidth() {
    const t = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - t)
  }
  hide() {
    const t = this.getWidth()
    this._disableOverFlow(),
      this._setElementAttributes(this._element, Fr, (n) => n + t),
      this._setElementAttributes(Ml, Fr, (n) => n + t),
      this._setElementAttributes(xl, kl, (n) => n - t)
  }
  reset() {
    this._resetElementAttributes(this._element, 'overflow'),
      this._resetElementAttributes(this._element, Fr),
      this._resetElementAttributes(Ml, Fr),
      this._resetElementAttributes(xl, kl)
  }
  isOverflowing() {
    return this.getWidth() > 0
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow'), (this._element.style.overflow = 'hidden')
  }
  _setElementAttributes(t, n, r) {
    const s = this.getWidth(),
      o = (i) => {
        if (i !== this._element && window.innerWidth > i.clientWidth + s) return
        this._saveInitialAttribute(i, n)
        const l = window.getComputedStyle(i).getPropertyValue(n)
        i.style.setProperty(n, `${r(Number.parseFloat(l))}px`)
      }
    this._applyManipulationCallback(t, o)
  }
  _saveInitialAttribute(t, n) {
    const r = t.style.getPropertyValue(n)
    r && St.setDataAttribute(t, n, r)
  }
  _resetElementAttributes(t, n) {
    const r = (s) => {
      const o = St.getDataAttribute(s, n)
      if (o === null) {
        s.style.removeProperty(n)
        return
      }
      St.removeDataAttribute(s, n), s.style.setProperty(n, o)
    }
    this._applyManipulationCallback(t, r)
  }
  _applyManipulationCallback(t, n) {
    if (Nt(t)) {
      n(t)
      return
    }
    for (const r of Y.find(t, this._element)) n(r)
  }
}
const yb = 'modal',
  Tb = 'bs.modal',
  ot = `.${Tb}`,
  Ab = '.data-api',
  Ob = 'Escape',
  wb = `hide${ot}`,
  Cb = `hidePrevented${ot}`,
  Nf = `hidden${ot}`,
  Sf = `show${ot}`,
  Nb = `shown${ot}`,
  Sb = `resize${ot}`,
  Lb = `click.dismiss${ot}`,
  Ib = `mousedown.dismiss${ot}`,
  Rb = `keydown.dismiss${ot}`,
  Pb = `click${ot}${Ab}`,
  zl = 'modal-open',
  Db = 'fade',
  Fl = 'show',
  co = 'modal-static',
  $b = '.modal.show',
  Mb = '.modal-dialog',
  xb = '.modal-body',
  kb = '[data-bs-toggle="modal"]',
  zb = { backdrop: !0, focus: !0, keyboard: !0 },
  Fb = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' }
class Hn extends ht {
  constructor(t, n) {
    super(t, n),
      (this._dialog = Y.findOne(Mb, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new Go()),
      this._addEventListeners()
  }
  static get Default() {
    return zb
  }
  static get DefaultType() {
    return Fb
  }
  static get NAME() {
    return yb
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t)
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      S.trigger(this._element, Sf, { relatedTarget: t }).defaultPrevented ||
      ((this._isShown = !0),
      (this._isTransitioning = !0),
      this._scrollBar.hide(),
      document.body.classList.add(zl),
      this._adjustDialog(),
      this._backdrop.show(() => this._showElement(t)))
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      S.trigger(this._element, wb).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(Fl),
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
  }
  dispose() {
    S.off(window, ot),
      S.off(this._dialog, ot),
      this._backdrop.dispose(),
      this._focustrap.deactivate(),
      super.dispose()
  }
  handleUpdate() {
    this._adjustDialog()
  }
  _initializeBackDrop() {
    return new wf({ isVisible: !!this._config.backdrop, isAnimated: this._isAnimated() })
  }
  _initializeFocusTrap() {
    return new Cf({ trapElement: this._element })
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element),
      (this._element.style.display = 'block'),
      this._element.removeAttribute('aria-hidden'),
      this._element.setAttribute('aria-modal', !0),
      this._element.setAttribute('role', 'dialog'),
      (this._element.scrollTop = 0)
    const n = Y.findOne(xb, this._dialog)
    n && (n.scrollTop = 0), Or(this._element), this._element.classList.add(Fl)
    const r = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        S.trigger(this._element, Nb, { relatedTarget: t })
    }
    this._queueCallback(r, this._dialog, this._isAnimated())
  }
  _addEventListeners() {
    S.on(this._element, Rb, (t) => {
      if (t.key === Ob) {
        if (this._config.keyboard) {
          this.hide()
          return
        }
        this._triggerBackdropTransition()
      }
    }),
      S.on(window, Sb, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog()
      }),
      S.on(this._element, Ib, (t) => {
        S.one(this._element, Lb, (n) => {
          if (!(this._element !== t.target || this._element !== n.target)) {
            if (this._config.backdrop === 'static') {
              this._triggerBackdropTransition()
              return
            }
            this._config.backdrop && this.hide()
          }
        })
      })
  }
  _hideModal() {
    ;(this._element.style.display = 'none'),
      this._element.setAttribute('aria-hidden', !0),
      this._element.removeAttribute('aria-modal'),
      this._element.removeAttribute('role'),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(zl),
          this._resetAdjustments(),
          this._scrollBar.reset(),
          S.trigger(this._element, Nf)
      })
  }
  _isAnimated() {
    return this._element.classList.contains(Db)
  }
  _triggerBackdropTransition() {
    if (S.trigger(this._element, Cb).defaultPrevented) return
    const n = this._element.scrollHeight > document.documentElement.clientHeight,
      r = this._element.style.overflowY
    r === 'hidden' ||
      this._element.classList.contains(co) ||
      (n || (this._element.style.overflowY = 'hidden'),
      this._element.classList.add(co),
      this._queueCallback(() => {
        this._element.classList.remove(co),
          this._queueCallback(() => {
            this._element.style.overflowY = r
          }, this._dialog)
      }, this._dialog),
      this._element.focus())
  }
  _adjustDialog() {
    const t = this._element.scrollHeight > document.documentElement.clientHeight,
      n = this._scrollBar.getWidth(),
      r = n > 0
    if (r && !t) {
      const s = st() ? 'paddingLeft' : 'paddingRight'
      this._element.style[s] = `${n}px`
    }
    if (!r && t) {
      const s = st() ? 'paddingRight' : 'paddingLeft'
      this._element.style[s] = `${n}px`
    }
  }
  _resetAdjustments() {
    ;(this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '')
  }
  static jQueryInterface(t, n) {
    return this.each(function () {
      const r = Hn.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (typeof r[t] > 'u') throw new TypeError(`No method named "${t}"`)
        r[t](n)
      }
    })
  }
}
S.on(document, Pb, kb, function (e) {
  const t = Y.getElementFromSelector(this)
  ;['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
    S.one(t, Sf, (s) => {
      s.defaultPrevented ||
        S.one(t, Nf, () => {
          Kn(this) && this.focus()
        })
    })
  const n = Y.findOne($b)
  n && Hn.getInstance(n).hide(), Hn.getOrCreateInstance(t).toggle(this)
})
ks(Hn)
it(Hn)
const Vb = 'offcanvas',
  Hb = 'bs.offcanvas',
  Pt = `.${Hb}`,
  Lf = '.data-api',
  Ub = `load${Pt}${Lf}`,
  Wb = 'Escape',
  Vl = 'show',
  Hl = 'showing',
  Ul = 'hiding',
  jb = 'offcanvas-backdrop',
  If = '.offcanvas.show',
  Bb = `show${Pt}`,
  Kb = `shown${Pt}`,
  Yb = `hide${Pt}`,
  Wl = `hidePrevented${Pt}`,
  Rf = `hidden${Pt}`,
  Gb = `resize${Pt}`,
  qb = `click${Pt}${Lf}`,
  Xb = `keydown.dismiss${Pt}`,
  Qb = '[data-bs-toggle="offcanvas"]',
  Jb = { backdrop: !0, keyboard: !0, scroll: !1 },
  Zb = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' }
class Yt extends ht {
  constructor(t, n) {
    super(t, n),
      (this._isShown = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      this._addEventListeners()
  }
  static get Default() {
    return Jb
  }
  static get DefaultType() {
    return Zb
  }
  static get NAME() {
    return Vb
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t)
  }
  show(t) {
    if (this._isShown || S.trigger(this._element, Bb, { relatedTarget: t }).defaultPrevented) return
    ;(this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new Go().hide(),
      this._element.setAttribute('aria-modal', !0),
      this._element.setAttribute('role', 'dialog'),
      this._element.classList.add(Hl)
    const r = () => {
      ;(!this._config.scroll || this._config.backdrop) && this._focustrap.activate(),
        this._element.classList.add(Vl),
        this._element.classList.remove(Hl),
        S.trigger(this._element, Kb, { relatedTarget: t })
    }
    this._queueCallback(r, this._element, !0)
  }
  hide() {
    if (!this._isShown || S.trigger(this._element, Yb).defaultPrevented) return
    this._focustrap.deactivate(),
      this._element.blur(),
      (this._isShown = !1),
      this._element.classList.add(Ul),
      this._backdrop.hide()
    const n = () => {
      this._element.classList.remove(Vl, Ul),
        this._element.removeAttribute('aria-modal'),
        this._element.removeAttribute('role'),
        this._config.scroll || new Go().reset(),
        S.trigger(this._element, Rf)
    }
    this._queueCallback(n, this._element, !0)
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === 'static') {
          S.trigger(this._element, Wl)
          return
        }
        this.hide()
      },
      n = !!this._config.backdrop
    return new wf({
      className: jb,
      isVisible: n,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: n ? t : null
    })
  }
  _initializeFocusTrap() {
    return new Cf({ trapElement: this._element })
  }
  _addEventListeners() {
    S.on(this._element, Xb, (t) => {
      if (t.key === Wb) {
        if (this._config.keyboard) {
          this.hide()
          return
        }
        S.trigger(this._element, Wl)
      }
    })
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Yt.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
          throw new TypeError(`No method named "${t}"`)
        n[t](this)
      }
    })
  }
}
S.on(document, qb, Qb, function (e) {
  const t = Y.getElementFromSelector(this)
  if ((['A', 'AREA'].includes(this.tagName) && e.preventDefault(), Kt(this))) return
  S.one(t, Rf, () => {
    Kn(this) && this.focus()
  })
  const n = Y.findOne(If)
  n && n !== t && Yt.getInstance(n).hide(), Yt.getOrCreateInstance(t).toggle(this)
})
S.on(window, Ub, () => {
  for (const e of Y.find(If)) Yt.getOrCreateInstance(e).show()
})
S.on(window, Gb, () => {
  for (const e of Y.find('[aria-modal][class*=show][class*=offcanvas-]'))
    getComputedStyle(e).position !== 'fixed' && Yt.getOrCreateInstance(e).hide()
})
ks(Yt)
it(Yt)
const ey = /^aria-[\w-]*$/i,
  Pf = {
    '*': ['class', 'dir', 'id', 'lang', 'role', ey],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  },
  ty = new Set([
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ]),
  ny = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
  ry = (e, t) => {
    const n = e.nodeName.toLowerCase()
    return t.includes(n)
      ? ty.has(n)
        ? !!ny.test(e.nodeValue)
        : !0
      : t.filter((r) => r instanceof RegExp).some((r) => r.test(n))
  }
function sy(e, t, n) {
  if (!e.length) return e
  if (n && typeof n == 'function') return n(e)
  const s = new window.DOMParser().parseFromString(e, 'text/html'),
    o = [].concat(...s.body.querySelectorAll('*'))
  for (const i of o) {
    const l = i.nodeName.toLowerCase()
    if (!Object.keys(t).includes(l)) {
      i.remove()
      continue
    }
    const a = [].concat(...i.attributes),
      u = [].concat(t['*'] || [], t[l] || [])
    for (const c of a) ry(c, u) || i.removeAttribute(c.nodeName)
  }
  return s.body.innerHTML
}
const oy = 'TemplateFactory',
  iy = {
    allowList: Pf,
    content: {},
    extraClass: '',
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: '<div></div>'
  },
  ay = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  },
  ly = { entry: '(string|element|function|null)', selector: '(string|element)' }
class cy extends wr {
  constructor(t) {
    super(), (this._config = this._getConfig(t))
  }
  static get Default() {
    return iy
  }
  static get DefaultType() {
    return ay
  }
  static get NAME() {
    return oy
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean)
  }
  hasContent() {
    return this.getContent().length > 0
  }
  changeContent(t) {
    return this._checkContent(t), (this._config.content = { ...this._config.content, ...t }), this
  }
  toHtml() {
    const t = document.createElement('div')
    t.innerHTML = this._maybeSanitize(this._config.template)
    for (const [s, o] of Object.entries(this._config.content)) this._setContent(t, o, s)
    const n = t.children[0],
      r = this._resolvePossibleFunction(this._config.extraClass)
    return r && n.classList.add(...r.split(' ')), n
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content)
  }
  _checkContent(t) {
    for (const [n, r] of Object.entries(t)) super._typeCheckConfig({ selector: n, entry: r }, ly)
  }
  _setContent(t, n, r) {
    const s = Y.findOne(r, t)
    if (s) {
      if (((n = this._resolvePossibleFunction(n)), !n)) {
        s.remove()
        return
      }
      if (Nt(n)) {
        this._putElementInTemplate(Bt(n), s)
        return
      }
      if (this._config.html) {
        s.innerHTML = this._maybeSanitize(n)
        return
      }
      s.textContent = n
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize ? sy(t, this._config.allowList, this._config.sanitizeFn) : t
  }
  _resolvePossibleFunction(t) {
    return Ke(t, [this])
  }
  _putElementInTemplate(t, n) {
    if (this._config.html) {
      ;(n.innerHTML = ''), n.append(t)
      return
    }
    n.textContent = t.textContent
  }
}
const uy = 'tooltip',
  fy = new Set(['sanitize', 'allowList', 'sanitizeFn']),
  uo = 'fade',
  dy = 'modal',
  Vr = 'show',
  hy = '.tooltip-inner',
  jl = `.${dy}`,
  Bl = 'hide.bs.modal',
  tr = 'hover',
  fo = 'focus',
  my = 'click',
  py = 'manual',
  _y = 'hide',
  gy = 'hidden',
  Ey = 'show',
  vy = 'shown',
  by = 'inserted',
  yy = 'click',
  Ty = 'focusin',
  Ay = 'focusout',
  Oy = 'mouseenter',
  wy = 'mouseleave',
  Cy = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: st() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: st() ? 'right' : 'left'
  },
  Ny = {
    allowList: Pf,
    animation: !0,
    boundary: 'clippingParents',
    container: !1,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: !1,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template:
      '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: '',
    trigger: 'hover focus'
  },
  Sy = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  }
class Gn extends ht {
  constructor(t, n) {
    if (typeof sf > 'u')
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)")
    super(t, n),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle()
  }
  static get Default() {
    return Ny
  }
  static get DefaultType() {
    return Sy
  }
  static get NAME() {
    return uy
  }
  enable() {
    this._isEnabled = !0
  }
  disable() {
    this._isEnabled = !1
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled
  }
  toggle() {
    if (this._isEnabled) {
      if (((this._activeTrigger.click = !this._activeTrigger.click), this._isShown())) {
        this._leave()
        return
      }
      this._enter()
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      S.off(this._element.closest(jl), Bl, this._hideModalHandler),
      this._element.getAttribute('data-bs-original-title') &&
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title')),
      this._disposePopper(),
      super.dispose()
  }
  show() {
    if (this._element.style.display === 'none')
      throw new Error('Please use show on visible elements')
    if (!(this._isWithContent() && this._isEnabled)) return
    const t = S.trigger(this._element, this.constructor.eventName(Ey)),
      r = (lf(this._element) || this._element.ownerDocument.documentElement).contains(this._element)
    if (t.defaultPrevented || !r) return
    this._disposePopper()
    const s = this._getTipElement()
    this._element.setAttribute('aria-describedby', s.getAttribute('id'))
    const { container: o } = this._config
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) ||
        (o.append(s), S.trigger(this._element, this.constructor.eventName(by))),
      (this._popper = this._createPopper(s)),
      s.classList.add(Vr),
      'ontouchstart' in document.documentElement)
    )
      for (const l of [].concat(...document.body.children)) S.on(l, 'mouseover', ds)
    const i = () => {
      S.trigger(this._element, this.constructor.eventName(vy)),
        this._isHovered === !1 && this._leave(),
        (this._isHovered = !1)
    }
    this._queueCallback(i, this.tip, this._isAnimated())
  }
  hide() {
    if (
      !this._isShown() ||
      S.trigger(this._element, this.constructor.eventName(_y)).defaultPrevented
    )
      return
    if ((this._getTipElement().classList.remove(Vr), 'ontouchstart' in document.documentElement))
      for (const s of [].concat(...document.body.children)) S.off(s, 'mouseover', ds)
    ;(this._activeTrigger[my] = !1),
      (this._activeTrigger[fo] = !1),
      (this._activeTrigger[tr] = !1),
      (this._isHovered = null)
    const r = () => {
      this._isWithActiveTrigger() ||
        (this._isHovered || this._disposePopper(),
        this._element.removeAttribute('aria-describedby'),
        S.trigger(this._element, this.constructor.eventName(gy)))
    }
    this._queueCallback(r, this.tip, this._isAnimated())
  }
  update() {
    this._popper && this._popper.update()
  }
  _isWithContent() {
    return !!this._getTitle()
  }
  _getTipElement() {
    return (
      this.tip ||
        (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
      this.tip
    )
  }
  _createTipElement(t) {
    const n = this._getTemplateFactory(t).toHtml()
    if (!n) return null
    n.classList.remove(uo, Vr), n.classList.add(`bs-${this.constructor.NAME}-auto`)
    const r = mE(this.constructor.NAME).toString()
    return n.setAttribute('id', r), this._isAnimated() && n.classList.add(uo), n
  }
  setContent(t) {
    ;(this._newContent = t), this._isShown() && (this._disposePopper(), this.show())
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new cy({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
          })),
      this._templateFactory
    )
  }
  _getContentForTemplate() {
    return { [hy]: this._getTitle() }
  }
  _getTitle() {
    return (
      this._resolvePossibleFunction(this._config.title) ||
      this._element.getAttribute('data-bs-original-title')
    )
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
  }
  _isAnimated() {
    return this._config.animation || (this.tip && this.tip.classList.contains(uo))
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Vr)
  }
  _createPopper(t) {
    const n = Ke(this._config.placement, [this, t, this._element]),
      r = Cy[n.toUpperCase()]
    return Fi(this._element, t, this._getPopperConfig(r))
  }
  _getOffset() {
    const { offset: t } = this._config
    return typeof t == 'string'
      ? t.split(',').map((n) => Number.parseInt(n, 10))
      : typeof t == 'function'
        ? (n) => t(n, this._element)
        : t
  }
  _resolvePossibleFunction(t) {
    return Ke(t, [this._element])
  }
  _getPopperConfig(t) {
    const n = {
      placement: t,
      modifiers: [
        { name: 'flip', options: { fallbackPlacements: this._config.fallbackPlacements } },
        { name: 'offset', options: { offset: this._getOffset() } },
        { name: 'preventOverflow', options: { boundary: this._config.boundary } },
        { name: 'arrow', options: { element: `.${this.constructor.NAME}-arrow` } },
        {
          name: 'preSetPlacement',
          enabled: !0,
          phase: 'beforeMain',
          fn: (r) => {
            this._getTipElement().setAttribute('data-popper-placement', r.state.placement)
          }
        }
      ]
    }
    return { ...n, ...Ke(this._config.popperConfig, [n]) }
  }
  _setListeners() {
    const t = this._config.trigger.split(' ')
    for (const n of t)
      if (n === 'click')
        S.on(this._element, this.constructor.eventName(yy), this._config.selector, (r) => {
          this._initializeOnDelegatedTarget(r).toggle()
        })
      else if (n !== py) {
        const r = n === tr ? this.constructor.eventName(Oy) : this.constructor.eventName(Ty),
          s = n === tr ? this.constructor.eventName(wy) : this.constructor.eventName(Ay)
        S.on(this._element, r, this._config.selector, (o) => {
          const i = this._initializeOnDelegatedTarget(o)
          ;(i._activeTrigger[o.type === 'focusin' ? fo : tr] = !0), i._enter()
        }),
          S.on(this._element, s, this._config.selector, (o) => {
            const i = this._initializeOnDelegatedTarget(o)
            ;(i._activeTrigger[o.type === 'focusout' ? fo : tr] = i._element.contains(
              o.relatedTarget
            )),
              i._leave()
          })
      }
    ;(this._hideModalHandler = () => {
      this._element && this.hide()
    }),
      S.on(this._element.closest(jl), Bl, this._hideModalHandler)
  }
  _fixTitle() {
    const t = this._element.getAttribute('title')
    t &&
      (!this._element.getAttribute('aria-label') &&
        !this._element.textContent.trim() &&
        this._element.setAttribute('aria-label', t),
      this._element.setAttribute('data-bs-original-title', t),
      this._element.removeAttribute('title'))
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0
      return
    }
    ;(this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show()
      }, this._config.delay.show)
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide()
      }, this._config.delay.hide))
  }
  _setTimeout(t, n) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, n))
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0)
  }
  _getConfig(t) {
    const n = St.getDataAttributes(this._element)
    for (const r of Object.keys(n)) fy.has(r) && delete n[r]
    return (
      (t = { ...n, ...(typeof t == 'object' && t ? t : {}) }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    )
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : Bt(t.container)),
      typeof t.delay == 'number' && (t.delay = { show: t.delay, hide: t.delay }),
      typeof t.title == 'number' && (t.title = t.title.toString()),
      typeof t.content == 'number' && (t.content = t.content.toString()),
      t
    )
  }
  _getDelegateConfig() {
    const t = {}
    for (const [n, r] of Object.entries(this._config))
      this.constructor.Default[n] !== r && (t[n] = r)
    return (t.selector = !1), (t.trigger = 'manual'), t
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)),
      this.tip && (this.tip.remove(), (this.tip = null))
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Gn.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
}
it(Gn)
const Ly = 'popover',
  Iy = '.popover-header',
  Ry = '.popover-body',
  Py = {
    ...Gn.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template:
      '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: 'click'
  },
  Dy = { ...Gn.DefaultType, content: '(null|string|element|function)' }
class Wi extends Gn {
  static get Default() {
    return Py
  }
  static get DefaultType() {
    return Dy
  }
  static get NAME() {
    return Ly
  }
  _isWithContent() {
    return this._getTitle() || this._getContent()
  }
  _getContentForTemplate() {
    return { [Iy]: this._getTitle(), [Ry]: this._getContent() }
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content)
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Wi.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
}
it(Wi)
const $y = 'scrollspy',
  My = 'bs.scrollspy',
  ji = `.${My}`,
  xy = '.data-api',
  ky = `activate${ji}`,
  Kl = `click${ji}`,
  zy = `load${ji}${xy}`,
  Fy = 'dropdown-item',
  bn = 'active',
  Vy = '[data-bs-spy="scroll"]',
  ho = '[href]',
  Hy = '.nav, .list-group',
  Yl = '.nav-link',
  Uy = '.nav-item',
  Wy = '.list-group-item',
  jy = `${Yl}, ${Uy} > ${Yl}, ${Wy}`,
  By = '.dropdown',
  Ky = '.dropdown-toggle',
  Yy = {
    offset: null,
    rootMargin: '0px 0px -25%',
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1]
  },
  Gy = {
    offset: '(number|null)',
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array'
  }
class Vs extends ht {
  constructor(t, n) {
    super(t, n),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement =
        getComputedStyle(this._element).overflowY === 'visible' ? null : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
      this.refresh()
  }
  static get Default() {
    return Yy
  }
  static get DefaultType() {
    return Gy
  }
  static get NAME() {
    return $y
  }
  refresh() {
    this._initializeTargetsAndObservables(),
      this._maybeEnableSmoothScroll(),
      this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver())
    for (const t of this._observableSections.values()) this._observer.observe(t)
  }
  dispose() {
    this._observer.disconnect(), super.dispose()
  }
  _configAfterMerge(t) {
    return (
      (t.target = Bt(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == 'string' &&
        (t.threshold = t.threshold.split(',').map((n) => Number.parseFloat(n))),
      t
    )
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll &&
      (S.off(this._config.target, Kl),
      S.on(this._config.target, Kl, ho, (t) => {
        const n = this._observableSections.get(t.target.hash)
        if (n) {
          t.preventDefault()
          const r = this._rootElement || window,
            s = n.offsetTop - this._element.offsetTop
          if (r.scrollTo) {
            r.scrollTo({ top: s, behavior: 'smooth' })
            return
          }
          r.scrollTop = s
        }
      }))
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    }
    return new IntersectionObserver((n) => this._observerCallback(n), t)
  }
  _observerCallback(t) {
    const n = (i) => this._targetLinks.get(`#${i.target.id}`),
      r = (i) => {
        ;(this._previousScrollData.visibleEntryTop = i.target.offsetTop), this._process(n(i))
      },
      s = (this._rootElement || document.documentElement).scrollTop,
      o = s >= this._previousScrollData.parentScrollTop
    this._previousScrollData.parentScrollTop = s
    for (const i of t) {
      if (!i.isIntersecting) {
        ;(this._activeTarget = null), this._clearActiveClass(n(i))
        continue
      }
      const l = i.target.offsetTop >= this._previousScrollData.visibleEntryTop
      if (o && l) {
        if ((r(i), !s)) return
        continue
      }
      !o && !l && r(i)
    }
  }
  _initializeTargetsAndObservables() {
    ;(this._targetLinks = new Map()), (this._observableSections = new Map())
    const t = Y.find(ho, this._config.target)
    for (const n of t) {
      if (!n.hash || Kt(n)) continue
      const r = Y.findOne(decodeURI(n.hash), this._element)
      Kn(r) &&
        (this._targetLinks.set(decodeURI(n.hash), n), this._observableSections.set(n.hash, r))
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(bn),
      this._activateParents(t),
      S.trigger(this._element, ky, { relatedTarget: t }))
  }
  _activateParents(t) {
    if (t.classList.contains(Fy)) {
      Y.findOne(Ky, t.closest(By)).classList.add(bn)
      return
    }
    for (const n of Y.parents(t, Hy)) for (const r of Y.prev(n, jy)) r.classList.add(bn)
  }
  _clearActiveClass(t) {
    t.classList.remove(bn)
    const n = Y.find(`${ho}.${bn}`, t)
    for (const r of n) r.classList.remove(bn)
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Vs.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
          throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
}
S.on(window, zy, () => {
  for (const e of Y.find(Vy)) Vs.getOrCreateInstance(e)
})
it(Vs)
const qy = 'tab',
  Xy = 'bs.tab',
  En = `.${Xy}`,
  Qy = `hide${En}`,
  Jy = `hidden${En}`,
  Zy = `show${En}`,
  eT = `shown${En}`,
  tT = `click${En}`,
  nT = `keydown${En}`,
  rT = `load${En}`,
  sT = 'ArrowLeft',
  Gl = 'ArrowRight',
  oT = 'ArrowUp',
  ql = 'ArrowDown',
  mo = 'Home',
  Xl = 'End',
  on = 'active',
  Ql = 'fade',
  po = 'show',
  iT = 'dropdown',
  Df = '.dropdown-toggle',
  aT = '.dropdown-menu',
  _o = `:not(${Df})`,
  lT = '.list-group, .nav, [role="tablist"]',
  cT = '.nav-item, .list-group-item',
  uT = `.nav-link${_o}, .list-group-item${_o}, [role="tab"]${_o}`,
  $f = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  go = `${uT}, ${$f}`,
  fT = `.${on}[data-bs-toggle="tab"], .${on}[data-bs-toggle="pill"], .${on}[data-bs-toggle="list"]`
class Un extends ht {
  constructor(t) {
    super(t),
      (this._parent = this._element.closest(lT)),
      this._parent &&
        (this._setInitialAttributes(this._parent, this._getChildren()),
        S.on(this._element, nT, (n) => this._keydown(n)))
  }
  static get NAME() {
    return qy
  }
  show() {
    const t = this._element
    if (this._elemIsActive(t)) return
    const n = this._getActiveElem(),
      r = n ? S.trigger(n, Qy, { relatedTarget: t }) : null
    S.trigger(t, Zy, { relatedTarget: n }).defaultPrevented ||
      (r && r.defaultPrevented) ||
      (this._deactivate(n, t), this._activate(t, n))
  }
  _activate(t, n) {
    if (!t) return
    t.classList.add(on), this._activate(Y.getElementFromSelector(t))
    const r = () => {
      if (t.getAttribute('role') !== 'tab') {
        t.classList.add(po)
        return
      }
      t.removeAttribute('tabindex'),
        t.setAttribute('aria-selected', !0),
        this._toggleDropDown(t, !0),
        S.trigger(t, eT, { relatedTarget: n })
    }
    this._queueCallback(r, t, t.classList.contains(Ql))
  }
  _deactivate(t, n) {
    if (!t) return
    t.classList.remove(on), t.blur(), this._deactivate(Y.getElementFromSelector(t))
    const r = () => {
      if (t.getAttribute('role') !== 'tab') {
        t.classList.remove(po)
        return
      }
      t.setAttribute('aria-selected', !1),
        t.setAttribute('tabindex', '-1'),
        this._toggleDropDown(t, !1),
        S.trigger(t, Jy, { relatedTarget: n })
    }
    this._queueCallback(r, t, t.classList.contains(Ql))
  }
  _keydown(t) {
    if (![sT, Gl, oT, ql, mo, Xl].includes(t.key)) return
    t.stopPropagation(), t.preventDefault()
    const n = this._getChildren().filter((s) => !Kt(s))
    let r
    if ([mo, Xl].includes(t.key)) r = n[t.key === mo ? 0 : n.length - 1]
    else {
      const s = [Gl, ql].includes(t.key)
      r = Vi(n, t.target, s, !0)
    }
    r && (r.focus({ preventScroll: !0 }), Un.getOrCreateInstance(r).show())
  }
  _getChildren() {
    return Y.find(go, this._parent)
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null
  }
  _setInitialAttributes(t, n) {
    this._setAttributeIfNotExists(t, 'role', 'tablist')
    for (const r of n) this._setInitialAttributesOnChild(r)
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t)
    const n = this._elemIsActive(t),
      r = this._getOuterElement(t)
    t.setAttribute('aria-selected', n),
      r !== t && this._setAttributeIfNotExists(r, 'role', 'presentation'),
      n || t.setAttribute('tabindex', '-1'),
      this._setAttributeIfNotExists(t, 'role', 'tab'),
      this._setInitialAttributesOnTargetPanel(t)
  }
  _setInitialAttributesOnTargetPanel(t) {
    const n = Y.getElementFromSelector(t)
    n &&
      (this._setAttributeIfNotExists(n, 'role', 'tabpanel'),
      t.id && this._setAttributeIfNotExists(n, 'aria-labelledby', `${t.id}`))
  }
  _toggleDropDown(t, n) {
    const r = this._getOuterElement(t)
    if (!r.classList.contains(iT)) return
    const s = (o, i) => {
      const l = Y.findOne(o, r)
      l && l.classList.toggle(i, n)
    }
    s(Df, on), s(aT, po), r.setAttribute('aria-expanded', n)
  }
  _setAttributeIfNotExists(t, n, r) {
    t.hasAttribute(n) || t.setAttribute(n, r)
  }
  _elemIsActive(t) {
    return t.classList.contains(on)
  }
  _getInnerElement(t) {
    return t.matches(go) ? t : Y.findOne(go, t)
  }
  _getOuterElement(t) {
    return t.closest(cT) || t
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Un.getOrCreateInstance(this)
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
          throw new TypeError(`No method named "${t}"`)
        n[t]()
      }
    })
  }
}
S.on(document, tT, $f, function (e) {
  ;['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
    !Kt(this) && Un.getOrCreateInstance(this).show()
})
S.on(window, rT, () => {
  for (const e of Y.find(fT)) Un.getOrCreateInstance(e)
})
it(Un)
const dT = 'toast',
  hT = 'bs.toast',
  Jt = `.${hT}`,
  mT = `mouseover${Jt}`,
  pT = `mouseout${Jt}`,
  _T = `focusin${Jt}`,
  gT = `focusout${Jt}`,
  ET = `hide${Jt}`,
  vT = `hidden${Jt}`,
  bT = `show${Jt}`,
  yT = `shown${Jt}`,
  TT = 'fade',
  Jl = 'hide',
  Hr = 'show',
  Ur = 'showing',
  AT = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
  OT = { animation: !0, autohide: !0, delay: 5e3 }
class Hs extends ht {
  constructor(t, n) {
    super(t, n),
      (this._timeout = null),
      (this._hasMouseInteraction = !1),
      (this._hasKeyboardInteraction = !1),
      this._setListeners()
  }
  static get Default() {
    return OT
  }
  static get DefaultType() {
    return AT
  }
  static get NAME() {
    return dT
  }
  show() {
    if (S.trigger(this._element, bT).defaultPrevented) return
    this._clearTimeout(), this._config.animation && this._element.classList.add(TT)
    const n = () => {
      this._element.classList.remove(Ur), S.trigger(this._element, yT), this._maybeScheduleHide()
    }
    this._element.classList.remove(Jl),
      Or(this._element),
      this._element.classList.add(Hr, Ur),
      this._queueCallback(n, this._element, this._config.animation)
  }
  hide() {
    if (!this.isShown() || S.trigger(this._element, ET).defaultPrevented) return
    const n = () => {
      this._element.classList.add(Jl),
        this._element.classList.remove(Ur, Hr),
        S.trigger(this._element, vT)
    }
    this._element.classList.add(Ur), this._queueCallback(n, this._element, this._config.animation)
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Hr), super.dispose()
  }
  isShown() {
    return this._element.classList.contains(Hr)
  }
  _maybeScheduleHide() {
    this._config.autohide &&
      (this._hasMouseInteraction ||
        this._hasKeyboardInteraction ||
        (this._timeout = setTimeout(() => {
          this.hide()
        }, this._config.delay)))
  }
  _onInteraction(t, n) {
    switch (t.type) {
      case 'mouseover':
      case 'mouseout': {
        this._hasMouseInteraction = n
        break
      }
      case 'focusin':
      case 'focusout': {
        this._hasKeyboardInteraction = n
        break
      }
    }
    if (n) {
      this._clearTimeout()
      return
    }
    const r = t.relatedTarget
    this._element === r || this._element.contains(r) || this._maybeScheduleHide()
  }
  _setListeners() {
    S.on(this._element, mT, (t) => this._onInteraction(t, !0)),
      S.on(this._element, pT, (t) => this._onInteraction(t, !1)),
      S.on(this._element, _T, (t) => this._onInteraction(t, !0)),
      S.on(this._element, gT, (t) => this._onInteraction(t, !1))
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null)
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Hs.getOrCreateInstance(this, t)
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
        n[t](this)
      }
    })
  }
}
ks(Hs)
it(Hs)
const Us = em(yg)
Us.use(rr)
Us.use(yi)
Us.use(Og())
Us.mount('#app')
export {
  vt as A,
  gi as B,
  Ls as C,
  ci as D,
  bc as E,
  ST as F,
  Oc as G,
  yh as H,
  IT as I,
  PT as J,
  LT as K,
  DT as L,
  Hn as M,
  us as N,
  RT as T,
  fu as _,
  G as a,
  Re as b,
  In as c,
  It as d,
  ct as e,
  Dc as f,
  cn as g,
  ys as h,
  gh as i,
  NT as j,
  we as k,
  bh as l,
  ii as m,
  vs as n,
  un as o,
  Pc as p,
  Fc as q,
  br as r,
  Ie as s,
  CT as t,
  Ds as u,
  Kr as v,
  Nd as w,
  De as x,
  jd as y,
  wT as z
}
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = [
      'assets/SimpleForm-7W1Q4k1G.js',
      'assets/TextInput-dcat6doo.js',
      'assets/TextInput-uxAxI9Ai.css',
      'assets/SimpleForm-4hIpV81J.css',
      'assets/TipCalculator-dwOFPs7d.js',
      'assets/ModalForm-aP3a_nNn.js',
      'assets/ModalForm-8_G6YoYg.css',
      'assets/TipCalculator-Udgn_6rw.css',
      'assets/ModalsView-_bcU2bwM.js',
      'assets/ModalsView-UKsworJ6.css'
    ]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
