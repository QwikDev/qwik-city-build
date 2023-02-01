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

// packages/qwik/src/core/util/qdev.ts
var qDev = globalThis.qDev === true;
var qInspector = globalThis.qInspector === true;
var qSerialize = globalThis.qSerialize !== false;
var qDynamicPlatform = globalThis.qDynamicPlatform !== false;
var qTest = globalThis.qTest === true;
var qRuntimeQrl = globalThis.qRuntimeQrl === true;
var seal = (obj) => {
  if (qDev) {
    Object.seal(obj);
  }
};

// packages/qwik/src/core/util/element.ts
var isNode = (value) => {
  return value && typeof value.nodeType === "number";
};
var isDocument = (value) => {
  return value && value.nodeType === 9;
};
var isElement = (value) => {
  return value.nodeType === 1;
};
var isQwikElement = (value) => {
  return isNode(value) && (value.nodeType === 1 || value.nodeType === 111);
};
var isVirtualElement = (value) => {
  return value.nodeType === 111;
};

// packages/qwik/src/core/util/log.ts
var STYLE = qDev ? `background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;` : "";
var logError = (message, ...optionalParams) => {
  const err = message instanceof Error ? message : createError(message);
  const messageStr = err.stack || err.message;
  console.error("%cQWIK ERROR", STYLE, messageStr, ...printParams(optionalParams));
  return err;
};
var createError = (message) => {
  const err = new Error(message);
  if (err.stack) {
    err.stack = filterStack(err.stack);
  }
  return err;
};
var filterStack = (stack, offset = 0) => {
  return stack.split("\n").slice(offset).filter((l) => !l.includes("/node_modules/@builder.io/qwik")).join("\n");
};
var logErrorAndStop = (message, ...optionalParams) => {
  const err = logError(message, ...optionalParams);
  debugger;
  return err;
};
var logWarn = (message, ...optionalParams) => {
  if (qDev) {
    console.warn("%cQWIK WARN", STYLE, message, ...printParams(optionalParams));
  }
};
var tryGetContext = (element) => {
  return element["_qc_"];
};
var printParams = (optionalParams) => {
  if (qDev) {
    return optionalParams.map((p) => {
      if (isNode(p) && isElement(p)) {
        return printElement(p);
      }
      return p;
    });
  }
  return optionalParams;
};
var printElement = (el) => {
  var _a2;
  const ctx = tryGetContext(el);
  const isServer2 = /* @__PURE__ */ (() => typeof process !== "undefined" && !!process.versions && !!process.versions.node)();
  return {
    tagName: el.tagName,
    renderQRL: (_a2 = ctx == null ? void 0 : ctx.$componentQrl$) == null ? void 0 : _a2.getSymbol(),
    element: isServer2 ? void 0 : el,
    ctx: isServer2 ? void 0 : ctx
  };
};

// packages/qwik/src/core/error/error.ts
var QError_verifySerializable = 3;
var QError_qrlIsNotFunction = 10;
var QError_invalidJsxNodeType = 25;
var QError_missingObjectId = 27;
var QError_qrlMissingContainer = 30;
var QError_qrlMissingChunk = 31;
var qError = (code, ...parts) => {
  const text = codeToText(code);
  return logErrorAndStop(text, ...parts);
};
var codeToText = (code) => {
  if (qDev) {
    const MAP = [
      "Error while serializing class attribute",
      // 0
      "Can not serialize a HTML Node that is not an Element",
      // 1
      "Runtime but no instance found on element.",
      // 2
      "Only primitive and object literals can be serialized",
      // 3
      "Crash while rendering",
      // 4
      "You can render over a existing q:container. Skipping render().",
      // 5
      "Set property",
      // 6
      "Only function's and 'string's are supported.",
      // 7
      "Only objects can be wrapped in 'QObject'",
      // 8
      `Only objects literals can be wrapped in 'QObject'`,
      // 9
      "QRL is not a function",
      // 10
      "Dynamic import not found",
      // 11
      "Unknown type argument",
      // 12
      "Actual value for useContext() can not be found, make sure some ancestor component has set a value using useContextProvider()",
      // 13
      "Invoking 'use*()' method outside of invocation context.",
      // 14
      "Cant access renderCtx for existing context",
      // 15
      "Cant access document for existing context",
      // 16
      "props are immutable",
      // 17
      "<div> component can only be used at the root of a Qwik component$()",
      // 18
      "Props are immutable by default.",
      // 19
      `Calling a 'use*()' method outside 'component$(() => { HERE })' is not allowed. 'use*()' methods provide hooks to the 'component$' state and lifecycle, ie 'use' hooks can only be called syncronously within the 'component$' function or another 'use' method.
For more information see: https://qwik.builder.io/docs/components/lifecycle/#use-method-rules`,
      // 20
      "Container is already paused. Skipping",
      // 21
      'Components using useServerMount() can only be mounted in the server, if you need your component to be mounted in the client, use "useMount$()" instead',
      // 22
      "When rendering directly on top of Document, the root node must be a <html>",
      // 23
      "A <html> node must have 2 children. The first one <head> and the second one a <body>",
      // 24
      "Invalid JSXNode type. It must be either a function or a string. Found:",
      // 25
      "Tracking value changes can only be done to useStore() objects and component props",
      // 26
      "Missing Object ID for captured object",
      // 27
      "The provided Context reference is not a valid context created by createContext()",
      // 28
      "<html> is the root container, it can not be rendered inside a component",
      // 29
      "QRLs can not be resolved because it does not have an attached container. This means that the QRL does not know where it belongs inside the DOM, so it cant dynamically import() from a relative path.",
      // 30
      "QRLs can not be dynamically resolved, because it does not have a chunk path",
      // 31
      "The JSX ref attribute must be a Signal"
      // 32
    ];
    return `Code(${code}): ${MAP[code] ?? ""}`;
  } else {
    return `Code(${code})`;
  }
};

