// packages/qwik-city/src/adapters/netlify-edge/vite/index.ts
import { getParentDir, viteAdapter } from "../../shared/vite/index.mjs";
import fs, { existsSync } from "node:fs";
import { join } from "node:path";

// packages/qwik-city/src/runtime/src/qwik-city-plan.ts
var basePathname = "/";

// packages/qwik-city/src/adapters/netlify-edge/vite/index.ts
function netlifyEdgeAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "netlify-edge",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.netlify.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a;
      const outDir = ((_a = config.build) == null ? void 0 : _a.outDir) || ".netlify/edge-functions/entry.netlify-edge";
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
          outDir,
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
    async generate({ serverOutDir }) {
      if (opts.functionRoutes !== false) {
        const excludedPath = [];
        if (typeof opts.excludedPath === "string") {
          excludedPath.push(opts.excludedPath);
        } else if (Array.isArray(opts.excludedPath)) {
          excludedPath.push(...opts.excludedPath);
        } else {
          excludedPath.push(
            "/build/*",
            "/favicon.ico",
            "/robots.txt",
            "/mainifest.json",
            "/~partytown/*",
            "/service-worker.js",
            "/sitemap.xml"
          );
        }
        const netlifyEdgeManifest = {
          functions: [
            {
              path: basePathname + "*",
              function: "entry.netlify-edge",
              cache: "manual",
              excludedPath
            }
          ],
          version: 1
        };
        const jsPath = join(serverOutDir, "entry.netlify-edge.js");
        const mjsPath = join(serverOutDir, "entry.netlify-edge.mjs");
        if (existsSync(mjsPath)) {
          await fs.promises.writeFile(
            jsPath,
            [
              `import entry_netlifyEdge from './entry.netlify-edge.mjs';`,
              `export default entry_netlifyEdge;`
            ].join("\n")
          );
        }
        const netlifyEdgeFnsDir = getParentDir(serverOutDir, "edge-functions");
        await fs.promises.writeFile(
          join(netlifyEdgeFnsDir, "manifest.json"),
          JSON.stringify(netlifyEdgeManifest, null, 2)
        );
      }
    }
  });
}
export {
  netlifyEdgeAdapter
};
