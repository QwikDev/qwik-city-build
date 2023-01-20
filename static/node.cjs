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
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
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
var import_web = require("stream/web");
var import_undici = require("undici");
var import_crypto = __toESM(require("crypto"), 1);
function patchGlobalThis() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    globalThis.fetch = import_undici.fetch;
    globalThis.Headers = import_undici.Headers;
    globalThis.Request = import_undici.Request;
    globalThis.Response = import_undici.Response;
    globalThis.FormData = import_undici.FormData;
  }
  if (typeof globalThis.TextEncoderStream === "undefined") {
    globalThis.TextEncoderStream = import_web.TextEncoderStream;
    globalThis.TextDecoderStream = import_web.TextDecoderStream;
  }
  if (typeof globalThis.WritableStream === "undefined") {
    globalThis.WritableStream = import_web.WritableStream;
    globalThis.ReadableStream = import_web.ReadableStream;
  }
  if (typeof globalThis.crypto === "undefined") {
    globalThis.crypto = import_crypto.default.webcrypto;
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
  opts = { ...opts };
  delete opts.filter;
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
  var _a;
  (_a = import_node_worker_threads2.parentPort) == null ? void 0 : _a.on("message", async (msg) => {
    var _a2;
    (_a2 = import_node_worker_threads2.parentPort) == null ? void 0 : _a2.postMessage(await onMessage(msg));
  });
}

