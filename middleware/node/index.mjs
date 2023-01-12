// packages/qwik-city/middleware/node/index.ts
import { getNotFound } from "@qwik-city-not-found-paths";
import qwikCityPlan from "@qwik-city-plan";
import { isStaticPath } from "@qwik-city-static-paths";
import { createReadStream } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { requestHandler } from "../request-handler/index.mjs";

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
import {
  TextEncoderStream,
  TextDecoderStream,
  WritableStream as WritableStream2,
  ReadableStream
} from "stream/web";
import { fetch, Headers as Headers2, Request as Request2, Response, FormData } from "undici";
import crypto from "crypto";
function patchGlobalThis() {
  if (typeof global !== "undefined" && typeof globalThis.fetch !== "function" && typeof process !== "undefined" && process.versions.node) {
    if (!globalThis.fetch) {
      globalThis.fetch = fetch;
      globalThis.Headers = Headers2;
      globalThis.Request = Request2;
      globalThis.Response = Response;
      globalThis.FormData = FormData;
    }
    if (typeof globalThis.TextEncoderStream === "undefined") {
      globalThis.TextEncoderStream = TextEncoderStream;
      globalThis.TextDecoderStream = TextDecoderStream;
    }
    if (typeof globalThis.WritableStream === "undefined") {
      globalThis.WritableStream = WritableStream2;
      globalThis.ReadableStream = ReadableStream;
    }
    if (typeof globalThis.crypto === "undefined") {
      globalThis.crypto = crypto.webcrypto;
    }
  }
}

// packages/qwik-city/middleware/node/index.ts
function createQwikCity(opts) {
  var _a;
  patchGlobalThis();
  const staticFolder = ((_a = opts.static) == null ? void 0 : _a.root) ?? join(fileURLToPath(import.meta.url), "..", "..", "dist");
  const router = async (req, res, next) => {
    try {
      const serverRequestEv = await fromNodeHttp(getUrl(req), req, res, "server");
      const handled = await requestHandler(serverRequestEv, opts);
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
      const notFoundHtml = getNotFound(url.pathname);
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
      if (isStaticPath(req.method || "GET", url)) {
        const target = join(staticFolder, url.pathname);
        const stream = createReadStream(target);
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
  return createQwikCity({ render, qwikCityPlan, ...opts });
}
export {
  createQwikCity,
  qwikCity
};
