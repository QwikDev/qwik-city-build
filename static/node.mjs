// packages/qwik-city/static/node/node-system.ts
import fs2 from "fs";
import { dirname as dirname2, join } from "path";

// packages/qwik-city/middleware/node/node-fetch.ts
import {
  TextEncoderStream,
  TextDecoderStream,
  WritableStream,
  ReadableStream
} from "stream/web";
import { fetch, Headers, Request as Request2, Response, FormData as FormData2 } from "undici";
import crypto from "crypto";
function patchGlobalThis() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    globalThis.fetch = fetch;
    globalThis.Headers = Headers;
    globalThis.Request = Request2;
    globalThis.Response = Response;
    globalThis.FormData = FormData2;
  }
  if (typeof globalThis.TextEncoderStream === "undefined") {
    globalThis.TextEncoderStream = TextEncoderStream;
    globalThis.TextDecoderStream = TextDecoderStream;
  }
  if (typeof globalThis.WritableStream === "undefined") {
    globalThis.WritableStream = WritableStream;
    globalThis.ReadableStream = ReadableStream;
  }
  if (typeof globalThis.crypto === "undefined") {
    globalThis.crypto = crypto.webcrypto;
  }
}

// packages/qwik-city/static/node/node-main.ts
import fs from "fs";
import { cpus as nodeCpus } from "os";
import { Worker } from "worker_threads";
import { isAbsolute, resolve } from "path";