// packages/qwik-city/static/node/node-system.ts
async function createSystem(opts) {
  patchGlobalThis();
  const createWriteStream = (filePath) => {
    return import_node_fs2.default.createWriteStream(filePath, {
      flags: "w"
    });
  };
  const removeFile = (filePath) => {
    return import_node_fs2.default.promises.unlink(filePath);
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
  const basePathname = opts.basePathname || "/";
  const basenameLen = basePathname.length;
  const getFsDir = (pathname) => {
    pathname = pathname.slice(basenameLen);
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    return pathname;
  };
  const getPageFilePath = (pathname) => {
    if (pathname.endsWith(".html")) {
      pathname = pathname.slice(basenameLen);
    } else {
      pathname = getFsDir(pathname) + "index.html";
    }
    return (0, import_node_path3.join)(outDir, pathname);
  };
  const getDataFilePath = (pathname) => {
    if (!pathname.endsWith(".html")) {
      pathname = getFsDir(pathname) + "q-data.json";
      return (0, import_node_path3.join)(outDir, pathname);
    }
    return null;
  };
  const sys = {
    createMainProcess: () => createNodeMainProcess(opts),
    createWorkerProcess: createNodeWorkerProcess,
    createLogger,
    getOptions: () => opts,
    ensureDir,
    removeFile,
    createWriteStream,
    createTimer,
    access,
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
  await import_node_fs2.default.promises.mkdir((0, import_node_path3.dirname)(filePath), { recursive: true });
};
var access = async (path) => {
  try {
    await import_node_fs2.default.promises.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

// packages/qwik-city/static/node/index.ts
var import_node_worker_threads3 = require("worker_threads");

// packages/qwik-city/static/not-found.ts
var import_request_handler = require("../middleware/request-handler/index.cjs");
async function generateNotFoundPages(sys, opts, routes) {
  if (opts.emit404Pages !== false) {
    const basePathname = opts.basePathname || "/";
    const rootNotFoundPathname = basePathname + "404.html";
    const hasRootNotFound = routes.some((r) => r[3] === rootNotFoundPathname);
    if (!hasRootNotFound) {
      const filePath = sys.getPageFilePath(rootNotFoundPathname);
      const html = (0, import_request_handler.getErrorHtml)(404, "Resource Not Found");
      await sys.ensureDir(filePath);
      return new Promise((resolve2) => {
        const writer = sys.createWriteStream(filePath);
        writer.write(html);
        writer.end(resolve2);
      });
    }
  }
}

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
      const completed = async () => {
        const closePromise = main.close();
        await generateNotFoundPages(sys, opts, routes);
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
        closePromise.then(() => {
          setTimeout(() => resolve2(generatorResult));
        }).catch(reject);
      };
      const next = () => {
        while (!isCompleted && main.hasAvailableWorker() && queue.length > 0) {
          const staticRoute = queue.shift();
          if (staticRoute) {
            render(staticRoute);
          }
        }
        if (!isCompleted && isRoutesLoaded && queue.length === 0 && active.size === 0) {
          isCompleted = true;
          completed();
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
          if (typeof opts.filter === "function" && result.filePath != null) {
            const keepStaticFile = opts.filter({
              ...staticRoute,
              isStatic: result.isStatic
            });
            if (keepStaticFile === false) {
              sys.removeFile(result.filePath);
            }
          }
          flushQueue();
        } catch (e) {
          isCompleted = true;
          reject(e);
        }
      };
      const addToQueue = (pathname, params) => {
        if (pathname) {
          pathname = new URL(pathname, `https://qwik.builder.io`).pathname;
          if (pathname !== opts.basePathname) {
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
          if (!queue.some((s) => s.pathname === pathname)) {
            queue.push({
              pathname,
              params
            });
            flushQueue();
          }
        }
      };
      const loadStaticRoute = async (route) => {
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
      };
      const loadStaticRoutes = async () => {
        await Promise.all(routes.map(loadStaticRoute));
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
  if (!opts.qwikCityPlanModulePath) {
    throw new Error(`Missing "qwikCityPlanModulePath" option`);
  }
  if (!opts.renderModulePath) {
    throw new Error(`Missing "renderModulePath" option`);
  }
  let siteOrigin = opts.origin;
  if (typeof siteOrigin !== "string" || siteOrigin.trim().length === 0) {
    throw new Error(`Missing "origin" option`);
  }
  siteOrigin = siteOrigin.trim();
  if (!siteOrigin.startsWith("https://") && !siteOrigin.startsWith("http://")) {
    throw new Error(
      `"origin" must start with a valid protocol, such as "https://" or "http://", received "${siteOrigin}"`
    );
  }
  try {
    new URL(siteOrigin);
  } catch (e) {
    throw new Error(`Invalid "origin": ${e}`);
  }
}

// packages/qwik-city/static/worker-thread.ts
var import_request_handler2 = require("../middleware/request-handler/index.cjs");
var import_node_url2 = require("url");
var import_web2 = require("stream/web");
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
    isStatic: true,
    filePath: null
  };
  const htmlFilePath = sys.getPageFilePath(staticRoute.pathname);
  const dataFilePath = sys.getDataFilePath(staticRoute.pathname);
  const writeHtmlEnabled = opts.emitHtml !== false;
  const writeDataEnabled = opts.emitData !== false && !!dataFilePath;
  if (writeHtmlEnabled || writeDataEnabled) {
    await sys.ensureDir(htmlFilePath);
  }
  try {
    const request = new SsgRequestContext(url);
    const requestCtx = {
      mode: "static",
      locale: void 0,
      url,
      request,
      getWritableStream: (status, headers, _, _r, requestEv) => {
        result.ok = status >= 200 && status <= 299 && (headers.get("Content-Type") || "").includes("text/html");
        if (!result.ok) {
          return noopWriter;
        }
        const htmlWriter = writeHtmlEnabled ? sys.createWriteStream(htmlFilePath) : null;
        const stream = new import_web2.WritableStream({
          write(chunk) {
            if (htmlWriter) {
              htmlWriter.write(Buffer.from(chunk.buffer));
            }
          },
          close() {
            const data = requestEv.sharedMap.get("qData");
            if (writeDataEnabled) {
              if (data) {
                if (typeof data.isStatic === "boolean") {
                  result.isStatic = data.isStatic;
                }
                const dataWriter = sys.createWriteStream(dataFilePath);
                dataWriter.write(JSON.stringify(data));
                dataWriter.end();
              }
            }
            if (data) {
              if (htmlWriter) {
                return new Promise((resolve2) => {
                  result.filePath = htmlFilePath;
                  htmlWriter.end(resolve2);
                });
              }
            }
          }
        });
        return stream;
      },
      platform: sys.platform
    };
    const promise = (0, import_request_handler2.requestHandler)(requestCtx, opts).then((rsp) => {
      if (rsp != null) {
        return rsp.completion;
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
    }).finally(() => {
      pendingPromises.delete(promise);
      callback(result);
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
var noopWriter = /* @__PURE__ */ new import_web2.WritableStream({
  write() {
  },
  close() {
  }
});
var SsgRequestContext = class {
  constructor(url) {
    this.url = url.href;
    const headers = (0, import_request_handler2.createHeaders)();
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
    patchGlobalThis();
    const sys = await createSystem(import_node_worker_threads3.workerData);
    await workerThread(sys);
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generate
});
