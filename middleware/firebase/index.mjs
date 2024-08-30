// packages/qwik-city/src/middleware/firebase/index.ts
import { createQwikCity as createQwikCityNode } from "@builder.io/qwik-city/middleware/node";
function createQwikCity(opts) {
  const { staticFile, notFound, router } = createQwikCityNode({
    render: opts.render,
    manifest: opts.manifest,
    qwikCityPlan: opts.qwikCityPlan,
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
  const qwikApp = (req, res) => {
    return staticFile(req, res, () => {
      router(req, res, () => notFound(req, res, () => {
      }));
    });
  };
  return qwikApp;
}
export {
  createQwikCity
};