// packages/qwik-city/utils/fs.ts
import { basename, dirname, normalize, relative } from "path";

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
  path = normalize(path);
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
async function createNodeMainProcess(opts) {
  const ssgWorkers = [];
  const sitemapBuffer = [];
  let sitemapPromise = null;
  opts = { ...opts };
  let outDir = opts.outDir;
  if (typeof outDir !== "string") {
    throw new Error(`Missing "outDir" option`);
  }
  if (!isAbsolute(outDir)) {
    throw new Error(`"outDir" must be an absolute file path, received: ${outDir}`);
  }
  outDir = normalizePath(outDir);
  let maxWorkers = nodeCpus().length;
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
    if (!isAbsolute(sitemapOutFile)) {
      sitemapOutFile = resolve(outDir, sitemapOutFile);
    }
  }
  const createWorker = () => {
    let terminateResolve = null;
    const mainTasks = /* @__PURE__ */ new Map();
    let workerFilePath;
    if (typeof __filename === "string") {
      workerFilePath = __filename;
    } else {
      workerFilePath = import.meta.url;
    }
    if (typeof workerFilePath === "string" && workerFilePath.startsWith("file://")) {
      workerFilePath = new URL(workerFilePath);
    }
    const nodeWorker = new Worker(workerFilePath, { workerData: opts });
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
        sitemapPromise = fs.promises.appendFile(sitemapOutFile, siteMapUrls);
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
      promises.push(fs.promises.appendFile(sitemapOutFile, sitemapBuffer.join("\n")));
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
    await fs.promises.writeFile(
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
import { parentPort } from "worker_threads";
async function createNodeWorkerProcess(onMessage) {
  var _a;
  (_a = parentPort) == null ? void 0 : _a.on("message", async (msg) => {
    var _a2;
    (_a2 = parentPort) == null ? void 0 : _a2.postMessage(await onMessage(msg));
  });
}

// packages/qwik-city/static/node/node-system.ts
async function createSystem(opts) {
  patchGlobalThis();
  const createWriteStream = (filePath) => {
    return fs2.createWriteStream(filePath, {
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
    return join(outDir, pathname);
  };
  const getDataFilePath = (pathname) => {
    if (!pathname.endsWith(".html")) {
      pathname = getFsDir(pathname) + "q-data.json";
      return join(outDir, pathname);
    }
    return null;
  };
  const sys = {
    createMainProcess: () => createNodeMainProcess(opts),
    createWorkerProcess: createNodeWorkerProcess,
    createLogger,
    getOptions: () => opts,
    ensureDir,
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
  await fs2.promises.mkdir(dirname2(filePath), { recursive: true });
};
var access = async (path) => {
  try {
    await fs2.promises.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

// packages/qwik-city/static/node/index.ts
import { isMainThread, workerData } from "worker_threads";

// packages/qwik-city/static/routes.ts
function createRouteTester(includeRoutes, excludeRoutes) {
  const includes = routesToRegExps(includeRoutes);
  const excludes = routesToRegExps(excludeRoutes);
  return (pathname) => {
    if (pathname.endsWith("404.html")) {
      return true;
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

// packages/qwik-city/static/not-found.ts
import { getErrorHtml } from "../middleware/request-handler/index.mjs";
async function generateNotFoundPages(sys, opts, routes) {
  if (opts.emit404Pages !== false) {
    const basePathname = opts.basePathname || "/";
    const rootNotFoundPathname = basePathname + "404.html";
    const hasRootNotFound = routes.some((r) => r[3] === rootNotFoundPathname);
    if (!hasRootNotFound) {
      const filePath = sys.getPageFilePath(rootNotFoundPathname);
      const html = getErrorHtml(404, "Resource Not Found");
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
import { pathToFileURL } from "url";
import { relative as relative2 } from "path";

// node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/index.mjs
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
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY),
  // modifiers
  reset: init(0, 0),
  bold: init(1, 22),
  dim: init(2, 22),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  // colors
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  grey: init(90, 39),
  // background colors
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49)
};
function run(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $.reset.bind(ctx);
  ctx.bold = $.bold.bind(ctx);
  ctx.dim = $.dim.bind(ctx);
  ctx.italic = $.italic.bind(ctx);
  ctx.underline = $.underline.bind(ctx);
  ctx.inverse = $.inverse.bind(ctx);
  ctx.hidden = $.hidden.bind(ctx);
  ctx.strikethrough = $.strikethrough.bind(ctx);
  ctx.black = $.black.bind(ctx);
  ctx.red = $.red.bind(ctx);
  ctx.green = $.green.bind(ctx);
  ctx.yellow = $.yellow.bind(ctx);
  ctx.blue = $.blue.bind(ctx);
  ctx.magenta = $.magenta.bind(ctx);
  ctx.cyan = $.cyan.bind(ctx);
  ctx.white = $.white.bind(ctx);
  ctx.gray = $.gray.bind(ctx);
  ctx.grey = $.grey.bind(ctx);
  ctx.bgBlack = $.bgBlack.bind(ctx);
  ctx.bgRed = $.bgRed.bind(ctx);
  ctx.bgGreen = $.bgGreen.bind(ctx);
  ctx.bgYellow = $.bgYellow.bind(ctx);
  ctx.bgBlue = $.bgBlue.bind(ctx);
  ctx.bgMagenta = $.bgMagenta.bind(ctx);
  ctx.bgCyan = $.bgCyan.bind(ctx);
  ctx.bgWhite = $.bgWhite.bind(ctx);
  return ctx;
}
function init(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
  };
}
var kleur_default = $;

// packages/qwik/src/optimizer/src/plugins/vite-utils.ts
var findLocation = (e) => {
  const stack = e.stack;
  if (typeof stack === "string") {
    const lines = stack.split("\n");
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].replace("file:///", "/");
      if (/^\s+at/.test(line)) {
        const start = line.indexOf("/");
        const end = line.indexOf(")", start);
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
  if (typeof pos === "number")
    return pos;
  const lines = source.split(splitRE);
  const { line, column } = pos;
  let start = 0;
  for (let i = 0; i < line - 1; i++) {
    if (lines[i]) {
      start += lines[i].length + 1;
    }
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
        if (j < 0 || j >= lines.length)
          continue;
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

// packages/qwik-city/buildtime/vite/format-error.ts
import fs3 from "fs";
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
            const code = fs3.readFileSync(err.loc.file, "utf-8");
            err.frame = generateCodeFrame(code, err.loc);
          } catch {
          }
        }
      }
    }
  }
  return e;
}

// packages/qwik-city/static/main-thread.ts
import { buildErrorMessage } from "vite";
async function mainThread(sys) {
  const opts = sys.getOptions();
  validateOptions(opts);
  const main = await sys.createMainProcess();
  const log = await sys.createLogger();
  log.info("\n" + kleur_default.bold().green("Starting Qwik City SSG..."));
  const qwikCityPlan = (await import(pathToFileURL(opts.qwikCityPlanModulePath).href)).default;
  const queue = [];
  const active = /* @__PURE__ */ new Set();
  const routes = qwikCityPlan.routes || [];
  const trailingSlash = !!qwikCityPlan.trailingSlash;
  const includeRoute = createRouteTester(opts.include, opts.exclude);
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
${kleur_default.green("SSG results")}`);
          if (generatorResult.rendered > 0) {
            log.info(
              `- Generated: ${kleur_default.dim(
                `${generatorResult.rendered} page${generatorResult.rendered === 1 ? "" : "s"}`
              )}`
            );
          }
          log.info(`- Duration: ${kleur_default.dim(msToString(generatorResult.duration))}`);
          const total = generatorResult.rendered + generatorResult.errors;
          if (total > 0) {
            log.info(
              `- Average: ${kleur_default.dim(msToString(generatorResult.duration / total) + " per page")}`
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
${kleur_default.bold().red("Error during SSG")}`);
            log.error(kleur_default.red(err.message));
            log.error(`  Pathname: ${kleur_default.magenta(staticRoute.pathname)}`);
            Object.assign(formatError(err), {
              plugin: "qwik-ssg"
            });
            log.error(buildErrorMessage(err));
            generatorResult.errors++;
          }
          if (result.filePath != null) {
            generatorResult.rendered++;
            generatorResult.staticPaths.push(result.pathname);
            const base = opts.rootDir ?? opts.outDir;
            const path = relative2(base, result.filePath);
            const lastSlash = path.lastIndexOf("/");
            log.info(`${kleur_default.dim(path.slice(0, lastSlash + 1))}${path.slice(lastSlash + 1)}`);
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
import { requestHandler } from "../middleware/request-handler/index.mjs";
import { pathToFileURL as pathToFileURL2 } from "url";
import { WritableStream as WritableStream2 } from "stream/web";

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev === true;
var qInspector = globalThis.qInspector === true;
var qSerialize = globalThis.qSerialize !== false;
var qDynamicPlatform = globalThis.qDynamicPlatform !== false;
var qTest = globalThis.qTest === true;
var qRuntimeQrl = globalThis.qRuntimeQrl === true;
var seal = (obj) => {
  if (qDev) {
    Object.seal(obj);
  }
};

// packages/qwik/src/core/util/element.ts
var isNode = (value) => {
  return value && typeof value.nodeType === "number";
};
var isDocument = (value) => {
  return value && value.nodeType === 9;
};
var isElement = (value) => {
  return value.nodeType === 1;
};
var isQwikElement = (value) => {
  return isNode(value) && (value.nodeType === 1 || value.nodeType === 111);
};
var isVirtualElement = (value) => {
  return value.nodeType === 111;
};

// packages/qwik/src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  const err = message instanceof Error ? message : createError(message);
  const messageStr = err.stack || err.message;
  console.error("%cQWIK ERROR", STYLE, messageStr, ...printParams(optionalParams));
  return err;
};
var createError = (message) => {
  const err = new Error(message);
  if (err.stack) {
    err.stack = filterStack(err.stack);
  }
  return err;
};
var filterStack = (stack, offset = 0) => {
  return stack.split("\n").slice(offset).filter((l) => !l.includes("/node_modules/@builder.io/qwik")).join("\n");
};
var logErrorAndStop = (message, ...optionalParams) => {
  const err = logError(message, ...optionalParams);
  debugger;
  return err;
};
var logWarn = (message, ...optionalParams) => {
  if (qDev) {
    console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
  }
};
var tryGetContext = (element) => {
  return element["_qc_"];
};
var printParams = (optionalParams) => {
  if (qDev) {
    return optionalParams.map((p) => {
      if (isNode(p) && isElement(p)) {
        return printElement(p);
      }
      return p;
    });
  }
  return optionalParams;
};
var printElement = (el) => {
  var _a;
  const ctx = tryGetContext(el);
  const isServer2 = /* @__PURE__ */ (() => typeof process !== "undefined" && !!process.versions && !!process.versions.node)();
  return {
    tagName: el.tagName,
    renderQRL: (_a = ctx == null ? void 0 : ctx.$componentQrl$) == null ? void 0 : _a.getSymbol(),
    element: isServer2 ? void 0 : el,
    ctx: isServer2 ? void 0 : ctx
  };
};

// packages/qwik/src/core/error/error.ts
var QError_verifySerializable = 3;
var QError_qrlIsNotFunction = 10;
var QError_invalidJsxNodeType = 25;
var QError_missingObjectId = 27;
var QError_qrlMissingContainer = 30;
var QError_qrlMissingChunk = 31;
var qError = (code, ...parts) => {
  const text = codeToText(code);
  return logErrorAndStop(text, ...parts);
};
var codeToText = (code) => {
  if (qDev) {
    const MAP = [
      "Error while serializing class attribute",
      // 0
      "Can not serialize a HTML Node that is not an Element",
      // 1
      "Runtime but no instance found on element.",
      // 2
      "Only primitive and object literals can be serialized",
      // 3
      "Crash while rendering",
      // 4
      "You can render over a existing q:container. Skipping render().",
      // 5
      "Set property",
      // 6
      "Only function's and 'string's are supported.",
      // 7
      "Only objects can be wrapped in 'QObject'",
      // 8
      `Only objects literals can be wrapped in 'QObject'`,
      // 9
      "QRL is not a function",
      // 10
      "Dynamic import not found",
      // 11
      "Unknown type argument",
      // 12
      "Actual value for useContext() can not be found, make sure some ancestor component has set a value using useContextProvider()",
      // 13
      "Invoking 'use*()' method outside of invocation context.",
      // 14
      "Cant access renderCtx for existing context",
      // 15
      "Cant access document for existing context",
      // 16
      "props are immutable",
      // 17
      "<div> component can only be used at the root of a Qwik component$()",
      // 18
      "Props are immutable by default.",
      // 19
      `Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called syncronously within the 'component$' function or another 'use' method.
For more information see: https://qwik.builder.io/docs/components/lifecycle/#use-method-rules`,
      // 20
      "Container is already paused. Skipping",
      // 21
      'Components using useServerMount() can only be mounted in the server, if you need your component to be mounted in the client, use "useMount$()" instead',
      // 22
      "When rendering directly on top of Document, the root node must be a <html>",
      // 23
      "A <html> node must have 2 children. The first one <head> and the second one a <body>",
      // 24
      "Invalid JSXNode type. It must be either a function or a string. Found:",
      // 25
      "Tracking value changes can only be done to useStore() objects and component props",
      // 26
      "Missing Object ID for captured object",
      // 27
      "The provided Context reference is not a valid context created by createContext()",
      // 28
      "<html> is the root container, it can not be rendered inside a component",
      // 29
      "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.",
      // 30
      "QRLs can not be dynamically resolved, because it does not have a chunk path",
      // 31
      "The JSX ref attribute must be a Signal"
      // 32
    ];
    return `Code(${code}): ${MAP[code] ?? ""}`;
  } else {
    return `Code(${code})`;
  }
};

// packages/qwik/src/core/util/types.ts
var isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};
var isObject = (v) => {
  return v && typeof v === "object";
};
var isArray = (v) => {
  return Array.isArray(v);
};
var isString = (v) => {
  return typeof v === "string";
};
var isFunction = (v) => {
  return typeof v === "function";
};

// packages/qwik/src/core/platform/platform.ts
var createPlatform = () => {
  return {
    isServer: false,
    importSymbol(containerEl, url, symbolName) {
      const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      urlCopy.search = "";
      const importURL = urlCopy.href;
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod) => {
        return findSymbol(mod, symbolName);
      });
    },
    raf: (fn) => {
      return new Promise((resolve2) => {
        requestAnimationFrame(() => {
          resolve2(fn());
        });
      });
    },
    nextTick: (fn) => {
      return new Promise((resolve2) => {
        setTimeout(() => {
          resolve2(fn());
        });
      });
    },
    chunkForSymbol() {
      return void 0;
    }
  };
};
var findSymbol = (module, symbol) => {
  if (symbol in module) {
    return module[symbol];
  }
  for (const v of Object.values(module)) {
    if (isObject(v) && symbol in v) {
      return v[symbol];
    }
  }
};
var toUrl = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
var _platform = createPlatform();
var getPlatform = () => {
  return _platform;
};
var isServer = () => {
  if (qDynamicPlatform) {
    return _platform.isServer;
  }
  return false;
};

// packages/qwik/src/core/error/assert.ts
function assertDefined(value, text, ...parts) {
  if (qDev) {
    if (value != null)
      return;
    throw logErrorAndStop(text, ...parts);
  }
}
function assertTrue(value1, text, ...parts) {
  if (qDev) {
    if (value1 === true)
      return;
    throw logErrorAndStop(text, ...parts);
  }
}

// packages/qwik/src/core/util/promises.ts
var isPromise = (value) => {
  return value instanceof Promise;
};
var then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};

// packages/qwik/src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
  Error.stackTraceLimit = 9999;
}

