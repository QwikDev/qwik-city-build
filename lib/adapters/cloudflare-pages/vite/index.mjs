// packages/qwik-city/src/adapters/cloudflare-pages/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
import fs from "node:fs";
import { join, relative } from "node:path";

// packages/qwik-city/src/utils/fs.ts
function normalizePathSlash(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);
  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }
  path = path.replace(/\\/g, "/");
  if (path.endsWith("/")) {
    path = path.slice(0, path.length - 1);
  }
  return path;
}

// packages/qwik-city/src/adapters/cloudflare-pages/vite/index.ts
function cloudflarePagesAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "cloudflare-pages",
    origin: (env == null ? void 0 : env.CF_PAGES_URL) ?? (env == null ? void 0 : env.ORIGIN) ?? "https://your.cloudflare.pages.dev",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
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
    async generate({ clientOutDir, serverOutDir, basePathname, assetsDir }) {
      const routesJsonPath = join(clientOutDir, "_routes.json");
      const hasRoutesJson = fs.existsSync(routesJsonPath);
      if (!hasRoutesJson && opts.functionRoutes !== false) {
        let pathName = assetsDir ? join(basePathname, assetsDir) : basePathname;
        if (!pathName.endsWith("/")) {
          pathName += "/";
        }
        const routesJson = {
          version: 1,
          include: [basePathname + "*"],
          exclude: [pathName + "build/*", pathName + "assets/*"]
        };
        await fs.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
      }
      const workerJsPath = join(clientOutDir, "_worker.js");
      const hasWorkerJs = fs.existsSync(workerJsPath);
      if (!hasWorkerJs) {
        const importPath = relative(clientOutDir, join(serverOutDir, "entry.cloudflare-pages"));
        await fs.promises.writeFile(
          workerJsPath,
          `import { fetch } from "${normalizePathSlash(importPath)}"; export default { fetch };`
        );
      }
    }
  });
}
export {
  cloudflarePagesAdapter
};
