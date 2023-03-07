;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i)
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === 'childList')
        for (const o of r.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const r = {}
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : i.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    )
  }
  function s(i) {
    if (i.ep) return
    i.ep = !0
    const r = n(i)
    fetch(i.href, r)
  }
})()
function gs(e, t) {
  const n = Object.create(null),
    s = e.split(',')
  for (let i = 0; i < s.length; i++) n[s[i]] = !0
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i]
}
function ms(e) {
  if (V(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        i = de(s) ? eo(s) : ms(s)
      if (i) for (const r in i) t[r] = i[r]
    }
    return t
  } else {
    if (de(e)) return e
    if (oe(e)) return e
  }
}
const Zr = /;(?![^(]*\))/g,
  Qr = /:([^]+)/,
  Jr = /\/\*.*?\*\//gs
function eo(e) {
  const t = {}
  return (
    e
      .replace(Jr, '')
      .split(Zr)
      .forEach((n) => {
        if (n) {
          const s = n.split(Qr)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function vn(e) {
  let t = ''
  if (de(e)) t = e
  else if (V(e))
    for (let n = 0; n < e.length; n++) {
      const s = vn(e[n])
      s && (t += s + ' ')
    }
  else if (oe(e)) for (const n in e) e[n] && (t += n + ' ')
  return t.trim()
}
const to = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  no = gs(to)
function Bi(e) {
  return !!e || e === ''
}
const ue = (e) =>
    de(e)
      ? e
      : e == null
      ? ''
      : V(e) || (oe(e) && (e.toString === Ai || !U(e.toString)))
      ? JSON.stringify(e, Ii, 2)
      : String(e),
  Ii = (e, t) =>
    t && t.__v_isRef
      ? Ii(e, t.value)
      : wt(t)
      ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, i]) => ((n[`${s} =>`] = i), n), {}) }
      : Oi(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : oe(t) && !V(t) && !$i(t)
      ? String(t)
      : t,
  re = {},
  xt = [],
  $e = () => {},
  so = () => !1,
  io = /^on[^a-z]/,
  _n = (e) => io.test(e),
  vs = (e) => e.startsWith('onUpdate:'),
  ge = Object.assign,
  _s = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  ro = Object.prototype.hasOwnProperty,
  Y = (e, t) => ro.call(e, t),
  V = Array.isArray,
  wt = (e) => bn(e) === '[object Map]',
  Oi = (e) => bn(e) === '[object Set]',
  U = (e) => typeof e == 'function',
  de = (e) => typeof e == 'string',
  bs = (e) => typeof e == 'symbol',
  oe = (e) => e !== null && typeof e == 'object',
  Li = (e) => oe(e) && U(e.then) && U(e.catch),
  Ai = Object.prototype.toString,
  bn = (e) => Ai.call(e),
  oo = (e) => bn(e).slice(8, -1),
  $i = (e) => bn(e) === '[object Object]',
  ys = (e) => de(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  rn = gs(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  yn = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  lo = /-(\w)/g,
  Re = yn((e) => e.replace(lo, (t, n) => (n ? n.toUpperCase() : ''))),
  ao = /\B([A-Z])/g,
  It = yn((e) => e.replace(ao, '-$1').toLowerCase()),
  Sn = yn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  kn = yn((e) => (e ? `on${Sn(e)}` : '')),
  Dt = (e, t) => !Object.is(e, t),
  Nn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  dn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  co = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Us
const uo = () =>
  Us ||
  (Us =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {})
let Ie
class ki {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ie),
      !t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Ie
      try {
        return (Ie = this), t()
      } finally {
        Ie = n
      }
    }
  }
  on() {
    Ie = this
  }
  off() {
    Ie = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (this.scopes) for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop()
        i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function fo(e) {
  return new ki(e)
}
function po(e, t = Ie) {
  t && t.active && t.effects.push(e)
}
function ho() {
  return Ie
}
const Ss = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  Ni = (e) => (e.w & nt) > 0,
  Hi = (e) => (e.n & nt) > 0,
  go = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= nt
  },
  mo = (e) => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let s = 0; s < t.length; s++) {
        const i = t[s]
        Ni(i) && !Hi(i) ? i.delete(e) : (t[n++] = i), (i.w &= ~nt), (i.n &= ~nt)
      }
      t.length = n
    }
  },
  Yn = new WeakMap()
let Nt = 0,
  nt = 1
const Xn = 30
let Le
const ft = Symbol(''),
  Zn = Symbol('')
