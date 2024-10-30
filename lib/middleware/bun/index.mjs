// packages/qwik-city/src/middleware/bun/index.ts
import {
  mergeHeadersCookies,
  requestHandler,
  _TextEncoderStream_polyfill
} from "../request-handler/index.mjs";
import { getNotFound } from "@qwik-city-not-found-paths";
import { isStaticPath } from "@qwik-city-static-paths";
import { _deserializeData, _serializeData, _verifySerializable } from "@builder.io/qwik";
import { setServerPlatform } from "@builder.io/qwik/server";

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

// packages/qwik-city/src/middleware/bun/index.ts
import { join, extname } from "node:path";
function createQwikCity(opts) {
  var _a;
  globalThis.TextEncoderStream ||= _TextEncoderStream_polyfill;
  const qwikSerializer = {
    _deserializeData,
    _serializeData,
    _verifySerializable
  };
  if (opts.manifest) {
    setServerPlatform(opts.manifest);
  }
  const staticFolder = ((_a = opts.static) == null ? void 0 : _a.root) ?? join(Bun.fileURLToPath(import.meta.url), "..", "..", "dist");
  async function router(request) {
    try {
      const url = new URL(request.url);
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url,
        env: {
          get(key) {
            return Bun.env[key];
          }
        },
        request,
        getWritableStream: (status, headers, cookies, resolve) => {
          const { readable, writable } = new TransformStream();
          const response = new Response(readable, {
            status,
            headers: mergeHeadersCookies(headers, cookies)
          });
          resolve(response);
          return writable;
        },
        platform: {
          ssr: true
        },
        getClientConn: () => {
          return opts.getClientConn ? opts.getClientConn(request) : {};
        }
      };
      const handledResponse = await requestHandler(serverRequestEv, opts, qwikSerializer);
      if (handledResponse) {
        handledResponse.completion.then((v) => {
          if (v) {
            console.error(v);
          }
        });
        const response = await handledResponse.response;
        if (response) {
          const status = response.status;
          const location = response.headers.get("Location");
          const isRedirect = status >= 301 && status <= 308 && location;
          if (isRedirect) {
            return new Response(null, response);
          }
          return response;
        }
      }
      return null;
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "bun-server" }
      });
    }
  }
  const notFound = async (request) => {
    try {
      const url = new URL(request.url);
      const notFoundHtml = isStaticPath(request.method || "GET", url) ? "Not Found" : getNotFound(url.pathname);
      return new Response(notFoundHtml, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8", "X-Not-Found": url.pathname }
      });
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "bun-server" }
      });
    }
  };
  const openStaticFile = async (url) => {
    const pathname = url.pathname;
    const fileName = pathname.slice(url.pathname.lastIndexOf("/"));
    let filePath;
    if (fileName.includes(".")) {
      filePath = join(staticFolder, pathname);
    } else if (opts.qwikCityPlan.trailingSlash) {
      filePath = join(staticFolder, pathname + "index.html");
    } else {
      filePath = join(staticFolder, pathname, "index.html");
    }
    return {
      filePath,
      content: Bun.file(filePath)
    };
  };
  const staticFile = async (request) => {
    var _a2;
    try {
      const url = new URL(request.url);
      if (isStaticPath(request.method || "GET", url)) {
        const { filePath, content } = await openStaticFile(url);
        if (!await content.exists()) {
          return new Response("Not Found", {
            status: 404,
            headers: { "Content-Type": "text/plain; charset=utf-8", "X-Not-Found": url.pathname }
          });
        }
        const ext = extname(filePath).replace(/^\./, "");
        return new Response(await content.stream(), {
          status: 200,
          headers: {
            "content-type": MIME_TYPES[ext] || "text/plain; charset=utf-8",
            "Cache-Control": ((_a2 = opts.static) == null ? void 0 : _a2.cacheControl) || "max-age=3600"
          }
        });
      }
      return null;
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "bun-server" }
      });
    }
  };
  return {
    router,
    notFound,
    staticFile
  };
}
export {
  createQwikCity
};
