// packages/qwik-city/adapters/express/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function expressAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "express",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.qwik.builder.io",
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
var expressAdaptor = expressAdapter;
export {
  expressAdapter,
  expressAdaptor
};
