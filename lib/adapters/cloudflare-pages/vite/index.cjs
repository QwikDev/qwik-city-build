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

// packages/qwik-city/src/adapters/cloudflare-pages/vite/index.ts
var index_exports = {};
__export(index_exports, {
  cloudflarePagesAdapter: () => cloudflarePagesAdapter
});
module.exports = __toCommonJS(index_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = require("node:path");

// packages/qwik-city/src/utils/fs.ts
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

// packages/qwik-city/src/adapters/cloudflare-pages/vite/index.ts
function cloudflarePagesAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return (0, import_vite.viteAdapter)({
    name: "cloudflare-pages",
    origin: (env == null ? void 0 : env.CF_PAGES_URL) ?? (env == null ? void 0 : env.ORIGIN) ?? "https://your.cloudflare.pages.dev",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config() {
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "webworker",
          noExternal: true,
          external: ["node:async_hooks"]
        },
        build: {
          ssr: true,
          rollupOptions: {
            output: {
              format: "es",
              hoistTransitiveImports: false
            }
          }
        },
        publicDir: false
      };
    },
    async generate({ clientOutDir, serverOutDir, basePathname, assetsDir }) {
      const routesJsonPath = (0, import_node_path.join)(clientOutDir, "_routes.json");
      const hasRoutesJson = import_node_fs.default.existsSync(routesJsonPath);
      if (!hasRoutesJson && opts.functionRoutes !== false) {
        let pathName = assetsDir ? (0, import_node_path.join)(basePathname, assetsDir) : basePathname;
        if (!pathName.endsWith("/")) {
          pathName += "/";
        }
        const routesJson = {
          version: 1,
          include: [basePathname + "*"],
          exclude: [pathName + "build/*", pathName + "assets/*"]
        };
        await import_node_fs.default.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
      }
      const workerJsPath = (0, import_node_path.join)(clientOutDir, "_worker.js");
      const hasWorkerJs = import_node_fs.default.existsSync(workerJsPath);
      if (!hasWorkerJs) {
        const importPath = (0, import_node_path.relative)(clientOutDir, (0, import_node_path.join)(serverOutDir, "entry.cloudflare-pages"));
        await import_node_fs.default.promises.writeFile(
          workerJsPath,
          `import { fetch } from "${normalizePathSlash(importPath)}"; export default { fetch };`
        );
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cloudflarePagesAdapter
});
