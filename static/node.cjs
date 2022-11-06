"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik-city/static/node/index.ts
var node_exports = {};
__export(node_exports, {
  generate: () => generate
});
module.exports = __toCommonJS(node_exports);

// packages/qwik-city/static/node/node-system.ts
var import_node_fs2 = __toESM(require("fs"), 1);
var import_node_path3 = require("path");

// packages/qwik-city/middleware/node/node-fetch.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
function patchGlobalFetch() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    if (!globalThis.fetch) {
      globalThis.fetch = import_node_fetch.default;
      globalThis.Headers = import_node_fetch.Headers;
      globalThis.Request = import_node_fetch.Request;
      globalThis.Response = import_node_fetch.Response;
    }
  }
}

// packages/qwik-city/static/node/node-main.ts
var import_node_fs = __toESM(require("fs"), 1);
var import_node_os = require("os");
var import_node_worker_threads = require("worker_threads");
var import_node_path2 = require("path");

// packages/qwik-city/utils/fs.ts
var import_node_path = require("path");

// packages/qwik-city/utils/format.ts
function msToString(ms) {
  if (ms < 1) {
    return ms.toFixed(2) + " ms";
  }
  if (ms < 1e3) {
    return ms.toFixed(1) + " ms";
  }
  if (ms < 6e4) {
    return (ms / 1e3).toFixed(1) + " s";
  }
  return (ms / 6e4).toFixed(1) + " m";
}

// packages/qwik-city/utils/pathname.ts
function normalizePathname(pathname, basePathname, trailingSlash) {
  if (typeof pathname === "string") {
    pathname = pathname.trim();
    if (pathname !== "") {
      try {
        pathname = pathname.replace(/\/+/g, "/");
        if (pathname.startsWith("/")) {
          pathname = pathname.slice(1);
        }
        pathname = new URL(basePathname + pathname, `https://qwik.builder.io`).pathname;
        if (pathname !== basePathname) {
          if (trailingSlash) {
            if (!pathname.endsWith("/")) {
              const segments = pathname.split("/");
              const lastSegment = segments[segments.length - 1];
              if (!lastSegment.includes(".")) {
                pathname += "/";
              }
            }
          } else {
            if (pathname.endsWith("/")) {
              pathname = pathname.slice(0, pathname.length - 1);
            }
          }
        }
        return pathname;
      } catch (e) {
        console.error(e);
      }
    }
  }
  return null;
}
function getPathnameForDynamicRoute(originalPathname, paramNames, params) {
  let pathname = originalPathname;
  if (paramNames && params) {
    for (const paramName of paramNames) {
      const paramKey = `[${paramName}]`;
      const restParamKey = `[...${paramName}]`;
      const paramValue = params[paramName];
      pathname = pathname.replace(restParamKey, paramValue);
      pathname = pathname.replace(paramKey, paramValue);
    }
  }
  return pathname;
}

// packages/qwik-city/utils/fs.ts
function normalizePath(path) {
  path = (0, import_node_path.normalize)(path);
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }
  path = path.replace(/\\/g, "/");
  if (path.endsWith("/")) {
    path = path.slice(0, path.length - 1);
  }
  return path;
}