// packages/qwik/src/core/util/types.ts
var isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};
var isObject = (v) => {
  return v && typeof v === "object";
};
var isArray = (v) => {
  return Array.isArray(v);
};
var isString = (v) => {
  return typeof v === "string";
};
var isFunction = (v) => {
  return typeof v === "function";
};

// packages/qwik/src/core/platform/platform.ts
var createPlatform = () => {
  return {
    isServer: false,
    importSymbol(containerEl, url, symbolName) {
      const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      urlCopy.search = "";
      const importURL = urlCopy.href;
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod) => {
        return findSymbol(mod, symbolName);
      });
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(fn());
        });
      });
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol() {
      return void 0;
    }
  };
};
var findSymbol = (module, symbol) => {
  if (symbol in module) {
    return module[symbol];
  }
  for (const v of Object.values(module)) {
    if (isObject(v) && symbol in v) {
      return v[symbol];
    }
  }
};
var toUrl = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
var _platform = createPlatform();
var getPlatform = () => {
  return _platform;
};
var isServer = () => {
  if (qDynamicPlatform) {
    return _platform.isServer;
  }
  return false;
};

// packages/qwik/src/core/error/assert.ts
function assertDefined(value, text, ...parts) {
  if (qDev) {
    if (value != null)
      return;
    throw logErrorAndStop(text, ...parts);
  }
}
function assertTrue(value1, text, ...parts) {
  if (qDev) {
    if (value1 === true)
      return;
    throw logErrorAndStop(text, ...parts);
  }
}

// packages/qwik/src/core/util/promises.ts
var isPromise = (value) => {
  return value instanceof Promise;
};
var then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};

// packages/qwik/src/core/util/flyweight.ts
var EMPTY_ARRAY = [];
var EMPTY_OBJ = {};
if (qDev) {
  Object.freeze(EMPTY_ARRAY);
  Object.freeze(EMPTY_OBJ);
  Error.stackTraceLimit = 9999;
}

// packages/qwik/src/core/qrl/qrl.ts
var serializeQRL = (qrl, opts = {}) => {
  assertTrue(qSerialize, "In order to serialize a QRL, qSerialize must be true");
  assertQrl(qrl);
  let symbol = qrl.$symbol$;
  let chunk = qrl.$chunk$;
  const refSymbol = qrl.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol);
    if (result) {
      chunk = result[1];
      if (!qrl.$refSymbol$) {
        symbol = result[0];
      }
    }
  }
  if (qRuntimeQrl && !chunk) {
    chunk = "/runtimeQRL";
    symbol = "_";
  }
  if (!chunk) {
    throw qError(QError_qrlMissingChunk, qrl.$symbol$);
  }
  if (chunk.startsWith("./")) {
    chunk = chunk.slice(2);
  }
  const parts = [chunk, "#", symbol];
  const capture = qrl.$capture$;
  const captureRef = qrl.$captureRef$;
  if (captureRef && captureRef.length) {
    if (opts.$getObjId$) {
      const capture2 = captureRef.map(opts.$getObjId$);
      parts.push(`[${capture2.join(" ")}]`);
    } else if (opts.$addRefMap$) {
      const capture2 = captureRef.map(opts.$addRefMap$);
      parts.push(`[${capture2.join(" ")}]`);
    }
  } else if (capture && capture.length > 0) {
    parts.push(`[${capture.join(" ")}]`);
  }
  return parts.join("");
};
var parseQRL = (qrl, containerEl) => {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  if (containerEl) {
    iQrl.$setContainer$(containerEl);
  }
  return iQrl;
};
var indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return charIdx == -1 ? endIdx : charIdx;
};

// packages/qwik/src/core/util/markers.ts
var OnRenderProp = "q:renderFn";
var QSlot = "q:slot";
var QLocaleAttr = "q:locale";
var QContainerSelector = "[q\\:container]";
var RenderEvent = "qRender";

