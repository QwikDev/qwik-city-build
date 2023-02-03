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
  getErrorHtml: () => getErrorHtml,
  mergeHeadersCookies: () => mergeHeadersCookies,
  requestHandler: () => requestHandler
});
module.exports = __toCommonJS(request_handler_exports);

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
var _a;
var Cookie = class {
  constructor(cookieString) {
    this[_a] = {};
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
REQ_COOKIE, _a = RES_COOKIE;
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
var import_qwik = require("@builder.io/qwik");

// packages/qwik-city/middleware/request-handler/response-page.ts
function getQwikCityServerData(requestEv) {
  const { url, params, request, status, locale } = requestEv;
  const requestHeaders = {};
  request.headers.forEach((value, key) => requestHeaders[key] = value);
  const action = getRequestAction(requestEv);
  const formData = requestEv.sharedMap.get("actionFormData");
  return {
    url: new URL(url.pathname + url.search, url).href,
    requestHeaders,
    locale: locale(),
    qwikcity: {
      // mode: getRequestMode(requestEv),
      params: { ...params },
      loadedRoute: getRequestRoute(requestEv),
      response: {
        status: status(),
        loaders: getRequestLoaders(requestEv),
        action,
        formData
      }
    }
  };
}

// packages/qwik-city/middleware/request-handler/resolve-request-handlers.ts
var resolveRequestHandlers = (serverPlugins, route, method, renderHandler) => {
  const serverLoaders = [];
  const requestHandlers = [];
  const isPageRoute = !!(route && isLastModulePageRoute(route[1]));
  if (serverPlugins) {
    _resolveRequestHandlers(serverLoaders, requestHandlers, serverPlugins, isPageRoute, method);
  }
  if (route) {
    if (isPageRoute) {
      requestHandlers.push(fixTrailingSlash);
      requestHandlers.push(renderQData);
    }
    _resolveRequestHandlers(serverLoaders, requestHandlers, route[1], isPageRoute, method);
    if (isPageRoute) {
      if (serverLoaders.length + actionsMiddleware.length > 0) {
        requestHandlers.push(actionsMiddleware(serverLoaders));
      }
      requestHandlers.push(renderHandler);
    }
  }
  if (requestHandlers.length > 0) {
    requestHandlers.unshift(securityMiddleware);
  }
  return requestHandlers;
};
var _resolveRequestHandlers = (serverLoaders, requestHandlers, routeModules, collectActions, method) => {
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
    if (collectActions) {
      const loaders = Object.values(routeModule).filter(
        (e) => checkBrand(e, "server_loader")
      );
      serverLoaders.push(...loaders);
    }
  }
};
var checkBrand = (obj, brand) => {
  return obj && typeof obj === "object" && obj.__brand === brand;
};
function actionsMiddleware(serverLoaders) {
  return async (requestEv) => {
    if (requestEv.headersSent) {
      requestEv.exit();
      return;
    }
    const { method } = requestEv;
    const loaders = getRequestLoaders(requestEv);
    if (method === "POST") {
      const selectedAction = requestEv.query.get(QACTION_KEY);
      const serverActionsMap = globalThis._qwikActionsMap;
      if (selectedAction && serverActionsMap) {
        const action = serverActionsMap.get(selectedAction);
        if (action) {
          setRequestAction(requestEv, selectedAction);
          const isForm = isFormContentType(requestEv.request.headers);
          const req = requestEv.request.clone();
          let data;
          if (isForm) {
            const formData = await req.formData();
            requestEv.sharedMap.set("actionFormData", formData);
            data = formToObj(formData);
          } else {
            data = await req.json();
          }
          let failed = false;
          if (action.__schema) {
            const validator = await action.__schema;
            const result = await validator.safeParseAsync(data);
            if (!result.success) {
              failed = true;
              if (globalThis.qDev) {
                console.error(
                  "\nVALIDATION ERROR\naction$() zod validated failed",
                  "\n\n  - Received:",
                  data,
                  "\n  - Issues:",
                  result.error.issues
                );
              }
              loaders[selectedAction] = {
                __brand: "fail",
                ...result.error.flatten()
              };
            } else {
              data = result.data;
            }
          }
          if (!failed) {
            const actionResolved = await action.__qrl(data, requestEv);
            loaders[selectedAction] = actionResolved;
          }
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
var formToObj = (formData) => {
  const obj = {};
  formData.forEach((value, key) => {
    const keys = key.split(".").filter((k) => k);
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      if (i === keys.length - 1) {
        if (k.endsWith("[]")) {
          k = k.slice(0, -2);
          current[k] = current[k] || [];
          current[k].push(value);
        } else {
          current[k] = value;
        }
      } else {
        current = current[k] = {};
      }
    }
  });
  return obj;
};
function fixTrailingSlash({ pathname, url, redirect }) {
  const trailingSlash = true;
  const basePathname = "/";
  if (!isQDataJson(pathname) && pathname !== basePathname && !pathname.endsWith(".html")) {
    if (trailingSlash) {
      if (!pathname.endsWith("/")) {
        throw redirect(302 /* Found */, pathname + "/" + url.search);
      }
    } else {
      if (pathname.endsWith("/")) {
        throw redirect(302 /* Found */, pathname.slice(0, pathname.length - 1) + url.search);
      }
    }
  }
}
function isLastModulePageRoute(routeModules) {
  const lastRouteModule = routeModules[routeModules.length - 1];
  return lastRouteModule && typeof lastRouteModule.default === "function";
}
function getPathname(url, trailingSlash) {
  if (url.pathname.endsWith(QDATA_JSON)) {
    return url.pathname.slice(0, -QDATA_JSON.length + (trailingSlash ? 1 : 0)) + url.search;
  }
  return url.pathname;
}
var encoder = /* @__PURE__ */ new TextEncoder();
function securityMiddleware({ method, url, request, error }) {
  const forbidden = method === "POST" && request.headers.get("origin") !== url.origin && isFormContentType(request.headers);
  if (forbidden) {
    throw error(403, `Cross-site ${request.method} form submissions are forbidden`);
  }
}
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
      const isStatic = getRequestMode(requestEv) === "static";
      const result = await render({
        stream,
        serverData: getQwikCityServerData(requestEv),
        containerAttributes: {
          ["q:render"]: isStatic ? "static" : ""
        }
      });
      const qData = {
        loaders: getRequestLoaders(requestEv),
        action: getRequestAction(requestEv),
        status: status !== 200 ? status : 200,
        href: getPathname(requestEv.url, true)
        // todo
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
      const adaptedLocation = makeQDataPath(location);
      if (adaptedLocation) {
        requestEv.headers.set("Location", adaptedLocation);
        requestEv.getWritableStream().close();
        return;
      } else {
        requestEv.status(200);
        requestEv.headers.delete("Location");
      }
    }
    const requestHeaders = {};
    requestEv.request.headers.forEach((value, key) => requestHeaders[key] = value);
    requestEv.headers.set("Content-Type", "application/json; charset=utf-8");
    const qData = {
      loaders: getRequestLoaders(requestEv),
      action: getRequestAction(requestEv),
      status: status !== 200 ? status : 200,
      href: getPathname(requestEv.url, true),
      // todo
      redirect: location ?? void 0
    };
    const writer = requestEv.getWritableStream().getWriter();
    writer.write(encoder.encode((0, import_qwik._serializeData)(qData)));
    requestEv.sharedMap.set("qData", qData);
    writer.close();
  }
}
function makeQDataPath(href) {
  if (href.startsWith("/")) {
    const append = QDATA_JSON;
    const url = new URL(href, "http://localhost");
    const pathname = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    return pathname + (append.startsWith("/") ? "" : "/") + append + url.search;
  } else {
    return void 0;
  }
}

// packages/qwik-city/middleware/request-handler/cache-control.ts
function createCacheControl(cacheControl) {
  const controls = [];
  if (cacheControl === "day") {
    cacheControl = 60 * 60 * 24;
  } else if (cacheControl === "week") {
    cacheControl = 60 * 60 * 24 * 7;
  } else if (cacheControl === "month") {
    cacheControl = 60 * 60 * 24 * 30;
  } else if (cacheControl === "year") {
    cacheControl = 60 * 60 * 24 * 365;
  } else if (cacheControl === "private") {
    cacheControl = {
      private: true,
      noCache: true
    };
  } else if (cacheControl === "immutable") {
    cacheControl = {
      public: true,
      immutable: true,
      maxAge: 60 * 60 * 24 * 365,
      staleWhileRevalidate: 60 * 60 * 24 * 365
    };
  } else if (cacheControl === "no-cache") {
    cacheControl = {
      noCache: true
    };
  }
  if (typeof cacheControl === "number") {
    cacheControl = {
      maxAge: cacheControl,
      sMaxAge: cacheControl,
      staleWhileRevalidate: cacheControl
    };
  }
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
var RequestEvRoute = Symbol("RequestEvRoute");
var RequestEvAction = Symbol("RequestEvAction");
var RequestEvTrailingSlash = Symbol("RequestEvTrailingSlash");
var RequestEvBasePathname = Symbol("RequestEvBasePathname");
function createRequestEvent(serverRequestEv, loadedRoute, requestHandlers, trailingSlash = true, basePathname = "/", resolved) {
  const { request, platform, env } = serverRequestEv;
  const cookie = new Cookie(request.headers.get("cookie"));
  const headers = new Headers();
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
  const send = (statusOrResponse, body) => {
    check();
    if (typeof statusOrResponse === "number") {
      requestEv[RequestEvStatus] = statusOrResponse;
      const writableStream2 = requestEv.getWritableStream();
      const writer = writableStream2.getWriter();
      writer.write(typeof body === "string" ? encoder.encode(body) : body);
      writer.close();
    } else {
      const status = statusOrResponse.status;
      requestEv[RequestEvStatus] = status;
      statusOrResponse.headers.forEach((value, key) => {
        headers.append(key, value);
      });
      if (statusOrResponse.body) {
        const writableStream2 = requestEv.getWritableStream();
        statusOrResponse.body.pipeTo(writableStream2);
      } else {
        if (status >= 300 && status < 400) {
          return new RedirectMessage();
        } else {
          requestEv.getWritableStream().getWriter().close();
        }
      }
    }
    return new AbortMessage();
  };
  const loaders = {};
  const requestEv = {
    [RequestEvLoaders]: loaders,
    [RequestEvLocale]: serverRequestEv.locale,
    [RequestEvMode]: serverRequestEv.mode,
    [RequestEvStatus]: 200,
    [RequestEvAction]: void 0,
    [RequestEvTrailingSlash]: trailingSlash,
    [RequestEvBasePathname]: basePathname,
    [RequestEvRoute]: loadedRoute,
    cookie,
    headers,
    env,
    method: request.method,
    params: (loadedRoute == null ? void 0 : loadedRoute[0]) ?? {},
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
      return {
        __brand: "fail",
        ...data
      };
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
function getRequestRoute(requestEv) {
  return requestEv[RequestEvRoute];
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
function runQwikCity(serverRequestEv, loadedRoute, requestHandlers, trailingSlash = true, basePathname = "/") {
  if (requestHandlers.length === 0) {
    throw new ErrorResponse(404 /* NotFound */, `Not Found`);
  }
  let resolve;
  const responsePromise = new Promise((r) => resolve = r);
  const requestEv = createRequestEvent(
    serverRequestEv,
    loadedRoute,
    requestHandlers,
    trailingSlash,
    basePathname,
    resolve
  );
  return {
    response: responsePromise,
    requestEv,
    completion: runNext(requestEv, resolve)
  };
}
async function runNext(requestEv, resolve) {
  try {
    await requestEv.next();
  } catch (e) {
    if (e instanceof RedirectMessage) {
      requestEv.getWritableStream().close();
    } else if (e instanceof ErrorResponse) {
      console.error(e);
      if (!requestEv.headersSent) {
        const html = getErrorHtml(e.status, e);
        requestEv.html(e.status, html);
      }
    } else if (!(e instanceof AbortMessage)) {
      return e;
    }
  } finally {
    resolve(null);
  }
  return void 0;
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
function isFormContentType(headers) {
  return isContentType(headers, "application/x-www-form-urlencoded", "multipart/form-data");
}
function isContentType(headers, ...types) {
  var _a2;
  const type = ((_a2 = headers.get("content-type")) == null ? void 0 : _a2.split(";", 1)[0].trim()) ?? "";
  return types.includes(type);
}

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

// packages/qwik-city/middleware/request-handler/request-handler.ts
async function requestHandler(serverRequestEv, opts) {
  const { render, qwikCityPlan } = opts;
  const { routes, serverPlugins, menus, cacheModules, trailingSlash, basePathname } = qwikCityPlan;
  const pathname = serverRequestEv.url.pathname;
  const matchPathname = getRouteMatchPathname(pathname, trailingSlash);
  const route = await loadRequestHandlers(
    serverPlugins,
    routes,
    menus,
    cacheModules,
    matchPathname,
    serverRequestEv.request.method,
    render
  );
  if (route) {
    return runQwikCity(serverRequestEv, route[0], route[1], trailingSlash, basePathname);
  }
  return null;
}
async function loadRequestHandlers(serverPlugins, routes, menus, cacheModules, pathname, method, renderFn) {
  const route = await loadRoute(routes, menus, cacheModules, pathname);
  const requestHandlers = resolveRequestHandlers(
    serverPlugins,
    route,
    method,
    renderQwikMiddleware(renderFn)
  );
  if (requestHandlers.length > 0) {
    return [route, requestHandlers];
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getErrorHtml,
  mergeHeadersCookies,
  requestHandler
});
