"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const build = require("@builder.io/qwik/build");
const doc = build.isBrowser ? document : void 0;
const modulePreloadStr = "modulepreload";
const preloadStr = "preload";
const maxSimultaneousPreloadsStr = "maxSimultaneousPreloads";
const maxSignificantInverseProbabilityStr = "maxSignificantInverseProbability";
const config = {
  DEBUG: false,
  [maxSimultaneousPreloadsStr]: 6,
  [maxSignificantInverseProbabilityStr]: 0.75
};
const rel = build.isBrowser && doc.createElement("link").relList.supports(modulePreloadStr) ? modulePreloadStr : preloadStr;
const loadStart = Date.now();
var BundleImportState = /* @__PURE__ */ ((BundleImportState2) => {
  BundleImportState2[BundleImportState2["None"] = 0] = "None";
  BundleImportState2[BundleImportState2["Queued"] = 1] = "Queued";
  BundleImportState2[BundleImportState2["Preload"] = 2] = "Preload";
  BundleImportState2[BundleImportState2["Alias"] = 3] = "Alias";
  BundleImportState2[BundleImportState2["Loaded"] = 4] = "Loaded";
  return BundleImportState2;
})(BundleImportState || {});
const bundles = /* @__PURE__ */ new Map();
let queueDirty;
let preloadCount = 0;
const queue = [];
const log = (...args) => {
  console.log(
    `Preloader ${Date.now() - loadStart}ms ${preloadCount}/${queue.length} queued>`,
    ...args
  );
};
const sortQueue = () => {
  if (queueDirty) {
    queue.sort((a, b) => a.$inverseProbability$ - b.$inverseProbability$);
    queueDirty = false;
  }
};
const trigger = () => {
  if (!queue.length) {
    return;
  }
  sortQueue();
  while (queue.length) {
    const bundle = queue[0];
    const inverseProbability = bundle.$inverseProbability$;
    const probability = 1 - inverseProbability;
    const allowedPreloads = graph ? (
      // The more likely the bundle, the more simultaneous preloads we want to allow
      Math.max(1, config[maxSimultaneousPreloadsStr] * probability)
    ) : (
      // While the graph is not available, we limit to 2 preloads
      2
    );
    if (preloadCount < allowedPreloads) {
      queue.shift();
      preloadOne(bundle);
    } else {
      break;
    }
  }
  if (config.DEBUG && !queue.length) {
    const loaded = [...bundles.values()].filter((b) => b.$state$ > BundleImportState.None);
    const waitTime = loaded.reduce((acc, b) => acc + b.$waitedMs$, 0);
    const loadTime = loaded.reduce((acc, b) => acc + b.$loadedMs$, 0);
    log(
      `>>>> done ${loaded.length}/${bundles.size} total: ${waitTime}ms waited, ${loadTime}ms loaded`
    );
  }
};
const preloadOne = (bundle) => {
  if (bundle.$state$ >= BundleImportState.Preload) {
    return;
  }
  preloadCount++;
  const start = Date.now();
  bundle.$waitedMs$ = start - bundle.$createdTs$;
  bundle.$state$ = BundleImportState.Preload;
  config.DEBUG && log(`<< load after ${`${bundle.$waitedMs$}ms`}`, bundle.$name$);
  const link = doc.createElement("link");
  link.href = bundle.$url$;
  link.rel = rel;
  link.as = "script";
  link.onload = link.onerror = () => {
    preloadCount--;
    const end = Date.now();
    bundle.$loadedMs$ = end - start;
    bundle.$state$ = BundleImportState.Loaded;
    config.DEBUG && log(`>> done after ${bundle.$loadedMs$}ms`, bundle.$name$);
    link.remove();
    trigger();
  };
  doc.head.appendChild(link);
};
const adjustProbabilities = (bundle, adjustFactor, seen) => {
  if (seen == null ? void 0 : seen.has(bundle)) {
    return;
  }
  const previousInverseProbability = bundle.$inverseProbability$;
  bundle.$inverseProbability$ *= adjustFactor;
  if (previousInverseProbability - bundle.$inverseProbability$ < 0.01) {
    return;
  }
  if (bundle.$state$ < BundleImportState.Preload && bundle.$inverseProbability$ < config[maxSignificantInverseProbabilityStr]) {
    if (bundle.$state$ === BundleImportState.None) {
      bundle.$state$ = BundleImportState.Queued;
      queue.push(bundle);
      config.DEBUG && log(`queued ${Math.round((1 - bundle.$inverseProbability$) * 100)}%`, bundle.$name$);
    }
    queueDirty = true;
  }
  if (bundle.$deps$) {
    seen || (seen = /* @__PURE__ */ new Set());
    seen.add(bundle);
    for (const dep of bundle.$deps$) {
      const depBundle = getBundle(dep.$name$);
      const prevAdjust = dep.$factor$;
      const newInverseProbability = 1 - dep.$probability$ * (1 - bundle.$inverseProbability$);
      const factor = newInverseProbability / prevAdjust;
      dep.$factor$ = factor;
      adjustProbabilities(depBundle, factor, seen);
    }
  }
};
const handleBundle = (name, inverseProbability) => {
  const bundle = getBundle(name);
  if (bundle && bundle.$inverseProbability$ > inverseProbability) {
    adjustProbabilities(bundle, inverseProbability / bundle.$inverseProbability$);
  }
};
const preload = (name, probability) => {
  if (base == null || !name.length) {
    return;
  }
  let inverseProbability = probability ? 1 - probability : 0.4;
  if (Array.isArray(name)) {
    for (let i = name.length - 1; i >= 0; i--) {
      const item = name[i];
      if (typeof item === "number") {
        inverseProbability = 1 - item / 10;
      } else {
        handleBundle(item, inverseProbability);
        inverseProbability *= 1.005;
      }
    }
  } else {
    handleBundle(name, inverseProbability);
  }
  if (build.isBrowser) {
    trigger();
  }
};
let base;
let graph;
const makeBundle = (name, deps) => {
  const url = name.endsWith(".js") ? doc ? new URL(`${base}${name}`, doc.baseURI).toString() : name : null;
  return {
    $name$: name,
    $url$: url,
    $state$: url ? BundleImportState.None : BundleImportState.Alias,
    $deps$: deps,
    $inverseProbability$: 1,
    $createdTs$: Date.now(),
    $waitedMs$: 0,
    $loadedMs$: 0
  };
};
const parseBundleGraph = (serialized) => {
  const graph2 = /* @__PURE__ */ new Map();
  let i = 0;
  while (i < serialized.length) {
    const name = serialized[i++];
    const deps = [];
    let idx;
    let probability = 1;
    while (idx = serialized[i], typeof idx === "number") {
      if (idx < 0) {
        probability = -idx / 10;
      } else {
        deps.push({ $name$: serialized[idx], $probability$: probability, $factor$: 1 });
      }
      i++;
    }
    graph2.set(name, deps);
  }
  return graph2;
};
const getBundle = (name) => {
  let bundle = bundles.get(name);
  if (!bundle) {
    let deps;
    if (graph) {
      deps = graph.get(name);
      if (!deps) {
        return;
      }
      if (!deps.length) {
        deps = void 0;
      }
    }
    bundle = makeBundle(name, deps);
    bundles.set(name, bundle);
  }
  return bundle;
};
const loadBundleGraph = (basePath, manifestHash, opts) => {
  if (opts) {
    if ("d" in opts) {
      config.DEBUG = !!opts.d;
    }
    if ("P" in opts) {
      config[maxSimultaneousPreloadsStr] = opts["P"];
    }
    if ("Q" in opts) {
      config[maxSignificantInverseProbabilityStr] = 1 - opts["Q"];
    }
  }
  if (!build.isBrowser || basePath == null) {
    return;
  }
  base = basePath;
  if (manifestHash) {
    import(
      /* @vite-ignore */
      `${basePath}q-bundle-graph-${manifestHash}.js`
    ).then((m) => {
      graph = parseBundleGraph(m.B);
      const toAdjust = [];
      for (const [name, deps] of graph.entries()) {
        const bundle = getBundle(name);
        bundle.$deps$ = deps;
        if (bundle.$inverseProbability$ < 1) {
          toAdjust.push([bundle, bundle.$inverseProbability$]);
          bundle.$inverseProbability$ = 1;
        }
      }
      config.DEBUG && log(`parseBundleGraph got ${graph.size} bundles, adjusting ${toAdjust.length}`);
      for (const [bundle, inverseProbability] of toAdjust) {
        adjustProbabilities(bundle, inverseProbability);
      }
      trigger();
    }).catch(console.warn);
  }
};
exports.g = parseBundleGraph;
exports.h = handleBundle;
exports.l = loadBundleGraph;
exports.p = preload;
