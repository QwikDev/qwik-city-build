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

// packages/qwik-city/adaptors/cloudflare-pages/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  cloudflarePagesAdaptor: () => cloudflarePagesAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_node_path = require("path");
var import_node_fs = __toESM(require("fs"), 1);
function cloudflarePagesAdaptor(opts = {}) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  async function generateBundles(ctx) {
    var _a;
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const files = await import_node_fs.default.promises.readdir(clientOutDir, { withFileTypes: true });
    const exclude = files.map((file) => {
      if (file.name.startsWith(".")) {
        return null;
      }
      if (file.isDirectory()) {
        return `/${file.name}/*`;
      } else if (file.isFile()) {
        return `/${file.name}`;
      }
      return null;
    }).filter(isNotNullable);
    const include = ["/*"];
    const serverPackageJsonPath = (0, import_node_path.join)(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await import_node_fs.default.promises.mkdir(serverOutDir, { recursive: true });
    await import_node_fs.default.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    if (opts.staticGenerate) {
      const staticGenerate = await import("../../../static/index.cjs");
      let generateOpts = {
        outDir: clientOutDir,
        origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.CF_PAGES_URL) || "https://your.cloudflare.pages.dev",
        renderModulePath,
        qwikCityPlanModulePath
      };
      if (typeof opts.staticGenerate === "object") {
        generateOpts = {
          ...generateOpts,
          ...opts.staticGenerate
        };
      }
      const results = await staticGenerate.generate(generateOpts);
      results.staticPaths.sort();
      results.staticPaths.sort((a, b) => {
        return a.length - b.length;
      });
      if (results.errors > 0) {
        ctx.error("Error while runnning SSG. At least one path failed to render.");
      }
      exclude.push(...results.staticPaths);
    }
    const hasRoutesJson = exclude.includes("/_routes.json");
    if (!hasRoutesJson) {
      const routesJsonPath = (0, import_node_path.join)(clientOutDir, "_routes.json");
      const total = include.length + exclude.length;
      const maxRules = 100;
      if (total > maxRules) {
        const toRemove = total - maxRules;
        const removed = exclude.splice(-toRemove, toRemove);
        ctx.warn(
          `Cloudflare pages does not support more than 100 static rules. Qwik SSG generated ${total}, the following rules were excluded: ${JSON.stringify(
            removed,
            void 0,
            2
          )}`
        );
        ctx.warn('Create an configure a "_routes.json" manually in the public.');
      }
      const routesJson = {
        version: 1,
        include,
        exclude
      };
      await import_node_fs.default.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
    }
  }
  const plugin = {
    name: "vite-plugin-qwik-city-cloudflare-pages",
    enforce: "post",
    apply: "build",
    config() {
      return {
        build: {
          rollupOptions: {
            output: {
              hoistTransitiveImports: false
            }
          }
        },
        ssr: {
          target: "webworker"
        }
      };
    },
    configResolved({ build, plugins }) {
      var _a;
      qwikVitePlugin = plugins.find((p) => p.name === "vite-plugin-qwik");
      if (!qwikVitePlugin) {
        throw new Error("Missing vite-plugin-qwik");
      }
      serverOutDir = build.outDir;
      if ((build == null ? void 0 : build.ssr) !== true) {
        throw new Error(
          '"build.ssr" must be set to `true` in order to use the Cloudflare Pages adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Cloudflare Pages adaptor.'
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
      await generateBundles(this);
    }
  };
  return plugin;
}
var isNotNullable = (v) => {
  return v != null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cloudflarePagesAdaptor
});
