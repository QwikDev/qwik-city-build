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

// packages/qwik-city/adapters/express/vite/index.ts
var vite_exports = {};
__export(vite_exports, {
  expressAdapter: () => expressAdapter,
  expressAdaptor: () => expressAdaptor
});
module.exports = __toCommonJS(vite_exports);
var import_vite = require("../../shared/vite/index.cjs");
function expressAdapter(opts = {}) {
  var _a;
  return (0, import_vite.viteAdapter)({
    name: "express",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.qwik.builder.io",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        ssr: {
          target: "node"
        },
        build: {
          ssr: true
        },
        publicDir: false
      };
    }
  });
}
var expressAdaptor = expressAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  expressAdapter,
  expressAdaptor
});
