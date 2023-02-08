// packages/qwik-city/middleware/azure-swa/index.ts
import qwikCityPlan from "@qwik-city-plan";
import { requestHandler } from "../request-handler/index.mjs";
function createQwikCity(opts) {
  async function onAzureSwaRequest(context, req) {
    const res = context.res = {
      status: 200,
      headers: {}
    };
    try {
      const getRequestBody = async function* () {
        for await (const chunk of req) {
          yield chunk;
        }
      };
      const body = req.method === "HEAD" || req.method === "GET" ? void 0 : getRequestBody();
      const url = req.headers["x-ms-original-url"];
      const options = {
        method: req.method,
        headers: req.headers,
        body,
        duplex: "half"
      };
      const serverRequestEv = {
        mode: "server",
        locale: void 0,
        url: new URL(url),
        platform: context,
        env: {
          get(key) {
            return process.env[key];
          }
        },
        request: new Request(url, options),
        getWritableStream: (status, headers, _cookies) => {
          res.status = status;
          headers.forEach((value, key) => res.headers[key] = value);
          return new WritableStream(new AzureWritableStreamSink(res));
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
var AzureWritableStreamSink = class {
  constructor(res) {
    this.res = res;
  }
  start() {
    this.buffer = new Uint8Array();
  }
  write(chunk) {
    const newBuffer = new Uint8Array(this.buffer.length + chunk.length);
    newBuffer.set(this.buffer);
    newBuffer.set(chunk, this.buffer.length);
    this.buffer = newBuffer;
  }
  close() {
    this.res.body = this.buffer;
  }
};
export {
  createQwikCity,
  qwikCity
};
