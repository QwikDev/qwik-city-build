import { createContextId, componentQrl, inlinedQrl, _jsxBranch, useServerData, useContext, _jsxC, _jsxQ, SkipRender, withLocale, _deserializeData, noSerialize, useStylesQrl, useStore, _weakSerialize, useSignal, useContextProvider, useTaskQrl, useLexicalScope, Slot, _getContextElement, getLocale, _waitUntilRendered, untrack, eventQrl, _jsxS, _wrapSignal, implicit$FirstArg, _getContextEvent, _serializeData, _restProps, _fnSignal } from "@builder.io/qwik";
import { Fragment } from "@builder.io/qwik/jsx-runtime";
import { isBrowser, isServer, isDev } from "@builder.io/qwik/build";
import * as qwikCity from "@qwik-city-plan";
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
const popStateScript = '(function(){\n  const l=location,c=l.pathname+l.search,t="_qCityPopstateFallback",o="_qCityHistory";window[t]||(window[t]=()=>{window[o]||c===(l.pathname+l.search)||l.reload()},setTimeout(()=>{addEventListener("popstate",window[t])},0))\n})();\n';
const RouterOutlet = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  _jsxBranch();
  const nonce = useServerData("nonce");
  const context = useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      cmp = _jsxC(context.value[i].default, {
        children: cmp
      }, 1, "zl_0");
    return /* @__PURE__ */ _jsxC(Fragment, {
      children: [
        cmp,
        /* @__PURE__ */ _jsxQ("script", null, {
          dangerouslySetInnerHTML: popStateScript,
          nonce
        }, null, 3, null)
      ]
    }, 1, "zl_1");
  }
  return SkipRender;
}, "RouterOutlet_component_e0ssiDXoeAM"));
const MODULE_CACHE = /* @__PURE__ */ new WeakMap();
const CLIENT_DATA_CACHE = /* @__PURE__ */ new Map();
const QACTION_KEY = "qaction";
const resolveHead = (endpoint, routeLocation, contentModules, locale) => {
  const head = createDocumentHead();
  const getData = (loaderOrAction) => {
    const id = loaderOrAction.__id;
    if (loaderOrAction.__brand === "server_loader") {
      if (!(id in endpoint.loaders))
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
    }
    const data = endpoint.loaders[id];
    if (data instanceof Promise)
      throw new Error("Loaders returning a function can not be referred to in the head function.");
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
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head, withLocale(locale, () => contentModuleHead(headProps)));
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
  frontmatter: {}
});
const loadRoute = async (routes, menus, cacheModules, pathname) => {
  if (Array.isArray(routes))
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
          loadModule(moduleLoader, pendingLoads, (routeModule) => mods[i] = routeModule, cacheModules);
        });
        loadModule(menuLoader, pendingLoads, (menuModule) => menu = menuModule?.default, cacheModules);
        if (pendingLoads.length > 0)
          await Promise.all(pendingLoads);
        return [
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
const getPathParams = (paramNames, match) => {
  const params = {};
  if (paramNames)
    for (let i = 0; i < paramNames.length; i++) {
      const param = match?.[i + 1] ?? "";
      const v = param.endsWith("/") ? param.slice(0, -1) : param;
      params[paramNames[i]] = decodeURIComponent(v);
    }
  return params;
};
const toPath = (url) => url.pathname + url.search + url.hash;
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const isSamePath = (a, b) => a.pathname + a.search === b.pathname + b.search;
const isSamePathname = (a, b) => a.pathname === b.pathname;
const isSameSearchQuery = (a, b) => a.search === b.search;
const getClientDataPath = (pathname, pageSearch, action) => {
  let search = pageSearch ?? "";
  if (action)
    search += (search ? "&" : "?") + QACTION_KEY + "=" + encodeURIComponent(action.id);
  return pathname + (pathname.endsWith("/") ? "" : "/") + "q-data.json" + search;
};
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && href.trim() !== "" && typeof props.target !== "string")
    try {
      const linkUrl = toUrl(href, baseUrl.url);
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
const getPrefetchDataset = (props, clientNavPath, currentLoc) => {
  if (props.prefetch === true && clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc.url);
    const currentUrl = toUrl("", currentLoc.url);
    if (!isSamePathname(prefetchUrl, currentUrl) || !isSameSearchQuery(prefetchUrl, currentUrl))
      return "";
  }
  return null;
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
    scrollX: 0,
    scrollY: 0,
    scrollWidth: 0,
    scrollHeight: 0
  };
};
const dispatchPrefetchEvent = (prefetchData) => {
  if (isBrowser)
    document.dispatchEvent(new CustomEvent("qprefetch", {
      detail: prefetchData
    }));
};
const loadClientData = async (url, element, clearCache, action) => {
  const pagePathname = url.pathname;
  const pageSearch = url.search;
  const clientDataPath = getClientDataPath(pagePathname, pageSearch, action);
  let qData = void 0;
  if (!action)
    qData = CLIENT_DATA_CACHE.get(clientDataPath);
  dispatchPrefetchEvent({
    links: [
      pagePathname
    ]
  });
  if (!qData) {
    const options = getFetchOptions(action);
    if (action)
      action.data = void 0;
    qData = fetch(clientDataPath, options).then((rsp) => {
      const redirectedURL = new URL(rsp.url);
      const isQData = redirectedURL.pathname.endsWith("/q-data.json");
      if (redirectedURL.origin !== location.origin || !isQData) {
        location.href = redirectedURL.href;
        return;
      }
      if ((rsp.headers.get("content-type") || "").includes("json"))
        return rsp.text().then((text) => {
          const clientData = _deserializeData(text, element);
          if (!clientData) {
            location.href = url.href;
            return;
          }
          if (clearCache)
            CLIENT_DATA_CACHE.delete(clientDataPath);
          if (clientData.redirect)
            location.href = clientData.redirect;
          else if (action) {
            const actionData = clientData.loaders[action.id];
            action.resolve({
              status: rsp.status,
              result: actionData
            });
          }
          return clientData;
        });
      else {
        location.href = url.href;
        return void 0;
      }
    });
    if (!action)
      CLIENT_DATA_CACHE.set(clientDataPath, qData);
  }
  return qData.then((v) => {
    if (!v)
      CLIENT_DATA_CACHE.delete(clientDataPath);
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
const useContent = () => useContext(ContentContext);
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useNavigate = () => useContext(RouteNavigateContext);
const useAction = () => useContext(RouteActionContext);
const useQwikCityEnv = () => noSerialize(useServerData("qwikcity"));
const toTopAlways = /* @__PURE__ */ inlinedQrl((_type, fromUrl, toUrl2) => () => {
  if (!scrollForHashChange(fromUrl, toUrl2))
    window.scrollTo(0, 0);
}, "toTopAlways_XL1xcvvrH5I");
const toLastPositionOnPopState = /* @__PURE__ */ inlinedQrl((type, fromUrl, toUrl2, scrollState) => () => {
  if (type === "popstate" || !scrollForHashChange(fromUrl, toUrl2)) {
    let [scrollX, scrollY] = [
      0,
      0
    ];
    if (type === "popstate" && scrollState) {
      scrollX = scrollState.scrollX;
      scrollY = scrollState.scrollY;
    }
    window.scrollTo(scrollX, scrollY);
  }
}, "toLastPositionOnPopState_ZF5iW45m6Kg");
const scrollForHashChange = (fromUrl, toUrl2) => {
  const newHash = toUrl2.hash;
  if (isSamePath(fromUrl, toUrl2)) {
    if (fromUrl.hash !== newHash) {
      if (newHash)
        scrollToHashId(newHash);
      else
        window.scrollTo(0, 0);
    }
  } else {
    if (newHash)
      scrollToHashId(newHash);
    else
      return false;
  }
  return true;
};
const scrollToHashId = (hash) => {
  const elmId = hash.slice(1);
  const elm = document.getElementById(elmId);
  if (elm)
    elm.scrollIntoView();
  return elm;
};
const currentScrollState = (elm) => {
  return {
    scrollX: elm.scrollLeft,
    scrollY: elm.scrollTop,
    scrollWidth: Math.max(elm.scrollWidth, elm.clientWidth),
    scrollHeight: Math.max(elm.scrollHeight, elm.clientHeight)
  };
};
const getScrollHistory = () => {
  const state = history.state;
  return state?._qCityScroll;
};
const saveScrollHistory = (scrollState, initialize = false) => {
  const state = history.state || {};
  if (state?._qCityScroll || initialize) {
    state._qCityScroll = scrollState;
    history.replaceState(state, "");
  }
};
const QwikCityProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  useStylesQrl(/* @__PURE__ */ inlinedQrl(`:root{view-transition-name:none}`, "QwikCityProvider_component_useStyles_RPDJAz33WLA"));
  const env = useQwikCityEnv();
  if (!env?.params)
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
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
    replaceState: false
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
  const goto = /* @__PURE__ */ inlinedQrl(async (path, opt) => {
    const [actionState2, navResolver2, routeInternal2, routeLocation2] = useLexicalScope();
    const { type = "link", forceReload = false, replaceState = false } = typeof opt === "object" ? opt : {
      forceReload: opt
    };
    const lastDest = routeInternal2.value.dest;
    const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
    if (!forceReload && dest.href === lastDest.href)
      return;
    routeInternal2.value = {
      type,
      dest,
      replaceState
    };
    if (isBrowser) {
      loadClientData(dest, _getContextElement());
      loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, dest.pathname);
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
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(({ track }) => {
    const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = useLexicalScope();
    async function run() {
      const [navigation, action] = track(() => [
        routeInternal2.value,
        actionState2.value
      ]);
      const locale = getLocale("");
      const prevUrl = routeLocation2.url;
      const navType = action ? "form" : navigation.type;
      const replaceState = navigation.replaceState;
      let trackUrl;
      let clientPageData;
      let loadedRoute = null;
      let elm;
      if (isServer) {
        trackUrl = new URL(navigation.dest, routeLocation2.url);
        loadedRoute = env2.loadedRoute;
        clientPageData = env2.response;
      } else {
        trackUrl = new URL(navigation.dest, location);
        if (trackUrl.pathname.endsWith("/")) {
          if (!qwikCity.trailingSlash)
            trackUrl.pathname = trackUrl.pathname.slice(0, -1);
        } else if (qwikCity.trailingSlash)
          trackUrl.pathname += "/";
        let loadRoutePromise = loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, trackUrl.pathname);
        elm = _getContextElement();
        const pageData = clientPageData = await loadClientData(trackUrl, elm, true, action);
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
          loadRoutePromise = loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, trackUrl.pathname);
        }
        loadedRoute = await loadRoutePromise;
      }
      if (loadedRoute) {
        const [params, mods, menu] = loadedRoute;
        const contentModules = mods;
        const pageModule = contentModules[contentModules.length - 1];
        if (isBrowser) {
          let scrollState;
          if (navType === "popstate")
            scrollState = getScrollHistory();
          const scrollRestoreQrl = props2.restoreScroll$ ?? toLastPositionOnPopState;
          document.__q_scroll_restore__ = await scrollRestoreQrl(navType, prevUrl, trackUrl, scrollState);
        }
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
        contentInternal2.value = noSerialize(contentModules);
        documentHead2.links = resolvedHead.links;
        documentHead2.meta = resolvedHead.meta;
        documentHead2.styles = resolvedHead.styles;
        documentHead2.title = resolvedHead.title;
        documentHead2.frontmatter = resolvedHead.frontmatter;
        if (isBrowser) {
          if (props2.viewTransition !== false)
            document.__q_view_transition__ = true;
          const loaders = clientPageData?.loaders;
          const win = window;
          if (loaders)
            Object.assign(loaderState2, loaders);
          CLIENT_DATA_CACHE.clear();
          if (!win._qCityHistory) {
            win._qCityHistory = 1;
            win.addEventListener("popstate", () => {
              win._qCityScrollHandlerEnabled = false;
              clearTimeout(win._qCityScrollDebounceTimeout);
              return goto2(location.href, {
                type: "popstate"
              });
            });
            win.removeEventListener("popstate", win._qCityPopstateFallback);
            win.addEventListener("scroll", () => {
              if (!win._qCityScrollHandlerEnabled)
                return;
              clearTimeout(win._qCityScrollDebounceTimeout);
              win._qCityScrollDebounceTimeout = setTimeout(() => {
                const scrollState = currentScrollState(document.documentElement);
                saveScrollHistory(scrollState);
                win._qCityScrollDebounceTimeout = void 0;
              }, 200);
            }, {
              passive: true
            });
            if (history.scrollRestoration)
              history.scrollRestoration = "manual";
          }
          win._qCityScrollHandlerEnabled = false;
          clearTimeout(win._qCityScrollDebounceTimeout);
          if (navType !== "popstate") {
            const scrollState = currentScrollState(document.documentElement);
            saveScrollHistory(scrollState, true);
          }
          clientNavigate(window, navType, prevUrl, trackUrl, replaceState);
          routeLocation2.isNavigating = false;
          _waitUntilRendered(elm).then(() => {
            const scrollState = currentScrollState(document.documentElement);
            saveScrollHistory(scrollState);
            win._qCityScrollHandlerEnabled = true;
            navResolver2.r?.();
          });
        }
      }
    }
    const promise = run();
    if (isServer)
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
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_0");
}, "QwikCityProvider_component_TxCFOy819ag"));
const QwikCityMockProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
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
  const goto = /* @__PURE__ */ inlinedQrl(async (path) => {
    throw new Error("Not implemented");
  }, "QwikCityMockProvider_component_goto_BUbtvTyvVRE");
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
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_1");
}, "QwikCityMockProvider_component_WmYC5H00wtI"));
const Link = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const { onClick$, reload, ...linkProps } = (() => props)();
  const clientNavPath = untrack(() => getClientNavPath(linkProps, loc));
  const prefetchDataset = untrack(() => getPrefetchDataset(props, clientNavPath, loc));
  linkProps["preventdefault:click"] = !!clientNavPath;
  linkProps.href = clientNavPath || props.href;
  const onPrefetch = prefetchDataset != null ? eventQrl(/* @__PURE__ */ inlinedQrl((ev, elm) => prefetchLinkResources(elm, ev.type === "qvisible"), "Link_component_onPrefetch_event_eBQ0vFsFKsk")) : void 0;
  const handleClick = eventQrl(/* @__PURE__ */ inlinedQrl(async (_, elm) => {
    const [nav2, reload2] = useLexicalScope();
    if (elm.href) {
      elm.setAttribute("aria-pressed", "true");
      await nav2(elm.href, {
        forceReload: reload2
      });
      elm.removeAttribute("aria-pressed");
    }
  }, "Link_component_handleClick_event_i1Cv0pYJNR0", [
    nav,
    reload
  ]));
  return /* @__PURE__ */ _jsxS("a", {
    ...linkProps,
    children: /* @__PURE__ */ _jsxC(Slot, null, 3, "AD_0"),
    "data-prefetch": prefetchDataset,
    onClick$: [
      onClick$,
      handleClick
    ],
    onFocus$: onPrefetch,
    onMouseOver$: onPrefetch,
    onQVisible$: onPrefetch
  }, null, 0, "AD_1");
}, "Link_component_8gdLBszqbaM"));
const prefetchLinkResources = (elm, isOnVisible) => {
  if (elm && elm.href && elm.hasAttribute("data-prefetch")) {
    if (!windowInnerWidth)
      windowInnerWidth = innerWidth;
    if (!isOnVisible || isOnVisible && windowInnerWidth < 520)
      loadClientData(new URL(elm.href), elm);
  }
};
let windowInnerWidth = 0;
const ServiceWorkerRegister = (props) => _jsxQ("script", {
  nonce: _wrapSignal(props, "nonce")
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
    const state = useStore(() => {
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
    const submit = /* @__PURE__ */ inlinedQrl((input = {}) => {
      const [currentAction2, id2, loc2, state2] = useLexicalScope();
      if (isServer)
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
          resolve: noSerialize(resolve)
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
  if (isServer) {
    if (typeof globalThis._qwikActionsMap === "undefined")
      globalThis._qwikActionsMap = /* @__PURE__ */ new Map();
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
      if (!(id in state))
        throw new Error(`routeLoader (${id}) was used in a path where the 'routeLoader$' was not declared.
    This is likely because the used routeLoader was not exported in a layout.tsx or index.tsx file of the existing route.
    For more information check: https://qwik.builder.io/qwikcity/route-loader/`);
      return _wrapSignal(state, id);
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
  if (isServer)
    return {
      validate: validator
    };
  return void 0;
};
const validator$ = /* @__PURE__ */ implicit$FirstArg(validatorQrl);
const zodQrl = (qrl) => {
  if (isServer) {
    const schema = qrl.resolve().then((obj) => {
      if (typeof obj === "function")
        obj = obj(z);
      if (obj instanceof z.Schema)
        return obj;
      else
        return z.object(obj);
    });
    return {
      async validate(ev, inputData) {
        const data = inputData ?? await ev.parseBody();
        const result = await (await schema).safeParseAsync(data);
        if (result.success)
          return result;
        else {
          if (isDev)
            console.error("\nVALIDATION ERROR\naction$() zod validated failed", "\n  - Issues:", result.error.issues);
          return {
            success: false,
            status: 400,
            error: result.error.flatten()
          };
        }
      }
    };
  }
  return void 0;
};
const zod$ = /* @__PURE__ */ implicit$FirstArg(zodQrl);
const serverQrl = (qrl) => {
  if (isServer) {
    const captured = qrl.getCaptured();
    if (captured && captured.length > 0 && !_getContextElement())
      throw new Error("For security reasons, we cannot serialize QRLs that capture lexical scope.");
  }
  function stuff() {
    return /* @__PURE__ */ inlinedQrl(async function(...args) {
      const [qrl2] = useLexicalScope();
      const signal = args.length > 0 && args[0] instanceof AbortSignal ? args.shift() : void 0;
      if (isServer) {
        const requestEvent = useQwikCityEnv()?.ev ?? this ?? _getContextEvent();
        return qrl2.apply(requestEvent, args);
      } else {
        const ctxElm = _getContextElement();
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
        const res = await fetch(`?qfunc=${hash}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/qwik-json",
            "X-QRL": hash
          },
          signal,
          body: await _serializeData([
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
          const obj = await _deserializeData(str, ctxElm ?? document.documentElement);
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
const server$ = /* @__PURE__ */ implicit$FirstArg(serverQrl);
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
    if (isDev) {
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
        yield await _deserializeData(line, ctxElm);
    }
  } finally {
    reader.releaseLock();
  }
};
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }, key) => {
  _jsxBranch();
  if (action)
    return _jsxS("form", {
      ...rest,
      action: _wrapSignal(action, "actionPath"),
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
    return /* @__PURE__ */ _jsxC(GetForm, {
      onSubmit$,
      reloadDocument,
      spaReset,
      ...rest
    }, 0, key);
};
const GetForm = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const rest = _restProps(props, [
    "action",
    "spaReset",
    "reloadDocument",
    "onSubmit$"
  ]);
  const nav = useNavigate();
  return /* @__PURE__ */ _jsxS("form", {
    ...rest,
    children: /* @__PURE__ */ _jsxC(Slot, null, 3, "BC_0"),
    onSubmit$: /* @__PURE__ */ inlinedQrl(async (_, form) => {
      const [nav2] = useLexicalScope();
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
    "data-spa-reset": _fnSignal((p0) => p0.spaReset ? "true" : void 0, [
      props
    ], 'p0.spaReset?"true":undefined'),
    "preventdefault:submit": _fnSignal((p0) => !p0.reloadDocument, [
      props
    ], "!p0.reloadDocument")
  }, 0, "BC_1");
}, "GetForm_component_Nk9PlpjQm9Y"));
export {
  Form,
  Link,
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
  toLastPositionOnPopState,
  toTopAlways,
  useContent,
  useDocumentHead,
  useLocation,
  useNavigate,
  validator$,
  validatorQrl,
  z2 as z,
  zod$,
  zodQrl
};
