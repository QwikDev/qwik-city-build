// packages/qwik-city/src/adapters/node-server/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function nodeServerAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: opts.name || "node-server",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.qwik.dev",
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
  nodeServerAdapter
};
