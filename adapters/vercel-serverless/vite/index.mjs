// packages/qwik-city/adapters/vercel-serverless/vite/index.ts
import { getParentDir, viteAdapter } from "../../shared/vite/index.mjs";
import fs from "fs";
import { dirname, join } from "path";
function vercelServerlessAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "vercel-serverless",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.VERCEL_URL) || "https://yoursitename.vercel.app",
    ssg: opts.ssg,
    staticPaths: opts.staticPaths,
    cleanStaticGenerated: true,
    config(config) {
      var _a2;
      const outDir = ((_a2 = config.build) == null ? void 0 : _a2.outDir) || join(".vercel", "output", "functions", "_qwik-city.func");
      return {
        build: {
          ssr: true,
          outDir
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
        if (outputEntries.some((n) => n === "entry.vercel-serverless.mjs")) {
          entrypoint = "entry.vercel-serverless.mjs";
        } else {
          entrypoint = "entry.vercel-serverless.js";
        }
      }
      const vcConfigPath = join(serverOutDir, ".vc-config.json");
      const vcConfig = {
        launcherType: "Nodejs",
        runtime: opts.runtime || "nodejs18.x",
        handler: entrypoint,
        memory: opts.memory,
        maxDuration: opts.maxDuration,
        environment: opts.environment,
        regions: opts.regions,
        shouldAddSourcemapSupport: true
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
  vercelServerlessAdapter
};
