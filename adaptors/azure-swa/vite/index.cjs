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

// packages/qwik-city/adaptors/azure-swa/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  azureSwaAdaptor: () => azureSwaAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_node_path = require("path");
var import_node_fs = __toESM(require("fs"), 1);
function azureSwaAdaptor(opts = {}) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  let azureSwaModulePath = null;
  async function generateBundles() {
    var _a;
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const serverPackageJsonPath = (0, import_node_path.join)(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await import_node_fs.default.promises.mkdir(serverOutDir, { recursive: true });
    await import_node_fs.default.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    const functionJsonPath = (0, import_node_path.join)(serverOutDir, "function.json");
    await import_node_fs.default.promises.writeFile(
      functionJsonPath,
      `{ 
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "head", "post", "put", "delete", "connect", "options", "trace", "patch"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "response"
    }
  ], 
  "scriptFile": "${azureSwaModulePath}"
}`
    );
    if (opts.staticGenerate) {
      const staticGenerate = await import("../../../static/index.cjs");
      let generateOpts = {
        outDir: clientOutDir,
        origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.region.2.azurestaticapps.net",
        renderModulePath,
        qwikCityPlanModulePath
      };
      if (typeof opts.staticGenerate === "object") {
        generateOpts = {
          ...generateOpts,
          ...opts.staticGenerate
        };
      }
      await staticGenerate.generate(generateOpts);
    }
  }
  const plugin = {
    name: "vite-plugin-qwik-city-azure-swa",
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
          '"build.ssr" must be set to `true` in order to use the Azure Static Web Apps adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Azure Static Web Apps adaptor.'
        );
      }
    },
    generateBundle(_, bundles) {
      for (const fileName in bundles) {
        const chunk = bundles[fileName];
        if (chunk.type === "chunk" && chunk.isEntry) {
          if (chunk.name === "entry.ssr") {
            renderModulePath = (0, import_node_path.join)(serverOutDir, fileName);
          } else if (chunk.name === "@qwik-city-plan") {
            qwikCityPlanModulePath = (0, import_node_path.join)(serverOutDir, fileName);
          } else if (chunk.name === "entry.azure-swa") {
            azureSwaModulePath = fileName;
          }
        }
      }
      if (!renderModulePath) {
        throw new Error(
          'Unable to fine "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
      if (!qwikCityPlanModulePath) {
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
  azureSwaAdaptor
});
