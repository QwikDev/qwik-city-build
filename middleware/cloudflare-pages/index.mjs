// packages/qwik-city/middleware/request-handler/headers.ts
var HEADERS = Symbol("headers");
var _a;
var HeadersPolyfill = class {
  constructor() {
    this[_a] = {};
  }
  [(_a = HEADERS, Symbol.iterator)]() {
    return this.entries();
  }
  *keys() {
    for (const name of Object.keys(this[HEADERS])) {
      yield name;
    }
  }
  *values() {
    for (const value of Object.values(this[HEADERS])) {
      yield value;
    }
  }
  *entries() {
    for (const name of Object.keys(this[HEADERS])) {
      yield [name, this.get(name)];
    }
  }
  get(name) {
    return this[HEADERS][normalizeHeaderName(name)] || null;
  }
  set(name, value) {
    const normalizedName = normalizeHeaderName(name);
    this[HEADERS][normalizedName] = typeof value !== "string" ? String(value) : value;
  }
  append(name, value) {
    const normalizedName = normalizeHeaderName(name);
    const resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${value}` : value;
    this.set(name, resolvedValue);
  }
  delete(name) {
    if (!this.has(name)) {
      return;
    }
    const normalizedName = normalizeHeaderName(name);
    delete this[HEADERS][normalizedName];
  }
  all() {
    return this[HEADERS];
  }
  has(name) {
    return this[HEADERS].hasOwnProperty(normalizeHeaderName(name));
  }
  forEach(callback, thisArg) {
    for (const name in this[HEADERS]) {
      if (this[HEADERS].hasOwnProperty(name)) {
        callback.call(thisArg, this[HEADERS][name], name, this);
      }
    }
  }
};
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") {
    throw new TypeError("Invalid character in header field name");
  }
  return name.toLowerCase();
}
function createHeaders() {
  return new (typeof Headers === "function" ? Headers : HeadersPolyfill)();
}

// packages/qwik-city/middleware/request-handler/error-handler.ts
var ErrorResponse = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
function notFoundHandler(requestCtx) {
  return errorResponse(requestCtx, new ErrorResponse(404, "Not Found"));
}
function errorHandler(requestCtx, e) {
  const status = 500 /* InternalServerError */;
  const html = getErrorHtml(status, e);
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    e
  );
}
function errorResponse(requestCtx, errorResponse2) {
  const html = minimalHtmlResponse(
    errorResponse2.status,
    errorResponse2.message,
    errorResponse2.stack
  );
  const headers = createHeaders();
  headers.set("Content-Type", "text/html; charset=utf-8");
  return requestCtx.response(
    errorResponse2.status,
    headers,
    async (stream) => {
      stream.write(html);
    },
    errorResponse2
  );
}
function getErrorHtml(status, e) {
  let message = "Server Error";
  let stack = void 0;
  if (e != null) {
    if (typeof e === "object") {
      if (typeof e.message === "string") {
        message = e.message;
      }
      if (e.stack != null) {
        stack = String(e.stack);
      }
    } else {
      message = String(e);
    }
  }
  return minimalHtmlResponse(status, message, stack);
}
function minimalHtmlResponse(status, message, stack) {
  const width = typeof message === "string" ? "600px" : "300px";
  const color = status >= 500 ? COLOR_500 : COLOR_400;
  if (status < 500) {
    stack = "";
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${status}"/>
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color}; color: white; }
    span { display: inline-block; padding: 15px; }
    pre { max-width: 580px; margin: 0 auto; }
  </style>
</head>
<body>
  <p>
    <strong>${status}</strong>
    <span>${message}</span>
  </p>
  ${stack ? `<pre><code>${stack}</code></pre>` : ``}
</body>
</html>
`;
}
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";

// packages/qwik-city/runtime/src/library/constants.ts
var MODULE_CACHE = /* @__PURE__ */ new WeakMap();

// packages/qwik-city/runtime/src/library/routing.ts
var loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getRouteParams(route[2], match);
        const routeBundleNames = route[4];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader(menus, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i) => {
          loadModule(
            moduleLoader,
            pendingLoads,
            (routeModule) => mods[i] = routeModule,
            cacheModules
          );
        });
        loadModule(
          menuLoader,
          pendingLoads,
          (menuModule) => menu = menuModule == null ? void 0 : menuModule.default,
          cacheModules
        );
        if (pendingLoads.length > 0) {
          await Promise.all(pendingLoads);
        }
        return [params, mods, menu, routeBundleNames];
      }
    }
  }
  return null;
};
var loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const l = moduleLoader();
      if (typeof l.then === "function") {
        pendingLoads.push(
          l.then((loadedModule2) => {
            if (cacheModules !== false) {
              MODULE_CACHE.set(moduleLoader, loadedModule2);
            }
            moduleSetter(loadedModule2);
          })
        );
      } else if (l) {
        moduleSetter(l);
      }
    }
  }
};
var getMenuLoader = (menus, pathname) => {
  if (menus) {
    const menu = menus.find(
      (m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/"))
    );
    if (menu) {
      return menu[1];
    }
  }
  return void 0;
};
var getRouteParams = (paramNames, match) => {
  const params = {};
  if (paramNames) {
    for (let i = 0; i < paramNames.length; i++) {
      params[paramNames[i]] = match ? match[i + 1] : "";
    }
  }
  return params;
};

// packages/qwik-city/middleware/request-handler/endpoint-handler.ts
function endpointHandler(requestCtx, userResponse) {
  const { pendingBody, resolvedBody, status, headers } = userResponse;
  const { response } = requestCtx;
  if (pendingBody === void 0 && resolvedBody === void 0) {
    return response(status, headers, asyncNoop);
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  const isJson = headers.get("Content-Type").includes("json");
  return response(status, headers, async ({ write }) => {
    const body = pendingBody !== void 0 ? await pendingBody : resolvedBody;
    if (body !== void 0) {
      if (isJson) {
        write(JSON.stringify(body));
      } else {
        const type = typeof body;
        if (type === "string") {
          write(body);
        } else if (type === "number" || type === "boolean") {
          write(String(body));
        } else {
          write(body);
        }
      }
    }
  });
}
var asyncNoop = async () => {
};

// packages/qwik-city/middleware/request-handler/page-handler.ts
function pageHandler(mode, requestCtx, userResponse, render, opts, routeBundleNames) {
  const { status, headers } = userResponse;
  const { response } = requestCtx;
  const isPageData = userResponse.type === "pagedata";
  const requestHeaders = {};
  requestCtx.request.headers.forEach((value, key) => requestHeaders[key] = value);
  if (isPageData) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  } else if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  return response(isPageData ? 200 : status, headers, async (stream) => {
    try {
      const result = await render({
        stream: isPageData ? noopStream : stream,
        envData: getQwikCityEnvData(requestHeaders, userResponse, requestCtx.locale, mode),
        ...opts
      });
      if (isPageData) {
        stream.write(
          JSON.stringify(await getClientPageData(userResponse, result, routeBundleNames))
        );
      } else {
        if ((typeof result).html === "string") {
          stream.write(result.html);
        }
      }
      if (typeof stream.clientData === "function") {
        stream.clientData(await getClientPageData(userResponse, result, routeBundleNames));
      }
    } catch (e) {
      const errorHtml = getErrorHtml(500 /* InternalServerError */, e);
      stream.write(errorHtml);
    }
  });
}
async function getClientPageData(userResponse, result, routeBundleNames) {
  var _a3;
  const prefetchBundleNames = getPrefetchBundleNames(result, routeBundleNames);
  const isStatic = !((_a3 = result.snapshotResult) == null ? void 0 : _a3.resources.some((r) => r._cache !== Infinity));
  const clientPage = {
    body: userResponse.pendingBody ? await userResponse.pendingBody : userResponse.resolvedBody,
    status: userResponse.status !== 200 ? userResponse.status : void 0,
    redirect: userResponse.status >= 301 && userResponse.status <= 308 && userResponse.headers.get("location") || void 0,
    isStatic,
    prefetch: prefetchBundleNames.length > 0 ? prefetchBundleNames : void 0
  };
  return clientPage;
}
function getPrefetchBundleNames(result, routeBundleNames) {
  const bundleNames = [];
  const addBundle = (bundleName) => {
    if (bundleName && !bundleNames.includes(bundleName)) {
      bundleNames.push(bundleName);
    }
  };
  const addPrefetchResource = (prefetchResources) => {
    if (Array.isArray(prefetchResources)) {
      for (const prefetchResource of prefetchResources) {
        const bundleName = prefetchResource.url.split("/").pop();
        if (bundleName && !bundleNames.includes(bundleName)) {
          addBundle(bundleName);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(result.prefetchResources);
  const manifest = result.manifest || result._manifest;
  const renderedSymbols = result._symbols;
  if (manifest && renderedSymbols) {
    for (const renderedSymbolName of renderedSymbols) {
      const symbol = manifest.symbols[renderedSymbolName];
      if (symbol && symbol.ctxName === "component$") {
        addBundle(manifest.mapping[renderedSymbolName]);
      }
    }
  }
  if (routeBundleNames) {
    for (const routeBundleName of routeBundleNames) {
      addBundle(routeBundleName);
    }
  }
  return bundleNames;
}
function getQwikCityEnvData(requestHeaders, userResponse, locale, mode) {
  const { url, params, pendingBody, resolvedBody, status } = userResponse;
  return {
    url: url.href,
    requestHeaders,
    locale,
    qwikcity: {
      mode,
      params: { ...params },
      response: {
        body: pendingBody || resolvedBody,
        status
      }
    }
  };
}
var noopStream = { write: () => {
} };

// packages/qwik-city/middleware/request-handler/redirect-handler.ts
var RedirectResponse = class {
  constructor(url, status, headers) {
    this.url = url;
    this.location = url;
    this.status = isRedirectStatus(status) ? status : 302 /* Found */;
    this.headers = headers || createHeaders();
    this.headers.set("Location", this.location);
    this.headers.delete("Cache-Control");
  }
};
function redirectResponse(requestCtx, responseRedirect) {
  return requestCtx.response(responseRedirect.status, responseRedirect.headers, async () => {
  });
}
function isRedirectStatus(status) {
  return typeof status === "number" && status >= 301 /* MovedPermanently */ && status <= 308 /* PermanentRedirect */;
}

// packages/qwik-city/middleware/request-handler/cookie.ts
var SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict"
};
var UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7
};
var createSetCookieValue = (cookieName, cookieValue, options) => {
  const c = [`${cookieName}=${cookieValue}`];
  if (typeof options.domain === "string") {
    c.push(`Domain=${options.domain}`);
  }
  if (typeof options.maxAge === "number") {
    c.push(`Max-Age=${options.maxAge}`);
  } else if (Array.isArray(options.maxAge)) {
    c.push(`Max-Age=${options.maxAge[0] * UNIT[options.maxAge[1]]}`);
  } else if (typeof options.expires === "number" || typeof options.expires == "string") {
    c.push(`Expires=${options.expires}`);
  } else if (options.expires instanceof Date) {
    c.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.httpOnly) {
    c.push("HttpOnly");
  }
  if (typeof options.path === "string") {
    c.push(`Path=${options.path}`);
  }
  if (options.sameSite && SAMESITE[options.sameSite]) {
    c.push(`SameSite=${SAMESITE[options.sameSite]}`);
  }
  if (options.secure) {
    c.push("Secure");
  }
  return c.join("; ");
};
var parseCookieString = (cookieString) => {
  const cookie = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const cookieSplit = cookieSegment.split("=");
      if (cookieSplit.length > 1) {
        const cookieName = decodeURIComponent(cookieSplit[0].trim());
        const cookieValue = decodeURIComponent(cookieSplit[1].trim());
        cookie[cookieName] = cookieValue;
      }
    }
  }
  return cookie;
};
var REQ_COOKIE = Symbol("request-cookies");
var RES_COOKIE = Symbol("response-cookies");
var _a2;
var Cookie = class {
  constructor(cookieString) {
    this[_a2] = {};
    this[REQ_COOKIE] = parseCookieString(cookieString);
  }
  get(cookieName) {
    const value = this[REQ_COOKIE][cookieName];
    if (!value) {
      return null;
    }
    return {
      value,
      json() {
        return JSON.parse(value);
      },
      number() {
        return Number(value);
      }
    };
  }
  has(cookieName) {
    return !!this[REQ_COOKIE][cookieName];
  }
  set(cookieName, cookieValue, options = {}) {
    const resolvedValue = typeof cookieValue === "string" ? cookieValue : encodeURIComponent(JSON.stringify(cookieValue));
    this[RES_COOKIE][cookieName] = createSetCookieValue(cookieName, resolvedValue, options);
  }
  delete(name, options) {
    this.set(name, "deleted", { ...options, expires: new Date(0) });
  }
  headers() {
    return Object.values(this[RES_COOKIE]);
  }
};
REQ_COOKIE, _a2 = RES_COOKIE;

// packages/qwik-city/middleware/request-handler/user-response.ts
async function loadUserResponse(requestCtx, params, routeModules, trailingSlash, basePathname = "/") {
  if (routeModules.length === 0) {
    throw new ErrorResponse(404 /* NotFound */, `Not Found`);
  }
  const { request, url, platform } = requestCtx;
  const { pathname } = url;
  const isPageModule = isLastModulePageRoute(routeModules);
  const isPageDataRequest = isPageModule && request.headers.get("Accept") === "application/json";
  const type = isPageDataRequest ? "pagedata" : isPageModule ? "pagehtml" : "endpoint";
  const userResponse = {
    type,
    url,
    params,
    status: 200 /* Ok */,
    headers: createHeaders(),
    resolvedBody: void 0,
    pendingBody: void 0,
    cookie: new Cookie(request.headers.get("cookie")),
    aborted: false
  };
  let hasRequestMethodHandler = false;
  if (isPageModule && pathname !== basePathname) {
    if (trailingSlash) {
      if (!pathname.endsWith("/")) {
        throw new RedirectResponse(pathname + "/" + url.search, 302 /* Found */);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw new RedirectResponse(
          pathname.slice(0, pathname.length - 1) + url.search,
          302 /* Found */
        );
      }
    }
  }
  let routeModuleIndex = -1;
  const abort = () => {
    routeModuleIndex = ABORT_INDEX;
  };
  const redirect = (url2, status) => {
    return new RedirectResponse(url2, status, userResponse.headers);
  };
  const error = (status, message) => {
    return new ErrorResponse(status, message);
  };
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < routeModules.length) {
      const endpointModule = routeModules[routeModuleIndex];
      let reqHandler = void 0;
      switch (request.method) {
        case "GET": {
          reqHandler = endpointModule.onGet;
          break;
        }
        case "POST": {
          reqHandler = endpointModule.onPost;
          break;
        }
        case "PUT": {
          reqHandler = endpointModule.onPut;
          break;
        }
        case "PATCH": {
          reqHandler = endpointModule.onPatch;
          break;
        }
        case "OPTIONS": {
          reqHandler = endpointModule.onOptions;
          break;
        }
        case "HEAD": {
          reqHandler = endpointModule.onHead;
          break;
        }
        case "DELETE": {
          reqHandler = endpointModule.onDelete;
          break;
        }
      }
      reqHandler = reqHandler || endpointModule.onRequest;
      if (typeof reqHandler === "function") {
        hasRequestMethodHandler = true;
        const response = {
          get status() {
            return userResponse.status;
          },
          set status(code) {
            userResponse.status = code;
          },
          get headers() {
            return userResponse.headers;
          },
          get locale() {
            return requestCtx.locale;
          },
          set locale(locale) {
            requestCtx.locale = locale;
          },
          redirect,
          error
        };
        const requestEv = {
          request,
          url: new URL(url),
          params: { ...params },
          response,
          platform,
          cookie: userResponse.cookie,
          next,
          abort
        };
        const syncData = reqHandler(requestEv);
        if (typeof syncData === "function") {
          userResponse.pendingBody = createPendingBody(syncData);
        } else if (syncData !== null && typeof syncData === "object" && typeof syncData.then === "function") {
          const asyncResolved = await syncData;
          if (typeof asyncResolved === "function") {
            userResponse.pendingBody = createPendingBody(asyncResolved);
          } else {
            userResponse.resolvedBody = asyncResolved;
          }
        } else {
          userResponse.resolvedBody = syncData;
        }
      }
      routeModuleIndex++;
    }
  };
  await next();
  userResponse.aborted = routeModuleIndex >= ABORT_INDEX;
  for (const setCookieValue of userResponse.cookie.headers()) {
    userResponse.headers.set("Set-Cookie", setCookieValue);
  }
  if (!isPageDataRequest && isRedirectStatus(userResponse.status) && userResponse.headers.has("Location")) {
    throw new RedirectResponse(
      userResponse.headers.get("Location"),
      userResponse.status,
      userResponse.headers
    );
  }
  if (type === "endpoint" && !hasRequestMethodHandler) {
    throw new ErrorResponse(405 /* MethodNotAllowed */, `Method Not Allowed`);
  }
  return userResponse;
}
function createPendingBody(cb) {
  return new Promise((resolve, reject) => {
    try {
      const rtn = cb();
      if (rtn !== null && typeof rtn === "object" && typeof rtn.then === "function") {
        rtn.then(resolve, reject);
      } else {
        resolve(rtn);
      }
    } catch (e) {
      reject(e);
    }
  });
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function updateRequestCtx(requestCtx, trailingSlash) {
  let pathname = requestCtx.url.pathname;
  if (pathname.endsWith(QDATA_JSON)) {
    requestCtx.request.headers.set("Accept", "application/json");
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
    requestCtx.url.pathname = pathname;
  }
}
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;
var ABORT_INDEX = 999999999;

// packages/qwik-city/middleware/request-handler/request-handler.ts
async function requestHandler(mode, requestCtx, opts) {
  try {
    const { render, qwikCityPlan: qwikCityPlan2 } = opts;
    const { routes, menus, cacheModules, trailingSlash, basePathname } = qwikCityPlan2;
    updateRequestCtx(requestCtx, trailingSlash);
    const loadedRoute = await loadRoute(routes, menus, cacheModules, requestCtx.url.pathname);
    if (loadedRoute) {
      const [params, mods, _, routeBundleNames] = loadedRoute;
      const userResponse = await loadUserResponse(
        requestCtx,
        params,
        mods,
        trailingSlash,
        basePathname
      );
      if (userResponse.aborted) {
        return null;
      }
      if (userResponse.type === "endpoint") {
        const endpointResult = await endpointHandler(requestCtx, userResponse);
        return endpointResult;
      }
      const pageResult = await pageHandler(
        mode,
        requestCtx,
        userResponse,
        render,
        opts,
        routeBundleNames
      );
      return pageResult;
    }
  } catch (e) {
    if (e instanceof RedirectResponse) {
      return redirectResponse(requestCtx, e);
    }
    if (e instanceof ErrorResponse) {
      return errorResponse(requestCtx, e);
    }
    return errorHandler(requestCtx, e);
  }
  return null;
}

// packages/qwik-city/middleware/cloudflare-pages/index.ts
import qwikCityPlan from "@qwik-city-plan";
function createQwikCity(opts) {
  async function onRequest({ request, env, waitUntil }) {
    try {
      const url = new URL(request.url);
      const useCache = url.hostname !== "127.0.0.1" && url.hostname !== "localhost" && url.port === "" && request.method === "GET";
      const cacheKey = new Request(url.href, request);
      const cache = useCache ? await caches.open("custom:qwikcity") : null;
      if (cache) {
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }
      }
      const requestCtx = {
        locale: void 0,
        url,
        request,
        response: (status, headers, body) => {
          return new Promise((resolve) => {
            let flushedHeaders = false;
            const { readable, writable } = new TransformStream();
            const writer = writable.getWriter();
            const response = new Response(readable, { status, headers });
            body({
              write: (chunk) => {
                if (!flushedHeaders) {
                  flushedHeaders = true;
                  resolve(response);
                }
                if (typeof chunk === "string") {
                  const encoder = new TextEncoder();
                  writer.write(encoder.encode(chunk));
                } else {
                  writer.write(chunk);
                }
              }
            }).finally(() => {
              if (!flushedHeaders) {
                flushedHeaders = true;
                resolve(response);
              }
              writer.close();
            });
            if (response.ok && cache && response.headers.has("Cache-Control")) {
              waitUntil(cache.put(cacheKey, response.clone()));
            }
          });
        },
        platform: env
      };
      const handledResponse = await requestHandler("server", requestCtx, opts);
      if (handledResponse) {
        return handledResponse;
      }
      const notFoundResponse = await notFoundHandler(requestCtx);
      return notFoundResponse;
    } catch (e) {
      console.error(e);
      return new Response(String(e || "Error"), {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  }
  return onRequest;
}
function qwikCity(render, opts) {
  return createQwikCity({ render, qwikCityPlan, ...opts });
}
export {
  createQwikCity,
  qwikCity
};