// packages/qwik/src/core/qrl/qrl.ts
var serializeQRL = (qrl, opts = {}) => {
  assertTrue(qSerialize, "In order to serialize a QRL, qSerialize must be true");
  assertQrl(qrl);
  let symbol = qrl.$symbol$;
  let chunk = qrl.$chunk$;
  const refSymbol = qrl.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol);
    if (result) {
      chunk = result[1];
      if (!qrl.$refSymbol$) {
        symbol = result[0];
      }
    }
  }
  if (qRuntimeQrl && !chunk) {
    chunk = "/runtimeQRL";
    symbol = "_";
  }
  if (!chunk) {
    throw qError(QError_qrlMissingChunk, qrl.$symbol$);
  }
  if (chunk.startsWith("./")) {
    chunk = chunk.slice(2);
  }
  const parts = [chunk, "#", symbol];
  const capture = qrl.$capture$;
  const captureRef = qrl.$captureRef$;
  if (captureRef && captureRef.length) {
    if (opts.$getObjId$) {
      const capture2 = captureRef.map(opts.$getObjId$);
      parts.push(`[${capture2.join(" ")}]`);
    } else if (opts.$addRefMap$) {
      const capture2 = captureRef.map(opts.$addRefMap$);
      parts.push(`[${capture2.join(" ")}]`);
    }
  } else if (capture && capture.length > 0) {
    parts.push(`[${capture.join(" ")}]`);
  }
  return parts.join("");
};
var parseQRL = (qrl, containerEl) => {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  if (containerEl) {
    iQrl.$setContainer$(containerEl);
  }
  return iQrl;
};
var indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return charIdx == -1 ? endIdx : charIdx;
};