class Cs {
  constructor(t, n = null, s) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      po(this, s)
  }
  run() {
    if (!this.active) return this.fn()
    let t = Le,
      n = et
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = Le),
        (Le = this),
        (et = !0),
        (nt = 1 << ++Nt),
        Nt <= Xn ? go(this) : qs(this),
        this.fn()
      )
    } finally {
      Nt <= Xn && mo(this),
        (nt = 1 << --Nt),
        (Le = this.parent),
        (et = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    Le === this
      ? (this.deferStop = !0)
      : this.active && (qs(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function qs(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let et = !0
const zi = []
function Ot() {
  zi.push(et), (et = !1)
}
function Lt() {
  const e = zi.pop()
  et = e === void 0 ? !0 : e
}
function ye(e, t, n) {
  if (et && Le) {
    let s = Yn.get(e)
    s || Yn.set(e, (s = new Map()))
    let i = s.get(n)
    i || s.set(n, (i = Ss())), Di(i)
  }
}
function Di(e, t) {
  let n = !1
  Nt <= Xn ? Hi(e) || ((e.n |= nt), (n = !Ni(e))) : (n = !e.has(Le)),
    n && (e.add(Le), Le.deps.push(e))
}
function Ke(e, t, n, s, i, r) {
  const o = Yn.get(e)
  if (!o) return
  let l = []
  if (t === 'clear') l = [...o.values()]
  else if (n === 'length' && V(e)) {
    const a = Number(s)
    o.forEach((c, u) => {
      ;(u === 'length' || u >= a) && l.push(c)
    })
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case 'add':
        V(e) ? ys(n) && l.push(o.get('length')) : (l.push(o.get(ft)), wt(e) && l.push(o.get(Zn)))
        break
      case 'delete':
        V(e) || (l.push(o.get(ft)), wt(e) && l.push(o.get(Zn)))
        break
      case 'set':
        wt(e) && l.push(o.get(ft))
        break
    }
  if (l.length === 1) l[0] && Qn(l[0])
  else {
    const a = []
    for (const c of l) c && a.push(...c)
    Qn(Ss(a))
  }
}
function Qn(e, t) {
  const n = V(e) ? e : [...e]
  for (const s of n) s.computed && Ks(s)
  for (const s of n) s.computed || Ks(s)
}
function Ks(e, t) {
  ;(e !== Le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const vo = gs('__proto__,__v_isRef,__isVue'),
  Fi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(bs),
  ),
  _o = xs(),
  bo = xs(!1, !0),
  yo = xs(!0),
  Ys = So()
function So() {
  const e = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const s = Z(this)
        for (let r = 0, o = this.length; r < o; r++) ye(s, 'get', r + '')
        const i = s[t](...n)
        return i === -1 || i === !1 ? s[t](...n.map(Z)) : i
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        Ot()
        const s = Z(this)[t].apply(this, n)
        return Lt(), s
      }
    }),
    e
  )
}
function Co(e) {
  const t = Z(this)
  return ye(t, 'has', e), t.hasOwnProperty(e)
}
function xs(e = !1, t = !1) {
  return function (s, i, r) {
    if (i === '__v_isReactive') return !e
    if (i === '__v_isReadonly') return e
    if (i === '__v_isShallow') return t
    if (i === '__v_raw' && r === (e ? (t ? zo : Wi) : t ? Vi : Ri).get(s)) return s
    const o = V(s)
    if (!e) {
      if (o && Y(Ys, i)) return Reflect.get(Ys, i, r)
      if (i === 'hasOwnProperty') return Co
    }
    const l = Reflect.get(s, i, r)
    return (bs(i) ? Fi.has(i) : vo(i)) || (e || ye(s, 'get', i), t)
      ? l
      : he(l)
      ? o && ys(i)
        ? l
        : l.value
      : oe(l)
      ? e
        ? Ui(l)
        : xn(l)
      : l
  }
}
const xo = ji(),
  wo = ji(!0)
function ji(e = !1) {
  return function (n, s, i, r) {
    let o = n[s]
    if (Mt(o) && he(o) && !he(i)) return !1
    if (!e && (!fn(i) && !Mt(i) && ((o = Z(o)), (i = Z(i))), !V(n) && he(o) && !he(i)))
      return (o.value = i), !0
    const l = V(n) && ys(s) ? Number(s) < n.length : Y(n, s),
      a = Reflect.set(n, s, i, r)
    return n === Z(r) && (l ? Dt(i, o) && Ke(n, 'set', s, i) : Ke(n, 'add', s, i)), a
  }
}
function To(e, t) {
  const n = Y(e, t)
  e[t]
  const s = Reflect.deleteProperty(e, t)
  return s && n && Ke(e, 'delete', t, void 0), s
}
function Eo(e, t) {
  const n = Reflect.has(e, t)
  return (!bs(t) || !Fi.has(t)) && ye(e, 'has', t), n
}
function Po(e) {
  return ye(e, 'iterate', V(e) ? 'length' : ft), Reflect.ownKeys(e)
}
const Gi = { get: _o, set: xo, deleteProperty: To, has: Eo, ownKeys: Po },
  Mo = {
    get: yo,
    set(e, t) {
      return !0
    },
    deleteProperty(e, t) {
      return !0
    },
  },
  Bo = ge({}, Gi, { get: bo, set: wo }),
  ws = (e) => e,
  Cn = (e) => Reflect.getPrototypeOf(e)
function Xt(e, t, n = !1, s = !1) {
  e = e.__v_raw
  const i = Z(e),
    r = Z(t)
  n || (t !== r && ye(i, 'get', t), ye(i, 'get', r))
  const { has: o } = Cn(i),
    l = s ? ws : n ? Ps : Ft
  if (o.call(i, t)) return l(e.get(t))
  if (o.call(i, r)) return l(e.get(r))
  e !== i && e.get(t)
}
function Zt(e, t = !1) {
  const n = this.__v_raw,
    s = Z(n),
    i = Z(e)
  return (
    t || (e !== i && ye(s, 'has', e), ye(s, 'has', i)), e === i ? n.has(e) : n.has(e) || n.has(i)
  )
}
function Qt(e, t = !1) {
  return (e = e.__v_raw), !t && ye(Z(e), 'iterate', ft), Reflect.get(e, 'size', e)
}
function Xs(e) {
  e = Z(e)
  const t = Z(this)
  return Cn(t).has.call(t, e) || (t.add(e), Ke(t, 'add', e, e)), this
}
function Zs(e, t) {
  t = Z(t)
  const n = Z(this),
    { has: s, get: i } = Cn(n)
  let r = s.call(n, e)
  r || ((e = Z(e)), (r = s.call(n, e)))
  const o = i.call(n, e)
  return n.set(e, t), r ? Dt(t, o) && Ke(n, 'set', e, t) : Ke(n, 'add', e, t), this
}
function Qs(e) {
  const t = Z(this),
    { has: n, get: s } = Cn(t)
  let i = n.call(t, e)
  i || ((e = Z(e)), (i = n.call(t, e))), s && s.call(t, e)
  const r = t.delete(e)
  return i && Ke(t, 'delete', e, void 0), r
}
function Js() {
  const e = Z(this),
    t = e.size !== 0,
    n = e.clear()
  return t && Ke(e, 'clear', void 0, void 0), n
}
function Jt(e, t) {
  return function (s, i) {
    const r = this,
      o = r.__v_raw,
      l = Z(o),
      a = t ? ws : e ? Ps : Ft
    return !e && ye(l, 'iterate', ft), o.forEach((c, u) => s.call(i, a(c), a(u), r))
  }
}
function en(e, t, n) {
  return function (...s) {
    const i = this.__v_raw,
      r = Z(i),
      o = wt(r),
      l = e === 'entries' || (e === Symbol.iterator && o),
      a = e === 'keys' && o,
      c = i[e](...s),
      u = n ? ws : t ? Ps : Ft
    return (
      !t && ye(r, 'iterate', a ? Zn : ft),
      {
        next() {
          const { value: d, done: h } = c.next()
          return h ? { value: d, done: h } : { value: l ? [u(d[0]), u(d[1])] : u(d), done: h }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function Xe(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this
  }
}
function Io() {
  const e = {
      get(r) {
        return Xt(this, r)
      },
      get size() {
        return Qt(this)
      },
      has: Zt,
      add: Xs,
      set: Zs,
      delete: Qs,
      clear: Js,
      forEach: Jt(!1, !1),
    },
    t = {
      get(r) {
        return Xt(this, r, !1, !0)
      },
      get size() {
        return Qt(this)
      },
      has: Zt,
      add: Xs,
      set: Zs,
      delete: Qs,
      clear: Js,
      forEach: Jt(!1, !0),
    },
    n = {
      get(r) {
        return Xt(this, r, !0)
      },
      get size() {
        return Qt(this, !0)
      },
      has(r) {
        return Zt.call(this, r, !0)
      },
      add: Xe('add'),
      set: Xe('set'),
      delete: Xe('delete'),
      clear: Xe('clear'),
      forEach: Jt(!0, !1),
    },
    s = {
      get(r) {
        return Xt(this, r, !0, !0)
      },
      get size() {
        return Qt(this, !0)
      },
      has(r) {
        return Zt.call(this, r, !0)
      },
      add: Xe('add'),
      set: Xe('set'),
      delete: Xe('delete'),
      clear: Xe('clear'),
      forEach: Jt(!0, !0),
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      ;(e[r] = en(r, !1, !1)),
        (n[r] = en(r, !0, !1)),
        (t[r] = en(r, !1, !0)),
        (s[r] = en(r, !0, !0))
    }),
    [e, n, t, s]
  )
}
const [Oo, Lo, Ao, $o] = Io()
function Ts(e, t) {
  const n = t ? (e ? $o : Ao) : e ? Lo : Oo
  return (s, i, r) =>
    i === '__v_isReactive'
      ? !e
      : i === '__v_isReadonly'
      ? e
      : i === '__v_raw'
      ? s
      : Reflect.get(Y(n, i) && i in s ? n : s, i, r)
}
const ko = { get: Ts(!1, !1) },
  No = { get: Ts(!1, !0) },
  Ho = { get: Ts(!0, !1) },
  Ri = new WeakMap(),
  Vi = new WeakMap(),
  Wi = new WeakMap(),
  zo = new WeakMap()
function Do(e) {
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
function Fo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Do(oo(e))
}
function xn(e) {
  return Mt(e) ? e : Es(e, !1, Gi, ko, Ri)
}
function jo(e) {
  return Es(e, !1, Bo, No, Vi)
}
function Ui(e) {
  return Es(e, !0, Mo, Ho, Wi)
}
function Es(e, t, n, s, i) {
  if (!oe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const r = i.get(e)
  if (r) return r
  const o = Fo(e)
  if (o === 0) return e
  const l = new Proxy(e, o === 2 ? s : n)
  return i.set(e, l), l
}
function Tt(e) {
  return Mt(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Mt(e) {
  return !!(e && e.__v_isReadonly)
}
function fn(e) {
  return !!(e && e.__v_isShallow)
}
function qi(e) {
  return Tt(e) || Mt(e)
}
function Z(e) {
  const t = e && e.__v_raw
  return t ? Z(t) : e
}
function Ki(e) {
  return dn(e, '__v_skip', !0), e
}
const Ft = (e) => (oe(e) ? xn(e) : e),
  Ps = (e) => (oe(e) ? Ui(e) : e)
function Yi(e) {
  et && Le && ((e = Z(e)), Di(e.dep || (e.dep = Ss())))
}
function Xi(e, t) {
  e = Z(e)
  const n = e.dep
  n && Qn(n)
}
function he(e) {
  return !!(e && e.__v_isRef === !0)
}
function _e(e) {
  return Go(e, !1)
}
function Go(e, t) {
  return he(e) ? e : new Ro(e, t)
}
class Ro {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Z(t)),
      (this._value = n ? t : Ft(t))
  }
  get value() {
    return Yi(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || fn(t) || Mt(t)
    ;(t = n ? t : Z(t)),
      Dt(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Ft(t)), Xi(this))
  }
}
function Vo(e) {
  return he(e) ? e.value : e
}
const Wo = {
  get: (e, t, n) => Vo(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t]
    return he(i) && !he(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function Zi(e) {
  return Tt(e) ? e : new Proxy(e, Wo)
}
var Qi
class Uo {
  constructor(t, n, s, i) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Qi] = !1),
      (this._dirty = !0),
      (this.effect = new Cs(t, () => {
        this._dirty || ((this._dirty = !0), Xi(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = Z(this)
    return (
      Yi(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
Qi = '__v_isReadonly'
function qo(e, t, n = !1) {
  let s, i
  const r = U(e)
  return r ? ((s = e), (i = $e)) : ((s = e.get), (i = e.set)), new Uo(s, i, r || !i, n)
}
function tt(e, t, n, s) {
  let i
  try {
    i = s ? e(...s) : e()
  } catch (r) {
    wn(r, t, n)
  }
  return i
}
function Me(e, t, n, s) {
  if (U(e)) {
    const r = tt(e, t, n, s)
    return (
      r &&
        Li(r) &&
        r.catch((o) => {
          wn(o, t, n)
        }),
      r
    )
  }
  const i = []
  for (let r = 0; r < e.length; r++) i.push(Me(e[r], t, n, s))
  return i
}
function wn(e, t, n, s = !0) {
  const i = t ? t.vnode : null
  if (t) {
    let r = t.parent
    const o = t.proxy,
      l = n
    for (; r; ) {
      const c = r.ec
      if (c) {
        for (let u = 0; u < c.length; u++) if (c[u](e, o, l) === !1) return
      }
      r = r.parent
    }
    const a = t.appContext.config.errorHandler
    if (a) {
      tt(a, null, 10, [e, o, l])
      return
    }
  }
  Ko(e, n, i, s)
}
function Ko(e, t, n, s = !0) {
  console.error(e)
}
let jt = !1,
  Jn = !1
const pe = []
let je = 0
const Et = []
let Ue = null,
  ct = 0
const Ji = Promise.resolve()
let Ms = null
function er(e) {
  const t = Ms || Ji
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Yo(e) {
  let t = je + 1,
    n = pe.length
  for (; t < n; ) {
    const s = (t + n) >>> 1
    Gt(pe[s]) < e ? (t = s + 1) : (n = s)
  }
  return t
}
function Bs(e) {
  ;(!pe.length || !pe.includes(e, jt && e.allowRecurse ? je + 1 : je)) &&
    (e.id == null ? pe.push(e) : pe.splice(Yo(e.id), 0, e), tr())
}
function tr() {
  !jt && !Jn && ((Jn = !0), (Ms = Ji.then(sr)))
}
function Xo(e) {
  const t = pe.indexOf(e)
  t > je && pe.splice(t, 1)
}
function Zo(e) {
  V(e) ? Et.push(...e) : (!Ue || !Ue.includes(e, e.allowRecurse ? ct + 1 : ct)) && Et.push(e), tr()
}
function ei(e, t = jt ? je + 1 : 0) {
  for (; t < pe.length; t++) {
    const n = pe[t]
    n && n.pre && (pe.splice(t, 1), t--, n())
  }
}
function nr(e) {
  if (Et.length) {
    const t = [...new Set(Et)]
    if (((Et.length = 0), Ue)) {
      Ue.push(...t)
      return
    }
    for (Ue = t, Ue.sort((n, s) => Gt(n) - Gt(s)), ct = 0; ct < Ue.length; ct++) Ue[ct]()
    ;(Ue = null), (ct = 0)
  }
}
const Gt = (e) => (e.id == null ? 1 / 0 : e.id),
  Qo = (e, t) => {
    const n = Gt(e) - Gt(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function sr(e) {
  ;(Jn = !1), (jt = !0), pe.sort(Qo)
  const t = $e
  try {
    for (je = 0; je < pe.length; je++) {
      const n = pe[je]
      n && n.active !== !1 && tt(n, null, 14)
    }
  } finally {
    ;(je = 0), (pe.length = 0), nr(), (jt = !1), (Ms = null), (pe.length || Et.length) && sr()
  }
}
function Jo(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || re
  let i = n
  const r = t.startsWith('update:'),
    o = r && t.slice(7)
  if (o && o in s) {
    const u = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: d, trim: h } = s[u] || re
    h && (i = n.map((m) => (de(m) ? m.trim() : m))), d && (i = n.map(co))
  }
  let l,
    a = s[(l = kn(t))] || s[(l = kn(Re(t)))]
  !a && r && (a = s[(l = kn(It(t)))]), a && Me(a, e, 6, i)
  const c = s[l + 'Once']
  if (c) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[l]) return
    ;(e.emitted[l] = !0), Me(c, e, 6, i)
  }
}
function ir(e, t, n = !1) {
  const s = t.emitsCache,
    i = s.get(e)
  if (i !== void 0) return i
  const r = e.emits
  let o = {},
    l = !1
  if (!U(e)) {
    const a = (c) => {
      const u = ir(c, t, !0)
      u && ((l = !0), ge(o, u))
    }
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a)
  }
  return !r && !l
    ? (oe(e) && s.set(e, null), null)
    : (V(r) ? r.forEach((a) => (o[a] = null)) : ge(o, r), oe(e) && s.set(e, o), o)
}
function Tn(e, t) {
  return !e || !_n(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, It(t)) || Y(e, t))
}
let Pe = null,
  rr = null
function pn(e) {
  const t = Pe
  return (Pe = e), (rr = (e && e.type.__scopeId) || null), t
}
function es(e, t = Pe, n) {
  if (!t || e._n) return e
  const s = (...i) => {
    s._d && ui(-1)
    const r = pn(t)
    let o
    try {
      o = e(...i)
    } finally {
      pn(r), s._d && ui(1)
    }
    return o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function Hn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: r,
    propsOptions: [o],
    slots: l,
    attrs: a,
    emit: c,
    render: u,
    renderCache: d,
    data: h,
    setupState: m,
    ctx: y,
    inheritAttrs: v,
  } = e
  let x, p
  const b = pn(e)
  try {
    if (n.shapeFlag & 4) {
      const E = i || s
      ;(x = Fe(u.call(E, E, d, r, m, h, y))), (p = a)
    } else {
      const E = t
      ;(x = Fe(E.length > 1 ? E(r, { attrs: a, slots: l, emit: c }) : E(r, null))),
        (p = t.props ? a : el(a))
    }
  } catch (E) {
    ;(zt.length = 0), wn(E, e, 1), (x = W(qe))
  }
  let _ = x
  if (p && v !== !1) {
    const E = Object.keys(p),
      { shapeFlag: A } = _
    E.length && A & 7 && (o && E.some(vs) && (p = tl(p, o)), (_ = st(_, p)))
  }
  return (
    n.dirs && ((_ = st(_)), (_.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (_.transition = n.transition),
    (x = _),
    pn(b),
    x
  )
}
const el = (e) => {
    let t
    for (const n in e) (n === 'class' || n === 'style' || _n(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  tl = (e, t) => {
    const n = {}
    for (const s in e) (!vs(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function nl(e, t, n) {
  const { props: s, children: i, component: r } = e,
    { props: o, children: l, patchFlag: a } = t,
    c = r.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && a >= 0) {
    if (a & 1024) return !0
    if (a & 16) return s ? ti(s, o, c) : !!o
    if (a & 8) {
      const u = t.dynamicProps
      for (let d = 0; d < u.length; d++) {
        const h = u[d]
        if (o[h] !== s[h] && !Tn(c, h)) return !0
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? (o ? ti(s, o, c) : !0) : !!o
  return !1
}
function ti(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let i = 0; i < s.length; i++) {
    const r = s[i]
    if (t[r] !== e[r] && !Tn(n, r)) return !0
  }
  return !1
}
function sl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const il = (e) => e.__isSuspense
function rl(e, t) {
  t && t.pendingBranch ? (V(e) ? t.effects.push(...e) : t.effects.push(e)) : Zo(e)
}
function Is(e, t) {
  if (ae) {
    let n = ae.provides
    const s = ae.parent && ae.parent.provides
    s === n && (n = ae.provides = Object.create(s)), (n[e] = t)
  }
}
function on(e, t, n = !1) {
  const s = ae || Pe
  if (s) {
    const i =
      s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides
    if (i && e in i) return i[e]
    if (arguments.length > 1) return n && U(t) ? t.call(s.proxy) : t
  }
}
const tn = {}
function Pt(e, t, n) {
  return or(e, t, n)
}
function or(e, t, { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: o } = re) {
  const l = ho() === (ae == null ? void 0 : ae.scope) ? ae : null
  let a,
    c = !1,
    u = !1
  if (
    (he(e)
      ? ((a = () => e.value), (c = fn(e)))
      : Tt(e)
      ? ((a = () => e), (s = !0))
      : V(e)
      ? ((u = !0),
        (c = e.some((_) => Tt(_) || fn(_))),
        (a = () =>
          e.map((_) => {
            if (he(_)) return _.value
            if (Tt(_)) return Ct(_)
            if (U(_)) return tt(_, l, 2)
          })))
      : U(e)
      ? t
        ? (a = () => tt(e, l, 2))
        : (a = () => {
            if (!(l && l.isUnmounted)) return d && d(), Me(e, l, 3, [h])
          })
      : (a = $e),
    t && s)
  ) {
    const _ = a
    a = () => Ct(_())
  }
  let d,
    h = (_) => {
      d = p.onStop = () => {
        tt(_, l, 4)
      }
    },
    m
  if (Vt)
    if (((h = $e), t ? n && Me(t, l, 3, [a(), u ? [] : void 0, h]) : a(), i === 'sync')) {
      const _ = ea()
      m = _.__watcherHandles || (_.__watcherHandles = [])
    } else return $e
  let y = u ? new Array(e.length).fill(tn) : tn
  const v = () => {
    if (p.active)
      if (t) {
        const _ = p.run()
        ;(s || c || (u ? _.some((E, A) => Dt(E, y[A])) : Dt(_, y))) &&
          (d && d(), Me(t, l, 3, [_, y === tn ? void 0 : u && y[0] === tn ? [] : y, h]), (y = _))
      } else p.run()
  }
  v.allowRecurse = !!t
  let x
  i === 'sync'
    ? (x = v)
    : i === 'post'
    ? (x = () => be(v, l && l.suspense))
    : ((v.pre = !0), l && (v.id = l.uid), (x = () => Bs(v)))
  const p = new Cs(a, x)
  t ? (n ? v() : (y = p.run())) : i === 'post' ? be(p.run.bind(p), l && l.suspense) : p.run()
  const b = () => {
    p.stop(), l && l.scope && _s(l.scope.effects, p)
  }
  return m && m.push(b), b
}
function ol(e, t, n) {
  const s = this.proxy,
    i = de(e) ? (e.includes('.') ? lr(s, e) : () => s[e]) : e.bind(s, s)
  let r
  U(t) ? (r = t) : ((r = t.handler), (n = t))
  const o = ae
  Bt(this)
  const l = or(i, r.bind(s), n)
  return o ? Bt(o) : pt(), l
}
function lr(e, t) {
  const n = t.split('.')
  return () => {
    let s = e
    for (let i = 0; i < n.length && s; i++) s = s[n[i]]
    return s
  }
}
function Ct(e, t) {
  if (!oe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), he(e))) Ct(e.value, t)
  else if (V(e)) for (let n = 0; n < e.length; n++) Ct(e[n], t)
  else if (Oi(e) || wt(e))
    e.forEach((n) => {
      Ct(n, t)
    })
  else if ($i(e)) for (const n in e) Ct(e[n], t)
  return e
}
function ll() {
  const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    Mn(() => {
      e.isMounted = !0
    }),
    Bn(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Ee = [Function, Array],
  al = {
    name: 'BaseTransition',
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ee,
      onEnter: Ee,
      onAfterEnter: Ee,
      onEnterCancelled: Ee,
      onBeforeLeave: Ee,
      onLeave: Ee,
      onAfterLeave: Ee,
      onLeaveCancelled: Ee,
      onBeforeAppear: Ee,
      onAppear: Ee,
      onAfterAppear: Ee,
      onAppearCancelled: Ee,
    },
    setup(e, { slots: t }) {
      const n = Ul(),
        s = ll()
      let i
      return () => {
        const r = t.default && cr(t.default(), !0)
        if (!r || !r.length) return
        let o = r[0]
        if (r.length > 1) {
          for (const v of r)
            if (v.type !== qe) {
              o = v
              break
            }
        }
        const l = Z(e),
          { mode: a } = l
        if (s.isLeaving) return zn(o)
        const c = ni(o)
        if (!c) return zn(o)
        const u = ts(c, l, s, n)
        ns(c, u)
        const d = n.subTree,
          h = d && ni(d)
        let m = !1
        const { getTransitionKey: y } = c.type
        if (y) {
          const v = y()
          i === void 0 ? (i = v) : v !== i && ((i = v), (m = !0))
        }
        if (h && h.type !== qe && (!ut(c, h) || m)) {
          const v = ts(h, l, s, n)
          if ((ns(h, v), a === 'out-in'))
            return (
              (s.isLeaving = !0),
              (v.afterLeave = () => {
                ;(s.isLeaving = !1), n.update.active !== !1 && n.update()
              }),
              zn(o)
            )
          a === 'in-out' &&
            c.type !== qe &&
            (v.delayLeave = (x, p, b) => {
              const _ = ar(s, h)
              ;(_[String(h.key)] = h),
                (x._leaveCb = () => {
                  p(), (x._leaveCb = void 0), delete u.delayedLeave
                }),
                (u.delayedLeave = b)
            })
        }
        return o
      }
    },
  },
  cl = al
function ar(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function ts(e, t, n, s) {
  const {
      appear: i,
      mode: r,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: c,
      onEnterCancelled: u,
      onBeforeLeave: d,
      onLeave: h,
      onAfterLeave: m,
      onLeaveCancelled: y,
      onBeforeAppear: v,
      onAppear: x,
      onAfterAppear: p,
      onAppearCancelled: b,
    } = t,
    _ = String(e.key),
    E = ar(n, e),
    A = (C, L) => {
      C && Me(C, s, 9, L)
    },
    N = (C, L) => {
      const q = L[1]
      A(C, L), V(C) ? C.every((M) => M.length <= 1) && q() : C.length <= 1 && q()
    },
    j = {
      mode: r,
      persisted: o,
      beforeEnter(C) {
        let L = l
        if (!n.isMounted)
          if (i) L = v || l
          else return
        C._leaveCb && C._leaveCb(!0)
        const q = E[_]
        q && ut(e, q) && q.el._leaveCb && q.el._leaveCb(), A(L, [C])
      },
      enter(C) {
        let L = a,
          q = c,
          M = u
        if (!n.isMounted)
          if (i) (L = x || a), (q = p || c), (M = b || u)
          else return
        let k = !1
        const G = (C._enterCb = (le) => {
          k ||
            ((k = !0),
            le ? A(M, [C]) : A(q, [C]),
            j.delayedLeave && j.delayedLeave(),
            (C._enterCb = void 0))
        })
        L ? N(L, [C, G]) : G()
      },
      leave(C, L) {
        const q = String(e.key)
        if ((C._enterCb && C._enterCb(!0), n.isUnmounting)) return L()
        A(d, [C])
        let M = !1
        const k = (C._leaveCb = (G) => {
          M ||
            ((M = !0),
            L(),
            G ? A(y, [C]) : A(m, [C]),
            (C._leaveCb = void 0),
            E[q] === e && delete E[q])
        })
        ;(E[q] = e), h ? N(h, [C, k]) : k()
      },
      clone(C) {
        return ts(C, t, n, s)
      },
    }
  return j
}
function zn(e) {
  if (En(e)) return (e = st(e)), (e.children = null), e
}
function ni(e) {
  return En(e) ? (e.children ? e.children[0] : void 0) : e
}
function ns(e, t) {
  e.shapeFlag & 6 && e.component
    ? ns(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function cr(e, t = !1, n) {
  let s = [],
    i = 0
  for (let r = 0; r < e.length; r++) {
    let o = e[r]
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : r)
    o.type === ve
      ? (o.patchFlag & 128 && i++, (s = s.concat(cr(o.children, t, l))))
      : (t || o.type !== qe) && s.push(l != null ? st(o, { key: l }) : o)
  }
  if (i > 1) for (let r = 0; r < s.length; r++) s[r].patchFlag = -2
  return s
}
const ln = (e) => !!e.type.__asyncLoader,
  En = (e) => e.type.__isKeepAlive
function ul(e, t) {
  ur(e, 'a', t)
}
function dl(e, t) {
  ur(e, 'da', t)
}
function ur(e, t, n = ae) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n
      for (; i; ) {
        if (i.isDeactivated) return
        i = i.parent
      }
      return e()
    })
  if ((Pn(t, s, n), n)) {
    let i = n.parent
    for (; i && i.parent; ) En(i.parent.vnode) && fl(s, t, n, i), (i = i.parent)
  }
}
function fl(e, t, n, s) {
  const i = Pn(t, e, s, !0)
  fr(() => {
    _s(s[t], i)
  }, n)
}
function Pn(e, t, n = ae, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          Ot(), Bt(n)
          const l = Me(t, n, e, o)
          return pt(), Lt(), l
        })
    return s ? i.unshift(r) : i.push(r), r
  }
}
const Ye =
    (e) =>
    (t, n = ae) =>
      (!Vt || e === 'sp') && Pn(e, (...s) => t(...s), n),
  pl = Ye('bm'),
  Mn = Ye('m'),
  dr = Ye('bu'),
  Os = Ye('u'),
  Bn = Ye('bum'),
  fr = Ye('um'),
  hl = Ye('sp'),
  gl = Ye('rtg'),
  ml = Ye('rtc')
function vl(e, t = ae) {
  Pn('ec', e, t)
}
function ot(e, t, n, s) {
  const i = e.dirs,
    r = t && t.dirs
  for (let o = 0; o < i.length; o++) {
    const l = i[o]
    r && (l.oldValue = r[o].value)
    let a = l.dir[s]
    a && (Ot(), Me(a, n, 8, [e.el, l, e, t]), Lt())
  }
}
const pr = 'components'
function te(e, t) {
  return bl(pr, e, !0, t) || e
}
const _l = Symbol()
function bl(e, t, n = !0, s = !1) {
  const i = Pe || ae
  if (i) {
    const r = i.type
    if (e === pr) {
      const l = Zl(r, !1)
      if (l && (l === t || l === Re(t) || l === Sn(Re(t)))) return r
    }
    const o = si(i[e] || r[e], t) || si(i.appContext[e], t)
    return !o && s ? r : o
  }
}
function si(e, t) {
  return e && (e[t] || e[Re(t)] || e[Sn(Re(t))])
}
function Ls(e, t, n, s) {
  let i
  const r = n && n[s]
  if (V(e) || de(e)) {
    i = new Array(e.length)
    for (let o = 0, l = e.length; o < l; o++) i[o] = t(e[o], o, void 0, r && r[o])
  } else if (typeof e == 'number') {
    i = new Array(e)
    for (let o = 0; o < e; o++) i[o] = t(o + 1, o, void 0, r && r[o])
  } else if (oe(e))
    if (e[Symbol.iterator]) i = Array.from(e, (o, l) => t(o, l, void 0, r && r[l]))
    else {
      const o = Object.keys(e)
      i = new Array(o.length)
      for (let l = 0, a = o.length; l < a; l++) {
        const c = o[l]
        i[l] = t(e[c], c, l, r && r[l])
      }
    }
  else i = []
  return n && (n[s] = i), i
}
const ss = (e) => (e ? (wr(e) ? Ns(e) || e.proxy : ss(e.parent)) : null),
  Ht = ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => ss(e.parent),
    $root: (e) => ss(e.root),
    $emit: (e) => e.emit,
    $options: (e) => As(e),
    $forceUpdate: (e) => e.f || (e.f = () => Bs(e.update)),
    $nextTick: (e) => e.n || (e.n = er.bind(e.proxy)),
    $watch: (e) => ol.bind(e),
  }),
  Dn = (e, t) => e !== re && !e.__isScriptSetup && Y(e, t),
  yl = {
    get({ _: e }, t) {
      const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: a } = e
      let c
      if (t[0] !== '$') {
        const m = o[t]
        if (m !== void 0)
          switch (m) {
            case 1:
              return s[t]
            case 2:
              return i[t]
            case 4:
              return n[t]
            case 3:
              return r[t]
          }
        else {
          if (Dn(s, t)) return (o[t] = 1), s[t]
          if (i !== re && Y(i, t)) return (o[t] = 2), i[t]
          if ((c = e.propsOptions[0]) && Y(c, t)) return (o[t] = 3), r[t]
          if (n !== re && Y(n, t)) return (o[t] = 4), n[t]
          is && (o[t] = 0)
        }
      }
      const u = Ht[t]
      let d, h
      if (u) return t === '$attrs' && ye(e, 'get', t), u(e)
      if ((d = l.__cssModules) && (d = d[t])) return d
      if (n !== re && Y(n, t)) return (o[t] = 4), n[t]
      if (((h = a.config.globalProperties), Y(h, t))) return h[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: i, ctx: r } = e
      return Dn(i, t)
        ? ((i[t] = n), !0)
        : s !== re && Y(s, t)
        ? ((s[t] = n), !0)
        : Y(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0)
    },
    has(
      { _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r } },
      o,
    ) {
      let l
      return (
        !!n[o] ||
        (e !== re && Y(e, o)) ||
        Dn(t, o) ||
        ((l = r[0]) && Y(l, o)) ||
        Y(s, o) ||
        Y(Ht, o) ||
        Y(i.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null ? (e._.accessCache[t] = 0) : Y(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
let is = !0
function Sl(e) {
  const t = As(e),
    n = e.proxy,
    s = e.ctx
  ;(is = !1), t.beforeCreate && ii(t.beforeCreate, e, 'bc')
  const {
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: c,
    created: u,
    beforeMount: d,
    mounted: h,
    beforeUpdate: m,
    updated: y,
    activated: v,
    deactivated: x,
    beforeDestroy: p,
    beforeUnmount: b,
    destroyed: _,
    unmounted: E,
    render: A,
    renderTracked: N,
    renderTriggered: j,
    errorCaptured: C,
    serverPrefetch: L,
    expose: q,
    inheritAttrs: M,
    components: k,
    directives: G,
    filters: le,
  } = t
  if ((c && Cl(c, s, null, e.appContext.config.unwrapInjectedRef), o))
    for (const ie in o) {
      const J = o[ie]
      U(J) && (s[ie] = J.bind(n))
    }
  if (i) {
    const ie = i.call(n, n)
    oe(ie) && (e.data = xn(ie))
  }
  if (((is = !0), r))
    for (const ie in r) {
      const J = r[ie],
        Ne = U(J) ? J.bind(n, n) : U(J.get) ? J.get.bind(n, n) : $e,
        rt = !U(J) && U(J.set) ? J.set.bind(n) : $e,
        He = Hs({ get: Ne, set: rt })
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => He.value,
        set: (Te) => (He.value = Te),
      })
    }
  if (l) for (const ie in l) hr(l[ie], s, n, ie)
  if (a) {
    const ie = U(a) ? a.call(n) : a
    Reflect.ownKeys(ie).forEach((J) => {
      Is(J, ie[J])
    })
  }
  u && ii(u, e, 'c')
  function fe(ie, J) {
    V(J) ? J.forEach((Ne) => ie(Ne.bind(n))) : J && ie(J.bind(n))
  }
  if (
    (fe(pl, d),
    fe(Mn, h),
    fe(dr, m),
    fe(Os, y),
    fe(ul, v),
    fe(dl, x),
    fe(vl, C),
    fe(ml, N),
    fe(gl, j),
    fe(Bn, b),
    fe(fr, E),
    fe(hl, L),
    V(q))
  )
    if (q.length) {
      const ie = e.exposed || (e.exposed = {})
      q.forEach((J) => {
        Object.defineProperty(ie, J, { get: () => n[J], set: (Ne) => (n[J] = Ne) })
      })
    } else e.exposed || (e.exposed = {})
  A && e.render === $e && (e.render = A),
    M != null && (e.inheritAttrs = M),
    k && (e.components = k),
    G && (e.directives = G)
}
function Cl(e, t, n = $e, s = !1) {
  V(e) && (e = rs(e))
  for (const i in e) {
    const r = e[i]
    let o
    oe(r)
      ? 'default' in r
        ? (o = on(r.from || i, r.default, !0))
        : (o = on(r.from || i))
      : (o = on(r)),
      he(o) && s
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (l) => (o.value = l),
          })
        : (t[i] = o)
  }
}
function ii(e, t, n) {
  Me(V(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function hr(e, t, n, s) {
  const i = s.includes('.') ? lr(n, s) : () => n[s]
  if (de(e)) {
    const r = t[e]
    U(r) && Pt(i, r)
  } else if (U(e)) Pt(i, e.bind(n))
  else if (oe(e))
    if (V(e)) e.forEach((r) => hr(r, t, n, s))
    else {
      const r = U(e.handler) ? e.handler.bind(n) : t[e.handler]
      U(r) && Pt(i, r, e)
    }
}
function As(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: i,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = r.get(t)
  let a
  return (
    l
      ? (a = l)
      : !i.length && !n && !s
      ? (a = t)
      : ((a = {}), i.length && i.forEach((c) => hn(a, c, o, !0)), hn(a, t, o)),
    oe(t) && r.set(t, a),
    a
  )
}
function hn(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t
  r && hn(e, r, n, !0), i && i.forEach((o) => hn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === 'expose')) {
      const l = xl[o] || (n && n[o])
      e[o] = l ? l(e[o], t[o]) : t[o]
    }
  return e
}
const xl = {
  data: ri,
  props: at,
  emits: at,
  methods: at,
  computed: at,
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  components: at,
  directives: at,
  watch: Tl,
  provide: ri,
  inject: wl,
}
function ri(e, t) {
  return t
    ? e
      ? function () {
          return ge(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t)
        }
      : t
    : e
}
function wl(e, t) {
  return at(rs(e), rs(t))
}
function rs(e) {
  if (V(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function at(e, t) {
  return e ? ge(ge(Object.create(null), e), t) : t
}
function Tl(e, t) {
  if (!e) return t
  if (!t) return e
  const n = ge(Object.create(null), e)
  for (const s in t) n[s] = me(e[s], t[s])
  return n
}
function El(e, t, n, s = !1) {
  const i = {},
    r = {}
  dn(r, On, 1), (e.propsDefaults = Object.create(null)), gr(e, t, i, r)
  for (const o in e.propsOptions[0]) o in i || (i[o] = void 0)
  n ? (e.props = s ? i : jo(i)) : e.type.props ? (e.props = i) : (e.props = r), (e.attrs = r)
}
function Pl(e, t, n, s) {
  const {
      props: i,
      attrs: r,
      vnode: { patchFlag: o },
    } = e,
    l = Z(i),
    [a] = e.propsOptions
  let c = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps
      for (let d = 0; d < u.length; d++) {
        let h = u[d]
        if (Tn(e.emitsOptions, h)) continue
        const m = t[h]
        if (a)
          if (Y(r, h)) m !== r[h] && ((r[h] = m), (c = !0))
          else {
            const y = Re(h)
            i[y] = os(a, l, y, m, e, !1)
          }
        else m !== r[h] && ((r[h] = m), (c = !0))
      }
    }
  } else {
    gr(e, t, i, r) && (c = !0)
    let u
    for (const d in l)
      (!t || (!Y(t, d) && ((u = It(d)) === d || !Y(t, u)))) &&
        (a
          ? n && (n[d] !== void 0 || n[u] !== void 0) && (i[d] = os(a, l, d, void 0, e, !0))
          : delete i[d])
    if (r !== l) for (const d in r) (!t || !Y(t, d)) && (delete r[d], (c = !0))
  }
  c && Ke(e, 'set', '$attrs')
}
function gr(e, t, n, s) {
  const [i, r] = e.propsOptions
  let o = !1,
    l
  if (t)
    for (let a in t) {
      if (rn(a)) continue
      const c = t[a]
      let u
      i && Y(i, (u = Re(a)))
        ? !r || !r.includes(u)
          ? (n[u] = c)
          : ((l || (l = {}))[u] = c)
        : Tn(e.emitsOptions, a) || ((!(a in s) || c !== s[a]) && ((s[a] = c), (o = !0)))
    }
  if (r) {
    const a = Z(n),
      c = l || re
    for (let u = 0; u < r.length; u++) {
      const d = r[u]
      n[d] = os(i, a, d, c[d], e, !Y(c, d))
    }
  }
  return o
}
function os(e, t, n, s, i, r) {
  const o = e[n]
  if (o != null) {
    const l = Y(o, 'default')
    if (l && s === void 0) {
      const a = o.default
      if (o.type !== Function && U(a)) {
        const { propsDefaults: c } = i
        n in c ? (s = c[n]) : (Bt(i), (s = c[n] = a.call(null, t)), pt())
      } else s = a
    }
    o[0] && (r && !l ? (s = !1) : o[1] && (s === '' || s === It(n)) && (s = !0))
  }
  return s
}
function mr(e, t, n = !1) {
  const s = t.propsCache,
    i = s.get(e)
  if (i) return i
  const r = e.props,
    o = {},
    l = []
  let a = !1
  if (!U(e)) {
    const u = (d) => {
      a = !0
      const [h, m] = mr(d, t, !0)
      ge(o, h), m && l.push(...m)
    }
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u)
  }
  if (!r && !a) return oe(e) && s.set(e, xt), xt
  if (V(r))
    for (let u = 0; u < r.length; u++) {
      const d = Re(r[u])
      oi(d) && (o[d] = re)
    }
  else if (r)
    for (const u in r) {
      const d = Re(u)
      if (oi(d)) {
        const h = r[u],
          m = (o[d] = V(h) || U(h) ? { type: h } : Object.assign({}, h))
        if (m) {
          const y = ci(Boolean, m.type),
            v = ci(String, m.type)
          ;(m[0] = y > -1), (m[1] = v < 0 || y < v), (y > -1 || Y(m, 'default')) && l.push(d)
        }
      }
    }
  const c = [o, l]
  return oe(e) && s.set(e, c), c
}
function oi(e) {
  return e[0] !== '$'
}
function li(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? 'null' : ''
}
function ai(e, t) {
  return li(e) === li(t)
}
function ci(e, t) {
  return V(t) ? t.findIndex((n) => ai(n, e)) : U(t) && ai(t, e) ? 0 : -1
}
const vr = (e) => e[0] === '_' || e === '$stable',
  $s = (e) => (V(e) ? e.map(Fe) : [Fe(e)]),
  Ml = (e, t, n) => {
    if (t._n) return t
    const s = es((...i) => $s(t(...i)), n)
    return (s._c = !1), s
  },
  _r = (e, t, n) => {
    const s = e._ctx
    for (const i in e) {
      if (vr(i)) continue
      const r = e[i]
      if (U(r)) t[i] = Ml(i, r, s)
      else if (r != null) {
        const o = $s(r)
        t[i] = () => o
      }
    }
  },
  br = (e, t) => {
    const n = $s(t)
    e.slots.default = () => n
  },
  Bl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = Z(t)), dn(t, '_', n)) : _r(t, (e.slots = {}))
    } else (e.slots = {}), t && br(e, t)
    dn(e.slots, On, 1)
  },
  Il = (e, t, n) => {
    const { vnode: s, slots: i } = e
    let r = !0,
      o = re
    if (s.shapeFlag & 32) {
      const l = t._
      l
        ? n && l === 1
          ? (r = !1)
          : (ge(i, t), !n && l === 1 && delete i._)
        : ((r = !t.$stable), _r(t, i)),
        (o = t)
    } else t && (br(e, t), (o = { default: 1 }))
    if (r) for (const l in i) !vr(l) && !(l in o) && delete i[l]
  }
function yr() {
  return {
    app: null,
    config: {
      isNativeTag: so,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Ol = 0
function Ll(e, t) {
  return function (s, i = null) {
    U(s) || (s = Object.assign({}, s)), i != null && !oe(i) && (i = null)
    const r = yr(),
      o = new Set()
    let l = !1
    const a = (r.app = {
      _uid: Ol++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ta,
      get config() {
        return r.config
      },
      set config(c) {},
      use(c, ...u) {
        return (
          o.has(c) ||
            (c && U(c.install) ? (o.add(c), c.install(a, ...u)) : U(c) && (o.add(c), c(a, ...u))),
          a
        )
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c), a
      },
      component(c, u) {
        return u ? ((r.components[c] = u), a) : r.components[c]
      },
      directive(c, u) {
        return u ? ((r.directives[c] = u), a) : r.directives[c]
      },
      mount(c, u, d) {
        if (!l) {
          const h = W(s, i)
          return (
            (h.appContext = r),
            u && t ? t(h, c) : e(h, c, d),
            (l = !0),
            (a._container = c),
            (c.__vue_app__ = a),
            Ns(h.component) || h.component.proxy
          )
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__)
      },
      provide(c, u) {
        return (r.provides[c] = u), a
      },
    })
    return a
  }
}
function ls(e, t, n, s, i = !1) {
  if (V(e)) {
    e.forEach((h, m) => ls(h, t && (V(t) ? t[m] : t), n, s, i))
    return
  }
  if (ln(s) && !i) return
  const r = s.shapeFlag & 4 ? Ns(s.component) || s.component.proxy : s.el,
    o = i ? null : r,
    { i: l, r: a } = e,
    c = t && t.r,
    u = l.refs === re ? (l.refs = {}) : l.refs,
    d = l.setupState
  if (
    (c != null &&
      c !== a &&
      (de(c) ? ((u[c] = null), Y(d, c) && (d[c] = null)) : he(c) && (c.value = null)),
    U(a))
  )
    tt(a, l, 12, [o, u])
  else {
    const h = de(a),
      m = he(a)
    if (h || m) {
      const y = () => {
        if (e.f) {
          const v = h ? (Y(d, a) ? d[a] : u[a]) : a.value
          i
            ? V(v) && _s(v, r)
            : V(v)
            ? v.includes(r) || v.push(r)
            : h
            ? ((u[a] = [r]), Y(d, a) && (d[a] = u[a]))
            : ((a.value = [r]), e.k && (u[e.k] = a.value))
        } else h ? ((u[a] = o), Y(d, a) && (d[a] = o)) : m && ((a.value = o), e.k && (u[e.k] = o))
      }
      o ? ((y.id = -1), be(y, n)) : y()
    }
  }
}
const be = rl
function Al(e) {
  return $l(e)
}
function $l(e, t) {
  const n = uo()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: i,
      patchProp: r,
      createElement: o,
      createText: l,
      createComment: a,
      setText: c,
      setElementText: u,
      parentNode: d,
      nextSibling: h,
      setScopeId: m = $e,
      insertStaticContent: y,
    } = e,
    v = (f, g, S, T = null, w = null, I = null, $ = !1, B = null, O = !!g.dynamicChildren) => {
      if (f === g) return
      f && !ut(f, g) && ((T = Yt(f)), Te(f, w, I, !0), (f = null)),
        g.patchFlag === -2 && ((O = !1), (g.dynamicChildren = null))
      const { type: P, ref: D, shapeFlag: H } = g
      switch (P) {
        case In:
          x(f, g, S, T)
          break
        case qe:
          p(f, g, S, T)
          break
        case an:
          f == null && b(g, S, T, $)
          break
        case ve:
          k(f, g, S, T, w, I, $, B, O)
          break
        default:
          H & 1
            ? A(f, g, S, T, w, I, $, B, O)
            : H & 6
            ? G(f, g, S, T, w, I, $, B, O)
            : (H & 64 || H & 128) && P.process(f, g, S, T, w, I, $, B, O, _t)
      }
      D != null && w && ls(D, f && f.ref, I, g || f, !g)
    },
    x = (f, g, S, T) => {
      if (f == null) s((g.el = l(g.children)), S, T)
      else {
        const w = (g.el = f.el)
        g.children !== f.children && c(w, g.children)
      }
    },
    p = (f, g, S, T) => {
      f == null ? s((g.el = a(g.children || '')), S, T) : (g.el = f.el)
    },
    b = (f, g, S, T) => {
      ;[f.el, f.anchor] = y(f.children, g, S, T, f.el, f.anchor)
    },
    _ = ({ el: f, anchor: g }, S, T) => {
      let w
      for (; f && f !== g; ) (w = h(f)), s(f, S, T), (f = w)
      s(g, S, T)
    },
    E = ({ el: f, anchor: g }) => {
      let S
      for (; f && f !== g; ) (S = h(f)), i(f), (f = S)
      i(g)
    },
    A = (f, g, S, T, w, I, $, B, O) => {
      ;($ = $ || g.type === 'svg'), f == null ? N(g, S, T, w, I, $, B, O) : L(f, g, w, I, $, B, O)
    },
    N = (f, g, S, T, w, I, $, B) => {
      let O, P
      const { type: D, props: H, shapeFlag: F, transition: R, dirs: K } = f
      if (
        ((O = f.el = o(f.type, I, H && H.is, H)),
        F & 8
          ? u(O, f.children)
          : F & 16 && C(f.children, O, null, T, w, I && D !== 'foreignObject', $, B),
        K && ot(f, null, T, 'created'),
        j(O, f, f.scopeId, $, T),
        H)
      ) {
        for (const ee in H)
          ee !== 'value' && !rn(ee) && r(O, ee, null, H[ee], I, f.children, T, w, Ve)
        'value' in H && r(O, 'value', null, H.value), (P = H.onVnodeBeforeMount) && De(P, T, f)
      }
      K && ot(f, null, T, 'beforeMount')
      const se = (!w || (w && !w.pendingBranch)) && R && !R.persisted
      se && R.beforeEnter(O),
        s(O, g, S),
        ((P = H && H.onVnodeMounted) || se || K) &&
          be(() => {
            P && De(P, T, f), se && R.enter(O), K && ot(f, null, T, 'mounted')
          }, w)
    },
    j = (f, g, S, T, w) => {
      if ((S && m(f, S), T)) for (let I = 0; I < T.length; I++) m(f, T[I])
      if (w) {
        let I = w.subTree
        if (g === I) {
          const $ = w.vnode
          j(f, $, $.scopeId, $.slotScopeIds, w.parent)
        }
      }
    },
    C = (f, g, S, T, w, I, $, B, O = 0) => {
      for (let P = O; P < f.length; P++) {
        const D = (f[P] = B ? Ze(f[P]) : Fe(f[P]))
        v(null, D, g, S, T, w, I, $, B)
      }
    },
    L = (f, g, S, T, w, I, $) => {
      const B = (g.el = f.el)
      let { patchFlag: O, dynamicChildren: P, dirs: D } = g
      O |= f.patchFlag & 16
      const H = f.props || re,
        F = g.props || re
      let R
      S && lt(S, !1),
        (R = F.onVnodeBeforeUpdate) && De(R, S, g, f),
        D && ot(g, f, S, 'beforeUpdate'),
        S && lt(S, !0)
      const K = w && g.type !== 'foreignObject'
      if (
        (P ? q(f.dynamicChildren, P, B, S, T, K, I) : $ || J(f, g, B, null, S, T, K, I, !1), O > 0)
      ) {
        if (O & 16) M(B, g, H, F, S, T, w)
        else if (
          (O & 2 && H.class !== F.class && r(B, 'class', null, F.class, w),
          O & 4 && r(B, 'style', H.style, F.style, w),
          O & 8)
        ) {
          const se = g.dynamicProps
          for (let ee = 0; ee < se.length; ee++) {
            const ce = se[ee],
              Be = H[ce],
              bt = F[ce]
            ;(bt !== Be || ce === 'value') && r(B, ce, Be, bt, w, f.children, S, T, Ve)
          }
        }
        O & 1 && f.children !== g.children && u(B, g.children)
      } else !$ && P == null && M(B, g, H, F, S, T, w)
      ;((R = F.onVnodeUpdated) || D) &&
        be(() => {
          R && De(R, S, g, f), D && ot(g, f, S, 'updated')
        }, T)
    },
    q = (f, g, S, T, w, I, $) => {
      for (let B = 0; B < g.length; B++) {
        const O = f[B],
          P = g[B],
          D = O.el && (O.type === ve || !ut(O, P) || O.shapeFlag & 70) ? d(O.el) : S
        v(O, P, D, null, T, w, I, $, !0)
      }
    },
    M = (f, g, S, T, w, I, $) => {
      if (S !== T) {
        if (S !== re)
          for (const B in S) !rn(B) && !(B in T) && r(f, B, S[B], null, $, g.children, w, I, Ve)
        for (const B in T) {
          if (rn(B)) continue
          const O = T[B],
            P = S[B]
          O !== P && B !== 'value' && r(f, B, P, O, $, g.children, w, I, Ve)
        }
        'value' in T && r(f, 'value', S.value, T.value)
      }
    },
    k = (f, g, S, T, w, I, $, B, O) => {
      const P = (g.el = f ? f.el : l('')),
        D = (g.anchor = f ? f.anchor : l(''))
      let { patchFlag: H, dynamicChildren: F, slotScopeIds: R } = g
      R && (B = B ? B.concat(R) : R),
        f == null
          ? (s(P, S, T), s(D, S, T), C(g.children, S, D, w, I, $, B, O))
          : H > 0 && H & 64 && F && f.dynamicChildren
          ? (q(f.dynamicChildren, F, S, w, I, $, B),
            (g.key != null || (w && g === w.subTree)) && Sr(f, g, !0))
          : J(f, g, S, D, w, I, $, B, O)
    },
    G = (f, g, S, T, w, I, $, B, O) => {
      ;(g.slotScopeIds = B),
        f == null
          ? g.shapeFlag & 512
            ? w.ctx.activate(g, S, T, $, O)
            : le(g, S, T, w, I, $, O)
          : vt(f, g, O)
    },
    le = (f, g, S, T, w, I, $) => {
      const B = (f.component = Wl(f, T, w))
      if ((En(f) && (B.ctx.renderer = _t), ql(B), B.asyncDep)) {
        if ((w && w.registerDep(B, fe), !f.el)) {
          const O = (B.subTree = W(qe))
          p(null, O, g, S)
        }
        return
      }
      fe(B, f, g, S, w, I, $)
    },
    vt = (f, g, S) => {
      const T = (g.component = f.component)
      if (nl(f, g, S))
        if (T.asyncDep && !T.asyncResolved) {
          ie(T, g, S)
          return
        } else (T.next = g), Xo(T.update), T.update()
      else (g.el = f.el), (T.vnode = g)
    },
    fe = (f, g, S, T, w, I, $) => {
      const B = () => {
          if (f.isMounted) {
            let { next: D, bu: H, u: F, parent: R, vnode: K } = f,
              se = D,
              ee
            lt(f, !1),
              D ? ((D.el = K.el), ie(f, D, $)) : (D = K),
              H && Nn(H),
              (ee = D.props && D.props.onVnodeBeforeUpdate) && De(ee, R, D, K),
              lt(f, !0)
            const ce = Hn(f),
              Be = f.subTree
            ;(f.subTree = ce),
              v(Be, ce, d(Be.el), Yt(Be), f, w, I),
              (D.el = ce.el),
              se === null && sl(f, ce.el),
              F && be(F, w),
              (ee = D.props && D.props.onVnodeUpdated) && be(() => De(ee, R, D, K), w)
          } else {
            let D
            const { el: H, props: F } = g,
              { bm: R, m: K, parent: se } = f,
              ee = ln(g)
            if (
              (lt(f, !1),
              R && Nn(R),
              !ee && (D = F && F.onVnodeBeforeMount) && De(D, se, g),
              lt(f, !0),
              H && $n)
            ) {
              const ce = () => {
                ;(f.subTree = Hn(f)), $n(H, f.subTree, f, w, null)
              }
              ee ? g.type.__asyncLoader().then(() => !f.isUnmounted && ce()) : ce()
            } else {
              const ce = (f.subTree = Hn(f))
              v(null, ce, S, T, f, w, I), (g.el = ce.el)
            }
            if ((K && be(K, w), !ee && (D = F && F.onVnodeMounted))) {
              const ce = g
              be(() => De(D, se, ce), w)
            }
            ;(g.shapeFlag & 256 || (se && ln(se.vnode) && se.vnode.shapeFlag & 256)) &&
              f.a &&
              be(f.a, w),
              (f.isMounted = !0),
              (g = S = T = null)
          }
        },
        O = (f.effect = new Cs(B, () => Bs(P), f.scope)),
        P = (f.update = () => O.run())
      ;(P.id = f.uid), lt(f, !0), P()
    },
    ie = (f, g, S) => {
      g.component = f
      const T = f.vnode.props
      ;(f.vnode = g), (f.next = null), Pl(f, g.props, T, S), Il(f, g.children, S), Ot(), ei(), Lt()
    },
    J = (f, g, S, T, w, I, $, B, O = !1) => {
      const P = f && f.children,
        D = f ? f.shapeFlag : 0,
        H = g.children,
        { patchFlag: F, shapeFlag: R } = g
      if (F > 0) {
        if (F & 128) {
          rt(P, H, S, T, w, I, $, B, O)
          return
        } else if (F & 256) {
          Ne(P, H, S, T, w, I, $, B, O)
          return
        }
      }
      R & 8
        ? (D & 16 && Ve(P, w, I), H !== P && u(S, H))
        : D & 16
        ? R & 16
          ? rt(P, H, S, T, w, I, $, B, O)
          : Ve(P, w, I, !0)
        : (D & 8 && u(S, ''), R & 16 && C(H, S, T, w, I, $, B, O))
    },
    Ne = (f, g, S, T, w, I, $, B, O) => {
      ;(f = f || xt), (g = g || xt)
      const P = f.length,
        D = g.length,
        H = Math.min(P, D)
      let F
      for (F = 0; F < H; F++) {
        const R = (g[F] = O ? Ze(g[F]) : Fe(g[F]))
        v(f[F], R, S, null, w, I, $, B, O)
      }
      P > D ? Ve(f, w, I, !0, !1, H) : C(g, S, T, w, I, $, B, O, H)
    },
    rt = (f, g, S, T, w, I, $, B, O) => {
      let P = 0
      const D = g.length
      let H = f.length - 1,
        F = D - 1
      for (; P <= H && P <= F; ) {
        const R = f[P],
          K = (g[P] = O ? Ze(g[P]) : Fe(g[P]))
        if (ut(R, K)) v(R, K, S, null, w, I, $, B, O)
        else break
        P++
      }
      for (; P <= H && P <= F; ) {
        const R = f[H],
          K = (g[F] = O ? Ze(g[F]) : Fe(g[F]))
        if (ut(R, K)) v(R, K, S, null, w, I, $, B, O)
        else break
        H--, F--
      }
      if (P > H) {
        if (P <= F) {
          const R = F + 1,
            K = R < D ? g[R].el : T
          for (; P <= F; ) v(null, (g[P] = O ? Ze(g[P]) : Fe(g[P])), S, K, w, I, $, B, O), P++
        }
      } else if (P > F) for (; P <= H; ) Te(f[P], w, I, !0), P++
      else {
        const R = P,
          K = P,
          se = new Map()
        for (P = K; P <= F; P++) {
          const Ce = (g[P] = O ? Ze(g[P]) : Fe(g[P]))
          Ce.key != null && se.set(Ce.key, P)
        }
        let ee,
          ce = 0
        const Be = F - K + 1
        let bt = !1,
          Rs = 0
        const $t = new Array(Be)
        for (P = 0; P < Be; P++) $t[P] = 0
        for (P = R; P <= H; P++) {
          const Ce = f[P]
          if (ce >= Be) {
            Te(Ce, w, I, !0)
            continue
          }
          let ze
          if (Ce.key != null) ze = se.get(Ce.key)
          else
            for (ee = K; ee <= F; ee++)
              if ($t[ee - K] === 0 && ut(Ce, g[ee])) {
                ze = ee
                break
              }
          ze === void 0
            ? Te(Ce, w, I, !0)
            : (($t[ze - K] = P + 1),
              ze >= Rs ? (Rs = ze) : (bt = !0),
              v(Ce, g[ze], S, null, w, I, $, B, O),
              ce++)
        }
        const Vs = bt ? kl($t) : xt
        for (ee = Vs.length - 1, P = Be - 1; P >= 0; P--) {
          const Ce = K + P,
            ze = g[Ce],
            Ws = Ce + 1 < D ? g[Ce + 1].el : T
          $t[P] === 0
            ? v(null, ze, S, Ws, w, I, $, B, O)
            : bt && (ee < 0 || P !== Vs[ee] ? He(ze, S, Ws, 2) : ee--)
        }
      }
    },
    He = (f, g, S, T, w = null) => {
      const { el: I, type: $, transition: B, children: O, shapeFlag: P } = f
      if (P & 6) {
        He(f.component.subTree, g, S, T)
        return
      }
      if (P & 128) {
        f.suspense.move(g, S, T)
        return
      }
      if (P & 64) {
        $.move(f, g, S, _t)
        return
      }
      if ($ === ve) {
        s(I, g, S)
        for (let H = 0; H < O.length; H++) He(O[H], g, S, T)
        s(f.anchor, g, S)
        return
      }
      if ($ === an) {
        _(f, g, S)
        return
      }
      if (T !== 2 && P & 1 && B)
        if (T === 0) B.beforeEnter(I), s(I, g, S), be(() => B.enter(I), w)
        else {
          const { leave: H, delayLeave: F, afterLeave: R } = B,
            K = () => s(I, g, S),
            se = () => {
              H(I, () => {
                K(), R && R()
              })
            }
          F ? F(I, K, se) : se()
        }
      else s(I, g, S)
    },
    Te = (f, g, S, T = !1, w = !1) => {
      const {
        type: I,
        props: $,
        ref: B,
        children: O,
        dynamicChildren: P,
        shapeFlag: D,
        patchFlag: H,
        dirs: F,
      } = f
      if ((B != null && ls(B, null, S, f, !0), D & 256)) {
        g.ctx.deactivate(f)
        return
      }
      const R = D & 1 && F,
        K = !ln(f)
      let se
      if ((K && (se = $ && $.onVnodeBeforeUnmount) && De(se, g, f), D & 6)) Xr(f.component, S, T)
      else {
        if (D & 128) {
          f.suspense.unmount(S, T)
          return
        }
        R && ot(f, null, g, 'beforeUnmount'),
          D & 64
            ? f.type.remove(f, g, S, w, _t, T)
            : P && (I !== ve || (H > 0 && H & 64))
            ? Ve(P, g, S, !1, !0)
            : ((I === ve && H & 384) || (!w && D & 16)) && Ve(O, g, S),
          T && Kt(f)
      }
      ;((K && (se = $ && $.onVnodeUnmounted)) || R) &&
        be(() => {
          se && De(se, g, f), R && ot(f, null, g, 'unmounted')
        }, S)
    },
    Kt = (f) => {
      const { type: g, el: S, anchor: T, transition: w } = f
      if (g === ve) {
        Yr(S, T)
        return
      }
      if (g === an) {
        E(f)
        return
      }
      const I = () => {
        i(S), w && !w.persisted && w.afterLeave && w.afterLeave()
      }
      if (f.shapeFlag & 1 && w && !w.persisted) {
        const { leave: $, delayLeave: B } = w,
          O = () => $(S, I)
        B ? B(f.el, I, O) : O()
      } else I()
    },
    Yr = (f, g) => {
      let S
      for (; f !== g; ) (S = h(f)), i(f), (f = S)
      i(g)
    },
    Xr = (f, g, S) => {
      const { bum: T, scope: w, update: I, subTree: $, um: B } = f
      T && Nn(T),
        w.stop(),
        I && ((I.active = !1), Te($, f, g, S)),
        B && be(B, g),
        be(() => {
          f.isUnmounted = !0
        }, g),
        g &&
          g.pendingBranch &&
          !g.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === g.pendingId &&
          (g.deps--, g.deps === 0 && g.resolve())
    },
    Ve = (f, g, S, T = !1, w = !1, I = 0) => {
      for (let $ = I; $ < f.length; $++) Te(f[$], g, S, T, w)
    },
    Yt = (f) =>
      f.shapeFlag & 6
        ? Yt(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : h(f.anchor || f.el),
    Gs = (f, g, S) => {
      f == null
        ? g._vnode && Te(g._vnode, null, null, !0)
        : v(g._vnode || null, f, g, null, null, null, S),
        ei(),
        nr(),
        (g._vnode = f)
    },
    _t = { p: v, um: Te, m: He, r: Kt, mt: le, mc: C, pc: J, pbc: q, n: Yt, o: e }
  let An, $n
  return t && ([An, $n] = t(_t)), { render: Gs, hydrate: An, createApp: Ll(Gs, An) }
}
function lt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function Sr(e, t, n = !1) {
  const s = e.children,
    i = t.children
  if (V(s) && V(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r]
      let l = i[r]
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = i[r] = Ze(i[r])), (l.el = o.el)),
        n || Sr(o, l)),
        l.type === In && (l.el = o.el)
    }
}
function kl(e) {
  const t = e.slice(),
    n = [0]
  let s, i, r, o, l
  const a = e.length
  for (s = 0; s < a; s++) {
    const c = e[s]
    if (c !== 0) {
      if (((i = n[n.length - 1]), e[i] < c)) {
        ;(t[s] = i), n.push(s)
        continue
      }
      for (r = 0, o = n.length - 1; r < o; ) (l = (r + o) >> 1), e[n[l]] < c ? (r = l + 1) : (o = l)
      c < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s))
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o])
  return n
}
const Nl = (e) => e.__isTeleport,
  ve = Symbol(void 0),
  In = Symbol(void 0),
  qe = Symbol(void 0),
  an = Symbol(void 0),
  zt = []
let Ae = null
function X(e = !1) {
  zt.push((Ae = e ? null : []))
}
function Hl() {
  zt.pop(), (Ae = zt[zt.length - 1] || null)
}
let Rt = 1
function ui(e) {
  Rt += e
}
function Cr(e) {
  return (e.dynamicChildren = Rt > 0 ? Ae || xt : null), Hl(), Rt > 0 && Ae && Ae.push(e), e
}
function Q(e, t, n, s, i, r) {
  return Cr(z(e, t, n, s, i, r, !0))
}
function as(e, t, n, s, i) {
  return Cr(W(e, t, n, s, i, !0))
}
function cs(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function ut(e, t) {
  return e.type === t.type && e.key === t.key
}
const On = '__vInternal',
  xr = ({ key: e }) => e ?? null,
  cn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null ? (de(e) || he(e) || U(e) ? { i: Pe, r: e, k: t, f: !!n } : e) : null
function z(e, t = null, n = null, s = 0, i = null, r = e === ve ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xr(t),
    ref: t && cn(t),
    scopeId: rr,
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
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe,
  }
  return (
    l ? (ks(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= de(n) ? 8 : 16),
    Rt > 0 && !o && Ae && (a.patchFlag > 0 || r & 6) && a.patchFlag !== 32 && Ae.push(a),
    a
  )
}
const W = zl
function zl(e, t = null, n = null, s = 0, i = null, r = !1) {
  if (((!e || e === _l) && (e = qe), cs(e))) {
    const l = st(e, t, !0)
    return (
      n && ks(l, n),
      Rt > 0 && !r && Ae && (l.shapeFlag & 6 ? (Ae[Ae.indexOf(e)] = l) : Ae.push(l)),
      (l.patchFlag |= -2),
      l
    )
  }
  if ((Ql(e) && (e = e.__vccOpts), t)) {
    t = Dl(t)
    let { class: l, style: a } = t
    l && !de(l) && (t.class = vn(l)),
      oe(a) && (qi(a) && !V(a) && (a = ge({}, a)), (t.style = ms(a)))
  }
  const o = de(e) ? 1 : il(e) ? 128 : Nl(e) ? 64 : oe(e) ? 4 : U(e) ? 2 : 0
  return z(e, t, n, s, i, o, r, !0)
}
function Dl(e) {
  return e ? (qi(e) || On in e ? ge({}, e) : e) : null
}
function st(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: o } = e,
    l = t ? Gl(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && xr(l),
    ref: t && t.ref ? (n && i ? (V(i) ? i.concat(cn(t)) : [i, cn(t)]) : cn(t)) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ve ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function Fl(e = ' ', t = 0) {
  return W(In, null, e, t)
}
function jl(e, t) {
  const n = W(an, null, e)
  return (n.staticCount = t), n
}
function Fe(e) {
  return e == null || typeof e == 'boolean'
    ? W(qe)
    : V(e)
    ? W(ve, null, e.slice())
    : typeof e == 'object'
    ? Ze(e)
    : W(In, null, String(e))
}
function Ze(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e)
}
function ks(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (V(t)) n = 16
  else if (typeof t == 'object')
    if (s & 65) {
      const i = t.default
      i && (i._c && (i._d = !1), ks(e, i()), i._c && (i._d = !0))
      return
    } else {
      n = 32
      const i = t._
      !i && !(On in t)
        ? (t._ctx = Pe)
        : i === 3 && Pe && (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    U(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Fl(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Gl(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const i in s)
      if (i === 'class') t.class !== s.class && (t.class = vn([t.class, s.class]))
      else if (i === 'style') t.style = ms([t.style, s.style])
      else if (_n(i)) {
        const r = t[i],
          o = s[i]
        o && r !== o && !(V(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o)
      } else i !== '' && (t[i] = s[i])
  }
  return t
}
function De(e, t, n, s = null) {
  Me(e, t, 7, [n, s])
}
const Rl = yr()
let Vl = 0
function Wl(e, t, n) {
  const s = e.type,
    i = (t ? t.appContext : e.appContext) || Rl,
    r = {
      uid: Vl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ki(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: mr(s, i),
      emitsOptions: ir(s, i),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: s.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
      setupContext: null,
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
      sp: null,
    }
  return (
    (r.ctx = { _: r }), (r.root = t ? t.root : r), (r.emit = Jo.bind(null, r)), e.ce && e.ce(r), r
  )
}
let ae = null
const Ul = () => ae || Pe,
  Bt = (e) => {
    ;(ae = e), e.scope.on()
  },
  pt = () => {
    ae && ae.scope.off(), (ae = null)
  }
function wr(e) {
  return e.vnode.shapeFlag & 4
}
let Vt = !1
function ql(e, t = !1) {
  Vt = t
  const { props: n, children: s } = e.vnode,
    i = wr(e)
  El(e, n, i, t), Bl(e, s)
  const r = i ? Kl(e, t) : void 0
  return (Vt = !1), r
}
function Kl(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Ki(new Proxy(e.ctx, yl)))
  const { setup: s } = n
  if (s) {
    const i = (e.setupContext = s.length > 1 ? Xl(e) : null)
    Bt(e), Ot()
    const r = tt(s, e, 0, [e.props, i])
    if ((Lt(), pt(), Li(r))) {
      if ((r.then(pt, pt), t))
        return r
          .then((o) => {
            di(e, o, t)
          })
          .catch((o) => {
            wn(o, e, 0)
          })
      e.asyncDep = r
    } else di(e, r, t)
  } else Tr(e, t)
}
function di(e, t, n) {
  U(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : oe(t) && (e.setupState = Zi(t)),
    Tr(e, n)
}
let fi
function Tr(e, t, n) {
  const s = e.type
  if (!e.render) {
    if (!t && fi && !s.render) {
      const i = s.template || As(e).template
      if (i) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = s,
          c = ge(ge({ isCustomElement: r, delimiters: l }, o), a)
        s.render = fi(i, c)
      }
    }
    e.render = s.render || $e
  }
  Bt(e), Ot(), Sl(e), Lt(), pt()
}
function Yl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ye(e, 'get', '$attrs'), t[n]
    },
  })
}
function Xl(e) {
  const t = (s) => {
    e.exposed = s || {}
  }
  let n
  return {
    get attrs() {
      return n || (n = Yl(e))
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function Ns(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Zi(Ki(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Ht) return Ht[n](e)
        },
        has(t, n) {
          return n in t || n in Ht
        },
      }))
    )
}
function Zl(e, t = !0) {
  return U(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function Ql(e) {
  return U(e) && '__vccOpts' in e
}
const Hs = (e, t) => qo(e, t, Vt)
function Oe(e, t, n) {
  const s = arguments.length
  return s === 2
    ? oe(t) && !V(t)
      ? cs(t)
        ? W(e, null, [t])
        : W(e, t)
      : W(e, null, t)
    : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && cs(n) && (n = [n]),
      W(e, t, n))
}
const Jl = Symbol(''),
  ea = () => on(Jl),
  ta = '3.2.47',
  na = 'http://www.w3.org/2000/svg',
  dt = typeof document < 'u' ? document : null,
  pi = dt && dt.createElement('template'),
  sa = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const i = t ? dt.createElementNS(na, e) : dt.createElement(e, n ? { is: n } : void 0)
      return e === 'select' && s && s.multiple != null && i.setAttribute('multiple', s.multiple), i
    },
    createText: (e) => dt.createTextNode(e),
    createComment: (e) => dt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => dt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '')
    },
    insertStaticContent(e, t, n, s, i, r) {
      const o = n ? n.previousSibling : t.lastChild
      if (i && (i === r || i.nextSibling))
        for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); );
      else {
        pi.innerHTML = s ? `<svg>${e}</svg>` : e
        const l = pi.content
        if (s) {
          const a = l.firstChild
          for (; a.firstChild; ) l.appendChild(a.firstChild)
          l.removeChild(a)
        }
        t.insertBefore(l, n)
      }
      return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    },
  }
function ia(e, t, n) {
  const s = e._vtc
  s && (t = (t ? [t, ...s] : [...s]).join(' ')),
    t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t)
}
function ra(e, t, n) {
  const s = e.style,
    i = de(n)
  if (n && !i) {
    if (t && !de(t)) for (const r in t) n[r] == null && us(s, r, '')
    for (const r in n) us(s, r, n[r])
  } else {
    const r = s.display
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute('style'), '_vod' in e && (s.display = r)
  }
}
const hi = /\s*!important$/
function us(e, t, n) {
  if (V(n)) n.forEach((s) => us(e, t, s))
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
  else {
    const s = oa(e, t)
    hi.test(n) ? e.setProperty(It(s), n.replace(hi, ''), 'important') : (e[s] = n)
  }
}
const gi = ['Webkit', 'Moz', 'ms'],
  Fn = {}
function oa(e, t) {
  const n = Fn[t]
  if (n) return n
  let s = Re(t)
  if (s !== 'filter' && s in e) return (Fn[t] = s)
  s = Sn(s)
  for (let i = 0; i < gi.length; i++) {
    const r = gi[i] + s
    if (r in e) return (Fn[t] = r)
  }
  return t
}
const mi = 'http://www.w3.org/1999/xlink'
function la(e, t, n, s, i) {
  if (s && t.startsWith('xlink:'))
    n == null ? e.removeAttributeNS(mi, t.slice(6, t.length)) : e.setAttributeNS(mi, t, n)
  else {
    const r = no(t)
    n == null || (r && !Bi(n)) ? e.removeAttribute(t) : e.setAttribute(t, r ? '' : n)
  }
}
function aa(e, t, n, s, i, r, o) {
  if (t === 'innerHTML' || t === 'textContent') {
    s && o(s, i, r), (e[t] = n ?? '')
    return
  }
  if (t === 'value' && e.tagName !== 'PROGRESS' && !e.tagName.includes('-')) {
    e._value = n
    const a = n ?? ''
    ;(e.value !== a || e.tagName === 'OPTION') && (e.value = a), n == null && e.removeAttribute(t)
    return
  }
  let l = !1
  if (n === '' || n == null) {
    const a = typeof e[t]
    a === 'boolean'
      ? (n = Bi(n))
      : n == null && a === 'string'
      ? ((n = ''), (l = !0))
      : a === 'number' && ((n = 0), (l = !0))
  }
  try {
    e[t] = n
  } catch {}
  l && e.removeAttribute(t)
}
function ca(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function ua(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
function da(e, t, n, s, i = null) {
  const r = e._vei || (e._vei = {}),
    o = r[t]
  if (s && o) o.value = s
  else {
    const [l, a] = fa(t)
    if (s) {
      const c = (r[t] = ga(s, i))
      ca(e, l, c, a)
    } else o && (ua(e, l, o, a), (r[t] = void 0))
  }
}
const vi = /(?:Once|Passive|Capture)$/
function fa(e) {
  let t
  if (vi.test(e)) {
    t = {}
    let s
    for (; (s = e.match(vi)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ':' ? e.slice(3) : It(e.slice(2)), t]
}
let jn = 0
const pa = Promise.resolve(),
  ha = () => jn || (pa.then(() => (jn = 0)), (jn = Date.now()))
function ga(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    Me(ma(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = ha()), n
}
function ma(e, t) {
  if (V(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (i) => !i._stopped && s && s(i))
    )
  } else return t
}
const _i = /^on[a-z]/,
  va = (e, t, n, s, i = !1, r, o, l, a) => {
    t === 'class'
      ? ia(e, s, i)
      : t === 'style'
      ? ra(e, n, s)
      : _n(t)
      ? vs(t) || da(e, t, n, s, o)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : _a(e, t, s, i)
        )
      ? aa(e, t, s, r, o, l, a)
      : (t === 'true-value' ? (e._trueValue = s) : t === 'false-value' && (e._falseValue = s),
        la(e, t, s, i))
  }
function _a(e, t, n, s) {
  return s
    ? !!(t === 'innerHTML' || t === 'textContent' || (t in e && _i.test(t) && U(n)))
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (_i.test(t) && de(n))
    ? !1
    : t in e
}
const ba = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
cl.props
const ya = ['ctrl', 'shift', 'alt', 'meta'],
  Sa = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => ya.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  it =
    (e, t) =>
    (n, ...s) => {
      for (let i = 0; i < t.length; i++) {
        const r = Sa[t[i]]
        if (r && r(n, t)) return
      }
      return e(n, ...s)
    },
  Ca = ge({ patchProp: va }, sa)
let bi
function xa() {
  return bi || (bi = Al(Ca))
}
const wa = (...e) => {
  const t = xa().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (s) => {
      const i = Ta(s)
      if (!i) return
      const r = t._component
      !U(r) && !r.render && !r.template && (r.template = i.innerHTML), (i.innerHTML = '')
      const o = n(i, !1, i instanceof SVGElement)
      return (
        i instanceof Element && (i.removeAttribute('v-cloak'), i.setAttribute('data-v-app', '')), o
      )
    }),
    t
  )
}
function Ta(e) {
  return de(e) ? document.querySelector(e) : e
}
const ne = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, i] of t) n[s] = i
    return n
  },
  Ea = {
    name: 'BasketHead',
    computed: {
      count() {
        return this.$store.getters.getCount
      },
      loading() {
        return this.$store.getters.getLoading
      },
    },
    methods: {
      deleteHandler() {
        this.$store.dispatch('deleteAllBasket')
      },
    },
  },
  Pa = { class: 'BasketHead' },
  Ma = z('h2', { class: 'BasketHead__heading' }, 'Ваша корзина', -1),
  Ba = { class: 'BasketHead__count' },
  Ia = ['disabled']