// packages/qwik/src/core/use/use-locale.ts
var _locale = void 0;
function setLocale(locale) {
  _locale = locale;
}

// packages/qwik/src/core/use/use-core.ts
var _context;
var tryGetInvokeContext = () => {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (isArray(context)) {
      return document.__q_context__ = newInvokeContextFromTuple(context);
    }
    return context;
  }
  return _context;
};
var invoke = (context, fn, ...args) => {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(null, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
};
var newInvokeContextFromTuple = (context) => {
  const element = context[0];
  const container = element.closest(QContainerSelector);
  const locale = (container == null ? void 0 : container.getAttribute(QLocaleAttr)) || void 0;
  locale && setLocale(locale);
  return newInvokeContext(locale, void 0, element, context[1], context[2]);
};
var newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $seq$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $url$: url,
    $qrl$: void 0,
    $props$: void 0,
    $renderCtx$: void 0,
    $subscriber$: void 0,
    $waitOn$: void 0,
    $locale$: locale
  };
  seal(ctx);
  return ctx;
};

// packages/qwik/src/core/state/constants.ts
var QObjectRecursive = 1 << 0;
var QObjectImmutable = 1 << 1;
var QOjectTargetSymbol = Symbol("proxy target");
var QObjectFlagsSymbol = Symbol("proxy flags");
var QObjectManagerSymbol = Symbol("proxy manager");
var _IMMUTABLE = Symbol("IMMUTABLE");

