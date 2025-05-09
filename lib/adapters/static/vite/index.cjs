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

// packages/qwik-city/src/adapters/static/vite/index.ts
var index_exports = {};
__export(index_exports, {
  staticAdapter: () => staticAdapter
});
module.exports = __toCommonJS(index_exports);

// packages/qwik-city/src/adapters/shared/vite/index.ts
var import_node_fs2 = __toESM(require("node:fs"), 1);
var import_node_path2 = require("node:path");

// packages/qwik-city/src/adapters/shared/vite/post-build.ts
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = require("node:path");
var import_request_handler = require("@builder.io/qwik-city/middleware/request-handler");
async function postBuild(clientOutDir, pathName, userStaticPaths, format, cleanStatic) {
  if (pathName && !pathName.endsWith("/")) {
    pathName += "/";
  }
  const ignorePathnames = /* @__PURE__ */ new Set([pathName + "build/", pathName + "assets/"]);
  const staticPaths = new Set(userStaticPaths.map(normalizeTrailingSlash));
  const notFounds = [];
  const loadItem = async (fsDir, fsName, pathname) => {
    pathname = normalizeTrailingSlash(pathname);
    if (ignorePathnames.has(pathname)) {
      return;
    }
    const fsPath = (0, import_node_path.join)(fsDir, fsName);
    if (fsName === "index.html" || fsName === "q-data.json") {
      if (!staticPaths.has(pathname) && cleanStatic) {
        await import_node_fs.default.promises.unlink(fsPath);
      }
      return;
    }
    if (fsName === "404.html") {
      const notFoundHtml = await import_node_fs.default.promises.readFile(fsPath, "utf-8");
      notFounds.push([pathname, notFoundHtml]);
      return;
    }
    const stat = await import_node_fs.default.promises.stat(fsPath);
    if (stat.isDirectory()) {
      await loadDir(fsPath, pathname + fsName + "/");
    } else if (stat.isFile()) {
      staticPaths.add(pathname + fsName);
    }
  };
  const loadDir = async (fsDir, pathname) => {
    const itemNames = await import_node_fs.default.promises.readdir(fsDir);
    await Promise.all(itemNames.map((i) => loadItem(fsDir, i, pathname)));
  };
  if (import_node_fs.default.existsSync(clientOutDir)) {
    await loadDir(clientOutDir, pathName);
  }
  const notFoundPathsCode = createNotFoundPathsModule(pathName, notFounds, format);
  const staticPathsCode = createStaticPathsModule(pathName, staticPaths, format);
  return {
    notFoundPathsCode,
    staticPathsCode
  };
}
function normalizeTrailingSlash(pathname) {
  if (!pathname.endsWith("/")) {
    return pathname + "/";
  }
  return pathname;
}
function createNotFoundPathsModule(basePathname, notFounds, format) {
  notFounds.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1;
    }
    if (a[0].length < b[0].length) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
  if (!notFounds.some((r) => r[0] === basePathname)) {
    const html = (0, import_request_handler.getErrorHtml)(404, "Resource Not Found");
    notFounds.push([basePathname, html]);
  }
  const c = [];
  c.push(`const notFounds = ${JSON.stringify(notFounds, null, 2)};`);
  c.push(`function getNotFound(p) {`);
  c.push(`  for (const r of notFounds) {`);
  c.push(`    if (p.startsWith(r[0])) {`);
  c.push(`      return r[1];`);
  c.push(`    }`);
  c.push(`  }`);
  c.push(`  return "Resource Not Found";`);
  c.push(`}`);
  if (format === "cjs") {
    c.push("exports.getNotFound = getNotFound;");
  } else {
    c.push("export { getNotFound };");
  }
  return c.join("\n");
}
function createStaticPathsModule(basePathname, staticPaths, format) {
  const assetsPath = basePathname + "assets/";
  const baseBuildPath = basePathname + "build/";
  const c = [];
  c.push(
    `const staticPaths = new Set(${JSON.stringify(
      Array.from(new Set(staticPaths)).sort()
    )});`
  );
  c.push(`function isStaticPath(method, url) {`);
  c.push(`  if (method.toUpperCase() !== 'GET') {`);
  c.push(`    return false;`);
  c.push(`  }`);
  c.push(`  const p = url.pathname;`);
  c.push(`  if (p.startsWith(${JSON.stringify(baseBuildPath)})) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (p.startsWith(${JSON.stringify(assetsPath)})) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (staticPaths.has(p)) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (p.endsWith('/q-data.json')) {`);
  c.push(`    const pWithoutQdata = p.replace(/\\/q-data.json$/, '');`);
  c.push(`    if (staticPaths.has(pWithoutQdata + '/')) {`);
  c.push(`      return true;`);
  c.push(`    }`);
  c.push(`    if (staticPaths.has(pWithoutQdata)) {`);
  c.push(`      return true;`);
  c.push(`    }`);
  c.push(`  }`);
  c.push(`  return false;`);
  c.push(`}`);
  if (format === "cjs") {
    c.push("exports.isStaticPath = isStaticPath;");
  } else {
    c.push("export { isStaticPath };");
  }
  return c.join("\n");
}

