// packages/qwik-city/adapters/cloud-run/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function cloudRunAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "cloud-run",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://your-app-name.run.app",
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