// packages/qwik/src/core/state/signal.ts
var SignalImpl = class {
  constructor(v, manager) {
    this.untrackedValue = v;
    this[QObjectManagerSymbol] = manager;
  }
  // prevent accidental use as value
  valueOf() {
    throw new TypeError("Cannot coerce a Signal, use `.value` instead");
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return { value: this.value };
  }
  get value() {
    var _a2;
    const sub = (_a2 = tryGetInvokeContext()) == null ? void 0 : _a2.$subscriber$;
    if (sub) {
      this[QObjectManagerSymbol].$addSub$([0, sub, void 0]);
    }
    return this.untrackedValue;
  }
  set value(v) {
    if (qDev) {
      verifySerializable(v);
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx && invokeCtx.$event$ === RenderEvent) {
        logWarn(
          "State mutation inside render function. Move mutation to useWatch(), useClientEffect() or useServerMount()",
          invokeCtx.$hostElement$
        );
      }
    }
    const manager = this[QObjectManagerSymbol];
    const oldValue = this.untrackedValue;
    if (manager && oldValue !== v) {
      this.untrackedValue = v;
      manager.$notifySubs$();
    }
  }
};
QObjectManagerSymbol;
var isSignal = (obj) => {
  return obj instanceof SignalImpl || obj instanceof SignalWrapper;
};
var SignalWrapper = class {
  constructor(ref, prop) {
    this.ref = ref;
    this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getProxyManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
};

// packages/qwik/src/core/state/context.ts
var Q_CTX = "_qc_";
var HOST_FLAG_DIRTY = 1 << 0;
var HOST_FLAG_NEED_ATTACH_LISTENER = 1 << 1;
var HOST_FLAG_MOUNTED = 1 << 2;
var HOST_FLAG_DYNAMIC = 1 << 3;
var tryGetContext2 = (element) => {
  return element[Q_CTX];
};

// packages/qwik/src/core/container/container.ts
var CONTAINER_STATE = Symbol("ContainerState");
var intToStr = (nu) => {
  return nu.toString(36);
};
var strToInt = (nu) => {
  return parseInt(nu, 36);
};

// packages/qwik/src/core/render/jsx/utils.public.ts
var SkipRender = Symbol("skip render");
var Virtual = (props) => props.children;

// packages/qwik/src/core/render/jsx/jsx-runtime.ts
var warnClassname = false;
var jsx = (type, props, key) => {
  const processed = key == null ? null : String(key);
  const node = new JSXNodeImpl(type, props, processed);
  seal(node);
  return node;
};
var JSXNodeImpl = class {
  constructor(type, props, key = null) {
    this.type = type;
    this.props = props;
    this.key = key;
    if (qDev) {
      invoke(void 0, () => {
        const isQwikC = isQwikComponent(type);
        if (!isString(type) && !isFunction(type)) {
          throw qError(QError_invalidJsxNodeType, String(type));
        }
        if (isArray(props.children)) {
          const flatChildren = props.children.flat();
          if (isString(type) || isQwikC) {
            flatChildren.forEach((child) => {
              if (!isValidJSXChild(child)) {
                const typeObj = typeof child;
                let explanation = "";
                if (typeObj === "object") {
                  if (child == null ? void 0 : child.constructor) {
                    explanation = `it's an instance of "${child == null ? void 0 : child.constructor.name}".`;
                  } else {
                    explanation = `it's a object literal: ${printObjectLiteral(child)} `;
                  }
                } else if (typeObj === "function") {
                  explanation += `it's a function named "${child.name}".`;
                } else {
                  explanation = `it's a "${typeObj}": ${String(child)}.`;
                }
                throw createJSXError(
                  `One of the children of <${type} /> is not an accepted value. JSX children must be either: string, boolean, number, <element>, Array, undefined/null, or a Promise/Signal that resolves to one of those types. Instead, ${explanation}`,
                  this
                );
              }
            });
          }
          const keys = {};
          flatChildren.forEach((child) => {
            if (isJSXNode(child) && !isString(child.type) && child.key != null) {
              if (keys[child.key]) {
                const err = createJSXError(
                  `Multiple JSX sibling nodes with the same key.
This is likely caused by missing a custom key in a for loop`,
                  child
                );
                if (err) {
                  logError(err);
                }
              } else {
                keys[child.key] = true;
              }
            }
          });
        }
        if (!qRuntimeQrl && props) {
          for (const prop of Object.keys(props)) {
            const value = props[prop];
            if (prop.endsWith("$") && value) {
              if (!isQrl(value) && !Array.isArray(value)) {
                throw qError(QError_invalidJsxNodeType, String(value));
              }
            }
            if (prop !== "children" && isQwikC && value) {
              verifySerializable(
                value,
                `The value of the JSX property "${prop}" can not be serialized`
              );
            }
          }
        }
        if (isString(type)) {
          if (type === "style") {
            if (props.children) {
              logWarn(`jsx: Using <style>{content}</style> will escape the content, effectively breaking the CSS.
In order to disable content escaping use '<style dangerouslySetInnerHTML={content}/>'

However, if the use case is to inject component styleContent, use 'useStyles$()' instead, it will be a lot more efficient.
See https://qwik.builder.io/docs/components/styles/#usestyles for more information.`);
            }
          }
          if (type === "script") {
            if (props.children) {
              logWarn(`jsx: Using <script>{content}</script> will escape the content, effectively breaking the inlined JS.
In order to disable content escaping use '<script dangerouslySetInnerHTML={content}/>'`);
            }
          }
          if ("className" in props) {
            props["class"] = props["className"];
            delete props["className"];
            if (qDev && !warnClassname) {
              warnClassname = true;
              logWarn("jsx: `className` is deprecated. Use `class` instead.");
            }
          }
        }
      });
    }
  }
};
var printObjectLiteral = (obj) => {
  return `{ ${Object.keys(obj).map((key) => `"${key}"`).join(", ")} }`;
};
var isJSXNode = (n) => {
  if (qDev) {
    if (n instanceof JSXNodeImpl) {
      return true;
    }
    if (isObject(n) && "key" in n && "props" in n && "type" in n) {
      logWarn(`Duplicate implementations of "JSXNode" found`);
      return true;
    }
    return false;
  } else {
    return n instanceof JSXNodeImpl;
  }
};
var isValidJSXChild = (node) => {
  if (!node) {
    return true;
  } else if (node === SkipRender) {
    return true;
  } else if (isString(node) || typeof node === "number" || typeof node === "boolean") {
    return true;
  } else if (isJSXNode(node)) {
    return true;
  }
  if (isSignal(node)) {
    return isValidJSXChild(node.value);
  } else if (isPromise(node)) {
    return true;
  }
  return false;
};
var ONCE_JSX = /* @__PURE__ */ new Set();
var createJSXError = (message, node) => {
  const error = new Error(message);
  if (!node.dev) {
    return error;
  }
  const id = node.dev.fileName;
  const key = `${message}${id}:${node.dev.lineNumber}:${node.dev.columnNumber}`;
  if (ONCE_JSX.has(key)) {
    return void 0;
  }
  Object.assign(error, {
    id,
    loc: {
      file: id,
      column: node.dev.columnNumber,
      line: node.dev.lineNumber
    }
  });
  error.stack = `JSXError: ${message}
${filterStack(node.dev.stack, 1)}`;
  ONCE_JSX.add(key);
  return error;
};

// packages/qwik/src/core/container/pause.ts
var _serializeData = (data) => {
  const containerState = {};
  const collector = createCollector(containerState);
  collectValue(data, collector, false);
  const objs = Array.from(collector.$objSet$.keys());
  let count = 0;
  const objToId = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    objToId.set(obj, intToStr(count));
    count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    assertDefined(undefinedID, "undefined ID must be defined");
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const mustGetObjId = (obj) => {
    const key = objToId.get(obj);
    if (key === void 0) {
      throw qError(QError_missingObjectId, obj);
    }
    return key;
  };
  const convertedObjs = objs.map((obj) => {
    if (obj === null) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, containerState);
    if (value !== void 0) {
      return value;
    }
    if (typeObj === "object") {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key of Object.keys(obj)) {
          output[key] = mustGetObjId(obj[key]);
        }
        return output;
      }
    }
    throw qError(QError_verifySerializable, obj);
  });
  return JSON.stringify([mustGetObjId(data), convertedObjs]);
};
var createCollector = (containerState) => {
  return {
    $containerState$: containerState,
    $seen$: /* @__PURE__ */ new Set(),
    $objSet$: /* @__PURE__ */ new Set(),
    $prefetch$: 0,
    $noSerialize$: [],
    $resources$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
  };
};
var collectDeferElement = (el, collector) => {
  const ctx = tryGetContext2(el);
  if (collector.$elements$.includes(ctx)) {
    return;
  }
  collector.$elements$.push(ctx);
  collector.$prefetch$++;
  if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
    collectElementData(ctx, collector, true);
  } else {
    collector.$deferElements$.push(ctx);
  }
  collector.$prefetch$--;
};
var collectElementData = (elCtx, collector, dynamic) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
    collectValue(elCtx.$props$, collector, dynamic);
  }
  if (elCtx.$componentQrl$) {
    collectValue(elCtx.$componentQrl$, collector, dynamic);
  }
  if (elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamic);
    }
  }
  if (elCtx.$watches$) {
    for (const obj of elCtx.$watches$) {
      collectValue(obj, collector, dynamic);
    }
  }
  if (dynamic) {
    collectContext(elCtx, collector);
    if (elCtx.$dynamicSlots$) {
      for (const slotCtx of elCtx.$dynamicSlots$) {
        collectContext(slotCtx, collector);
      }
    }
  }
};
var collectContext = (elCtx, collector) => {
  while (elCtx) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
      if (elCtx.$contexts$.get("_") === true) {
        break;
      }
    }
    elCtx = elCtx.$slotParent$ ?? elCtx.$parent$;
  }
};
var collectSubscriptions = (manager, collector) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  assertDefined(subs, "subs must be defined");
  for (const key of subs) {
    const host = key[1];
    if (isNode(host) && isVirtualElement(host)) {
      if (key[0] === 0) {
        collectDeferElement(host, collector);
      }
    } else {
      collectValue(host, collector, true);
    }
  }
};
var PROMISE_VALUE = Symbol();
var resolvePromise = (promise) => {
  return promise.then(
    (value) => {
      const v = {
        resolved: true,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    },
    (value) => {
      const v = {
        resolved: false,
        value
      };
      promise[PROMISE_VALUE] = v;
      return value;
    }
  );
};
var collectValue = (obj, collector, leaks) => {
  if (obj !== null) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        const seen = collector.$seen$;
        if (seen.has(obj)) {
          return;
        }
        seen.add(obj);
        if (fastSkipSerialize(obj)) {
          collector.$objSet$.add(void 0);
          collector.$noSerialize$.push(obj);
          return;
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          obj = target;
          if (seen.has(obj)) {
            return;
          }
          seen.add(obj);
          if (fastWeakSerialize(input)) {
            collector.$objSet$.add(obj);
            return;
          }
          if (leaks) {
            collectSubscriptions(getProxyManager(input), collector);
          }
        }
        const collected = collectDeps(obj, collector, leaks);
        if (collected) {
          collector.$objSet$.add(obj);
          return;
        }
        if (isPromise(obj)) {
          collector.$promises$.push(
            resolvePromise(obj).then((value) => {
              collectValue(value, collector, leaks);
            })
          );
          return;
        }
        if (objType === "object") {
          if (isNode(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(obj[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key of Object.keys(obj)) {
              collectValue(obj[key], collector, leaks);
            }
          }
        }
        break;
      }
    }
  }
  collector.$objSet$.add(obj);
};
var isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