function Oa(e, t, n, s, i, r) {
  return (
    X(),
    Q('div', Pa, [
      Ma,
      z('p', Ba, ue(r.count) + ' товара', 1),
      z(
        'button',
        {
          class: 'BasketHead__clear',
          disabled: r.loading,
          onClick:
            t[0] || (t[0] = it((...o) => r.deleteHandler && r.deleteHandler(...o), ['prevent'])),
        },
        ' Очистить корзину ',
        8,
        Ia,
      ),
    ])
  )
}
const La = ne(Ea, [['render', Oa]]),
  Aa = { name: 'InstallSVG' },
  $a = {
    width: '30',
    height: '30',
    viewBox: '0 0 30 30',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  ka = jl(
    '<path d="M23.6933 28.61C20.8529 28.61 18.5421 26.2992 18.5421 23.4589C18.5421 22.7656 18.6807 22.0892 18.9542 21.4484C19.4636 20.2325 20.4566 19.2345 21.6774 18.7139C21.6935 18.7071 21.7101 18.7009 21.7267 18.6956C22.3459 18.4381 23.0071 18.3077 23.6933 18.3077C26.5337 18.3077 28.8448 20.6185 28.8448 23.4589C28.8448 26.2992 26.5337 28.61 23.6933 28.61ZM22.091 19.7922C21.1619 20.2004 20.4075 20.9658 20.0171 21.8977C19.8036 22.3983 19.696 22.9222 19.696 23.4589C19.696 25.6629 21.4893 27.4562 23.6933 27.4562C25.8976 27.4562 27.6909 25.6629 27.6909 23.4589C27.6909 21.2548 25.8976 19.4615 23.6933 19.4615C23.1474 19.4615 22.6234 19.5672 22.1358 19.7753C22.1211 19.7815 22.1062 19.7872 22.091 19.7922Z" fill="#0069B4"></path><path d="M6.54113 11.4564C6.25014 11.4564 5.95688 11.4325 5.66392 11.3843C3.4413 11.0176 1.69898 9.19186 1.42714 6.94473C1.34713 6.28527 1.39052 5.63031 1.55587 4.99846C1.60799 4.79845 1.76349 4.64154 1.96293 4.58746C2.16238 4.53309 2.37591 4.59028 2.52183 4.73648L4.67148 6.88585H6.49803L7.28623 6.09766V4.27111L5.23967 2.22427C5.08925 2.07384 5.03375 1.85271 5.09544 1.64904C5.15714 1.44565 5.32588 1.29241 5.53433 1.25071C5.85575 1.18649 6.1938 1.15381 6.53944 1.15381C9.37983 1.15381 11.6909 3.4646 11.6909 6.30499C11.6909 6.99177 11.5548 7.66673 11.2861 8.31098C10.7678 9.53384 9.7728 10.5311 8.55557 11.05C8.53895 11.057 8.52205 11.0632 8.50515 11.0688C7.88625 11.326 7.21975 11.4564 6.54113 11.4564ZM8.32937 10.5192H8.335H8.32937ZM2.54295 6.38922C2.54577 6.52753 2.55563 6.66669 2.57253 6.80613C2.78324 8.54761 4.13175 9.96203 5.85181 10.2457C6.6279 10.3736 7.4037 10.2851 8.09668 9.98879C8.1119 9.98231 8.12739 9.97639 8.14288 9.97132C9.06996 9.5637 9.82661 8.79776 10.2227 7.86364C10.4309 7.36418 10.5371 6.83853 10.5371 6.30499C10.5371 4.24914 8.977 2.55104 6.97861 2.3316L8.27106 3.62432C8.37923 3.7325 8.44008 3.87926 8.44008 4.03223V6.33654C8.44008 6.4895 8.37923 6.63627 8.27106 6.74444L7.14482 7.87068C7.03664 7.97885 6.88988 8.0397 6.73691 8.0397H4.4326C4.27964 8.0397 4.13287 7.97885 4.0247 7.87068L2.54295 6.38922Z" fill="#0069B4"></path><path d="M21.902 19.8192C21.7541 19.8192 21.6065 19.7629 21.4938 19.6499L18.0844 16.2346C17.8593 16.009 17.8596 15.6439 18.085 15.4188C18.3106 15.194 18.6757 15.1934 18.9008 15.4194L22.3102 18.8347C22.5356 19.0603 22.535 19.4254 22.3096 19.6505C22.197 19.7629 22.0496 19.8192 21.902 19.8192Z" fill="#0069B4"></path><path d="M14.1712 12.0887C14.0233 12.0887 13.8757 12.0323 13.763 11.9194L10.3477 8.49809C10.1223 8.27245 10.1229 7.90737 10.3483 7.68229C10.5739 7.45721 10.939 7.45721 11.1641 7.68285L14.5794 11.1041C14.8048 11.3298 14.8042 11.6948 14.5788 11.9199C14.4662 12.0323 14.3185 12.0887 14.1712 12.0887Z" fill="#0069B4"></path><path d="M11.7485 14.5174C11.6009 14.5174 11.4533 14.4611 11.3406 14.3484L7.91939 10.9275C7.69403 10.7021 7.69403 10.337 7.91939 10.1116C8.14475 9.88629 8.50983 9.88629 8.73519 10.1116L12.1564 13.5326C12.3818 13.758 12.3818 14.1231 12.1564 14.3484C12.0438 14.4611 11.8962 14.5174 11.7485 14.5174Z" fill="#0069B4"></path><path d="M19.4848 22.254C19.3372 22.254 19.1896 22.1977 19.0769 22.085L15.6559 18.6637C15.4305 18.4384 15.4305 18.0733 15.6559 17.8479C15.8813 17.6226 16.2463 17.6226 16.4717 17.8479L19.8927 21.2692C20.118 21.4945 20.118 21.8596 19.8927 22.085C19.78 22.1977 19.6324 22.254 19.4848 22.254Z" fill="#0069B4"></path><path d="M24.8539 26.0454H22.5327C22.3265 26.0454 22.1361 25.9355 22.0329 25.7569L20.8723 23.7467C20.7695 23.5681 20.7695 23.3484 20.8723 23.1698L22.0329 21.1593C22.1361 20.9807 22.3265 20.8708 22.5327 20.8708H24.8539C25.0601 20.8708 25.2505 20.9807 25.3536 21.1593L26.5142 23.1698C26.6171 23.3484 26.6171 23.5681 26.5142 23.7467L25.3536 25.7569C25.2505 25.9355 25.0601 26.0454 24.8539 26.0454ZM22.8657 24.8916H24.5209L25.3483 23.4583L24.5206 22.0247H22.8659L22.0383 23.4583L22.8657 24.8916Z" fill="#0069B4"></path><path d="M14.3616 20.2233C14.0216 20.2233 13.6819 20.094 13.423 19.8351L10.1654 16.5835C9.65411 16.0615 9.65411 15.2231 10.1595 14.7079L22.6307 2.23644C24.0234 0.850187 26.2835 0.85075 27.6694 2.23644L27.7554 2.317C29.1568 3.7179 29.1568 5.97855 27.7675 7.36762L15.3002 19.8351C15.0414 20.094 14.7016 20.2233 14.3616 20.2233ZM25.1479 2.35137C24.5307 2.35137 23.9152 2.58575 23.4456 3.05337L10.9784 15.5209C10.9147 15.5857 10.9147 15.6995 10.9835 15.7696L14.2388 19.0193C14.3075 19.0881 14.4157 19.0881 14.4844 19.0193L26.9517 6.55181C27.4063 6.09715 27.6568 5.49205 27.6568 4.84837C27.6568 4.2044 27.4063 3.59931 26.9517 3.14464L26.8657 3.06407C26.39 2.58828 25.7682 2.35137 25.1479 2.35137Z" fill="#0069B4"></path><path d="M3.24498 28.8461C3.09568 28.8461 2.94806 28.7884 2.83679 28.6771L1.32462 27.1647C1.13588 26.9759 1.10123 26.6827 1.24068 26.4553L3.18554 23.2828C3.38583 22.9561 3.71711 22.729 4.09402 22.6597C4.46981 22.5893 4.86025 22.6848 5.16392 22.9192C5.24139 22.9792 5.28252 23.0152 5.32083 23.0538L6.77469 24.5077C6.80511 24.5381 6.83413 24.5702 6.86173 24.6037L7.03949 24.8218C7.28597 25.1237 7.38992 25.5178 7.32485 25.9021C7.2595 26.2869 7.0316 26.6244 6.69891 26.8283L3.54612 28.7611C3.45287 28.8183 3.34864 28.8461 3.24498 28.8461ZM2.46213 26.6706L3.3309 27.5396L6.09579 25.8449C6.16227 25.8041 6.18143 25.7424 6.18706 25.7091C6.19269 25.6762 6.19495 25.6117 6.14537 25.5508L5.95888 25.3235L4.50503 23.8696C4.50446 23.8693 4.45911 23.8327 4.45854 23.8324C4.39826 23.7857 4.33572 23.7899 4.3022 23.7947C4.2698 23.8006 4.20924 23.8203 4.16924 23.886L2.46213 26.6706Z" fill="#0069B4"></path><path d="M4.64663 23.7724C4.49901 23.7724 4.3514 23.7161 4.23872 23.6034C4.01336 23.378 4.01336 23.0126 4.23872 22.7876L10.715 16.3124C10.9404 16.087 11.3055 16.087 11.5308 16.3124C11.7562 16.5378 11.7562 16.9031 11.5308 17.1282L5.05453 23.6034C4.94185 23.7161 4.79424 23.7724 4.64663 23.7724Z" fill="#0069B4"></path><path d="M6.80513 25.9309C6.65752 25.9309 6.50991 25.8746 6.39723 25.7619C6.17187 25.5365 6.17187 25.1712 6.39723 24.9461L12.8735 18.4712C13.0989 18.2458 13.464 18.2458 13.6893 18.4712C13.9147 18.6966 13.9147 19.0619 13.6893 19.287L7.21304 25.7619C7.10036 25.8746 6.95274 25.9309 6.80513 25.9309Z" fill="#0069B4"></path><path d="M14.3601 16.2177C14.2125 16.2177 14.0649 16.1614 13.9522 16.0487C13.7269 15.8233 13.7269 15.4582 13.9522 15.2329L24.745 4.44008C24.9704 4.21472 25.3355 4.21472 25.5608 4.44008C25.7862 4.66544 25.7862 5.03052 25.5608 5.25588L14.768 16.0487C14.6553 16.1614 14.5077 16.2177 14.3601 16.2177Z" fill="#0069B4"></path>',
    12,
  ),
  Na = [ka]
function Ha(e, t, n, s, i, r) {
  return X(), Q('svg', $a, Na)
}
const za = ne(Aa, [['render', Ha]])
const Da = {
    name: 'BasketInstall',
    computed: {
      install() {
        return this.$store.getters.getShouldInstall
      },
      loading() {
        return this.$store.getters.getLoading
      },
    },
    methods: {
      installHandler() {
        this.$store.dispatch('toggleShouldInstall')
      },
    },
    components: { InstallSVG: za },
  },
  Fa = { class: 'BasketInstall' },
  ja = ['checked', 'disabled'],
  Ga = { class: 'BasketInstall__svgContainer' },
  Ra = z(
    'div',
    { class: 'BasketInstall__content' },
    [
      z('h4', { class: 'BasketInstall__text' }, 'Установка'),
      z(
        'p',
        { class: 'BasketInstall__text_secondary' },
        ' Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров. ',
      ),
    ],
    -1,
  )
function Va(e, t, n, s, i, r) {
  const o = te('InstallSVG')
  return (
    X(),
    Q('label', Fa, [
      z(
        'input',
        {
          class: 'BasketInstall__checkbox',
          type: 'checkbox',
          checked: r.install,
          onChange: t[0] || (t[0] = (...l) => r.installHandler && r.installHandler(...l)),
          disabled: r.loading,
        },
        null,
        40,
        ja,
      ),
      z('div', Ga, [W(o)]),
      Ra,
    ])
  )
}
const Wa = ne(Da, [['render', Va]])
const Ua = { name: 'BasletMainItemDescription', props: { content: { type: Object, requred: !0 } } },
  qa = { class: 'BasletMainItemDescription' },
  Ka = { class: 'BasletMainItemDescription__heading' },
  Ya = { class: 'BasletMainItemDescription__description' },
  Xa = { class: 'BasletMainItemDescription__articul' }
function Za(e, t, n, s, i, r) {
  return (
    X(),
    Q('div', qa, [
      z('h3', Ka, ue(n.content.name), 1),
      z('p', Ya, ue(n.content.techDescription), 1),
      z('p', Xa, 'Артикул: ' + ue(n.content.articul), 1),
    ])
  )
}
const Qa = ne(Ua, [['render', Za]])
const Ja = {
    name: 'BasletMainItemCount',
    props: { content: { type: Object, required: !0 } },
    methods: {
      increaseHandler() {
        this.$store.dispatch('changeBasketProductCount', {
          ...this.$props.content,
          count: this.$props.content.count + 1,
        })
      },
      decreaseHandler() {
        this.$store.dispatch('changeBasketProductCount', {
          ...this.$props.content,
          count: this.$props.content.count - 1,
        })
      },
    },
  },
  ec = { class: 'BasletMainItemCount' },
  tc = { class: 'BasletMainItemCount__item' }
function nc(e, t, n, s, i, r) {
  return (
    X(),
    Q('div', ec, [
      z(
        'button',
        {
          class: 'BasletMainItemCount__item BasletMainItemCount__item_left',
          onClick:
            t[0] ||
            (t[0] = it((...o) => r.decreaseHandler && r.decreaseHandler(...o), ['prevent'])),
        },
        ' - ',
      ),
      z('span', tc, ue(e.$props.content.count), 1),
      z(
        'button',
        {
          class: 'BasletMainItemCount__item BasletMainItemCount__item_right',
          onClick:
            t[1] ||
            (t[1] = it((...o) => r.increaseHandler && r.increaseHandler(...o), ['prevent'])),
        },
        ' + ',
      ),
    ])
  )
}
const sc = ne(Ja, [['render', nc]]),
  ic = { name: 'DeleteSVG' },
  rc = {
    width: '14',
    height: '14',
    viewBox: '0 0 14 14',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  oc = z('path', { d: 'M1 1L13 13', stroke: '#1F2432', 'stroke-width': '1.5' }, null, -1),
  lc = z('path', { d: 'M1 13L13 1', stroke: '#1F2432', 'stroke-width': '1.5' }, null, -1),
  ac = [oc, lc]
function cc(e, t, n, s, i, r) {
  return X(), Q('svg', rc, ac)
}
const uc = ne(ic, [['render', cc]]),
  qt = {
    formatPrice(e) {
      const t = Math.floor(e / 1e3)
      let n = String(e % 1e3)
      for (; n.length < 3; ) n = '0' + n
      return `${t} ${n} ₽`
    },
  }
const dc = {
    name: 'BasketMainItem',
    props: { content: { type: Object, required: !0 } },
    computed: {
      loading() {
        this.$store.getters.getLoading
      },
      formattedPrice() {
        return qt.formatPrice(this.$props.content.price * this.$props.content.count)
      },
    },
    methods: {
      deleteHandler() {
        this.$store.dispatch('deleteBasketProduct', this.$props.content.id)
      },
    },
    components: { BasketMainItemCount: sc, BasketMainItemDescription: Qa, DeleteSVG: uc },
  },
  fc = { class: 'BasketMainItem' },
  pc = ['src', 'alt'],
  hc = { class: 'BasketMainItem__price' },
  gc = { class: 'BasketMainItem__delete' },
  mc = ['disabled']
function vc(e, t, n, s, i, r) {
  const o = te('BasketMainItemDescription'),
    l = te('BasketMainItemCount'),
    a = te('DeleteSVG')
  return (
    X(),
    Q('div', fc, [
      z(
        'img',
        { class: 'BasketMainItem__image', src: e.$props.content.image, alt: e.$props.content.name },
        null,
        8,
        pc,
      ),
      W(o, { content: e.$props.content }, null, 8, ['content']),
      W(l, { content: e.$props.content }, null, 8, ['content']),
      z('div', hc, ue(r.formattedPrice), 1),
      z('div', gc, [
        z(
          'button',
          {
            class: 'BasketMainItem__deleteButton',
            disabled: r.loading,
            onClick:
              t[0] || (t[0] = it((...c) => r.deleteHandler && r.deleteHandler(...c), ['prevent'])),
          },
          [W(a)],
          8,
          mc,
        ),
      ]),
    ])
  )
}
const _c = ne(dc, [['render', vc]]),
  bc = {
    name: 'BasketMain',
    computed: {
      products() {
        return this.$store.getters.getBasketProducts
      },
    },
    components: { BasketMainItem: _c },
  },
  yc = { class: 'BasketMain' }
function Sc(e, t, n, s, i, r) {
  const o = te('BasketMainItem')
  return (
    X(),
    Q('div', yc, [
      (X(!0),
      Q(
        ve,
        null,
        Ls(r.products, (l) => (X(), as(o, { key: l.id, content: l }, null, 8, ['content']))),
        128,
      )),
    ])
  )
}
const Cc = ne(bc, [['render', Sc]])
const xc = {
  name: 'BasketPriceButton',
  props: {
    content: { type: String, required: !0 },
    type: { type: String, validator: (e) => ['outlined', 'fill'].includes(e) },
  },
}
function wc(e, t, n, s, i, r) {
  return (
    X(),
    Q(
      'button',
      { class: vn(['BasketPriceButton', { BasketPriceButton_outlined: n.type === 'outlined' }]) },
      ue(n.content),
      3,
    )
  )
}
const Tc = ne(xc, [['render', wc]])
const Ec = { name: 'BasketPriceCount', props: { count: { type: Number, required: !0 } } },
  Pc = { class: 'BasketPriceCount' },
  Mc = z('p', null, 'Количество', -1)
function Bc(e, t, n, s, i, r) {
  return X(), Q('div', Pc, [Mc, z('p', null, ue(n.count) + ' шт', 1)])
}
const Ic = ne(Ec, [['render', Bc]])
const Oc = { name: 'BasketPriceDevider' },
  Lc = { class: 'BasketPriceDevider' }
function Ac(e, t, n, s, i, r) {
  return X(), Q('div', Lc)
}
const $c = ne(Oc, [['render', Ac]])
const kc = { name: 'BasketPriceInstall', props: { install: { type: Boolean, required: !0 } } },
  Nc = { class: 'BasketPriceInstall' },
  Hc = z('p', null, 'Установка', -1)
function zc(e, t, n, s, i, r) {
  return X(), Q('div', Nc, [Hc, z('p', null, ue(n.install ? 'Да' : 'Нет'), 1)])
}
const Dc = ne(kc, [['render', zc]])
const Fc = {
    name: 'BasketPriceValue',
    props: { price: { type: Number, required: !0 } },
    computed: {
      formattedPrice() {
        return qt.formatPrice(this.$props.price)
      },
    },
  },
  jc = { class: 'BasketPriceValue' },
  Gc = z('p', null, 'Сумма заказа', -1)
function Rc(e, t, n, s, i, r) {
  return X(), Q('div', jc, [Gc, z('p', null, ue(r.formattedPrice), 1)])
}
const Vc = ne(Fc, [['render', Rc]])
const Wc = {
    name: 'BasketPriceValue',
    props: { price: { type: Number, required: !0 } },
    computed: {
      formattedPrice() {
        return qt.formatPrice(this.$props.price)
      },
    },
  },
  Uc = { class: 'BasketPriceValueFinal' },
  qc = z('p', null, 'Стоимость товаров', -1),
  Kc = { class: 'BasketPriceValueFinal__value' }
function Yc(e, t, n, s, i, r) {
  return X(), Q('div', Uc, [qc, z('p', Kc, ue(r.formattedPrice), 1)])
}
const Xc = ne(Wc, [['render', Yc]])
const Zc = {
    name: 'BasketPrice',
    computed: {
      price() {
        return this.$store.getters.getPrice
      },
      count() {
        return this.$store.getters.getCount
      },
      install() {
        return this.$store.getters.getShouldInstall
      },
    },
    methods: {
      sumbitHandler() {
        this.$store.dispatch('buyProducts')
      },
    },
    components: {
      BasketPriceDevider: $c,
      BasketPriceValue: Vc,
      BasketPriceCount: Ic,
      BasketPriceInstall: Dc,
      BasketPriceValueFinal: Xc,
      BasketPriceButton: Tc,
    },
  },
  Qc = { class: 'BasketPrice' },
  Jc = z('h3', { class: 'BasketPrice__heading' }, 'Итого', -1),
  eu = { class: 'BasketPrice__values' },
  tu = { class: 'BasketPrice__buttons' }
function nu(e, t, n, s, i, r) {
  const o = te('BasketPriceValue'),
    l = te('BasketPriceCount'),
    a = te('BasketPriceInstall'),
    c = te('BasketPriceDevider'),
    u = te('BasketPriceValueFinal'),
    d = te('BasketPriceButton')
  return (
    X(),
    Q('aside', Qc, [
      Jc,
      z('div', eu, [
        W(o, { price: r.price }, null, 8, ['price']),
        W(l, { count: r.count }, null, 8, ['count']),
        W(a, { install: r.install }, null, 8, ['install']),
      ]),
      W(c),
      W(u, { price: r.price }, null, 8, ['price']),
      z('div', tu, [
        W(
          d,
          { onClick: it(r.sumbitHandler, ['prevent']), content: 'Оформить заказ', type: 'fill' },
          null,
          8,
          ['onClick'],
        ),
        W(
          d,
          {
            onClick: it(r.sumbitHandler, ['prevent']),
            content: 'Купить в 1 клик',
            type: 'outlined',
          },
          null,
          8,
          ['onClick'],
        ),
      ]),
    ])
  )
}
const su = ne(Zc, [['render', nu]])
const iu = {
    name: 'Basket',
    components: { BasketHead: La, BasketMain: Cc, BasketPrice: su, BasketInstall: Wa },
  },
  ru = { class: 'Basket' },
  ou = z('div', { class: 'Basket__placeholder' }, null, -1)
function lu(e, t, n, s, i, r) {
  const o = te('BasketHead'),
    l = te('BasketMain'),
    a = te('BasketPrice'),
    c = te('BasketInstall')
  return X(), Q('section', ru, [W(o), ou, W(l), W(a, { class: 'Basket__price' }), W(c)])
}
const au = ne(iu, [['render', lu]]),
  cu = { name: 'BasketSVG' },
  uu = {
    width: '30px',
    height: '30px',
    fill: '#0069B4',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 902.86 902.86',
    stroke: '#0069B4',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
  },
  du = z(
    'path',
    {
      d: 'M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z',
    },
    null,
    -1,
  ),
  fu = z(
    'path',
    {
      d: 'M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z',
    },
    null,
    -1,
  ),
  pu = [du, fu]
function hu(e, t, n, s, i, r) {
  return X(), Q('svg', uu, pu)
}
const gu = ne(cu, [['render', hu]])
const mu = {
    name: 'BasketSection',
    props: { count: { type: Number, required: !0 }, price: { type: Number, required: !0 } },
    computed: {
      formattedPrice() {
        return qt.formatPrice(this.$props.price)
      },
    },
    components: { BasketSVG: gu },
  },
  vu = { class: 'BasketSection' },
  _u = { class: 'BasketSection__left' },
  bu = { class: 'BasketSection__right' },
  yu = z('h3', { class: 'BasketSection__heading' }, 'Ваша корзина', -1),
  Su = { class: 'BasketSection__count' },
  Cu = { class: 'BasketSection__price' }
function xu(e, t, n, s, i, r) {
  const o = te('BasketSVG')
  return (
    X(),
    Q('div', vu, [
      z('div', _u, [W(o)]),
      z('div', bu, [
        yu,
        z('p', Su, ue(n.count) + ' товара', 1),
        z('p', Cu, ue(r.formattedPrice), 1),
      ]),
    ])
  )
}
const wu = ne(mu, [['render', xu]])
const Tu = {
    name: 'Header',
    components: { BasketSection: wu },
    computed: {
      price() {
        return this.$store.getters.getPrice
      },
      count() {
        return this.$store.getters.getCount
      },
      loading() {
        return this.$store.getters.getLoading
      },
    },
    methods: {
      addHandler() {
        this.$store.dispatch('addBasketProduct')
      },
    },
  },
  Eu = { class: 'Header__head' },
  Pu = { class: 'Header__placeholder' },
  Mu = ['disabled']
function Bu(e, t, n, s, i, r) {
  const o = te('BasketSection')
  return (
    X(),
    Q('header', Eu, [
      z('div', Pu, [
        z(
          'button',
          {
            class: 'Header__addProduct',
            disabled: r.loading,
            onClick: t[0] || (t[0] = it((...l) => r.addHandler && r.addHandler(...l), ['prevent'])),
          },
          ' Добавить случайный продукт в корзину ',
          8,
          Mu,
        ),
      ]),
      W(o, { count: r.count, price: r.price }, null, 8, ['count', 'price']),
    ])
  )
}
const Iu = ne(Tu, [['render', Bu]]),
  Ou = { name: 'ArrowSVG' },
  Lu = {
    width: '5',
    height: '8',
    viewBox: '0 0 5 8',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  Au = z('path', { opacity: '0.8', d: 'M0 8V0L5 4L0 8Z', fill: '#33374E' }, null, -1),
  $u = [Au]
function ku(e, t, n, s, i, r) {
  return X(), Q('svg', Lu, $u)
}
const Nu = ne(Ou, [['render', ku]])
const Hu = {
    name: 'Path',
    props: { path: { type: Array, required: !0 } },
    components: { ArrowSVG: Nu },
  },
  zu = { class: 'Path' },
  Du = { class: 'Path__item Path__item_main' },
  Fu = { class: 'Path__item' }
function ju(e, t, n, s, i, r) {
  const o = te('ArrowSVG')
  return (
    X(),
    Q('div', zu, [
      z('p', Du, ue(n.path[0]), 1),
      (X(!0),
      Q(
        ve,
        null,
        Ls(n.path.slice(1), (l) => (X(), Q(ve, { key: l }, [W(o), z('p', Fu, ue(l), 1)], 64))),
        128,
      )),
    ])
  )
}
const Gu = ne(Hu, [['render', ju]])
const Ru = { name: 'SwipeItemDescription', props: { content: { type: Object, required: !0 } } },
  Vu = { class: 'SwipeItemDescription' },
  Wu = { class: 'SwipeItemDescription__heading' },
  Uu = { class: 'SwipeItemDescription__text' }
function qu(e, t, n, s, i, r) {
  return (
    X(),
    Q('div', Vu, [
      z('h3', Wu, ue(e.$props.content.shortName), 1),
      z('p', Uu, ue(e.$props.content.description), 1),
    ])
  )
}
const Ku = ne(Ru, [['render', qu]])
const Yu = {
    name: 'SwipeItemPrice',
    props: { content: { type: Object, required: !0 } },
    computed: {
      formattedPriceRubles() {
        return qt.formatPrice(this.$props.content.price)
      },
      formattedPriseDollars() {
        return Math.round((this.$props.content.price / 80.24) * 100) / 100 + '€'
      },
    },
  },
  Xu = { class: 'SwipeItemPrice' },
  Zu = { class: 'SwipeItemPrice__rubles' },
  Qu = { class: 'SwipeItemPrice__euro' }
function Ju(e, t, n, s, i, r) {
  return (
    X(),
    Q('div', Xu, [
      z('p', Zu, ue(r.formattedPriceRubles), 1),
      z('p', Qu, ue(r.formattedPriseDollars), 1),
    ])
  )
}
const ed = ne(Yu, [['render', Ju]])
const td = {
    name: 'SwipeItem',
    props: { content: { type: Object, required: !0 } },
    methods: {
      moreHandler() {
        console.log('Вы кликнули на кропку "Подробнее"')
      },
    },
    components: { SwipeItemDescription: Ku, SwipeItemPrice: ed },
  },
  nd = { class: 'SwipeItem' },
  sd = ['src', 'alt']
function id(e, t, n, s, i, r) {
  const o = te('SwipeItemDescription'),
    l = te('SwipeItemPrice')
  return (
    X(),
    Q('div', nd, [
      z(
        'img',
        { class: 'SwipeItem__image', src: e.$props.content.image, alt: e.$props.content.name },
        null,
        8,
        sd,
      ),
      W(o, { content: e.$props.content }, null, 8, ['content']),
      W(l, { content: e.$props.content }, null, 8, ['content']),
      z(
        'button',
        {
          class: 'SwipeItem__more',
          onClick: t[0] || (t[0] = it((...a) => r.moreHandler && r.moreHandler(...a), ['prevent'])),
        },
        'Подробнее',
      ),
    ])
  )
}
const rd = ne(td, [['render', id]])
function yi(e) {
  return e !== null && typeof e == 'object' && 'constructor' in e && e.constructor === Object
}
function zs(e = {}, t = {}) {
  Object.keys(t).forEach((n) => {
    typeof e[n] > 'u'
      ? (e[n] = t[n])
      : yi(t[n]) && yi(e[n]) && Object.keys(t[n]).length > 0 && zs(e[n], t[n])
  })
}
const Er = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: '' },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return { initEvent() {} }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      },
    }
  },
  createElementNS() {
    return {}
  },
  importNode() {
    return null
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
}
function gt() {
  const e = typeof document < 'u' ? document : {}
  return zs(e, Er), e
}
const od = {
  document: Er,
  navigator: { userAgent: '' },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: '',
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ''
      },
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > 'u' ? (e(), null) : setTimeout(e, 0)
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > 'u' || clearTimeout(e)
  },
}
function we() {
  const e = typeof window < 'u' ? window : {}
  return zs(e, od), e
}
function ld(e) {
  const t = e
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null
    } catch {}
    try {
      delete t[n]
    } catch {}
  })
}
function ds(e, t = 0) {
  return setTimeout(e, t)
}
function Wt() {
  return Date.now()
}
function ad(e) {
  const t = we()
  let n
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  )
}
function cd(e, t = 'x') {
  const n = we()
  let s, i, r
  const o = ad(e)
  return (
    n.WebKitCSSMatrix
      ? ((i = o.transform || o.webkitTransform),
        i.split(',').length > 6 &&
          (i = i
            .split(', ')
            .map((l) => l.replace(',', '.'))
            .join(', ')),
        (r = new n.WebKitCSSMatrix(i === 'none' ? '' : i)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,')),
        (s = r.toString().split(','))),
    t === 'x' &&
      (n.WebKitCSSMatrix
        ? (i = r.m41)
        : s.length === 16
        ? (i = parseFloat(s[12]))
        : (i = parseFloat(s[4]))),
    t === 'y' &&
      (n.WebKitCSSMatrix
        ? (i = r.m42)
        : s.length === 16
        ? (i = parseFloat(s[13]))
        : (i = parseFloat(s[5]))),
    i || 0
  )
}
function nn(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  )
}
function ud(e) {
  return typeof window < 'u' && typeof window.HTMLElement < 'u'
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11)
}
function xe(...e) {
  const t = Object(e[0]),
    n = ['__proto__', 'constructor', 'prototype']
  for (let s = 1; s < e.length; s += 1) {
    const i = e[s]
    if (i != null && !ud(i)) {
      const r = Object.keys(Object(i)).filter((o) => n.indexOf(o) < 0)
      for (let o = 0, l = r.length; o < l; o += 1) {
        const a = r[o],
          c = Object.getOwnPropertyDescriptor(i, a)
        c !== void 0 &&
          c.enumerable &&
          (nn(t[a]) && nn(i[a])
            ? i[a].__swiper__
              ? (t[a] = i[a])
              : xe(t[a], i[a])
            : !nn(t[a]) && nn(i[a])
            ? ((t[a] = {}), i[a].__swiper__ ? (t[a] = i[a]) : xe(t[a], i[a]))
            : (t[a] = i[a]))
      }
    }
  }
  return t
}
function sn(e, t, n) {
  e.style.setProperty(t, n)
}
function Pr({ swiper: e, targetPosition: t, side: n }) {
  const s = we(),
    i = -e.translate
  let r = null,
    o
  const l = e.params.speed
  ;(e.wrapperEl.style.scrollSnapType = 'none'), s.cancelAnimationFrame(e.cssModeFrameID)
  const a = t > i ? 'next' : 'prev',
    c = (d, h) => (a === 'next' && d >= h) || (a === 'prev' && d <= h),
    u = () => {
      ;(o = new Date().getTime()), r === null && (r = o)
      const d = Math.max(Math.min((o - r) / l, 1), 0),
        h = 0.5 - Math.cos(d * Math.PI) / 2
      let m = i + h * (t - i)
      if ((c(m, t) && (m = t), e.wrapperEl.scrollTo({ [n]: m }), c(m, t))) {
        ;(e.wrapperEl.style.overflow = 'hidden'),
          (e.wrapperEl.style.scrollSnapType = ''),
          setTimeout(() => {
            ;(e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [n]: m })
          }),
          s.cancelAnimationFrame(e.cssModeFrameID)
        return
      }
      e.cssModeFrameID = s.requestAnimationFrame(u)
    }
  u()
}
function Ge(e, t = '') {
  return [...e.children].filter((n) => n.matches(t))
}
function Mr(e, t = []) {
  const n = document.createElement(e)
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n
}
function dd(e, t) {
  const n = []
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling
    t ? s.matches(t) && n.push(s) : n.push(s), (e = s)
  }
  return n
}
function fd(e, t) {
  const n = []
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling
    t ? s.matches(t) && n.push(s) : n.push(s), (e = s)
  }
  return n
}
function Qe(e, t) {
  return we().getComputedStyle(e, null).getPropertyValue(t)
}
function gn(e) {
  let t = e,
    n
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; ) t.nodeType === 1 && (n += 1)
    return n
  }
}
function Br(e, t) {
  const n = []
  let s = e.parentElement
  for (; s; ) t ? s.matches(t) && n.push(s) : n.push(s), (s = s.parentElement)
  return n
}
function fs(e, t, n) {
  const s = we()
  return n
    ? e[t === 'width' ? 'offsetWidth' : 'offsetHeight'] +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-right' : 'margin-top'),
        ) +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === 'width' ? 'margin-left' : 'margin-bottom'),
        )
    : e.offsetWidth
}
let Gn
function pd() {
  const e = we(),
    t = gt()
  return {
    smoothScroll: t.documentElement && 'scrollBehavior' in t.documentElement.style,
    touch: !!('ontouchstart' in e || (e.DocumentTouch && t instanceof e.DocumentTouch)),
  }
}
function Ir() {
  return Gn || (Gn = pd()), Gn
}
let Rn
function hd({ userAgent: e } = {}) {
  const t = Ir(),
    n = we(),
    s = n.navigator.platform,
    i = e || n.navigator.userAgent,
    r = { ios: !1, android: !1 },
    o = n.screen.width,
    l = n.screen.height,
    a = i.match(/(Android);?[\s\/]+([\d.]+)?/)
  let c = i.match(/(iPad).*OS\s([\d_]+)/)
  const u = i.match(/(iPod)(.*OS\s([\d_]+))?/),
    d = !c && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    h = s === 'Win32'
  let m = s === 'MacIntel'
  const y = [
    '1024x1366',
    '1366x1024',
    '834x1194',
    '1194x834',
    '834x1112',
    '1112x834',
    '768x1024',
    '1024x768',
    '820x1180',
    '1180x820',
    '810x1080',
    '1080x810',
  ]
  return (
    !c &&
      m &&
      t.touch &&
      y.indexOf(`${o}x${l}`) >= 0 &&
      ((c = i.match(/(Version)\/([\d.]+)/)), c || (c = [0, 1, '13_0_0']), (m = !1)),
    a && !h && ((r.os = 'android'), (r.android = !0)),
    (c || d || u) && ((r.os = 'ios'), (r.ios = !0)),
    r
  )
}
function gd(e = {}) {
  return Rn || (Rn = hd(e)), Rn
}
let Vn
function md() {
  const e = we()
  let t = !1
  function n() {
    const s = e.navigator.userAgent.toLowerCase()
    return s.indexOf('safari') >= 0 && s.indexOf('chrome') < 0 && s.indexOf('android') < 0
  }
  if (n()) {
    const s = String(e.navigator.userAgent)
    if (s.includes('Version/')) {
      const [i, r] = s
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((o) => Number(o))
      t = i < 16 || (i === 16 && r < 2)
    }
  }
  return {
    isSafari: t || n(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),
  }
}
function vd() {
  return Vn || (Vn = md()), Vn
}
function _d({ swiper: e, on: t, emit: n }) {
  const s = we()
  let i = null,
    r = null
  const o = () => {
      !e || e.destroyed || !e.initialized || (n('beforeResize'), n('resize'))
    },
    l = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((i = new ResizeObserver((u) => {
          r = s.requestAnimationFrame(() => {
            const { width: d, height: h } = e
            let m = d,
              y = h
            u.forEach(({ contentBoxSize: v, contentRect: x, target: p }) => {
              ;(p && p !== e.el) ||
                ((m = x ? x.width : (v[0] || v).inlineSize),
                (y = x ? x.height : (v[0] || v).blockSize))
            }),
              (m !== d || y !== h) && o()
          })
        })),
        i.observe(e.el))
    },
    a = () => {
      r && s.cancelAnimationFrame(r), i && i.unobserve && e.el && (i.unobserve(e.el), (i = null))
    },
    c = () => {
      !e || e.destroyed || !e.initialized || n('orientationchange')
    }
  t('init', () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < 'u') {
      l()
      return
    }
    s.addEventListener('resize', o), s.addEventListener('orientationchange', c)
  }),
    t('destroy', () => {
      a(), s.removeEventListener('resize', o), s.removeEventListener('orientationchange', c)
    })
}
function bd({ swiper: e, extendParams: t, on: n, emit: s }) {
  const i = [],
    r = we(),
    o = (c, u = {}) => {
      const d = r.MutationObserver || r.WebkitMutationObserver,
        h = new d((m) => {
          if (e.__preventObserver__) return
          if (m.length === 1) {
            s('observerUpdate', m[0])
            return
          }
          const y = function () {
            s('observerUpdate', m[0])
          }
          r.requestAnimationFrame ? r.requestAnimationFrame(y) : r.setTimeout(y, 0)
        })
      h.observe(c, {
        attributes: typeof u.attributes > 'u' ? !0 : u.attributes,
        childList: typeof u.childList > 'u' ? !0 : u.childList,
        characterData: typeof u.characterData > 'u' ? !0 : u.characterData,
      }),
        i.push(h)
    },
    l = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const c = Br(e.el)
          for (let u = 0; u < c.length; u += 1) o(c[u])
        }
        o(e.el, { childList: e.params.observeSlideChildren }), o(e.wrapperEl, { attributes: !1 })
      }
    },
    a = () => {
      i.forEach((c) => {
        c.disconnect()
      }),
        i.splice(0, i.length)
    }
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), n('init', l), n('destroy', a)
}
const yd = {
  on(e, t, n) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s
    const i = n ? 'unshift' : 'push'
    return (
      e.split(' ').forEach((r) => {
        s.eventsListeners[r] || (s.eventsListeners[r] = []), s.eventsListeners[r][i](t)
      }),
      s
    )
  },
  once(e, t, n) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != 'function') return s
    function i(...r) {
      s.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(s, r)
    }
    return (i.__emitterProxy = t), s.on(e, i, n)
  },
  onAny(e, t) {
    const n = this
    if (!n.eventsListeners || n.destroyed || typeof e != 'function') return n
    const s = t ? 'unshift' : 'push'
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[s](e), n
  },
  offAny(e) {
    const t = this
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t
    const n = t.eventsAnyListeners.indexOf(e)
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t
  },
  off(e, t) {
    const n = this
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(' ').forEach((s) => {
          typeof t > 'u'
            ? (n.eventsListeners[s] = [])
            : n.eventsListeners[s] &&
              n.eventsListeners[s].forEach((i, r) => {
                ;(i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                  n.eventsListeners[s].splice(r, 1)
              })
        }),
      n
    )
  },
  emit(...e) {
    const t = this
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t
    let n, s, i
    return (
      typeof e[0] == 'string' || Array.isArray(e[0])
        ? ((n = e[0]), (s = e.slice(1, e.length)), (i = t))
        : ((n = e[0].events), (s = e[0].data), (i = e[0].context || t)),
      s.unshift(i),
      (Array.isArray(n) ? n : n.split(' ')).forEach((o) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((l) => {
            l.apply(i, [o, ...s])
          }),
          t.eventsListeners &&
            t.eventsListeners[o] &&
            t.eventsListeners[o].forEach((l) => {
              l.apply(i, s)
            })
      }),
      t
    )
  },
}
function Sd() {
  const e = this
  let t, n
  const s = e.el
  typeof e.params.width < 'u' && e.params.width !== null
    ? (t = e.params.width)
    : (t = s.clientWidth),
    typeof e.params.height < 'u' && e.params.height !== null
      ? (n = e.params.height)
      : (n = s.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t - parseInt(Qe(s, 'padding-left') || 0, 10) - parseInt(Qe(s, 'padding-right') || 0, 10)),
      (n =
        n - parseInt(Qe(s, 'padding-top') || 0, 10) - parseInt(Qe(s, 'padding-bottom') || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, { width: t, height: n, size: e.isHorizontal() ? t : n }))
}
function Cd() {
  const e = this
  function t(M) {
    return e.isHorizontal()
      ? M
      : {
          width: 'height',
          'margin-top': 'margin-left',
          'margin-bottom ': 'margin-right',
          'margin-left': 'margin-top',
          'margin-right': 'margin-bottom',
          'padding-left': 'padding-top',
          'padding-right': 'padding-bottom',
          marginRight: 'marginBottom',
        }[M]
  }
  function n(M, k) {
    return parseFloat(M.getPropertyValue(t(k)) || 0)
  }
  const s = e.params,
    { wrapperEl: i, slidesEl: r, size: o, rtlTranslate: l, wrongRTL: a } = e,
    c = e.virtual && s.virtual.enabled,
    u = c ? e.virtual.slides.length : e.slides.length,
    d = Ge(r, `.${e.params.slideClass}, swiper-slide`),
    h = c ? e.virtual.slides.length : d.length
  let m = []
  const y = [],
    v = []
  let x = s.slidesOffsetBefore
  typeof x == 'function' && (x = s.slidesOffsetBefore.call(e))
  let p = s.slidesOffsetAfter
  typeof p == 'function' && (p = s.slidesOffsetAfter.call(e))
  const b = e.snapGrid.length,
    _ = e.slidesGrid.length
  let E = s.spaceBetween,
    A = -x,
    N = 0,
    j = 0
  if (typeof o > 'u') return
  typeof E == 'string' && E.indexOf('%') >= 0 && (E = (parseFloat(E.replace('%', '')) / 100) * o),
    (e.virtualSize = -E),
    d.forEach((M) => {
      l ? (M.style.marginLeft = '') : (M.style.marginRight = ''),
        (M.style.marginBottom = ''),
        (M.style.marginTop = '')
    }),
    s.centeredSlides &&
      s.cssMode &&
      (sn(i, '--swiper-centered-offset-before', ''), sn(i, '--swiper-centered-offset-after', ''))
  const C = s.grid && s.grid.rows > 1 && e.grid
  C && e.grid.initSlides(h)
  let L
  const q =
    s.slidesPerView === 'auto' &&
    s.breakpoints &&
    Object.keys(s.breakpoints).filter((M) => typeof s.breakpoints[M].slidesPerView < 'u').length > 0
  for (let M = 0; M < h; M += 1) {
    L = 0
    let k
    if (
      (d[M] && (k = d[M]),
      C && e.grid.updateSlide(M, k, h, t),
      !(d[M] && Qe(k, 'display') === 'none'))
    ) {
      if (s.slidesPerView === 'auto') {
        q && (d[M].style[t('width')] = '')
        const G = getComputedStyle(k),
          le = k.style.transform,
          vt = k.style.webkitTransform
        if (
          (le && (k.style.transform = 'none'),
          vt && (k.style.webkitTransform = 'none'),
          s.roundLengths)
        )
          L = e.isHorizontal() ? fs(k, 'width', !0) : fs(k, 'height', !0)
        else {
          const fe = n(G, 'width'),
            ie = n(G, 'padding-left'),
            J = n(G, 'padding-right'),
            Ne = n(G, 'margin-left'),
            rt = n(G, 'margin-right'),
            He = G.getPropertyValue('box-sizing')
          if (He && He === 'border-box') L = fe + Ne + rt
          else {
            const { clientWidth: Te, offsetWidth: Kt } = k
            L = fe + ie + J + Ne + rt + (Kt - Te)
          }
        }
        le && (k.style.transform = le),
          vt && (k.style.webkitTransform = vt),
          s.roundLengths && (L = Math.floor(L))
      } else
        (L = (o - (s.slidesPerView - 1) * E) / s.slidesPerView),
          s.roundLengths && (L = Math.floor(L)),
          d[M] && (d[M].style[t('width')] = `${L}px`)
      d[M] && (d[M].swiperSlideSize = L),
        v.push(L),
        s.centeredSlides
          ? ((A = A + L / 2 + N / 2 + E),
            N === 0 && M !== 0 && (A = A - o / 2 - E),
            M === 0 && (A = A - o / 2 - E),
            Math.abs(A) < 1 / 1e3 && (A = 0),
            s.roundLengths && (A = Math.floor(A)),
            j % s.slidesPerGroup === 0 && m.push(A),
            y.push(A))
          : (s.roundLengths && (A = Math.floor(A)),
            (j - Math.min(e.params.slidesPerGroupSkip, j)) % e.params.slidesPerGroup === 0 &&
              m.push(A),
            y.push(A),
            (A = A + L + E)),
        (e.virtualSize += L + E),
        (N = L),
        (j += 1)
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, o) + p),
    l &&
      a &&
      (s.effect === 'slide' || s.effect === 'coverflow') &&
      (i.style.width = `${e.virtualSize + s.spaceBetween}px`),
    s.setWrapperSize && (i.style[t('width')] = `${e.virtualSize + s.spaceBetween}px`),
    C && e.grid.updateWrapperSize(L, m, t),
    !s.centeredSlides)
  ) {
    const M = []
    for (let k = 0; k < m.length; k += 1) {
      let G = m[k]
      s.roundLengths && (G = Math.floor(G)), m[k] <= e.virtualSize - o && M.push(G)
    }
    ;(m = M),
      Math.floor(e.virtualSize - o) - Math.floor(m[m.length - 1]) > 1 && m.push(e.virtualSize - o)
  }
  if (c && s.loop) {
    const M = v[0] + E
    if (s.slidesPerGroup > 1) {
      const k = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup),
        G = M * s.slidesPerGroup
      for (let le = 0; le < k; le += 1) m.push(m[m.length - 1] + G)
    }
    for (let k = 0; k < e.virtual.slidesBefore + e.virtual.slidesAfter; k += 1)
      s.slidesPerGroup === 1 && m.push(m[m.length - 1] + M),
        y.push(y[y.length - 1] + M),
        (e.virtualSize += M)
  }
  if ((m.length === 0 && (m = [0]), s.spaceBetween !== 0)) {
    const M = e.isHorizontal() && l ? 'marginLeft' : t('marginRight')
    d.filter((k, G) => (!s.cssMode || s.loop ? !0 : G !== d.length - 1)).forEach((k) => {
      k.style[M] = `${E}px`
    })
  }
  if (s.centeredSlides && s.centeredSlidesBounds) {
    let M = 0
    v.forEach((G) => {
      M += G + (s.spaceBetween ? s.spaceBetween : 0)
    }),
      (M -= s.spaceBetween)
    const k = M - o
    m = m.map((G) => (G < 0 ? -x : G > k ? k + p : G))
  }
  if (s.centerInsufficientSlides) {
    let M = 0
    if (
      (v.forEach((k) => {
        M += k + (s.spaceBetween ? s.spaceBetween : 0)
      }),
      (M -= s.spaceBetween),
      M < o)
    ) {
      const k = (o - M) / 2
      m.forEach((G, le) => {
        m[le] = G - k
      }),
        y.forEach((G, le) => {
          y[le] = G + k
        })
    }
  }
  if (
    (Object.assign(e, { slides: d, snapGrid: m, slidesGrid: y, slidesSizesGrid: v }),
    s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
  ) {
    sn(i, '--swiper-centered-offset-before', `${-m[0]}px`),
      sn(i, '--swiper-centered-offset-after', `${e.size / 2 - v[v.length - 1] / 2}px`)
    const M = -e.snapGrid[0],
      k = -e.slidesGrid[0]
    ;(e.snapGrid = e.snapGrid.map((G) => G + M)), (e.slidesGrid = e.slidesGrid.map((G) => G + k))
  }
  if (
    (h !== u && e.emit('slidesLengthChange'),
    m.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit('snapGridLengthChange')),
    y.length !== _ && e.emit('slidesGridLengthChange'),
    s.watchSlidesProgress && e.updateSlidesOffset(),
    !c && !s.cssMode && (s.effect === 'slide' || s.effect === 'fade'))
  ) {
    const M = `${s.containerModifierClass}backface-hidden`,
      k = e.el.classList.contains(M)
    h <= s.maxBackfaceHiddenSlides ? k || e.el.classList.add(M) : k && e.el.classList.remove(M)
  }
}
function xd(e) {
  const t = this,
    n = [],
    s = t.virtual && t.params.virtual.enabled
  let i = 0,
    r
  typeof e == 'number' ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed)
  const o = (l) =>
    s
      ? t.slides.filter((a) => parseInt(a.getAttribute('data-swiper-slide-index'), 10) === l)[0]
      : t.slides[l]
  if (t.params.slidesPerView !== 'auto' && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((l) => {
        n.push(l)
      })
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const l = t.activeIndex + r
        if (l > t.slides.length && !s) break
        n.push(o(l))
      }
  else n.push(o(t.activeIndex))
  for (r = 0; r < n.length; r += 1)
    if (typeof n[r] < 'u') {
      const l = n[r].offsetHeight
      i = l > i ? l : i
    }
  ;(i || i === 0) && (t.wrapperEl.style.height = `${i}px`)
}
function wd() {
  const e = this,
    t = e.slides,
    n = e.isElement ? (e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop) : 0
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - n
}
function Td(e = (this && this.translate) || 0) {
  const t = this,
    n = t.params,
    { slides: s, rtlTranslate: i, snapGrid: r } = t
  if (s.length === 0) return
  typeof s[0].swiperSlideOffset > 'u' && t.updateSlidesOffset()
  let o = -e
  i && (o = e),
    s.forEach((l) => {
      l.classList.remove(n.slideVisibleClass)
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = [])
  for (let l = 0; l < s.length; l += 1) {
    const a = s[l]
    let c = a.swiperSlideOffset
    n.cssMode && n.centeredSlides && (c -= s[0].swiperSlideOffset)
    const u =
        (o + (n.centeredSlides ? t.minTranslate() : 0) - c) / (a.swiperSlideSize + n.spaceBetween),
      d =
        (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - c) /
        (a.swiperSlideSize + n.spaceBetween),
      h = -(o - c),
      m = h + t.slidesSizesGrid[l]
    ;((h >= 0 && h < t.size - 1) || (m > 1 && m <= t.size) || (h <= 0 && m >= t.size)) &&
      (t.visibleSlides.push(a),
      t.visibleSlidesIndexes.push(l),
      s[l].classList.add(n.slideVisibleClass)),
      (a.progress = i ? -u : u),
      (a.originalProgress = i ? -d : d)
  }
}
function Ed(e) {
  const t = this
  if (typeof e > 'u') {
    const u = t.rtlTranslate ? -1 : 1
    e = (t && t.translate && t.translate * u) || 0
  }
  const n = t.params,
    s = t.maxTranslate() - t.minTranslate()
  let { progress: i, isBeginning: r, isEnd: o, progressLoop: l } = t
  const a = r,
    c = o
  if (s === 0) (i = 0), (r = !0), (o = !0)
  else {
    i = (e - t.minTranslate()) / s
    const u = Math.abs(e - t.minTranslate()) < 1,
      d = Math.abs(e - t.maxTranslate()) < 1
    ;(r = u || i <= 0), (o = d || i >= 1), u && (i = 0), d && (i = 1)
  }
  if (n.loop) {
    const u = t.getSlideIndex(
        t.slides.filter((x) => x.getAttribute('data-swiper-slide-index') === '0')[0],
      ),
      d = t.getSlideIndex(
        t.slides.filter(
          (x) => x.getAttribute('data-swiper-slide-index') * 1 === t.slides.length - 1,
        )[0],
      ),
      h = t.slidesGrid[u],
      m = t.slidesGrid[d],
      y = t.slidesGrid[t.slidesGrid.length - 1],
      v = Math.abs(e)
    v >= h ? (l = (v - h) / y) : (l = (v + y - m) / y), l > 1 && (l -= 1)
  }
  Object.assign(t, { progress: i, progressLoop: l, isBeginning: r, isEnd: o }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) && t.updateSlidesProgress(e),
    r && !a && t.emit('reachBeginning toEdge'),
    o && !c && t.emit('reachEnd toEdge'),
    ((a && !r) || (c && !o)) && t.emit('fromEdge'),
    t.emit('progress', i)
}
function Pd() {
  const e = this,
    { slides: t, params: n, slidesEl: s, activeIndex: i } = e,
    r = e.virtual && n.virtual.enabled,
    o = (a) => Ge(s, `.${n.slideClass}${a}, swiper-slide${a}`)[0]
  t.forEach((a) => {
    a.classList.remove(n.slideActiveClass, n.slideNextClass, n.slidePrevClass)
  })
  let l
  if (r)
    if (n.loop) {
      let a = i - e.virtual.slidesBefore
      a < 0 && (a = e.virtual.slides.length + a),
        a >= e.virtual.slides.length && (a -= e.virtual.slides.length),
        (l = o(`[data-swiper-slide-index="${a}"]`))
    } else l = o(`[data-swiper-slide-index="${i}"]`)
  else l = t[i]
  if (l) {
    l.classList.add(n.slideActiveClass)
    let a = fd(l, `.${n.slideClass}, swiper-slide`)[0]
    n.loop && !a && (a = t[0]), a && a.classList.add(n.slideNextClass)
    let c = dd(l, `.${n.slideClass}, swiper-slide`)[0]
    n.loop && !c === 0 && (c = t[t.length - 1]), c && c.classList.add(n.slidePrevClass)
  }
  e.emitSlidesClasses()
}
function Md(e) {
  const { slidesGrid: t, params: n } = e,
    s = e.rtlTranslate ? e.translate : -e.translate
  let i
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < 'u'
      ? s >= t[r] && s < t[r + 1] - (t[r + 1] - t[r]) / 2
        ? (i = r)
        : s >= t[r] && s < t[r + 1] && (i = r + 1)
      : s >= t[r] && (i = r)
  return n.normalizeSlideIndex && (i < 0 || typeof i > 'u') && (i = 0), i
}
function Bd(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: s, params: i, activeIndex: r, realIndex: o, snapIndex: l } = t
  let a = e,
    c
  const u = (h) => {
    let m = h - t.virtual.slidesBefore
    return (
      m < 0 && (m = t.virtual.slides.length + m),
      m >= t.virtual.slides.length && (m -= t.virtual.slides.length),
      m
    )
  }
  if ((typeof a > 'u' && (a = Md(t)), s.indexOf(n) >= 0)) c = s.indexOf(n)
  else {
    const h = Math.min(i.slidesPerGroupSkip, a)
    c = h + Math.floor((a - h) / i.slidesPerGroup)
  }
  if ((c >= s.length && (c = s.length - 1), a === r)) {
    c !== l && ((t.snapIndex = c), t.emit('snapIndexChange')),
      t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = u(a))
    return
  }
  let d
  t.virtual && i.virtual.enabled && i.loop
    ? (d = u(a))
    : t.slides[a]
    ? (d = parseInt(t.slides[a].getAttribute('data-swiper-slide-index') || a, 10))
    : (d = a),
    Object.assign(t, { snapIndex: c, realIndex: d, previousIndex: r, activeIndex: a }),
    t.emit('activeIndexChange'),
    t.emit('snapIndexChange'),
    o !== d && t.emit('realIndexChange'),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange')
}
function Id(e) {
  const t = this,
    n = t.params,
    s = e.closest(`.${n.slideClass}, swiper-slide`)
  let i = !1,
    r
  if (s) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === s) {
        ;(i = !0), (r = o)
        break
      }
  }
  if (s && i)
    (t.clickedSlide = s),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(s.getAttribute('data-swiper-slide-index'), 10))
        : (t.clickedIndex = r)
  else {
    ;(t.clickedSlide = void 0), (t.clickedIndex = void 0)
    return
  }
  n.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide()
}
const Od = {
  updateSize: Sd,
  updateSlides: Cd,
  updateAutoHeight: xd,
  updateSlidesOffset: wd,
  updateSlidesProgress: Td,
  updateProgress: Ed,
  updateSlidesClasses: Pd,
  updateActiveIndex: Bd,
  updateClickedSlide: Id,
}
function Ld(e = this.isHorizontal() ? 'x' : 'y') {
  const t = this,
    { params: n, rtlTranslate: s, translate: i, wrapperEl: r } = t
  if (n.virtualTranslate) return s ? -i : i
  if (n.cssMode) return i
  let o = cd(r, e)
  return s && (o = -o), o || 0
}
function Ad(e, t) {
  const n = this,
    { rtlTranslate: s, params: i, wrapperEl: r, progress: o } = n
  let l = 0,
    a = 0
  const c = 0
  n.isHorizontal() ? (l = s ? -e : e) : (a = e),
    i.roundLengths && ((l = Math.floor(l)), (a = Math.floor(a))),
    i.cssMode
      ? (r[n.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = n.isHorizontal() ? -l : -a)
      : i.virtualTranslate || (r.style.transform = `translate3d(${l}px, ${a}px, ${c}px)`),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? l : a)
  let u
  const d = n.maxTranslate() - n.minTranslate()
  d === 0 ? (u = 0) : (u = (e - n.minTranslate()) / d),
    u !== o && n.updateProgress(e),
    n.emit('setTranslate', n.translate, t)
}
function $d() {
  return -this.snapGrid[0]
}
function kd() {
  return -this.snapGrid[this.snapGrid.length - 1]
}
function Nd(e = 0, t = this.params.speed, n = !0, s = !0, i) {
  const r = this,
    { params: o, wrapperEl: l } = r
  if (r.animating && o.preventInteractionOnTransition) return !1
  const a = r.minTranslate(),
    c = r.maxTranslate()
  let u
  if ((s && e > a ? (u = a) : s && e < c ? (u = c) : (u = e), r.updateProgress(u), o.cssMode)) {
    const d = r.isHorizontal()
    if (t === 0) l[d ? 'scrollLeft' : 'scrollTop'] = -u
    else {
      if (!r.support.smoothScroll)
        return Pr({ swiper: r, targetPosition: -u, side: d ? 'left' : 'top' }), !0
      l.scrollTo({ [d ? 'left' : 'top']: -u, behavior: 'smooth' })
    }
    return !0
  }
  return (
    t === 0
      ? (r.setTransition(0),
        r.setTranslate(u),
        n && (r.emit('beforeTransitionStart', t, i), r.emit('transitionEnd')))
      : (r.setTransition(t),
        r.setTranslate(u),
        n && (r.emit('beforeTransitionStart', t, i), r.emit('transitionStart')),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (h) {
              !r ||
                r.destroyed ||
                (h.target === this &&
                  (r.wrapperEl.removeEventListener(
                    'transitionend',
                    r.onTranslateToWrapperTransitionEnd,
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  n && r.emit('transitionEnd')))
            }),
          r.wrapperEl.addEventListener('transitionend', r.onTranslateToWrapperTransitionEnd))),
    !0
  )
}
const Hd = {
  getTranslate: Ld,
  setTranslate: Ad,
  minTranslate: $d,
  maxTranslate: kd,
  translateTo: Nd,
}
function zd(e, t) {
  const n = this
  n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`),
    n.emit('setTransition', e, t)
}
function Or({ swiper: e, runCallbacks: t, direction: n, step: s }) {
  const { activeIndex: i, previousIndex: r } = e
  let o = n
  if (
    (o || (i > r ? (o = 'next') : i < r ? (o = 'prev') : (o = 'reset')),
    e.emit(`transition${s}`),
    t && i !== r)
  ) {
    if (o === 'reset') {
      e.emit(`slideResetTransition${s}`)
      return
    }
    e.emit(`slideChangeTransition${s}`),
      o === 'next' ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`)
  }
}
function Dd(e = !0, t) {
  const n = this,
    { params: s } = n
  s.cssMode ||
    (s.autoHeight && n.updateAutoHeight(),
    Or({ swiper: n, runCallbacks: e, direction: t, step: 'Start' }))
}
function Fd(e = !0, t) {
  const n = this,
    { params: s } = n
  ;(n.animating = !1),
    !s.cssMode &&
      (n.setTransition(0), Or({ swiper: n, runCallbacks: e, direction: t, step: 'End' }))
}
const jd = { setTransition: zd, transitionStart: Dd, transitionEnd: Fd }
function Gd(e = 0, t = this.params.speed, n = !0, s, i) {
  typeof e == 'string' && (e = parseInt(e, 10))
  const r = this
  let o = e
  o < 0 && (o = 0)
  const {
    params: l,
    snapGrid: a,
    slidesGrid: c,
    previousIndex: u,
    activeIndex: d,
    rtlTranslate: h,
    wrapperEl: m,
    enabled: y,
  } = r
  if ((r.animating && l.preventInteractionOnTransition) || (!y && !s && !i)) return !1
  const v = Math.min(r.params.slidesPerGroupSkip, o)
  let x = v + Math.floor((o - v) / r.params.slidesPerGroup)
  x >= a.length && (x = a.length - 1)
  const p = -a[x]
  if (l.normalizeSlideIndex)
    for (let _ = 0; _ < c.length; _ += 1) {
      const E = -Math.floor(p * 100),
        A = Math.floor(c[_] * 100),
        N = Math.floor(c[_ + 1] * 100)
      typeof c[_ + 1] < 'u'
        ? E >= A && E < N - (N - A) / 2
          ? (o = _)
          : E >= A && E < N && (o = _ + 1)
        : E >= A && (o = _)
    }
  if (
    r.initialized &&
    o !== d &&
    ((!r.allowSlideNext && p < r.translate && p < r.minTranslate()) ||
      (!r.allowSlidePrev && p > r.translate && p > r.maxTranslate() && (d || 0) !== o))
  )
    return !1
  o !== (u || 0) && n && r.emit('beforeSlideChangeStart'), r.updateProgress(p)
  let b
  if (
    (o > d ? (b = 'next') : o < d ? (b = 'prev') : (b = 'reset'),
    (h && -p === r.translate) || (!h && p === r.translate))
  )
    return (
      r.updateActiveIndex(o),
      l.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      l.effect !== 'slide' && r.setTranslate(p),
      b !== 'reset' && (r.transitionStart(n, b), r.transitionEnd(n, b)),
      !1
    )
  if (l.cssMode) {
    const _ = r.isHorizontal(),
      E = h ? p : -p
    if (t === 0) {
      const A = r.virtual && r.params.virtual.enabled
      A && ((r.wrapperEl.style.scrollSnapType = 'none'), (r._immediateVirtual = !0)),
        A && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              m[_ ? 'scrollLeft' : 'scrollTop'] = E
            }))
          : (m[_ ? 'scrollLeft' : 'scrollTop'] = E),
        A &&
          requestAnimationFrame(() => {
            ;(r.wrapperEl.style.scrollSnapType = ''), (r._immediateVirtual = !1)
          })
    } else {
      if (!r.support.smoothScroll)
        return Pr({ swiper: r, targetPosition: E, side: _ ? 'left' : 'top' }), !0
      m.scrollTo({ [_ ? 'left' : 'top']: E, behavior: 'smooth' })
    }
    return !0
  }
  return (
    r.setTransition(t),
    r.setTranslate(p),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit('beforeTransitionStart', t, s),
    r.transitionStart(n, b),
    t === 0
      ? r.transitionEnd(n, b)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (E) {
            !r ||
              r.destroyed ||
              (E.target === this &&
                (r.wrapperEl.removeEventListener('transitionend', r.onSlideToWrapperTransitionEnd),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(n, b)))
          }),
        r.wrapperEl.addEventListener('transitionend', r.onSlideToWrapperTransitionEnd)),
    !0
  )
}
function Rd(e = 0, t = this.params.speed, n = !0, s) {
  typeof e == 'string' && (e = parseInt(e, 10))
  const i = this
  let r = e
  return (
    i.params.loop &&
      (i.virtual && i.params.virtual.enabled
        ? (r = r + i.virtual.slidesBefore)
        : (r = i.getSlideIndex(
            i.slides.filter((o) => o.getAttribute('data-swiper-slide-index') * 1 === r)[0],
          ))),
    i.slideTo(r, t, n, s)
  )
}
function Vd(e = this.params.speed, t = !0, n) {
  const s = this,
    { enabled: i, params: r, animating: o } = s
  if (!i) return s
  let l = r.slidesPerGroup
  r.slidesPerView === 'auto' &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (l = Math.max(s.slidesPerViewDynamic('current', !0), 1))
  const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l,
    c = s.virtual && r.virtual.enabled
  if (r.loop) {
    if (o && !c && r.loopPreventsSliding) return !1
    s.loopFix({ direction: 'next' }), (s._clientLeft = s.wrapperEl.clientLeft)
  }
  return r.rewind && s.isEnd ? s.slideTo(0, e, t, n) : s.slideTo(s.activeIndex + a, e, t, n)
}
function Wd(e = this.params.speed, t = !0, n) {
  const s = this,
    { params: i, snapGrid: r, slidesGrid: o, rtlTranslate: l, enabled: a, animating: c } = s
  if (!a) return s
  const u = s.virtual && i.virtual.enabled
  if (i.loop) {
    if (c && !u && i.loopPreventsSliding) return !1
    s.loopFix({ direction: 'prev' }), (s._clientLeft = s.wrapperEl.clientLeft)
  }
  const d = l ? s.translate : -s.translate
  function h(p) {
    return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p)
  }
  const m = h(d),
    y = r.map((p) => h(p))
  let v = r[y.indexOf(m) - 1]
  if (typeof v > 'u' && i.cssMode) {
    let p
    r.forEach((b, _) => {
      m >= b && (p = _)
    }),
      typeof p < 'u' && (v = r[p > 0 ? p - 1 : p])
  }
  let x = 0
  if (
    (typeof v < 'u' &&
      ((x = o.indexOf(v)),
      x < 0 && (x = s.activeIndex - 1),
      i.slidesPerView === 'auto' &&
        i.slidesPerGroup === 1 &&
        i.slidesPerGroupAuto &&
        ((x = x - s.slidesPerViewDynamic('previous', !0) + 1), (x = Math.max(x, 0)))),
    i.rewind && s.isBeginning)
  ) {
    const p =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1
    return s.slideTo(p, e, t, n)
  }
  return s.slideTo(x, e, t, n)
}
function Ud(e = this.params.speed, t = !0, n) {
  const s = this
  return s.slideTo(s.activeIndex, e, t, n)
}
function qd(e = this.params.speed, t = !0, n, s = 0.5) {
  const i = this
  let r = i.activeIndex
  const o = Math.min(i.params.slidesPerGroupSkip, r),
    l = o + Math.floor((r - o) / i.params.slidesPerGroup),
    a = i.rtlTranslate ? i.translate : -i.translate
  if (a >= i.snapGrid[l]) {
    const c = i.snapGrid[l],
      u = i.snapGrid[l + 1]
    a - c > (u - c) * s && (r += i.params.slidesPerGroup)
  } else {
    const c = i.snapGrid[l - 1],
      u = i.snapGrid[l]
    a - c <= (u - c) * s && (r -= i.params.slidesPerGroup)
  }
  return (r = Math.max(r, 0)), (r = Math.min(r, i.slidesGrid.length - 1)), i.slideTo(r, e, t, n)
}
function Kd() {
  const e = this,
    { params: t, slidesEl: n } = e,
    s = t.slidesPerView === 'auto' ? e.slidesPerViewDynamic() : t.slidesPerView
  let i = e.clickedIndex,
    r
  const o = e.isElement ? 'swiper-slide' : `.${t.slideClass}`
  if (t.loop) {
    if (e.animating) return
    ;(r = parseInt(e.clickedSlide.getAttribute('data-swiper-slide-index'), 10)),
      t.centeredSlides
        ? i < e.loopedSlides - s / 2 || i > e.slides.length - e.loopedSlides + s / 2
          ? (e.loopFix(),
            (i = e.getSlideIndex(Ge(n, `${o}[data-swiper-slide-index="${r}"]`)[0])),
            ds(() => {
              e.slideTo(i)
            }))
          : e.slideTo(i)
        : i > e.slides.length - s
        ? (e.loopFix(),
          (i = e.getSlideIndex(Ge(n, `${o}[data-swiper-slide-index="${r}"]`)[0])),
          ds(() => {
            e.slideTo(i)
          }))
        : e.slideTo(i)
  } else e.slideTo(i)
}
const Yd = {
  slideTo: Gd,
  slideToLoop: Rd,
  slideNext: Vd,
  slidePrev: Wd,
  slideReset: Ud,
  slideToClosest: qd,
  slideToClickedSlide: Kd,
}
function Xd(e) {
  const t = this,
    { params: n, slidesEl: s } = t
  if (!n.loop || (t.virtual && t.params.virtual.enabled)) return
  Ge(s, `.${n.slideClass}, swiper-slide`).forEach((r, o) => {
    r.setAttribute('data-swiper-slide-index', o)
  }),
    t.loopFix({ slideRealIndex: e, direction: n.centeredSlides ? void 0 : 'next' })
}
function Zd({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: n,
  setTranslate: s,
  activeSlideIndex: i,
  byController: r,
  byMousewheel: o,
} = {}) {
  const l = this
  if (!l.params.loop) return
  l.emit('beforeLoopFix')
  const { slides: a, allowSlidePrev: c, allowSlideNext: u, slidesEl: d, params: h } = l
  if (((l.allowSlidePrev = !0), (l.allowSlideNext = !0), l.virtual && h.virtual.enabled)) {
    t &&
      (!h.centeredSlides && l.snapIndex === 0
        ? l.slideTo(l.virtual.slides.length, 0, !1, !0)
        : h.centeredSlides && l.snapIndex < h.slidesPerView
        ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
        : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0)),
      (l.allowSlidePrev = c),
      (l.allowSlideNext = u),
      l.emit('loopFix')
    return
  }
  const m =
    h.slidesPerView === 'auto'
      ? l.slidesPerViewDynamic()
      : Math.ceil(parseFloat(h.slidesPerView, 10))
  let y = h.loopedSlides || m
  y % h.slidesPerGroup !== 0 && (y += h.slidesPerGroup - (y % h.slidesPerGroup)),
    (l.loopedSlides = y)
  const v = [],
    x = []
  let p = l.activeIndex
  typeof i > 'u'
    ? (i = l.getSlideIndex(l.slides.filter((N) => N.classList.contains('swiper-slide-active'))[0]))
    : (p = i)
  const b = n === 'next' || !n,
    _ = n === 'prev' || !n
  let E = 0,
    A = 0
  if (i < y) {
    E = Math.max(y - i, h.slidesPerGroup)
    for (let N = 0; N < y - i; N += 1) {
      const j = N - Math.floor(N / a.length) * a.length
      v.push(a.length - j - 1)
    }
  } else if (i > l.slides.length - y * 2) {
    A = Math.max(i - (l.slides.length - y * 2), h.slidesPerGroup)
    for (let N = 0; N < A; N += 1) {
      const j = N - Math.floor(N / a.length) * a.length
      x.push(j)
    }
  }
  if (
    (_ &&
      v.forEach((N) => {
        d.prepend(l.slides[N])
      }),
    b &&
      x.forEach((N) => {
        d.append(l.slides[N])
      }),
    l.recalcSlides(),
    h.watchSlidesProgress && l.updateSlidesOffset(),
    t)
  ) {
    if (v.length > 0 && _)
      if (typeof e > 'u') {
        const N = l.slidesGrid[p],
          C = l.slidesGrid[p + E] - N
        o
          ? l.setTranslate(l.translate - C)
          : (l.slideTo(p + E, 0, !1, !0),
            s && (l.touches[l.isHorizontal() ? 'startX' : 'startY'] += C))
      } else s && l.slideToLoop(e, 0, !1, !0)
    else if (x.length > 0 && b)
      if (typeof e > 'u') {
        const N = l.slidesGrid[p],
          C = l.slidesGrid[p - A] - N
        o
          ? l.setTranslate(l.translate - C)
          : (l.slideTo(p - A, 0, !1, !0),
            s && (l.touches[l.isHorizontal() ? 'startX' : 'startY'] += C))
      } else l.slideToLoop(e, 0, !1, !0)
  }
  if (
    ((l.allowSlidePrev = c), (l.allowSlideNext = u), l.controller && l.controller.control && !r)
  ) {
    const N = {
      slideRealIndex: e,
      slideTo: !1,
      direction: n,
      setTranslate: s,
      activeSlideIndex: i,
      byController: !0,
    }
    Array.isArray(l.controller.control)
      ? l.controller.control.forEach((j) => {
          j.params.loop && j.loopFix(N)
        })
      : l.controller.control instanceof l.constructor &&
        l.controller.control.params.loop &&
        l.controller.control.loopFix(N)
  }
  l.emit('loopFix')
}
function Qd() {
  const e = this,
    { slides: t, params: n, slidesEl: s } = e
  if (!n.loop || (e.virtual && e.params.virtual.enabled)) return
  e.recalcSlides()
  const i = []
  t.forEach((r) => {
    const o =
      typeof r.swiperSlideIndex > 'u'
        ? r.getAttribute('data-swiper-slide-index') * 1
        : r.swiperSlideIndex
    i[o] = r
  }),
    t.forEach((r) => {
      r.removeAttribute('data-swiper-slide-index')
    }),
    i.forEach((r) => {
      s.append(r)
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0)
}
const Jd = { loopCreate: Xd, loopFix: Zd, loopDestroy: Qd }
function ef(e) {
  const t = this
  if (!t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode) return
  const n = t.params.touchEventsTarget === 'container' ? t.el : t.wrapperEl
  t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = 'move'),
    (n.style.cursor = e ? 'grabbing' : 'grab'),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1
      })
}
function tf() {
  const e = this
  ;(e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[e.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = ''),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1
      }))
}
const nf = { setGrabCursor: ef, unsetGrabCursor: tf }
function sf(e, t = this) {
  function n(s) {
    if (!s || s === gt() || s === we()) return null
    s.assignedSlot && (s = s.assignedSlot)
    const i = s.closest(e)
    return !i && !s.getRootNode ? null : i || n(s.getRootNode().host)
  }
  return n(t)
}
function rf(e) {
  const t = this,
    n = gt(),
    s = we(),
    i = t.touchEventsData
  i.evCache.push(e)
  const { params: r, touches: o, enabled: l } = t
  if (
    !l ||
    (!r.simulateTouch && e.pointerType === 'mouse') ||
    (t.animating && r.preventInteractionOnTransition)
  )
    return
  !t.animating && r.cssMode && r.loop && t.loopFix()
  let a = e
  a.originalEvent && (a = a.originalEvent)
  let c = a.target
  if (
    (r.touchEventsTarget === 'wrapper' && !t.wrapperEl.contains(c)) ||
    ('which' in a && a.which === 3) ||
    ('button' in a && a.button > 0) ||
    (i.isTouched && i.isMoved)
  )
    return
  const u = !!r.noSwipingClass && r.noSwipingClass !== '',
    d = e.composedPath ? e.composedPath() : e.path
  u && a.target && a.target.shadowRoot && d && (c = d[0])
  const h = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    m = !!(a.target && a.target.shadowRoot)
  if (r.noSwiping && (m ? sf(h, c) : c.closest(h))) {
    t.allowClick = !0
    return
  }
  if (r.swipeHandler && !c.closest(r.swipeHandler)) return
  ;(o.currentX = a.pageX), (o.currentY = a.pageY)
  const y = o.currentX,
    v = o.currentY,
    x = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    p = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold
  if (x && (y <= p || y >= s.innerWidth - p))
    if (x === 'prevent') e.preventDefault()
    else return
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = y),
    (o.startY = v),
    (i.touchStartTime = Wt()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (i.allowThresholdMove = !1)
  let b = !0
  c.matches(i.focusableElements) && ((b = !1), c.nodeName === 'SELECT' && (i.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(i.focusableElements) &&
      n.activeElement !== c &&
      n.activeElement.blur()
  const _ = b && t.allowTouchMove && r.touchStartPreventDefault
  ;(r.touchStartForcePreventDefault || _) && !c.isContentEditable && a.preventDefault(),
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !r.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit('touchStart', a)
}
function of(e) {
  const t = gt(),
    n = this,
    s = n.touchEventsData,
    { params: i, touches: r, rtlTranslate: o, enabled: l } = n
  if (!l || (!i.simulateTouch && e.pointerType === 'mouse')) return
  let a = e
  if ((a.originalEvent && (a = a.originalEvent), !s.isTouched)) {
    s.startMoving && s.isScrolling && n.emit('touchMoveOpposite', a)
    return
  }
  const c = s.evCache.findIndex((N) => N.pointerId === a.pointerId)
  c >= 0 && (s.evCache[c] = a)
  const u = s.evCache.length > 1 ? s.evCache[0] : a,
    d = u.pageX,
    h = u.pageY
  if (a.preventedByNestedSwiper) {
    ;(r.startX = d), (r.startY = h)
    return
  }
  if (!n.allowTouchMove) {
    a.target.matches(s.focusableElements) || (n.allowClick = !1),
      s.isTouched &&
        (Object.assign(r, {
          startX: d,
          startY: h,
          prevX: n.touches.currentX,
          prevY: n.touches.currentY,
          currentX: d,
          currentY: h,
        }),
        (s.touchStartTime = Wt()))
    return
  }
  if (i.touchReleaseOnEdges && !i.loop) {
    if (n.isVertical()) {
      if (
        (h < r.startY && n.translate <= n.maxTranslate()) ||
        (h > r.startY && n.translate >= n.minTranslate())
      ) {
        ;(s.isTouched = !1), (s.isMoved = !1)
        return
      }
    } else if (
      (d < r.startX && n.translate <= n.maxTranslate()) ||
      (d > r.startX && n.translate >= n.minTranslate())
    )
      return
  }
  if (t.activeElement && a.target === t.activeElement && a.target.matches(s.focusableElements)) {
    ;(s.isMoved = !0), (n.allowClick = !1)
    return
  }
  if (
    (s.allowTouchCallbacks && n.emit('touchMove', a), a.targetTouches && a.targetTouches.length > 1)
  )
    return
  ;(r.currentX = d), (r.currentY = h)
  const m = r.currentX - r.startX,
    y = r.currentY - r.startY
  if (n.params.threshold && Math.sqrt(m ** 2 + y ** 2) < n.params.threshold) return
  if (typeof s.isScrolling > 'u') {
    let N
    ;(n.isHorizontal() && r.currentY === r.startY) || (n.isVertical() && r.currentX === r.startX)
      ? (s.isScrolling = !1)
      : m * m + y * y >= 25 &&
        ((N = (Math.atan2(Math.abs(y), Math.abs(m)) * 180) / Math.PI),
        (s.isScrolling = n.isHorizontal() ? N > i.touchAngle : 90 - N > i.touchAngle))
  }
  if (
    (s.isScrolling && n.emit('touchMoveOpposite', a),
    typeof s.startMoving > 'u' &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (s.startMoving = !0),
    s.isScrolling || (n.zoom && n.params.zoom && n.params.zoom.enabled && s.evCache.length > 1))
  ) {
    s.isTouched = !1
    return
  }
  if (!s.startMoving) return
  ;(n.allowClick = !1),
    !i.cssMode && a.cancelable && a.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && a.stopPropagation()
  let v = n.isHorizontal() ? m : y,
    x = n.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY
  i.oneWayMovement && ((v = Math.abs(v) * (o ? 1 : -1)), (x = Math.abs(x) * (o ? 1 : -1))),
    (r.diff = v),
    (v *= i.touchRatio),
    o && ((v = -v), (x = -x))
  const p = n.touchesDirection
  ;(n.swipeDirection = v > 0 ? 'prev' : 'next'), (n.touchesDirection = x > 0 ? 'prev' : 'next')
  const b = n.params.loop && !i.cssMode
  if (!s.isMoved) {
    if (
      (b && n.loopFix({ direction: n.swipeDirection }),
      (s.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const N = new window.CustomEvent('transitionend', { bubbles: !0, cancelable: !0 })
      n.wrapperEl.dispatchEvent(N)
    }
    ;(s.allowMomentumBounce = !1),
      i.grabCursor && (n.allowSlideNext === !0 || n.allowSlidePrev === !0) && n.setGrabCursor(!0),
      n.emit('sliderFirstMove', a)
  }
  let _
  s.isMoved &&
    p !== n.touchesDirection &&
    b &&
    Math.abs(v) >= 1 &&
    (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (_ = !0)),
    n.emit('sliderMove', a),
    (s.isMoved = !0),
    (s.currentTranslate = v + s.startTranslate)
  let E = !0,
    A = i.resistanceRatio
  if (
    (i.touchReleaseOnEdges && (A = 0),
    v > 0
      ? (b &&
          !_ &&
          s.currentTranslate >
            (i.centeredSlides ? n.minTranslate() - n.size / 2 : n.minTranslate()) &&
          n.loopFix({ direction: 'prev', setTranslate: !0, activeSlideIndex: 0 }),
        s.currentTranslate > n.minTranslate() &&
          ((E = !1),
          i.resistance &&
            (s.currentTranslate =
              n.minTranslate() - 1 + (-n.minTranslate() + s.startTranslate + v) ** A)))
      : v < 0 &&
        (b &&
          !_ &&
          s.currentTranslate <
            (i.centeredSlides ? n.maxTranslate() + n.size / 2 : n.maxTranslate()) &&
          n.loopFix({
            direction: 'next',
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (i.slidesPerView === 'auto'
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(i.slidesPerView, 10))),
          }),
        s.currentTranslate < n.maxTranslate() &&
          ((E = !1),
          i.resistance &&
            (s.currentTranslate =
              n.maxTranslate() + 1 - (n.maxTranslate() - s.startTranslate - v) ** A))),
    E && (a.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === 'next' &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === 'prev' &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !n.allowSlidePrev && !n.allowSlideNext && (s.currentTranslate = s.startTranslate),
    i.threshold > 0)
  )
    if (Math.abs(v) > i.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        ;(s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          (r.diff = n.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
        return
      }
    } else {
      s.currentTranslate = s.startTranslate
      return
    }
  !i.followFinger ||
    i.cssMode ||
    (((i.freeMode && i.freeMode.enabled && n.freeMode) || i.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    n.params.freeMode && i.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
    n.updateProgress(s.currentTranslate),
    n.setTranslate(s.currentTranslate))
}
function lf(e) {
  const t = this,
    n = t.touchEventsData,
    s = n.evCache.findIndex((_) => _.pointerId === e.pointerId)
  if (
    (s >= 0 && n.evCache.splice(s, 1),
    ['pointercancel', 'pointerout', 'pointerleave'].includes(e.type) &&
      !(e.type === 'pointercancel' && (t.browser.isSafari || t.browser.isWebView)))
  )
    return
  const { params: i, touches: r, rtlTranslate: o, slidesGrid: l, enabled: a } = t
  if (!a || (!i.simulateTouch && e.pointerType === 'mouse')) return
  let c = e
  if (
    (c.originalEvent && (c = c.originalEvent),
    n.allowTouchCallbacks && t.emit('touchEnd', c),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    n.isMoved && i.grabCursor && t.setGrabCursor(!1), (n.isMoved = !1), (n.startMoving = !1)
    return
  }
  i.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1)
  const u = Wt(),
    d = u - n.touchStartTime
  if (t.allowClick) {
    const _ = c.path || (c.composedPath && c.composedPath())
    t.updateClickedSlide((_ && _[0]) || c.target),
      t.emit('tap click', c),
      d < 300 && u - n.lastClickTime < 300 && t.emit('doubleTap doubleClick', c)
  }
  if (
    ((n.lastClickTime = Wt()),
    ds(() => {
      t.destroyed || (t.allowClick = !0)
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      r.diff === 0 ||
      n.currentTranslate === n.startTranslate)
  ) {
    ;(n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1)
    return
  }
  ;(n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1)
  let h
  if (
    (i.followFinger ? (h = o ? t.translate : -t.translate) : (h = -n.currentTranslate), i.cssMode)
  )
    return
  if (t.params.freeMode && i.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: h })
    return
  }
  let m = 0,
    y = t.slidesSizesGrid[0]
  for (let _ = 0; _ < l.length; _ += _ < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
    const E = _ < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
    typeof l[_ + E] < 'u'
      ? h >= l[_] && h < l[_ + E] && ((m = _), (y = l[_ + E] - l[_]))
      : h >= l[_] && ((m = _), (y = l[l.length - 1] - l[l.length - 2]))
  }
  let v = null,
    x = null
  i.rewind &&
    (t.isBeginning
      ? (x =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (v = 0))
  const p = (h - l[m]) / y,
    b = m < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup
  if (d > i.longSwipesMs) {
    if (!i.longSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.swipeDirection === 'next' &&
      (p >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? v : m + b) : t.slideTo(m)),
      t.swipeDirection === 'prev' &&
        (p > 1 - i.longSwipesRatio
          ? t.slideTo(m + b)
          : x !== null && p < 0 && Math.abs(p) > i.longSwipesRatio
          ? t.slideTo(x)
          : t.slideTo(m))
  } else {
    if (!i.shortSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.navigation && (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl)
      ? c.target === t.navigation.nextEl
        ? t.slideTo(m + b)
        : t.slideTo(m)
      : (t.swipeDirection === 'next' && t.slideTo(v !== null ? v : m + b),
        t.swipeDirection === 'prev' && t.slideTo(x !== null ? x : m))
  }
}
let Si
function Ci() {
  const e = this,
    { params: t, el: n } = e
  if (n && n.offsetWidth === 0) return
  t.breakpoints && e.setBreakpoint()
  const { allowSlideNext: s, allowSlidePrev: i, snapGrid: r } = e,
    o = e.virtual && e.params.virtual.enabled
  ;(e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses()
  const l = o && t.loop
  ;(t.slidesPerView === 'auto' || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !l
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !o
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(Si),
      (Si = setTimeout(() => {
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
      }, 500))),
    (e.allowSlidePrev = i),
    (e.allowSlideNext = s),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
}
function af(e) {
  const t = this
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())))
}
function cf() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: s } = e
  if (!s) return
  ;(e.previousTranslate = e.translate),
    e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses()
  let i
  const r = e.maxTranslate() - e.minTranslate()
  r === 0 ? (i = 0) : (i = (e.translate - e.minTranslate()) / r),
    i !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit('setTranslate', e.translate, !1)
}
const un = (e, t) => {
  if (!e || e.destroyed || !e.params) return
  const n = () => (e.isElement ? 'swiper-slide' : `.${e.params.slideClass}`),
    s = t.closest(n())
  if (s) {
    const i = s.querySelector(`.${e.params.lazyPreloaderClass}`)
    i && i.remove()
  }
}
function uf(e) {
  const t = this
  un(t, e.target), t.update()
}
let xi = !1
function df() {}
const Lr = (e, t) => {
  const n = gt(),
    { params: s, el: i, wrapperEl: r, device: o } = e,
    l = !!s.nested,
    a = t === 'on' ? 'addEventListener' : 'removeEventListener',
    c = t
  i[a]('pointerdown', e.onTouchStart, { passive: !1 }),
    n[a]('pointermove', e.onTouchMove, { passive: !1, capture: l }),
    n[a]('pointerup', e.onTouchEnd, { passive: !0 }),
    n[a]('pointercancel', e.onTouchEnd, { passive: !0 }),
    n[a]('pointerout', e.onTouchEnd, { passive: !0 }),
    n[a]('pointerleave', e.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) && i[a]('click', e.onClick, !0),
    s.cssMode && r[a]('scroll', e.onScroll),
    s.updateOnWindowResize
      ? e[c](
          o.ios || o.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate',
          Ci,
          !0,
        )
      : e[c]('observerUpdate', Ci, !0),
    i[a]('load', e.onLoad, { capture: !0 })
}
function ff() {
  const e = this,
    t = gt(),
    { params: n } = e
  ;(e.onTouchStart = rf.bind(e)),
    (e.onTouchMove = of.bind(e)),
    (e.onTouchEnd = lf.bind(e)),
    n.cssMode && (e.onScroll = cf.bind(e)),
    (e.onClick = af.bind(e)),
    (e.onLoad = uf.bind(e)),
    xi || (t.addEventListener('touchstart', df), (xi = !0)),
    Lr(e, 'on')
}
function pf() {
  Lr(this, 'off')
}
const hf = { attachEvents: ff, detachEvents: pf },
  wi = (e, t) => e.grid && t.grid && t.grid.rows > 1
function gf() {
  const e = this,
    { realIndex: t, initialized: n, params: s, el: i } = e,
    r = s.breakpoints
  if (!r || (r && Object.keys(r).length === 0)) return
  const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el)
  if (!o || e.currentBreakpoint === o) return
  const a = (o in r ? r[o] : void 0) || e.originalParams,
    c = wi(e, s),
    u = wi(e, a),
    d = s.enabled
  c && !u
    ? (i.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`,
      ),
      e.emitContainerClasses())
    : !c &&
      u &&
      (i.classList.add(`${s.containerModifierClass}grid`),
      ((a.grid.fill && a.grid.fill === 'column') || (!a.grid.fill && s.grid.fill === 'column')) &&
        i.classList.add(`${s.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ['navigation', 'pagination', 'scrollbar'].forEach((v) => {
      const x = s[v] && s[v].enabled,
        p = a[v] && a[v].enabled
      x && !p && e[v].disable(), !x && p && e[v].enable()
    })
  const h = a.direction && a.direction !== s.direction,
    m = s.loop && (a.slidesPerView !== s.slidesPerView || h)
  h && n && e.changeDirection(), xe(e.params, a)
  const y = e.params.enabled
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    d && !y ? e.disable() : !d && y && e.enable(),
    (e.currentBreakpoint = o),
    e.emit('_beforeBreakpoint', a),
    m && n && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit('breakpoint', a)
}
function mf(e, t = 'window', n) {
  if (!e || (t === 'container' && !n)) return
  let s = !1
  const i = we(),
    r = t === 'window' ? i.innerHeight : n.clientHeight,
    o = Object.keys(e).map((l) => {
      if (typeof l == 'string' && l.indexOf('@') === 0) {
        const a = parseFloat(l.substr(1))
        return { value: r * a, point: l }
      }
      return { value: l, point: l }
    })
  o.sort((l, a) => parseInt(l.value, 10) - parseInt(a.value, 10))
  for (let l = 0; l < o.length; l += 1) {
    const { point: a, value: c } = o[l]
    t === 'window'
      ? i.matchMedia(`(min-width: ${c}px)`).matches && (s = a)
      : c <= n.clientWidth && (s = a)
  }
  return s || 'max'
}
const vf = { setBreakpoint: gf, getBreakpoint: mf }
function _f(e, t) {
  const n = []
  return (
    e.forEach((s) => {
      typeof s == 'object'
        ? Object.keys(s).forEach((i) => {
            s[i] && n.push(t + i)
          })
        : typeof s == 'string' && n.push(t + s)
    }),
    n
  )
}
function bf() {
  const e = this,
    { classNames: t, params: n, rtl: s, el: i, device: r } = e,
    o = _f(
      [
        'initialized',
        n.direction,
        { 'free-mode': e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: s },
        { grid: n.grid && n.grid.rows > 1 },
        { 'grid-column': n.grid && n.grid.rows > 1 && n.grid.fill === 'column' },
        { android: r.android },
        { ios: r.ios },
        { 'css-mode': n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { 'watch-progress': n.watchSlidesProgress },
      ],
      n.containerModifierClass,
    )
  t.push(...o), i.classList.add(...t), e.emitContainerClasses()
}
function yf() {
  const e = this,
    { el: t, classNames: n } = e
  t.classList.remove(...n), e.emitContainerClasses()
}
const Sf = { addClasses: bf, removeClasses: yf }
function Cf() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: s } = n
  if (s) {
    const i = e.slides.length - 1,
      r = e.slidesGrid[i] + e.slidesSizesGrid[i] + s * 2
    e.isLocked = e.size > r
  } else e.isLocked = e.snapGrid.length === 1
  n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock')
}
const xf = { checkOverflow: Cf },
  Ti = {
    init: !0,
    direction: 'horizontal',
    oneWayMovement: !1,
    touchEventsTarget: 'wrapper',
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: 'input, select, option, textarea, button, video, label',
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: 'slide',
    breakpoints: void 0,
    breakpointsBase: 'window',
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: 'swiper-',
    slideClass: 'swiper-slide',
    slideActiveClass: 'swiper-slide-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideNextClass: 'swiper-slide-next',
    slidePrevClass: 'swiper-slide-prev',
    wrapperClass: 'swiper-wrapper',
    lazyPreloaderClass: 'swiper-lazy-preloader',
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  }
function wf(e, t) {
  return function (s = {}) {
    const i = Object.keys(s)[0],
      r = s[i]
    if (typeof r != 'object' || r === null) {
      xe(t, s)
      return
    }
    if (
      (['navigation', 'pagination', 'scrollbar'].indexOf(i) >= 0 &&
        e[i] === !0 &&
        (e[i] = { auto: !0 }),
      !(i in e && 'enabled' in r))
    ) {
      xe(t, s)
      return
    }
    e[i] === !0 && (e[i] = { enabled: !0 }),
      typeof e[i] == 'object' && !('enabled' in e[i]) && (e[i].enabled = !0),
      e[i] || (e[i] = { enabled: !1 }),
      xe(t, s)
  }
}
const Wn = {
    eventsEmitter: yd,
    update: Od,
    translate: Hd,
    transition: jd,
    slide: Yd,
    loop: Jd,
    grabCursor: nf,
    events: hf,
    breakpoints: vf,
    checkOverflow: xf,
    classes: Sf,
  },
  Un = {}
let Ut = class We {
  constructor(...t) {
    let n, s
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === 'Object'
      ? (s = t[0])
      : ([n, s] = t),
      s || (s = {}),
      (s = xe({}, s)),
      n && !s.el && (s.el = n)
    const i = gt()
    if (s.el && typeof s.el == 'string' && i.querySelectorAll(s.el).length > 1) {
      const a = []
      return (
        i.querySelectorAll(s.el).forEach((c) => {
          const u = xe({}, s, { el: c })
          a.push(new We(u))
        }),
        a
      )
    }
    const r = this
    ;(r.__swiper__ = !0),
      (r.support = Ir()),
      (r.device = gd({ userAgent: s.userAgent })),
      (r.browser = vd()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      s.modules && Array.isArray(s.modules) && r.modules.push(...s.modules)
    const o = {}
    r.modules.forEach((a) => {
      a({
        params: s,
        swiper: r,
        extendParams: wf(s, o),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      })
    })
    const l = xe({}, Ti, o)
    return (
      (r.params = xe({}, l, Un, s)),
      (r.originalParams = xe({}, r.params)),
      (r.passedParams = xe({}, s)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((a) => {
          r.on(a, r.params.on[a])
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: n,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return r.params.direction === 'horizontal'
        },
        isVertical() {
          return r.params.direction === 'vertical'
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: Wt(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit('_swiper'),
      r.params.init && r.init(),
      r
    )
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: s } = this,
      i = Ge(n, `.${s.slideClass}, swiper-slide`),
      r = gn(i[0])
    return gn(t) - r
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: s } = t
    t.slides = Ge(n, `.${s.slideClass}, swiper-slide`)
  }
  enable() {
    const t = this
    t.enabled || ((t.enabled = !0), t.params.grabCursor && t.setGrabCursor(), t.emit('enable'))
  }
  disable() {
    const t = this
    t.enabled && ((t.enabled = !1), t.params.grabCursor && t.unsetGrabCursor(), t.emit('disable'))
  }
  setProgress(t, n) {
    const s = this
    t = Math.min(Math.max(t, 0), 1)
    const i = s.minTranslate(),
      o = (s.maxTranslate() - i) * t + i
    s.translateTo(o, typeof n > 'u' ? 0 : n), s.updateActiveIndex(), s.updateSlidesClasses()
  }
  emitContainerClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const n = t.el.className
      .split(' ')
      .filter((s) => s.indexOf('swiper') === 0 || s.indexOf(t.params.containerModifierClass) === 0)
    t.emit('_containerClasses', n.join(' '))
  }
  getSlideClasses(t) {
    const n = this
    return n.destroyed
      ? ''
      : t.className
          .split(' ')
          .filter((s) => s.indexOf('swiper-slide') === 0 || s.indexOf(n.params.slideClass) === 0)
          .join(' ')
  }
  emitSlidesClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const n = []
    t.slides.forEach((s) => {
      const i = t.getSlideClasses(s)
      n.push({ slideEl: s, classNames: i }), t.emit('_slideClass', s, i)
    }),
      t.emit('_slideClasses', n)
  }
  slidesPerViewDynamic(t = 'current', n = !1) {
    const s = this,
      { params: i, slides: r, slidesGrid: o, slidesSizesGrid: l, size: a, activeIndex: c } = s
    let u = 1
    if (i.centeredSlides) {
      let d = r[c].swiperSlideSize,
        h
      for (let m = c + 1; m < r.length; m += 1)
        r[m] && !h && ((d += r[m].swiperSlideSize), (u += 1), d > a && (h = !0))
      for (let m = c - 1; m >= 0; m -= 1)
        r[m] && !h && ((d += r[m].swiperSlideSize), (u += 1), d > a && (h = !0))
    } else if (t === 'current')
      for (let d = c + 1; d < r.length; d += 1)
        (n ? o[d] + l[d] - o[c] < a : o[d] - o[c] < a) && (u += 1)
    else for (let d = c - 1; d >= 0; d -= 1) o[c] - o[d] < a && (u += 1)
    return u
  }
  update() {
    const t = this
    if (!t || t.destroyed) return
    const { snapGrid: n, params: s } = t
    s.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && un(t, o)
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses()
    function i() {
      const o = t.rtlTranslate ? t.translate * -1 : t.translate,
        l = Math.min(Math.max(o, t.maxTranslate()), t.minTranslate())
      t.setTranslate(l), t.updateActiveIndex(), t.updateSlidesClasses()
    }
    let r
    t.params.freeMode && t.params.freeMode.enabled
      ? (i(), t.params.autoHeight && t.updateAutoHeight())
      : ((t.params.slidesPerView === 'auto' || t.params.slidesPerView > 1) &&
        t.isEnd &&
        !t.params.centeredSlides
          ? (r = t.slideTo(t.slides.length - 1, 0, !1, !0))
          : (r = t.slideTo(t.activeIndex, 0, !1, !0)),
        r || i()),
      s.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
      t.emit('update')
  }
  changeDirection(t, n = !0) {
    const s = this,
      i = s.params.direction
    return (
      t || (t = i === 'horizontal' ? 'vertical' : 'horizontal'),
      t === i ||
        (t !== 'horizontal' && t !== 'vertical') ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
        s.el.classList.add(`${s.params.containerModifierClass}${t}`),
        s.emitContainerClasses(),
        (s.params.direction = t),
        s.slides.forEach((r) => {
          t === 'vertical' ? (r.style.width = '') : (r.style.height = '')
        }),
        s.emit('changeDirection'),
        n && s.update()),
      s
    )
  }
  changeLanguageDirection(t) {
    const n = this
    ;(n.rtl && t === 'rtl') ||
      (!n.rtl && t === 'ltr') ||
      ((n.rtl = t === 'rtl'),
      (n.rtlTranslate = n.params.direction === 'horizontal' && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`), (n.el.dir = 'rtl'))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`), (n.el.dir = 'ltr')),
      n.update())
  }
  mount(t) {
    const n = this
    if (n.mounted) return !0
    let s = t || n.params.el
    if ((typeof s == 'string' && (s = document.querySelector(s)), !s)) return !1
    ;(s.swiper = n), s.shadowEl && (n.isElement = !0)
    const i = () => `.${(n.params.wrapperClass || '').trim().split(' ').join('.')}`
    let o = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(i())
        : Ge(s, i())[0])()
    return (
      !o &&
        n.params.createElements &&
        ((o = Mr('div', n.params.wrapperClass)),
        s.append(o),
        Ge(s, `.${n.params.slideClass}`).forEach((l) => {
          o.append(l)
        })),
      Object.assign(n, {
        el: s,
        wrapperEl: o,
        slidesEl: n.isElement ? s : o,
        mounted: !0,
        rtl: s.dir.toLowerCase() === 'rtl' || Qe(s, 'direction') === 'rtl',
        rtlTranslate:
          n.params.direction === 'horizontal' &&
          (s.dir.toLowerCase() === 'rtl' || Qe(s, 'direction') === 'rtl'),
        wrongRTL: Qe(o, 'display') === '-webkit-box',
      }),
      !0
    )
  }
  init(t) {
    const n = this
    return (
      n.initialized ||
        n.mount(t) === !1 ||
        (n.emit('beforeInit'),
        n.params.breakpoints && n.setBreakpoint(),
        n.addClasses(),
        n.updateSize(),
        n.updateSlides(),
        n.params.watchOverflow && n.checkOverflow(),
        n.params.grabCursor && n.enabled && n.setGrabCursor(),
        n.params.loop && n.virtual && n.params.virtual.enabled
          ? n.slideTo(
              n.params.initialSlide + n.virtual.slidesBefore,
              0,
              n.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : n.slideTo(n.params.initialSlide, 0, n.params.runCallbacksOnInit, !1, !0),
        n.params.loop && n.loopCreate(),
        n.attachEvents(),
        [...n.el.querySelectorAll('[loading="lazy"]')].forEach((i) => {
          i.complete
            ? un(n, i)
            : i.addEventListener('load', (r) => {
                un(n, r.target)
              })
        }),
        (n.initialized = !0),
        n.emit('init'),
        n.emit('afterInit')),
      n
    )
  }
  destroy(t = !0, n = !0) {
    const s = this,
      { params: i, el: r, wrapperEl: o, slides: l } = s
    return (
      typeof s.params > 'u' ||
        s.destroyed ||
        (s.emit('beforeDestroy'),
        (s.initialized = !1),
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        n &&
          (s.removeClasses(),
          r.removeAttribute('style'),
          o.removeAttribute('style'),
          l &&
            l.length &&
            l.forEach((a) => {
              a.classList.remove(
                i.slideVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass,
              ),
                a.removeAttribute('style'),
                a.removeAttribute('data-swiper-slide-index')
            })),
        s.emit('destroy'),
        Object.keys(s.eventsListeners).forEach((a) => {
          s.off(a)
        }),
        t !== !1 && ((s.el.swiper = null), ld(s)),
        (s.destroyed = !0)),
      null
    )
  }
  static extendDefaults(t) {
    xe(Un, t)
  }
  static get extendedDefaults() {
    return Un
  }
  static get defaults() {
    return Ti
  }
  static installModule(t) {
    We.prototype.__modules__ || (We.prototype.__modules__ = [])
    const n = We.prototype.__modules__
    typeof t == 'function' && n.indexOf(t) < 0 && n.push(t)
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => We.installModule(n)), We)
      : (We.installModule(t), We)
  }
}
Object.keys(Wn).forEach((e) => {
  Object.keys(Wn[e]).forEach((t) => {
    Ut.prototype[t] = Wn[e][t]
  })
})
Ut.use([_d, bd])
function Ar(e, t, n, s) {
  return (
    e.params.createElements &&
      Object.keys(s).forEach((i) => {
        if (!n[i] && n.auto === !0) {
          let r = Ge(e.el, `.${s[i]}`)[0]
          r || ((r = Mr('div', s[i])), (r.className = s[i]), e.el.append(r)), (n[i] = r), (t[i] = r)
        }
      }),
    n
  )
}
function Tf({ swiper: e, extendParams: t, on: n, emit: s }) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled',
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null })
  const i = (y) => (Array.isArray(y) || (y = [y].filter((v) => !!v)), y)
  function r(y) {
    let v
    return y && typeof y == 'string' && e.isElement && ((v = e.el.shadowRoot.querySelector(y)), v)
      ? v
      : (y &&
          (typeof y == 'string' && (v = [...document.querySelectorAll(y)]),
          e.params.uniqueNavElements &&
            typeof y == 'string' &&
            v.length > 1 &&
            e.el.querySelectorAll(y).length === 1 &&
            (v = e.el.querySelector(y))),
        y && !v ? y : v)
  }
  function o(y, v) {
    const x = e.params.navigation
    ;(y = i(y)),
      y.forEach((p) => {
        p &&
          (p.classList[v ? 'add' : 'remove'](...x.disabledClass.split(' ')),
          p.tagName === 'BUTTON' && (p.disabled = v),
          e.params.watchOverflow &&
            e.enabled &&
            p.classList[e.isLocked ? 'add' : 'remove'](x.lockClass))
      })
  }
  function l() {
    const { nextEl: y, prevEl: v } = e.navigation
    if (e.params.loop) {
      o(v, !1), o(y, !1)
      return
    }
    o(v, e.isBeginning && !e.params.rewind), o(y, e.isEnd && !e.params.rewind)
  }
  function a(y) {
    y.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s('navigationPrev'))
  }
  function c(y) {
    y.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s('navigationNext'))
  }
  function u() {
    const y = e.params.navigation
    if (
      ((e.params.navigation = Ar(e, e.originalParams.navigation, e.params.navigation, {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-prev',
      })),
      !(y.nextEl || y.prevEl))
    )
      return
    let v = r(y.nextEl),
      x = r(y.prevEl)
    Object.assign(e.navigation, { nextEl: v, prevEl: x }), (v = i(v)), (x = i(x))
    const p = (b, _) => {
      b && b.addEventListener('click', _ === 'next' ? c : a),
        !e.enabled && b && b.classList.add(...y.lockClass.split(' '))
    }
    v.forEach((b) => p(b, 'next')), x.forEach((b) => p(b, 'prev'))
  }
  function d() {
    let { nextEl: y, prevEl: v } = e.navigation
    ;(y = i(y)), (v = i(v))
    const x = (p, b) => {
      p.removeEventListener('click', b === 'next' ? c : a),
        p.classList.remove(...e.params.navigation.disabledClass.split(' '))
    }
    y.forEach((p) => x(p, 'next')), v.forEach((p) => x(p, 'prev'))
  }
  n('init', () => {
    e.params.navigation.enabled === !1 ? m() : (u(), l())
  }),
    n('toEdge fromEdge lock unlock', () => {
      l()
    }),
    n('destroy', () => {
      d()
    }),
    n('enable disable', () => {
      let { nextEl: y, prevEl: v } = e.navigation
      ;(y = i(y)),
        (v = i(v)),
        [...y, ...v]
          .filter((x) => !!x)
          .forEach((x) => x.classList[e.enabled ? 'remove' : 'add'](e.params.navigation.lockClass))
    }),
    n('click', (y, v) => {
      let { nextEl: x, prevEl: p } = e.navigation
      ;(x = i(x)), (p = i(p))
      const b = v.target
      if (e.params.navigation.hideOnClick && !p.includes(b) && !x.includes(b)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === b || e.pagination.el.contains(b))
        )
          return
        let _
        x.length
          ? (_ = x[0].classList.contains(e.params.navigation.hiddenClass))
          : p.length && (_ = p[0].classList.contains(e.params.navigation.hiddenClass)),
          s(_ === !0 ? 'navigationShow' : 'navigationHide'),
          [...x, ...p]
            .filter((E) => !!E)
            .forEach((E) => E.classList.toggle(e.params.navigation.hiddenClass))
      }
    })
  const h = () => {
      e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(' ')), u(), l()
    },
    m = () => {
      e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(' ')), d()
    }
  Object.assign(e.navigation, { enable: h, disable: m, update: l, init: u, destroy: d })
}
function kt(e = '') {
  return `.${e
    .trim()
    .replace(/([\.:!\/])/g, '\\$1')
    .replace(/ /g, '.')}`
}
function Ef({ swiper: e, extendParams: t, on: n, emit: s }) {
  const i = 'swiper-pagination'
  t({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: 'bullets',
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (p) => p,
      formatFractionTotal: (p) => p,
      bulletClass: `${i}-bullet`,
      bulletActiveClass: `${i}-bullet-active`,
      modifierClass: `${i}-`,
      currentClass: `${i}-current`,
      totalClass: `${i}-total`,
      hiddenClass: `${i}-hidden`,
      progressbarFillClass: `${i}-progressbar-fill`,
      progressbarOppositeClass: `${i}-progressbar-opposite`,
      clickableClass: `${i}-clickable`,
      lockClass: `${i}-lock`,
      horizontalClass: `${i}-horizontal`,
      verticalClass: `${i}-vertical`,
      paginationDisabledClass: `${i}-disabled`,
    },
  }),
    (e.pagination = { el: null, bullets: [] })
  let r,
    o = 0
  const l = (p) => (Array.isArray(p) || (p = [p].filter((b) => !!b)), p)
  function a() {
    return (
      !e.params.pagination.el ||
      !e.pagination.el ||
      (Array.isArray(e.pagination.el) && e.pagination.el.length === 0)
    )
  }
  function c(p, b) {
    const { bulletActiveClass: _ } = e.params.pagination
    p &&
      ((p = p[`${b === 'prev' ? 'previous' : 'next'}ElementSibling`]),
      p &&
        (p.classList.add(`${_}-${b}`),
        (p = p[`${b === 'prev' ? 'previous' : 'next'}ElementSibling`]),
        p && p.classList.add(`${_}-${b}-${b}`)))
  }
  function u(p) {
    const b = p.target.closest(kt(e.params.pagination.bulletClass))
    if (!b) return
    p.preventDefault()
    const _ = gn(b) * e.params.slidesPerGroup
    if (e.params.loop) {
      if (e.realIndex === _) return
      ;(_ < e.loopedSlides || _ > e.slides.length - e.loopedSlides) &&
        e.loopFix({
          direction: _ < e.loopedSlides ? 'prev' : 'next',
          activeSlideIndex: _,
          slideTo: !1,
        }),
        e.slideToLoop(_)
    } else e.slideTo(_)
  }
  function d() {
    const p = e.rtl,
      b = e.params.pagination
    if (a()) return
    let _ = e.pagination.el
    _ = l(_)
    let E
    const A = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
      N = e.params.loop ? Math.ceil(A / e.params.slidesPerGroup) : e.snapGrid.length
    if (
      (e.params.loop
        ? (E =
            e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex)
        : typeof e.snapIndex < 'u'
        ? (E = e.snapIndex)
        : (E = e.activeIndex || 0),
      b.type === 'bullets' && e.pagination.bullets && e.pagination.bullets.length > 0)
    ) {
      const j = e.pagination.bullets
      let C, L, q
      if (
        (b.dynamicBullets &&
          ((r = fs(j[0], e.isHorizontal() ? 'width' : 'height', !0)),
          _.forEach((M) => {
            M.style[e.isHorizontal() ? 'width' : 'height'] = `${r * (b.dynamicMainBullets + 4)}px`
          }),
          b.dynamicMainBullets > 1 &&
            e.previousIndex !== void 0 &&
            ((o += E - (e.previousIndex || 0)),
            o > b.dynamicMainBullets - 1 ? (o = b.dynamicMainBullets - 1) : o < 0 && (o = 0)),
          (C = Math.max(E - o, 0)),
          (L = C + (Math.min(j.length, b.dynamicMainBullets) - 1)),
          (q = (L + C) / 2)),
        j.forEach((M) => {
          M.classList.remove(
            ...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(
              (k) => `${b.bulletActiveClass}${k}`,
            ),
          )
        }),
        _.length > 1)
      )
        j.forEach((M) => {
          const k = gn(M)
          k === E && M.classList.add(b.bulletActiveClass),
            b.dynamicBullets &&
              (k >= C && k <= L && M.classList.add(`${b.bulletActiveClass}-main`),
              k === C && c(M, 'prev'),
              k === L && c(M, 'next'))
        })
      else {
        const M = j[E]
        if ((M && M.classList.add(b.bulletActiveClass), b.dynamicBullets)) {
          const k = j[C],
            G = j[L]
          for (let le = C; le <= L; le += 1)
            j[le] && j[le].classList.add(`${b.bulletActiveClass}-main`)
          c(k, 'prev'), c(G, 'next')
        }
      }
      if (b.dynamicBullets) {
        const M = Math.min(j.length, b.dynamicMainBullets + 4),
          k = (r * M - r) / 2 - q * r,
          G = p ? 'right' : 'left'
        j.forEach((le) => {
          le.style[e.isHorizontal() ? G : 'top'] = `${k}px`
        })
      }
    }
    _.forEach((j, C) => {
      if (
        (b.type === 'fraction' &&
          (j.querySelectorAll(kt(b.currentClass)).forEach((L) => {
            L.textContent = b.formatFractionCurrent(E + 1)
          }),
          j.querySelectorAll(kt(b.totalClass)).forEach((L) => {
            L.textContent = b.formatFractionTotal(N)
          })),
        b.type === 'progressbar')
      ) {
        let L
        b.progressbarOpposite
          ? (L = e.isHorizontal() ? 'vertical' : 'horizontal')
          : (L = e.isHorizontal() ? 'horizontal' : 'vertical')
        const q = (E + 1) / N
        let M = 1,
          k = 1
        L === 'horizontal' ? (M = q) : (k = q),
          j.querySelectorAll(kt(b.progressbarFillClass)).forEach((G) => {
            ;(G.style.transform = `translate3d(0,0,0) scaleX(${M}) scaleY(${k})`),
              (G.style.transitionDuration = `${e.params.speed}ms`)
          })
      }
      b.type === 'custom' && b.renderCustom
        ? ((j.innerHTML = b.renderCustom(e, E + 1, N)), C === 0 && s('paginationRender', j))
        : (C === 0 && s('paginationRender', j), s('paginationUpdate', j)),
        e.params.watchOverflow &&
          e.enabled &&
          j.classList[e.isLocked ? 'add' : 'remove'](b.lockClass)
    })
  }
  function h() {
    const p = e.params.pagination
    if (a()) return
    const b = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
    let _ = e.pagination.el
    _ = l(_)
    let E = ''
    if (p.type === 'bullets') {
      let A = e.params.loop ? Math.ceil(b / e.params.slidesPerGroup) : e.snapGrid.length
      e.params.freeMode && e.params.freeMode.enabled && A > b && (A = b)
      for (let N = 0; N < A; N += 1)
        p.renderBullet
          ? (E += p.renderBullet.call(e, N, p.bulletClass))
          : (E += `<${p.bulletElement} class="${p.bulletClass}"></${p.bulletElement}>`)
    }
    p.type === 'fraction' &&
      (p.renderFraction
        ? (E = p.renderFraction.call(e, p.currentClass, p.totalClass))
        : (E = `<span class="${p.currentClass}"></span> / <span class="${p.totalClass}"></span>`)),
      p.type === 'progressbar' &&
        (p.renderProgressbar
          ? (E = p.renderProgressbar.call(e, p.progressbarFillClass))
          : (E = `<span class="${p.progressbarFillClass}"></span>`)),
      _.forEach((A) => {
        p.type !== 'custom' && (A.innerHTML = E || ''),
          p.type === 'bullets' &&
            (e.pagination.bullets = [...A.querySelectorAll(kt(p.bulletClass))])
      }),
      p.type !== 'custom' && s('paginationRender', _[0])
  }
  function m() {
    e.params.pagination = Ar(e, e.originalParams.pagination, e.params.pagination, {
      el: 'swiper-pagination',
    })
    const p = e.params.pagination
    if (!p.el) return
    let b
    typeof p.el == 'string' && e.isElement && (b = e.el.shadowRoot.querySelector(p.el)),
      !b && typeof p.el == 'string' && (b = [...document.querySelectorAll(p.el)]),
      b || (b = p.el),
      !(!b || b.length === 0) &&
        (e.params.uniqueNavElements &&
          typeof p.el == 'string' &&
          Array.isArray(b) &&
          b.length > 1 &&
          ((b = [...e.el.querySelectorAll(p.el)]),
          b.length > 1 && (b = b.filter((_) => Br(_, '.swiper')[0] === e.el)[0])),
        Array.isArray(b) && b.length === 1 && (b = b[0]),
        Object.assign(e.pagination, { el: b }),
        (b = l(b)),
        b.forEach((_) => {
          p.type === 'bullets' && p.clickable && _.classList.add(p.clickableClass),
            _.classList.add(p.modifierClass + p.type),
            _.classList.add(e.isHorizontal() ? p.horizontalClass : p.verticalClass),
            p.type === 'bullets' &&
              p.dynamicBullets &&
              (_.classList.add(`${p.modifierClass}${p.type}-dynamic`),
              (o = 0),
              p.dynamicMainBullets < 1 && (p.dynamicMainBullets = 1)),
            p.type === 'progressbar' &&
              p.progressbarOpposite &&
              _.classList.add(p.progressbarOppositeClass),
            p.clickable && _.addEventListener('click', u),
            e.enabled || _.classList.add(p.lockClass)
        }))
  }
  function y() {
    const p = e.params.pagination
    if (a()) return
    let b = e.pagination.el
    b &&
      ((b = l(b)),
      b.forEach((_) => {
        _.classList.remove(p.hiddenClass),
          _.classList.remove(p.modifierClass + p.type),
          _.classList.remove(e.isHorizontal() ? p.horizontalClass : p.verticalClass),
          p.clickable && _.removeEventListener('click', u)
      })),
      e.pagination.bullets &&
        e.pagination.bullets.forEach((_) => _.classList.remove(p.bulletActiveClass))
  }
  n('init', () => {
    e.params.pagination.enabled === !1 ? x() : (m(), h(), d())
  }),
    n('activeIndexChange', () => {
      typeof e.snapIndex > 'u' && d()
    }),
    n('snapIndexChange', () => {
      d()
    }),
    n('snapGridLengthChange', () => {
      h(), d()
    }),
    n('destroy', () => {
      y()
    }),
    n('enable disable', () => {
      let { el: p } = e.pagination
      p &&
        ((p = l(p)),
        p.forEach((b) => b.classList[e.enabled ? 'remove' : 'add'](e.params.pagination.lockClass)))
    }),
    n('lock unlock', () => {
      d()
    }),
    n('click', (p, b) => {
      const _ = b.target
      let { el: E } = e.pagination
      if (
        (Array.isArray(E) || (E = [E].filter((A) => !!A)),
        e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          E &&
          E.length > 0 &&
          !_.classList.contains(e.params.pagination.bulletClass))
      ) {
        if (
          e.navigation &&
          ((e.navigation.nextEl && _ === e.navigation.nextEl) ||
            (e.navigation.prevEl && _ === e.navigation.prevEl))
        )
          return
        const A = E[0].classList.contains(e.params.pagination.hiddenClass)
        s(A === !0 ? 'paginationShow' : 'paginationHide'),
          E.forEach((N) => N.classList.toggle(e.params.pagination.hiddenClass))
      }
    })
  const v = () => {
      e.el.classList.remove(e.params.pagination.paginationDisabledClass)
      let { el: p } = e.pagination
      p &&
        ((p = l(p)),
        p.forEach((b) => b.classList.remove(e.params.pagination.paginationDisabledClass))),
        m(),
        h(),
        d()
    },
    x = () => {
      e.el.classList.add(e.params.pagination.paginationDisabledClass)
      let { el: p } = e.pagination
      p &&
        ((p = l(p)),
        p.forEach((b) => b.classList.add(e.params.pagination.paginationDisabledClass))),
        y()
    }
  Object.assign(e.pagination, { enable: v, disable: x, render: h, update: d, init: m, destroy: y })
}
function ht(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === 'Object'
  )
}
function Je(e, t) {
  const n = ['__proto__', 'constructor', 'prototype']
  Object.keys(t)
    .filter((s) => n.indexOf(s) < 0)
    .forEach((s) => {
      typeof e[s] > 'u'
        ? (e[s] = t[s])
        : ht(t[s]) && ht(e[s]) && Object.keys(t[s]).length > 0
        ? t[s].__swiper__
          ? (e[s] = t[s])
          : Je(e[s], t[s])
        : (e[s] = t[s])
    })
}
function $r(e = {}) {
  return e.navigation && typeof e.navigation.nextEl > 'u' && typeof e.navigation.prevEl > 'u'
}
function kr(e = {}) {
  return e.pagination && typeof e.pagination.el > 'u'
}
function Nr(e = {}) {
  return e.scrollbar && typeof e.scrollbar.el > 'u'
}
function Hr(e = '') {
  const t = e
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => !!s),
    n = []
  return (
    t.forEach((s) => {
      n.indexOf(s) < 0 && n.push(s)
    }),
    n.join(' ')
  )
}
function Pf(e = '') {
  return e ? (e.includes('swiper-wrapper') ? e : `swiper-wrapper ${e}`) : 'swiper-wrapper'
}
const zr = [
  'modules',
  'init',
  '_direction',
  'oneWayMovement',
  'touchEventsTarget',
  'initialSlide',
  '_speed',
  'cssMode',
  'updateOnWindowResize',
  'resizeObserver',
  'nested',
  'focusableElements',
  '_enabled',
  '_width',
  '_height',
  'preventInteractionOnTransition',
  'userAgent',
  'url',
  '_edgeSwipeDetection',
  '_edgeSwipeThreshold',
  '_freeMode',
  '_autoHeight',
  'setWrapperSize',
  'virtualTranslate',
  '_effect',
  'breakpoints',
  '_spaceBetween',
  '_slidesPerView',
  'maxBackfaceHiddenSlides',
  '_grid',
  '_slidesPerGroup',
  '_slidesPerGroupSkip',
  '_slidesPerGroupAuto',
  '_centeredSlides',
  '_centeredSlidesBounds',
  '_slidesOffsetBefore',
  '_slidesOffsetAfter',
  'normalizeSlideIndex',
  '_centerInsufficientSlides',
  '_watchOverflow',
  'roundLengths',
  'touchRatio',
  'touchAngle',
  'simulateTouch',
  '_shortSwipes',
  '_longSwipes',
  'longSwipesRatio',
  'longSwipesMs',
  '_followFinger',
  'allowTouchMove',
  '_threshold',
  'touchMoveStopPropagation',
  'touchStartPreventDefault',
  'touchStartForcePreventDefault',
  'touchReleaseOnEdges',
  'uniqueNavElements',
  '_resistance',
  '_resistanceRatio',
  '_watchSlidesProgress',
  '_grabCursor',
  'preventClicks',
  'preventClicksPropagation',
  '_slideToClickedSlide',
  '_loop',
  'loopedSlides',
  'loopPreventsSliding',
  '_rewind',
  '_allowSlidePrev',
  '_allowSlideNext',
  '_swipeHandler',
  '_noSwiping',
  'noSwipingClass',
  'noSwipingSelector',
  'passiveListeners',
  'containerModifierClass',
  'slideClass',
  'slideActiveClass',
  'slideVisibleClass',
  'slideNextClass',
  'slidePrevClass',
  'wrapperClass',
  'lazyPreloaderClass',
  'runCallbacksOnInit',
  'observer',
  'observeParents',
  'observeSlideChildren',
  'a11y',
  '_autoplay',
  '_controller',
  'coverflowEffect',
  'cubeEffect',
  'fadeEffect',
  'flipEffect',
  'creativeEffect',
  'cardsEffect',
  'hashNavigation',
  'history',
  'keyboard',
  'mousewheel',
  '_navigation',
  '_pagination',
  'parallax',
  '_scrollbar',
  '_thumbs',
  'virtual',
  'zoom',
  'control',
  'injectStyles',
  'injectStylesUrls',
]
function Ei(e = {}, t = !0) {
  const n = { on: {} },
    s = {},
    i = {}
  Je(n, Ut.defaults), Je(n, Ut.extendedDefaults), (n._emitClasses = !0), (n.init = !1)
  const r = {},
    o = zr.map((a) => a.replace(/_/, '')),
    l = Object.assign({}, e)
  return (
    Object.keys(l).forEach((a) => {
      typeof e[a] > 'u' ||
        (o.indexOf(a) >= 0
          ? ht(e[a])
            ? ((n[a] = {}), (i[a] = {}), Je(n[a], e[a]), Je(i[a], e[a]))
            : ((n[a] = e[a]), (i[a] = e[a]))
          : a.search(/on[A-Z]/) === 0 && typeof e[a] == 'function'
          ? t
            ? (s[`${a[2].toLowerCase()}${a.substr(3)}`] = e[a])
            : (n.on[`${a[2].toLowerCase()}${a.substr(3)}`] = e[a])
          : (r[a] = e[a]))
    }),
    ['navigation', 'pagination', 'scrollbar'].forEach((a) => {
      n[a] === !0 && (n[a] = {}), n[a] === !1 && delete n[a]
    }),
    { params: n, passedParams: i, rest: r, events: s }
  )
}
function Mf({ el: e, nextEl: t, prevEl: n, paginationEl: s, scrollbarEl: i, swiper: r }, o) {
  $r(o) &&
    t &&
    n &&
    ((r.params.navigation.nextEl = t),
    (r.originalParams.navigation.nextEl = t),
    (r.params.navigation.prevEl = n),
    (r.originalParams.navigation.prevEl = n)),
    kr(o) && s && ((r.params.pagination.el = s), (r.originalParams.pagination.el = s)),
    Nr(o) && i && ((r.params.scrollbar.el = i), (r.originalParams.scrollbar.el = i)),
    r.init(e)
}
function Bf(e, t, n, s, i) {
  const r = []
  if (!t) return r
  const o = (a) => {
    r.indexOf(a) < 0 && r.push(a)
  }
  if (n && s) {
    const a = s.map(i),
      c = n.map(i)
    a.join('') !== c.join('') && o('children'), s.length !== n.length && o('children')
  }
  return (
    zr
      .filter((a) => a[0] === '_')
      .map((a) => a.replace(/_/, ''))
      .forEach((a) => {
        if (a in e && a in t)
          if (ht(e[a]) && ht(t[a])) {
            const c = Object.keys(e[a]),
              u = Object.keys(t[a])
            c.length !== u.length
              ? o(a)
              : (c.forEach((d) => {
                  e[a][d] !== t[a][d] && o(a)
                }),
                u.forEach((d) => {
                  e[a][d] !== t[a][d] && o(a)
                }))
          } else e[a] !== t[a] && o(a)
      }),
    r
  )
}
function qn(e, t, n) {
  e === void 0 && (e = {})
  const s = [],
    i = { 'container-start': [], 'container-end': [], 'wrapper-start': [], 'wrapper-end': [] },
    r = (o, l) => {
      Array.isArray(o) &&
        o.forEach((a) => {
          const c = typeof a.type == 'symbol'
          l === 'default' && (l = 'container-end'),
            c && a.children
              ? r(a.children, 'default')
              : a.type && (a.type.name === 'SwiperSlide' || a.type.name === 'AsyncComponentWrapper')
              ? s.push(a)
              : i[l] && i[l].push(a)
        })
    }
  return (
    Object.keys(e).forEach((o) => {
      if (typeof e[o] != 'function') return
      const l = e[o]()
      r(l, o)
    }),
    (n.value = t.value),
    (t.value = s),
    { slides: s, slots: i }
  )
}
function If({
  swiper: e,
  slides: t,
  passedParams: n,
  changedParams: s,
  nextEl: i,
  prevEl: r,
  scrollbarEl: o,
  paginationEl: l,
}) {
  const a = s.filter((C) => C !== 'children' && C !== 'direction' && C !== 'wrapperClass'),
    { params: c, pagination: u, navigation: d, scrollbar: h, virtual: m, thumbs: y } = e
  let v, x, p, b, _, E, A, N
  s.includes('thumbs') && n.thumbs && n.thumbs.swiper && c.thumbs && !c.thumbs.swiper && (v = !0),
    s.includes('controller') &&
      n.controller &&
      n.controller.control &&
      c.controller &&
      !c.controller.control &&
      (x = !0),
    s.includes('pagination') &&
      n.pagination &&
      (n.pagination.el || l) &&
      (c.pagination || c.pagination === !1) &&
      u &&
      !u.el &&
      (p = !0),
    s.includes('scrollbar') &&
      n.scrollbar &&
      (n.scrollbar.el || o) &&
      (c.scrollbar || c.scrollbar === !1) &&
      h &&
      !h.el &&
      (b = !0),
    s.includes('navigation') &&
      n.navigation &&
      (n.navigation.prevEl || r) &&
      (n.navigation.nextEl || i) &&
      (c.navigation || c.navigation === !1) &&
      d &&
      !d.prevEl &&
      !d.nextEl &&
      (_ = !0)
  const j = (C) => {
    e[C] &&
      (e[C].destroy(),
      C === 'navigation'
        ? (e.isElement && (e[C].prevEl.remove(), e[C].nextEl.remove()),
          (c[C].prevEl = void 0),
          (c[C].nextEl = void 0),
          (e[C].prevEl = void 0),
          (e[C].nextEl = void 0))
        : (e.isElement && e[C].el.remove(), (c[C].el = void 0), (e[C].el = void 0)))
  }
  s.includes('loop') &&
    e.isElement &&
    (c.loop && !n.loop ? (E = !0) : !c.loop && n.loop ? (A = !0) : (N = !0)),
    a.forEach((C) => {
      if (ht(c[C]) && ht(n[C])) Je(c[C], n[C])
      else {
        const L = n[C]
        ;(L === !0 || L === !1) && (C === 'navigation' || C === 'pagination' || C === 'scrollbar')
          ? L === !1 && j(C)
          : (c[C] = n[C])
      }
    }),
    a.includes('controller') &&
      !x &&
      e.controller &&
      e.controller.control &&
      c.controller &&
      c.controller.control &&
      (e.controller.control = c.controller.control),
    s.includes('children') && t && m && c.virtual.enabled && ((m.slides = t), m.update(!0)),
    s.includes('children') && t && c.loop && (N = !0),
    v && y.init() && y.update(!0),
    x && (e.controller.control = c.controller.control),
    p &&
      (e.isElement &&
        (!l || typeof l == 'string') &&
        ((l = document.createElement('div')),
        l.classList.add('swiper-pagination'),
        e.el.shadowEl.appendChild(l)),
      l && (c.pagination.el = l),
      u.init(),
      u.render(),
      u.update()),
    b &&
      (e.isElement &&
        (!o || typeof o == 'string') &&
        ((o = document.createElement('div')),
        o.classList.add('swiper-scrollbar'),
        e.el.shadowEl.appendChild(o)),
      o && (c.scrollbar.el = o),
      h.init(),
      h.updateSize(),
      h.setTranslate()),
    _ &&
      (e.isElement &&
        ((!i || typeof i == 'string') &&
          ((i = document.createElement('div')),
          i.classList.add('swiper-button-next'),
          e.el.shadowEl.appendChild(i)),
        (!r || typeof r == 'string') &&
          ((r = document.createElement('div')),
          r.classList.add('swiper-button-prev'),
          e.el.shadowEl.appendChild(r))),
      i && (c.navigation.nextEl = i),
      r && (c.navigation.prevEl = r),
      d.init(),
      d.update()),
    s.includes('allowSlideNext') && (e.allowSlideNext = n.allowSlideNext),
    s.includes('allowSlidePrev') && (e.allowSlidePrev = n.allowSlidePrev),
    s.includes('direction') && e.changeDirection(n.direction, !1),
    (E || N) && e.loopDestroy(),
    (A || N) && e.loopCreate(),
    e.update()
}
function Of(e, t, n) {
  if (!n) return null
  const s = (u) => {
      let d = u
      return u < 0 ? (d = t.length + u) : d >= t.length && (d = d - t.length), d
    },
    i = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? 'right' : 'left']: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: r, to: o } = n,
    l = e.value.params.loop ? -t.length : 0,
    a = e.value.params.loop ? t.length * 2 : t.length,
    c = []
  for (let u = l; u < a; u += 1) u >= r && u <= o && c.push(t[s(u)])
  return c.map(
    (u) => (
      u.props || (u.props = {}),
      u.props.style || (u.props.style = {}),
      (u.props.swiperRef = e),
      (u.props.style = i),
      Oe(u.type, { ...u.props }, u.children)
    ),
  )
}
const Lf = (e) => {
    !e ||
      e.destroyed ||
      !e.params.virtual ||
      (e.params.virtual && !e.params.virtual.enabled) ||
      (e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.parallax && e.params.parallax && e.params.parallax.enabled && e.parallax.setTranslate())
  },
  Af = {
    name: 'Swiper',
    props: {
      tag: { type: String, default: 'div' },
      wrapperTag: { type: String, default: 'div' },
      modules: { type: Array, default: void 0 },
      init: { type: Boolean, default: void 0 },
      direction: { type: String, default: void 0 },
      oneWayMovement: { type: Boolean, default: void 0 },
      touchEventsTarget: { type: String, default: void 0 },
      initialSlide: { type: Number, default: void 0 },
      speed: { type: Number, default: void 0 },
      cssMode: { type: Boolean, default: void 0 },
      updateOnWindowResize: { type: Boolean, default: void 0 },
      resizeObserver: { type: Boolean, default: void 0 },
      nested: { type: Boolean, default: void 0 },
      focusableElements: { type: String, default: void 0 },
      width: { type: Number, default: void 0 },
      height: { type: Number, default: void 0 },
      preventInteractionOnTransition: { type: Boolean, default: void 0 },
      userAgent: { type: String, default: void 0 },
      url: { type: String, default: void 0 },
      edgeSwipeDetection: { type: [Boolean, String], default: void 0 },
      edgeSwipeThreshold: { type: Number, default: void 0 },
      autoHeight: { type: Boolean, default: void 0 },
      setWrapperSize: { type: Boolean, default: void 0 },
      virtualTranslate: { type: Boolean, default: void 0 },
      effect: { type: String, default: void 0 },
      breakpoints: { type: Object, default: void 0 },
      spaceBetween: { type: [Number, String], default: void 0 },
      slidesPerView: { type: [Number, String], default: void 0 },
      maxBackfaceHiddenSlides: { type: Number, default: void 0 },
      slidesPerGroup: { type: Number, default: void 0 },
      slidesPerGroupSkip: { type: Number, default: void 0 },
      slidesPerGroupAuto: { type: Boolean, default: void 0 },
      centeredSlides: { type: Boolean, default: void 0 },
      centeredSlidesBounds: { type: Boolean, default: void 0 },
      slidesOffsetBefore: { type: Number, default: void 0 },
      slidesOffsetAfter: { type: Number, default: void 0 },
      normalizeSlideIndex: { type: Boolean, default: void 0 },
      centerInsufficientSlides: { type: Boolean, default: void 0 },
      watchOverflow: { type: Boolean, default: void 0 },
      roundLengths: { type: Boolean, default: void 0 },
      touchRatio: { type: Number, default: void 0 },
      touchAngle: { type: Number, default: void 0 },
      simulateTouch: { type: Boolean, default: void 0 },
      shortSwipes: { type: Boolean, default: void 0 },
      longSwipes: { type: Boolean, default: void 0 },
      longSwipesRatio: { type: Number, default: void 0 },
      longSwipesMs: { type: Number, default: void 0 },
      followFinger: { type: Boolean, default: void 0 },
      allowTouchMove: { type: Boolean, default: void 0 },
      threshold: { type: Number, default: void 0 },
      touchMoveStopPropagation: { type: Boolean, default: void 0 },
      touchStartPreventDefault: { type: Boolean, default: void 0 },
      touchStartForcePreventDefault: { type: Boolean, default: void 0 },
      touchReleaseOnEdges: { type: Boolean, default: void 0 },
      uniqueNavElements: { type: Boolean, default: void 0 },
      resistance: { type: Boolean, default: void 0 },
      resistanceRatio: { type: Number, default: void 0 },
      watchSlidesProgress: { type: Boolean, default: void 0 },
      grabCursor: { type: Boolean, default: void 0 },
      preventClicks: { type: Boolean, default: void 0 },
      preventClicksPropagation: { type: Boolean, default: void 0 },
      slideToClickedSlide: { type: Boolean, default: void 0 },
      loop: { type: Boolean, default: void 0 },
      loopedSlides: { type: Number, default: void 0 },
      loopPreventsSliding: { type: Boolean, default: void 0 },
      rewind: { type: Boolean, default: void 0 },
      allowSlidePrev: { type: Boolean, default: void 0 },
      allowSlideNext: { type: Boolean, default: void 0 },
      swipeHandler: { type: Boolean, default: void 0 },
      noSwiping: { type: Boolean, default: void 0 },
      noSwipingClass: { type: String, default: void 0 },
      noSwipingSelector: { type: String, default: void 0 },
      passiveListeners: { type: Boolean, default: void 0 },
      containerModifierClass: { type: String, default: void 0 },
      slideClass: { type: String, default: void 0 },
      slideActiveClass: { type: String, default: void 0 },
      slideVisibleClass: { type: String, default: void 0 },
      slideNextClass: { type: String, default: void 0 },
      slidePrevClass: { type: String, default: void 0 },
      wrapperClass: { type: String, default: void 0 },
      lazyPreloaderClass: { type: String, default: void 0 },
      runCallbacksOnInit: { type: Boolean, default: void 0 },
      observer: { type: Boolean, default: void 0 },
      observeParents: { type: Boolean, default: void 0 },
      observeSlideChildren: { type: Boolean, default: void 0 },
      a11y: { type: [Boolean, Object], default: void 0 },
      autoplay: { type: [Boolean, Object], default: void 0 },
      controller: { type: Object, default: void 0 },
      coverflowEffect: { type: Object, default: void 0 },
      cubeEffect: { type: Object, default: void 0 },
      fadeEffect: { type: Object, default: void 0 },
      flipEffect: { type: Object, default: void 0 },
      creativeEffect: { type: Object, default: void 0 },
      cardsEffect: { type: Object, default: void 0 },
      hashNavigation: { type: [Boolean, Object], default: void 0 },
      history: { type: [Boolean, Object], default: void 0 },
      keyboard: { type: [Boolean, Object], default: void 0 },
      mousewheel: { type: [Boolean, Object], default: void 0 },
      navigation: { type: [Boolean, Object], default: void 0 },
      pagination: { type: [Boolean, Object], default: void 0 },
      parallax: { type: [Boolean, Object], default: void 0 },
      scrollbar: { type: [Boolean, Object], default: void 0 },
      thumbs: { type: Object, default: void 0 },
      virtual: { type: [Boolean, Object], default: void 0 },
      zoom: { type: [Boolean, Object], default: void 0 },
      grid: { type: [Object], default: void 0 },
      freeMode: { type: [Boolean, Object], default: void 0 },
      enabled: { type: Boolean, default: void 0 },
    },
    emits: [
      '_beforeBreakpoint',
      '_containerClasses',
      '_slideClass',
      '_slideClasses',
      '_swiper',
      '_freeModeNoMomentumRelease',
      'activeIndexChange',
      'afterInit',
      'autoplay',
      'autoplayStart',
      'autoplayStop',
      'autoplayPause',
      'autoplayResume',
      'autoplayTimeLeft',
      'beforeDestroy',
      'beforeInit',
      'beforeLoopFix',
      'beforeResize',
      'beforeSlideChangeStart',
      'beforeTransitionStart',
      'breakpoint',
      'changeDirection',
      'click',
      'disable',
      'doubleTap',
      'doubleClick',
      'destroy',
      'enable',
      'fromEdge',
      'hashChange',
      'hashSet',
      'init',
      'keyPress',
      'lock',
      'loopFix',
      'momentumBounce',
      'navigationHide',
      'navigationShow',
      'navigationPrev',
      'navigationNext',
      'observerUpdate',
      'orientationchange',
      'paginationHide',
      'paginationRender',
      'paginationShow',
      'paginationUpdate',
      'progress',
      'reachBeginning',
      'reachEnd',
      'realIndexChange',
      'resize',
      'scroll',
      'scrollbarDragEnd',
      'scrollbarDragMove',
      'scrollbarDragStart',
      'setTransition',
      'setTranslate',
      'slideChange',
      'slideChangeTransitionEnd',
      'slideChangeTransitionStart',
      'slideNextTransitionEnd',
      'slideNextTransitionStart',
      'slidePrevTransitionEnd',
      'slidePrevTransitionStart',
      'slideResetTransitionStart',
      'slideResetTransitionEnd',
      'sliderMove',
      'sliderFirstMove',
      'slidesLengthChange',
      'slidesGridLengthChange',
      'snapGridLengthChange',
      'snapIndexChange',
      'swiper',
      'tap',
      'toEdge',
      'touchEnd',
      'touchMove',
      'touchMoveOpposite',
      'touchStart',
      'transitionEnd',
      'transitionStart',
      'unlock',
      'update',
      'virtualUpdate',
      'zoomChange',
    ],
    setup(e, t) {
      let { slots: n, emit: s } = t
      const { tag: i, wrapperTag: r } = e,
        o = _e('swiper'),
        l = _e(null),
        a = _e(!1),
        c = _e(!1),
        u = _e(null),
        d = _e(null),
        h = _e(null),
        m = { value: [] },
        y = { value: [] },
        v = _e(null),
        x = _e(null),
        p = _e(null),
        b = _e(null),
        { params: _, passedParams: E } = Ei(e, !1)
      qn(n, m, y), (h.value = E), (y.value = m.value)
      const A = () => {
        qn(n, m, y), (a.value = !0)
      }
      ;(_.onAny = function (C) {
        for (var L = arguments.length, q = new Array(L > 1 ? L - 1 : 0), M = 1; M < L; M++)
          q[M - 1] = arguments[M]
        s(C, ...q)
      }),
        Object.assign(_.on, {
          _beforeBreakpoint: A,
          _containerClasses(C, L) {
            o.value = L
          },
        })
      const N = { ..._ }
      if (
        (delete N.wrapperClass,
        (d.value = new Ut(N)),
        d.value.virtual && d.value.params.virtual.enabled)
      ) {
        d.value.virtual.slides = m.value
        const C = {
          cache: !1,
          slides: m.value,
          renderExternal: (L) => {
            l.value = L
          },
          renderExternalUpdate: !1,
        }
        Je(d.value.params.virtual, C), Je(d.value.originalParams.virtual, C)
      }
      Os(() => {
        !c.value && d.value && (d.value.emitSlidesClasses(), (c.value = !0))
        const { passedParams: C } = Ei(e, !1),
          L = Bf(C, h.value, m.value, y.value, (q) => q.props && q.props.key)
        ;(h.value = C),
          (L.length || a.value) &&
            d.value &&
            !d.value.destroyed &&
            If({
              swiper: d.value,
              slides: m.value,
              passedParams: C,
              changedParams: L,
              nextEl: v.value,
              prevEl: x.value,
              scrollbarEl: b.value,
              paginationEl: p.value,
            }),
          (a.value = !1)
      }),
        Is('swiper', d),
        Pt(l, () => {
          er(() => {
            Lf(d.value)
          })
        }),
        Mn(() => {
          u.value &&
            (Mf(
              {
                el: u.value,
                nextEl: v.value,
                prevEl: x.value,
                paginationEl: p.value,
                scrollbarEl: b.value,
                swiper: d.value,
              },
              _,
            ),
            s('swiper', d.value))
        }),
        Bn(() => {
          d.value && !d.value.destroyed && d.value.destroy(!0, !1)
        })
      function j(C) {
        return _.virtual
          ? Of(d, C, l.value)
          : (C.forEach((L, q) => {
              L.props || (L.props = {}), (L.props.swiperRef = d), (L.props.swiperSlideIndex = q)
            }),
            C)
      }
      return () => {
        const { slides: C, slots: L } = qn(n, m, y)
        return Oe(i, { ref: u, class: Hr(o.value) }, [
          L['container-start'],
          Oe(r, { class: Pf(_.wrapperClass) }, [L['wrapper-start'], j(C), L['wrapper-end']]),
          $r(e) && [
            Oe('div', { ref: x, class: 'swiper-button-prev' }),
            Oe('div', { ref: v, class: 'swiper-button-next' }),
          ],
          Nr(e) && Oe('div', { ref: b, class: 'swiper-scrollbar' }),
          kr(e) && Oe('div', { ref: p, class: 'swiper-pagination' }),
          L['container-end'],
        ])
      }
    },
  },
  $f = {
    name: 'SwiperSlide',
    props: {
      tag: { type: String, default: 'div' },
      swiperRef: { type: Object, required: !1 },
      swiperSlideIndex: { type: Number, default: void 0, required: !1 },
      zoom: { type: Boolean, default: void 0, required: !1 },
      lazy: { type: Boolean, default: !1, required: !1 },
      virtualIndex: { type: [String, Number], default: void 0 },
    },
    setup(e, t) {
      let { slots: n } = t,
        s = !1
      const { swiperRef: i } = e,
        r = _e(null),
        o = _e('swiper-slide'),
        l = _e(!1)
      function a(d, h, m) {
        h === r.value && (o.value = m)
      }
      Mn(() => {
        !i || !i.value || (i.value.on('_slideClass', a), (s = !0))
      }),
        dr(() => {
          s || !i || !i.value || (i.value.on('_slideClass', a), (s = !0))
        }),
        Os(() => {
          !r.value ||
            !i ||
            !i.value ||
            (typeof e.swiperSlideIndex < 'u' && (r.value.swiperSlideIndex = e.swiperSlideIndex),
            i.value.destroyed && o.value !== 'swiper-slide' && (o.value = 'swiper-slide'))
        }),
        Bn(() => {
          !i || !i.value || i.value.off('_slideClass', a)
        })
      const c = Hs(() => ({
        isActive: o.value.indexOf('swiper-slide-active') >= 0,
        isVisible: o.value.indexOf('swiper-slide-visible') >= 0,
        isPrev: o.value.indexOf('swiper-slide-prev') >= 0,
        isNext: o.value.indexOf('swiper-slide-next') >= 0,
      }))
      Is('swiperSlide', c)
      const u = () => {
        l.value = !0
      }
      return () =>
        Oe(
          e.tag,
          {
            class: Hr(`${o.value}`),
            ref: r,
            'data-swiper-slide-index':
              typeof e.virtualIndex > 'u' && i && i.value && i.value.params.loop
                ? e.swiperSlideIndex
                : e.virtualIndex,
            onLoadCapture: u,
          },
          e.zoom
            ? Oe(
                'div',
                {
                  class: 'swiper-zoom-container',
                  'data-swiper-zoom': typeof e.zoom == 'number' ? e.zoom : void 0,
                },
                [
                  n.default && n.default(c.value),
                  e.lazy && !l.value && Oe('div', { class: 'swiper-lazy-preloader' }),
                ],
              )
            : [
                n.default && n.default(c.value),
                e.lazy && !l.value && Oe('div', { class: 'swiper-lazy-preloader' }),
              ],
        )
    },
  }
