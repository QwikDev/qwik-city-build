// packages/qwik-city/adapters/netlify-edge/vite/index.ts
import { getParentDir, viteAdapter } from "../../shared/vite/index.mjs";
import fs, { existsSync } from "fs";
import { join } from "path";

// packages/qwik-city/runtime/src/qwik-city-plan.ts
var basePathname = "/";

// packages/qwik-city/adapters/netlify-edge/vite/index.ts
function netifyEdgeAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "netlify-edge",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.netlify.app",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || ".netlify/edge-functions/entry.netlify-edge";
      return {
        resolve: {
          conditions: ["webworker", "worker"]
        },
        ssr: {
          target: "webworker",
          noExternal: true
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
        const netlifyEdgeManifest = {
          functions: [
            {
              path: basePathname + "*",
              function: "entry.netlify-edge",
              cache: "manual"
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
var netifyEdgeAdaptor = netifyEdgeAdapter;
export {
  netifyEdgeAdapter,
  netifyEdgeAdaptor
};