// packages/qwik/src/core/use/use-task.ts
var WatchFlagsIsEffect = 1 << 0;
var WatchFlagsIsWatch = 1 << 1;
var WatchFlagsIsDirty = 1 << 2;
var WatchFlagsIsCleanup = 1 << 3;
var WatchFlagsIsResource = 1 << 4;
var isResourceTask = (watch) => {
  return !!watch.$resource$;
};
var isSubscriberDescriptor = (obj) => {
  return isObject(obj) && obj instanceof Task;
};
var serializeWatch = (watch, getObjId) => {
  let value = `${intToStr(watch.$flags$)} ${intToStr(watch.$index$)} ${getObjId(
    watch.$qrl$
  )} ${getObjId(watch.$el$)}`;
  if (isResourceTask(watch)) {
    value += ` ${getObjId(watch.$resource$)}`;
  }
  return value;
};
var parseTask = (data) => {
  const [flags, index, qrl, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index), el, qrl, resource);
};
var Task = class {
  constructor($flags$, $index$, $el$, $qrl$, $resource$) {
    this.$flags$ = $flags$;
    this.$index$ = $index$;
    this.$el$ = $el$;
    this.$qrl$ = $qrl$;
    this.$resource$ = $resource$;
  }
};

// packages/qwik/src/core/use/use-resource.ts
var _createResourceReturn = (opts) => {
  const resource = {
    __brand: "resource",
    value: void 0,
    loading: isServer() ? false : true,
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: (opts == null ? void 0 : opts.timeout) ?? -1,
    _cache: 0
  };
  return resource;
};
var isResourceReturn = (obj) => {
  return isObject(obj) && obj.__brand === "resource";
};
var serializeResource = (resource, getObjId) => {
  const state = resource._state;
  if (state === "resolved") {
    return `0 ${getObjId(resource._resolved)}`;
  } else if (state === "pending") {
    return `1`;
  } else {
    return `2 ${getObjId(resource._error)}`;
  }
};
var parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  result.value = Promise.resolve();
  if (first === "0") {
    result._state = "resolved";
    result._resolved = id;
    result.loading = false;
  } else if (first === "1") {
    result._state = "pending";
    result.value = new Promise(() => {
    });
    result.loading = true;
  } else if (first === "2") {
    result._state = "rejected";
    result._error = id;
    result.loading = false;
  }
  return result;
};

