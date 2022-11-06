// packages/qwik-city/adaptors/cloudflare-pages/vite/index.ts
import { join } from "path";
import fs from "fs";
function cloudflarePagesAdaptor(opts = {}) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  async function generateBundles(ctx) {
    var _a;
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const files = await fs.promises.readdir(clientOutDir, { withFileTypes: true });
    const exclude = files.map((file) => {
      if (file.name.startsWith(".")) {
        return null;
      }
      if (file.isDirectory()) {
        return `/${file.name}/*`;
      } else if (file.isFile()) {
        return `/${file.name}`;
      }
      return null;
    }).filter(isNotNullable);
    const include = ["/*"];
    const serverPackageJsonPath = join(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await fs.promises.mkdir(serverOutDir, { recursive: true });
    await fs.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    if (opts.staticGenerate) {
      const staticGenerate = await import("../../../static/index.mjs");
      let generateOpts = {
        outDir: clientOutDir,
        origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.CF_PAGES_URL) || "https://your.cloudflare.pages.dev",
        renderModulePath,
        qwikCityPlanModulePath
      };
      if (typeof opts.staticGenerate === "object") {
        generateOpts = {
          ...generateOpts,
          ...opts.staticGenerate
        };
      }
      const results = await staticGenerate.generate(generateOpts);
      results.staticPaths.sort();
      results.staticPaths.sort((a, b) => {
        return a.length - b.length;
      });
      if (results.errors > 0) {
        ctx.error("Error while runnning SSG. At least one path failed to render.");
      }
      exclude.push(...results.staticPaths);
    }
    const hasRoutesJson = exclude.includes("/_routes.json");
    if (!hasRoutesJson) {
      const routesJsonPath = join(clientOutDir, "_routes.json");
      const total = include.length + exclude.length;
      const maxRules = 100;
      if (total > maxRules) {
        const toRemove = total - maxRules;
        const removed = exclude.splice(-toRemove, toRemove);
        ctx.warn(
          `Cloudflare pages does not support more than 100 static rules. Qwik SSG generated ${total}, the following rules were excluded: ${JSON.stringify(
            removed,
            void 0,
            2
          )}`
        );
        ctx.warn('Create an configure a "_routes.json" manually in the public.');
      }
      const routesJson = {
        version: 1,
        include,
        exclude
      };
      await fs.promises.writeFile(routesJsonPath, JSON.stringify(routesJson, void 0, 2));
    }
  }
  const plugin = {
    name: "vite-plugin-qwik-city-cloudflare-pages",
    enforce: "post",
    apply: "build",
    config() {
      return {
        build: {
          rollupOptions: {
            output: {
              hoistTransitiveImports: false
            }
          }
        },
        ssr: {
          target: "webworker"
        }
      };
    },
    configResolved({ build, plugins }) {
      var _a;
      qwikVitePlugin = plugins.find((p) => p.name === "vite-plugin-qwik");
      if (!qwikVitePlugin) {
        throw new Error("Missing vite-plugin-qwik");
      }
      serverOutDir = build.outDir;
      if ((build == null ? void 0 : build.ssr) !== true) {
        throw new Error(
          '"build.ssr" must be set to `true` in order to use the Cloudflare Pages adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Cloudflare Pages adaptor.'
        );
      }
    },
    generateBundle(_, bundles) {
      for (const fileName in bundles) {
        const chunk = bundles[fileName];
        if (chunk.type === "chunk" && chunk.isEntry) {
          if (chunk.name === "entry.ssr") {
            renderModulePath = join(serverOutDir, fileName);
          } else if (chunk.name === "@qwik-city-plan") {
            qwikCityPlanModulePath = join(serverOutDir, fileName);
          }
        }
      }
      if (!renderModulePath) {
        throw new Error(
          'Unable to fine "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
      if (!qwikCityPlanModulePath) {
        throw new Error(
          'Unable to fine "@qwik-city-plan" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
    },
    async closeBundle() {
      await generateBundles(this);
    }
  };
  return plugin;
}
var isNotNullable = (v) => {
  return v != null;
};
export {
  cloudflarePagesAdaptor
};
