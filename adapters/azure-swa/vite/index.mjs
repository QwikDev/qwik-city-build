// packages/qwik-city/adapters/azure-swa/vite/index.ts
import { viteAdapter } from "../../shared/vite/index.mjs";
import { join } from "path";
import fs from "fs";
function azureSwaAdapter(opts = {}) {
  var _a;
  return viteAdapter({
    name: "azure-swa",
    origin: ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.URL) || "https://yoursitename.region.2.azurestaticapps.net",
    staticGenerate: opts.staticGenerate,
    ssg: opts.ssg,
    cleanStaticGenerated: true,
    async generate({ outputEntries, serverOutDir, clientOutDir }) {
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
      if (!fs.existsSync(join(clientOutDir, "index.html"))) {
        await fs.promises.writeFile(join(clientOutDir, "index.html"), "");
      }
    }
  });
}
var azureSwaAdaptor = azureSwaAdapter;
export {
  azureSwaAdapter,
  azureSwaAdaptor
};
