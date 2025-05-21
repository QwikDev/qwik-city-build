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

// packages/qwik-city/src/adapters/netlify-edge/vite/index.ts
var index_exports = {};
__export(index_exports, {
  netlifyEdgeAdapter: () => netlifyEdgeAdapter
});
module.exports = __toCommonJS(index_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = require("node:path");

// packages/qwik-city/src/runtime/src/qwik-city-plan.ts
var basePathname = "/";

// packages/qwik-city/src/adapters/netlify-edge/vite/index.ts
function netlifyEdgeAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return (0, import_vite.viteAdapter)({
    name: "netlify-edge",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.netlify.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a;
      const outDir = ((_a = config.build) == null ? void 0 : _a.outDir) || ".netlify/edge-functions/entry.netlify-edge";
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
          outDir,
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
    async generate({ serverOutDir }) {
      if (opts.functionRoutes !== false) {
        const excludedPath = [];
        if (typeof opts.excludedPath === "string") {
          excludedPath.push(opts.excludedPath);
        } else if (Array.isArray(opts.excludedPath)) {
          excludedPath.push(...opts.excludedPath);
        } else {
          excludedPath.push(
            "/build/*",
            "/favicon.ico",
            "/robots.txt",
            "/mainifest.json",
            "/~partytown/*",
            "/service-worker.js",
            "/sitemap.xml"
          );
        }
        const netlifyEdgeManifest = {
          functions: [
            {
              path: basePathname + "*",
              function: "entry.netlify-edge",
              cache: "manual",
              excludedPath
            }
          ],
          version: 1
        };
        const jsPath = (0, import_node_path.join)(serverOutDir, "entry.netlify-edge.js");
        const mjsPath = (0, import_node_path.join)(serverOutDir, "entry.netlify-edge.mjs");
        if ((0, import_node_fs.existsSync)(mjsPath)) {
          await import_node_fs.default.promises.writeFile(
            jsPath,
            [
              `import entry_netlifyEdge from './entry.netlify-edge.mjs';`,
              `export default entry_netlifyEdge;`
            ].join("\n")
          );
        }
        const netlifyEdgeFnsDir = (0, import_vite.getParentDir)(serverOutDir, "edge-functions");
        await import_node_fs.default.promises.writeFile(
          (0, import_node_path.join)(netlifyEdgeFnsDir, "manifest.json"),
          JSON.stringify(netlifyEdgeManifest, null, 2)
        );
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  netlifyEdgeAdapter
});
