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

// packages/qwik-city/adapters/vercel-serverless/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  vercelServerlessAdapter: () => vercelServerlessAdapter
});
module.exports = __toCommonJS(vite_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = require("path");
function vercelServerlessAdapter(opts = {}) {
  var _a;
  return (0, import_vite.viteAdapter)({
    name: "vercel-serverless",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.VERCEL_URL) || "https://yoursitename.vercel.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || (0, import_node_path.join)(".vercel", "output", "functions", "_qwik-city.func");
      return {
        build: {
          ssr: true,
          outDir
        },
        publicDir: false
      };
    },
    async generate({ clientPublicOutDir, serverOutDir, basePathname, outputEntries }) {
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
      let entrypoint = opts.vcConfigEntryPoint;
      if (!entrypoint) {
        if (outputEntries.some((n) => n === "entry.vercel-serverless.mjs")) {
          entrypoint = "entry.vercel-serverless.mjs";
        } else {
          entrypoint = "entry.vercel-serverless.js";
        }
      }
      const vcConfigPath = (0, import_node_path.join)(serverOutDir, ".vc-config.json");
      const vcConfig = {
        launcherType: "Nodejs",
        runtime: opts.runtime || "nodejs18.x",
        handler: entrypoint,
        memory: opts.memory,
        maxDuration: opts.maxDuration,
        environment: opts.environment,
        regions: opts.regions,
        shouldAddSourcemapSupport: true
      };
      await import_node_fs.default.promises.writeFile(vcConfigPath, JSON.stringify(vcConfig, null, 2));
      let vercelStaticDir = (0, import_node_path.join)(vercelOutputDir, "static");
      const basePathnameParts = basePathname.split("/").filter((p) => p.length > 0);
      if (basePathnameParts.length > 0) {
        vercelStaticDir = (0, import_node_path.join)(vercelStaticDir, ...basePathnameParts);
      }
      await import_node_fs.default.promises.rm(vercelStaticDir, { recursive: true, force: true });
      await import_node_fs.default.promises.mkdir((0, import_node_path.dirname)(vercelStaticDir), { recursive: true });
      await import_node_fs.default.promises.rename(clientPublicOutDir, vercelStaticDir);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vercelServerlessAdapter
});