const kf = {
  name: 'SimilarsSwiper',
  props: { content: { type: Array, required: !0 } },
  computed: {
    multipliedProducts() {
      return [
        ...this.$props.content,
        ...this.$props.content,
        ...this.$props.content,
        ...this.$props.content,
      ]
    },
  },
  components: { SwipeItem: rd, Swiper: Af, SwiperSlide: $f },
  setup() {
    return {
      onSwiper: (n) => {
        console.log(n)
      },
      onSlideChange: () => {
        console.log('slide change')
      },
      modules: [Ef, Tf],
    }
  },
}
function Nf(e, t, n, s, i, r) {
  const o = te('SwipeItem'),
    l = te('swiper-slide'),
    a = te('swiper')
  return (
    X(),
    as(
      a,
      {
        modules: s.modules,
        'slides-per-view': 4,
        'space-between': 20,
        onSwiper: s.onSwiper,
        onSlideChange: s.onSlideChange,
        pagination: { type: 'fraction' },
        navigation: '',
      },
      {
        default: es(() => [
          (X(!0),
          Q(
            ve,
            null,
            Ls(
              r.multipliedProducts,
              (c) => (
                X(),
                as(
                  l,
                  { key: c.id },
                  { default: es(() => [W(o, { content: c }, null, 8, ['content'])]), _: 2 },
                  1024,
                )
              ),
            ),
            128,
          )),
        ]),
        _: 1,
      },
      8,
      ['modules', 'onSwiper', 'onSlideChange'],
    )
  )
}
const Hf = ne(kf, [['render', Nf]])
const zf = {
    name: 'Similars',
    computed: {
      products() {
        return this.$store.getters.getAllProducts
      },
    },
    components: { SimilarsSwiper: Hf },
  },
  Df = { class: 'Similars' },
  Ff = z('h2', { class: 'Similars__heading' }, 'Просмотренные товары', -1)
