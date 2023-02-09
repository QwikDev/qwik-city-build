// packages/qwik-city/adapters/express/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function expressAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "express",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.qwik.builder.io",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        ssr: {
          target: "webworker",
          noExternal: true
        },
        build: {
          ssr: true
        },
        publicDir: false
      };
    }
  });
}
var expressAdaptor = expressAdapter;
export {
  expressAdapter,
  expressAdaptor
};
