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

// packages/qwik-city/src/adapters/azure-swa/vite/index.ts
var index_exports = {};
__export(index_exports, {
  azureSwaAdapter: () => azureSwaAdapter
});
module.exports = __toCommonJS(index_exports);
var import_vite = require("../../shared/vite/index.cjs");
var import_node_path = require("node:path");
var import_node_fs = __toESM(require("node:fs"), 1);
function azureSwaAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return (0, import_vite.viteAdapter)({
    name: "azure-swa",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.region.2.azurestaticapps.net",
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    async generate({ outputEntries, serverOutDir, clientPublicOutDir }) {
      const serverPackageJsonPath = (0, import_node_path.join)(serverOutDir, "package.json");
      const serverPackageJsonCode = `{"type":"module"}`;
      await import_node_fs.default.promises.mkdir(serverOutDir, { recursive: true });
      await import_node_fs.default.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
      const azureSwaModulePath = outputEntries.find(
        (entryName) => entryName.indexOf("entry.azure-swa") === 0
      );
      const funcJsonPath = (0, import_node_path.join)(serverOutDir, "function.json");
      const funcJson = JSON.stringify(
        {
          bindings: [
            {
              authLevel: "anonymous",
              type: "httpTrigger",
              direction: "in",
              name: "req",
              methods: [
                "get",
                "head",
                "post",
                "put",
                "delete",
                "connect",
                "options",
                "trace",
                "patch"
              ]
            },
            {
              type: "http",
              direction: "out",
              name: "$return"
            }
          ],
          scriptFile: azureSwaModulePath
        },
        null,
        2
      );
      await import_node_fs.default.promises.writeFile(funcJsonPath, funcJson);
      if (!import_node_fs.default.existsSync((0, import_node_path.join)(clientPublicOutDir, "index.html"))) {
        await import_node_fs.default.promises.writeFile((0, import_node_path.join)(clientPublicOutDir, "index.html"), "");
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  azureSwaAdapter
});
