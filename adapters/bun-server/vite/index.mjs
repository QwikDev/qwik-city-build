// packages/qwik-city/src/adapters/bun-server/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function bunServerAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: opts.name || "bun-server",
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
  bunServerAdapter
};
