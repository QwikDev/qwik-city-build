// packages/qwik-city/adapters/cloud-run/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function cloudRunAdapter(opts = {}) {
  var _a;
  return viteAdapter({
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
var cloudRunAdaptor = cloudRunAdapter;
export {
  cloudRunAdapter,
  cloudRunAdaptor
};
