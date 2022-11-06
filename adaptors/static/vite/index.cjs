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

// packages/qwik-city/adaptors/static/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  staticAdaptor: () => staticAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_node_path = require("path");
var import_node_fs = __toESM(require("fs"), 1);
function staticAdaptor(opts) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let ssrOutputPath = null;
  let qwikCityPlanOutputPath = null;
  async function generateBundles() {
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const serverPackageJsonPath = (0, import_node_path.join)(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await import_node_fs.default.promises.mkdir(serverOutDir, { recursive: true });
    await import_node_fs.default.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    const staticGenerate = await import("../../../static/index.cjs");
    await staticGenerate.generate({
      renderModulePath: ssrOutputPath,
      qwikCityPlanModulePath: qwikCityPlanOutputPath,
      outDir: clientOutDir,
      ...opts
    });
  }
  const plugin = {
    name: "vite-plugin-qwik-city-static-generate",
    enforce: "post",
    apply: "build",
    configResolved({ build, plugins }) {
      var _a;
      qwikVitePlugin = plugins.find((p) => p.name === "vite-plugin-qwik");
      if (!qwikVitePlugin) {
        throw new Error("Missing vite-plugin-qwik");
      }
      serverOutDir = build.outDir;
      if ((build == null ? void 0 : build.ssr) !== true) {
        throw new Error(
          '"build.ssr" must be set to `true` in order to use the Static Generate adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Static Generate adaptor.'
        );
      }
    },
    generateBundle(_, bundles) {
      for (const fileName in bundles) {
        const chunk = bundles[fileName];
        if (chunk.type === "chunk" && chunk.isEntry) {
          if (chunk.name === "entry.ssr") {
            ssrOutputPath = (0, import_node_path.join)(serverOutDir, fileName);
          } else if (chunk.name === "@qwik-city-plan") {
            qwikCityPlanOutputPath = (0, import_node_path.join)(serverOutDir, fileName);
          }
        }
      }
      if (!ssrOutputPath) {
        throw new Error(
          'Unable to fine "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
      if (!qwikCityPlanOutputPath) {
        throw new Error(
          'Unable to fine "@qwik-city-plan" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
    },
    async closeBundle() {
      await generateBundles();
    }
  };
  return plugin;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  staticAdaptor
});