// packages/qwik/src/core/util/markers.ts
var OnRenderProp = "q:renderFn";
var QSlot = "q:slot";
var QLocaleAttr = "q:locale";
var QContainerSelector = "[q\\:container]";
var RenderEvent = "qRender";

// packages/qwik/src/core/use/use-locale.ts
var _locale = void 0;
function setLocale(locale) {
  _locale = locale;
}

// packages/qwik/src/core/use/use-core.ts
var _context;
var tryGetInvokeContext = () => {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (isArray(context)) {
      return document.__q_context__ = newInvokeContextFromTuple(context);
    }
    return context;
  }
  return _context;
};
var invoke = (context, fn, ...args) => {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(null, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
};
var newInvokeContextFromTuple = (context) => {
  const element = context[0];
  const container = element.closest(QContainerSelector);
  const locale = (container == null ? void 0 : container.getAttribute(QLocaleAttr)) || void 0;
  locale && setLocale(locale);
  return newInvokeContext(locale, void 0, element, context[1], context[2]);
};
var newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $seq$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $url$: url,
    $qrl$: void 0,
    $props$: void 0,
    $renderCtx$: void 0,
    $subscriber$: void 0,
    $waitOn$: void 0,
    $locale$: locale
  };
  seal(ctx);
  return ctx;
};

// packages/qwik/src/core/state/constants.ts
var QObjectRecursive = 1 << 0;
var QObjectImmutable = 1 << 1;
var QOjectTargetSymbol = Symbol("proxy target");
var QObjectFlagsSymbol = Symbol("proxy flags");
var QObjectManagerSymbol = Symbol("proxy manager");
var _IMMUTABLE = Symbol("IMMUTABLE");

