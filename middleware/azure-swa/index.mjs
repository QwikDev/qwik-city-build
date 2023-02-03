// packages/qwik-city/middleware/azure-swa/index.ts
import qwikCityPlan from "@qwik-city-plan";
import { requestHandler } from "../request-handler/index.mjs";
function createQwikCity(opts) {
  async function onAzureSwaRequest(context, req) {
    const res = context.res = {
      status: 200,
      headers: {}
    };
    const decoder = new TextDecoder();
    try {
      const getRequestBody = async function* () {
        for await (const chunk of req) {
          yield chunk;
        }
      };
      const body = req.method === "HEAD" || req.method === "GET" ? void 0 : getRequestBody();
      const options = {
        method: req.method,
        headers: req.headers,
        body,
        duplex: "half"
      };
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url: new URL(req.url),
        platform: context,
        env: {
          get(key) {
            return process.env[key];
          }
        },
        request: new Request(req.url, options),
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
      if (handledResponse) {
        handledResponse.completion.then((v) => {
          console.error(v);
        });
        const response = await handledResponse.response;
        if (response) {
          return response;
        }
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
