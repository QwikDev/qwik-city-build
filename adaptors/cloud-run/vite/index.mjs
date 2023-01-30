// packages/qwik-city/adaptors/cloud-run/vite/index.ts
import { viteAdaptor } from "../../shared/vite/index.mjs";
function cloudRunAdaptor(opts = {}) {
  var _a;
  return viteAdaptor({
    name: "cloud-run",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://your-app-name.run.app",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        build: {
          ssr: true
        },
        publicDir: false
      };
    }
  });
}
export {
  cloudRunAdaptor
};