// packages/qwik/src/core/state/signal.ts
var SignalImpl = class {
  constructor(v, manager) {
    this.untrackedValue = v;
    this[QObjectManagerSymbol] = manager;
  }
  // prevent accidental use as value
  valueOf() {
    throw new TypeError("Cannot coerce a Signal, use `.value` instead");
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return { value: this.value };
  }
  get value() {
    var _a;
    const sub = (_a = tryGetInvokeContext()) == null ? void 0 : _a.$subscriber$;
    if (sub) {
      this[QObjectManagerSymbol].$addSub$([0, sub, void 0]);
    }
    return this.untrackedValue;
  }
  set value(v) {
    if (qDev) {
      verifySerializable(v);
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx && invokeCtx.$event$ === RenderEvent) {
        logWarn(
          "State mutation inside render function. Move mutation to useWatch(), useClientEffect() or useServerMount()",
          invokeCtx.$hostElement$
        );
      }
    }
    const manager = this[QObjectManagerSymbol];
    const oldValue = this.untrackedValue;
    if (manager && oldValue !== v) {
      this.untrackedValue = v;
      manager.$notifySubs$();
    }
  }
};
QObjectManagerSymbol;
var isSignal = (obj) => {
  return obj instanceof SignalImpl || obj instanceof SignalWrapper;
};
var SignalWrapper = class {
  constructor(ref, prop) {
    this.ref = ref;
    this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getProxyManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
};

// packages/qwik/src/core/state/context.ts
var Q_CTX = "_qc_";
var HOST_FLAG_DIRTY = 1 << 0;
var HOST_FLAG_NEED_ATTACH_LISTENER = 1 << 1;
var HOST_FLAG_MOUNTED = 1 << 2;
var HOST_FLAG_DYNAMIC = 1 << 3;
var tryGetContext2 = (element) => {
  return element[Q_CTX];
};

// packages/qwik/src/core/container/container.ts
var CONTAINER_STATE = Symbol("ContainerState");
var intToStr = (nu) => {
  return nu.toString(36);
};
var strToInt = (nu) => {
  return parseInt(nu, 36);
};

// packages/qwik/src/core/render/jsx/utils.public.ts
var SkipRender = Symbol("skip render");
var Virtual = (props) => props.children;

// packages/qwik/src/core/render/jsx/jsx-runtime.ts
var warnClassname = false;
var jsx = (type, props, key) => {
  const processed = key == null ? null : String(key);
  const node = new JSXNodeImpl(type, props, processed);
  seal(node);
  return node;
};
var JSXNodeImpl = class {
  constructor(type, props, key = null) {
    this.type = type;
    this.props = props;
    this.key = key;
    if (qDev) {
      invoke(void 0, () => {
        const isQwikC = isQwikComponent(type);
        if (!isString(type) && !isFunction(type)) {
          throw qError(QError_invalidJsxNodeType, String(type));
        }
        if (isArray(props.children)) {
          const flatChildren = props.children.flat();
          if (isString(type) || isQwikC) {
            flatChildren.forEach((child) => {
              if (!isValidJSXChild(child)) {
                const typeObj = typeof child;
                let explanation = "";
                if (typeObj === "object") {
                  if (child == null ? void 0 : child.constructor) {
                    explanation = `it's an instance of "${child == null ? void 0 : child.constructor.name}".`;
                  } else {
                    explanation = `it's a object literal: ${printObjectLiteral(child)} `;
                  }
                } else if (typeObj === "function") {
                  explanation += `it's a function named "${child.name}".`;
                } else {
                  explanation = `it's a "${typeObj}": ${String(child)}.`;
                }
                throw createJSXError(
                  `One of the children of <${type} /> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal that resolves to one of those types. Instead, ${explanation}`,
                  this
                );
              }
            });
          }
          const keys = {};
          flatChildren.forEach((child) => {
            if (isJSXNode(child) && !isString(child.type) && child.key != null) {
              if (keys[child.key]) {
                const err = createJSXError(
                  `Multiple JSX sibling nodes with the same key.
This is likely caused by missing a custom key in a for loop`,
                  child
                );
                if (err) {
                  logError(err);
                }
              } else {
                keys[child.key] = true;
              }
            }
          });
        }
        if (!qRuntimeQrl && props) {
          for (const prop of Object.keys(props)) {
            const value = props[prop];
            if (prop.endsWith("$") && value) {
              if (!isQrl(value) && !Array.isArray(value)) {
                throw qError(QError_invalidJsxNodeType, String(value));
              }
            }
            if (prop !== "children" && isQwikC && value) {
              verifySerializable(
                value,
                `The value of the JSX property "${prop}" can not be serialized`
              );
            }
          }
        }
        if (isString(type)) {
          if (type === "style") {
            if (props.children) {
              logWarn(`jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.
In order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'

However, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.
See https://qwik.builder.io/docs/components/styles/#usestyles for more information.`);
            }
          }
          if (type === "script") {
            if (props.children) {
              logWarn(`jsx: Using <script>{content}</script> will escape the content, effectively breaking the inlined JS.
In order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'`);
            }
          }
          if ("className" in props) {
            props["class"] = props["className"];
            delete props["className"];
            if (qDev && !warnClassname) {
              warnClassname = true;
              logWarn("jsx: `className` is deprecated. Use `class` instead.");
            }
          }
        }
      });
    }
  }
};
var printObjectLiteral = (obj) => {
  return `{ ${Object.keys(obj).map((key) => `"${key}"`).join(", ")} }`;
};
var isJSXNode = (n) => {
  if (qDev) {
    if (n instanceof JSXNodeImpl) {
      return true;
    }
    if (isObject(n) && "key" in n && "props" in n && "type" in n) {
      logWarn(`Duplicate implementations of "JSXNode" found`);
      return true;
    }
    return false;
  } else {
    return n instanceof JSXNodeImpl;
  }
};
var isValidJSXChild = (node) => {
  if (!node) {
    return true;
  } else if (node === SkipRender) {
    return true;
  } else if (isString(node) || typeof node === "number" || typeof node === "boolean") {
    return true;
  } else if (isJSXNode(node)) {
    return true;
  }
  if (isSignal(node)) {
    return isValidJSXChild(node.value);
  } else if (isPromise(node)) {
    return true;
  }
  return false;
};
var ONCE_JSX = /* @__PURE__ */ new Set();
var createJSXError = (message, node) => {
  const error = new Error(message);
  if (!node.dev) {
    return error;
  }
  const id = node.dev.fileName;
  const key = `${message}${id}:${node.dev.lineNumber}:${node.dev.columnNumber}`;
  if (ONCE_JSX.has(key)) {
    return void 0;
  }
  Object.assign(error, {
    id,
    loc: {
      file: id,
      column: node.dev.columnNumber,
      line: node.dev.lineNumber
    }
  });
  error.stack = `JSXError: ${message}
${filterStack(node.dev.stack, 1)}`;
  ONCE_JSX.add(key);
  return error;
};

// packages/qwik/src/core/container/pause.ts
var _serializeData = (data) => {
  const containerState = {};
  const collector = createCollector(containerState);
  collectValue(data, collector, false);
  const objs = Array.from(collector.$objSet$.keys());
  let count = 0;
  const objToId = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    objToId.set(obj, intToStr(count));
    count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    assertDefined(undefinedID, "undefined ID must be defined");
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const mustGetObjId = (obj) => {
    const key = objToId.get(obj);
    if (key === void 0) {
      throw qError(QError_missingObjectId, obj);
    }
    return key;
  };
  const convertedObjs = objs.map((obj) => {
    if (obj === null) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, containerState);
    if (value !== void 0) {
      return value;
    }
    if (typeObj === "object") {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key of Object.keys(obj)) {
          output[key] = mustGetObjId(obj[key]);
        }
        return output;
      }
    }
    throw qError(QError_verifySerializable, obj);
  });
  return JSON.stringify({
    _entry: mustGetObjId(data),
    _objs: convertedObjs
  });
};
var createCollector = (containerState) => {
  return {
    $containerState$: containerState,
    $seen$: /* @__PURE__ */ new Set(),
    $objSet$: /* @__PURE__ */ new Set(),
    $prefetch$: 0,
    $noSerialize$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
  };
};
var collectDeferElement = (el, collector) => {
  const ctx = tryGetContext2(el);
  if (collector.$elements$.includes(ctx)) {
    return;
  }
  collector.$elements$.push(ctx);
  collector.$prefetch$++;
  if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
    collectElementData(ctx, collector, true);
  } else {
    collector.$deferElements$.push(ctx);
  }
  collector.$prefetch$--;
};
var collectElementData = (elCtx, collector, dynamic) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
    collectValue(elCtx.$props$, collector, dynamic);
  }
  if (elCtx.$componentQrl$) {
    collectValue(elCtx.$componentQrl$, collector, dynamic);
  }
  if (elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamic);
    }
  }
  if (elCtx.$watches$) {
    for (const obj of elCtx.$watches$) {
      collectValue(obj, collector, dynamic);
    }
  }
  if (dynamic) {
    collectContext(elCtx, collector);
    if (elCtx.$dynamicSlots$) {
      for (const slotCtx of elCtx.$dynamicSlots$) {
        collectContext(slotCtx, collector);
      }
    }
  }
};
var collectContext = (elCtx, collector) => {
  while (elCtx) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
      if (elCtx.$contexts$.get("_") === true) {
        break;
      }
    }
    elCtx = elCtx.$slotParent$ ?? elCtx.$parent$;
  }
};
var collectSubscriptions = (manager, collector) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  assertDefined(subs, "subs must be defined");
  for (const key of subs) {
    const host = key[1];
    if (isNode(host) && isVirtualElement(host)) {
      if (key[0] === 0) {
        collectDeferElement(host, collector);
      }
    } else {
      collectValue(host, collector, true);
    }
  }
};
var PROMISE_VALUE = Symbol();
var resolvePromise = (promise) => {
  return promise.then(
    (value) => {
      const v = {
        resolved: true,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    },
    (value) => {
      const v = {
        resolved: false,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    }
  );
};
var collectValue = (obj, collector, leaks) => {
  if (obj !== null) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        const seen = collector.$seen$;
        if (seen.has(obj)) {
          return;
        }
        seen.add(obj);
        if (fastSkipSerialize(obj)) {
          collector.$objSet$.add(void 0);
          collector.$noSerialize$.push(obj);
          return;
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          obj = target;
          if (seen.has(obj)) {
            return;
          }
          seen.add(obj);
          if (fastWeakSerialize(input)) {
            collector.$objSet$.add(obj);
            return;
          }
          if (leaks) {
            collectSubscriptions(getProxyManager(input), collector);
          }
        }
        const collected = collectDeps(obj, collector, leaks);
        if (collected) {
          collector.$objSet$.add(obj);
          return;
        }
        if (isPromise(obj)) {
          collector.$promises$.push(
            resolvePromise(obj).then((value) => {
              collectValue(value, collector, leaks);
            })
          );
          return;
        }
        if (objType === "object") {
          if (isNode(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(obj[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key of Object.keys(obj)) {
              collectValue(obj[key], collector, leaks);
            }
          }
        }
        break;
      }
    }
  }
  collector.$objSet$.add(obj);
};
var isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

// packages/qwik/src/core/use/use-task.ts
var WatchFlagsIsEffect = 1 << 0;
var WatchFlagsIsWatch = 1 << 1;
var WatchFlagsIsDirty = 1 << 2;
var WatchFlagsIsCleanup = 1 << 3;
var WatchFlagsIsResource = 1 << 4;
var isResourceTask = (watch) => {
  return !!watch.$resource$;
};
var isSubscriberDescriptor = (obj) => {
  return isObject(obj) && obj instanceof Task;
};
var serializeWatch = (watch, getObjId) => {
  let value = `${intToStr(watch.$flags$)} ${intToStr(watch.$index$)} ${getObjId(
    watch.$qrl$
  )} ${getObjId(watch.$el$)}`;
  if (isResourceTask(watch)) {
    value += ` ${getObjId(watch.$resource$)}`;
  }
  return value;
};
var parseTask = (data) => {
  const [flags, index, qrl, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
};
var Task = class {
  constructor($flags$, $index$, $el$, $qrl$, $resource$) {
    this.$flags$ = $flags$;
    this.$index$ = $index$;
    this.$el$ = $el$;
    this.$qrl$ = $qrl$;
    this.$resource$ = $resource$;
  }
};

// packages/qwik/src/core/use/use-resource.ts
var _createResourceReturn = (opts) => {
  const resource = {
    __brand: "resource",
    value: void 0,
    loading: isServer() ? false : true,
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: (opts == null ? void 0 : opts.timeout) ?? -1,
    _cache: 0
  };
  return resource;
};
var isResourceReturn = (obj) => {
  return isObject(obj) && obj.__brand === "resource";
};
var serializeResource = (resource, getObjId) => {
  const state = resource._state;
  if (state === "resolved") {
    return `0 ${getObjId(resource._resolved)}`;
  } else if (state === "pending") {
    return `1`;
  } else {
    return `2 ${getObjId(resource._error)}`;
  }
};
var parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  result.value = Promise.resolve();
  if (first === "0") {
    result._state = "resolved";
    result._resolved = id;
    result.loading = false;
  } else if (first === "1") {
    result._state = "pending";
    result.value = new Promise(() => {
    });
    result.loading = true;
  } else if (first === "2") {
    result._state = "rejected";
    result._error = id;
    result.loading = false;
  }
  return result;
};

// packages/qwik/src/core/container/serializers.ts
var UNDEFINED_PREFIX = "";
var QRLSerializer = {
  prefix: "",
  test: (v) => isQrl(v),
  collect: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    if (collector.$prefetch$ === 0) {
      collector.$qrls$.push(v);
    }
  },
  serialize: (obj, getObjId) => {
    return serializeQRL(obj, {
      $getObjId$: getObjId
    });
  },
  prepare: (data, containerState) => {
    return parseQRL(data, containerState.$containerEl$);
  },
  fill: (qrl, getObject) => {
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
var WatchSerializer = {
  prefix: "",
  test: (v) => isSubscriberDescriptor(v),
  collect: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks);
    if (v.$resource$) {
      collectValue(v.$resource$, collector, leaks);
    }
  },
  serialize: (obj, getObjId) => serializeWatch(obj, getObjId),
  prepare: (data) => parseTask(data),
  fill: (watch, getObject) => {
    watch.$el$ = getObject(watch.$el$);
    watch.$qrl$ = getObject(watch.$qrl$);
    if (watch.$resource$) {
      watch.$resource$ = getObject(watch.$resource$);
    }
  }
};
var ResourceSerializer = {
  prefix: "",
  test: (v) => isResourceReturn(v),
  collect: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks);
    collectValue(obj._resolved, collector, leaks);
  },
  serialize: (obj, getObjId) => {
    return serializeResource(obj, getObjId);
  },
  prepare: (data) => {
    return parseResourceReturn(data);
  },
  fill: (resource, getObject) => {
    if (resource._state === "resolved") {
      resource._resolved = getObject(resource._resolved);
      resource.value = Promise.resolve(resource._resolved);
    } else if (resource._state === "rejected") {
      const p = Promise.reject(resource._error);
      p.catch(() => null);
      resource._error = getObject(resource._error);
      resource.value = p;
    }
  }
};
var URLSerializer = {
  prefix: "",
  test: (v) => v instanceof URL,
  serialize: (obj) => obj.href,
  prepare: (data) => new URL(data),
  fill: void 0
};
var DateSerializer = {
  prefix: "",
  test: (v) => v instanceof Date,
  serialize: (obj) => obj.toISOString(),
  prepare: (data) => new Date(data),
  fill: void 0
};
var RegexSerializer = {
  prefix: "\x07",
  test: (v) => v instanceof RegExp,
  serialize: (obj) => `${obj.flags} ${obj.source}`,
  prepare: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  },
  fill: void 0
};
var ErrorSerializer = {
  prefix: "",
  test: (v) => v instanceof Error,
  serialize: (obj) => {
    return obj.message;
  },
  prepare: (text) => {
    const err = new Error(text);
    err.stack = void 0;
    return err;
  },
  fill: void 0
};
var DocumentSerializer = {
  prefix: "",
  test: (v) => isDocument(v),
  serialize: void 0,
  prepare: (_, _c, doc) => {
    return doc;
  },
  fill: void 0
};
var SERIALIZABLE_STATE = Symbol("serializable-data");
var ComponentSerializer = {
  prefix: "",
  test: (obj) => isQwikComponent(obj),
  serialize: (obj, getObjId) => {
    const [qrl] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl, {
      $getObjId$: getObjId
    });
  },
  prepare: (data, containerState) => {
    const optionsIndex = data.indexOf("{");
    const qrlString = optionsIndex == -1 ? data : data.slice(0, optionsIndex);
    const qrl = parseQRL(qrlString, containerState.$containerEl$);
    return componentQrl(qrl);
  },
  fill: (component, getObject) => {
    const [qrl] = component[SERIALIZABLE_STATE];
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
var PureFunctionSerializer = {
  prefix: "",
  test: (obj) => typeof obj === "function" && obj.__qwik_serializable__ !== void 0,
  serialize: (obj) => {
    return obj.toString();
  },
  prepare: (data) => {
    const fn = new Function("return " + data)();
    fn.__qwik_serializable__ = true;
    return fn;
  },
  fill: void 0
};
var SignalSerializer = {
  prefix: "",
  test: (v) => v instanceof SignalImpl,
  collect: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    if (leaks) {
      collectSubscriptions(obj[QObjectManagerSymbol], collector);
    }
    return obj;
  },
  serialize: (obj, getObjId) => {
    return getObjId(obj.untrackedValue);
  },
  prepare: (data, containerState) => {
    return new SignalImpl(data, containerState.$subsManager$.$createManager$());
  },
  subs: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  fill: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
};
var SignalWrapperSerializer = {
  prefix: "",
  test: (v) => v instanceof SignalWrapper,
  collect(obj, collector, leaks) {
    collectValue(obj.ref, collector, leaks);
    if (fastWeakSerialize(obj.ref)) {
      const manager = getProxyManager(obj.ref);
      if (!manager.$isTreeshakeable$(obj.prop)) {
        collectValue(obj.ref[obj.prop], collector, leaks);
      }
      collectSubscriptions(manager, collector);
    }
    return obj;
  },
  serialize: (obj, getObjId) => {
    return `${getObjId(obj.ref)} ${obj.prop}`;
  },
  prepare: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  fill: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
};
var NoFiniteNumberSerializer = {
  prefix: "",
  test: (v) => typeof v === "number",
  serialize: (v) => {
    return String(v);
  },
  prepare: (data) => {
    return Number(data);
  },
  fill: void 0
};
var URLSearchParamsSerializer = {
  prefix: "",
  test: (v) => v instanceof URLSearchParams,
  serialize: (obj) => obj.toString(),
  prepare: (data) => new URLSearchParams(data),
  fill: void 0
};
var FormDataSerializer = {
  prefix: "",
  test: (v) => typeof FormData !== "undefined" && v instanceof globalThis.FormData,
  serialize: (formData) => {
    const array = [];
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        array.push([key, value]);
      } else {
        array.push([key, value.name]);
      }
    });
    return JSON.stringify(array);
  },
  prepare: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  },
  fill: void 0
};
var serializers = [
  QRLSerializer,
  SignalSerializer,
  SignalWrapperSerializer,
  WatchSerializer,
  ResourceSerializer,
  URLSerializer,
  DateSerializer,
  RegexSerializer,
  ErrorSerializer,
  DocumentSerializer,
  ComponentSerializer,
  PureFunctionSerializer,
  NoFiniteNumberSerializer,
  URLSearchParamsSerializer,
  FormDataSerializer
];
var collectorSerializers = /* @__PURE__ */ serializers.filter((a) => a.collect);
var canSerialize = (obj) => {
  for (const s of serializers) {
    if (s.test(obj)) {
      return true;
    }
  }
  return false;
};
var collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.test(obj)) {
      s.collect(obj, collector, leaks);
      return true;
    }
  }
  return false;
};
var serializeValue = (obj, getObjID, containerState) => {
  for (const s of serializers) {
    if (s.test(obj)) {
      let value = s.prefix;
      if (s.serialize) {
        value += s.serialize(obj, getObjID, containerState);
      }
      return value;
    }
  }
  return void 0;
};