function jf(e, t, n, s, i, r) {
  const o = te('SimilarsSwiper')
  return X(), Q('section', Df, [Ff, W(o, { content: r.products }, null, 8, ['content'])])
}
const Gf = ne(zf, [['render', jf]]),
  Rf = { name: 'App', components: { Header: Iu, Path: Gu, Basket: au, Similars: Gf } }
function Vf(e, t, n, s, i, r) {
  const o = te('Header'),
    l = te('Path'),
    a = te('Basket'),
    c = te('Similars')
  return (
    X(),
    Q(ve, null, [W(o), z('main', null, [W(l, { path: ['Главная', 'Корзина'] }), W(a), W(c)])], 64)
  )
}
const Wf = ne(Rf, [['render', Vf]])
function Uf() {
  return Dr().__VUE_DEVTOOLS_GLOBAL_HOOK__
}
function Dr() {
  return typeof navigator < 'u' && typeof window < 'u' ? window : typeof global < 'u' ? global : {}
}
const qf = typeof Proxy == 'function',
  Kf = 'devtools-plugin:setup',
  Yf = 'plugin:settings:set'
let yt, ps
function Xf() {
  var e
  return (
    yt !== void 0 ||
      (typeof window < 'u' && window.performance
        ? ((yt = !0), (ps = window.performance))
        : typeof global < 'u' &&
          !((e = global.perf_hooks) === null || e === void 0) &&
          e.performance
        ? ((yt = !0), (ps = global.perf_hooks.performance))
        : (yt = !1)),
    yt
  )
}
function Zf() {
  return Xf() ? ps.now() : Date.now()
}
class Qf {
  constructor(t, n) {
    ;(this.target = null),
      (this.targetQueue = []),
      (this.onQueue = []),
      (this.plugin = t),
      (this.hook = n)
    const s = {}
    if (t.settings)
      for (const o in t.settings) {
        const l = t.settings[o]
        s[o] = l.defaultValue
      }
    const i = `__vue-devtools-plugin-settings__${t.id}`
    let r = Object.assign({}, s)
    try {
      const o = localStorage.getItem(i),
        l = JSON.parse(o)
      Object.assign(r, l)
    } catch {}
    ;(this.fallbacks = {
      getSettings() {
        return r
      },
      setSettings(o) {
        try {
          localStorage.setItem(i, JSON.stringify(o))
        } catch {}
        r = o
      },
      now() {
        return Zf()
      },
    }),
      n &&
        n.on(Yf, (o, l) => {
          o === this.plugin.id && this.fallbacks.setSettings(l)
        }),
      (this.proxiedOn = new Proxy(
        {},
        {
          get: (o, l) =>
            this.target
              ? this.target.on[l]
              : (...a) => {
                  this.onQueue.push({ method: l, args: a })
                },
        },
      )),
      (this.proxiedTarget = new Proxy(
        {},
        {
          get: (o, l) =>
            this.target
              ? this.target[l]
              : l === 'on'
              ? this.proxiedOn
              : Object.keys(this.fallbacks).includes(l)
              ? (...a) => (
                  this.targetQueue.push({ method: l, args: a, resolve: () => {} }),
                  this.fallbacks[l](...a)
                )
              : (...a) =>
                  new Promise((c) => {
                    this.targetQueue.push({ method: l, args: a, resolve: c })
                  }),
        },
      ))
  }
  async setRealTarget(t) {
    this.target = t
    for (const n of this.onQueue) this.target.on[n.method](...n.args)
    for (const n of this.targetQueue) n.resolve(await this.target[n.method](...n.args))
  }
}
function Jf(e, t) {
  const n = e,
    s = Dr(),
    i = Uf(),
    r = qf && n.enableEarlyProxy
  if (i && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r)) i.emit(Kf, e, t)
  else {
    const o = r ? new Qf(n, i) : null
    ;(s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: o,
    }),
      o && t(o.proxiedTarget)
  }
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */ var ep = 'store'
function At(e, t) {
  Object.keys(e).forEach(function (n) {
    return t(e[n], n)
  })
}
function tp(e) {
  return e !== null && typeof e == 'object'
}
function np(e) {
  return e && typeof e.then == 'function'
}
function sp(e, t) {
  return function () {
    return e(t)
  }
}
function Fr(e, t, n) {
  return (
    t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)),
    function () {
      var s = t.indexOf(e)
      s > -1 && t.splice(s, 1)
    }
  )
}
function jr(e, t) {
  ;(e._actions = Object.create(null)),
    (e._mutations = Object.create(null)),
    (e._wrappedGetters = Object.create(null)),
    (e._modulesNamespaceMap = Object.create(null))
  var n = e.state
  Ln(e, n, [], e._modules.root, !0), Ds(e, n, t)
}
function Ds(e, t, n) {
  var s = e._state,
    i = e._scope
  ;(e.getters = {}), (e._makeLocalGettersCache = Object.create(null))
  var r = e._wrappedGetters,
    o = {},
    l = {},
    a = fo(!0)
  a.run(function () {
    At(r, function (c, u) {
      ;(o[u] = sp(c, e)),
        (l[u] = Hs(function () {
          return o[u]()
        })),
        Object.defineProperty(e.getters, u, {
          get: function () {
            return l[u].value
          },
          enumerable: !0,
        })
    })
  }),
    (e._state = xn({ data: t })),
    (e._scope = a),
    e.strict && ap(e),
    s &&
      n &&
      e._withCommit(function () {
        s.data = null
      }),
    i && i.stop()
}
function Ln(e, t, n, s, i) {
  var r = !n.length,
    o = e._modules.getNamespace(n)
  if ((s.namespaced && (e._modulesNamespaceMap[o], (e._modulesNamespaceMap[o] = s)), !r && !i)) {
    var l = Fs(t, n.slice(0, -1)),
      a = n[n.length - 1]
    e._withCommit(function () {
      l[a] = s.state
    })
  }
  var c = (s.context = ip(e, o, n))
  s.forEachMutation(function (u, d) {
    var h = o + d
    rp(e, h, u, c)
  }),
    s.forEachAction(function (u, d) {
      var h = u.root ? d : o + d,
        m = u.handler || u
      op(e, h, m, c)
    }),
    s.forEachGetter(function (u, d) {
      var h = o + d
      lp(e, h, u, c)
    }),
    s.forEachChild(function (u, d) {
      Ln(e, t, n.concat(d), u, i)
    })
}
function ip(e, t, n) {
  var s = t === '',
    i = {
      dispatch: s
        ? e.dispatch
        : function (r, o, l) {
            var a = mn(r, o, l),
              c = a.payload,
              u = a.options,
              d = a.type
            return (!u || !u.root) && (d = t + d), e.dispatch(d, c)
          },
      commit: s
        ? e.commit
        : function (r, o, l) {
            var a = mn(r, o, l),
              c = a.payload,
              u = a.options,
              d = a.type
            ;(!u || !u.root) && (d = t + d), e.commit(d, c, u)
          },
    }
  return (
    Object.defineProperties(i, {
      getters: {
        get: s
          ? function () {
              return e.getters
            }
          : function () {
              return Gr(e, t)
            },
      },
      state: {
        get: function () {
          return Fs(e.state, n)
        },
      },
    }),
    i
  )
}
function Gr(e, t) {
  if (!e._makeLocalGettersCache[t]) {
    var n = {},
      s = t.length
    Object.keys(e.getters).forEach(function (i) {
      if (i.slice(0, s) === t) {
        var r = i.slice(s)
        Object.defineProperty(n, r, {
          get: function () {
            return e.getters[i]
          },
          enumerable: !0,
        })
      }
    }),
      (e._makeLocalGettersCache[t] = n)
  }
  return e._makeLocalGettersCache[t]
}
function rp(e, t, n, s) {
  var i = e._mutations[t] || (e._mutations[t] = [])
  i.push(function (o) {
    n.call(e, s.state, o)
  })
}
function op(e, t, n, s) {
  var i = e._actions[t] || (e._actions[t] = [])
  i.push(function (o) {
    var l = n.call(
      e,
      {
        dispatch: s.dispatch,
        commit: s.commit,
        getters: s.getters,
        state: s.state,
        rootGetters: e.getters,
        rootState: e.state,
      },
      o,
    )
    return (
      np(l) || (l = Promise.resolve(l)),
      e._devtoolHook
        ? l.catch(function (a) {
            throw (e._devtoolHook.emit('vuex:error', a), a)
          })
        : l
    )
  })
}
function lp(e, t, n, s) {
  e._wrappedGetters[t] ||
    (e._wrappedGetters[t] = function (r) {
      return n(s.state, s.getters, r.state, r.getters)
    })
}
function ap(e) {
  Pt(
    function () {
      return e._state.data
    },
    function () {},
    { deep: !0, flush: 'sync' },
  )
}
function Fs(e, t) {
  return t.reduce(function (n, s) {
    return n[s]
  }, e)
}
function mn(e, t, n) {
  return tp(e) && e.type && ((n = t), (t = e), (e = e.type)), { type: e, payload: t, options: n }
}
var cp = 'vuex bindings',
  Pi = 'vuex:mutations',
  Kn = 'vuex:actions',
  St = 'vuex',
  up = 0
