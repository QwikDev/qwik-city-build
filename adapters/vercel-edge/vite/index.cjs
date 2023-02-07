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

// packages/qwik-city/adapters/vercel-edge/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  vercelEdgeAdapter: () => vercelEdgeAdapter,
  vercelEdgeAdaptor: () => vercelEdgeAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = require("path");
function vercelEdgeAdapter(opts = {}) {
  var _a;
  return (0, import_vite.viteAdapter)({
    name: "vercel-edge",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.VERCEL_URL) || "https://yoursitename.vercel.app",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || ".vercel/output/functions/_qwik-city.func";
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "node",
          format: "esm",
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
    async generate({ clientOutDir, serverOutDir, basePathname, outputEntries }) {
      const vercelOutputDir = (0, import_vite.getParentDir)(serverOutDir, "output");
      if (opts.outputConfig !== false) {
        const vercelOutputConfig = {
          routes: [
            { handle: "filesystem" },
            {
              src: basePathname + ".*",
              dest: "/_qwik-city"
            }
          ],
          version: 3
        };
        await import_node_fs.default.promises.writeFile(
          (0, import_node_path.join)(vercelOutputDir, "config.json"),
          JSON.stringify(vercelOutputConfig, null, 2)
        );
      }
      const vcConfigPath = (0, import_node_path.join)(serverOutDir, ".vc-config.json");
      let entrypoint = opts.vcConfigEntryPoint;
      if (!entrypoint) {
        if (outputEntries.some((n) => n === "entry.vercel-edge.mjs")) {
          entrypoint = "entry.vercel-edge.mjs";
        } else {
          entrypoint = "entry.vercel-edge.js";
        }
      }
      const vcConfig = {
        runtime: "edge",
        entrypoint,
        envVarsInUse: opts.vcConfigEnvVarsInUse
      };
      await import_node_fs.default.promises.writeFile(vcConfigPath, JSON.stringify(vcConfig, null, 2));
      const staticDir = (0, import_node_path.join)(vercelOutputDir, "static");
      if (import_node_fs.default.existsSync(staticDir)) {
        await import_node_fs.default.promises.rm(staticDir, { recursive: true });
      }
      await import_node_fs.default.promises.rename(clientOutDir, staticDir);
    }
  });
}
var vercelEdgeAdaptor = vercelEdgeAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vercelEdgeAdapter,
  vercelEdgeAdaptor
});
