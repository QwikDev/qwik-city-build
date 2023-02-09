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

// packages/qwik-city/adapters/netlify-edge/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  netifyEdgeAdapter: () => netifyEdgeAdapter,
  netifyEdgeAdaptor: () => netifyEdgeAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = require("path");

// packages/qwik-city/runtime/src/qwik-city-plan.ts
var basePathname = "/";

// packages/qwik-city/adapters/netlify-edge/vite/index.ts
function netifyEdgeAdapter(opts = {}) {
  var _a;
  return (0, import_vite.viteAdapter)({
    name: "netlify-edge",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.netlify.app",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || ".netlify/edge-functions/entry.netlify-edge";
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "webworker",
          noExternal: true
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
        const netlifyEdgeManifest = {
          functions: [
            {
              path: basePathname + "*",
              function: "entry.netlify-edge",
              cache: "manual"
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
var netifyEdgeAdaptor = netifyEdgeAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  netifyEdgeAdapter,
  netifyEdgeAdaptor
});
