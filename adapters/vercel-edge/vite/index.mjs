// packages/qwik-city/src/adapters/vercel-edge/vite/index.ts
import { getParentDir, viteAdapter } from "../../shared/vite/index.mjs";
import fs from "node:fs";
import { dirname, join } from "node:path";
function vercelEdgeAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "vercel-edge",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.VERCEL_URL) || "https://yoursitename.vercel.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || join(".vercel", "output", "functions", "_qwik-city.func");
      return {
        resolve: {
          conditions: opts.target === "node" ? ["node", "import", "module", "browser", "default"] : ["edge-light", "webworker", "worker", "browser", "module", "main"]
        },
        ssr: {
          target: opts.target === "node" ? "node" : "webworker",
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
    async generate({ clientPublicOutDir, serverOutDir, basePathname, outputEntries }) {
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
      let entrypoint = opts.vcConfigEntryPoint;
      if (!entrypoint) {
        if (outputEntries.some((n) => n === "entry.vercel-edge.mjs")) {
          entrypoint = "entry.vercel-edge.mjs";
        } else {
          entrypoint = "entry.vercel-edge.js";
        }
      }
      const vcConfigPath = join(serverOutDir, ".vc-config.json");
      const vcConfig = {
        runtime: "edge",
        entrypoint,
        envVarsInUse: opts.vcConfigEnvVarsInUse
      };
      await fs.promises.writeFile(vcConfigPath, JSON.stringify(vcConfig, null, 2));
      let vercelStaticDir = join(vercelOutputDir, "static");
      const basePathnameParts = basePathname.split("/").filter((p) => p.length > 0);
      if (basePathnameParts.length > 0) {
        vercelStaticDir = join(vercelStaticDir, ...basePathnameParts);
      }
      await fs.promises.rm(vercelStaticDir, { recursive: true, force: true });
      await fs.promises.mkdir(dirname(vercelStaticDir), { recursive: true });
      await fs.promises.rename(clientPublicOutDir, vercelStaticDir);
    }
  });
}
export {
  vercelEdgeAdapter
};
