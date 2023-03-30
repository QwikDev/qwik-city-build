// packages/qwik-city/middleware/azure-swa/index.ts
import { setServerPlatform } from "@builder.io/qwik/server";
import {
  mergeHeadersCookies,
  requestHandler
} from "../request-handler/index.mjs";
import { getNotFound } from "@qwik-city-not-found-paths";
import { _deserializeData, _serializeData, _verifySerializable } from "@builder.io/qwik";
function createQwikCity(opts) {
  const qwikSerializer = {
    _deserializeData,
    _serializeData,
    _verifySerializable
  };
  if (opts.manifest) {
    setServerPlatform(opts.manifest);
  }
  async function onAzureSwaRequest(context, req) {
    try {
      const url = new URL(req.headers["x-ms-original-url"]);
      const options = {
        method: req.method || "GET",
        headers: req.headers,
        body: req.bufferBody || req.rawBody || req.body
      };
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url,
        platform: context,
        env: {
          get(key) {
            return process.env[key];
          }
        },
        request: new Request(url, options),
        getWritableStream: (status, headers, cookies, resolve) => {
          const response = {
            status,
            body: new Uint8Array(),
            headers: {}
          };
          mergeHeadersCookies(headers, cookies).forEach(
            (value, key) => response.headers[key] = value
          );
          return new WritableStream({
            write(chunk) {
              if (response.body instanceof Uint8Array) {
                const newBuffer = new Uint8Array(response.body.length + chunk.length);
                newBuffer.set(response.body);
                newBuffer.set(chunk, response.body.length);
                response.body = newBuffer;
              }
            },
            close() {
              resolve(response);
            }
          });
        }
      };
      const handledResponse = await requestHandler(serverRequestEv, opts, qwikSerializer);
      if (handledResponse) {
        handledResponse.completion.then((err) => {
          if (err) {
            console.error(err);
          }
        });
        const response = await handledResponse.response;
        if (response) {
          return response;
        }
      }
      const notFoundHtml = getNotFound(url.pathname);
      return {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8", "X-Not-Found": url.pathname },
        body: notFoundHtml
      };
    } catch (e) {
      console.error(e);
      return {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      };
    }
  }
  return onAzureSwaRequest;
}
export {
  createQwikCity
};
