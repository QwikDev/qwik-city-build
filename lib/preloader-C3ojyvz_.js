import { isBrowser } from "@builder.io/qwik/build";
const doc = isBrowser ? document : void 0;
const modulePreloadStr = "modulepreload";
const preloadStr = "preload";
const maxSimultaneousPreloadsStr = "maxSimultaneousPreloads";
const maxSignificantInverseProbabilityStr = "maxSignificantInverseProbability";
const config = { t: 0, [maxSimultaneousPreloadsStr]: 6, [maxSignificantInverseProbabilityStr]: 0.75 };
const rel = isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
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
    queue.sort((e, t) => e.o - t.o);
    queueDirty = 0;
  }
};
const trigger = () => {
  if (!queue.length) return;
  sortQueue();
  while (queue.length) {
    const e = queue[0];
    const t = e.o;
    const o = 1 - t;
    const n = graph ? (
      // The more likely the bundle, the more simultaneous preloads we want to allow
      Math.max(1, config[maxSimultaneousPreloadsStr] * o)
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
    const e = [...bundles.values()].filter((e2) => e2.l > BundleImportState_None);
    const t = e.reduce((e2, t2) => e2 + t2.i, 0);
    const o = e.reduce((e2, t2) => e2 + t2.u, 0);
    log(`>>>> done ${e.length}/${bundles.size} total: ${t}ms waited, ${o}ms loaded`);
  }
};
const preloadOne = (e) => {
  if (e.l >= BundleImportState_Preload) return;
  preloadCount++;
  const t = Date.now();
  e.i = t - e.p;
  e.l = BundleImportState_Preload;
  config.t && log(`<< load ${Math.round((1 - e.o) * 100)}% after ${`${e.i}ms`}`, e.m);
  const o = doc.createElement("link");
  o.href = e.S;
  o.rel = rel;
  o.as = "script";
  o.onload = o.onerror = () => {
    preloadCount--;
    const n = Date.now();
    e.u = n - t;
    e.l = BundleImportState_Loaded;
    config.t && log(`>> done after ${e.u}ms`, e.m);
    o.remove();
    trigger();
  };
  doc.head.appendChild(o);
};
const adjustProbabilities = (e, t, o) => {
  if (o == null ? void 0 : o.has(e)) return;
  const n = e.o;
  e.o *= t;
  if (n - e.o < 0.01) return;
  if (e.l < BundleImportState_Preload && e.o < config[maxSignificantInverseProbabilityStr]) {
    if (e.l === BundleImportState_None) {
      e.l = BundleImportState_Queued;
      queue.push(e);
      config.t && log(`queued ${Math.round((1 - e.o) * 100)}%`, e.m);
    }
    queueDirty = 1;
  }
  if (e.$) {
    o || (o = /* @__PURE__ */ new Set());
    o.add(e);
    for (const t2 of e.$) {
      const n2 = getBundle(t2.m);
      const r = t2.h;
      const a = 1 - t2.I * (1 - e.o);
      const l = a / r;
      t2.h = l;
      adjustProbabilities(n2, l, o);
    }
  }
};
const handleBundle = (e, t) => {
  const o = getBundle(e);
  if (o && o.o > t) adjustProbabilities(o, t / o.o);
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
  if (isBrowser) trigger();
};
let base;
let graph;
const makeBundle = (e, t) => {
  const o = e.endsWith(".js") ? doc ? new URL(`${base}${e}`, doc.baseURI).toString() : e : null;
  return { m: e, S: o, l: o ? BundleImportState_None : BundleImportState_Alias, $: t, o: 1, p: Date.now(), i: 0, u: 0 };
};
const parseBundleGraph = (e) => {
  const t = /* @__PURE__ */ new Map();
  let o = 0;
  while (o < e.length) {
    const n = e[o++];
    const r = [];
    let a;
    let l = 1;
    while (a = e[o], typeof a === "number") {
      if (a < 0) l = -a / 10;
      else r.push({ m: e[a], I: l, h: 1 });
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
    if ("P" in o) config[maxSimultaneousPreloadsStr] = o["P"];
    if ("Q" in o) config[maxSignificantInverseProbabilityStr] = 1 - o["Q"];
  }
  if (!isBrowser || e == null) return;
  base = e;
  if (t) import(
    /* @vite-ignore */
    `${e}q-bundle-graph-${t}.js`
  ).then((e2) => {
    graph = parseBundleGraph(e2.B);
    const t2 = [];
    for (const [e3, o2] of graph.entries()) {
      const n = getBundle(e3);
      n.$ = o2;
      if (n.o < 1) {
        t2.push([n, n.o]);
        n.o = 1;
      }
    }
    config.t && log(`parseBundleGraph got ${graph.size} bundles, adjusting ${t2.length}`);
    for (const [e3, o2] of t2) adjustProbabilities(e3, o2);
    trigger();
  }).catch(console.warn);
};
export {
  parseBundleGraph as g,
  handleBundle as h,
  loadBundleGraph as l,
  preload as p
};
