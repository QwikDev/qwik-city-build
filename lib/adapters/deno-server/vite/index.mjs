// packages/qwik-city/src/adapters/deno-server/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
function denoServerAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: opts.name || "deno-server",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.qwik.dev",
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    config() {
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "webworker",
          noExternal: true,
          external: ["node:async_hooks"]
        },
        build: {
          ssr: true,
          target: "esnext",
          rollupOptions: {
            output: {
              format: "es",
              hoistTransitiveImports: false
            }
          }
        },
        publicDir: false
      };
    }
  });
}
export {
  denoServerAdapter
};
