// packages/qwik-city/middleware/netlify-edge/index.ts
import {
  mergeHeadersCookies,
  requestHandler
} from "../request-handler/index.mjs";
import { getNotFound } from "@qwik-city-not-found-paths";
import { isStaticPath } from "@qwik-city-static-paths";
function createQwikCity(opts) {
  async function onNetlifyEdgeRequest(request, context) {
    try {
      const url = new URL(request.url);
      if (isStaticPath(request.method, url) || url.pathname.startsWith("/.netlify")) {
        return context.next();
      }
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url,
        env: Deno.env,
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
        platform: context
      };
      const handledResponse = await requestHandler(serverRequestEv, opts);
      if (handledResponse) {
        handledResponse.completion.then((v) => {
          console.error(v);
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
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Error": "netlify-edge" }
      });
    }
  }
  return onNetlifyEdgeRequest;
}
export {
  createQwikCity
};
