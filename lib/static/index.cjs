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

// packages/qwik-city/src/static/index.ts
var index_exports = {};
__export(index_exports, {
  generate: () => generate
});
module.exports = __toCommonJS(index_exports);
async function generate(opts) {
  const ssgPlatform = await getEntryModule();
  const result = await ssgPlatform.generate(opts);
  return result;
}
function getEntryModulePath() {
  if (isDeno()) {
    return "./deno.mjs";
  }
  if (isNode() || isBun()) {
    if (isCjs()) {
      return "./node.cjs";
    }
    return "./node.mjs";
  }
  throw new Error(`Unsupported platform`);
}
function getEntryModule() {
  const entryModule = getEntryModulePath();
  if (isCjs()) {
    return require(entryModule);
  }
  return import(entryModule);
}
function isDeno() {
  return typeof Deno !== "undefined";
}
function isBun() {
  return typeof Bun !== "undefined";
}
function isNode() {
  var _a;
  return !isBun() && !isDeno() && typeof process !== "undefined" && !!((_a = process.versions) == null ? void 0 : _a.node);
}
function isCjs() {
  const req = "require";
  return isNode() && typeof globalThis[req] === "function";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generate
});
