// packages/qwik-city/adapters/vercel-edge/vite/index.ts
import { getParentDir, viteAdapter } from "../../shared/vite/index.mjs";
import fs from "fs";
import { join } from "path";
function vercelEdgeAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "vercel-edge",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.VERCEL_URL) || "https://yoursitename.vercel.app",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || ".vercel/output/functions/_qwik-city.func";
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
    async generate({ clientOutDir, serverOutDir, basePathname, outputEntries }) {
      const vercelOutputDir = getParentDir(serverOutDir, "output");
      if (opts.outputConfig !== false) {
        const vercelOutputConfig = {
          routes: [
            { handle: "filesystem" },
            {
              src: basePathname + ".*",
              dest: "/_qwik-city"
            }
          ],
          version: 3
        };
        await fs.promises.writeFile(
          join(vercelOutputDir, "config.json"),
          JSON.stringify(vercelOutputConfig, null, 2)
        );
      }
      const vcConfigPath = join(serverOutDir, ".vc-config.json");
      let entrypoint = opts.vcConfigEntryPoint;
      if (!entrypoint) {
        if (outputEntries.some((n) => n === "entry.vercel-edge.mjs")) {
          entrypoint = "entry.vercel-edge.mjs";
        } else {
          entrypoint = "entry.vercel-edge.js";
        }
      }
      const vcConfig = {
        runtime: "edge",
        entrypoint,
        envVarsInUse: opts.vcConfigEnvVarsInUse
      };
      await fs.promises.writeFile(vcConfigPath, JSON.stringify(vcConfig, null, 2));
      const staticDir = join(vercelOutputDir, "static");
      if (fs.existsSync(staticDir)) {
        await fs.promises.rm(staticDir, { recursive: true });
      }
      await fs.promises.rename(clientOutDir, staticDir);
    }
  });
}
var vercelEdgeAdaptor = vercelEdgeAdapter;
export {
  vercelEdgeAdapter,
  vercelEdgeAdaptor
};
