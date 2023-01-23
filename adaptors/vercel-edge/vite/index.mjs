// packages/qwik-city/adaptors/vercel-edge/vite/index.ts
import { getParentDir, viteAdaptor } from "../../shared/vite/index.mjs";
import fs from "fs";
import { join } from "path";
function vercelEdgeAdaptor(opts = {}) {
  var _a;
  return viteAdaptor({
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
    async generate({ clientOutDir, serverOutDir, basePathname }) {
      const vercelOutputDir = getParentDir(serverOutDir, "output");
      if (opts.outputConfig !== false) {
        const vercelOutputConfig = {
          routes: [
            {
              src: basePathname + "(.*)",
              middlewarePath: "_qwik-city"
            },
            { handle: "filesystem" }
          ],
          version: 3
        };
        await fs.promises.writeFile(
          join(vercelOutputDir, "config.json"),
          JSON.stringify(vercelOutputConfig, null, 2)
        );
      }
      const vcConfigPath = join(serverOutDir, ".vc-config.json");
      const vcConfig = {
        runtime: "edge",
        entrypoint: opts.vcConfigEntryPoint || "entry.vercel-edge.js",
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
export {
  vercelEdgeAdaptor
};
