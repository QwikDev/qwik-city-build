// packages/qwik-city/src/middleware/aws-lambda/index.ts
import { createQwikCity as createQwikCityNode } from "@builder.io/qwik-city/middleware/node";
function createQwikCity(opts) {
  try {
    const { router, staticFile, notFound } = createQwikCityNode({
      render: opts.render,
      qwikCityPlan: opts.qwikCityPlan,
      manifest: opts.manifest,
      static: {
        cacheControl: "public, max-age=31557600"
      },
      getOrigin(req) {
        if (process.env.IS_OFFLINE) {
          return `http://${req.headers.host}`;
        }
        return null;
      }
    });
    const fixPath = (pathT) => {
      if (opts.qwikCityPlan.trailingSlash) {
        const url = new URL(pathT, "http://aws-qwik.local");
        if (url.pathname.includes(".", url.pathname.lastIndexOf("/"))) {
          return pathT;
        }
        if (!url.pathname.endsWith("/")) {
          return url.pathname + "/" + url.search;
        }
      }
      return pathT;
    };
    const handle = (req, res) => {
      req.url = fixPath(req.url);
      staticFile(req, res, () => {
        router(req, res, () => {
          notFound(req, res, () => {
          });
        });
      });
    };
    return { fixPath, router, staticFile, notFound, handle };
  } catch (err) {
    throw new Error(err.message);
  }
}
export {
  createQwikCity
};
