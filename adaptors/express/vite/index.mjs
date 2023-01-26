// packages/qwik-city/adaptors/express/vite/index.ts
import { viteAdaptor } from "../../shared/vite/index.mjs";
function expressAdaptor(opts = {}) {
  var _a;
  return viteAdaptor({
    name: "express",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.qwik.builder.io",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        ssr: {
          target: "node"
        },
        build: {
          ssr: true
        },
        publicDir: false
      };
    }
  });
}
export {
  expressAdaptor
};
