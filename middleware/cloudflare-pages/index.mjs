// packages/qwik-city/src/middleware/cloudflare-pages/index.ts
import {
  mergeHeadersCookies,
  requestHandler,
  _TextEncoderStream_polyfill
} from "../request-handler/index.mjs";
import { getNotFound } from "@qwik-city-not-found-paths";
import { isStaticPath } from "@qwik-city-static-paths";
import { _deserializeData, _serializeData, _verifySerializable } from "@builder.io/qwik";
import { setServerPlatform } from "@builder.io/qwik/server";
function createQwikCity(opts) {
  try {
    new globalThis.TextEncoderStream();
  } catch (e) {
    globalThis.TextEncoderStream = _TextEncoderStream_polyfill;
  }
  const qwikSerializer = {
    _deserializeData,
    _serializeData,
    _verifySerializable
  };
  if (opts.manifest) {
    setServerPlatform(opts.manifest);
  }
  async function onCloudflarePagesFetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (isStaticPath(request.method, url)) {
        return env.ASSETS.fetch(request);
      }
      const useCache = url.hostname !== "127.0.0.1" && url.hostname !== "localhost" && url.port === "" && request.method === "GET";
      const cacheKey = new Request(url.href, request);
      const cache = useCache ? await caches.open("custom:qwikcity") : null;
      if (cache) {
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }
      }
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url,
        request,
        env: {
          get(key) {
            return env[key];
          }
        },
        getWritableStream: (status, headers, cookies, resolve) => {
          const { readable, writable } = new TransformStream();
          const response = new Response(readable, {
            status,
            headers: mergeHeadersCookies(headers, cookies)
          });
          resolve(response);
          return writable;
        },
        getClientConn: () => {
          return {
            ip: request.headers.get("CF-connecting-ip") || "",
            country: request.headers.get("CF-IPCountry") || ""
          };
        },
        platform: {
          request,
          env,
          ctx
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
          if (response.ok && cache && response.headers.has("Cache-Control")) {
            ctx.waitUntil(cache.put(cacheKey, response.clone()));
          }
          return response;
        }
      }
      const notFoundHtml = isStaticPath(request.method || "GET", url) ? "Not Found" : getNotFound(url.pathname);
      return new Response(notFoundHtml, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8", "X-Not-Found": url.pathname }
      });
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "cloudflare-pages" }
      });
    }
  }
  return onCloudflarePagesFetch;
}
export {
  createQwikCity
};