function dp(e, t) {
  Jf(
    {
      id: 'org.vuejs.vuex',
      app: e,
      label: 'Vuex',
      homepage: 'https://next.vuex.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      packageName: 'vuex',
      componentStateTypes: [cp],
    },
    function (n) {
      n.addTimelineLayer({ id: Pi, label: 'Vuex Mutations', color: Mi }),
        n.addTimelineLayer({ id: Kn, label: 'Vuex Actions', color: Mi }),
        n.addInspector({
          id: St,
          label: 'Vuex',
          icon: 'storage',
          treeFilterPlaceholder: 'Filter stores...',
        }),
        n.on.getInspectorTree(function (s) {
          if (s.app === e && s.inspectorId === St)
            if (s.filter) {
              var i = []
              Ur(i, t._modules.root, s.filter, ''), (s.rootNodes = i)
            } else s.rootNodes = [Wr(t._modules.root, '')]
        }),
        n.on.getInspectorState(function (s) {
          if (s.app === e && s.inspectorId === St) {
            var i = s.nodeId
            Gr(t, i),
              (s.state = hp(
                mp(t._modules, i),
                i === 'root' ? t.getters : t._makeLocalGettersCache,
                i,
              ))
          }
        }),
        n.on.editInspectorState(function (s) {
          if (s.app === e && s.inspectorId === St) {
            var i = s.nodeId,
              r = s.path
            i !== 'root' && (r = i.split('/').filter(Boolean).concat(r)),
              t._withCommit(function () {
                s.set(t._state.data, r, s.state.value)
              })
          }
        }),
        t.subscribe(function (s, i) {
          var r = {}
          s.payload && (r.payload = s.payload),
            (r.state = i),
            n.notifyComponentUpdate(),
            n.sendInspectorTree(St),
            n.sendInspectorState(St),
            n.addTimelineEvent({ layerId: Pi, event: { time: Date.now(), title: s.type, data: r } })
        }),
        t.subscribeAction({
          before: function (s, i) {
            var r = {}
            s.payload && (r.payload = s.payload),
              (s._id = up++),
              (s._time = Date.now()),
              (r.state = i),
              n.addTimelineEvent({
                layerId: Kn,
                event: { time: s._time, title: s.type, groupId: s._id, subtitle: 'start', data: r },
              })
          },
          after: function (s, i) {
            var r = {},
              o = Date.now() - s._time
            ;(r.duration = {
              _custom: {
                type: 'duration',
                display: o + 'ms',
                tooltip: 'Action duration',
                value: o,
              },
            }),
              s.payload && (r.payload = s.payload),
              (r.state = i),
              n.addTimelineEvent({
                layerId: Kn,
                event: {
                  time: Date.now(),
                  title: s.type,
                  groupId: s._id,
                  subtitle: 'end',
                  data: r,
                },
              })
          },
        })
    },
  )
}
var Mi = 8702998,
  fp = 6710886,
  pp = 16777215,
  Rr = { label: 'namespaced', textColor: pp, backgroundColor: fp }