// packages/qwik-city/src/adapters/shared/vite/index.ts
function viteAdapter(opts) {
  let qwikCityPlugin = null;
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  let isSsrBuild = false;
  let format = "esm";
  const outputEntries = [];
  const plugin = {
    name: `vite-plugin-qwik-city-${opts.name}`,
    enforce: "post",
    apply: "build",
    config(config) {
      if (typeof opts.config === "function") {
        config = opts.config(config);
      }
      config.define = {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
        ...config.define
      };
      return config;
    },
    configResolved(config) {
      var _a, _b, _c, _d;
      isSsrBuild = !!config.build.ssr;
      if (isSsrBuild) {
        qwikCityPlugin = config.plugins.find(
          (p) => p.name === "vite-plugin-qwik-city"
        );
        if (!qwikCityPlugin) {
          throw new Error("Missing vite-plugin-qwik-city");
        }
        qwikVitePlugin = config.plugins.find(
          (p) => p.name === "vite-plugin-qwik"
        );
        if (!qwikVitePlugin) {
          throw new Error("Missing vite-plugin-qwik");
        }
        serverOutDir = config.build.outDir;
        if (((_a = config.build) == null ? void 0 : _a.ssr) !== true) {
          throw new Error(
            `"build.ssr" must be set to "true" in order to use the "${opts.name}" adapter.`
          );
        }
        if (!((_c = (_b = config.build) == null ? void 0 : _b.rollupOptions) == null ? void 0 : _c.input)) {
          throw new Error(
            `"build.rollupOptions.input" must be set in order to use the "${opts.name}" adapter.`
          );
        }
        if (((_d = config.ssr) == null ? void 0 : _d.format) === "cjs") {
          format = "cjs";
        }
      }
    },
    generateBundle(_, bundles) {
      if (isSsrBuild) {
        outputEntries.length = 0;
        for (const fileName in bundles) {
          const chunk = bundles[fileName];
          if (chunk.type === "chunk" && chunk.isEntry) {
            outputEntries.push(fileName);
            if (chunk.name === "entry.ssr") {
              renderModulePath = (0, import_node_path2.join)(serverOutDir, fileName);
            } else if (chunk.name === "@qwik-city-plan") {
              qwikCityPlanModulePath = (0, import_node_path2.join)(serverOutDir, fileName);
            }
          }
        }
        if (!renderModulePath) {
          throw new Error(
            'Unable to find "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
          );
        }
        if (!qwikCityPlanModulePath) {
          throw new Error(
            'Unable to find "@qwik-city-plan" entry point. Did you forget to add it to "build.rollupOptions.input"?'
          );
        }
      }
    },
    closeBundle: {
      sequential: true,
      async handler() {
        var _a;
        if (isSsrBuild && opts.ssg !== null && serverOutDir && (qwikCityPlugin == null ? void 0 : qwikCityPlugin.api) && (qwikVitePlugin == null ? void 0 : qwikVitePlugin.api)) {
          const staticPaths = opts.staticPaths || [];
          const routes = qwikCityPlugin.api.getRoutes();
          const basePathname = qwikCityPlugin.api.getBasePathname();
          const clientOutDir = qwikVitePlugin.api.getClientOutDir();
          const clientPublicOutDir = qwikVitePlugin.api.getClientPublicOutDir();
          const assetsDir = qwikVitePlugin.api.getAssetsDir();
          const rootDir = qwikVitePlugin.api.getRootDir() ?? void 0;
          if (renderModulePath && qwikCityPlanModulePath && clientOutDir && clientPublicOutDir) {
            let ssgOrigin = ((_a = opts.ssg) == null ? void 0 : _a.origin) ?? opts.origin;
            if (!ssgOrigin) {
              ssgOrigin = `https://yoursite.qwik.dev`;
            }
            if (ssgOrigin.length > 0 && !/:\/\//.test(ssgOrigin)) {
              ssgOrigin = `https://${ssgOrigin}`;
            }
            if (ssgOrigin.startsWith("//")) {
              ssgOrigin = `https:${ssgOrigin}`;
            }
            try {
              ssgOrigin = new URL(ssgOrigin).origin;
            } catch (e) {
              this.warn(
                `Invalid "origin" option: "${ssgOrigin}". Using default origin: "https://yoursite.qwik.dev"`
              );
              ssgOrigin = `https://yoursite.qwik.dev`;
            }
            const staticGenerate = await import("../../../static/index.cjs");
            const generateOpts = {
              maxWorkers: opts.maxWorkers,
              basePathname,
              outDir: clientPublicOutDir,
              rootDir,
              ...opts.ssg,
              origin: ssgOrigin,
              renderModulePath,
              qwikCityPlanModulePath
            };
            const staticGenerateResult = await staticGenerate.generate(generateOpts);
            if (staticGenerateResult.errors > 0) {
              const err = new Error(
                `Error while running SSG from "${opts.name}" adapter. At least one path failed to render.`
              );
              err.stack = void 0;
              this.error(err);
            }
            staticPaths.push(...staticGenerateResult.staticPaths);
            const { staticPathsCode, notFoundPathsCode } = await postBuild(
              clientPublicOutDir,
              assetsDir ? (0, import_node_path2.join)(basePathname, assetsDir) : basePathname,
              staticPaths,
              format,
              !!opts.cleanStaticGenerated
            );
            await Promise.all([
              import_node_fs2.default.promises.writeFile((0, import_node_path2.join)(serverOutDir, RESOLVED_STATIC_PATHS_ID), staticPathsCode),
              import_node_fs2.default.promises.writeFile(
                (0, import_node_path2.join)(serverOutDir, RESOLVED_NOT_FOUND_PATHS_ID),
                notFoundPathsCode
              )
            ]);
            if (typeof opts.generate === "function") {
              await opts.generate({
                outputEntries,
                serverOutDir,
                clientOutDir,
                clientPublicOutDir,
                basePathname,
                routes,
                assetsDir,
                warn: (message) => this.warn(message),
                error: (message) => this.error(message)
              });
            }
            this.warn(
              `
==============================================
Note: Make sure that you are serving the built files with proper cache headers.
See https://qwik.dev/docs/deployments/#cache-headers for more information.
==============================================`
            );
          }
        }
      }
    }
  };
  return plugin;
}
var STATIC_PATHS_ID = "@qwik-city-static-paths";
var RESOLVED_STATIC_PATHS_ID = `${STATIC_PATHS_ID}.js`;
var NOT_FOUND_PATHS_ID = "@qwik-city-not-found-paths";
var RESOLVED_NOT_FOUND_PATHS_ID = `${NOT_FOUND_PATHS_ID}.js`;

// packages/qwik-city/src/adapters/static/vite/index.ts
function staticAdapter(opts) {
  return viteAdapter({
    name: "static-generate",
    origin: opts.origin,
    ssg: {
      include: ["/*"],
      ...opts
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  staticAdapter
});
