"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/qwik-city/middleware/request-handler/index.ts
var request_handler_exports = {};
__export(request_handler_exports, {
  createHeaders: () => createHeaders,
  getErrorHtml: () => getErrorHtml,
  mergeHeadersCookies: () => mergeHeadersCookies,
  requestHandler: () => requestHandler
});
module.exports = __toCommonJS(request_handler_exports);

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
function getErrorHtml(status, e) {
  let message = "Server Error";
  if (e != null) {
    if (typeof e.message === "string") {
      message = e.message;
    } else {
      message = String(e);
    }
  }
  return minimalHtmlResponse(status, message);
}
function minimalHtmlResponse(status, message) {
  if (typeof status !== "number") {
    status = 500;
  }
  if (typeof message === "string") {
    message = escapeHtml(message);
  } else {
    message = "";
  }
  const width = typeof message === "string" ? "600px" : "300px";
  const color = status >= 500 ? COLOR_500 : COLOR_400;
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Status" content="${status}">
  <title>${status} ${message}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { color: ${color}; background-color: #fafafa; padding: 30px; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif; }
    p { max-width: ${width}; margin: 60px auto 30px auto; background: white; border-radius: 4px; box-shadow: 0px 0px 50px -20px ${color}; overflow: hidden; }
    strong { display: inline-block; padding: 15px; background: ${color}; color: white; }
    span { display: inline-block; padding: 15px; }
  </style>
</head>
<body><p><strong>${status}</strong> <span>${message}</span></p></body>
</html>`;
}
var ESCAPE_HTML = /[&<>]/g;
var escapeHtml = (s) => {
  return s.replace(ESCAPE_HTML, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return "";
    }
  });
};
var COLOR_400 = "#006ce9";
var COLOR_500 = "#713fc2";

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
        cookie[decodeURIComponent(cookieSplit[0].trim())] = decodeURIComponent(
          cookieSplit[1].trim()
        );
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
  getAll() {
    return Object.keys(this[REQ_COOKIE]).reduce((cookies, cookieName) => {
      cookies[cookieName] = this.get(cookieName);
      return cookies;
    }, {});
  }
  has(cookieName) {
    return !!this[REQ_COOKIE][cookieName];
  }
  set(cookieName, cookieValue, options = {}) {
    const resolvedValue = typeof cookieValue === "string" ? cookieValue : encodeURIComponent(JSON.stringify(cookieValue));
    this[RES_COOKIE][cookieName] = createSetCookieValue(cookieName, resolvedValue, options);
  }
  delete(name, options) {
    this.set(name, "deleted", { ...options, maxAge: 0 });
  }
  headers() {
    return Object.values(this[RES_COOKIE]);
  }
};
REQ_COOKIE, _a2 = RES_COOKIE;
var mergeHeadersCookies = (headers, cookies) => {
  const cookieHeaders = cookies.headers();
  if (cookieHeaders.length > 0) {
    const newHeaders = new Headers(headers);
    for (const cookie of cookieHeaders) {
      newHeaders.append("Set-Cookie", cookie);
    }
    return newHeaders;
  }
  return headers;
};

// packages/qwik-city/middleware/request-handler/redirect-handler.ts
var AbortMessage = class {
};
var RedirectMessage = class extends AbortMessage {
};

// packages/qwik-city/runtime/src/constants.ts
var MODULE_CACHE = /* @__PURE__ */ new WeakMap();
var QACTION_KEY = "qaction";

// packages/qwik-city/utils/format.ts
function validateSerializable(val) {
  JSON.stringify(val);
  if (!isSerializable(val)) {
    throw new Error(`Unable to serialize value.`);
  }
}
function isSerializable(val) {
  if (val == null || typeof val === "string" || typeof val === "boolean" || typeof val === "number") {
    return true;
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      if (!isSerializable(item)) {
        return false;
      }
    }
    return true;
  }
  if (val.constructor == null || val.constructor === Object) {
    for (const prop in val) {
      if (!isSerializable(val[prop])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// packages/qwik-city/middleware/request-handler/resolve-request-handlers.ts
var resolveRequestHandlers = (routeModules, method) => {
  const requestHandlers = [];
  const serverLoaders = [];
  const serverActions = [];
  for (const routeModule of routeModules) {
    if (typeof routeModule.onRequest === "function") {
      requestHandlers.push(routeModule.onRequest);
    } else if (Array.isArray(routeModule.onRequest)) {
      requestHandlers.push(...routeModule.onRequest);
    }
    let methodReqHandler;
    switch (method) {
      case "GET": {
        methodReqHandler = routeModule.onGet;
        break;
      }
      case "POST": {
        methodReqHandler = routeModule.onPost;
        break;
      }
      case "PUT": {
        methodReqHandler = routeModule.onPut;
        break;
      }
      case "PATCH": {
        methodReqHandler = routeModule.onPatch;
        break;
      }
      case "DELETE": {
        methodReqHandler = routeModule.onDelete;
        break;
      }
      case "OPTIONS": {
        methodReqHandler = routeModule.onOptions;
        break;
      }
      case "HEAD": {
        methodReqHandler = routeModule.onHead;
        break;
      }
    }
    if (typeof methodReqHandler === "function") {
      requestHandlers.push(methodReqHandler);
    } else if (Array.isArray(methodReqHandler)) {
      requestHandlers.push(...methodReqHandler);
    }
    const loaders = Object.values(routeModule).filter(
      (e) => e.__brand === "server_loader"
    );
    const actions = Object.values(routeModule).filter(
      (e) => e.__brand === "server_action"
    );
    serverLoaders.push(...loaders);
    serverActions.push(...actions);
  }
  if (serverLoaders.length + actionsMiddleware.length > 0) {
    requestHandlers.push(actionsMiddleware(serverLoaders, serverActions));
  }
  return requestHandlers;
};
function actionsMiddleware(serverLoaders, serverActions) {
  return async (requestEv) => {
    if (requestEv.headersSent) {
      requestEv.exit();
      return;
    }
    const { method } = requestEv;
    const loaders = getRequestLoaders(requestEv);
    if (method === "POST") {
      const selectedAction = requestEv.query.get(QACTION_KEY);
      if (selectedAction) {
        const action = serverActions.find((a) => a.__qrl.getHash() === selectedAction);
        if (action) {
          setRequestAction(requestEv, selectedAction);
          const formData = await requestEv.request.formData();
          const actionResolved = await action.__qrl(formData, requestEv);
          loaders[selectedAction] = actionResolved;
        }
      }
    }
    if (serverLoaders.length > 0) {
      const isDevMode = getRequestMode(requestEv) === "dev";
      await Promise.all(
        serverLoaders.map(async (loader) => {
          const loaderId = loader.__qrl.getHash();
          const loaderResolved = await loader.__qrl(requestEv);
          loaders[loaderId] = typeof loaderResolved === "function" ? loaderResolved() : loaderResolved;
          if (isDevMode) {
            try {
              validateSerializable(loaderResolved);
            } catch (e) {
              throw Object.assign(e, {
                id: "DEV_SERIALIZE",
                method
              });
            }
          }
        })
      );
    }
  };
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
var encoder = /* @__PURE__ */ new TextEncoder();

// packages/qwik-city/middleware/request-handler/cache-control.ts
function createCacheControl(cacheControl) {
  const controls = [];
  if (cacheControl.immutable) {
    controls.push("immutable");
  }
  if (cacheControl.maxAge) {
    controls.push(`max-age=${cacheControl.maxAge}`);
  }
  if (cacheControl.sMaxAge) {
    controls.push(`s-maxage=${cacheControl.sMaxAge}`);
  }
  if (cacheControl.noStore) {
    controls.push("no-store");
  }
  if (cacheControl.noCache) {
    controls.push("no-cache");
  }
  if (cacheControl.private) {
    controls.push("private");
  }
  if (cacheControl.public) {
    controls.push("public");
  }
  if (cacheControl.staleWhileRevalidate) {
    controls.push(`stale-while-revalidate=${cacheControl.staleWhileRevalidate}`);
  }
  return controls.join(", ");
}

// packages/qwik-city/middleware/request-handler/request-event.ts
var RequestEvLoaders = Symbol("RequestEvLoaders");
var RequestEvLocale = Symbol("RequestEvLocale");
var RequestEvMode = Symbol("RequestEvMode");
var RequestEvStatus = Symbol("RequestEvStatus");
var RequestEvAction = Symbol("RequestEvAction");
function createRequestEvent(serverRequestEv, params, requestHandlers, resolved) {
  const { request, platform } = serverRequestEv;
  const cookie = new Cookie(request.headers.get("cookie"));
  const headers = createHeaders();
  const url = new URL(request.url);
  let routeModuleIndex = -1;
  let writableStream = null;
  const next = async () => {
    routeModuleIndex++;
    while (routeModuleIndex < requestHandlers.length) {
      const moduleRequestHandler = requestHandlers[routeModuleIndex];
      const result = moduleRequestHandler(requestEv);
      if (result instanceof Promise) {
        await result;
      }
      routeModuleIndex++;
    }
  };
  const check = () => {
    if (writableStream !== null) {
      throw new Error("Response already sent");
    }
  };
  const send = (statusCode, body) => {
    check();
    requestEv[RequestEvStatus] = statusCode;
    const writableStream2 = requestEv.getWritableStream();
    const writer = writableStream2.getWriter();
    writer.write(typeof body === "string" ? encoder.encode(body) : body);
    writer.close();
    return new AbortMessage();
  };
  const loaders = {};
  const requestEv = {
    [RequestEvLoaders]: loaders,
    [RequestEvLocale]: serverRequestEv.locale,
    [RequestEvMode]: serverRequestEv.mode,
    [RequestEvStatus]: 200,
    [RequestEvAction]: void 0,
    cookie,
    headers,
    method: request.method,
    params,
    pathname: url.pathname,
    platform,
    query: url.searchParams,
    request,
    url,
    sharedMap: /* @__PURE__ */ new Map(),
    get headersSent() {
      return writableStream !== null;
    },
    get exited() {
      return routeModuleIndex >= ABORT_INDEX;
    },
    next,
    exit: () => {
      routeModuleIndex = ABORT_INDEX;
      return new AbortMessage();
    },
    cacheControl: (cacheControl) => {
      check();
      headers.set("Cache-Control", createCacheControl(cacheControl));
    },
    getData: (loaderOrAction) => {
      const id = loaderOrAction.__qrl.getHash();
      if (loaderOrAction.__brand === "server_loader") {
        if (id in loaders) {
          throw new Error("Loader data does not exist");
        }
      }
      return loaders[id];
    },
    status: (statusCode) => {
      if (typeof statusCode === "number") {
        check();
        requestEv[RequestEvStatus] = statusCode;
        return statusCode;
      }
      return requestEv[RequestEvStatus];
    },
    locale: (locale) => {
      if (typeof locale === "string") {
        requestEv[RequestEvLocale] = locale;
      }
      return requestEv[RequestEvLocale] || "";
    },
    error: (statusCode, message) => {
      requestEv[RequestEvStatus] = statusCode;
      headers.delete("Cache-Control");
      return new ErrorResponse(statusCode, message);
    },
    redirect: (statusCode, url2) => {
      check();
      requestEv[RequestEvStatus] = statusCode;
      headers.set("Location", url2);
      headers.delete("Cache-Control");
      if (statusCode > 301) {
        headers.set("Cache-Control", "no-store");
      }
      return new RedirectMessage();
    },
    fail: (statusCode, data) => {
      check();
      requestEv[RequestEvStatus] = statusCode;
      headers.delete("Cache-Control");
      return data;
    },
    text: (statusCode, text) => {
      headers.set("Content-Type", "text/plain; charset=utf-8");
      return send(statusCode, text);
    },
    html: (statusCode, html) => {
      headers.set("Content-Type", "text/html; charset=utf-8");
      return send(statusCode, html);
    },
    json: (statusCode, data) => {
      headers.set("Content-Type", "application/json; charset=utf-8");
      return send(statusCode, JSON.stringify(data));
    },
    send,
    getWritableStream: () => {
      if (writableStream === null) {
        writableStream = serverRequestEv.getWritableStream(
          requestEv[RequestEvStatus],
          headers,
          cookie,
          resolved,
          requestEv
        );
      }
      return writableStream;
    }
  };
  return requestEv;
}
function getRequestLoaders(requestEv) {
  return requestEv[RequestEvLoaders];
}
function getRequestAction(requestEv) {
  return requestEv[RequestEvAction];
}
function setRequestAction(requestEv, id) {
  requestEv[RequestEvAction] = id;
}
function getRequestMode(requestEv) {
  return requestEv[RequestEvMode];
}
var ABORT_INDEX = 999999999;

// packages/qwik-city/middleware/request-handler/user-response.ts
function runQwikCity(serverRequestEv, params, requestHandlers, isPage, trailingSlash = true, basePathname = "/") {
  if (requestHandlers.length === 0) {
    throw new ErrorResponse(404 /* NotFound */, `Not Found`);
  }
  let resolve;
  const responsePromise = new Promise((r) => resolve = r);
  const requestEv = createRequestEvent(serverRequestEv, params, requestHandlers, resolve);
  return {
    response: responsePromise,
    requestEv,
    completion: runNext(requestEv, isPage, trailingSlash, basePathname, resolve)
  };
}
async function runNext(requestEv, isPage, trailingSlash, basePathname, resolve) {
  try {
    const { pathname, url } = requestEv;
    if (isPage && !isQDataJson(pathname) && pathname !== basePathname && !pathname.endsWith(".html")) {
      if (trailingSlash) {
        if (!pathname.endsWith("/")) {
          throw requestEv.redirect(302 /* Found */, pathname + "/" + url.search);
        }
      } else {
        if (pathname.endsWith("/")) {
          throw requestEv.redirect(
            302 /* Found */,
            pathname.slice(0, pathname.length - 1) + url.search
          );
        }
      }
    }
    await requestEv.next();
  } catch (e) {
    if (e instanceof RedirectMessage) {
      requestEv.getWritableStream().close();
    } else if (e instanceof ErrorResponse) {
      if (!requestEv.headersSent) {
        const html = getErrorHtml(e.status, e);
        requestEv.html(e.status, html);
      }
      console.error(e);
    } else if (!(e instanceof AbortMessage)) {
      if (!requestEv.headersSent) {
        requestEv.status(500 /* InternalServerError */);
      }
      throw e;
    }
  }
  resolve(null);
  return requestEv;
}
function getRouteMatchPathname(pathname, trailingSlash) {
  if (pathname.endsWith(QDATA_JSON)) {
    const trimEnd = pathname.length - QDATA_JSON_LEN + (trailingSlash ? 1 : 0);
    pathname = pathname.slice(0, trimEnd);
    if (pathname === "") {
      pathname = "/";
    }
  }
  return pathname;
}
var isQDataJson = (pathname) => {
  return pathname.endsWith(QDATA_JSON);
};
var QDATA_JSON = "/q-data.json";
var QDATA_JSON_LEN = QDATA_JSON.length;

// packages/qwik-city/runtime/src/routing.ts
var loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const match = route[0].exec(pathname);
      if (match) {
        const loaders = route[1];
        const params = getPathParams(route[2], match);
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
    pathname = pathname.endsWith("/") ? pathname : pathname + "/";
    const menu = menus.find(
      (m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/"))
    );
    if (menu) {
      return menu[1];
    }
  }
};
var getPathParams = (paramNames, match) => {
  const params = {};
  let i;
  let param;
  if (paramNames) {
    for (i = 0; i < paramNames.length; i++) {
      param = match ? match[i + 1] : "";
      params[paramNames[i]] = param.endsWith("/") ? param.slice(0, -1) : param;
    }
  }
  return params;
};

// packages/qwik-city/middleware/request-handler/response-page.ts
function getQwikCityEnvData(requestEv) {
  const { url, params, request, status, locale } = requestEv;
  const requestHeaders = {};
  request.headers.forEach((value, key) => requestHeaders[key] = value);
  return {
    url: new URL(url.pathname + url.search, url).href,
    requestHeaders,
    locale: locale(),
    qwikcity: {
      params: { ...params },
      response: {
        status: status(),
        loaders: getRequestLoaders(requestEv),
        action: getRequestAction(requestEv)
      }
    }
  };
}

// packages/qwik-city/middleware/request-handler/render-middleware.ts
function renderQwikMiddleware(render, opts) {
  return async (requestEv) => {
    if (requestEv.headersSent) {
      return;
    }
    const isPageDataReq = requestEv.pathname.endsWith(QDATA_JSON);
    if (isPageDataReq) {
      return;
    }
    const requestHeaders = {};
    requestEv.request.headers.forEach((value, key) => requestHeaders[key] = value);
    const responseHeaders = requestEv.headers;
    if (!responseHeaders.has("Content-Type")) {
      responseHeaders.set("Content-Type", "text/html; charset=utf-8");
    }
    const { readable, writable } = new TextEncoderStream();
    const writableStream = requestEv.getWritableStream();
    const pipe = readable.pipeTo(writableStream);
    const stream = writable.getWriter();
    const status = requestEv.status();
    try {
      const result = await render({
        stream,
        envData: getQwikCityEnvData(requestEv),
        ...opts
      });
      const qData = {
        loaders: getRequestLoaders(requestEv),
        action: getRequestAction(requestEv),
        status: status !== 200 ? status : 200,
        href: getPathname(requestEv.url, true),
        isStatic: result.isStatic
      };
      if ((typeof result).html === "string") {
        await stream.write(result.html);
      }
      requestEv.sharedMap.set("qData", qData);
    } finally {
      await stream.ready;
      await stream.close();
      await pipe;
    }
  };
}
async function renderQData(requestEv) {
  const isPageDataReq = isQDataJson(requestEv.pathname);
  if (isPageDataReq) {
    try {
      await requestEv.next();
    } catch (err) {
      if (!(err instanceof RedirectMessage)) {
        throw err;
      }
    }
    if (requestEv.headersSent || requestEv.exited) {
      return;
    }
    const status = requestEv.status();
    const location = requestEv.headers.get("Location");
    const isRedirect = status >= 301 && status <= 308 && location;
    if (isRedirect) {
      requestEv.headers.set("Location", makeQDataPath(location));
      requestEv.getWritableStream().close();
      return;
    }
    const requestHeaders = {};
    requestEv.request.headers.forEach((value, key) => requestHeaders[key] = value);
    requestEv.headers.set("Content-Type", "application/json; charset=utf-8");
    const qData = {
      loaders: getRequestLoaders(requestEv),
      action: getRequestAction(requestEv),
      status: status !== 200 ? status : 200,
      href: getPathname(requestEv.url, true)
    };
    const writer = requestEv.getWritableStream().getWriter();
    writer.write(encoder2.encode(serializeData(qData)));
    requestEv.sharedMap.set("qData", qData);
    writer.close();
  }
}
function serializeData(data) {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof FormData) {
      return {
        __brand: "formdata",
        value: formDataToArray(value)
      };
    }
    return value;
  });
}
function formDataToArray(formData) {
  const array = [];
  formData.forEach((value, key) => {
    if (typeof value === "string") {
      array.push([key, value]);
    } else {
      array.push([key, value.name]);
    }
  });
  return array;
}
function makeQDataPath(href) {
  const append = QDATA_JSON;
  const url = new URL(href, "http://localhost");
  const pathname = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
  return pathname + (append.startsWith("/") ? "" : "/") + append + url.search;
}
function getPathname(url, trailingSlash) {
  if (url.pathname.endsWith(QDATA_JSON)) {
    return url.pathname.slice(0, -QDATA_JSON.length + (trailingSlash ? 1 : 0)) + url.search;
  }
  return url.pathname;
}
var encoder2 = /* @__PURE__ */ new TextEncoder();

// packages/qwik-city/middleware/request-handler/request-handler.ts
async function requestHandler(serverRequestEv, opts) {
  const { render, qwikCityPlan } = opts;
  const { routes, menus, cacheModules, trailingSlash, basePathname } = qwikCityPlan;
  const pathname = serverRequestEv.url.pathname;
  const matchPathname = getRouteMatchPathname(pathname, trailingSlash);
  const loadedRoute = await loadRequestHandlers(
    routes,
    menus,
    cacheModules,
    matchPathname,
    serverRequestEv.request.method,
    render
  );
  if (loadedRoute) {
    return handleErrors(
      runQwikCity(
        serverRequestEv,
        loadedRoute[0],
        loadedRoute[1],
        loadedRoute[2],
        trailingSlash,
        basePathname
      )
    );
  }
  return null;
}
async function loadRequestHandlers(routes, menus, cacheModules, pathname, method, renderFn) {
  const route = await loadRoute(routes, menus, cacheModules, pathname);
  if (route) {
    let isPageRoute = false;
    const requestHandlers = resolveRequestHandlers(route[1], method);
    if (isLastModulePageRoute(route[1])) {
      requestHandlers.unshift(renderQData);
      requestHandlers.push(renderQwikMiddleware(renderFn));
      isPageRoute = true;
    }
    return [route[0], requestHandlers, isPageRoute];
  }
  return null;
}
function handleErrors(run) {
  const requestEv = run.requestEv;
  return {
    response: run.response,
    requestEv,
    completion: run.completion.then(
      () => {
        if (requestEv.headersSent) {
          requestEv.getWritableStream();
        }
      },
      (e) => {
        console.error(e);
        const status = requestEv.status();
        const html = getErrorHtml(status, e);
        if (requestEv.headersSent) {
          const writableStream = requestEv.getWritableStream();
          if (!writableStream.locked) {
            return writableStream.close();
          }
        } else {
          requestEv.html(status, html);
        }
      }
    ).then(() => requestEv)
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createHeaders,
  getErrorHtml,
  mergeHeadersCookies,
  requestHandler
});
