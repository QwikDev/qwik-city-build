// packages/qwik-city/adaptors/static/vite/index.ts
import { join } from "path";
import fs from "fs";
function staticAdaptor(opts) {
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let ssrOutputPath = null;
  let qwikCityPlanOutputPath = null;
  async function generateBundles() {
    const qwikVitePluginApi = qwikVitePlugin.api;
    const clientOutDir = qwikVitePluginApi.getClientOutDir();
    const serverPackageJsonPath = join(serverOutDir, "package.json");
    const serverPackageJsonCode = `{"type":"module"}`;
    await fs.promises.mkdir(serverOutDir, { recursive: true });
    await fs.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
    const staticGenerate = await import("../../../static/index.mjs");
    await staticGenerate.generate({
      renderModulePath: ssrOutputPath,
      qwikCityPlanModulePath: qwikCityPlanOutputPath,
      outDir: clientOutDir,
      ...opts
    });
  }
  const plugin = {
    name: "vite-plugin-qwik-city-static-generate",
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
          '"build.ssr" must be set to `true` in order to use the Static Generate adaptor.'
        );
      }
      if (!((_a = build == null ? void 0 : build.rollupOptions) == null ? void 0 : _a.input)) {
        throw new Error(
          '"build.rollupOptions.input" must be set in order to use the Static Generate adaptor.'
        );
      }
    },
    generateBundle(_, bundles) {
      for (const fileName in bundles) {
        const chunk = bundles[fileName];
        if (chunk.type === "chunk" && chunk.isEntry) {
          if (chunk.name === "entry.ssr") {
            ssrOutputPath = join(serverOutDir, fileName);
          } else if (chunk.name === "@qwik-city-plan") {
            qwikCityPlanOutputPath = join(serverOutDir, fileName);
          }
        }
      }
      if (!ssrOutputPath) {
        throw new Error(
          'Unable to fine "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
        );
      }
      if (!qwikCityPlanOutputPath) {
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
  staticAdaptor
};