// packages/qwik/src/core/container/serializers.ts
var UNDEFINED_PREFIX = "";
var QRLSerializer = {
  prefix: "",
  test: (v) => isQrl(v),
  collect: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    if (collector.$prefetch$ === 0) {
      collector.$qrls$.push(v);
    }
  },
  serialize: (obj, getObjId) => {
    return serializeQRL(obj, {
      $getObjId$: getObjId
    });
  },
  prepare: (data, containerState) => {
    return parseQRL(data, containerState.$containerEl$);
  },
  fill: (qrl, getObject) => {
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
var WatchSerializer = {
  prefix: "",
  test: (v) => isSubscriberDescriptor(v),
  collect: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks);
    if (v.$resource$) {
      collectValue(v.$resource$, collector, leaks);
    }
  },
  serialize: (obj, getObjId) => serializeWatch(obj, getObjId),
  prepare: (data) => parseTask(data),
  fill: (watch, getObject) => {
    watch.$el$ = getObject(watch.$el$);
    watch.$qrl$ = getObject(watch.$qrl$);
    if (watch.$resource$) {
      watch.$resource$ = getObject(watch.$resource$);
    }
  }
};
var ResourceSerializer = {
  prefix: "",
  test: (v) => isResourceReturn(v),
  collect: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks);
    collectValue(obj._resolved, collector, leaks);
  },
  serialize: (obj, getObjId) => {
    return serializeResource(obj, getObjId);
  },
  prepare: (data) => {
    return parseResourceReturn(data);
  },
  fill: (resource, getObject) => {
    if (resource._state === "resolved") {
      resource._resolved = getObject(resource._resolved);
      resource.value = Promise.resolve(resource._resolved);
    } else if (resource._state === "rejected") {
      const p = Promise.reject(resource._error);
      p.catch(() => null);
      resource._error = getObject(resource._error);
      resource.value = p;
    }
  }
};
var URLSerializer = {
  prefix: "",
  test: (v) => v instanceof URL,
  serialize: (obj) => obj.href,
  prepare: (data) => new URL(data),
  fill: void 0
};
var DateSerializer = {
  prefix: "",
  test: (v) => v instanceof Date,
  serialize: (obj) => obj.toISOString(),
  prepare: (data) => new Date(data),
  fill: void 0
};
var RegexSerializer = {
  prefix: "\x07",
  test: (v) => v instanceof RegExp,
  serialize: (obj) => `${obj.flags} ${obj.source}`,
  prepare: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  },
  fill: void 0
};
var ErrorSerializer = {
  prefix: "",
  test: (v) => v instanceof Error,
  serialize: (obj) => {
    return obj.message;
  },
  prepare: (text) => {
    const err = new Error(text);
    err.stack = void 0;
    return err;
  },
  fill: void 0
};
var DocumentSerializer = {
  prefix: "",
  test: (v) => isDocument(v),
  serialize: void 0,
  prepare: (_, _c, doc) => {
    return doc;
  },
  fill: void 0
};
var SERIALIZABLE_STATE = Symbol("serializable-data");
var ComponentSerializer = {
  prefix: "",
  test: (obj) => isQwikComponent(obj),
  serialize: (obj, getObjId) => {
    const [qrl] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl, {
      $getObjId$: getObjId
    });
  },
  prepare: (data, containerState) => {
    const optionsIndex = data.indexOf("{");
    const qrlString = optionsIndex == -1 ? data : data.slice(0, optionsIndex);
    const qrl = parseQRL(qrlString, containerState.$containerEl$);
    return componentQrl(qrl);
  },
  fill: (component, getObject) => {
    const [qrl] = component[SERIALIZABLE_STATE];
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
var PureFunctionSerializer = {
  prefix: "",
  test: (obj) => typeof obj === "function" && obj.__qwik_serializable__ !== void 0,
  serialize: (obj) => {
    return obj.toString();
  },
  prepare: (data) => {
    const fn = new Function("return " + data)();
    fn.__qwik_serializable__ = true;
    return fn;
  },
  fill: void 0
};
var SignalSerializer = {
  prefix: "",
  test: (v) => v instanceof SignalImpl,
  collect: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    if (leaks) {
      collectSubscriptions(obj[QObjectManagerSymbol], collector);
    }
    return obj;
  },
  serialize: (obj, getObjId) => {
    return getObjId(obj.untrackedValue);
  },
  prepare: (data, containerState) => {
    return new SignalImpl(data, containerState.$subsManager$.$createManager$());
  },
  subs: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  fill: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
};
var SignalWrapperSerializer = {
  prefix: "",
  test: (v) => v instanceof SignalWrapper,
  collect(obj, collector, leaks) {
    collectValue(obj.ref, collector, leaks);
    if (fastWeakSerialize(obj.ref)) {
      const manager = getProxyManager(obj.ref);
      if (!manager.$isTreeshakeable$(obj.prop)) {
        collectValue(obj.ref[obj.prop], collector, leaks);
      }
      collectSubscriptions(manager, collector);
    }
    return obj;
  },
  serialize: (obj, getObjId) => {
    return `${getObjId(obj.ref)} ${obj.prop}`;
  },
  prepare: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  fill: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
};
var NoFiniteNumberSerializer = {
  prefix: "",
  test: (v) => typeof v === "number",
  serialize: (v) => {
    return String(v);
  },
  prepare: (data) => {
    return Number(data);
  },
  fill: void 0
};
var URLSearchParamsSerializer = {
  prefix: "",
  test: (v) => v instanceof URLSearchParams,
  serialize: (obj) => obj.toString(),
  prepare: (data) => new URLSearchParams(data),
  fill: void 0
};
var FormDataSerializer = {
  prefix: "",
  test: (v) => typeof FormData !== "undefined" && v instanceof globalThis.FormData,
  serialize: (formData) => {
    const array = [];
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        array.push([key, value]);
      } else {
        array.push([key, value.name]);
      }
    });
    return JSON.stringify(array);
  },
  prepare: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  },
  fill: void 0
};
var serializers = [
  QRLSerializer,
  SignalSerializer,
  SignalWrapperSerializer,
  WatchSerializer,
  ResourceSerializer,
  URLSerializer,
  DateSerializer,
  RegexSerializer,
  ErrorSerializer,
  DocumentSerializer,
  ComponentSerializer,
  PureFunctionSerializer,
  NoFiniteNumberSerializer,
  URLSearchParamsSerializer,
  FormDataSerializer
];
var collectorSerializers = /* @__PURE__ */ serializers.filter((a) => a.collect);
var canSerialize = (obj) => {
  for (const s of serializers) {
    if (s.test(obj)) {
      return true;
    }
  }
  return false;
};
var collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.test(obj)) {
      s.collect(obj, collector, leaks);
      return true;
    }
  }
  return false;
};
var serializeValue = (obj, getObjID, containerState) => {
  for (const s of serializers) {
    if (s.test(obj)) {
      let value = s.prefix;
      if (s.serialize) {
        value += s.serialize(obj, getObjID, containerState);
      }
      return value;
    }
  }
  return void 0;
};

