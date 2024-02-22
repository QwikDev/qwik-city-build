"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const build = require("@builder.io/qwik/build");
const qwikCity = require("@qwik-city-plan");
const swRegister = require("@qwik-city-sw-register");
const zod = require("zod");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const qwikCity__namespace = /* @__PURE__ */ _interopNamespaceDefault(qwikCity);
const RouteStateContext = /* @__PURE__ */ qwik.createContextId("qc-s");
const ContentContext = /* @__PURE__ */ qwik.createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ qwik.createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ qwik.createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ qwik.createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ qwik.createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ qwik.createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ qwik.createContextId("qc-ir");
const spaInit = /* @__PURE__ */ qwik.inlinedQrl((currentScript) => {
  const win = window;
  const currentPath = location.pathname + location.search;
  const spa = "_qCitySPA";
  const historyPatch = "_qCityHistoryPatch";
  const bootstrap = "_qCityBootstrap";
  const initPopstate = "_qCityInitPopstate";
  const initAnchors = "_qCityInitAnchors";
  const initVisibility = "_qCityInitVisibility";
  const initScroll = "_qCityInitScroll";
  const scrollEnabled = "_qCityScrollEnabled";
  const debounceTimeout = "_qCityScrollDebounce";
  const scrollHistory = "_qCityScroll";
  const checkAndScroll = (scrollState) => {
    if (scrollState)
      win.scrollTo(scrollState.x, scrollState.y);
  };
  const currentScrollState2 = () => {
    const elm = document.documentElement;
    return {
      x: elm.scrollLeft,
      y: elm.scrollTop,
      w: Math.max(elm.scrollWidth, elm.clientWidth),
      h: Math.max(elm.scrollHeight, elm.clientHeight)
    };
  };
  const saveScrollState = (scrollState) => {
    const state = history.state || {};
    state[scrollHistory] = scrollState || currentScrollState2();
    history.replaceState(state, "");
  };
  if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
    saveScrollState();
    win[initPopstate] = () => {
      if (win[spa])
        return;
      win[scrollEnabled] = false;
      clearTimeout(win[debounceTimeout]);
      if (currentPath !== location.pathname + location.search) {
        const container = currentScript.closest("[q\\:container]");
        const link = container.querySelector('a[q\\:key="AD_1"]');
        if (link) {
          const container2 = link.closest("[q\\:container]");
          const bootstrapLink = link.cloneNode();
          bootstrapLink.setAttribute("q:nbs", "");
          bootstrapLink.style.display = "none";
          container2.appendChild(bootstrapLink);
          win[bootstrap] = bootstrapLink;
          bootstrapLink.click();
        } else
          location.reload();
      } else if (history.scrollRestoration === "manual") {
        const scrollState = history.state?.[scrollHistory];
        checkAndScroll(scrollState);
        win[scrollEnabled] = true;
      }
    };
    if (!win[historyPatch]) {
      win[historyPatch] = true;
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const prepareState = (state) => {
        if (state === null || typeof state === "undefined")
          state = {};
        else if (state?.constructor !== Object) {
          state = {
            _data: state
          };
          if (build.isDev)
            console.warn("In a Qwik SPA context, `history.state` is used to store scroll state. Direct calls to `pushState()` and `replaceState()` must supply an actual Object type. We need to be able to automatically attach the scroll state to your state object. A new state object has been created, your data has been moved to: `history.state._data`");
        }
        state._qCityScroll = state._qCityScroll || currentScrollState2();
        return state;
      };
      history.pushState = (state, title, url) => {
        state = prepareState(state);
        return pushState.call(history, state, title, url);
      };
      history.replaceState = (state, title, url) => {
        state = prepareState(state);
        return replaceState.call(history, state, title, url);
      };
    }
    win[initAnchors] = (event) => {
      if (win[spa] || event.defaultPrevented)
        return;
      const target = event.target.closest("a[href]");
      if (target && !target.hasAttribute("preventdefault:click")) {
        const href = target.getAttribute("href");
        const prev = new URL(location.href);
        const dest = new URL(href, prev);
        const sameOrigin = dest.origin === prev.origin;
        const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
        if (sameOrigin && samePath) {
          event.preventDefault();
          if (dest.href !== prev.href)
            history.pushState(null, "", dest);
          if (!dest.hash) {
            if (dest.href.endsWith("#"))
              window.scrollTo(0, 0);
            else {
              win[scrollEnabled] = false;
              clearTimeout(win[debounceTimeout]);
              saveScrollState({
                ...currentScrollState2(),
                x: 0,
                y: 0
              });
              location.reload();
            }
          } else {
            const elmId = dest.hash.slice(1);
            const elm = document.getElementById(elmId);
            if (elm)
              elm.scrollIntoView();
          }
        }
      }
    };
    win[initVisibility] = () => {
      if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden")
        saveScrollState();
    };
    win[initScroll] = () => {
      if (win[spa] || !win[scrollEnabled])
        return;
      clearTimeout(win[debounceTimeout]);
      win[debounceTimeout] = setTimeout(() => {
        saveScrollState();
        win[debounceTimeout] = void 0;
      }, 200);
    };
    win[scrollEnabled] = true;
    setTimeout(() => {
      addEventListener("popstate", win[initPopstate]);
      addEventListener("scroll", win[initScroll], {
        passive: true
      });
      document.body.addEventListener("click", win[initAnchors]);
      if (!win.navigation)
        document.addEventListener("visibilitychange", win[initVisibility], {
          passive: true
        });
    }, 0);
  }
}, "spa_init_DyVc0YBIqQU");
const shim = () => {
  if (build.isServer) {
    const [symbol, bundle] = qwik.getPlatform().chunkForSymbol(spaInit.getSymbol(), null);
    return `(${shim$1.toString()})('${bundle}','${symbol}');`;
  }
};
const shim$1 = async (path, symbol) => {
  if (!window._qcs && history.scrollRestoration === "manual") {
    window._qcs = true;
    const scrollState = history.state?._qCityScroll;
    if (scrollState)
      window.scrollTo(scrollState.x, scrollState.y);
    const currentScript = document.currentScript;
    const container = currentScript.closest("[q\\:container]");
    const base = new URL(container.getAttribute("q:base"), document.baseURI);
    const url = new URL(path, base);
    if (build.isDev) {
      const imp = new Function("url", "return import(url)");
      (await imp(url.href))[symbol](currentScript);
    } else
      (await import(path))[symbol](currentScript);
  }
};
const RouterOutlet = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
  const shimScript = shim();
  qwik._jsxBranch();
  const nonce = qwik.useServerData("nonce");
  const context = qwik.useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      if (context.value[i].default)
        cmp = qwik._jsxC(context.value[i].default, {
          children: cmp
        }, 1, "zl_0");
    return /* @__PURE__ */ qwik._jsxC(jsxRuntime.Fragment, {
      children: [
        cmp,
        /* @__PURE__ */ qwik._jsxQ("script", {
          dangerouslySetInnerHTML: shimScript
        }, {
          nonce
        }, null, 3, null)
      ]
    }, 1, "zl_1");
  }
  return qwik.SkipRender;
}, "RouterOutlet_component_e0ssiDXoeAM"));
const MODULE_CACHE = /* @__PURE__ */ new WeakMap();
const CLIENT_DATA_CACHE = /* @__PURE__ */ new Map();
const PREFETCHED_NAVIGATE_PATHS = /* @__PURE__ */ new Set();
const QACTION_KEY = "qaction";
const QFN_KEY = "qfunc";
const toPath = (url) => url.pathname + url.search + url.hash;
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const withSlash = (path) => path.endsWith("/") ? path : path + "/";
const isSamePathname = ({ pathname: a }, { pathname: b }) => {
  const lDiff = Math.abs(a.length - b.length);
  return lDiff === 0 ? a === b : lDiff === 1 && withSlash(a) === withSlash(b);
};
const isSameSearchQuery = (a, b) => a.search === b.search;
const isSamePath = (a, b) => isSameSearchQuery(a, b) && isSamePathname(a, b);
const getClientDataPath = (pathname, pageSearch, action) => {
  let search = pageSearch ?? "";
  if (action)
    search += (search ? "&" : "?") + QACTION_KEY + "=" + encodeURIComponent(action.id);
  return pathname + (pathname.endsWith("/") ? "" : "/") + "q-data.json" + search;
};
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && typeof props.target !== "string" && !props.reload)
    try {
      const linkUrl = toUrl(href.trim(), baseUrl.url);
      const currentUrl = toUrl("", baseUrl.url);
      if (isSameOrigin(linkUrl, currentUrl))
        return toPath(linkUrl);
    } catch (e) {
      console.error(e);
    }
  else if (props.reload)
    return toPath(toUrl("", baseUrl.url));
  return null;
};
const shouldPrefetchData = (clientNavPath, currentLoc) => {
  if (clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc.url);
    const currentUrl = toUrl("", currentLoc.url);
    return !isSamePath(prefetchUrl, currentUrl);
  }
  return false;
};
const shouldPrefetchSymbols = (clientNavPath, currentLoc) => {
  if (clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc.url);
    const currentUrl = toUrl("", currentLoc.url);
    return !isSamePathname(prefetchUrl, currentUrl);
  }
  return false;
};
const isPromise = (value) => {
  return value && typeof value.then === "function";
};
const resolveHead = (endpoint, routeLocation, contentModules, locale) => {
  const head = createDocumentHead();
  const getData = (loaderOrAction) => {
    const id = loaderOrAction.__id;
    if (loaderOrAction.__brand === "server_loader") {
      if (!(id in endpoint.loaders))
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
    }
    const data = endpoint.loaders[id];
    if (isPromise(data))
      throw new Error("Loaders returning a promise can not be resolved for the head function.");
    return data;
  };
  const headProps = {
    head,
    withLocale: (fn) => qwik.withLocale(locale, fn),
    resolveValue: getData,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head, qwik.withLocale(locale, () => contentModuleHead(headProps)));
      else if (typeof contentModuleHead === "object")
        resolveDocumentHead(head, contentModuleHead);
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string")
    resolvedHead.title = updatedHead.title;
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
  mergeArray(resolvedHead.scripts, updatedHead.scripts);
  Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr))
    for (const newItem of newArr) {
      if (typeof newItem.key === "string") {
        const existingIndex = existingArr.findIndex((i) => i.key === newItem.key);
        if (existingIndex > -1) {
          existingArr[existingIndex] = newItem;
          continue;
        }
      }
      existingArr.push(newItem);
    }
};
const createDocumentHead = () => ({
  title: "",
  meta: [],
  links: [],
  styles: [],
  scripts: [],
  frontmatter: {}
});
function matchRoute(route, path) {
  const routeIdx = startIdxSkipSlash(route);
  const routeLength = lengthNoTrailingSlash(route);
  const pathIdx = startIdxSkipSlash(path);
  const pathLength = lengthNoTrailingSlash(path);
  return matchRoutePart(route, routeIdx, routeLength, path, pathIdx, pathLength);
}
function matchRoutePart(route, routeIdx, routeLength, path, pathIdx, pathLength) {
  let params = null;
  while (routeIdx < routeLength) {
    const routeCh = route.charCodeAt(routeIdx++);
    const pathCh = path.charCodeAt(pathIdx++);
    if (routeCh === 91) {
      const isMany = isThreeDots(route, routeIdx);
      const paramNameStart = routeIdx + (isMany ? 3 : 0);
      const paramNameEnd = scan(route, paramNameStart, routeLength, 93);
      const paramName = route.substring(paramNameStart, paramNameEnd);
      const paramSuffixEnd = scan(route, paramNameEnd + 1, routeLength, 47);
      const suffix = route.substring(paramNameEnd + 1, paramSuffixEnd);
      routeIdx = paramNameEnd + 1;
      const paramValueStart = pathIdx - 1;
      if (isMany) {
        const match = recursiveScan(paramName, suffix, path, paramValueStart, pathLength, route, routeIdx + suffix.length + 1, routeLength);
        if (match)
          return Object.assign(params || (params = {}), match);
      }
      const paramValueEnd = scan(path, paramValueStart, pathLength, 47, suffix);
      if (paramValueEnd == -1)
        return null;
      const paramValue = path.substring(paramValueStart, paramValueEnd);
      if (!isMany && !suffix && !paramValue)
        return null;
      pathIdx = paramValueEnd;
      (params || (params = {}))[paramName] = decodeURIComponent(paramValue);
    } else if (routeCh !== pathCh) {
      if (!(isNaN(pathCh) && isRestParameter(route, routeIdx)))
        return null;
    }
  }
  if (allConsumed(route, routeIdx) && allConsumed(path, pathIdx))
    return params || {};
  else
    return null;
}
function isRestParameter(text, idx) {
  return text.charCodeAt(idx) === 91 && isThreeDots(text, idx + 1);
}
function lengthNoTrailingSlash(text) {
  const length = text.length;
  return length > 1 && text.charCodeAt(length - 1) === 47 ? length - 1 : length;
}
function allConsumed(text, idx) {
  const length = text.length;
  return idx >= length || idx == length - 1 && text.charCodeAt(idx) === 47;
}
function startIdxSkipSlash(text) {
  return text.charCodeAt(0) === 47 ? 1 : 0;
}
function isThreeDots(text, idx) {
  return text.charCodeAt(idx) === 46 && text.charCodeAt(idx + 1) === 46 && text.charCodeAt(idx + 2) === 46;
}
function scan(text, idx, end, ch, suffix = "") {
  while (idx < end && text.charCodeAt(idx) !== ch)
    idx++;
  const suffixLength = suffix.length;
  for (let i = 0; i < suffixLength; i++) {
    if (text.charCodeAt(idx - suffixLength + i) !== suffix.charCodeAt(i))
      return -1;
  }
  return idx - suffixLength;
}
let Char;
(function(Char2) {
  Char2[Char2["EOL"] = 0] = "EOL";
  Char2[Char2["OPEN_BRACKET"] = 91] = "OPEN_BRACKET";
  Char2[Char2["CLOSE_BRACKET"] = 93] = "CLOSE_BRACKET";
  Char2[Char2["DOT"] = 46] = "DOT";
  Char2[Char2["SLASH"] = 47] = "SLASH";
})(Char || (Char = {}));
function recursiveScan(paramName, suffix, path, pathStart, pathLength, route, routeStart, routeLength) {
  if (path.charCodeAt(pathStart) === 47)
    pathStart++;
  let pathIdx = pathLength;
  const sep = suffix + "/";
  let depthWatchdog = 5;
  while (pathIdx >= pathStart && depthWatchdog--) {
    const match = matchRoutePart(route, routeStart, routeLength, path, pathIdx, pathLength);
    if (match) {
      let value = path.substring(pathStart, Math.min(pathIdx, pathLength));
      if (value.endsWith(sep))
        value = value.substring(0, value.length - sep.length);
      match[paramName] = decodeURIComponent(value);
      return match;
    }
    pathIdx = lastIndexOf(path, pathStart, sep, pathIdx, pathStart - 1) + sep.length;
  }
  return null;
}
function lastIndexOf(text, start, match, searchIdx, notFoundIdx) {
  let idx = text.lastIndexOf(match, searchIdx);
  if (idx == searchIdx - match.length)
    idx = text.lastIndexOf(match, searchIdx - match.length - 1);
  return idx > start ? idx : notFoundIdx;
}
const loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes))
    for (const route of routes) {
      const routeName = route[0];
      const params = matchRoute(routeName, pathname);
      if (params) {
        const loaders = route[1];
        const routeBundleNames = route[3];
        const mods = new Array(loaders.length);
        const pendingLoads = [];
        const menuLoader = getMenuLoader(menus, pathname);
        let menu = void 0;
        loaders.forEach((moduleLoader, i) => {
          loadModule(moduleLoader, pendingLoads, (routeModule) => mods[i] = routeModule, cacheModules);
        });
        loadModule(menuLoader, pendingLoads, (menuModule) => menu = menuModule?.default, cacheModules);
        if (pendingLoads.length > 0)
          await Promise.all(pendingLoads);
        return [
          routeName,
          params,
          mods,
          menu,
          routeBundleNames
        ];
      }
    }
  return null;
};
const loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule)
      moduleSetter(loadedModule);
    else {
      const l = moduleLoader();
      if (typeof l.then === "function")
        pendingLoads.push(l.then((loadedModule2) => {
          if (cacheModules !== false)
            MODULE_CACHE.set(moduleLoader, loadedModule2);
          moduleSetter(loadedModule2);
        }));
      else if (l)
        moduleSetter(l);
    }
  }
};
const getMenuLoader = (menus, pathname) => {
  if (menus) {
    pathname = pathname.endsWith("/") ? pathname : pathname + "/";
    const menu = menus.find((m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/")));
    if (menu)
      return menu[1];
  }
};
const clientNavigate = (win, navType, fromURL, toURL, replaceState = false) => {
  if (navType !== "popstate") {
    const samePath = isSamePath(fromURL, toURL);
    const sameHash = fromURL.hash === toURL.hash;
    if (!samePath || !sameHash) {
      const newState = {
        _qCityScroll: newScrollState()
      };
      if (replaceState)
        win.history.replaceState(newState, "", toPath(toURL));
      else
        win.history.pushState(newState, "", toPath(toURL));
    }
  }
};
const newScrollState = () => {
  return {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  };
};
const prefetchSymbols = (path) => {
  if (build.isBrowser) {
    path = path.endsWith("/") ? path : path + "/";
    if (!PREFETCHED_NAVIGATE_PATHS.has(path)) {
      PREFETCHED_NAVIGATE_PATHS.add(path);
      document.dispatchEvent(new CustomEvent("qprefetch", {
        detail: {
          links: [
            path
          ]
        }
      }));
    }
  }
};
const loadClientData = async (url, element, opts) => {
  const pagePathname = url.pathname;
  const pageSearch = url.search;
  const clientDataPath = getClientDataPath(pagePathname, pageSearch, opts?.action);
  let qData = void 0;
  if (!opts?.action)
    qData = CLIENT_DATA_CACHE.get(clientDataPath);
  if (opts?.prefetchSymbols !== false)
    prefetchSymbols(pagePathname);
  let resolveFn;
  if (!qData) {
    const fetchOptions = getFetchOptions(opts?.action);
    if (opts?.action)
      opts.action.data = void 0;
    qData = fetch(clientDataPath, fetchOptions).then((rsp) => {
      const redirectedURL = new URL(rsp.url);
      const isQData = redirectedURL.pathname.endsWith("/q-data.json");
      if (redirectedURL.origin !== location.origin || !isQData) {
        location.href = redirectedURL.href;
        return;
      }
      if ((rsp.headers.get("content-type") || "").includes("json"))
        return rsp.text().then((text) => {
          const clientData = qwik._deserializeData(text, element);
          if (!clientData) {
            location.href = url.href;
            return;
          }
          if (opts?.clearCache)
            CLIENT_DATA_CACHE.delete(clientDataPath);
          if (clientData.redirect)
            location.href = clientData.redirect;
          else if (opts?.action) {
            const { action } = opts;
            const actionData = clientData.loaders[action.id];
            resolveFn = () => {
              action.resolve({
                status: rsp.status,
                result: actionData
              });
            };
          }
          return clientData;
        });
      else {
        if (opts?.isPrefetch !== true)
          location.href = url.href;
        return void 0;
      }
    });
    if (!opts?.action)
      CLIENT_DATA_CACHE.set(clientDataPath, qData);
  }
  return qData.then((v) => {
    if (!v)
      CLIENT_DATA_CACHE.delete(clientDataPath);
    resolveFn && resolveFn();
    return v;
  });
};
const getFetchOptions = (action) => {
  const actionData = action?.data;
  if (!actionData)
    return void 0;
  if (actionData instanceof FormData)
    return {
      method: "POST",
      body: actionData
    };
  else
    return {
      method: "POST",
      body: JSON.stringify(actionData),
      headers: {
        "Content-Type": "application/json, charset=UTF-8"
      }
    };
};
const useContent = () => qwik.useContext(ContentContext);
const useDocumentHead = () => qwik.useContext(DocumentHeadContext);
const useLocation = () => qwik.useContext(RouteLocationContext);
const useNavigate = () => qwik.useContext(RouteNavigateContext);
const useAction = () => qwik.useContext(RouteActionContext);
const useQwikCityEnv = () => qwik.noSerialize(qwik.useServerData("qwikcity"));
const restoreScroll = (type, toUrl2, fromUrl, scrollState) => {
  if (type === "popstate" && scrollState)
    window.scrollTo(scrollState.x, scrollState.y);
  else if (type === "link" || type === "form") {
    if (!hashScroll(toUrl2, fromUrl))
      window.scrollTo(0, 0);
  }
};
const hashScroll = (toUrl2, fromUrl) => {
  const elmId = toUrl2.hash.slice(1);
  const elm = elmId && document.getElementById(elmId);
  if (elm) {
    elm.scrollIntoView();
    return true;
  } else if (!elm && toUrl2.hash && isSamePath(toUrl2, fromUrl))
    return true;
  return false;
};
const currentScrollState = (elm) => {
  return {
    x: elm.scrollLeft,
    y: elm.scrollTop,
    w: Math.max(elm.scrollWidth, elm.clientWidth),
    h: Math.max(elm.scrollHeight, elm.clientHeight)
  };
};
const getScrollHistory = () => {
  const state = history.state;
  return state?._qCityScroll;
};
const saveScrollHistory = (scrollState) => {
  const state = history.state || {};
  state._qCityScroll = scrollState;
  history.replaceState(state, "");
};
const QwikCityProvider = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesQrl(/* @__PURE__ */ qwik.inlinedQrl(`:root{view-transition-name:none}`, "QwikCityProvider_component_useStyles_RPDJAz33WLA"));
  const env = useQwikCityEnv();
  if (!env?.params)
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = qwik.useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = qwik.useStore({
    url,
    params: env.params,
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const navResolver = {};
  const loaderState = qwik._weakSerialize(qwik.useStore(env.response.loaders, {
    deep: false
  }));
  const routeInternal = qwik.useSignal({
    type: "initial",
    dest: url,
    forceReload: false,
    replaceState: false,
    scroll: true
  });
  const documentHead = qwik.useStore(createDocumentHead);
  const content = qwik.useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = qwik.useSignal();
  const currentActionId = env.response.action;
  const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
  const actionState = qwik.useSignal(currentAction ? {
    id: currentActionId,
    data: env.response.formData,
    output: {
      result: currentAction,
      status: env.response.status
    }
  } : void 0);
  const goto = /* @__PURE__ */ qwik.inlinedQrl(async (path, opt) => {
    const [actionState2, navResolver2, routeInternal2, routeLocation2] = qwik.useLexicalScope();
    const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
      forceReload: opt
    };
    const lastDest = routeInternal2.value.dest;
    const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
    if (!isSameOrigin(dest, lastDest)) {
      if (build.isBrowser)
        location.href = dest.href;
      return;
    }
    if (!forceReload && isSamePath(dest, lastDest)) {
      if (build.isBrowser) {
        if (type === "link" && dest.href !== location.href)
          history.pushState(null, "", dest);
        restoreScroll(type, dest, new URL(location.href), getScrollHistory());
        if (type === "popstate")
          window._qCityScrollEnabled = true;
      }
      return;
    }
    routeInternal2.value = {
      type,
      dest,
      forceReload,
      replaceState,
      scroll
    };
    if (build.isBrowser) {
      loadClientData(dest, qwik._getContextElement());
      loadRoute(qwikCity__namespace.routes, qwikCity__namespace.menus, qwikCity__namespace.cacheModules, dest.pathname);
    }
    actionState2.value = void 0;
    routeLocation2.isNavigating = true;
    return new Promise((resolve) => {
      navResolver2.r = resolve;
    });
  }, "QwikCityProvider_component_goto_fX0bDjeJa0E", [
    actionState,
    navResolver,
    routeInternal,
    routeLocation
  ]);
  qwik.useContextProvider(ContentContext, content);
  qwik.useContextProvider(ContentInternalContext, contentInternal);
  qwik.useContextProvider(DocumentHeadContext, documentHead);
  qwik.useContextProvider(RouteLocationContext, routeLocation);
  qwik.useContextProvider(RouteNavigateContext, goto);
  qwik.useContextProvider(RouteStateContext, loaderState);
  qwik.useContextProvider(RouteActionContext, actionState);
  qwik.useContextProvider(RouteInternalContext, routeInternal);
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(({ track }) => {
    const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = qwik.useLexicalScope();
    async function run() {
      const [navigation, action] = track(() => [
        routeInternal2.value,
        actionState2.value
      ]);
      const locale = qwik.getLocale("");
      const prevUrl = routeLocation2.url;
      const navType = action ? "form" : navigation.type;
      const replaceState = navigation.replaceState;
      let trackUrl;
      let clientPageData;
      let loadedRoute = null;
      let elm;
      if (build.isServer) {
        trackUrl = new URL(navigation.dest, routeLocation2.url);
        loadedRoute = env2.loadedRoute;
        clientPageData = env2.response;
      } else {
        trackUrl = new URL(navigation.dest, location);
        if (trackUrl.pathname.endsWith("/")) {
          if (!qwikCity__namespace.trailingSlash)
            trackUrl.pathname = trackUrl.pathname.slice(0, -1);
        } else if (qwikCity__namespace.trailingSlash)
          trackUrl.pathname += "/";
        let loadRoutePromise = loadRoute(qwikCity__namespace.routes, qwikCity__namespace.menus, qwikCity__namespace.cacheModules, trackUrl.pathname);
        elm = qwik._getContextElement();
        const pageData = clientPageData = await loadClientData(trackUrl, elm, {
          action,
          clearCache: true
        });
        if (!pageData) {
          routeInternal2.untrackedValue = {
            type: navType,
            dest: trackUrl
          };
          return;
        }
        const newHref = pageData.href;
        const newURL = new URL(newHref, trackUrl);
        if (!isSamePathname(newURL, trackUrl)) {
          trackUrl = newURL;
          loadRoutePromise = loadRoute(qwikCity__namespace.routes, qwikCity__namespace.menus, qwikCity__namespace.cacheModules, trackUrl.pathname);
        }
        try {
          loadedRoute = await loadRoutePromise;
        } catch (e) {
          window.location.href = newHref;
          return;
        }
      }
      if (loadedRoute) {
        const [routeName, params, mods, menu] = loadedRoute;
        const contentModules = mods;
        const pageModule = contentModules[contentModules.length - 1];
        routeLocation2.prevUrl = prevUrl;
        routeLocation2.url = trackUrl;
        routeLocation2.params = {
          ...params
        };
        routeInternal2.untrackedValue = {
          type: navType,
          dest: trackUrl
        };
        const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules, locale);
        content2.headings = pageModule.headings;
        content2.menu = menu;
        contentInternal2.value = qwik.noSerialize(contentModules);
        documentHead2.links = resolvedHead.links;
        documentHead2.meta = resolvedHead.meta;
        documentHead2.styles = resolvedHead.styles;
        documentHead2.scripts = resolvedHead.scripts;
        documentHead2.title = resolvedHead.title;
        documentHead2.frontmatter = resolvedHead.frontmatter;
        if (build.isBrowser) {
          if (props2.viewTransition !== false)
            document.__q_view_transition__ = true;
          let scrollState;
          if (navType === "popstate")
            scrollState = getScrollHistory();
          if (navigation.scroll && (!navigation.forceReload || !isSamePath(trackUrl, prevUrl)) && (navType === "link" || navType === "popstate") || navType === "form" && !isSamePath(trackUrl, prevUrl))
            document.__q_scroll_restore__ = () => restoreScroll(navType, trackUrl, prevUrl, scrollState);
          const loaders = clientPageData?.loaders;
          const win = window;
          if (loaders)
            Object.assign(loaderState2, loaders);
          CLIENT_DATA_CACHE.clear();
          if (!win._qCitySPA) {
            win._qCitySPA = true;
            history.scrollRestoration = "manual";
            win.addEventListener("popstate", () => {
              win._qCityScrollEnabled = false;
              clearTimeout(win._qCityScrollDebounce);
              goto2(location.href, {
                type: "popstate"
              });
            });
            win.removeEventListener("popstate", win._qCityInitPopstate);
            win._qCityInitPopstate = void 0;
            if (!win._qCityHistoryPatch) {
              win._qCityHistoryPatch = true;
              const pushState = history.pushState;
              const replaceState2 = history.replaceState;
              const prepareState = (state) => {
                if (state === null || typeof state === "undefined")
                  state = {};
                else if (state?.constructor !== Object) {
                  state = {
                    _data: state
                  };
                  if (build.isDev)
                    console.warn("In a Qwik SPA context, `history.state` is used to store scroll state. Direct calls to `pushState()` and `replaceState()` must supply an actual Object type. We need to be able to automatically attach the scroll state to your state object. A new state object has been created, your data has been moved to: `history.state._data`");
                }
                state._qCityScroll = state._qCityScroll || currentScrollState(document.documentElement);
                return state;
              };
              history.pushState = (state, title, url2) => {
                state = prepareState(state);
                return pushState.call(history, state, title, url2);
              };
              history.replaceState = (state, title, url2) => {
                state = prepareState(state);
                return replaceState2.call(history, state, title, url2);
              };
            }
            document.body.addEventListener("click", (event) => {
              if (event.defaultPrevented)
                return;
              const target = event.target.closest("a[href]");
              if (target && !target.hasAttribute("preventdefault:click")) {
                const href = target.getAttribute("href");
                const prev = new URL(location.href);
                const dest = new URL(href, prev);
                if (isSameOrigin(dest, prev) && isSamePath(dest, prev)) {
                  event.preventDefault();
                  if (!dest.hash && !dest.href.endsWith("#")) {
                    if (dest.href !== prev.href)
                      history.pushState(null, "", dest);
                    win._qCityScrollEnabled = false;
                    clearTimeout(win._qCityScrollDebounce);
                    saveScrollHistory({
                      ...currentScrollState(document.documentElement),
                      x: 0,
                      y: 0
                    });
                    location.reload();
                    return;
                  }
                  goto2(target.getAttribute("href"));
                }
              }
            });
            document.body.removeEventListener("click", win._qCityInitAnchors);
            win._qCityInitAnchors = void 0;
            if (!window.navigation) {
              document.addEventListener("visibilitychange", () => {
                if (win._qCityScrollEnabled && document.visibilityState === "hidden") {
                  const scrollState2 = currentScrollState(document.documentElement);
                  saveScrollHistory(scrollState2);
                }
              }, {
                passive: true
              });
              document.removeEventListener("visibilitychange", win._qCityInitVisibility);
              win._qCityInitVisibility = void 0;
            }
            win.addEventListener("scroll", () => {
              if (!win._qCityScrollEnabled)
                return;
              clearTimeout(win._qCityScrollDebounce);
              win._qCityScrollDebounce = setTimeout(() => {
                const scrollState2 = currentScrollState(document.documentElement);
                saveScrollHistory(scrollState2);
                win._qCityScrollDebounce = void 0;
              }, 200);
            }, {
              passive: true
            });
            removeEventListener("scroll", win._qCityInitScroll);
            win._qCityInitScroll = void 0;
            win._qCityBootstrap?.remove();
            win._qCityBootstrap = void 0;
            spaInit.resolve();
          }
          if (navType !== "popstate") {
            win._qCityScrollEnabled = false;
            clearTimeout(win._qCityScrollDebounce);
            const scrollState2 = currentScrollState(document.documentElement);
            saveScrollHistory(scrollState2);
          }
          clientNavigate(window, navType, prevUrl, trackUrl, replaceState);
          qwik._waitUntilRendered(elm).then(() => {
            const container = getContainer(elm);
            container.setAttribute("q:route", routeName);
            const scrollState2 = currentScrollState(document.documentElement);
            saveScrollHistory(scrollState2);
            win._qCityScrollEnabled = true;
            routeLocation2.isNavigating = false;
            navResolver2.r?.();
          });
        }
      }
    }
    const promise = run();
    if (build.isServer)
      return promise;
    else
      return;
  }, "QwikCityProvider_component_useTask_02wMImzEAbk", [
    actionState,
    content,
    contentInternal,
    documentHead,
    env,
    goto,
    loaderState,
    navResolver,
    props,
    routeInternal,
    routeLocation
  ]));
  return /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "qY_0");
}, "QwikCityProvider_component_TxCFOy819ag"));
function getContainer(elm) {
  while (elm && elm.nodeType !== Node.ELEMENT_NODE)
    elm = elm.parentElement;
  return elm.closest("[q\\:container]");
}
const QwikCityMockProvider = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const urlEnv = props.url ?? "http://localhost/";
  const url = new URL(urlEnv);
  const routeLocation = qwik.useStore({
    url,
    params: props.params ?? {},
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const loaderState = qwik.useSignal({});
  const routeInternal = qwik.useSignal({
    type: "initial",
    dest: url
  });
  const goto = props.goto ?? /* @__PURE__ */ qwik.inlinedQrl(async () => {
    console.warn("QwikCityMockProvider: goto not provided");
  }, "QwikCityMockProvider_component_goto_BUbtvTyvVRE");
  const documentHead = qwik.useStore(createDocumentHead, {
    deep: false
  });
  const content = qwik.useStore({
    headings: void 0,
    menu: void 0
  }, {
    deep: false
  });
  const contentInternal = qwik.useSignal();
  const actionState = qwik.useSignal();
  qwik.useContextProvider(ContentContext, content);
  qwik.useContextProvider(ContentInternalContext, contentInternal);
  qwik.useContextProvider(DocumentHeadContext, documentHead);
  qwik.useContextProvider(RouteLocationContext, routeLocation);
  qwik.useContextProvider(RouteNavigateContext, goto);
  qwik.useContextProvider(RouteStateContext, loaderState);
  qwik.useContextProvider(RouteActionContext, actionState);
  qwik.useContextProvider(RouteInternalContext, routeInternal);
  return /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "qY_1");
}, "QwikCityMockProvider_component_WmYC5H00wtI"));
const Link = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const { onClick$, prefetch: prefetchProp, reload, replaceState, scroll, ...linkProps } = /* @__PURE__ */ (() => props)();
  const clientNavPath = qwik.untrack(() => getClientNavPath({
    ...linkProps,
    reload
  }, loc));
  linkProps["link:app"] = !!clientNavPath;
  linkProps.href = clientNavPath || props.href;
  const prefetchData = qwik.untrack(() => !!clientNavPath && prefetchProp !== false && prefetchProp !== "js" && shouldPrefetchData(clientNavPath, loc) || void 0);
  const prefetch = qwik.untrack(() => prefetchData || !!clientNavPath && prefetchProp !== false && shouldPrefetchSymbols(clientNavPath, loc));
  const handlePrefetch = prefetch ? /* @__PURE__ */ qwik.inlinedQrl((_, elm) => {
    if (navigator.connection?.saveData)
      return;
    if (elm && elm.href) {
      const url = new URL(elm.href);
      prefetchSymbols(url.pathname);
      if (elm.hasAttribute("data-prefetch"))
        loadClientData(url, elm, {
          prefetchSymbols: false,
          isPrefetch: true
        });
    }
  }, "Link_component_handlePrefetch_Osdg8FnYTw4") : void 0;
  const preventDefault = clientNavPath ? qwik._qrlSync((event, target) => {
    if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey))
      event.preventDefault();
  }, "(event,target)=>{if(!(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)){event.preventDefault();}}") : void 0;
  const handleClick = clientNavPath ? /* @__PURE__ */ qwik.inlinedQrl(async (event, elm) => {
    const [nav2, reload2, replaceState2, scroll2] = qwik.useLexicalScope();
    if (event.defaultPrevented) {
      if (elm.hasAttribute("q:nbs"))
        await nav2(location.href, {
          type: "popstate"
        });
      else if (elm.href) {
        elm.setAttribute("aria-pressed", "true");
        await nav2(elm.href, {
          forceReload: reload2,
          replaceState: replaceState2,
          scroll: scroll2
        });
        elm.removeAttribute("aria-pressed");
      }
    }
  }, "Link_component_handleClick_pIf0khHUxfY", [
    nav,
    reload,
    replaceState,
    scroll
  ]) : void 0;
  return /* @__PURE__ */ qwik._jsxS("a", {
    ...linkProps,
    children: /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "AD_0"),
    "data-prefetch": prefetchData,
    onClick$: [
      preventDefault,
      onClick$,
      handleClick
    ],
    onFocus$: [
      linkProps.onFocus$,
      handlePrefetch
    ],
    onMouseOver$: [
      linkProps.onMouseOver$,
      handlePrefetch
    ],
    // Don't prefetch on visible in dev mode
    onQVisible$: [
      linkProps.onQVisible$,
      !build.isDev ? handlePrefetch : void 0
    ]
  }, null, 0, "AD_1");
}, "Link_component_8gdLBszqbaM"));
const ServiceWorkerRegister = (props) => qwik._jsxQ("script", {
  nonce: qwik._wrapSignal(props, "nonce")
}, {
  dangerouslySetInnerHTML: swRegister
}, null, 3, "1Z_0");
const routeActionQrl = (actionQrl, ...rest) => {
  const { id, validators } = getValidators(rest, actionQrl);
  function action() {
    const loc = useLocation();
    const currentAction = useAction();
    const initialState = {
      actionPath: `?${QACTION_KEY}=${id}`,
      isRunning: false,
      status: void 0,
      value: void 0,
      formData: void 0
    };
    const state = qwik.useStore(() => {
      const value = currentAction.value;
      if (value && value?.id === id) {
        const data = value.data;
        if (data instanceof FormData)
          initialState.formData = data;
        if (value.output) {
          const { status, result } = value.output;
          initialState.status = status;
          initialState.value = result;
        }
      }
      return initialState;
    });
    const submit = /* @__PURE__ */ qwik.inlinedQrl((input = {}) => {
      const [currentAction2, id2, loc2, state2] = qwik.useLexicalScope();
      if (build.isServer)
        throw new Error(`Actions can not be invoked within the server during SSR.
Action.run() can only be called on the browser, for example when a user clicks a button, or submits a form.`);
      let data;
      let form;
      if (input instanceof SubmitEvent) {
        form = input.target;
        data = new FormData(form);
        if ((input.submitter instanceof HTMLInputElement || input.submitter instanceof HTMLButtonElement) && input.submitter.name) {
          if (input.submitter.name)
            data.append(input.submitter.name, input.submitter.value);
        }
      } else
        data = input;
      return new Promise((resolve) => {
        if (data instanceof FormData)
          state2.formData = data;
        state2.isRunning = true;
        loc2.isNavigating = true;
        currentAction2.value = {
          data,
          id: id2,
          resolve: qwik.noSerialize(resolve)
        };
      }).then(({ result, status }) => {
        state2.isRunning = false;
        state2.status = status;
        state2.value = result;
        if (form) {
          if (form.getAttribute("data-spa-reset") === "true")
            form.reset();
          const detail = {
            status,
            value: result
          };
          form.dispatchEvent(new CustomEvent("submitcompleted", {
            bubbles: false,
            cancelable: false,
            composed: false,
            detail
          }));
        }
        return {
          status,
          value: result
        };
      });
    }, "routeActionQrl_action_submit_A5bZC7WO00A", [
      currentAction,
      id,
      loc,
      state
    ]);
    initialState.submit = submit;
    return state;
  }
  action.__brand = "server_action";
  action.__validators = validators;
  action.__qrl = actionQrl;
  action.__id = id;
  Object.freeze(action);
  return action;
};
const globalActionQrl = (actionQrl, ...rest) => {
  const action = routeActionQrl(actionQrl, ...rest);
  if (build.isServer) {
    if (typeof globalThis._qwikActionsMap === "undefined")
      globalThis._qwikActionsMap = /* @__PURE__ */ new Map();
    globalThis._qwikActionsMap.set(action.__id, action);
  }
  return action;
};
const routeAction$ = /* @__PURE__ */ qwik.implicit$FirstArg(routeActionQrl);
const globalAction$ = /* @__PURE__ */ qwik.implicit$FirstArg(globalActionQrl);
const routeLoaderQrl = (loaderQrl, ...rest) => {
  const { id, validators } = getValidators(rest, loaderQrl);
  function loader() {
    return qwik.useContext(RouteStateContext, (state) => {
      if (!(id in state))
        throw new Error(`routeLoader$ "${loaderQrl.getSymbol()}" was invoked in a route where it was not declared.
    This is because the routeLoader$ was not exported in a 'layout.tsx' or 'index.tsx' file of the existing route.
    For more information check: https://qwik.builder.io/qwikcity/route-loader/

    If your are managing reusable logic or a library it is essential that this function is re-exported from within 'layout.tsx' or 'index.tsx file of the existing route otherwise it will not run or throw exception.
    For more information check: https://qwik.builder.io/docs/cookbook/re-exporting-loaders/`);
      return qwik._wrapSignal(state, id);
    });
  }
  loader.__brand = "server_loader";
  loader.__qrl = loaderQrl;
  loader.__validators = validators;
  loader.__id = id;
  Object.freeze(loader);
  return loader;
};
const routeLoader$ = /* @__PURE__ */ qwik.implicit$FirstArg(routeLoaderQrl);
const validatorQrl = (validator) => {
  if (build.isServer)
    return {
      validate: validator
    };
  return void 0;
};
const validator$ = /* @__PURE__ */ qwik.implicit$FirstArg(validatorQrl);
const zodQrl = (qrl) => {
  if (build.isServer)
    return {
      async validate(ev, inputData) {
        const schema = qrl.resolve().then((obj) => {
          if (typeof obj === "function")
            obj = obj(zod.z, ev);
          if (obj instanceof zod.z.Schema)
            return obj;
          else
            return zod.z.object(obj);
        });
        const data = inputData ?? await ev.parseBody();
        const result = await (await schema).safeParseAsync(data);
        if (result.success)
          return result;
        else {
          if (build.isDev)
            console.error("\nVALIDATION ERROR\naction$() zod validated failed", "\n  - Issues:", result.error.issues);
          return {
            success: false,
            status: 400,
            error: result.error.flatten()
          };
        }
      }
    };
  return void 0;
};
const zod$ = /* @__PURE__ */ qwik.implicit$FirstArg(zodQrl);
const serverQrl = (qrl) => {
  if (build.isServer) {
    const captured = qrl.getCaptured();
    if (captured && captured.length > 0 && !qwik._getContextElement())
      throw new Error("For security reasons, we cannot serialize QRLs that capture lexical scope.");
  }
  function stuff() {
    return /* @__PURE__ */ qwik.inlinedQrl(async function(...args) {
      const [qrl2] = qwik.useLexicalScope();
      const signal = args.length > 0 && args[0] instanceof AbortSignal ? args.shift() : void 0;
      if (build.isServer) {
        const requestEvent = [
          useQwikCityEnv()?.ev,
          this,
          qwik._getContextEvent()
        ].find((v) => v && Object.prototype.hasOwnProperty.call(v, "sharedMap") && Object.prototype.hasOwnProperty.call(v, "cookie"));
        return qrl2.apply(requestEvent, args);
      } else {
        const ctxElm = qwik._getContextElement();
        const filtered = args.map((arg) => {
          if (arg instanceof SubmitEvent && arg.target instanceof HTMLFormElement)
            return new FormData(arg.target);
          else if (arg instanceof Event)
            return null;
          else if (arg instanceof Node)
            return null;
          return arg;
        });
        const hash = qrl2.getHash();
        const res = await fetch(`?${QFN_KEY}=${hash}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/qwik-json",
            // Required so we don't call accidentally
            "X-QRL": hash
          },
          signal,
          body: await qwik._serializeData([
            qrl2,
            ...filtered
          ], false)
        });
        const contentType = res.headers.get("Content-Type");
        if (res.ok && contentType === "text/qwik-json-stream" && res.body)
          return async function* () {
            try {
              for await (const result of deserializeStream(res.body, ctxElm ?? document.documentElement, signal))
                yield result;
            } finally {
              if (!signal?.aborted)
                await res.body.cancel();
            }
          }();
        else if (contentType === "application/qwik-json") {
          const str = await res.text();
          const obj = await qwik._deserializeData(str, ctxElm ?? document.documentElement);
          if (res.status === 500)
            throw obj;
          return obj;
        }
      }
    }, "serverQrl_stuff_wOIPfiQ04l4", [
      qrl
    ]);
  }
  return stuff();
};
const server$ = /* @__PURE__ */ qwik.implicit$FirstArg(serverQrl);
const getValidators = (rest, qrl) => {
  let id;
  const validators = [];
  if (rest.length === 1) {
    const options = rest[0];
    if (options && typeof options === "object") {
      if ("validate" in options)
        validators.push(options);
      else {
        id = options.id;
        if (options.validation)
          validators.push(...options.validation);
      }
    }
  } else if (rest.length > 1)
    validators.push(...rest.filter((v) => !!v));
  if (typeof id === "string") {
    if (build.isDev) {
      if (!/^[\w/.-]+$/.test(id))
        throw new Error(`Invalid id: ${id}, id can only contain [a-zA-Z0-9_.-]`);
    }
    id = `id_${id}`;
  } else
    id = qrl.getHash();
  return {
    validators: validators.reverse(),
    id
  };
};
const deserializeStream = async function* (stream, ctxElm, signal) {
  const reader = stream.getReader();
  try {
    let buffer = "";
    const decoder = new TextDecoder();
    while (!signal?.aborted) {
      const result = await reader.read();
      if (result.done)
        break;
      buffer += decoder.decode(result.value, {
        stream: true
      });
      const lines = buffer.split(/\n/);
      buffer = lines.pop();
      for (const line of lines)
        yield await qwik._deserializeData(line, ctxElm);
    }
  } finally {
    reader.releaseLock();
  }
};
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }, key) => {
  qwik._jsxBranch();
  if (action)
    return qwik._jsxS("form", {
      ...rest,
      action: qwik._wrapSignal(action, "actionPath"),
      "preventdefault:submit": !reloadDocument,
      ["data-spa-reset"]: spaReset ? "true" : void 0,
      onSubmit$: [
        !reloadDocument ? action.submit : void 0,
        onSubmit$
      ]
    }, {
      method: "post"
    }, 0, key);
  else
    return /* @__PURE__ */ qwik._jsxC(GetForm, {
      onSubmit$,
      reloadDocument,
      spaReset,
      ...rest
    }, 0, key);
};
const GetForm = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const rest = qwik._restProps(props, [
    "action",
    "spaReset",
    "reloadDocument",
    "onSubmit$"
  ]);
  const nav = useNavigate();
  return /* @__PURE__ */ qwik._jsxS("form", {
    ...rest,
    children: /* @__PURE__ */ qwik._jsxC(qwik.Slot, null, 3, "BC_0"),
    onSubmit$: /* @__PURE__ */ qwik.inlinedQrl(async (_, form) => {
      const [nav2] = qwik.useLexicalScope();
      const formData = new FormData(form);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === "string")
          params.append(key, value);
      });
      nav2("?" + params.toString(), {
        type: "form",
        forceReload: true
      }).then(() => {
        if (form.getAttribute("data-spa-reset") === "true")
          form.reset();
        form.dispatchEvent(new CustomEvent("submitcompleted", {
          bubbles: false,
          cancelable: false,
          composed: false,
          detail: {
            status: 200
          }
        }));
      });
    }, "GetForm_component_form_onSubmit_p9MSze0ojs4", [
      nav
    ])
  }, {
    action: "get",
    "data-spa-reset": qwik._fnSignal((p0) => p0.spaReset ? "true" : void 0, [
      props
    ], 'p0.spaReset?"true":undefined'),
    "preventdefault:submit": qwik._fnSignal((p0) => !p0.reloadDocument, [
      props
    ], "!p0.reloadDocument")
  }, 0, "BC_1");
}, "GetForm_component_Nk9PlpjQm9Y"));
Object.defineProperty(exports, "z", {
  enumerable: true,
  get: () => zod.z
});
exports.Form = Form;
exports.Link = Link;
exports.QwikCityMockProvider = QwikCityMockProvider;
exports.QwikCityProvider = QwikCityProvider;
exports.RouterOutlet = RouterOutlet;
exports.ServiceWorkerRegister = ServiceWorkerRegister;
exports.globalAction$ = globalAction$;
exports.globalActionQrl = globalActionQrl;
exports.routeAction$ = routeAction$;
exports.routeActionQrl = routeActionQrl;
exports.routeLoader$ = routeLoader$;
exports.routeLoaderQrl = routeLoaderQrl;
exports.server$ = server$;
exports.serverQrl = serverQrl;
exports.useContent = useContent;
exports.useDocumentHead = useDocumentHead;
exports.useLocation = useLocation;
exports.useNavigate = useNavigate;
exports.validator$ = validator$;
exports.validatorQrl = validatorQrl;
exports.zod$ = zod$;
exports.zodQrl = zodQrl;
