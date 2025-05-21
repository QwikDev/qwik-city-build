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

// packages/qwik-city/src/middleware/node/index.ts
var index_exports = {};
__export(index_exports, {
  createQwikCity: () => createQwikCity
});
module.exports = __toCommonJS(index_exports);
var import_request_handler = require("../request-handler/index.cjs");
var import_server = require("@builder.io/qwik/server");
var import_qwik_city_not_found_paths = require("@qwik-city-not-found-paths");
var import_qwik_city_static_paths = require("@qwik-city-static-paths");
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var import_node_url = require("node:url");

// packages/qwik-city/src/middleware/node/http.ts
var import_node_http2 = require("node:http2");
function computeOrigin(req, opts) {
  var _a;
  return ((_a = opts == null ? void 0 : opts.getOrigin) == null ? void 0 : _a.call(opts, req)) ?? (opts == null ? void 0 : opts.origin) ?? process.env.ORIGIN ?? fallbackOrigin(req);
}
function fallbackOrigin(req) {
  const { PROTOCOL_HEADER, HOST_HEADER } = process.env;
  const headers = req.headers;
  const protocol = PROTOCOL_HEADER && headers[PROTOCOL_HEADER] || (req.socket.encrypted || req.connection.encrypted ? "https" : "http");
  const hostHeader = HOST_HEADER ?? (req instanceof import_node_http2.Http2ServerRequest ? ":authority" : "host");
  const host = headers[hostHeader];
  return `${protocol}://${host}`;
}
function getUrl(req, origin) {
  return normalizeUrl(req.originalUrl || req.url || "/", origin);
}
function isIgnoredError(message = "") {
  const ignoredErrors = ["The stream has been destroyed", "write after end"];
  return ignoredErrors.some((ignored) => message.includes(ignored));
}
var invalidHeadersPattern = /^:(method|scheme|authority|path)$/i;
function normalizeUrl(url, base) {
  const DOUBLE_SLASH_REG = /\/\/|\\\\/g;
  return new URL(url.replace(DOUBLE_SLASH_REG, "/"), base);
}
async function fromNodeHttp(url, req, res, mode, getClientConn) {
  const requestHeaders = new Headers();
  const nodeRequestHeaders = req.headers;
  try {
    for (const [key, value] of Object.entries(nodeRequestHeaders)) {
      if (invalidHeadersPattern.test(key)) {
        continue;
      }
      if (typeof value === "string") {
        requestHeaders.set(key, value);
      } else if (Array.isArray(value)) {
        for (const v of value) {
          requestHeaders.append(key, v);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  const getRequestBody = async function* () {
    for await (const chunk of req) {
      yield chunk;
    }
  };
  const body = req.method === "HEAD" || req.method === "GET" ? void 0 : getRequestBody();
  const controller = new AbortController();
  const options = {
    method: req.method,
    headers: requestHeaders,
    body,
    signal: controller.signal,
    duplex: "half"
  };
  res.on("close", () => {
    controller.abort();
  });
  const serverRequestEv = {
    mode,
    url,
    request: new Request(url.href, options),
    env: {
      get(key) {
        return process.env[key];
      }
    },
    getWritableStream: (status, headers, cookies) => {
      res.statusCode = status;
      try {
        for (const [key, value] of headers) {
          if (invalidHeadersPattern.test(key)) {
            continue;
          }
          res.setHeader(key, value);
        }
        const cookieHeaders = cookies.headers();
        if (cookieHeaders.length > 0) {
          res.setHeader("Set-Cookie", cookieHeaders);
        }
      } catch (err) {
        console.error(err);
      }
      return new WritableStream({
        write(chunk) {
          if (res.closed || res.destroyed) {
            return;
          }
          res.write(chunk, (error) => {
            if (error && !isIgnoredError(error.message)) {
              console.error(error);
            }
          });
        },
        close() {
          res.end();
        }
      });
    },
    getClientConn: () => {
      return getClientConn ? getClientConn(req) : {
        ip: req.socket.remoteAddress
      };
    },
    platform: {
      ssr: true,
      incomingMessage: req,
      node: process.versions.node
      // Weirdly needed to make typecheck of insights happy
    },
    locale: void 0
  };
  return serverRequestEv;
}

// packages/qwik-city/src/middleware/request-handler/mime-types.ts
var MIME_TYPES = {
  "3gp": "video/3gpp",
  "3gpp": "video/3gpp",
  asf: "video/x-ms-asf",
  asx: "video/x-ms-asf",
  avi: "video/x-msvideo",
  avif: "image/avif",
  bmp: "image/x-ms-bmp",
  css: "text/css",
  flv: "video/x-flv",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jng: "image/x-jng",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "application/javascript",
  json: "application/json",
  kar: "audio/midi",
  m4a: "audio/x-m4a",
  m4v: "video/x-m4v",
  mid: "audio/midi",
  midi: "audio/midi",
  mng: "video/x-mng",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mpg: "video/mpeg",
  ogg: "audio/ogg",
  pdf: "application/pdf",
  png: "image/png",
  rar: "application/x-rar-compressed",
  shtml: "text/html",
  svg: "image/svg+xml",
  svgz: "image/svg+xml",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  txt: "text/plain",
  wbmp: "image/vnd.wap.wbmp",
  webm: "video/webm",
  webp: "image/webp",
  wmv: "video/x-ms-wmv",
  woff: "font/woff",
  woff2: "font/woff2",
  xml: "text/xml",
  zip: "application/zip"
};

// packages/qwik-city/src/middleware/node/node-fetch.ts
var import_web = require("node:stream/web");
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

// packages/qwik-city/src/middleware/node/index.ts
var import_qwik = require("@builder.io/qwik");
var import_meta = {};
function createQwikCity(opts) {
  var _a;
  patchGlobalThis();
  const qwikSerializer = {
    _deserializeData: import_qwik._deserializeData,
    _serializeData: import_qwik._serializeData,
    _verifySerializable: import_qwik._verifySerializable
  };
  if (opts.manifest) {
    (0, import_server.setServerPlatform)(opts.manifest);
  }
  const staticFolder = ((_a = opts.static) == null ? void 0 : _a.root) ?? (0, import_node_path.join)((0, import_node_url.fileURLToPath)(import_meta.url), "..", "..", "dist");
  const router = async (req, res, next) => {
    try {
      const origin = computeOrigin(req, opts);
      const serverRequestEv = await fromNodeHttp(
        getUrl(req, origin),
        req,
        res,
        "server",
        opts.getClientConn
      );
      const handled = await (0, import_request_handler.requestHandler)(serverRequestEv, opts, qwikSerializer);
      if (handled) {
        const err = await handled.completion;
        if (err) {
          throw err;
        }
        if (handled.requestEv.headersSent) {
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
      if (!res.headersSent) {
        const origin = computeOrigin(req, opts);
        const url = getUrl(req, origin);
        const notFoundHtml = (0, import_qwik_city_static_paths.isStaticPath)(req.method || "GET", url) ? "Not Found" : (0, import_qwik_city_not_found_paths.getNotFound)(url.pathname);
        res.writeHead(404, {
          "Content-Type": "text/html; charset=utf-8",
          "X-Not-Found": url.pathname
        });
        res.end(notFoundHtml);
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  const staticFile = async (req, res, next) => {
    var _a2;
    try {
      const origin = computeOrigin(req, opts);
      const url = getUrl(req, origin);
      if ((0, import_qwik_city_static_paths.isStaticPath)(req.method || "GET", url)) {
        const pathname = url.pathname;
        let filePath;
        if ((0, import_node_path.basename)(pathname).includes(".")) {
          filePath = (0, import_node_path.join)(staticFolder, pathname);
        } else if (opts.qwikCityPlan.trailingSlash) {
          filePath = (0, import_node_path.join)(staticFolder, pathname + "index.html");
        } else {
          filePath = (0, import_node_path.join)(staticFolder, pathname, "index.html");
        }
        const ext = (0, import_node_path.extname)(filePath).replace(/^\./, "");
        const stream = (0, import_node_fs.createReadStream)(filePath);
        stream.on("error", next);
        const contentType = MIME_TYPES[ext];
        if (contentType) {
          res.setHeader("Content-Type", contentType);
        }
        if ((_a2 = opts.static) == null ? void 0 : _a2.cacheControl) {
          res.setHeader("Cache-Control", opts.static.cacheControl);
        }
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createQwikCity
});
