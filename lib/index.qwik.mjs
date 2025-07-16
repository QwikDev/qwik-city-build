import { jsxs, Fragment, jsx as jsx$1 } from "@builder.io/qwik/jsx-runtime";
import { createContextId, event$, isDev, component$, useServerData, _jsxBranch, useContext, jsx, sync$, SkipRender, withLocale, isBrowser, _deserializeData, implicit$FirstArg, useVisibleTask$, noSerialize, useStyles$, isServer, useStore, _weakSerialize, useSignal, $, _getContextElement, useContextProvider, useTask$, Slot, getLocale, _waitUntilRendered, untrack, _wrapProp, _getContextEvent, _serializeData, useErrorBoundary, useOnWindow } from "@builder.io/qwik";
import * as qwikCity from "@qwik-city-plan";
import { p } from "@builder.io/qwik/preloader";
import swRegister from "@qwik-city-sw-register";
import { z } from "zod";
import { z as z2 } from "zod";
const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ createContextId("qc-ir");
const RoutePreventNavigateContext = /* @__PURE__ */ createContextId("qc-p");
const spaInit = event$((_, el) => {
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
          if (isDev) {
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
      win.addEventListener("popstate", win[initPopstate]);
      win.addEventListener("scroll", win[initScroll], {
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
const RouterOutlet = component$(() => {
  const serverData = useServerData("containerAttributes");
  if (!serverData) {
    throw new Error("PrefetchServiceWorker component must be rendered on the server.");
  }
  _jsxBranch();
  const { value } = useContext(ContentInternalContext);
  if (value && value.length > 0) {
    const contentsLen = value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--) {
      if (value[i].default) {
        cmp = jsx(value[i].default, {
          children: cmp
        });
      }
    }
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [
        cmp,
        !__EXPERIMENTAL__.noSPA && /* @__PURE__ */ jsx$1("script", {
          "document:onQCInit$": spaInit,
          "document:onQInit$": sync$(() => {
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
  return SkipRender;
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
    withLocale: (fn) => withLocale(locale, fn),
    resolveValue: getData,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function") {
        resolveDocumentHead(head, withLocale(locale, () => contentModuleHead(headProps)));
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
  if (isBrowser) {
    path = path.endsWith("/") ? path : path + "/";
    path = path.length > 1 && path.startsWith("/") ? path.slice(1) : path;
    p(path, 0.8);
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
          const clientData = _deserializeData(text, element);
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
        "Content-Type": "application/json; charset=UTF-8"
      }
    };
  }
};
const useContent = () => useContext(ContentContext);
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useNavigate = () => useContext(RouteNavigateContext);
const usePreventNavigateQrl = (fn) => {
  if (!__EXPERIMENTAL__.preventNavigate) {
    throw new Error('usePreventNavigate$ is experimental and must be enabled with `experimental: ["preventNavigate"]` in the `qwikVite` plugin.');
  }
  const registerPreventNav = useContext(RoutePreventNavigateContext);
  useVisibleTask$(() => registerPreventNav(fn));
};
const usePreventNavigate$ = implicit$FirstArg(usePreventNavigateQrl);
const useAction = () => useContext(RouteActionContext);
const useQwikCityEnv = () => noSerialize(useServerData("qwikcity"));
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
const QwikCityProvider = component$((props) => {
  useStyles$(`:root{view-transition-name:none}`);
  const env = useQwikCityEnv();
  if (!env?.params) {
    throw new Error(`Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237`);
  }
  const urlEnv = useServerData("url");
  if (!urlEnv) {
    throw new Error(`Missing Qwik URL Env Data`);
  }
  if (isServer) {
    if (env.ev.originalUrl.pathname !== env.ev.url.pathname && !__EXPERIMENTAL__.enableRequestRewrite) {
      throw new Error(`enableRequestRewrite is an experimental feature and is not enabled. Please enable the feature flag by adding \`experimental: ["enableRequestRewrite"]\` to your qwikVite plugin options.`);
    }
  }
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    params: env.params,
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const navResolver = {};
  const loaderState = _weakSerialize(useStore(env.response.loaders, {
    deep: false
  }));
  const routeInternal = useSignal({
    type: "initial",
    dest: url,
    forceReload: false,
    replaceState: false,
    scroll: true
  });
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useSignal();
  const currentActionId = env.response.action;
  const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
  const actionState = useSignal(currentAction ? {
    id: currentActionId,
    data: env.response.formData,
    output: {
      result: currentAction,
      status: env.response.status
    }
  } : void 0);
  const registerPreventNav = $((fn$) => {
    if (!isBrowser) {
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
  const goto = $(async (path, opt) => {
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
      if (isBrowser) {
        history.go(dest);
      }
      return;
    }
    if (!isSameOrigin(dest, lastDest)) {
      if (isBrowser) {
        location.href = dest.href;
      }
      return;
    }
    if (!forceReload && isSamePath(dest, lastDest)) {
      if (isBrowser) {
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
    if (isBrowser) {
      loadClientData(dest, _getContextElement());
      loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, dest.pathname);
    }
    actionState.value = void 0;
    routeLocation.isNavigating = true;
    return new Promise((resolve) => {
      navResolver.r = resolve;
    });
  });
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  useContextProvider(RoutePreventNavigateContext, registerPreventNav);
  useTask$(({ track }) => {
    async function run() {
      const [navigation, action] = track(() => [
        routeInternal.value,
        actionState.value
      ]);
      const locale = getLocale("");
      const prevUrl = routeLocation.url;
      const navType = action ? "form" : navigation.type;
      const replaceState = navigation.replaceState;
      let trackUrl;
      let clientPageData;
      let loadedRoute = null;
      let elm;
      if (isServer) {
        trackUrl = new URL(navigation.dest, routeLocation.url);
        loadedRoute = env.loadedRoute;
        clientPageData = env.response;
      } else {
        trackUrl = new URL(navigation.dest, location);
        if (trackUrl.pathname.endsWith("/")) {
          if (!qwikCity.trailingSlash) {
            trackUrl.pathname = trackUrl.pathname.slice(0, -1);
          }
        } else if (qwikCity.trailingSlash) {
          trackUrl.pathname += "/";
        }
        let loadRoutePromise = loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, trackUrl.pathname);
        elm = _getContextElement();
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
          if (!pageData.isRewrite) {
            trackUrl = newURL;
          }
          loadRoutePromise = loadRoute(
            qwikCity.routes,
            qwikCity.menus,
            qwikCity.cacheModules,
            newURL.pathname
            // Load the actual required path.
          );
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
        if (navigation.dest.search && !!isSamePath(trackUrl, prevUrl)) {
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
        contentInternal.value = noSerialize(contentModules);
        documentHead.links = resolvedHead.links;
        documentHead.meta = resolvedHead.meta;
        documentHead.styles = resolvedHead.styles;
        documentHead.scripts = resolvedHead.scripts;
        documentHead.title = resolvedHead.title;
        documentHead.frontmatter = resolvedHead.frontmatter;
        if (isBrowser) {
          if (props.viewTransition !== false) {
            document.__q_view_transition__ = true;
          }
          let scrollState;
          if (navType === "popstate") {
            scrollState = getScrollHistory();
          }
          const scroller = document.getElementById(QWIK_CITY_SCROLLER) ?? document.documentElement;
          if (navigation.scroll && (!navigation.forceReload || !isSamePath(trackUrl, prevUrl)) && (navType === "link" || navType === "popstate") || navType === "form" && !isSamePath(trackUrl, prevUrl)) {
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
                  if (isDev) {
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
          _waitUntilRendered(elm).then(() => {
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
    if (isServer) {
      return promise;
    } else {
      return;
    }
  });
  return /* @__PURE__ */ jsx$1(Slot, {});
});
function getContainer(elm) {
  while (elm && elm.nodeType !== Node.ELEMENT_NODE) {
    elm = elm.parentElement;
  }
  return elm.closest("[q\\:container]");
}
const QwikCityMockProvider = component$((props) => {
  const urlEnv = props.url ?? "http://localhost/";
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    params: props.params ?? {},
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const loaderState = useSignal({});
  const routeInternal = useSignal({
    type: "initial",
    dest: url
  });
  const goto = props.goto ?? $(async () => {
    console.warn("QwikCityMockProvider: goto not provided");
  });
  const documentHead = useStore(createDocumentHead, {
    deep: false
  });
  const content = useStore({
    headings: void 0,
    menu: void 0
  }, {
    deep: false
  });
  const contentInternal = useSignal();
  const actionState = useSignal();
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  return /* @__PURE__ */ jsx$1(Slot, {});
});
const Link = component$((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const originalHref = props.href;
  const anchorRef = useSignal();
  const { onClick$, prefetch: prefetchProp, reload, replaceState, scroll, ...linkProps } = /* @__PURE__ */ (() => props)();
  const clientNavPath = untrack(() => getClientNavPath({
    ...linkProps,
    reload
  }, loc));
  linkProps.href = clientNavPath || originalHref;
  const prefetchData = untrack(() => !!clientNavPath && prefetchProp !== false && prefetchProp !== "js" || void 0);
  const prefetch = untrack(() => prefetchData || !!clientNavPath && prefetchProp !== false && shouldPreload(clientNavPath, loc));
  const handlePrefetch = prefetch ? $((_, elm) => {
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
  const preventDefault = clientNavPath ? sync$((event, target) => {
    if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) {
      event.preventDefault();
    }
  }) : void 0;
  const handleClick = clientNavPath ? $(async (event, elm) => {
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
  useVisibleTask$(({ track }) => {
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
    if (!isDev && anchorRef.value) {
      handlePrefetch?.(void 0, anchorRef.value);
    }
  });
  return /* @__PURE__ */ jsx$1("a", {
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
    children: /* @__PURE__ */ jsx$1(Slot, {})
  });
});
const ServiceWorkerRegister = (props) => /* @__PURE__ */ jsx$1("script", {
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
    const state = useStore(() => {
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
    const submit = $((input = {}) => {
      if (isServer) {
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
          resolve: noSerialize(resolve)
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
  if (isServer) {
    if (typeof globalThis._qwikActionsMap === "undefined") {
      globalThis._qwikActionsMap = /* @__PURE__ */ new Map();
    }
    globalThis._qwikActionsMap.set(action.__id, action);
  }
  return action;
};
const routeAction$ = /* @__PURE__ */ implicit$FirstArg(routeActionQrl);
const globalAction$ = /* @__PURE__ */ implicit$FirstArg(globalActionQrl);
const routeLoaderQrl = (loaderQrl, ...rest) => {
  const { id, validators } = getValidators(rest, loaderQrl);
  function loader() {
    return useContext(RouteStateContext, (state) => {
      if (!(id in state)) {
        throw new Error(`routeLoader$ "${loaderQrl.getSymbol()}" was invoked in a route where it was not declared.
    This is because the routeLoader$ was not exported in a 'layout.tsx' or 'index.tsx' file of the existing route.
    For more information check: https://qwik.dev/qwikcity/route-loader/

    If your are managing reusable logic or a library it is essential that this function is re-exported from within 'layout.tsx' or 'index.tsx file of the existing route otherwise it will not run or throw exception.
    For more information check: https://qwik.dev/docs/re-exporting-loaders/`);
      }
      return _wrapProp(state, id);
    });
  }
  loader.__brand = "server_loader";
  loader.__qrl = loaderQrl;
  loader.__validators = validators;
  loader.__id = id;
  Object.freeze(loader);
  return loader;
};
const routeLoader$ = /* @__PURE__ */ implicit$FirstArg(routeLoaderQrl);
const validatorQrl = (validator) => {
  if (isServer) {
    return {
      validate: validator
    };
  }
  return void 0;
};
const validator$ = /* @__PURE__ */ implicit$FirstArg(validatorQrl);
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
  if (isServer) {
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
          if (isDev) {
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
const valibot$ = /* @__PURE__ */ implicit$FirstArg(valibotQrl);
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
  if (isServer) {
    return {
      __brand: "zod",
      async validate(ev, inputData) {
        const schema = await qrl.resolve().then((obj) => {
          if (typeof obj === "function") {
            obj = obj(z, ev);
          }
          if (obj instanceof z.Schema) {
            return obj;
          } else {
            return z.object(obj);
          }
        });
        const data = inputData ?? await ev.parseBody();
        const result = await schema.safeParseAsync(data);
        if (result.success) {
          return result;
        } else {
          if (isDev) {
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
const zod$ = /* @__PURE__ */ implicit$FirstArg(zodQrl);
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
  if (isServer) {
    const captured = qrl.getCaptured();
    if (captured && captured.length > 0 && !_getContextElement()) {
      throw new Error("For security reasons, we cannot serialize QRLs that capture lexical scope.");
    }
  }
  const method = options?.method?.toUpperCase?.() || "POST";
  const headers = options?.headers || {};
  const origin = options?.origin || "";
  const fetchOptions = options?.fetchOptions || {};
  function rpc() {
    return $(async function(...args) {
      const abortSignal = args.length > 0 && args[0] instanceof AbortSignal ? args.shift() : void 0;
      if (isServer) {
        let requestEvent = globalThis.qcAsyncRequestStore?.getStore();
        if (!requestEvent) {
          const contexts = [
            useQwikCityEnv()?.ev,
            this,
            _getContextEvent()
          ];
          requestEvent = contexts.find((v2) => v2 && Object.prototype.hasOwnProperty.call(v2, "sharedMap") && Object.prototype.hasOwnProperty.call(v2, "cookie"));
        }
        return qrl.apply(requestEvent, isDev ? deepFreeze(args) : args);
      } else {
        const ctxElm = _getContextElement();
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
        const body = await _serializeData([
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
          const obj = await _deserializeData(str, ctxElm ?? document.documentElement);
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
const server$ = /* @__PURE__ */ implicit$FirstArg(serverQrl);
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
    if (isDev) {
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
        yield await _deserializeData(line, ctxElm);
      }
    }
  } finally {
    reader.releaseLock();
  }
};
const ErrorBoundary = component$((props) => {
  const store2 = useErrorBoundary();
  useOnWindow("qerror", $((e) => {
    store2.error = e.detail.error;
  }));
  if (store2.error && props.fallback$) {
    return /* @__PURE__ */ jsx$1(Fragment, {
      children: props.fallback$(store2.error)
    });
  }
  return /* @__PURE__ */ jsx$1(Slot, {});
});
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }, key) => {
  if (action) {
    const isArrayApi = Array.isArray(onSubmit$);
    if (isArrayApi) {
      return jsx("form", {
        ...rest,
        action: action.actionPath,
        "preventdefault:submit": !reloadDocument,
        onSubmit$: [
          ...onSubmit$,
          // action.submit "submitcompleted" event for onSubmitCompleted$ events
          !reloadDocument ? $((evt) => {
            if (!action.submitted) {
              return action.submit(evt);
            }
          }) : void 0
        ],
        method: "post",
        ["data-spa-reset"]: spaReset ? "true" : void 0
      }, key);
    }
    return jsx("form", {
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
    return /* @__PURE__ */ jsx$1(GetForm, {
      spaReset,
      reloadDocument,
      onSubmit$,
      ...rest
    }, key);
  }
};
const GetForm = component$(({ action, spaReset, reloadDocument, onSubmit$, ...rest }) => {
  const nav = useNavigate();
  return /* @__PURE__ */ jsx$1("form", {
    action: "get",
    "preventdefault:submit": !reloadDocument,
    "data-spa-reset": spaReset ? "true" : void 0,
    ...rest,
    onSubmit$: [
      ...Array.isArray(onSubmit$) ? onSubmit$ : [
        onSubmit$
      ],
      $(async (_evt, form) => {
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
      $((_evt, form) => {
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
    children: /* @__PURE__ */ jsx$1(Slot, {})
  });
});
export {
  ErrorBoundary,
  Form,
  Link,
  QWIK_CITY_SCROLLER,
  QwikCityMockProvider,
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
  globalAction$,
  globalActionQrl,
  routeAction$,
  routeActionQrl,
  routeLoader$,
  routeLoaderQrl,
  server$,
  serverQrl,
  useContent,
  useDocumentHead,
  useLocation,
  useNavigate,
  usePreventNavigate$,
  usePreventNavigateQrl,
  valibot$,
  valibotQrl,
  validator$,
  validatorQrl,
  z2 as z,
  zod$,
  zodQrl
};