// packages/qwik/src/core/state/common.ts
var verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
var _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapProxy(value);
  if (unwrapped == null) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    seen.add(unwrapped);
    if (canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise(unwrapped))
          return value;
        if (isQwikElement(unwrapped))
          return value;
        if (isDocument(unwrapped))
          return value;
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          });
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (preMessage) {
      message = preMessage;
    } else {
      message = "Value cannot be serialized";
    }
    if (ctx !== "_") {
      message += ` in ${ctx},`;
    }
    if (typeObj === "object") {
      message += ` because it's an instance of "${value == null ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.builder.io/docs/advanced/dollar/`;
    } else if (typeObj === "function") {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(
        value
      )});

Please check out https://qwik.builder.io/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value);
    throw createError(message);
  }
  return value;
};
var noSerializeSet = /* @__PURE__ */ new WeakSet();
var weakSerializeSet = /* @__PURE__ */ new WeakSet();
var shouldSerialize = (obj) => {
  if (isObject(obj) || isFunction(obj)) {
    return !noSerializeSet.has(obj);
  }
  return true;
};
var fastSkipSerialize = (obj) => {
  return noSerializeSet.has(obj);
};
var fastWeakSerialize = (obj) => {
  return weakSerializeSet.has(obj);
};
var unwrapProxy = (proxy) => {
  return isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
};
var getProxyTarget = (obj) => {
  return obj[QOjectTargetSymbol];
};
var getProxyManager = (obj) => {
  return obj[QObjectManagerSymbol];
};

