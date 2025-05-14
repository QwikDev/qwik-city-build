"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik-city/src/adapters/cloud-run/vite/index.ts
var index_exports = {};
__export(index_exports, {
  cloudRunAdapter: () => cloudRunAdapter
});
module.exports = __toCommonJS(index_exports);
var import_vite = require("../../shared/vite/index.cjs");
function cloudRunAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return (0, import_vite.viteAdapter)({
    name: "cloud-run",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://your-app-name.run.app",
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        build: {
          ssr: true
        },
        publicDir: false
      };
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cloudRunAdapter
});
