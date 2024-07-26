// packages/qwik-city/src/adapters/azure-swa/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
import { join } from "node:path";
import fs from "node:fs";
function azureSwaAdapter(opts = {}) {
  const env = process == null ? void 0 : process.env;
  return viteAdapter({
    name: "azure-swa",
    origin: (env == null ? void 0 : env.ORIGIN) ?? (env == null ? void 0 : env.URL) ?? "https://yoursitename.region.2.azurestaticapps.net",
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    async generate({ outputEntries, serverOutDir, clientPublicOutDir }) {
      const serverPackageJsonPath = join(serverOutDir, "package.json");
      const serverPackageJsonCode = `{"type":"module"}`;
      await fs.promises.mkdir(serverOutDir, { recursive: true });
      await fs.promises.writeFile(serverPackageJsonPath, serverPackageJsonCode);
      const azureSwaModulePath = outputEntries.find(
        (entryName) => entryName.indexOf("entry.azure-swa") === 0
      );
      const funcJsonPath = join(serverOutDir, "function.json");
      const funcJson = JSON.stringify(
        {
          bindings: [
            {
              authLevel: "anonymous",
              type: "httpTrigger",
              direction: "in",
              name: "req",
              methods: [
                "get",
                "head",
                "post",
                "put",
                "delete",
                "connect",
                "options",
                "trace",
                "patch"
              ]
            },
            {
              type: "http",
              direction: "out",
              name: "$return"
            }
          ],
          scriptFile: azureSwaModulePath
        },
        null,
        2
      );
      await fs.promises.writeFile(funcJsonPath, funcJson);
      if (!fs.existsSync(join(clientPublicOutDir, "index.html"))) {
        await fs.promises.writeFile(join(clientPublicOutDir, "index.html"), "");
      }
    }
  });
}
export {
  azureSwaAdapter
};
