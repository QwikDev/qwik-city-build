"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const build = require("@builder.io/qwik/build");
const doc = build.isBrowser ? document : void 0;
const modulePreloadStr = "modulepreload";
const preloadStr = "preload";
const config = { t: 0, o: 25, l: 0.65 };
const rel = build.isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
const loadStart = Date.now();
const BundleImportState_None = 0;
const BundleImportState_Queued = 1;
const BundleImportState_Preload = 2;
const BundleImportState_Alias = 3;
const BundleImportState_Loaded = 4;
const bundles = /* @__PURE__ */ new Map();
let queueDirty;
let preloadCount = 0;
const queue = [];
const log = (...e) => {
  console.log(`Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`, ...e);
};
const sortQueue = () => {
  if (queueDirty) {
    queue.sort((e, t) => e.u - t.u);
    queueDirty = 0;
  }
};
const trigger = () => {
  if (!queue.length) return;
  sortQueue();
  while (queue.length) {
    const e = queue[0];
    const t = e.u;
    const o = 1 - t;
    const n = graph ? (
      // The more likely the bundle, the more simultaneous preloads we want to allow
      Math.max(1, config.o * o)
    ) : (
      // While the graph is not available, we limit to 2 preloads
      2
    );
    if (o === 1 || preloadCount < n) {
      queue.shift();
      preloadOne(e);
    } else break;
  }
  if (config.t && !queue.length) {
    const e = [...bundles.values()].filter((e2) => e2.i > BundleImportState_None);
    const t = e.reduce((e2, t2) => e2 + t2.p, 0);
    const o = e.reduce((e2, t2) => e2 + t2.$, 0);
    log(`>>>> done ${e.length}/${bundles.size} total: ${t}ms waited, ${o}ms loaded`);
  }
};
const preloadOne = (e) => {
  if (e.i >= BundleImportState_Preload) return;
  preloadCount++;
  const t = Date.now();
  e.p = t - e.B;
  e.i = BundleImportState_Preload;
  config.t && log(`<< load ${Math.round((1 - e.u) * 100)}% after ${`${e.p}ms`}`, e.m);
  const o = doc.createElement("link");
  o.href = e.h;
  o.rel = rel;
  o.as = "script";
  o.onload = o.onerror = () => {
    preloadCount--;
    const n = Date.now();
    e.$ = n - t;
    e.i = BundleImportState_Loaded;
    config.t && log(`>> done after ${e.$}ms`, e.m);
    o.remove();
    trigger();
  };
  doc.head.appendChild(o);
};
const adjustProbabilities = (e, t, o) => {
  if (o == null ? void 0 : o.has(e)) return;
  const n = e.u;
  e.u *= t;
  if (n - e.u < 0.01) return;
  if (e.i < BundleImportState_Preload && e.u < config.l) {
    if (e.i === BundleImportState_None) {
      e.i = BundleImportState_Queued;
      queue.push(e);
      config.t && log(`queued ${Math.round((1 - e.u) * 100)}%`, e.m);
    }
    queueDirty = 1;
  }
  if (e.S) {
    o || (o = /* @__PURE__ */ new Set());
    o.add(e);
    const t2 = 1 - e.u;
    for (const n2 of e.S) {
      const e2 = getBundle(n2.m);
      const r = n2.q;
      const l = 1 - n2.I * t2;
      const a = l / r;
      n2.q = a;
      adjustProbabilities(e2, a, o);
    }
  }
};
const handleBundle = (e, t) => {
  const o = getBundle(e);
  if (o && o.u > t) adjustProbabilities(o, t / o.u);
};
const preload = (e, t) => {
  if (base == null || !e.length) return;
  let o = t ? 1 - t : 0.4;
  if (Array.isArray(e)) for (let t2 = e.length - 1; t2 >= 0; t2--) {
    const n = e[t2];
    if (typeof n === "number") o = 1 - n / 10;
    else {
      handleBundle(n, o);
      o *= 1.005;
    }
  }
  else handleBundle(e, o);
  if (build.isBrowser) trigger();
};
let base;
let graph;
const makeBundle = (e, t) => {
  const o = e.endsWith(".js") ? doc ? new URL(`${base}${e}`, doc.baseURI).toString() : e : null;
  return { m: e, h: o, i: o ? BundleImportState_None : BundleImportState_Alias, S: t, u: 1, B: Date.now(), p: 0, $: 0 };
};
const parseBundleGraph = (e) => {
  const t = /* @__PURE__ */ new Map();
  let o = 0;
  while (o < e.length) {
    const n = e[o++];
    const r = [];
    let l;
    let a = 1;
    while (l = e[o], typeof l === "number") {
      if (l < 0) a = -l / 10;
      else r.push({ m: e[l], I: a, q: 1 });
      o++;
    }
    t.set(n, r);
  }
  return t;
};
const getBundle = (e) => {
  let t = bundles.get(e);
  if (!t) {
    let o;
    if (graph) {
      o = graph.get(e);
      if (!o) return;
      if (!o.length) o = void 0;
    }
    t = makeBundle(e, o);
    bundles.set(e, t);
  }
  return t;
};
const loadBundleGraph = (e, t, o) => {
  if (o) {
    if ("d" in o) config.t = !!o.d;
    if ("P" in o) config.o = o["P"];
    if ("Q" in o) config.l = 1 - o["Q"];
  }
  if (!build.isBrowser || e == null) return;
  base = e;
  if (t) t.then((e2) => e2.text()).then((e2) => {
    graph = parseBundleGraph(JSON.parse(e2));
    const t2 = [];
    for (const [e3, o2] of graph.entries()) {
      const n = getBundle(e3);
      n.S = o2;
      if (n.u < 1) {
        t2.push([n, n.u]);
        n.u = 1;
      }
    }
    config.t && log(`parseBundleGraph got ${graph.size} bundles, adjusting ${t2.length}`);
    for (const [e3, o2] of t2) adjustProbabilities(e3, o2);
    trigger();
  }).catch(console.warn);
};
exports.g = parseBundleGraph;
exports.h = handleBundle;
exports.l = loadBundleGraph;
exports.p = preload;
