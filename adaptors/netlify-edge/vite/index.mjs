// packages/qwik-city/adaptors/netlify-edge/vite/index.ts
import { getParentDir, viteAdaptor } from "../../shared/vite/index.mjs";
import fs from "fs";
import { join } from "path";

// packages/qwik-city/runtime/src/qwik-city-plan.ts
var basePathname = "/";

// packages/qwik-city/adaptors/netlify-edge/vite/index.ts
function netifyEdgeAdaptor(opts = {}) {
  var _a;
  return viteAdaptor({
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
          target: "node",
          format: "esm",
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
              function: "entry.netlify-edge"
            }
          ],
          version: 1
        };
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
  netifyEdgeAdaptor
};