// packages/qwik/src/core/state/common.ts
var verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
var _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapProxy(value);
  if (unwrapped == null) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    seen.add(unwrapped);
    if (canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise(unwrapped))
          return value;
        if (isQwikElement(unwrapped))
          return value;
        if (isDocument(unwrapped))
          return value;
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          });
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (preMessage) {
      message = preMessage;
    } else {
      message = "Value cannot be serialized";
    }
    if (ctx !== "_") {
      message += ` in ${ctx},`;
    }
    if (typeObj === "object") {
      message += ` because it's an instance of "${value == null ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.builder.io/docs/advanced/dollar/`;
    } else if (typeObj === "function") {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(
        value
      )});

Please check out https://qwik.builder.io/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value);
    throw createError(message);
  }
  return value;
};
var noSerializeSet = /* @__PURE__ */ new WeakSet();
var weakSerializeSet = /* @__PURE__ */ new WeakSet();
var shouldSerialize = (obj) => {
  if (isObject(obj) || isFunction(obj)) {
    return !noSerializeSet.has(obj);
  }
  return true;
};
var fastSkipSerialize = (obj) => {
  return noSerializeSet.has(obj);
};
var fastWeakSerialize = (obj) => {
  return weakSerializeSet.has(obj);
};
var unwrapProxy = (proxy) => {
  return isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
};
var getProxyTarget = (obj) => {
  return obj[QOjectTargetSymbol];
};
var getProxyManager = (obj) => {
  return obj[QObjectManagerSymbol];
};

