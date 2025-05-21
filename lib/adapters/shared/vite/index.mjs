// packages/qwik-city/src/adapters/shared/vite/index.ts
import fs2 from "node:fs";
import { basename, dirname, join as join2, resolve } from "node:path";

// packages/qwik-city/src/adapters/shared/vite/post-build.ts
import fs from "node:fs";
import { join } from "node:path";
import { getErrorHtml } from "../../../middleware/request-handler/index.mjs";
async function postBuild(clientOutDir, pathName, userStaticPaths, format, cleanStatic) {
  if (pathName && !pathName.endsWith("/")) {
    pathName += "/";
  }
  const ignorePathnames = /* @__PURE__ */ new Set([pathName + "build/", pathName + "assets/"]);
  const staticPaths = new Set(userStaticPaths.map(normalizeTrailingSlash));
  const notFounds = [];
  const loadItem = async (fsDir, fsName, pathname) => {
    pathname = normalizeTrailingSlash(pathname);
    if (ignorePathnames.has(pathname)) {
      return;
    }
    const fsPath = join(fsDir, fsName);
    if (fsName === "index.html" || fsName === "q-data.json") {
      if (!staticPaths.has(pathname) && cleanStatic) {
        await fs.promises.unlink(fsPath);
      }
      return;
    }
    if (fsName === "404.html") {
      const notFoundHtml = await fs.promises.readFile(fsPath, "utf-8");
      notFounds.push([pathname, notFoundHtml]);
      return;
    }
    const stat = await fs.promises.stat(fsPath);
    if (stat.isDirectory()) {
      await loadDir(fsPath, pathname + fsName + "/");
    } else if (stat.isFile()) {
      staticPaths.add(pathname + fsName);
    }
  };
  const loadDir = async (fsDir, pathname) => {
    const itemNames = await fs.promises.readdir(fsDir);
    await Promise.all(itemNames.map((i) => loadItem(fsDir, i, pathname)));
  };
  if (fs.existsSync(clientOutDir)) {
    await loadDir(clientOutDir, pathName);
  }
  const notFoundPathsCode = createNotFoundPathsModule(pathName, notFounds, format);
  const staticPathsCode = createStaticPathsModule(pathName, staticPaths, format);
  return {
    notFoundPathsCode,
    staticPathsCode
  };
}
function normalizeTrailingSlash(pathname) {
  if (!pathname.endsWith("/")) {
    return pathname + "/";
  }
  return pathname;
}
function createNotFoundPathsModule(basePathname, notFounds, format) {
  notFounds.sort((a, b) => {
    if (a[0].length > b[0].length) {
      return -1;
    }
    if (a[0].length < b[0].length) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
  if (!notFounds.some((r) => r[0] === basePathname)) {
    const html = getErrorHtml(404, "Resource Not Found");
    notFounds.push([basePathname, html]);
  }
  const c = [];
  c.push(`const notFounds = ${JSON.stringify(notFounds, null, 2)};`);
  c.push(`function getNotFound(p) {`);
  c.push(`  for (const r of notFounds) {`);
  c.push(`    if (p.startsWith(r[0])) {`);
  c.push(`      return r[1];`);
  c.push(`    }`);
  c.push(`  }`);
  c.push(`  return "Resource Not Found";`);
  c.push(`}`);
  if (format === "cjs") {
    c.push("exports.getNotFound = getNotFound;");
  } else {
    c.push("export { getNotFound };");
  }
  return c.join("\n");
}
function createStaticPathsModule(basePathname, staticPaths, format) {
  const assetsPath = basePathname + "assets/";
  const baseBuildPath = basePathname + "build/";
  const c = [];
  c.push(
    `const staticPaths = new Set(${JSON.stringify(
      Array.from(new Set(staticPaths)).sort()
    )});`
  );
  c.push(`function isStaticPath(method, url) {`);
  c.push(`  if (method.toUpperCase() !== 'GET') {`);
  c.push(`    return false;`);
  c.push(`  }`);
  c.push(`  const p = url.pathname;`);
  c.push(`  if (p.startsWith(${JSON.stringify(baseBuildPath)})) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (p.startsWith(${JSON.stringify(assetsPath)})) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (staticPaths.has(p)) {`);
  c.push(`    return true;`);
  c.push(`  }`);
  c.push(`  if (p.endsWith('/q-data.json')) {`);
  c.push(`    const pWithoutQdata = p.replace(/\\/q-data.json$/, '');`);
  c.push(`    if (staticPaths.has(pWithoutQdata + '/')) {`);
  c.push(`      return true;`);
  c.push(`    }`);
  c.push(`    if (staticPaths.has(pWithoutQdata)) {`);
  c.push(`      return true;`);
  c.push(`    }`);
  c.push(`  }`);
  c.push(`  return false;`);
  c.push(`}`);
  if (format === "cjs") {
    c.push("exports.isStaticPath = isStaticPath;");
  } else {
    c.push("export { isStaticPath };");
  }
  return c.join("\n");
}

// packages/qwik-city/src/adapters/shared/vite/index.ts
function viteAdapter(opts) {
  let qwikCityPlugin = null;
  let qwikVitePlugin = null;
  let serverOutDir = null;
  let renderModulePath = null;
  let qwikCityPlanModulePath = null;
  let isSsrBuild = false;
  let format = "esm";
  const outputEntries = [];
  const plugin = {
    name: `vite-plugin-qwik-city-${opts.name}`,
    enforce: "post",
    apply: "build",
    config(config) {
      if (typeof opts.config === "function") {
        config = opts.config(config);
      }
      config.define = {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
        ...config.define
      };
      return config;
    },
    configResolved(config) {
      var _a, _b, _c, _d;
      isSsrBuild = !!config.build.ssr;
      if (isSsrBuild) {
        qwikCityPlugin = config.plugins.find(
          (p) => p.name === "vite-plugin-qwik-city"
        );
        if (!qwikCityPlugin) {
          throw new Error("Missing vite-plugin-qwik-city");
        }
        qwikVitePlugin = config.plugins.find(
          (p) => p.name === "vite-plugin-qwik"
        );
        if (!qwikVitePlugin) {
          throw new Error("Missing vite-plugin-qwik");
        }
        serverOutDir = config.build.outDir;
        if (((_a = config.build) == null ? void 0 : _a.ssr) !== true) {
          throw new Error(
            `"build.ssr" must be set to "true" in order to use the "${opts.name}" adapter.`
          );
        }
        if (!((_c = (_b = config.build) == null ? void 0 : _b.rollupOptions) == null ? void 0 : _c.input)) {
          throw new Error(
            `"build.rollupOptions.input" must be set in order to use the "${opts.name}" adapter.`
          );
        }
        if (((_d = config.ssr) == null ? void 0 : _d.format) === "cjs") {
          format = "cjs";
        }
      }
    },
    generateBundle(_, bundles) {
      if (isSsrBuild) {
        outputEntries.length = 0;
        for (const fileName in bundles) {
          const chunk = bundles[fileName];
          if (chunk.type === "chunk" && chunk.isEntry) {
            outputEntries.push(fileName);
            if (chunk.name === "entry.ssr") {
              renderModulePath = join2(serverOutDir, fileName);
            } else if (chunk.name === "@qwik-city-plan") {
              qwikCityPlanModulePath = join2(serverOutDir, fileName);
            }
          }
        }
        if (!renderModulePath) {
          throw new Error(
            'Unable to find "entry.ssr" entry point. Did you forget to add it to "build.rollupOptions.input"?'
          );
        }
        if (!qwikCityPlanModulePath) {
          throw new Error(
            'Unable to find "@qwik-city-plan" entry point. Did you forget to add it to "build.rollupOptions.input"?'
          );
        }
      }
    },
    closeBundle: {
      sequential: true,
      async handler() {
        var _a;
        if (isSsrBuild && opts.ssg !== null && serverOutDir && (qwikCityPlugin == null ? void 0 : qwikCityPlugin.api) && (qwikVitePlugin == null ? void 0 : qwikVitePlugin.api)) {
          const staticPaths = opts.staticPaths || [];
          const routes = qwikCityPlugin.api.getRoutes();
          const basePathname = qwikCityPlugin.api.getBasePathname();
          const clientOutDir = qwikVitePlugin.api.getClientOutDir();
          const clientPublicOutDir = qwikVitePlugin.api.getClientPublicOutDir();
          const assetsDir = qwikVitePlugin.api.getAssetsDir();
          const rootDir = qwikVitePlugin.api.getRootDir() ?? void 0;
          if (renderModulePath && qwikCityPlanModulePath && clientOutDir && clientPublicOutDir) {
            let ssgOrigin = ((_a = opts.ssg) == null ? void 0 : _a.origin) ?? opts.origin;
            if (!ssgOrigin) {
              ssgOrigin = `https://yoursite.qwik.dev`;
            }
            if (ssgOrigin.length > 0 && !/:\/\//.test(ssgOrigin)) {
              ssgOrigin = `https://${ssgOrigin}`;
            }
            if (ssgOrigin.startsWith("//")) {
              ssgOrigin = `https:${ssgOrigin}`;
            }
            try {
              ssgOrigin = new URL(ssgOrigin).origin;
            } catch (e) {
              this.warn(
                `Invalid "origin" option: "${ssgOrigin}". Using default origin: "https://yoursite.qwik.dev"`
              );
              ssgOrigin = `https://yoursite.qwik.dev`;
            }
            const staticGenerate = await import("../../../static/index.mjs");
            const generateOpts = {
              maxWorkers: opts.maxWorkers,
              basePathname,
              outDir: clientPublicOutDir,
              rootDir,
              ...opts.ssg,
              origin: ssgOrigin,
              renderModulePath,
              qwikCityPlanModulePath
            };
            const staticGenerateResult = await staticGenerate.generate(generateOpts);
            if (staticGenerateResult.errors > 0) {
              const err = new Error(
                `Error while running SSG from "${opts.name}" adapter. At least one path failed to render.`
              );
              err.stack = void 0;
              this.error(err);
            }
            staticPaths.push(...staticGenerateResult.staticPaths);
            const { staticPathsCode, notFoundPathsCode } = await postBuild(
              clientPublicOutDir,
              assetsDir ? join2(basePathname, assetsDir) : basePathname,
              staticPaths,
              format,
              !!opts.cleanStaticGenerated
            );
            await Promise.all([
              fs2.promises.writeFile(join2(serverOutDir, RESOLVED_STATIC_PATHS_ID), staticPathsCode),
              fs2.promises.writeFile(
                join2(serverOutDir, RESOLVED_NOT_FOUND_PATHS_ID),
                notFoundPathsCode
              )
            ]);
            if (typeof opts.generate === "function") {
              await opts.generate({
                outputEntries,
                serverOutDir,
                clientOutDir,
                clientPublicOutDir,
                basePathname,
                routes,
                assetsDir,
                warn: (message) => this.warn(message),
                error: (message) => this.error(message)
              });
            }
            this.warn(
              `
==============================================
Note: Make sure that you are serving the built files with proper cache headers.
See https://qwik.dev/docs/deployments/#cache-headers for more information.
==============================================`
            );
          }
        }
      }
    }
  };
  return plugin;
}
function getParentDir(startDir, dirName) {
  const root = resolve("/");
  let dir = startDir;
  for (let i = 0; i < 20; i++) {
    dir = dirname(dir);
    if (basename(dir) === dirName) {
      return dir;
    }
    if (dir === root) {
      break;
    }
  }
  throw new Error(`Unable to find "${dirName}" directory from "${startDir}"`);
}
var STATIC_PATHS_ID = "@qwik-city-static-paths";
var RESOLVED_STATIC_PATHS_ID = `${STATIC_PATHS_ID}.js`;
var NOT_FOUND_PATHS_ID = "@qwik-city-not-found-paths";
var RESOLVED_NOT_FOUND_PATHS_ID = `${NOT_FOUND_PATHS_ID}.js`;
export {
  NOT_FOUND_PATHS_ID,
  RESOLVED_NOT_FOUND_PATHS_ID,
  RESOLVED_STATIC_PATHS_ID,
  STATIC_PATHS_ID,
  getParentDir,
  viteAdapter
};
