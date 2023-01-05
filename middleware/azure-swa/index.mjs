// packages/qwik-city/middleware/azure-swa/index.ts
import qwikCityPlan from "@qwik-city-plan";
import { createHeaders, requestHandler } from "../request-handler/index.mjs";
function createQwikRequest(req) {
  const url = req.headers["x-ms-original-url"];
  const headers = createHeaders();
  for (const header in req.headers) {
    headers.set(header, req.headers[header]);
  }
  return {
    method: req.method || "GET",
    url,
    headers,
    formData: () => Promise.resolve(new URLSearchParams(req.params)),
    json: req.body,
    text: req.rawBody
  };
}
function createQwikCity(opts) {
  async function onAzureSwaRequest(context, req) {
    const res = context.res = {
      status: 200,
      headers: {}
    };
    const decoder = new TextDecoder();
    try {
      const qwikRequest = createQwikRequest(req);
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url: new URL(qwikRequest.url),
        platform: context,
        request: qwikRequest,
        getWritableStream: (status, headers, _cookies) => {
          res.status = status;
          headers.forEach((value, key) => res.headers[key] = value);
          const writable = new WritableStream({
            write(chunk) {
              if (res.body) {
                res.body += decoder.decode(chunk);
              } else {
                res.body = decoder.decode(chunk);
              }
            },
            close() {
            }
          });
          return writable;
        }
      };
      const handledResponse = await requestHandler(serverRequestEv, opts);
      if (handledResponse !== null) {
        const response = await handledResponse.response;
        if (response) {
          return response;
        }
        await handledResponse.requestEv;
      }
      return res;
    } catch (e) {
      console.error(e);
      context.res = {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      };
      return res;
    }
  }
  return onAzureSwaRequest;
}
function qwikCity(render, opts) {
  return createQwikCity({ render, qwikCityPlan, ...opts });
}
export {
  createQwikCity,
  qwikCity
};
