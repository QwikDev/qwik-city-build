// packages/qwik-city/adaptors/netlify-edge/vite/index.ts
import { join } from "path";
import fs from "fs";
function netifyEdgeAdaptor(opts = {}) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  async function generateBundles() {
    var _a;
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const serverPackageJsonPath = join(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await fs.promises.mkdir(serverOutDir, { recursive: true });
    await fs.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    if (opts.staticGenerate) {
      const staticGenerate = await import("../../../static/index.mjs");
      let generateOpts = {
        outDir: clientOutDir,
        origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.netlify.app",
        renderModulePath,
        qwikCityPlanModulePath
      };
      if (typeof opts.staticGenerate === "object") {
        generateOpts = {
          ...generateOpts,
          ...opts.staticGenerate
        };
      }
      await staticGenerate.generate(generateOpts);
    }
  }
  const plugin = {
    name: "vite-plugin-qwik-city-netlify-edge",
    enforce: "post",
    apply: "build",
    configResolved({ build, plugins }) {
      var _a;
      qwikVitePlugin = plugins.find((p) => p.name === "vite-plugin-qwik");
      if (!qwikVitePlugin) {
        throw new Error("Missing vite-plugin-qwik");
      }
      serverOutDir = build.outDir;
      if ((build == null ? void 0 : build.ssr) !== true) {
        throw new Error(
          '"build.ssr" must be set to `true` in order to use the Netlify Edge adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Netlify Edge adaptor.'
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
      await generateBundles();
    }
  };
  return plugin;
}
export {
  netifyEdgeAdaptor
};
