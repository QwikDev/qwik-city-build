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

// packages/qwik-city/middleware/node/index.ts
var node_exports = {};
__export(node_exports, {
  createQwikCity: () => createQwikCity,
  qwikCity: () => qwikCity
});
module.exports = __toCommonJS(node_exports);
var import_qwik_city_not_found_paths = require("@qwik-city-not-found-paths");
var import_qwik_city_plan = __toESM(require("@qwik-city-plan"), 1);
var import_qwik_city_static_paths = require("@qwik-city-static-paths");
var import_node_fs = require("fs");
var import_node_path = require("path");
var import_node_url = require("url");
var import_request_handler = require("../request-handler/index.cjs");

// packages/qwik-city/middleware/node/http.ts
function getUrl(req) {
  const protocol = req.socket.encrypted || req.connection.encrypted ? "https" : "http";
  return new URL(req.url || "/", `${protocol}://${req.headers.host}`);
}
async function fromNodeHttp(url, req, res, mode) {
  const requestHeaders = new Headers();
  const nodeRequestHeaders = req.headers;
  for (const key in nodeRequestHeaders) {
    const value = nodeRequestHeaders[key];
    if (typeof value === "string") {
      requestHeaders.set(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        requestHeaders.append(key, v);
      }
    }
  }
  const getRequestBody = async function* () {
    for await (const chunk of req) {
      yield chunk;
    }
  };
  const body = req.method === "HEAD" || req.method === "GET" ? void 0 : getRequestBody();
  const serverRequestEv = {
    mode,
    url,
    request: new Request(url.href, {
      method: req.method,
      headers: requestHeaders,
      body,
      duplex: "half"
    }),
    getWritableStream: (status, headers, cookies) => {
      res.statusCode = status;
      headers.forEach((value, key) => res.setHeader(key, value));
      const cookieHeaders = cookies.headers();
      if (cookieHeaders.length > 0) {
        res.setHeader("Set-Cookie", cookieHeaders);
      }
      const stream = new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          return new Promise((resolve) => res.end(resolve));
        }
      });
      return stream;
    },
    platform: {
      ssr: true,
      node: process.versions.node
    },
    locale: void 0
  };
  return serverRequestEv;
}

// packages/qwik-city/middleware/node/node-fetch.ts
var import_web = require("stream/web");
var import_undici = require("undici");
var import_crypto = __toESM(require("crypto"), 1);
function patchGlobalThis() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    globalThis.fetch = import_undici.fetch;
    globalThis.Headers = import_undici.Headers;
    globalThis.Request = import_undici.Request;
    globalThis.Response = import_undici.Response;
    globalThis.FormData = import_undici.FormData;
  }
  if (typeof globalThis.TextEncoderStream === "undefined") {
    globalThis.TextEncoderStream = import_web.TextEncoderStream;
    globalThis.TextDecoderStream = import_web.TextDecoderStream;
  }
  if (typeof globalThis.WritableStream === "undefined") {
    globalThis.WritableStream = import_web.WritableStream;
    globalThis.ReadableStream = import_web.ReadableStream;
  }
  if (typeof globalThis.crypto === "undefined") {
    globalThis.crypto = import_crypto.default.webcrypto;
  }
}

// packages/qwik-city/middleware/node/index.ts
var import_meta = {};
function createQwikCity(opts) {
  var _a;
  patchGlobalThis();
  const staticFolder = ((_a = opts.static) == null ? void 0 : _a.root) ?? (0, import_node_path.join)((0, import_node_url.fileURLToPath)(import_meta.url), "..", "..", "dist");
  const router = async (req, res, next) => {
    try {
      const serverRequestEv = await fromNodeHttp(getUrl(req), req, res, "server");
      const handled = await (0, import_request_handler.requestHandler)(serverRequestEv, opts);
      if (handled) {
        const requestEv = await handled.completion;
        if (requestEv.headersSent) {
          return;
        }
      }
      next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  const notFound = async (req, res, next) => {
    try {
      const url = getUrl(req);
      const notFoundHtml = (0, import_qwik_city_not_found_paths.getNotFound)(url.pathname);
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "X-Not-Found": url.pathname
      });
      res.end(notFoundHtml);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  const staticFile = async (req, res, next) => {
    var _a2;
    try {
      const url = getUrl(req);
      if ((0, import_qwik_city_static_paths.isStaticPath)(req.method || "GET", url)) {
        const target = (0, import_node_path.join)(staticFolder, url.pathname);
        const stream = (0, import_node_fs.createReadStream)(target);
        if ((_a2 = opts.static) == null ? void 0 : _a2.cacheControl) {
          res.setHeader("Cache-Control", opts.static.cacheControl);
        }
        stream.on("error", next);
        stream.pipe(res);
        return;
      }
      return next();
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  return {
    router,
    notFound,
    staticFile
  };
}
function qwikCity(render, opts) {
  return createQwikCity({ render, qwikCityPlan: import_qwik_city_plan.default, ...opts });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQwikCity,
  qwikCity
});