// packages/qwik/src/core/qrl/qrl-class.ts
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
var createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  if (qDev) {
    if (captureRef) {
      for (const item of captureRef) {
        verifySerializable(item, "Captured variable in the closure can not be serialized");
      }
    }
  }
  let _containerEl;
  const setContainer = (el) => {
    if (!_containerEl) {
      _containerEl = el;
    }
  };
  const resolve2 = async (containerEl) => {
    if (containerEl) {
      setContainer(containerEl);
    }
    if (symbolRef !== null) {
      return symbolRef;
    }
    if (symbolFn !== null) {
      return symbolRef = symbolFn().then((module) => symbolRef = module[symbol]);
    } else {
      if (!chunk) {
        throw qError(QError_qrlMissingChunk, symbol);
      }
      if (!_containerEl) {
        throw qError(QError_qrlMissingContainer, chunk, symbol);
      }
      const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
      return symbolRef = then(symbol2, (ref) => {
        return symbolRef = ref;
      });
    }
  };
  const resolveLazy = (containerEl) => {
    return symbolRef !== null ? symbolRef : resolve2(containerEl);
  };
  const invokeFn = (currentCtx, beforeFn) => {
    return (...args) => {
      const start = now();
      const fn = resolveLazy();
      return then(fn, (fn2) => {
        if (isFunction(fn2)) {
          if (beforeFn && beforeFn() === false) {
            return;
          }
          const baseContext = createInvokationContext(currentCtx);
          const context = {
            ...baseContext,
            $qrl$: QRL
          };
          emitUsedSymbol(symbol, context.$element$, start);
          return invoke(context, fn2, ...args);
        }
        throw qError(QError_qrlIsNotFunction);
      });
    };
  };
  const createInvokationContext = (invoke2) => {
    if (invoke2 == null) {
      return newInvokeContext();
    } else if (isArray(invoke2)) {
      return newInvokeContextFromTuple(invoke2);
    } else {
      return invoke2;
    }
  };
  const invokeQRL = async function(...args) {
    const fn = invokeFn();
    const result = await fn(...args);
    return result;
  };
  const resolvedSymbol = refSymbol ?? symbol;
  const hash = getSymbolHash(resolvedSymbol);
  const QRL = invokeQRL;
  const methods = {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash,
    resolve: resolve2,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    $dev$: null
  };
  const qrl = Object.assign(invokeQRL, methods);
  seal(qrl);
  return qrl;
};
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function assertQrl(qrl) {
  if (qDev) {
    if (!isQrl(qrl)) {
      throw new Error("Not a QRL");
    }
  }
}
var emitUsedSymbol = (symbol, element, reqTime) => {
  emitEvent("qsymbol", {
    symbol,
    element,
    reqTime
  });
};
var emitEvent = (eventName, detail) => {
  if (!qTest && !isServer() && typeof document === "object") {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        detail
      })
    );
  }
};
var now = () => {
  if (qTest || isServer()) {
    return 0;
  }
  if (typeof performance === "object") {
    return performance.now();
  }
  return 0;
};