function Vr(e) {
  return e && e !== 'root' ? e.split('/').slice(-2, -1)[0] : 'Root'
}
function Wr(e, t) {
  return {
    id: t || 'root',
    label: Vr(t),
    tags: e.namespaced ? [Rr] : [],
    children: Object.keys(e._children).map(function (n) {
      return Wr(e._children[n], t + n + '/')
    }),
  }
}
function Ur(e, t, n, s) {
  s.includes(n) &&
    e.push({
      id: s || 'root',
      label: s.endsWith('/') ? s.slice(0, s.length - 1) : s || 'Root',
      tags: t.namespaced ? [Rr] : [],
    }),
    Object.keys(t._children).forEach(function (i) {
      Ur(e, t._children[i], n, s + i + '/')
    })
}
function hp(e, t, n) {
  t = n === 'root' ? t : t[n]
  var s = Object.keys(t),
    i = {
      state: Object.keys(e.state).map(function (o) {
        return { key: o, editable: !0, value: e.state[o] }
      }),
    }
  if (s.length) {
    var r = gp(t)
    i.getters = Object.keys(r).map(function (o) {
      return {
        key: o.endsWith('/') ? Vr(o) : o,
        editable: !1,
        value: hs(function () {
          return r[o]
        }),
      }
    })
  }
  return i
}
function gp(e) {
  var t = {}
  return (
    Object.keys(e).forEach(function (n) {
      var s = n.split('/')
      if (s.length > 1) {
        var i = t,
          r = s.pop()
        s.forEach(function (o) {
          i[o] || (i[o] = { _custom: { value: {}, display: o, tooltip: 'Module', abstract: !0 } }),
            (i = i[o]._custom.value)
        }),
          (i[r] = hs(function () {
            return e[n]
          }))
      } else
        t[n] = hs(function () {
          return e[n]
        })
    }),
    t
  )
}
function mp(e, t) {
  var n = t.split('/').filter(function (s) {
    return s
  })
  return n.reduce(
    function (s, i, r) {
      var o = s[i]
      if (!o) throw new Error('Missing module "' + i + '" for path "' + t + '".')
      return r === n.length - 1 ? o : o._children
    },
    t === 'root' ? e : e.root._children,
  )
}
function hs(e) {
  try {
    return e()
  } catch (t) {
    return t
  }
}
var ke = function (t, n) {
    ;(this.runtime = n), (this._children = Object.create(null)), (this._rawModule = t)
    var s = t.state
    this.state = (typeof s == 'function' ? s() : s) || {}
  },
  qr = { namespaced: { configurable: !0 } }
