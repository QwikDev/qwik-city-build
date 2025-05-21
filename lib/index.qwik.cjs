"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const qwik = require("@builder.io/qwik");
const qwikCity = require("@qwik-city-plan");
const preloader = require("@builder.io/qwik/preloader");
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
const RoutePreventNavigateContext = /* @__PURE__ */ qwik.createContextId("qc-p");
const spaInit = qwik.event$((_, el) => {
  const win = window;
  const spa = "_qCitySPA";
  const initPopstate = "_qCityInitPopstate";
  const initAnchors = "_qCityInitAnchors";
  const initVisibility = "_qCityInitVisibility";
  const initScroll = "_qCityInitScroll";
  if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
    const currentPath = location.pathname + location.search;
    const historyPatch = "_qCityHistoryPatch";
    const bootstrap = "_qCityBootstrap";
    const scrollEnabled = "_qCityScrollEnabled";
    const debounceTimeout = "_qCityScrollDebounce";
    const scrollHistory = "_qCityScroll";
    const checkAndScroll = (scrollState) => {
      if (scrollState) {
        win.scrollTo(scrollState.x, scrollState.y);
      }
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
    saveScrollState();
    win[initPopstate] = () => {
      if (win[spa]) {
        return;
      }
      win[scrollEnabled] = false;
      clearTimeout(win[debounceTimeout]);
      if (currentPath !== location.pathname + location.search) {
        const getContainer2 = (el2) => el2.closest("[q\\:container]");
        const link = getContainer2(el)?.querySelector("a[q\\:link]");
        if (link) {
          const container = getContainer2(link);
          const bootstrapLink = link.cloneNode();
          bootstrapLink.setAttribute("q:nbs", "");
          bootstrapLink.style.display = "none";
          container.appendChild(bootstrapLink);
          win[bootstrap] = bootstrapLink;
          bootstrapLink.click();
        } else {
          location.reload();
        }
      } else {
        if (history.scrollRestoration === "manual") {
          const scrollState = history.state?.[scrollHistory];
          checkAndScroll(scrollState);
          win[scrollEnabled] = true;
        }
      }
    };
    if (!win[historyPatch]) {
      win[historyPatch] = true;
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const prepareState = (state) => {
        if (state === null || typeof state === "undefined") {
          state = {};
        } else if (state?.constructor !== Object) {
          state = {
            _data: state
          };
          if (qwik.isDev) {
            console.warn("In a Qwik SPA context, `history.state` is used to store scroll state. Direct calls to `pushState()` and `replaceState()` must supply an actual Object type. We need to be able to automatically attach the scroll state to your state object. A new state object has been created, your data has been moved to: `history.state._data`");
          }
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
      if (win[spa] || event.defaultPrevented) {
        return;
      }
      const target = event.target.closest("a[href]");
      if (target && !target.hasAttribute("preventdefault:click")) {
        const href = target.getAttribute("href");
        const prev = new URL(location.href);
        const dest = new URL(href, prev);
        const sameOrigin = dest.origin === prev.origin;
        const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
        if (sameOrigin && samePath) {
          event.preventDefault();
          if (dest.href !== prev.href) {
            history.pushState(null, "", dest);
          }
          if (!dest.hash) {
            if (dest.href.endsWith("#")) {
              window.scrollTo(0, 0);
            } else {
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
            if (elm) {
              elm.scrollIntoView();
            }
          }
        }
      }
    };
    win[initVisibility] = () => {
      if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden") {
        saveScrollState();
      }
    };
    win[initScroll] = () => {
      if (win[spa] || !win[scrollEnabled]) {
        return;
      }
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
      if (!win.navigation) {
        document.addEventListener("visibilitychange", win[initVisibility], {
          passive: true
        });
      }
    }, 0);
  }
});
const RouterOutlet = qwik.component$(() => {
  const serverData = qwik.useServerData("containerAttributes");
  if (!serverData) {
    throw new Error("PrefetchServiceWorker component must be rendered on the server.");
  }
  qwik._jsxBranch();
  const { value } = qwik.useContext(ContentInternalContext);
  if (value && value.length > 0) {
    const contentsLen = value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--) {
      if (value[i].default) {
        cmp = qwik.jsx(value[i].default, {
          children: cmp
        });
      }
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        cmp,
        !__EXPERIMENTAL__.noSPA && /* @__PURE__ */ jsxRuntime.jsx("script", {
          "document:onQCInit$": spaInit,
          "document:onQInit$": qwik.sync$(() => {
            ((w, h) => {
              if (!w._qcs && h.scrollRestoration === "manual") {
                w._qcs = true;
                const s = h.state?._qCityScroll;
                if (s) {
                  w.scrollTo(s.x, s.y);
                }
                document.dispatchEvent(new Event("qcinit"));
              }
            })(window, history);
          })
        })
      ]
    });
  }
  return qwik.SkipRender;
});
const MODULE_CACHE = /* @__PURE__ */ new WeakMap();
const CLIENT_DATA_CACHE = /* @__PURE__ */ new Map();
const QACTION_KEY = "qaction";
const QFN_KEY = "qfunc";
const QDATA_KEY = "qdata";
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
  if (action) {
    search += (search ? "&" : "?") + QACTION_KEY + "=" + encodeURIComponent(action.id);
  }
  return pathname + (pathname.endsWith("/") ? "" : "/") + "q-data.json" + search;
};
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && typeof props.target !== "string" && !props.reload) {
    try {
      const linkUrl = toUrl(href.trim(), baseUrl.url);
      const currentUrl = toUrl("", baseUrl.url);
      if (isSameOrigin(linkUrl, currentUrl)) {
        return toPath(linkUrl);
      }
    } catch (e) {
      console.error(e);
    }
  } else if (props.reload) {
    return toPath(toUrl("", baseUrl.url));
  }
  return null;
};
const shouldPreload = (clientNavPath, currentLoc) => {
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
      if (!(id in endpoint.loaders)) {
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
      }
    }
    const data = endpoint.loaders[id];
    if (isPromise(data)) {
      throw new Error("Loaders returning a promise can not be resolved for the head function.");
    }
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
      if (typeof contentModuleHead === "function") {
        resolveDocumentHead(head, qwik.withLocale(locale, () => contentModuleHead(headProps)));
      } else if (typeof contentModuleHead === "object") {
        resolveDocumentHead(head, contentModuleHead);
      }
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string") {
    resolvedHead.title = updatedHead.title;
  }
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
  mergeArray(resolvedHead.scripts, updatedHead.scripts);
  Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr)) {
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
        if (match) {
          return Object.assign(params || (params = {}), match);
        }
      }
      const paramValueEnd = scan(path, paramValueStart, pathLength, 47, suffix);
      if (paramValueEnd == -1) {
        return null;
      }
      const paramValue = path.substring(paramValueStart, paramValueEnd);
      if (!isMany && !suffix && !paramValue) {
        return null;
      }
      pathIdx = paramValueEnd;
      (params || (params = {}))[paramName] = decodeURIComponent(paramValue);
    } else if (routeCh !== pathCh) {
      if (!(isNaN(pathCh) && isRestParameter(route, routeIdx))) {
        return null;
      }
    }
  }
  if (allConsumed(route, routeIdx) && allConsumed(path, pathIdx)) {
    return params || {};
  } else {
    return null;
  }
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
  while (idx < end && text.charCodeAt(idx) !== ch) {
    idx++;
  }
  const suffixLength = suffix.length;
  for (let i = 0; i < suffixLength; i++) {
    if (text.charCodeAt(idx - suffixLength + i) !== suffix.charCodeAt(i)) {
      return -1;
    }
  }
  return idx - suffixLength;
}
function recursiveScan(paramName, suffix, path, pathStart, pathLength, route, routeStart, routeLength) {
  if (path.charCodeAt(pathStart) === 47) {
    pathStart++;
  }
  let pathIdx = pathLength;
  const sep = suffix + "/";
  while (pathIdx >= pathStart) {
    const match = matchRoutePart(route, routeStart, routeLength, path, pathIdx, pathLength);
    if (match) {
      let value = path.substring(pathStart, Math.min(pathIdx, pathLength));
      if (value.endsWith(sep)) {
        value = value.substring(0, value.length - sep.length);
      }
      match[paramName] = decodeURIComponent(value);
      return match;
    }
    const newPathIdx = lastIndexOf(path, pathStart, sep, pathIdx, pathStart - 1) + sep.length;
    if (pathIdx === newPathIdx) {
      break;
    }
    pathIdx = newPathIdx;
  }
  return null;
}
function lastIndexOf(text, start, match, searchIdx, notFoundIdx) {
  let idx = text.lastIndexOf(match, searchIdx);
  if (idx == searchIdx - match.length) {
    idx = text.lastIndexOf(match, searchIdx - match.length - 1);
  }
  return idx > start ? idx : notFoundIdx;
}
const loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (!Array.isArray(routes)) {
    return null;
  }
  for (const routeData of routes) {
    const routeName = routeData[0];
    const params = matchRoute(routeName, pathname);
    if (!params) {
      continue;
    }
    const loaders = routeData[1];
    const routeBundleNames = routeData[3];
    const modules = new Array(loaders.length);
    const pendingLoads = [];
    loaders.forEach((moduleLoader, i) => {
      loadModule(moduleLoader, pendingLoads, (routeModule) => modules[i] = routeModule, cacheModules);
    });
    const menuLoader = getMenuLoader(menus, pathname);
    let menu = void 0;
    loadModule(menuLoader, pendingLoads, (menuModule) => menu = menuModule?.default, cacheModules);
    if (pendingLoads.length > 0) {
      await Promise.all(pendingLoads);
    }
    return [
      routeName,
      params,
      modules,
      menu,
      routeBundleNames
    ];
  }
  return null;
};
const loadModule = (moduleLoader, pendingLoads, moduleSetter, cacheModules) => {
  if (typeof moduleLoader === "function") {
    const loadedModule = MODULE_CACHE.get(moduleLoader);
    if (loadedModule) {
      moduleSetter(loadedModule);
    } else {
      const moduleOrPromise = moduleLoader();
      if (typeof moduleOrPromise.then === "function") {
        pendingLoads.push(moduleOrPromise.then((loadedModule2) => {
          if (cacheModules !== false) {
            MODULE_CACHE.set(moduleLoader, loadedModule2);
          }
          moduleSetter(loadedModule2);
        }));
      } else if (moduleOrPromise) {
        moduleSetter(moduleOrPromise);
      }
    }
  }
};
const getMenuLoader = (menus, pathname) => {
  if (menus) {
    pathname = pathname.endsWith("/") ? pathname : pathname + "/";
    const menu = menus.find((m) => m[0] === pathname || pathname.startsWith(m[0] + (pathname.endsWith("/") ? "" : "/")));
    if (menu) {
      return menu[1];
    }
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
      if (replaceState) {
        win.history.replaceState(newState, "", toPath(toURL));
      } else {
        win.history.pushState(newState, "", toPath(toURL));
      }
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
  if (qwik.isBrowser) {
    path = path.endsWith("/") ? path : path + "/";
    path = path.length > 1 && path.startsWith("/") ? path.slice(1) : path;
    preloader.p(path, 0.8);
  }
};
const loadClientData = async (url, element, opts) => {
  const pagePathname = url.pathname;
  const pageSearch = url.search;
  const clientDataPath = getClientDataPath(pagePathname, pageSearch, opts?.action);
  let qData;
  if (!opts?.action) {
    qData = CLIENT_DATA_CACHE.get(clientDataPath);
  }
  if (opts?.prefetchSymbols !== false) {
    prefetchSymbols(pagePathname);
  }
  let resolveFn;
  if (!qData) {
    const fetchOptions = getFetchOptions(opts?.action, opts?.clearCache);
    if (opts?.action) {
      opts.action.data = void 0;
    }
    qData = fetch(clientDataPath, fetchOptions).then((rsp) => {
      if (rsp.redirected) {
        const redirectedURL = new URL(rsp.url);
        const isQData = redirectedURL.pathname.endsWith("/q-data.json");
        if (!isQData || redirectedURL.origin !== location.origin) {
          location.href = redirectedURL.href;
          return;
        }
      }
      if ((rsp.headers.get("content-type") || "").includes("json")) {
        return rsp.text().then((text) => {
          const clientData = qwik._deserializeData(text, element);
          if (!clientData) {
            location.href = url.href;
            return;
          }
          if (opts?.clearCache) {
            CLIENT_DATA_CACHE.delete(clientDataPath);
          }
          if (clientData.redirect) {
            location.href = clientData.redirect;
          } else if (opts?.action) {
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
      } else {
        if (opts?.isPrefetch !== true) {
          location.href = url.href;
        }
        return void 0;
      }
    });
    if (!opts?.action) {
      CLIENT_DATA_CACHE.set(clientDataPath, qData);
    }
  }
  return qData.then((v) => {
    if (!v) {
      CLIENT_DATA_CACHE.delete(clientDataPath);
    }
    resolveFn && resolveFn();
    return v;
  });
};
const getFetchOptions = (action, noCache) => {
  const actionData = action?.data;
  if (!actionData) {
    if (noCache) {
      return {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache"
        }
      };
    }
    return void 0;
  }
  if (actionData instanceof FormData) {
    return {
      method: "POST",
      body: actionData
    };
  } else {
    return {
      method: "POST",
      body: JSON.stringify(actionData),
      headers: {
        "Content-Type": "application/json, charset=UTF-8"
      }
    };
  }
};
const useContent = () => qwik.useContext(ContentContext);
const useDocumentHead = () => qwik.useContext(DocumentHeadContext);
const useLocation = () => qwik.useContext(RouteLocationContext);
const useNavigate = () => qwik.useContext(RouteNavigateContext);
const usePreventNavigateQrl = (fn) => {
  if (!__EXPERIMENTAL__.preventNavigate) {
    throw new Error('usePreventNavigate$ is experimental and must be enabled with `experimental: ["preventNavigate"]` in the `qwikVite` plugin.');
  }
  const registerPreventNav = qwik.useContext(RoutePreventNavigateContext);
  qwik.useVisibleTask$(() => registerPreventNav(fn));
};
const usePreventNavigate$ = qwik.implicit$FirstArg(usePreventNavigateQrl);
const useAction = () => qwik.useContext(RouteActionContext);
const useQwikCityEnv = () => qwik.noSerialize(qwik.useServerData("qwikcity"));
const restoreScroll = (type, toUrl2, fromUrl, scroller, scrollState) => {
  if (type === "popstate" && scrollState) {
    scroller.scrollTo(scrollState.x, scrollState.y);
  } else if (type === "link" || type === "form") {
    if (!hashScroll(toUrl2, fromUrl)) {
      scroller.scrollTo(0, 0);
    }
  }
};
const hashScroll = (toUrl2, fromUrl) => {
  const elmId = toUrl2.hash.slice(1);
  const elm = elmId && document.getElementById(elmId);
  if (elm) {
    elm.scrollIntoView();
    return true;
  } else if (!elm && toUrl2.hash && isSamePath(toUrl2, fromUrl)) {
    return true;
  }
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
const QWIK_CITY_SCROLLER = "_qCityScroller";
const preventNav = {};
const internalState = {
  navCount: 0
};
const QwikCityProvider = qwik.component$((props) => {
  qwik.useStyles$(`:root{view-transition-name:none}`);
  const env = useQwikCityEnv();
  if (!env?.params) {
    throw new Error(`Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237`);
  }
  const urlEnv = qwik.useServerData("url");
  if (!urlEnv) {
    throw new Error(`Missing Qwik URL Env Data`);
  }
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
  const registerPreventNav = qwik.$((fn$) => {
    if (!qwik.isBrowser) {
      return;
    }
    preventNav.$handler$ || (preventNav.$handler$ = (event) => {
      internalState.navCount++;
      if (!preventNav.$cbs$) {
        return;
      }
      const prevents = [
        ...preventNav.$cbs$.values()
      ].map((cb) => cb.resolved ? cb.resolved() : cb());
      if (prevents.some(Boolean)) {
        event.preventDefault();
        event.returnValue = true;
      }
    });
    (preventNav.$cbs$ || (preventNav.$cbs$ = /* @__PURE__ */ new Set())).add(fn$);
    fn$.resolve();
    window.addEventListener("beforeunload", preventNav.$handler$);
    return () => {
      if (preventNav.$cbs$) {
        preventNav.$cbs$.delete(fn$);
        if (!preventNav.$cbs$.size) {
          preventNav.$cbs$ = void 0;
          window.removeEventListener("beforeunload", preventNav.$handler$);
        }
      }
    };
  });
  const goto = qwik.$(async (path, opt) => {
    const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
      forceReload: opt
    };
    internalState.navCount++;
    const lastDest = routeInternal.value.dest;
    const dest = path === void 0 ? lastDest : typeof path === "number" ? path : toUrl(path, routeLocation.url);
    if (preventNav.$cbs$ && (forceReload || typeof dest === "number" || !isSamePath(dest, lastDest) || !isSameOrigin(dest, lastDest))) {
      const ourNavId = internalState.navCount;
      const prevents = await Promise.all([
        ...preventNav.$cbs$.values()
      ].map((cb) => cb(dest)));
      if (ourNavId !== internalState.navCount || prevents.some(Boolean)) {
        if (ourNavId === internalState.navCount && type === "popstate") {
          history.pushState(null, "", lastDest);
        }
        return;
      }
    }
    if (typeof dest === "number") {
      if (qwik.isBrowser) {
        history.go(dest);
      }
      return;
    }
    if (!isSameOrigin(dest, lastDest)) {
      if (qwik.isBrowser) {
        location.href = dest.href;
      }
      return;
    }
    if (!forceReload && isSamePath(dest, lastDest)) {
      if (qwik.isBrowser) {
        if (type === "link" && dest.href !== location.href) {
          history.pushState(null, "", dest);
        }
        const scroller = document.getElementById(QWIK_CITY_SCROLLER) ?? document.documentElement;
        restoreScroll(type, dest, new URL(location.href), scroller, getScrollHistory());
        if (type === "popstate") {
          window._qCityScrollEnabled = true;
        }
      }
      return;
    }
    routeInternal.value = {
      type,
      dest,
      forceReload,
      replaceState,
      scroll
    };
    if (qwik.isBrowser) {
      loadClientData(dest, qwik._getContextElement());
      loadRoute(qwikCity__namespace.routes, qwikCity__namespace.menus, qwikCity__namespace.cacheModules, dest.pathname);
    }
    actionState.value = void 0;
    routeLocation.isNavigating = true;
    return new Promise((resolve) => {
      navResolver.r = resolve;
    });
  });
  qwik.useContextProvider(ContentContext, content);
  qwik.useContextProvider(ContentInternalContext, contentInternal);
  qwik.useContextProvider(DocumentHeadContext, documentHead);
  qwik.useContextProvider(RouteLocationContext, routeLocation);
  qwik.useContextProvider(RouteNavigateContext, goto);
  qwik.useContextProvider(RouteStateContext, loaderState);
  qwik.useContextProvider(RouteActionContext, actionState);
  qwik.useContextProvider(RouteInternalContext, routeInternal);
  qwik.useContextProvider(RoutePreventNavigateContext, registerPreventNav);
  qwik.useTask$(({ track }) => {
    async function run() {
      const [navigation, action] = track(() => [
        routeInternal.value,
        actionState.value
      ]);
      const locale = qwik.getLocale("");
      const prevUrl = routeLocation.url;
      const navType = action ? "form" : navigation.type;
      const replaceState = navigation.replaceState;
      let trackUrl;
      let clientPageData;
      let loadedRoute = null;
      let elm;
      if (qwik.isServer) {
        trackUrl = new URL(navigation.dest, routeLocation.url);
        loadedRoute = env.loadedRoute;
        clientPageData = env.response;
      } else {
        trackUrl = new URL(navigation.dest, location);
        if (trackUrl.pathname.endsWith("/")) {
          if (!qwikCity__namespace.trailingSlash) {
            trackUrl.pathname = trackUrl.pathname.slice(0, -1);
          }
        } else if (qwikCity__namespace.trailingSlash) {
          trackUrl.pathname += "/";
        }
        let loadRoutePromise = loadRoute(qwikCity__namespace.routes, qwikCity__namespace.menus, qwikCity__namespace.cacheModules, trackUrl.pathname);
        elm = qwik._getContextElement();
        const pageData = clientPageData = await loadClientData(trackUrl, elm, {
          action,
          clearCache: true
        });
        if (!pageData) {
          routeInternal.untrackedValue = {
            type: navType,
            dest: trackUrl
          };
          return;
        }
        const newHref = pageData.href;
        const newURL = new URL(newHref, trackUrl);
        if (!isSamePath(newURL, trackUrl)) {
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
        const isRedirect = navType === "form" && !isSamePath(trackUrl, prevUrl);
        if (navigation.dest.search && !isRedirect) {
          trackUrl.search = navigation.dest.search;
        }
        if (!isSamePath(trackUrl, prevUrl)) {
          routeLocation.prevUrl = prevUrl;
        }
        routeLocation.url = trackUrl;
        routeLocation.params = {
          ...params
        };
        routeInternal.untrackedValue = {
          type: navType,
          dest: trackUrl
        };
        const resolvedHead = resolveHead(clientPageData, routeLocation, contentModules, locale);
        content.headings = pageModule.headings;
        content.menu = menu;
        contentInternal.value = qwik.noSerialize(contentModules);
        documentHead.links = resolvedHead.links;
        documentHead.meta = resolvedHead.meta;
        documentHead.styles = resolvedHead.styles;
        documentHead.scripts = resolvedHead.scripts;
        documentHead.title = resolvedHead.title;
        documentHead.frontmatter = resolvedHead.frontmatter;
        if (qwik.isBrowser) {
          if (props.viewTransition !== false) {
            document.__q_view_transition__ = true;
          }
          let scrollState;
          if (navType === "popstate") {
            scrollState = getScrollHistory();
          }
          const scroller = document.getElementById(QWIK_CITY_SCROLLER) ?? document.documentElement;
          if (navigation.scroll && (!navigation.forceReload || !isSamePath(trackUrl, prevUrl)) && (navType === "link" || navType === "popstate") || isRedirect) {
            document.__q_scroll_restore__ = () => restoreScroll(navType, trackUrl, prevUrl, scroller, scrollState);
          }
          const loaders = clientPageData?.loaders;
          const win = window;
          if (loaders) {
            Object.assign(loaderState, loaders);
          }
          CLIENT_DATA_CACHE.clear();
          if (!win._qCitySPA) {
            win._qCitySPA = true;
            history.scrollRestoration = "manual";
            win.addEventListener("popstate", () => {
              win._qCityScrollEnabled = false;
              clearTimeout(win._qCityScrollDebounce);
              goto(location.href, {
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
                if (state === null || typeof state === "undefined") {
                  state = {};
                } else if (state?.constructor !== Object) {
                  state = {
                    _data: state
                  };
                  if (qwik.isDev) {
                    console.warn("In a Qwik SPA context, `history.state` is used to store scroll state. Direct calls to `pushState()` and `replaceState()` must supply an actual Object type. We need to be able to automatically attach the scroll state to your state object. A new state object has been created, your data has been moved to: `history.state._data`");
                  }
                }
                state._qCityScroll = state._qCityScroll || currentScrollState(scroller);
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
              if (event.defaultPrevented) {
                return;
              }
              const target = event.target.closest("a[href]");
              if (target && !target.hasAttribute("preventdefault:click")) {
                const href = target.getAttribute("href");
                const prev = new URL(location.href);
                const dest = new URL(href, prev);
                if (isSameOrigin(dest, prev) && isSamePath(dest, prev)) {
                  event.preventDefault();
                  if (!dest.hash && !dest.href.endsWith("#")) {
                    if (dest.href !== prev.href) {
                      history.pushState(null, "", dest);
                    }
                    win._qCityScrollEnabled = false;
                    clearTimeout(win._qCityScrollDebounce);
                    saveScrollHistory({
                      ...currentScrollState(scroller),
                      x: 0,
                      y: 0
                    });
                    location.reload();
                    return;
                  }
                  goto(target.getAttribute("href"));
                }
              }
            });
            document.body.removeEventListener("click", win._qCityInitAnchors);
            win._qCityInitAnchors = void 0;
            if (!window.navigation) {
              document.addEventListener("visibilitychange", () => {
                if (win._qCityScrollEnabled && document.visibilityState === "hidden") {
                  const scrollState2 = currentScrollState(scroller);
                  saveScrollHistory(scrollState2);
                }
              }, {
                passive: true
              });
              document.removeEventListener("visibilitychange", win._qCityInitVisibility);
              win._qCityInitVisibility = void 0;
            }
            win.addEventListener("scroll", () => {
              if (!win._qCityScrollEnabled) {
                return;
              }
              clearTimeout(win._qCityScrollDebounce);
              win._qCityScrollDebounce = setTimeout(() => {
                const scrollState2 = currentScrollState(scroller);
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
            const scrollState2 = currentScrollState(scroller);
            saveScrollHistory(scrollState2);
          }
          clientNavigate(window, navType, prevUrl, trackUrl, replaceState);
          qwik._waitUntilRendered(elm).then(() => {
            const container = getContainer(elm);
            container.setAttribute("q:route", routeName);
            const scrollState2 = currentScrollState(scroller);
            saveScrollHistory(scrollState2);
            win._qCityScrollEnabled = true;
            routeLocation.isNavigating = false;
            navResolver.r?.();
          });
        }
      }
    }
    const promise = run();
    if (qwik.isServer) {
      return promise;
    } else {
      return;
    }
  });
  return /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {});
});
function getContainer(elm) {
  while (elm && elm.nodeType !== Node.ELEMENT_NODE) {
    elm = elm.parentElement;
  }
  return elm.closest("[q\\:container]");
}
const QwikCityMockProvider = qwik.component$((props) => {
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
  const goto = props.goto ?? qwik.$(async () => {
    console.warn("QwikCityMockProvider: goto not provided");
  });
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
  return /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {});
});
const Link = qwik.component$((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const originalHref = props.href;
  const anchorRef = qwik.useSignal();
  const { onClick$, prefetch: prefetchProp, reload, replaceState, scroll, ...linkProps } = /* @__PURE__ */ (() => props)();
  const clientNavPath = qwik.untrack(() => getClientNavPath({
    ...linkProps,
    reload
  }, loc));
  linkProps.href = clientNavPath || originalHref;
  const prefetchData = qwik.untrack(() => !!clientNavPath && prefetchProp !== false && prefetchProp !== "js" || void 0);
  const prefetch = qwik.untrack(() => prefetchData || !!clientNavPath && prefetchProp !== false && shouldPreload(clientNavPath, loc));
  const handlePrefetch = prefetch ? qwik.$((_, elm) => {
    if (navigator.connection?.saveData) {
      return;
    }
    if (elm && elm.href) {
      const url = new URL(elm.href);
      prefetchSymbols(url.pathname);
      if (elm.hasAttribute("data-prefetch")) {
        loadClientData(url, elm, {
          prefetchSymbols: false,
          isPrefetch: true
        });
      }
    }
  }) : void 0;
  const preventDefault = clientNavPath ? qwik.sync$((event, target) => {
    if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
      event.preventDefault();
    }
  }) : void 0;
  const handleClick = clientNavPath ? qwik.$(async (event, elm) => {
    if (event.defaultPrevented) {
      if (elm.hasAttribute("q:nbs")) {
        await nav(location.href, {
          type: "popstate"
        });
      } else if (elm.href) {
        elm.setAttribute("aria-pressed", "true");
        await nav(elm.href, {
          forceReload: reload,
          replaceState,
          scroll
        });
        elm.removeAttribute("aria-pressed");
      }
    }
  }) : void 0;
  qwik.useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname);
    const handler = linkProps.onQVisible$;
    if (handler) {
      const event = new CustomEvent("qvisible");
      if (Array.isArray(handler)) {
        handler.flat(10).forEach((handler2) => handler2?.(event, anchorRef.value));
      } else {
        handler?.(event, anchorRef.value);
      }
    }
    if (!qwik.isDev && anchorRef.value) {
      handlePrefetch?.(void 0, anchorRef.value);
    }
  });
  return /* @__PURE__ */ jsxRuntime.jsx("a", {
    ref: anchorRef,
    "q:link": !!clientNavPath,
    ...linkProps,
    onClick$: [
      preventDefault,
      onClick$,
      handleClick
    ],
    "data-prefetch": prefetchData,
    onMouseOver$: [
      linkProps.onMouseOver$,
      handlePrefetch
    ],
    onFocus$: [
      linkProps.onFocus$,
      handlePrefetch
    ],
    // We need to prevent the onQVisible$ from being called twice since it is handled in the visible task
    onQVisible$: [],
    children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {})
  });
});
const ServiceWorkerRegister = (props) => /* @__PURE__ */ jsxRuntime.jsx("script", {
  type: "module",
  dangerouslySetInnerHTML: swRegister,
  nonce: props.nonce
});
var store;
// @__NO_SIDE_EFFECTS__
function getGlobalConfig(config2) {
  return {
    lang: config2?.lang ?? store?.lang,
    message: config2?.message,
    abortEarly: config2?.abortEarly ?? store?.abortEarly,
    abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
  };
}
// @__NO_SIDE_EFFECTS__
function getDotPath(issue) {
  if (issue.path) {
    let key = "";
    for (const item of issue.path) {
      if (typeof item.key === "string" || typeof item.key === "number") {
        if (key) {
          key += `.${item.key}`;
        } else {
          key += item.key;
        }
      } else {
        return null;
      }
    }
    return key;
  }
  return null;
}
// @__NO_SIDE_EFFECTS__
function flatten(issues) {
  const flatErrors = {};
  for (const issue of issues) {
    if (issue.path) {
      const dotPath = /* @__PURE__ */ getDotPath(issue);
      if (dotPath) {
        if (!flatErrors.nested) {
          flatErrors.nested = {};
        }
        if (flatErrors.nested[dotPath]) {
          flatErrors.nested[dotPath].push(issue.message);
        } else {
          flatErrors.nested[dotPath] = [issue.message];
        }
      } else {
        if (flatErrors.other) {
          flatErrors.other.push(issue.message);
        } else {
          flatErrors.other = [issue.message];
        }
      }
    } else {
      if (flatErrors.root) {
        flatErrors.root.push(issue.message);
      } else {
        flatErrors.root = [issue.message];
      }
    }
  }
  return flatErrors;
}
// @__NO_SIDE_EFFECTS__
async function safeParseAsync(schema, input, config2) {
  const dataset = await schema["~run"](
    { value: input },
    /* @__PURE__ */ getGlobalConfig(config2)
  );
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}
const routeActionQrl = (actionQrl, ...rest) => {
  const { id, validators } = getValidators(rest, actionQrl);
  function action() {
    const loc = useLocation();
    const currentAction = useAction();
    const initialState = {
      actionPath: `?${QACTION_KEY}=${id}`,
      submitted: false,
      isRunning: false,
      status: void 0,
      value: void 0,
      formData: void 0
    };
    const state = qwik.useStore(() => {
      const value = currentAction.value;
      if (value && value?.id === id) {
        const data = value.data;
        if (data instanceof FormData) {
          initialState.formData = data;
        }
        if (value.output) {
          const { status, result } = value.output;
          initialState.status = status;
          initialState.value = result;
        }
      }
      return initialState;
    });
    const submit = qwik.$((input = {}) => {
      if (qwik.isServer) {
        throw new Error(`Actions can not be invoked within the server during SSR.
Action.run() can only be called on the browser, for example when a user clicks a button, or submits a form.`);
      }
      let data;
      let form;
      if (input instanceof SubmitEvent) {
        form = input.target;
        data = new FormData(form);
        if ((input.submitter instanceof HTMLInputElement || input.submitter instanceof HTMLButtonElement) && input.submitter.name) {
          if (input.submitter.name) {
            data.append(input.submitter.name, input.submitter.value);
          }
        }
      } else {
        data = input;
      }
      return new Promise((resolve) => {
        if (data instanceof FormData) {
          state.formData = data;
        }
        state.submitted = true;
        state.isRunning = true;
        loc.isNavigating = true;
        currentAction.value = {
          data,
          id,
          resolve: qwik.noSerialize(resolve)
        };
      }).then(({ result, status }) => {
        state.isRunning = false;
        state.status = status;
        state.value = result;
        if (form) {
          if (form.getAttribute("data-spa-reset") === "true") {
            form.reset();
          }
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
    });
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
  if (qwik.isServer) {
    if (typeof globalThis._qwikActionsMap === "undefined") {
      globalThis._qwikActionsMap = /* @__PURE__ */ new Map();
    }
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
      if (!(id in state)) {
        throw new Error(`routeLoader$ "${loaderQrl.getSymbol()}" was invoked in a route where it was not declared.
    This is because the routeLoader$ was not exported in a 'layout.tsx' or 'index.tsx' file of the existing route.
    For more information check: https://qwik.dev/qwikcity/route-loader/

    If your are managing reusable logic or a library it is essential that this function is re-exported from within 'layout.tsx' or 'index.tsx file of the existing route otherwise it will not run or throw exception.
    For more information check: https://qwik.dev/docs/re-exporting-loaders/`);
      }
      return qwik._wrapProp(state, id);
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
  if (qwik.isServer) {
    return {
      validate: validator
    };
  }
  return void 0;
};
const validator$ = /* @__PURE__ */ qwik.implicit$FirstArg(validatorQrl);
const flattenValibotIssues = (issues) => {
  return issues.reduce((acc, issue) => {
    if (issue.path) {
      const hasArrayType = issue.path.some((path) => path.type === "array");
      if (hasArrayType) {
        const keySuffix = issue.expected === "Array" ? "[]" : "";
        const key = issue.path.map((item) => item.type === "array" ? "*" : item.key).join(".").replace(/\.\*/g, "[]") + keySuffix;
        acc[key] = acc[key] || [];
        if (Array.isArray(acc[key])) {
          acc[key].push(issue.message);
        }
        return acc;
      } else {
        acc[issue.path.map((item) => item.key).join(".")] = issue.message;
      }
    }
    return acc;
  }, {});
};
const valibotQrl = (qrl) => {
  if (!__EXPERIMENTAL__.valibot) {
    throw new Error('Valibot is an experimental feature and is not enabled. Please enable the feature flag by adding `experimental: ["valibot"]` to your qwikVite plugin options.');
  }
  if (qwik.isServer) {
    return {
      __brand: "valibot",
      async validate(ev, inputData) {
        const schema = await qrl.resolve().then((obj) => typeof obj === "function" ? obj(ev) : obj);
        const data = inputData ?? await ev.parseBody();
        const result = await /* @__PURE__ */ safeParseAsync(schema, data);
        if (result.success) {
          return {
            success: true,
            data: result.output
          };
        } else {
          if (qwik.isDev) {
            console.error("ERROR: Valibot validation failed", result.issues);
          }
          return {
            success: false,
            status: 400,
            error: {
              formErrors: (/* @__PURE__ */ flatten(result.issues)).root ?? [],
              fieldErrors: flattenValibotIssues(result.issues)
            }
          };
        }
      }
    };
  }
  return void 0;
};
const valibot$ = /* @__PURE__ */ qwik.implicit$FirstArg(valibotQrl);
const flattenZodIssues = (issues) => {
  issues = Array.isArray(issues) ? issues : [
    issues
  ];
  return issues.reduce((acc, issue) => {
    const isExpectingArray = "expected" in issue && issue.expected === "array";
    const hasArrayType = issue.path.some((path) => typeof path === "number") || isExpectingArray;
    if (hasArrayType) {
      const keySuffix = "expected" in issue && issue.expected === "array" ? "[]" : "";
      const key = issue.path.map((path) => typeof path === "number" ? "*" : path).join(".").replace(/\.\*/g, "[]") + keySuffix;
      acc[key] = acc[key] || [];
      if (Array.isArray(acc[key])) {
        acc[key].push(issue.message);
      }
      return acc;
    } else {
      acc[issue.path.join(".")] = issue.message;
    }
    return acc;
  }, {});
};
const zodQrl = (qrl) => {
  if (qwik.isServer) {
    return {
      __brand: "zod",
      async validate(ev, inputData) {
        const schema = await qrl.resolve().then((obj) => {
          if (typeof obj === "function") {
            obj = obj(zod.z, ev);
          }
          if (obj instanceof zod.z.Schema) {
            return obj;
          } else {
            return zod.z.object(obj);
          }
        });
        const data = inputData ?? await ev.parseBody();
        const result = await schema.safeParseAsync(data);
        if (result.success) {
          return result;
        } else {
          if (qwik.isDev) {
            console.error("ERROR: Zod validation failed", result.error.issues);
          }
          return {
            success: false,
            status: 400,
            error: {
              formErrors: result.error.flatten().formErrors,
              fieldErrors: flattenZodIssues(result.error.issues)
            }
          };
        }
      }
    };
  }
  return void 0;
};
const zod$ = /* @__PURE__ */ qwik.implicit$FirstArg(zodQrl);
const deepFreeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = obj[prop];
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
};
const serverQrl = (qrl, options) => {
  if (qwik.isServer) {
    const captured = qrl.getCaptured();
    if (captured && captured.length > 0 && !qwik._getContextElement()) {
      throw new Error("For security reasons, we cannot serialize QRLs that capture lexical scope.");
    }
  }
  const method = options?.method?.toUpperCase?.() || "POST";
  const headers = options?.headers || {};
  const origin = options?.origin || "";
  const fetchOptions = options?.fetchOptions || {};
  function rpc() {
    return qwik.$(async function(...args) {
      const abortSignal = args.length > 0 && args[0] instanceof AbortSignal ? args.shift() : void 0;
      if (qwik.isServer) {
        let requestEvent = globalThis.qcAsyncRequestStore?.getStore();
        if (!requestEvent) {
          const contexts = [
            useQwikCityEnv()?.ev,
            this,
            qwik._getContextEvent()
          ];
          requestEvent = contexts.find((v2) => v2 && Object.prototype.hasOwnProperty.call(v2, "sharedMap") && Object.prototype.hasOwnProperty.call(v2, "cookie"));
        }
        return qrl.apply(requestEvent, qwik.isDev ? deepFreeze(args) : args);
      } else {
        const ctxElm = qwik._getContextElement();
        const filteredArgs = args.map((arg) => {
          if (arg instanceof SubmitEvent && arg.target instanceof HTMLFormElement) {
            return new FormData(arg.target);
          } else if (arg instanceof Event) {
            return null;
          } else if (arg instanceof Node) {
            return null;
          }
          return arg;
        });
        const qrlHash = qrl.getHash();
        let query = "";
        const config = {
          ...fetchOptions,
          method,
          headers: {
            ...headers,
            "Content-Type": "application/qwik-json",
            Accept: "application/json, application/qwik-json, text/qwik-json-stream, text/plain",
            // Required so we don't call accidentally
            "X-QRL": qrlHash
          },
          signal: abortSignal
        };
        const body = await qwik._serializeData([
          qrl,
          ...filteredArgs
        ], false);
        if (method === "GET") {
          query += `&${QDATA_KEY}=${encodeURIComponent(body)}`;
        } else {
          config.body = body;
        }
        const res = await fetch(`${origin}?${QFN_KEY}=${qrlHash}${query}`, config);
        const contentType = res.headers.get("Content-Type");
        if (res.ok && contentType === "text/qwik-json-stream" && res.body) {
          return async function* () {
            try {
              for await (const result of deserializeStream(res.body, ctxElm ?? document.documentElement, abortSignal)) {
                yield result;
              }
            } finally {
              if (!abortSignal?.aborted) {
                await res.body.cancel();
              }
            }
          }();
        } else if (contentType === "application/qwik-json") {
          const str = await res.text();
          const obj = await qwik._deserializeData(str, ctxElm ?? document.documentElement);
          if (res.status >= 400) {
            throw obj;
          }
          return obj;
        } else if (contentType === "application/json") {
          const obj = await res.json();
          if (res.status >= 400) {
            throw obj;
          }
          return obj;
        } else if (contentType === "text/plain" || contentType === "text/html") {
          const str = await res.text();
          if (res.status >= 400) {
            throw str;
          }
          return str;
        }
      }
    });
  }
  return rpc();
};
const server$ = /* @__PURE__ */ qwik.implicit$FirstArg(serverQrl);
const getValidators = (rest, qrl) => {
  let id;
  const validators = [];
  if (rest.length === 1) {
    const options = rest[0];
    if (options && typeof options === "object") {
      if ("validate" in options) {
        validators.push(options);
      } else {
        id = options.id;
        if (options.validation) {
          validators.push(...options.validation);
        }
      }
    }
  } else if (rest.length > 1) {
    validators.push(...rest.filter((v2) => !!v2));
  }
  if (typeof id === "string") {
    if (qwik.isDev) {
      if (!/^[\w/.-]+$/.test(id)) {
        throw new Error(`Invalid id: ${id}, id can only contain [a-zA-Z0-9_.-]`);
      }
    }
    id = `id_${id}`;
  } else {
    id = qrl.getHash();
  }
  return {
    validators: validators.reverse(),
    id
  };
};
const deserializeStream = async function* (stream, ctxElm, abortSignal) {
  const reader = stream.getReader();
  try {
    let buffer = "";
    const decoder = new TextDecoder();
    while (!abortSignal?.aborted) {
      const result = await reader.read();
      if (result.done) {
        break;
      }
      buffer += decoder.decode(result.value, {
        stream: true
      });
      const lines = buffer.split(/\n/);
      buffer = lines.pop();
      for (const line of lines) {
        yield await qwik._deserializeData(line, ctxElm);
      }
    }
  } finally {
    reader.releaseLock();
  }
};
const ErrorBoundary = qwik.component$((props) => {
  const store2 = qwik.useErrorBoundary();
  qwik.useOnWindow("qerror", qwik.$((e) => {
    store2.error = e.detail.error;
  }));
  if (store2.error && props.fallback$) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: props.fallback$(store2.error)
    });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {});
});
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }, key) => {
  if (action) {
    const isArrayApi = Array.isArray(onSubmit$);
    if (isArrayApi) {
      return qwik.jsx("form", {
        ...rest,
        action: action.actionPath,
        "preventdefault:submit": !reloadDocument,
        onSubmit$: [
          ...onSubmit$,
          // action.submit "submitcompleted" event for onSubmitCompleted$ events
          !reloadDocument ? qwik.$((evt) => {
            if (!action.submitted) {
              return action.submit(evt);
            }
          }) : void 0
        ],
        method: "post",
        ["data-spa-reset"]: spaReset ? "true" : void 0
      }, key);
    }
    return qwik.jsx("form", {
      ...rest,
      action: action.actionPath,
      "preventdefault:submit": !reloadDocument,
      onSubmit$: [
        // action.submit "submitcompleted" event for onSubmitCompleted$ events
        !reloadDocument ? action.submit : void 0,
        // TODO: v2 breaking change this should fire before the action.submit
        onSubmit$
      ],
      method: "post",
      ["data-spa-reset"]: spaReset ? "true" : void 0
    }, key);
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(GetForm, {
      spaReset,
      reloadDocument,
      onSubmit$,
      ...rest
    }, key);
  }
};
const GetForm = qwik.component$(({ action, spaReset, reloadDocument, onSubmit$, ...rest }) => {
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntime.jsx("form", {
    action: "get",
    "preventdefault:submit": !reloadDocument,
    "data-spa-reset": spaReset ? "true" : void 0,
    ...rest,
    onSubmit$: [
      ...Array.isArray(onSubmit$) ? onSubmit$ : [
        onSubmit$
      ],
      qwik.$(async (_evt, form) => {
        const formData = new FormData(form);
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
          if (typeof value === "string") {
            params.append(key, value);
          }
        });
        await nav("?" + params.toString(), {
          type: "form",
          forceReload: true
        });
      }),
      qwik.$((_evt, form) => {
        if (form.getAttribute("data-spa-reset") === "true") {
          form.reset();
        }
        form.dispatchEvent(new CustomEvent("submitcompleted", {
          bubbles: false,
          cancelable: false,
          composed: false,
          detail: {
            status: 200
          }
        }));
      })
    ],
    children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {})
  });
});
Object.defineProperty(exports, "z", {
  enumerable: true,
  get: () => zod.z
});
exports.ErrorBoundary = ErrorBoundary;
exports.Form = Form;
exports.Link = Link;
exports.QWIK_CITY_SCROLLER = QWIK_CITY_SCROLLER;
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
exports.usePreventNavigate$ = usePreventNavigate$;
exports.usePreventNavigateQrl = usePreventNavigateQrl;
exports.valibot$ = valibot$;
exports.valibotQrl = valibotQrl;
exports.validator$ = validator$;
exports.validatorQrl = validatorQrl;
exports.zod$ = zod$;
exports.zodQrl = zodQrl;