// packages/qwik-city/static/node/node-main.ts
var import_meta = {};
async function createNodeMainProcess(opts) {
  const ssgWorkers = [];
  const sitemapBuffer = [];
  let sitemapPromise = null;
  let outDir = opts.outDir;
  if (typeof outDir !== "string") {
    throw new Error(`Missing "outDir" option`);
  }
  if (!(0, import_node_path2.isAbsolute)(outDir)) {
    throw new Error(`"outDir" must be an absolute file path, received: ${outDir}`);
  }
  outDir = normalizePath(outDir);
  let maxWorkers = (0, import_node_os.cpus)().length;
  if (typeof opts.maxWorkers === "number") {
    maxWorkers = Math.max(1, Math.min(opts.maxWorkers, maxWorkers));
  }
  let maxTasksPerWorker = 20;
  if (typeof opts.maxTasksPerWorker === "number") {
    maxTasksPerWorker = Math.max(1, Math.min(opts.maxTasksPerWorker, 50));
  }
  let sitemapOutFile = opts.sitemapOutFile;
  if (sitemapOutFile !== null) {
    if (typeof sitemapOutFile !== "string") {
      sitemapOutFile = "sitemap.xml";
    }
    if (!(0, import_node_path2.isAbsolute)(sitemapOutFile)) {
      sitemapOutFile = (0, import_node_path2.resolve)(outDir, sitemapOutFile);
    }
  }
  const createWorker = () => {
    let terminateResolve = null;
    const mainTasks = /* @__PURE__ */ new Map();
    let workerFilePath;
    if (typeof __filename === "string") {
      workerFilePath = __filename;
    } else {
      workerFilePath = import_meta.url;
    }
    if (typeof workerFilePath === "string" && workerFilePath.startsWith("file://")) {
      workerFilePath = new URL(workerFilePath);
    }
    const nodeWorker = new import_node_worker_threads.Worker(workerFilePath, { workerData: opts });
    const ssgWorker = {
      activeTasks: 0,
      totalTasks: 0,
      render: (staticRoute) => {
        return new Promise((resolve2, reject) => {
          try {
            ssgWorker.activeTasks++;
            ssgWorker.totalTasks++;
            mainTasks.set(staticRoute.pathname, resolve2);
            nodeWorker.postMessage(staticRoute);
          } catch (e) {
            ssgWorker.activeTasks--;
            mainTasks.delete(staticRoute.pathname);
            reject(e);
          }
        });
      },
      terminate: async () => {
        mainTasks.clear();
        const msg = { type: "close" };
        await new Promise((resolve2) => {
          terminateResolve = resolve2;
          nodeWorker.postMessage(msg);
        });
        await nodeWorker.terminate();
      }
    };
    nodeWorker.on("message", (msg) => {
      switch (msg.type) {
        case "render": {
          const mainTask = mainTasks.get(msg.pathname);
          if (mainTask) {
            mainTasks.delete(msg.pathname);
            ssgWorker.activeTasks--;
            mainTask(msg);
          }
          break;
        }
        case "close": {
          if (terminateResolve) {
            terminateResolve();
            terminateResolve = null;
          }
          break;
        }
      }
    });
    nodeWorker.on("error", (e) => {
      console.error(`worker error: ${e}`);
    });
    nodeWorker.on("exit", (code) => {
      if (code !== 1) {
        console.error(`worker exit ${code}`);
      }
    });
    return ssgWorker;
  };
  const getNextWorker = () => ssgWorkers.sort(ssgWorkerCompare)[0];
  const hasAvailableWorker = () => {
    const ssgWorker = getNextWorker();
    return ssgWorker.activeTasks < maxTasksPerWorker;
  };
  const render = async (staticRoute) => {
    const ssgWorker = getNextWorker();
    const result = await ssgWorker.render(staticRoute);
    if (sitemapOutFile && result.ok) {
      sitemapBuffer.push(`<url><loc>${result.url}</loc></url>`);
      if (sitemapBuffer.length > 50) {
        if (sitemapPromise) {
          await sitemapPromise;
        }
        const siteMapUrls = sitemapBuffer.join("\n") + "\n";
        sitemapBuffer.length = 0;
        sitemapPromise = import_node_fs.default.promises.appendFile(sitemapOutFile, siteMapUrls);
      }
    }
    return result;
  };
  const close = async () => {
    const promises = [];
    if (sitemapOutFile) {
      if (sitemapPromise) {
        await sitemapPromise;
      }
      sitemapBuffer.push(`</urlset>`);
      promises.push(import_node_fs.default.promises.appendFile(sitemapOutFile, sitemapBuffer.join("\n")));
      sitemapBuffer.length = 0;
    }
    for (const ssgWorker of ssgWorkers) {
      try {
        promises.push(ssgWorker.terminate());
      } catch (e) {
        console.error(e);
      }
    }
    ssgWorkers.length = 0;
    await Promise.all(promises);
  };
  if (sitemapOutFile) {
    await ensureDir(sitemapOutFile);
    await import_node_fs.default.promises.writeFile(
      sitemapOutFile,
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`
    );
  }
  for (let i = 0; i < maxWorkers; i++) {
    ssgWorkers.push(createWorker());
  }
  const mainCtx = {
    hasAvailableWorker,
    render,
    close
  };
  return mainCtx;
}
function ssgWorkerCompare(a, b) {
  if (a.activeTasks < b.activeTasks) {
    return -1;
  }
  if (a.activeTasks > b.activeTasks) {
    return 1;
  }
  return a.totalTasks < b.totalTasks ? -1 : 1;
}

// packages/qwik-city/static/node/node-worker.ts
var import_node_worker_threads2 = require("worker_threads");
async function createNodeWorkerProcess(onMessage) {
  var _a3;
  (_a3 = import_node_worker_threads2.parentPort) == null ? void 0 : _a3.on("message", async (msg) => {
    var _a4;
    (_a4 = import_node_worker_threads2.parentPort) == null ? void 0 : _a4.postMessage(await onMessage(msg));
  });
}

// packages/qwik-city/static/node/node-system.ts
async function createSystem(opts) {
  patchGlobalFetch();
  const createWriteStream = (filePath) => {
    return import_node_fs2.default.createWriteStream(filePath, {
      flags: "w"
    });
  };
  const NS_PER_SEC = 1e9;
  const MS_PER_NS = 1e-6;
  const createTimer = () => {
    const start = process.hrtime();
    return () => {
      const diff = process.hrtime(start);
      return (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS;
    };
  };
  const createLogger = async () => {
    return {
      debug: opts.log === "debug" ? console.debug.bind(console) : () => {
      },
      error: console.error.bind(console),
      info: console.info.bind(console)
    };
  };
  const outDir = normalizePath(opts.outDir);
  const getPageFilePath = (pathname) => {
    pathname = pathname.slice(1);
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    pathname += "index.html";
    return (0, import_node_path3.join)(outDir, pathname);
  };
  const getDataFilePath = (pathname) => {
    pathname = pathname.slice(1);
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    pathname += "q-data.json";
    return (0, import_node_path3.join)(outDir, pathname);
  };
  const sys = {
    createMainProcess: () => createNodeMainProcess(opts),
    createWorkerProcess: createNodeWorkerProcess,
    createLogger,
    getOptions: () => opts,
    ensureDir,
    createWriteStream,
    createTimer,
    getPageFilePath,
    getDataFilePath,
    platform: {
      static: true,
      node: process.versions.node
    }
  };
  return sys;
}
var ensureDir = async (filePath) => {
  try {
    await import_node_fs2.default.promises.mkdir((0, import_node_path3.dirname)(filePath), { recursive: true });
  } catch (e) {
  }
};

// packages/qwik-city/static/node/index.ts
var import_node_worker_threads3 = require("worker_threads");

// packages/qwik-city/static/main-thread.ts
var import_node_url = require("url");
async function mainThread(sys) {
  const opts = sys.getOptions();
  validateOptions(opts);
  const main = await sys.createMainProcess();
  const log = await sys.createLogger();
  const qwikCityPlan = (await import((0, import_node_url.pathToFileURL)(opts.qwikCityPlanModulePath).href)).default;
  const queue = [];
  const active = /* @__PURE__ */ new Set();
  const routes = qwikCityPlan.routes || [];
  const basePathname = qwikCityPlan.basePathname || "/";
  const trailingSlash = !!qwikCityPlan.trailingSlash;
  return new Promise((resolve2, reject) => {
    try {
      const timer = sys.createTimer();
      const generatorResult = {
        duration: 0,
        rendered: 0,
        errors: 0,
        staticPaths: []
      };
      let isCompleted = false;
      let isRoutesLoaded = false;
      const next = () => {
        while (!isCompleted && main.hasAvailableWorker() && queue.length > 0) {
          const staticRoute = queue.shift();
          if (staticRoute) {
            render(staticRoute);
          }
        }
        if (!isCompleted && isRoutesLoaded && queue.length === 0 && active.size === 0) {
          isCompleted = true;
          generatorResult.duration = timer();
          log.info("\nSSG results");
          if (generatorResult.rendered > 0) {
            log.info(
              `- Generated: ${generatorResult.rendered} page${generatorResult.rendered === 1 ? "" : "s"}`
            );
          }
          if (generatorResult.errors > 0) {
            log.info(`- Errors: ${generatorResult.errors}`);
          }
          log.info(`- Duration: ${msToString(generatorResult.duration)}`);
          const total = generatorResult.rendered + generatorResult.errors;
          if (total > 0) {
            log.info(`- Average: ${msToString(generatorResult.duration / total)} per page`);
          }
          log.info(``);
          main.close().then(() => {
            setTimeout(() => resolve2(generatorResult));
          }).catch(reject);
        }
      };
      let isPendingDrain = false;
      const flushQueue = () => {
        if (!isPendingDrain) {
          isPendingDrain = true;
          setTimeout(() => {
            isPendingDrain = false;
            next();
          });
        }
      };
      const render = async (staticRoute) => {
        try {
          active.add(staticRoute.pathname);
          const result = await main.render({ type: "render", ...staticRoute });
          active.delete(staticRoute.pathname);
          if (result.error) {
            log.error(
              `ERROR: SSG failed for path: ${staticRoute.pathname}
`,
              result.error,
              "\n\n"
            );
            generatorResult.errors++;
          } else if (result.ok) {
            generatorResult.rendered++;
            if (result.isStatic) {
              generatorResult.staticPaths.push(result.pathname);
            }
          }
          flushQueue();
        } catch (e) {
          isCompleted = true;
          reject(e);
        }
      };
      const addToQueue = (pathname, params) => {
        pathname = normalizePathname(pathname, basePathname, trailingSlash);
        if (pathname && !queue.some((s) => s.pathname === pathname)) {
          queue.push({
            pathname,
            params
          });
          flushQueue();
        }
      };
      const loadStaticRoutes = async () => {
        await Promise.all(
          routes.map(async (route) => {
            const [_, loaders, paramNames, originalPathname] = route;
            const modules = await Promise.all(loaders.map((loader) => loader()));
            const pageModule = modules[modules.length - 1];
            if (pageModule.default) {
              if (Array.isArray(paramNames) && paramNames.length > 0) {
                if (typeof pageModule.onStaticGenerate === "function" && paramNames.length > 0) {
                  const staticGenerate = await pageModule.onStaticGenerate();
                  if (Array.isArray(staticGenerate.params)) {
                    for (const params of staticGenerate.params) {
                      const pathname = getPathnameForDynamicRoute(
                        originalPathname,
                        paramNames,
                        params
                      );
                      addToQueue(pathname, params);
                    }
                  }
                }
              } else {
                addToQueue(originalPathname, void 0);
              }
            }
          })
        );
        isRoutesLoaded = true;
        flushQueue();
      };
      loadStaticRoutes();
    } catch (e) {
      reject(e);
    }
  });
}
function validateOptions(opts) {
  let siteOrigin = opts.origin;
  if (typeof siteOrigin !== "string" || siteOrigin.trim().length === 0) {
    throw new Error(`Missing "origin" option`);
  }
  siteOrigin = siteOrigin.trim();
  if (!siteOrigin.startsWith("https://") && !siteOrigin.startsWith("http://")) {
    throw new Error(`"origin" must start with a valid protocol, such as "https://" or "http://"`);
  }
  try {
    new URL(siteOrigin);
  } catch (e) {
    throw new Error(`Invalid "origin": ${e}`);
  }
}

// packages/qwik-city/middleware/request-handler/headers.ts
var HEADERS = Symbol("headers");
var _a;
var HeadersPolyfill = class {
  constructor() {
    this[_a] = {};
  }
  [(_a = HEADERS, Symbol.iterator)]() {
    return this.entries();
  }
  *keys() {
    for (const name of Object.keys(this[HEADERS])) {
      yield name;
    }
  }
  *values() {
    for (const value of Object.values(this[HEADERS])) {
      yield value;
    }
  }
  *entries() {
    for (const name of Object.keys(this[HEADERS])) {
      yield [name, this.get(name)];
    }
  }
  get(name) {
    return this[HEADERS][normalizeHeaderName(name)] || null;
  }
  set(name, value) {
    const normalizedName = normalizeHeaderName(name);
    this[HEADERS][normalizedName] = typeof value !== "string" ? String(value) : value;
  }
  append(name, value) {
    const normalizedName = normalizeHeaderName(name);
    const resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;
    this.set(name, resolvedValue);
  }
  delete(name) {
    if (!this.has(name)) {
      return;
    }
    const normalizedName = normalizeHeaderName(name);
    delete this[HEADERS][normalizedName];
  }
  all() {
    return this[HEADERS];
  }
  has(name) {
    return this[HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }
  forEach(callback, thisArg) {
    for (const name in this[HEADERS]) {
      if (this[HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[HEADERS][name], name, this);
      }
    }
  }
};
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
    throw new TypeError("Invalid character in header field name");
  }
  return name.toLowerCase();
}
function createHeaders() {
  return new (typeof Headers === "function" ? Headers : HeadersPolyfill)();
}

// packages/qwik-city/middleware/request-handler/error-handler.ts
var ErrorResponse = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function errorHandler(requestCtx, e) {
  const status = 500 /* InternalServerError */;
  const html = getErrorHtml(status, e);
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    e
  );
}
function errorResponse(requestCtx, errorResponse2) {
  const html = minimalHtmlResponse(
    errorResponse2.status,
    errorResponse2.message,
    errorResponse2.stack
  );
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    errorResponse2.status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    errorResponse2
  );
}
function getErrorHtml(status, e) {
  let message = "Server Error";
  let stack = void 0;
  if (e != null) {
    if (typeof e === "object") {
      if (typeof e.message === "string") {
        message = e.message;
      }
      if (e.stack != null) {
        stack = String(e.stack);
      }
    } else {
      message = String(e);
    }
  }
  return minimalHtmlResponse(status, message, stack);
}
function minimalHtmlResponse(status, message, stack) {
  const width = typeof message === "string" ? "600px" : "300px";
  const color = status >= 500 ? COLOR_500 : COLOR_400;
  if (status < 500) {
    stack = "";
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${status}"/>
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color}; color: white; }
    span { display: inline-block; padding: 15px; }
    pre { max-width: 580px; margin: 0 auto; }
  </style>
</head>
<body>
  <p>
    <strong>${status}</strong>
    <span>${message}</span>
  </p>
  ${stack ? `<pre><code>${stack}</code></pre>` : ``}
</body>
</html>
`;
}
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";

// packages/qwik-city/runtime/src/library/constants.ts
var MODULE_CACHE = /* @__PURE__ */ new WeakMap();

// packages/qwik-city/runtime/src/library/routing.ts
var loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getRouteParams(route[2], match);
        const routeBundleNames = route[4];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader(menus, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i) => {
          loadModule(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i] = routeModule,
            cacheModules
          );
        });
        loadModule(
          menuLoader,
          pendingLoads,
          (menuModule) => menu = menuModule == null ? void 0 : menuModule.default,
          cacheModules
        );
        if (pendingLoads.length > 0) {
          await Promise.all(pendingLoads);
        }
        return [params, mods, menu, routeBundleNames];
      }
    }
  }
  return null;
};
var loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const l = moduleLoader();
      if (typeof l.then === "function") {
        pendingLoads.push(
          l.then((loadedModule2) => {
            if (cacheModules !== false) {
              MODULE_CACHE.set(moduleLoader, loadedModule2);
            }
            moduleSetter(loadedModule2);
          })
        );
      } else if (l) {
        moduleSetter(l);
      }
    }
  }
};
var getMenuLoader = (menus, pathname) => {
  if (menus) {
    const menu = menus.find(
      (m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/"))
    );
    if (menu) {
      return menu[1];
    }
  }
  return void 0;
};
var getRouteParams = (paramNames, match) => {
  const params = {};
  if (paramNames) {
    for (let i = 0; i < paramNames.length; i++) {
      params[paramNames[i]] = match ? match[i + 1] : "";
    }
  }
  return params;
};

// packages/qwik-city/middleware/request-handler/endpoint-handler.ts
function endpointHandler(requestCtx, userResponse) {
  const { pendingBody, resolvedBody, status, headers } = userResponse;
  const { response } = requestCtx;
  if (pendingBody === void 0 && resolvedBody === void 0) {
    return response(status, headers, asyncNoop);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  const isJson = headers.get("Content-Type").includes("json");
  return response(status, headers, async ({ write }) => {
    const body = pendingBody !== void 0 ? await pendingBody : resolvedBody;
    if (body !== void 0) {
      if (isJson) {
        write(JSON.stringify(body));
      } else {
        const type = typeof body;
        if (type === "string") {
          write(body);
        } else if (type === "number" || type === "boolean") {
          write(String(body));
        } else {
          write(body);
        }
      }
    }
  });
}
var asyncNoop = async () => {
};

// packages/qwik-city/middleware/request-handler/page-handler.ts
function pageHandler(mode, requestCtx, userResponse, render, opts, routeBundleNames) {
  const { status, headers } = userResponse;
  const { response } = requestCtx;
  const isPageData = userResponse.type === "pagedata";
  const requestHeaders = {};
  requestCtx.request.headers.forEach((value, key) => requestHeaders[key] = value);
  if (isPageData) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  return response(isPageData ? 200 : status, headers, async (stream) => {
    try {
      const result = await render({
        stream: isPageData ? noopStream : stream,
        envData: getQwikCityEnvData(requestHeaders, userResponse, requestCtx.locale, mode),
        ...opts
      });
      if (isPageData) {
        stream.write(
          JSON.stringify(await getClientPageData(userResponse, result, routeBundleNames))
        );
      } else {
        if ((typeof result).html === "string") {
          stream.write(result.html);
        }
      }
      if (typeof stream.clientData === "function") {
        stream.clientData(await getClientPageData(userResponse, result, routeBundleNames));
      }
    } catch (e) {
      const errorHtml = getErrorHtml(500 /* InternalServerError */, e);
      stream.write(errorHtml);
    }
  });
}
async function getClientPageData(userResponse, result, routeBundleNames) {
  var _a3;
  const prefetchBundleNames = getPrefetchBundleNames(result, routeBundleNames);
  const isStatic = !((_a3 = result.snapshotResult) == null ? void 0 : _a3.resources.some((r) => r._cache !== Infinity));
  const clientPage = {
    body: userResponse.pendingBody ? await userResponse.pendingBody : userResponse.resolvedBody,
    status: userResponse.status !== 200 ? userResponse.status : void 0,
    redirect: userResponse.status >= 301 && userResponse.status <= 308 && userResponse.headers.get("location") || void 0,
    isStatic,
    prefetch: prefetchBundleNames.length > 0 ? prefetchBundleNames : void 0
  };
  return clientPage;
}
function getPrefetchBundleNames(result, routeBundleNames) {
  const bundleNames = [];
  const addBundle = (bundleName) => {
    if (bundleName && !bundleNames.includes(bundleName)) {
      bundleNames.push(bundleName);
    }
  };
  const addPrefetchResource = (prefetchResources) => {
    if (Array.isArray(prefetchResources)) {
      for (const prefetchResource of prefetchResources) {
        const bundleName = prefetchResource.url.split("/").pop();
        if (bundleName && !bundleNames.includes(bundleName)) {
          addBundle(bundleName);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(result.prefetchResources);
  const manifest = result.manifest || result._manifest;
  const renderedSymbols = result._symbols;
  if (manifest && renderedSymbols) {
    for (const renderedSymbolName of renderedSymbols) {
      const symbol = manifest.symbols[renderedSymbolName];
      if (symbol && symbol.ctxName === "component$") {
        addBundle(manifest.mapping[renderedSymbolName]);
      }
    }
  }
  if (routeBundleNames) {
    for (const routeBundleName of routeBundleNames) {
      addBundle(routeBundleName);
    }
  }
  return bundleNames;
}
function getQwikCityEnvData(requestHeaders, userResponse, locale, mode) {
  const { url, params, pendingBody, resolvedBody, status } = userResponse;
  return {
    url: url.href,
    requestHeaders,
    locale,
    qwikcity: {
      mode,
      params: { ...params },
      response: {
        body: pendingBody || resolvedBody,
        status
      }
    }
  };
}
var noopStream = { write: () => {
} };

// packages/qwik-city/middleware/request-handler/redirect-handler.ts
var RedirectResponse = class {
  constructor(url, status, headers) {
    this.url = url;
    this.location = url;
    this.status = isRedirectStatus(status) ? status : 302 /* Found */;
    this.headers = headers || createHeaders();
    this.headers.set("Location", this.location);
    this.headers.delete("Cache-Control");
  }
};
function redirectResponse(requestCtx, responseRedirect) {
  return requestCtx.response(responseRedirect.status, responseRedirect.headers, async () => {
  });
}
function isRedirectStatus(status) {
  return typeof status === "number" && status >= 301 /* MovedPermanently */ && status <= 308 /* PermanentRedirect */;
}

// packages/qwik-city/middleware/request-handler/cookie.ts
var SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict"
};
var UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7
};
var createSetCookieValue = (cookieName, cookieValue, options) => {
  const c = [`${cookieName}=${cookieValue}`];
  if (typeof options.domain === "string") {
    c.push(`Domain=${options.domain}`);
  }
  if (typeof options.maxAge === "number") {
    c.push(`Max-Age=${options.maxAge}`);
  } else if (Array.isArray(options.maxAge)) {
    c.push(`Max-Age=${options.maxAge[0] * UNIT[options.maxAge[1]]}`);
  } else if (typeof options.expires === "number" || typeof options.expires == "string") {
    c.push(`Expires=${options.expires}`);
  } else if (options.expires instanceof Date) {
    c.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly) {
    c.push("HttpOnly");
  }
  if (typeof options.path === "string") {
    c.push(`Path=${options.path}`);
  }
  if (options.sameSite && SAMESITE[options.sameSite]) {
    c.push(`SameSite=${SAMESITE[options.sameSite]}`);
  }
  if (options.secure) {
    c.push("Secure");
  }
  return c.join("; ");
};
var parseCookieString = (cookieString) => {
  const cookie = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const cookieSplit = cookieSegment.split("=");
      if (cookieSplit.length > 1) {
        const cookieName = decodeURIComponent(cookieSplit[0].trim());
        const cookieValue = decodeURIComponent(cookieSplit[1].trim());
        cookie[cookieName] = cookieValue;
      }
    }
  }
  return cookie;
};
var REQ_COOKIE = Symbol("request-cookies");
var RES_COOKIE = Symbol("response-cookies");
var _a2;
var Cookie = class {
  constructor(cookieString) {
    this[_a2] = {};
    this[REQ_COOKIE] = parseCookieString(cookieString);
  }
  get(cookieName) {
    const value = this[REQ_COOKIE][cookieName];
    if (!value) {
      return null;
    }
    return {
      value,
      json() {
        return JSON.parse(value);
      },
      number() {
        return Number(value);
      }
    };
  }
  has(cookieName) {
    return !!this[REQ_COOKIE][cookieName];
  }
  set(cookieName, cookieValue, options = {}) {
    const resolvedValue = typeof cookieValue === "string" ? cookieValue : encodeURIComponent(JSON.stringify(cookieValue));
    this[RES_COOKIE][cookieName] = createSetCookieValue(cookieName, resolvedValue, options);
  }
  delete(name, options) {
    this.set(name, "deleted", { ...options, expires: new Date(0) });
  }
  headers() {
    return Object.values(this[RES_COOKIE]);
  }
};
REQ_COOKIE, _a2 = RES_COOKIE;

// packages/qwik-city/middleware/request-handler/user-response.ts
async function loadUserResponse(requestCtx, params, routeModules, trailingSlash, basePathname = "/") {
  if (routeModules.length === 0) {
    throw new ErrorResponse(404 /* NotFound */, `Not Found`);
  }
  const { request, url, platform } = requestCtx;
  const { pathname } = url;
  const isPageModule = isLastModulePageRoute(routeModules);
  const isPageDataRequest = isPageModule && request.headers.get("Accept") === "application/json";
  const type = isPageDataRequest ? "pagedata" : isPageModule ? "pagehtml" : "endpoint";
  const userResponse = {
    type,
    url,
    params,
    status: 200 /* Ok */,
    headers: createHeaders(),
    resolvedBody: void 0,
    pendingBody: void 0,
    cookie: new Cookie(request.headers.get("cookie")),
    aborted: false
  };
  let hasRequestMethodHandler = false;
  if (isPageModule && pathname !== basePathname) {
    if (trailingSlash) {
      if (!pathname.endsWith("/")) {
        throw new RedirectResponse(pathname + "/" + url.search, 302 /* Found */);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw new RedirectResponse(
          pathname.slice(0, pathname.length - 1) + url.search,
          302 /* Found */
        );
      }
    }
  }
  let routeModuleIndex = -1;
  const abort = () => {
    routeModuleIndex = ABORT_INDEX;
  };
  const redirect = (url2, status) => {
    return new RedirectResponse(url2, status, userResponse.headers);
  };
  const error = (status, message) => {
    return new ErrorResponse(status, message);
  };
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < routeModules.length) {
      const endpointModule = routeModules[routeModuleIndex];
      let reqHandler = void 0;
      switch (request.method) {
        case "GET": {
          reqHandler = endpointModule.onGet;
          break;
        }
        case "POST": {
          reqHandler = endpointModule.onPost;
          break;
        }
        case "PUT": {
          reqHandler = endpointModule.onPut;
          break;
        }
        case "PATCH": {
          reqHandler = endpointModule.onPatch;
          break;
        }
        case "OPTIONS": {
          reqHandler = endpointModule.onOptions;
          break;
        }
        case "HEAD": {
          reqHandler = endpointModule.onHead;
          break;
        }
        case "DELETE": {
          reqHandler = endpointModule.onDelete;
          break;
        }
      }
      reqHandler = reqHandler || endpointModule.onRequest;
      if (typeof reqHandler === "function") {
        hasRequestMethodHandler = true;
        const response = {
          get status() {
            return userResponse.status;
          },
          set status(code) {
            userResponse.status = code;
          },
          get headers() {
            return userResponse.headers;
          },
          get locale() {
            return requestCtx.locale;
          },
          set locale(locale) {
            requestCtx.locale = locale;
          },
          redirect,
          error
        };
        const requestEv = {
          request,
          url: new URL(url),
          params: { ...params },
          response,
          platform,
          cookie: userResponse.cookie,
          next,
          abort
        };
        const syncData = reqHandler(requestEv);
        if (typeof syncData === "function") {
          userResponse.pendingBody = createPendingBody(syncData);
        } else if (syncData !== null && typeof syncData === "object" && typeof syncData.then === "function") {
          const asyncResolved = await syncData;
          if (typeof asyncResolved === "function") {
            userResponse.pendingBody = createPendingBody(asyncResolved);
          } else {
            userResponse.resolvedBody = asyncResolved;
          }
        } else {
          userResponse.resolvedBody = syncData;
        }
      }
      routeModuleIndex++;
    }
  };
  await next();
  userResponse.aborted = routeModuleIndex >= ABORT_INDEX;
  for (const setCookieValue of userResponse.cookie.headers()) {
    userResponse.headers.set("Set-Cookie", setCookieValue);
  }
  if (!isPageDataRequest && isRedirectStatus(userResponse.status) && userResponse.headers.has("Location")) {
    throw new RedirectResponse(
      userResponse.headers.get("Location"),
      userResponse.status,
      userResponse.headers
    );
  }
  if (type === "endpoint" && !hasRequestMethodHandler) {
    throw new ErrorResponse(405 /* MethodNotAllowed */, `Method Not Allowed`);
  }
  return userResponse;
}
function createPendingBody(cb) {
  return new Promise((resolve2, reject) => {
    try {
      const rtn = cb();
      if (rtn !== null && typeof rtn === "object" && typeof rtn.then === "function") {
        rtn.then(resolve2, reject);
      } else {
        resolve2(rtn);
      }
    } catch (e) {
      reject(e);
    }
  });
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function updateRequestCtx(requestCtx, trailingSlash) {
  let pathname = requestCtx.url.pathname;
  if (pathname.endsWith(QDATA_JSON)) {
    requestCtx.request.headers.set("Accept", "application/json");
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
    requestCtx.url.pathname = pathname;
  }
}
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;
var ABORT_INDEX = 999999999;

// packages/qwik-city/middleware/request-handler/request-handler.ts
async function requestHandler(mode, requestCtx, opts) {
  try {
    const { render, qwikCityPlan } = opts;
    const { routes, menus, cacheModules, trailingSlash, basePathname } = qwikCityPlan;
    updateRequestCtx(requestCtx, trailingSlash);
    const loadedRoute = await loadRoute(routes, menus, cacheModules, requestCtx.url.pathname);
    if (loadedRoute) {
      const [params, mods, _, routeBundleNames] = loadedRoute;
      const userResponse = await loadUserResponse(
        requestCtx,
        params,
        mods,
        trailingSlash,
        basePathname
      );
      if (userResponse.aborted) {
        return null;
      }
      if (userResponse.type === "endpoint") {
        const endpointResult = await endpointHandler(requestCtx, userResponse);
        return endpointResult;
      }
      const pageResult = await pageHandler(
        mode,
        requestCtx,
        userResponse,
        render,
        opts,
        routeBundleNames
      );
      return pageResult;
    }
  } catch (e) {
    if (e instanceof RedirectResponse) {
      return redirectResponse(requestCtx, e);
    }
    if (e instanceof ErrorResponse) {
      return errorResponse(requestCtx, e);
    }
    return errorHandler(requestCtx, e);
  }
  return null;
}

// packages/qwik-city/static/worker-thread.ts
var import_node_url2 = require("url");
async function workerThread(sys) {
  const ssgOpts = sys.getOptions();
  const pendingPromises = /* @__PURE__ */ new Set();
  const opts = {
    ...ssgOpts,
    render: (await import((0, import_node_url2.pathToFileURL)(ssgOpts.renderModulePath).href)).default,
    qwikCityPlan: (await import((0, import_node_url2.pathToFileURL)(ssgOpts.qwikCityPlanModulePath).href)).default
  };
  sys.createWorkerProcess(async (msg) => {
    switch (msg.type) {
      case "render": {
        return new Promise((resolve2) => {
          workerRender(sys, opts, msg, pendingPromises, resolve2);
        });
      }
      case "close": {
        const promises = Array.from(pendingPromises);
        pendingPromises.clear();
        await Promise.all(promises);
        return { type: "close" };
      }
    }
  });
}
async function workerRender(sys, opts, staticRoute, pendingPromises, callback) {
  const url = new URL(staticRoute.pathname, opts.origin);
  const result = {
    type: "render",
    pathname: staticRoute.pathname,
    url: url.href,
    ok: false,
    error: null,
    isStatic: false
  };
  try {
    const request = new SsgRequestContext(url);
    const requestCtx = {
      locale: void 0,
      url,
      request,
      response: async (status, headers, body, err) => {
        if (err) {
          if (err.stack) {
            result.error = String(err.stack);
          } else if (err.message) {
            result.error = String(err.message);
          } else {
            result.error = String(err);
          }
        } else {
          result.ok = status >= 200 && status <= 299 && (headers.get("Content-Type") || "").includes("text/html");
        }
        if (result.ok) {
          const writeHtmlEnabled = opts.emitHtml !== false;
          const writeDataEnabled = opts.emitData !== false;
          const htmlFilePath = sys.getPageFilePath(staticRoute.pathname);
          const dataFilePath = sys.getDataFilePath(staticRoute.pathname);
          if (writeHtmlEnabled || writeDataEnabled) {
            await sys.ensureDir(htmlFilePath);
          }
          return new Promise((resolve2) => {
            const htmlWriter = writeHtmlEnabled ? sys.createWriteStream(htmlFilePath) : null;
            const dataWriter = writeDataEnabled ? sys.createWriteStream(dataFilePath) : null;
            body({
              write: (chunk) => {
                if (htmlWriter) {
                  htmlWriter.write(chunk);
                }
              },
              clientData: (data) => {
                if (dataWriter) {
                  dataWriter.write(JSON.stringify(data));
                }
                if (typeof data.isStatic === "boolean") {
                  result.isStatic = data.isStatic;
                }
              }
            }).finally(() => {
              if (htmlWriter) {
                if (dataWriter) {
                  dataWriter.close();
                }
                htmlWriter.close(resolve2);
              } else if (dataWriter) {
                dataWriter.close(resolve2);
              } else {
                resolve2();
              }
            });
          });
        }
      },
      platform: sys.platform
    };
    const promise = requestHandler("static", requestCtx, opts).then((rsp) => {
      if (rsp == null) {
        callback(result);
      }
    }).catch((e) => {
      if (e) {
        if (e.stack) {
          result.error = String(e.stack);
        } else if (e.message) {
          result.error = String(e.message);
        } else {
          result.error = String(e);
        }
      } else {
        result.error = `Error`;
      }
      callback(result);
    }).finally(() => {
      pendingPromises.delete(promise);
    });
    pendingPromises.add(promise);
  } catch (e) {
    if (e) {
      if (e.stack) {
        result.error = String(e.stack);
      } else if (e.message) {
        result.error = String(e.message);
      } else {
        result.error = String(e);
      }
    } else {
      result.error = `Error`;
    }
    callback(result);
  }
}
var SsgRequestContext = class {
  constructor(url) {
    this.url = url.href;
    const headers = createHeaders();
    headers.set("Host", url.host);
    headers.set("Accept", "text/html,application/json");
    headers.set("User-Agent", "Qwik City SSG");
    this.headers = headers;
  }
  get method() {
    return "GET";
  }
  async json() {
    return {};
  }
  async text() {
    return "";
  }
  async formData() {
    return new URLSearchParams();
  }
};

// packages/qwik-city/static/node/index.ts
async function generate(opts) {
  if (import_node_worker_threads3.isMainThread) {
    const sys = await createSystem(opts);
    const result = await mainThread(sys);
    return result;
  }
  throw new Error(`generate() cannot be called from a worker thread`);
}
if (!import_node_worker_threads3.isMainThread && import_node_worker_threads3.workerData) {
  (async () => {
    const sys = await createSystem(import_node_worker_threads3.workerData);
    await workerThread(sys);
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generate
});
