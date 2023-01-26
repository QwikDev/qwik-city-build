// packages/qwik-city/adaptors/cloudflare-pages/vite/index.ts
import { viteAdaptor } from "../../shared/vite/index.mjs";
import fs from "fs";
import { join } from "path";
function cloudflarePagesAdaptor(opts = {}) {
  var _a;
  return viteAdaptor({
    name: "cloudflare-pages",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.CF_PAGES_URL) || "https://your.cloudflare.pages.dev",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config() {
      return {
        ssr: {
          target: "node",
          format: "esm",
          noExternal: true
        },
        build: {
          ssr: true,
          rollupOptions: {
            output: {
              format: "es",
              hoistTransitiveImports: false
            }
          }
        },
        publicDir: false
      };
    },
    async generate({ clientOutDir, basePathname }) {
      const routesJsonPath = join(clientOutDir, "_routes.json");
      const hasRoutesJson = fs.existsSync(routesJsonPath);
      if (!hasRoutesJson && opts.functionRoutes !== false) {
        const routesJson = {
          version: 1,
          include: [basePathname + "*"],
          exclude: [basePathname + "build/*", basePathname + "assets/*"]
        };
        await fs.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
      }
    }
  });
}
export {
  cloudflarePagesAdaptor
};
