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

// packages/qwik-city/src/static/node/index.ts
var index_exports = {};
__export(index_exports, {
  generate: () => generate
});
module.exports = __toCommonJS(index_exports);

// packages/qwik-city/src/static/node/node-system.ts
var import_node_fs2 = __toESM(require("node:fs"), 1);
var import_node_path3 = require("node:path");

// packages/qwik-city/src/middleware/node/node-fetch.ts
var import_web = require("node:stream/web");
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

// packages/qwik-city/src/static/node/node-main.ts
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_os = require("node:os");
var import_node_worker_threads = require("node:worker_threads");
var import_node_path2 = require("node:path");

// packages/qwik-city/src/utils/fs.ts
var import_node_path = require("node:path");

// packages/qwik-city/src/utils/format.ts
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

// packages/qwik-city/src/utils/pathname.ts
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

// packages/qwik-city/src/utils/fs.ts
function normalizePath(path) {
  return normalizePathSlash((0, import_node_path.normalize)(path));
}
function normalizePathSlash(path) {
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

// packages/qwik-city/src/static/worker-thread.ts
var import_request_handler = require("../middleware/request-handler/index.cjs");
var import_node_url = require("node:url");
var import_web2 = require("node:stream/web");
var import_qwik = require("@builder.io/qwik");
async function workerThread(sys) {
  const ssgOpts = sys.getOptions();
  const pendingPromises = /* @__PURE__ */ new Set();
  const opts = {
    ...ssgOpts,
    render: (await import((0, import_node_url.pathToFileURL)(ssgOpts.renderModulePath).href)).default,
    qwikCityPlan: (await import((0, import_node_url.pathToFileURL)(ssgOpts.qwikCityPlanModulePath).href)).default
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
async function createSingleThreadWorker(sys) {
  const ssgOpts = sys.getOptions();
  const pendingPromises = /* @__PURE__ */ new Set();
  const opts = {
    ...ssgOpts,
    render: (await import((0, import_node_url.pathToFileURL)(ssgOpts.renderModulePath).href)).default,
    qwikCityPlan: (await import((0, import_node_url.pathToFileURL)(ssgOpts.qwikCityPlanModulePath).href)).default
  };
  return (staticRoute) => {
    return new Promise((resolve2) => {
      workerRender(sys, opts, staticRoute, pendingPromises, resolve2);
    });
  };
}
async function workerRender(sys, opts, staticRoute, pendingPromises, callback) {
  const qwikSerializer = {
    _deserializeData: import_qwik._deserializeData,
    _serializeData: import_qwik._serializeData,
    _verifySerializable: import_qwik._verifySerializable
  };
  const url = new URL(staticRoute.pathname, opts.origin);
  const result = {
    type: "render",
    pathname: staticRoute.pathname,
    url: url.href,
    ok: false,
    error: null,
    filePath: null,
    contentType: null,
    resourceType: null
  };
  try {
    let routeWriter = null;
    let closeResolved;
    const closePromise = new Promise((closePromiseResolve) => {
      closeResolved = closePromiseResolve;
    });
    const request = new Request(url);
    const requestCtx = {
      mode: "static",
      locale: void 0,
      url,
      request,
      env: {
        get(key) {
          return sys.getEnv(key);
        }
      },
      platform: sys.platform,
      getClientConn: () => {
        return {};
      },
      getWritableStream: (status, headers, _, _r, requestEv) => {
        result.ok = status >= 200 && status < 300;
        if (!result.ok) {
          return noopWritableStream;
        }
        result.contentType = (headers.get("Content-Type") || "").toLowerCase();
        const isHtml = result.contentType.includes("text/html");
        const is404ErrorPage = url.pathname.endsWith("/404.html");
        const routeFilePath = sys.getRouteFilePath(url.pathname, isHtml);
        if (is404ErrorPage) {
          result.resourceType = "404";
        } else if (isHtml) {
          result.resourceType = "page";
        }
        const hasRouteWriter = isHtml ? opts.emitHtml !== false : true;
        const writeQDataEnabled = isHtml && opts.emitData !== false;
        const stream = new import_web2.WritableStream({
          async start() {
            try {
              if (hasRouteWriter || writeQDataEnabled) {
                await sys.ensureDir(routeFilePath);
              }
              if (hasRouteWriter) {
                routeWriter = sys.createWriteStream(routeFilePath);
                routeWriter.on("error", (e) => {
                  console.error(e);
                  routeWriter = null;
                  result.error = {
                    message: e.message,
                    stack: e.stack
                  };
                });
              }
            } catch (e) {
              routeWriter = null;
              result.error = {
                message: String(e),
                stack: e.stack || ""
              };
            }
          },
          write(chunk) {
            try {
              if (routeWriter) {
                routeWriter.write(Buffer.from(chunk.buffer));
              }
            } catch (e) {
              routeWriter = null;
              result.error = {
                message: String(e),
                stack: e.stack || ""
              };
            }
          },
          async close() {
            const writePromises = [];
            try {
              if (writeQDataEnabled) {
                const qData = requestEv.sharedMap.get("qData");
                if (qData && !is404ErrorPage) {
                  const qDataFilePath = sys.getDataFilePath(url.pathname);
                  const dataWriter = sys.createWriteStream(qDataFilePath);
                  dataWriter.on("error", (e) => {
                    console.error(e);
                    result.error = {
                      message: e.message,
                      stack: e.stack
                    };
                  });
                  const serialized = await (0, import_qwik._serializeData)(qData, true);
                  dataWriter.write(serialized);
                  writePromises.push(
                    new Promise((resolve2) => {
                      result.filePath = routeFilePath;
                      dataWriter.end(resolve2);
                    })
                  );
                }
              }
              if (routeWriter) {
                writePromises.push(
                  new Promise((resolve2) => {
                    result.filePath = routeFilePath;
                    routeWriter.end(resolve2);
                  }).finally(closeResolved)
                );
              }
              if (writePromises.length > 0) {
                await Promise.all(writePromises);
              }
            } catch (e) {
              routeWriter = null;
              result.error = {
                message: String(e),
                stack: e.stack || ""
              };
            }
          }
        });
        return stream;
      }
    };
    const promise = (0, import_request_handler.requestHandler)(requestCtx, opts, qwikSerializer).then((rsp) => {
      if (rsp != null) {
        return rsp.completion.then((r) => {
          if (routeWriter) {
            return closePromise.then(() => r);
          }
          return r;
        });
      }
    }).then((e) => {
      if (e !== void 0) {
        if (e instanceof Error) {
          result.error = {
            message: e.message,
            stack: e.stack
          };
        } else {
          result.error = {
            message: String(e),
            stack: void 0
          };
        }
      }
    }).finally(() => {
      pendingPromises.delete(promise);
      callback(result);
    });
    pendingPromises.add(promise);
  } catch (e) {
    if (e instanceof Error) {
      result.error = {
        message: e.message,
        stack: e.stack
      };
    } else {
      result.error = {
        message: String(e),
        stack: void 0
      };
    }
    callback(result);
  }
}
var noopWriter = {
  closed: Promise.resolve(void 0),
  ready: Promise.resolve(void 0),
  desiredSize: 0,
  async close() {
  },
  async abort() {
  },
  async write() {
  },
  releaseLock() {
  }
};
var noopWritableStream = {
  get locked() {
    return false;
  },
  set locked(_) {
  },
  async abort() {
  },
  async close() {
  },
  getWriter() {
    return noopWriter;
  }
};

// packages/qwik-city/src/static/node/node-main.ts
var import_meta = {};
async function createNodeMainProcess(sys, opts) {
  const ssgWorkers = [];
  const sitemapBuffer = [];
  let sitemapPromise = null;
  opts = { ...opts };
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
  const singleThreadWorker = await createSingleThreadWorker(sys);
  const createWorker = (workerIndex) => {
    if (workerIndex === 0) {
      const ssgSameThreadWorker = {
        activeTasks: 0,
        totalTasks: 0,
        render: async (staticRoute) => {
          ssgSameThreadWorker.activeTasks++;
          ssgSameThreadWorker.totalTasks++;
          const result = await singleThreadWorker(staticRoute);
          ssgSameThreadWorker.activeTasks--;
          return result;
        },
        terminate: async () => {
        }
      };
      return ssgSameThreadWorker;
    }
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
      console.error(`worker error`, e);
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
    if (sitemapOutFile && result.ok && result.resourceType === "page") {
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
    ssgWorkers.push(createWorker(i));
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

// packages/qwik-city/src/static/node/node-worker.ts
var import_node_worker_threads2 = require("node:worker_threads");
async function createNodeWorkerProcess(onMessage) {
  var _a;
  (_a = import_node_worker_threads2.parentPort) == null ? void 0 : _a.on("message", async (msg) => {
    var _a2;
    (_a2 = import_node_worker_threads2.parentPort) == null ? void 0 : _a2.postMessage(await onMessage(msg));
  });
}

// packages/qwik-city/src/static/node/node-system.ts
async function createSystem(opts) {
  patchGlobalThis();
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
  const basePathname = opts.basePathname || "/";
  const basenameLen = basePathname.length;
  const getRouteFilePath = (pathname, isHtml) => {
    pathname = pathname.slice(basenameLen);
    if (isHtml) {
      if (!pathname.endsWith(".html")) {
        if (pathname.endsWith("/")) {
          pathname += "index.html";
        } else {
          pathname += "/index.html";
        }
      }
    } else {
      if (pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }
    }
    return (0, import_node_path3.join)(outDir, pathname);
  };
  const getDataFilePath = (pathname) => {
    pathname = pathname.slice(basenameLen);
    if (pathname.endsWith("/")) {
      pathname += "q-data.json";
    } else {
      pathname += "/q-data.json";
    }
    return (0, import_node_path3.join)(outDir, pathname);
  };
  const sys = {
    createMainProcess: null,
    createWorkerProcess: createNodeWorkerProcess,
    createLogger,
    getOptions: () => opts,
    ensureDir,
    createWriteStream,
    createTimer,
    access,
    getRouteFilePath,
    getDataFilePath,
    getEnv: (key) => process.env[key],
    platform: {
      static: true,
      node: process.versions.node
    }
  };
  sys.createMainProcess = () => createNodeMainProcess(sys, opts);
  return sys;
}
var ensureDir = async (filePath) => {
  await import_node_fs2.default.promises.mkdir((0, import_node_path3.dirname)(filePath), { recursive: true });
};
var access = async (path) => {
  try {
    await import_node_fs2.default.promises.access(path);
    return true;
  } catch {
    return false;
  }
};

// packages/qwik-city/src/static/node/index.ts
var import_node_worker_threads3 = require("node:worker_threads");

// packages/qwik-city/src/static/routes.ts
function createRouteTester(basePathname, includeRoutes, excludeRoutes) {
  const includes = routesToRegExps(includeRoutes);
  const excludes = routesToRegExps(excludeRoutes);
  return (pathname) => {
    if (pathname.endsWith("404.html")) {
      return true;
    }
    if (basePathname !== "/") {
      pathname = pathname.slice(basePathname.length - 1);
    }
    for (const exclude of excludes) {
      if (exclude.test(pathname)) {
        return false;
      }
    }
    for (const include of includes) {
      if (include.test(pathname)) {
        return true;
      }
    }
    return false;
  };
}
function routesToRegExps(routes) {
  if (!Array.isArray(routes)) {
    return [];
  }
  return routes.filter((r) => typeof r === "string").map(routeToRegExp);
}
function routeToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replace(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}

// packages/qwik-city/src/static/not-found.ts
var import_request_handler2 = require("../middleware/request-handler/index.cjs");
async function generateNotFoundPages(sys, opts, routes) {
  if (opts.emit404Pages !== false) {
    const basePathname = opts.basePathname || "/";
    const rootNotFoundPathname = basePathname + "404.html";
    const hasRootNotFound = routes.some((r) => r[2] === rootNotFoundPathname);
    if (!hasRootNotFound) {
      const filePath = sys.getRouteFilePath(rootNotFoundPathname, true);
      const html = (0, import_request_handler2.getErrorHtml)(404, "Resource Not Found");
      await sys.ensureDir(filePath);
      return new Promise((resolve2) => {
        const writer = sys.createWriteStream(filePath);
        writer.write(html);
        writer.end(resolve2);
      });
    }
  }
}

// packages/qwik-city/src/static/main-thread.ts
var import_node_url2 = require("node:url");
var import_node_path4 = require("node:path");

// node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null) return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);

// packages/qwik/src/optimizer/src/plugins/vite-utils.ts
var findLocation = (e) => {
  const stack = e.stack;
  if (typeof stack === "string") {
    const lines = stack.split("\n").filter((l) => !l.includes("/node_modules/") && !l.includes("(node:"));
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].replace("file:///", "/");
      if (/^\s+at/.test(line)) {
        const start = line.indexOf("/");
        const end = line.lastIndexOf(")", start);
        if (start > 0) {
          const path = line.slice(start, end);
          const parts = path.split(":");
          const nu0 = safeParseInt(parts[parts.length - 1]);
          const nu1 = safeParseInt(parts[parts.length - 2]);
          if (typeof nu0 === "number" && typeof nu1 === "number") {
            parts.length -= 2;
            return {
              file: parts.join(":"),
              line: nu1,
              column: nu0
            };
          } else if (typeof nu0 === "number") {
            parts.length -= 1;
            return {
              file: parts.join(":"),
              line: nu0,
              column: void 0
            };
          } else {
            return {
              file: parts.join(":"),
              line: void 0,
              column: void 0
            };
          }
        }
      }
    }
  }
  return void 0;
};
var safeParseInt = (nu) => {
  try {
    return parseInt(nu, 10);
  } catch {
    return void 0;
  }
};
var splitRE = /\r?\n/;
var range = 2;
function posToNumber(source, pos) {
  if (typeof pos === "number") {
    return pos;
  }
  if (pos.lo != null) {
    return pos.lo;
  }
  const lines = source.split(splitRE);
  const { line, column } = pos;
  let start = 0;
  for (let i = 0; i < line - 1 && i < lines.length; i++) {
    start += lines[i].length + 1;
  }
  return start + column;
}
function generateCodeFrame(source, start = 0, end) {
  start = posToNumber(source, start);
  end = end || start;
  const lines = source.split(splitRE);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue;
        }
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = Math.max(start - (count - lineLength) + 1, 0);
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}

// packages/qwik-city/src/buildtime/vite/format-error.ts
var import_node_fs3 = __toESM(require("node:fs"), 1);
function formatError(e) {
  if (e instanceof Error) {
    const err = e;
    let loc = err.loc;
    if (!err.frame && !err.plugin) {
      if (!loc) {
        loc = findLocation(err);
      }
      if (loc) {
        err.loc = loc;
        if (loc.file) {
          err.id = normalizePath(err.loc.file);
          try {
            const code = import_node_fs3.default.readFileSync(err.loc.file, "utf-8");
            err.frame = generateCodeFrame(code, err.loc);
          } catch {
          }
        }
      }
    }
  }
  return e;
}

// packages/qwik-city/src/static/main-thread.ts
var import_vite = require("vite");

// packages/qwik-city/src/static/extract-params.ts
function extractParamNames(routeName) {
  const params = [];
  let idx = 0;
  while (idx < routeName.length) {
    const start = routeName.indexOf("[", idx);
    if (start !== -1) {
      const end = routeName.indexOf("]", start);
      const param = routeName.slice(start + 1, end);
      params.push(param.startsWith("...") ? param.substring(3) : param);
      idx = end + 1;
    } else {
      idx = routeName.length;
    }
  }
  return params;
}

// packages/qwik-city/src/static/main-thread.ts
async function mainThread(sys) {
  const opts = sys.getOptions();
  validateOptions(opts);
  const main = await sys.createMainProcess();
  const log = await sys.createLogger();
  log.info("\n" + bold(green("Starting Qwik City SSG...")));
  const qwikCityPlan = (await import((0, import_node_url2.pathToFileURL)(opts.qwikCityPlanModulePath).href)).default;
  const queue = [];
  const active = /* @__PURE__ */ new Set();
  const routes = qwikCityPlan.routes || [];
  const trailingSlash = !!qwikCityPlan.trailingSlash;
  const includeRoute = createRouteTester(opts.basePathname || "/", opts.include, opts.exclude);
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
        if (generatorResult.errors === 0) {
          log.info(`
${green("SSG results")}`);
          if (generatorResult.rendered > 0) {
            log.info(
              `- Generated: ${dim(
                `${generatorResult.rendered} page${generatorResult.rendered === 1 ? "" : "s"}`
              )}`
            );
          }
          log.info(`- Duration: ${dim(msToString(generatorResult.duration))}`);
          const total = generatorResult.rendered + generatorResult.errors;
          if (total > 0) {
            log.info(
              `- Average: ${dim(msToString(generatorResult.duration / total) + " per page")}`
            );
          }
          log.info(``);
        }
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
            const err = new Error(result.error.message);
            err.stack = result.error.stack;
            log.error(`
${bold(red(`!!! ${result.pathname}: Error during SSG`))}`);
            log.error(red(err.message));
            log.error(`  Pathname: ${magenta(staticRoute.pathname)}`);
            Object.assign(formatError(err), {
              plugin: "qwik-ssg"
            });
            log.error((0, import_vite.buildErrorMessage)(err));
            generatorResult.errors++;
          }
          if (result.filePath != null) {
            generatorResult.rendered++;
            generatorResult.staticPaths.push(result.pathname);
            const base = opts.rootDir ?? opts.outDir;
            const path = (0, import_node_path4.relative)(base, result.filePath);
            const lastSlash = path.lastIndexOf("/");
            log.info(`${dim(path.slice(0, lastSlash + 1))}${path.slice(lastSlash + 1)}`);
          }
          flushQueue();
        } catch (e) {
          isCompleted = true;
          reject(e);
        }
      };
      const addToQueue = (pathname, params) => {
        if (pathname) {
          pathname = new URL(pathname, `https://qwik.dev`).pathname;
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
          if (includeRoute(pathname) && !queue.some((s) => s.pathname === pathname)) {
            queue.push({
              pathname,
              params
            });
            flushQueue();
          }
        }
      };
      const loadStaticRoute = async (route) => {
        const [routeName, loaders, originalPathname] = route;
        const modules = await Promise.all(loaders.map((loader) => loader()));
        const pageModule = modules[modules.length - 1];
        const paramNames = extractParamNames(routeName);
        const isValidStaticModule = pageModule && (pageModule.default || pageModule.onRequest || pageModule.onGet);
        if (isValidStaticModule) {
          if (Array.isArray(paramNames) && paramNames.length > 0) {
            if (typeof pageModule.onStaticGenerate === "function" && paramNames.length > 0) {
              const staticGenerate = await pageModule.onStaticGenerate({
                env: {
                  get(key) {
                    return sys.getEnv(key);
                  }
                }
              });
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
  if (!/:\/\//.test(siteOrigin) || siteOrigin.startsWith("://")) {
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

// packages/qwik-city/src/static/node/index.ts
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
