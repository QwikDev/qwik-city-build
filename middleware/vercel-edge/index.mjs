// packages/qwik-city/middleware/vercel-edge/index.ts
import {
  mergeHeadersCookies,
  requestHandler
} from "../request-handler/index.mjs";
import { getNotFound } from "@qwik-city-not-found-paths";
import { isStaticPath } from "@qwik-city-static-paths";
import { _deserializeData, _serializeData, _verifySerializable } from "@builder.io/qwik";
import { setServerPlatform } from "@builder.io/qwik/server";
function createQwikCity(opts) {
  const qwikSerializer = {
    _deserializeData,
    _serializeData,
    _verifySerializable
  };
  if (opts.manifest) {
    setServerPlatform(opts.manifest);
  }
  async function onVercelEdgeRequest(request) {
    try {
      const url = new URL(request.url);
      if (isStaticPath(request.method, url)) {
        return new Response(null, {
          headers: {
            "x-middleware-next": "1"
          }
        });
      }
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url,
        request,
        env: {
          get(key) {
            return process.env[key];
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
        platform: {}
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
          return response;
        }
      }
      const notFoundHtml = getNotFound(url.pathname);
      return new Response(notFoundHtml, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8", "X-Not-Found": url.pathname }
      });
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "vercel-edge" }
      });
    }
  }
  return onVercelEdgeRequest;
}
export {
  createQwikCity
};