// packages/qwik/src/core/component/component.public.ts
var componentQrl = (componentQrl2) => {
  function QwikComponent(props, key) {
    assertQrl(componentQrl2);
    const hash = qTest ? "sX" : componentQrl2.$hash$.slice(0, 4);
    const finalKey = hash + ":" + (key ? key : "");
    return jsx(
      Virtual,
      {
        [OnRenderProp]: componentQrl2,
        [QSlot]: props[QSlot],
        [_IMMUTABLE]: props[_IMMUTABLE],
        children: props.children,
        props
      },
      finalKey
    );
  }
  QwikComponent[SERIALIZABLE_STATE] = [componentQrl2];
  return QwikComponent;
};
var isQwikComponent = (component) => {
  return typeof component == "function" && component[SERIALIZABLE_STATE] !== void 0;
};

// packages/qwik-city/static/worker-thread.ts
async function workerThread(sys) {
  const ssgOpts = sys.getOptions();
  const pendingPromises = /* @__PURE__ */ new Set();
  const opts = {
    ...ssgOpts,
    render: (await import(pathToFileURL2(ssgOpts.renderModulePath).href)).default,
    qwikCityPlan: (await import(pathToFileURL2(ssgOpts.qwikCityPlanModulePath).href)).default
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
    const request = new Request(url);
    const requestCtx = {
      mode: "static",
      locale: void 0,
      url,
      request,
      env: {
        get(key) {
          return process.env[key];
        }
      },
      getWritableStream: (status, headers, _, _r, requestEv) => {
        result.ok = status >= 200 && status <= 299 && (headers.get("Content-Type") || "").includes("text/html");
        if (!result.ok) {
          return noopWriter;
        }
        const htmlWriter = writeHtmlEnabled ? sys.createWriteStream(htmlFilePath) : null;
        const stream = new WritableStream2({
          write(chunk) {
            if (htmlWriter) {
              htmlWriter.write(Buffer.from(chunk.buffer));
            }
          },
          close() {
            const data = requestEv.sharedMap.get("qData");
            if (writeDataEnabled) {
              if (data) {
                const dataWriter = sys.createWriteStream(dataFilePath);
                dataWriter.write(_serializeData(data));
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
    const promise = requestHandler(requestCtx, opts).then((rsp) => {
      if (rsp != null) {
        return rsp.completion;
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
var noopWriter = /* @__PURE__ */ new WritableStream2({
  write() {
  },
  close() {
  }
});

// packages/qwik-city/static/node/index.ts
async function generate(opts) {
  if (isMainThread) {
    const sys = await createSystem(opts);
    const result = await mainThread(sys);
    return result;
  }
  throw new Error(`generate() cannot be called from a worker thread`);
}
if (!isMainThread && workerData) {
  (async () => {
    patchGlobalThis();
    const sys = await createSystem(workerData);
    await workerThread(sys);
  })();
}
export {
  generate
};