// packages/qwik/src/core/qrl/qrl-class.ts
var isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
var createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  if (qDev) {
    if (captureRef) {
      for (const item of captureRef) {
        verifySerializable(item, "Captured variable in the closure can not be serialized");
      }
    }
  }
  let _containerEl;
  const setContainer = (el) => {
    if (!_containerEl) {
      _containerEl = el;
    }
  };
  const resolve = async (containerEl) => {
    if (containerEl) {
      setContainer(containerEl);
    }
    if (symbolRef !== null) {
      return symbolRef;
    }
    if (symbolFn !== null) {
      return symbolRef = symbolFn().then((module) => symbolRef = module[symbol]);
    } else {
      if (!chunk) {
        throw qError(QError_qrlMissingChunk, symbol);
      }
      if (!_containerEl) {
        throw qError(QError_qrlMissingContainer, chunk, symbol);
      }
      const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
      return symbolRef = then(symbol2, (ref) => {
        return symbolRef = ref;
      });
    }
  };
  const resolveLazy = (containerEl) => {
    return symbolRef !== null ? symbolRef : resolve(containerEl);
  };
  const invokeFn = (currentCtx, beforeFn) => {
    return (...args) => {
      const start = now();
      const fn = resolveLazy();
      return then(fn, (fn2) => {
        if (isFunction(fn2)) {
          if (beforeFn && beforeFn() === false) {
            return;
          }
          const baseContext = createInvokationContext(currentCtx);
          const context = {
            ...baseContext,
            $qrl$: QRL
          };
          emitUsedSymbol(symbol, context.$element$, start);
          return invoke(context, fn2, ...args);
        }
        throw qError(QError_qrlIsNotFunction);
      });
    };
  };
  const createInvokationContext = (invoke2) => {
    if (invoke2 == null) {
      return newInvokeContext();
    } else if (isArray(invoke2)) {
      return newInvokeContextFromTuple(invoke2);
    } else {
      return invoke2;
    }
  };
  const invokeQRL = async function(...args) {
    const fn = invokeFn();
    const result = await fn(...args);
    return result;
  };
  const resolvedSymbol = refSymbol ?? symbol;
  const hash = getSymbolHash(resolvedSymbol);
  const QRL = invokeQRL;
  const methods = {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    $dev$: null
  };
  const qrl = Object.assign(invokeQRL, methods);
  seal(qrl);
  return qrl;
};
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
function assertQrl(qrl) {
  if (qDev) {
    if (!isQrl(qrl)) {
      throw new Error("Not a QRL");
    }
  }
}
var emitUsedSymbol = (symbol, element, reqTime) => {
  emitEvent("qsymbol", {
    symbol,
    element,
    reqTime
  });
};
var emitEvent = (eventName, detail) => {
  if (!qTest && !isServer() && typeof document === "object") {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        detail
      })
    );
  }
};
var now = () => {
  if (qTest || isServer()) {
    return 0;
  }
  if (typeof performance === "object") {
    return performance.now();
  }
  return 0;
};

// packages/qwik/src/core/component/component.public.ts
var componentQrl = (componentQrl2) => {
  function QwikComponent(props, key) {
    assertQrl(componentQrl2);
    const hash = qTest ? "sX" : componentQrl2.$hash$.slice(0, 4);
    const finalKey = hash + ":" + (key ? key : "");
    return jsx(
      Virtual,
      {
        [OnRenderProp]: componentQrl2,
        [QSlot]: props[QSlot],
        [_IMMUTABLE]: props[_IMMUTABLE],
        children: props.children,
        props
      },
      finalKey
    );
  }
  QwikComponent[SERIALIZABLE_STATE] = [componentQrl2];
  return QwikComponent;
};
var isQwikComponent = (component) => {
  return typeof component == "function" && component[SERIALIZABLE_STATE] !== void 0;
};

// packages/qwik-city/middleware/request-handler/response-page.ts
function getQwikCityServerData(requestEv) {
  const { url, params, request, status, locale } = requestEv;
  const requestHeaders = {};
  request.headers.forEach((value, key) => requestHeaders[key] = value);
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
        action: getRequestAction(requestEv)
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
          let data = isForm ? formToObj(await requestEv.request.formData()) : await requestEv.request.json();
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
        __brand: "qdata",
        loaders: getRequestLoaders(requestEv),
        action: getRequestAction(requestEv),
        status: status !== 200 ? status : 200,
        href: getPathname(requestEv.url, true),
        // todo
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
      __brand: "qdata",
      loaders: getRequestLoaders(requestEv),
      action: getRequestAction(requestEv),
      status: status !== 200 ? status : 200,
      href: getPathname(requestEv.url, true),
      // todo
      redirect: location ?? void 0
    };
    const writer = requestEv.getWritableStream().getWriter();
    writer.write(encoder.encode(_serializeData(qData)));
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
function isContentType(headers, ...types) {
  var _a2;
  const type = ((_a2 = headers.get("content-type")) == null ? void 0 : _a2.split(";", 1)[0].trim()) ?? "";
  return types.includes(type);
}
function isFormContentType(headers) {
  return isContentType(headers, "application/x-www-form-urlencoded", "multipart/form-data");
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
export {
  getErrorHtml,
  mergeHeadersCookies,
  requestHandler
};