qr.namespaced.get = function () {
  return !!this._rawModule.namespaced
}
ke.prototype.addChild = function (t, n) {
  this._children[t] = n
}
ke.prototype.removeChild = function (t) {
  delete this._children[t]
}
ke.prototype.getChild = function (t) {
  return this._children[t]
}
ke.prototype.hasChild = function (t) {
  return t in this._children
}
ke.prototype.update = function (t) {
  ;(this._rawModule.namespaced = t.namespaced),
    t.actions && (this._rawModule.actions = t.actions),
    t.mutations && (this._rawModule.mutations = t.mutations),
    t.getters && (this._rawModule.getters = t.getters)
}
ke.prototype.forEachChild = function (t) {
  At(this._children, t)
}
ke.prototype.forEachGetter = function (t) {
  this._rawModule.getters && At(this._rawModule.getters, t)
}
ke.prototype.forEachAction = function (t) {
  this._rawModule.actions && At(this._rawModule.actions, t)
}
ke.prototype.forEachMutation = function (t) {
  this._rawModule.mutations && At(this._rawModule.mutations, t)
}
Object.defineProperties(ke.prototype, qr)
var mt = function (t) {
  this.register([], t, !1)
}
mt.prototype.get = function (t) {
  return t.reduce(function (n, s) {
    return n.getChild(s)
  }, this.root)
}
mt.prototype.getNamespace = function (t) {
  var n = this.root
  return t.reduce(function (s, i) {
    return (n = n.getChild(i)), s + (n.namespaced ? i + '/' : '')
  }, '')
}
mt.prototype.update = function (t) {
  Kr([], this.root, t)
}
mt.prototype.register = function (t, n, s) {
  var i = this
  s === void 0 && (s = !0)
  var r = new ke(n, s)
  if (t.length === 0) this.root = r
  else {
    var o = this.get(t.slice(0, -1))
    o.addChild(t[t.length - 1], r)
  }
  n.modules &&
    At(n.modules, function (l, a) {
      i.register(t.concat(a), l, s)
    })
}
mt.prototype.unregister = function (t) {
  var n = this.get(t.slice(0, -1)),
    s = t[t.length - 1],
    i = n.getChild(s)
  i && i.runtime && n.removeChild(s)
}
mt.prototype.isRegistered = function (t) {
  var n = this.get(t.slice(0, -1)),
    s = t[t.length - 1]
  return n ? n.hasChild(s) : !1
}
function Kr(e, t, n) {
  if ((t.update(n), n.modules))
    for (var s in n.modules) {
      if (!t.getChild(s)) return
      Kr(e.concat(s), t.getChild(s), n.modules[s])
    }
}
function vp(e) {
  return new Se(e)
}
var Se = function (t) {
    var n = this
    t === void 0 && (t = {})
    var s = t.plugins
    s === void 0 && (s = [])
    var i = t.strict
    i === void 0 && (i = !1)
    var r = t.devtools
    ;(this._committing = !1),
      (this._actions = Object.create(null)),
      (this._actionSubscribers = []),
      (this._mutations = Object.create(null)),
      (this._wrappedGetters = Object.create(null)),
      (this._modules = new mt(t)),
      (this._modulesNamespaceMap = Object.create(null)),
      (this._subscribers = []),
      (this._makeLocalGettersCache = Object.create(null)),
      (this._scope = null),
      (this._devtools = r)
    var o = this,
      l = this,
      a = l.dispatch,
      c = l.commit
    ;(this.dispatch = function (h, m) {
      return a.call(o, h, m)
    }),
      (this.commit = function (h, m, y) {
        return c.call(o, h, m, y)
      }),
      (this.strict = i)
    var u = this._modules.root.state
    Ln(this, u, [], this._modules.root),
      Ds(this, u),
      s.forEach(function (d) {
        return d(n)
      })
  },
  js = { state: { configurable: !0 } }
Se.prototype.install = function (t, n) {
  t.provide(n || ep, this), (t.config.globalProperties.$store = this)
  var s = this._devtools !== void 0 ? this._devtools : !1
  s && dp(t, this)
}
js.state.get = function () {
  return this._state.data
}
js.state.set = function (e) {}
Se.prototype.commit = function (t, n, s) {
  var i = this,
    r = mn(t, n, s),
    o = r.type,
    l = r.payload,
    a = { type: o, payload: l },
    c = this._mutations[o]
  c &&
    (this._withCommit(function () {
      c.forEach(function (d) {
        d(l)
      })
    }),
    this._subscribers.slice().forEach(function (u) {
      return u(a, i.state)
    }))
}
Se.prototype.dispatch = function (t, n) {
  var s = this,
    i = mn(t, n),
    r = i.type,
    o = i.payload,
    l = { type: r, payload: o },
    a = this._actions[r]
  if (a) {
    try {
      this._actionSubscribers
        .slice()
        .filter(function (u) {
          return u.before
        })
        .forEach(function (u) {
          return u.before(l, s.state)
        })
    } catch {}
    var c =
      a.length > 1
        ? Promise.all(
            a.map(function (u) {
              return u(o)
            }),
          )
        : a[0](o)
    return new Promise(function (u, d) {
      c.then(
        function (h) {
          try {
            s._actionSubscribers
              .filter(function (m) {
                return m.after
              })
              .forEach(function (m) {
                return m.after(l, s.state)
              })
          } catch {}
          u(h)
        },
        function (h) {
          try {
            s._actionSubscribers
              .filter(function (m) {
                return m.error
              })
              .forEach(function (m) {
                return m.error(l, s.state, h)
              })
          } catch {}
          d(h)
        },
      )
    })
  }
}
Se.prototype.subscribe = function (t, n) {
  return Fr(t, this._subscribers, n)
}
Se.prototype.subscribeAction = function (t, n) {
  var s = typeof t == 'function' ? { before: t } : t
  return Fr(s, this._actionSubscribers, n)
}
Se.prototype.watch = function (t, n, s) {
  var i = this
  return Pt(
    function () {
      return t(i.state, i.getters)
    },
    n,
    Object.assign({}, s),
  )
}
Se.prototype.replaceState = function (t) {
  var n = this
  this._withCommit(function () {
    n._state.data = t
  })
}
Se.prototype.registerModule = function (t, n, s) {
  s === void 0 && (s = {}),
    typeof t == 'string' && (t = [t]),
    this._modules.register(t, n),
    Ln(this, this.state, t, this._modules.get(t), s.preserveState),
    Ds(this, this.state)
}
Se.prototype.unregisterModule = function (t) {
  var n = this
  typeof t == 'string' && (t = [t]),
    this._modules.unregister(t),
    this._withCommit(function () {
      var s = Fs(n.state, t.slice(0, -1))
      delete s[t[t.length - 1]]
    }),
    jr(this)
}
Se.prototype.hasModule = function (t) {
  return typeof t == 'string' && (t = [t]), this._modules.isRegistered(t)
}
Se.prototype.hotUpdate = function (t) {
  this._modules.update(t), jr(this, !0)
}
Se.prototype._withCommit = function (t) {
  var n = this._committing
  ;(this._committing = !0), t(), (this._committing = n)
}
Object.defineProperties(Se.prototype, js)
const _p = {
    state: { price: 0, count: 0, shouldInstall: !1, products: [], loading: !1 },
    getters: {
      getPrice(e) {
        return e.price
      },
      getCount(e) {
        return e.count
      },
      getShouldInstall(e) {
        return e.shouldInstall
      },
      getBasketProducts(e) {
        return e.products
      },
      getLoading(e) {
        return e.loading
      },
    },
    mutations: {
      setPrice(e, t) {
        e.price = t
      },
      setCount(e, t) {
        e.count = t
      },
      setShouldInstall(e, t) {
        e.shouldInstall = t
      },
      setBasketProducts(e, t) {
        e.products = t
      },
      changeBasketProduct(e, t) {
        const n = e.products.find((s) => s.id === t.id)
        n !== void 0 && (n.count = t.count)
      },
      setLoading(e, t) {
        e.loading = t
      },
    },
    actions: {
      async buyProducts({ commit: e, state: t }) {
        e('setLoading', !0)
        const n = {
          totalPrice: t.price,
          totalCount: t.count,
          shouldInstall: t.shouldInstall,
          products: [...t.products],
        }
        console.table(n), e('setLoading', !1)
      },
      async toggleShouldInstall({ commit: e, state: t }) {
        e('setLoading', !0), e('setShouldInstall', !t.shouldInstall), e('setLoading', !1)
      },
      async addBasketProduct({ commit: e, rootState: t, state: n }) {
        e('setLoading', !0)
        const s = t.ProductsSlice.products,
          i = s.length,
          r = Math.floor(Math.random() * i),
          o = s[r],
          l = n.products.find((a) => a.id === o.id)
        l === void 0
          ? e('setBasketProducts', [...n.products, { ...o, count: 1 }])
          : e('changeBasketProduct', { ...l, count: l.count + 1 }),
          e('setCount', n.count + 1),
          e('setPrice', n.price + o.price),
          e('setLoading', !1)
      },
      async changeBasketProductCount({ commit: e, state: t, dispatch: n }, s) {
        e('setLoading', !0)
        const i = t.products.find((r) => r.id === s.id)
        i !== void 0 && s.count === 0 && n('deleteBasketProduct', i.id),
          i !== void 0 &&
            s.count > 0 &&
            (i.count < s.count
              ? (e('setCount', t.count + 1),
                e('setPrice', t.price + i.price),
                e('changeBasketProduct', { ...i, count: i.count + 1 }))
              : (e('setCount', t.count - 1),
                e('setPrice', t.price - i.price),
                e('changeBasketProduct', { ...i, count: i.count - 1 }))),
          e('setLoading', !1)
      },
      async deleteBasketProduct({ commit: e, state: t }, n) {
        e('setLoading', !0)
        const s = t.products.find((i) => i.id === n)
        s !== void 0 &&
          (e('setCount', t.count - s.count),
          e('setPrice', t.price - s.price * s.count),
          e(
            'setBasketProducts',
            t.products.filter((i) => i.id !== n),
          )),
          e('setLoading', !1)
      },
      async deleteAllBasket({ commit: e }) {
        e('setLoading', !0),
          e('setBasketProducts', []),
          e('setCount', 0),
          e('setPrice', 0),
          e('setLoading', !1)
      },
    },
    modules: {},
  },
  bp = './assets/g2h-d8937f09.png',
  yp = './assets/bxc-e50efc62.png',
  Sp =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA3hSURBVHgB7V3LjxxHGf+qZmYf3vf6kXWcwCaYEKwgAkhJCIY4XCDcQSgHLnDhgOQTQgiQD0hIiAOyOPAHcCBIljiBwkOOIzuG4IBDImNiBTvCNrtmvQ97HzM7M13U66uqrq4aL5ZS3bL7p7S7u7qqevb7qr5nVQegRo0aNWrUqFGjRo0aNWrUqFGjRo0aNe4CBBKDMTa3trZyhNLmMEBflvX7sMZPq6pGz6nbXyKjw+vQzvexurq68Mgjj7ThHkRyhnQ6nd9mWfeLne1tTvHicybLAg8IPiS2HtF1mbonBK4SQnpMMFp2QQSTV8VNJquzNrDGAsg7+W+PUnYVMgoZv+H/QrfPrjWbtJtlvcW9e/f/QfQHCdGExBgaGhrp9yl0e70C3cUtBUs+QKLLs6A65ZeMFxFVhxFVgWB79pAoI9BwmqteKTKaEPMWWZapxpQS+azV0PekCcvLN3/IL78PCUEhMbjI4n88hQY/aO7gZOQHkdcNThBdbs4NTi91FnXVWdUlbj1O0AY/5Bmf82eNhnim3mPf2dCH+46GZKi8pvQ7R48enYaESC6ysiw7ycXAkXZ7U1w7PyE/XQTjeD05I0ISrFCPMadMnQmfVU4xijXVZ+GVxBS472y3t746N3fgJUiE5CILIUYkkyJHMMWdqOqekEwRUBQRJWIs7DUh+TGVZw4BfKwYh82JZozfH8FWSuTx4m43O8yL7m2GKOIIovecEezOFgEKeVqTQh+WmZnsDwnrM8kHPpZMcQwFfA8aFuL56OjoPCREaTNEEI0QOxoFYZE4jGVOTRptD0J5S6izZZJW9pB59fNAceeLPEJQvPFnDTIHCVEqQ1wLCctQztuR6o5+JedVOYn02TCExmuLLFA/f4318X7j9voeSIjSGKLkOymUZVkf+twkHh4ZkTOFidGfEyu2HY5kyyTmMIMZ60oYD+o5ziR35lBdxnQbq9wFZmd3z0NClCyyBDGMowGvnz0Nv/rlL+Bjn/g4HD58BA5++KOSUAzy4uTPr52GN8+/AY8fOgRPPfNZGB4eNoTEES4Mhgtv/x22t9sw/+iHOGH3GMbgjMPf4DJRtafOTIGkSO6HWLiihMDm5iYc+8F34dI7l2BiYgKWlhZga2sL1Iyg5jh75gz85Mc/gosX/wErK8tw+fIlbrE1zXNxLY6f/+yncOx734ZXT/0e3vjLWd7XZs7nQT9EzkJ5qEEhyuQvImD0S0qUyBBUvAprqyswNTEJ45PjQkzA5NQM9HrbBYK8+693Ye32BpBmC/bs26dnj2e28javnHoFFv+7DA9/4IMwMTkJt26taSfRMhjboHOIM8V1WFMzpEQdkkej0YCx0WFoDg2J8Iq8D2EXr7N/7x6YnZqWoqpBw3/Cnt0zkPW6MDo2LvUR0XGvmPL2r13mpkSJMyQPIkInDS5uWi1jDoccdBEiaTUb/KB6NIcJJvqSB6XWvAbLDJ/QeaXu/K77lSFSrjeonBlo1YZIQYmqB4Q6o71YT8wcYWFhZ65oixPZnS1QCqozQ6AhR7GYAUiNYAhLMATyBAsRz1ERRkFDJHTnx8OwLimBK5VhCIbLxQyQ5JDnAEEYy6nwGKGJJqhh6gDiWr+mpGnhoEIzRADFChkY4VV5Deu7hyozxychhECM1CrizCD2wvtWh2B0FXRUVhExTCiRosr6WVTxG0aYTkPdoAPJs4TdHmcM08zx+4KkqNAM0Z6yM5aRrC6uLy7BS7/+Dbz51j8Ha17eOGNZkKB+hNdaasyrky9Lgcr4IQKCCJkOADKTbvXq8JFM+66uCY/iq9cXoMfDJiaU4gUxEcozRwZRr06ecSlQIZGlCSD5QfIU9OpRTCABxEwxWOAz6Xcnz8BgghLtjVPjofvPBY4fP/4QJEKllDpjYPwFhktJfDDFKyN1vOis7Y9IvSA4HFP+pBD6958rC+7mzZvJJEmlZgjhBPnT63+9s2UjZxEbZBxJzx8Z67h7uTr5fHs4LZzaEi45QZXH2XPnYfHGykAzVVCImUnByU1iSleJNaKXCg2ylnynMO8o3ic6xBcPvV4f/nPthvTXAQ3eEBElkXO34f4dnRx30lnht8j8SyDwmAqVmSHiPtMHGzCcifknv+zHp53x1JnyW0KizZ0NPspiSmXMXkkYTgO6A/ufZHbAx3hHmTPyWQaRKMwOwvBpUSk/RLvoAwliV6n4q1NiXer+gjNE9XOHHiAlqmP2oiJ3An1BUqACkXyhUXrZoCKAzd3vDK4eSY1qzRC0jAgq9rBWVyYtMWuwB4KBCcsE3xfyYUoUWZWxslQh+g8KYcIQtWBdW08MGxaqqTIqE16DFXeVUCmRJYioLNVBhGLa9w4HH50eFcEZaF2TN23dlnbpUNj8TYnqeOoSDJrNJvchaDCUIcHLG1aNRGWWKJaPmN6q4/ouOFucWVOV2VIphoxPTsATTzwOa6urOi8SyAQSIYaaRrQRTMB7EFHj0dERnuvYBq1ICgiFS/KOYXpGVUapN5sNeOELz8Hk9GwwP4GY2zsDX3rhCHzksYOqhnES8xT/5JOHYN/shFU0LKy8fcewuJ3hPnUMRbbu1u112Gh3YGxsXKdgi8TodvuwudWWW+L0yp0gOp0ObHXayuSNxk6s7hi0Oj4lkouspaWl+ZAY6POU7Msvvwon/3haJ43CJunK2jqcfe0cvPfv6wPfc/m963DhwjvSylKaPeREkvzJ8YHcc0okZ8jA5Zk8fyGjHIYXAd3AmdnZ6kB3W+mGcE+izjbcWF6RmUXVVXyGkEC2BEXXfatDBBgfHhklTvKpWEcU9UUd4mQNI32JWRddTgThvnP3JJ/WTYHStrT5QKuJGp8AIs41sdlvFueINHsJZg0hmu8tWlraE2LFvSIpkJwhoaU2EjpMrlK5cW0tmUGo2ywKI4qY60SyQtuQ+Ttomer7iRJmSFgEyBGpV5pYxy1QD8QHOdAzFKM4OpWs1PM89ej7id3waXq5160sf58fwqxQdwhCBuQ6iF6ZEttvKJmlg7xsB5KnTMvKRQkMib9SBgH149iqREGujEIkEqzraIWvHDuIKnVSeH96z9xHKTMk9kfLz5kwNEFjhOHkzVyFG1bUKqtItGHMBjIQt7SVOzcUKrQ/hMLw8JAOhYQ8AwXG4p/jMEAxJfrxRJrvW+DKkkGi6hvf/NYDkAjVYQiXVYc/8ykYbqGdEXNE1P4QKnfPQjgVgqJKmNIUnJ289kMBArF1WX44fs/uqRFIhEpFeyd5tPe5558FK2IC/grknfiYKCIZ8YyCIoOJZzWYkOL9tMghpj9wcfX4rjG1rCei1CWbqBJJRC+KCEFkFVnuAxCs8P4i4bFy/nlKIlVohuitavQOSlgTlOKG/7gaUWcMvw/IbeDqFVJYapre4qpQChdUnlzeMRgUW1dhEVTQUFA1ovyBub3w+c992vbA7LPiu0l0P0hq6VUZhpjVh3LRNfGjHAZju0bhwbl9sEvuPadoKxfqHdjP6/CMob8Li+TStqZUMSUgslLPkUowBD8uxuTOD2JMVgzyuZiaGINnnn4S5ucPQMwHMa11pNckFQfUB9PKljMTBEunRUphiB88NIOWZUHRERYzFKkOIfNY+Y1K6TOwnnveD2H+D3PaE8fjT4eS8yFMiypiru3yUFLI5KkWjsKGfLwr50sA6OCjfo/jh+zwl8lOZP8tSIZSGcLcJTriyJzRy4q6AWdWxphZt2C3P+dnFC6kzvUHcRHlvMV7bVotUuLKRTBEk/cgciU9yPpd8JcAuYSVG0N5JjDr953F0qRQT3wITX0fy7eaXKVty2zK1r7TVEr4KeUSGOKOZPGvIoRYadIaGoZetwe9vto3Lj4e48eedu/dJ1Oz/W5fpWgBzKeVXExMTfPnvK/utty522oNFRi7Ez9D8iyhHCn1A2ZIFCTMi1/7OvT5yN7Y2JCiaGxszBnxmTyeevpZePSxx8X3dGFzawNmzJfibF/i/stfeVEyamP9Nu8zg5mZ3ebjAG7WMr9F2s40PKd2DhPbEACLi4uXZ2dn58Uf2pNrq/KWzTonoBBd09OzNh/uQdDw+rWrMDU9LWdWlrHC3kBxFisg19dX4cEDD4P4YjWCseLiOL8cr8XSVi6xjoy2WqcgAUpR6mrxQb8w+lB0CQhxFINoNrf/gLxGpoXC6pNTU/LAe/9d5hqgsPDa9gnw1vm/rUEilLbqJKRwXbgjNVTu9uWGPkJb1HbwgwbaUidOnFiFRCgl2osMCa1A8bcoYxtXFPn9hdrc6Tf8P206nU4yhiTXIQsLC1KHdDrtqI7YCUIzyDeV7zavYeJa/L/W0BCMjowko1NJIivTfkK+/E6j1le6oeex+9AMG8Q0fLayvHIFEqIUhghRpZR2UfyErmN17gYhkec/R1EqrqdnZq5AQpTAECYdNvv57x1AJT9ya6dU8DbQgQ7b+zMpeq9Fk+mXsdzMWVxYuAIJUcoMEf5HzKx1TdAYfNEW8h9MfxGfo7BwBZkOeR9k1/jE25AQpVhZ29vb8tsmugTMsAY7AwrAKn5xgCFuH+YZsUtL2Q7egVuzb64un4GEKGWxNWN9T4f4mTorjZBuKkzvB99DytoGCGV+XiemkMDY1C6icPpkxITrJShtLx48eA4SIjlDuP64yONVD3EiNIs6IDRqmUM8V5c4okcTHZNQpjDq7IsGOsGlw84s9xv0O0nz2POJ/7d5NWrUqFGjRo0aNWrUqFGjRo0aNWrUqFHjXsD/AMjSHZ5hzZ5UAAAAAElFTkSuQmCC',
  Cp = './assets/tda-4f4dd804.png',
  xp = {
    state: {
      products: [
        {
          id: '1',
          name: 'Вытяжное устройство G2H',
          shortName: 'G2H',
          techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
          description: 'Вытяжное устройство с датчиком присутствия',
          articul: 'G2H1065',
          price: 12644,
          image: bp,
        },
        {
          id: '2',
          name: 'Вытяжное устройство BXC',
          shortName: 'BXC',
          techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
          description: 'Вытяжное устройство для механической системы вентиляции',
          articul: 'G2H1065',
          price: 12644,
          image: yp,
        },
        {
          id: '3',
          name: 'Вытяжное устройство GHN',
          shortName: 'GHN',
          techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
          description: 'Вытяжное устройство с датчиком присутствия',
          articul: 'G2H1065',
          price: 12644,
          image: Sp,
        },
        {
          id: '4',
          name: 'Вытяжное устройство TDA',
          shortName: 'TDA',
          techDescription: '12-72/168 м³/ч / гидрорегулируемый расход / от датчика присутствия',
          description: 'Вытяжное устройство с датчиком присутствия',
          articul: 'G2H1065',
          price: 12644,
          image: Cp,
        },
      ],
    },
    getters: {
      getAllProducts(e) {
        return e.products
      },
    },
    mutations: {},
    actions: {},
    modules: {},
  },
  wp = vp({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { BasketSlice: _p, ProductsSlice: xp },
  })
wa(Wf).use(wp).mount('#app')
