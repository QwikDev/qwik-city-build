import { createContextId, componentQrl, inlinedQrl, _jsxBranch, useOnDocument, useContext, jsx, SkipRender, withLocale, _deserializeData, noSerialize, useEnvData, useServerData, useStore, _weakSerialize, useSignal, useContextProvider, useTaskQrl, useLexicalScope, Slot, _getContextElement, getLocale, implicit$FirstArg, _wrapSignal, _serializeData } from "@builder.io/qwik";
import { jsx as jsx$1 } from "@builder.io/qwik/jsx-runtime";
import { isServer, isBrowser, isDev } from "@builder.io/qwik/build";
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
const RouterOutlet = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  _jsxBranch();
  useOnDocument("qinit", /* @__PURE__ */ inlinedQrl(() => {
    const POPSTATE_FALLBACK_INITIALIZED = "_qCityPopstateFallback";
    if (!window["_qCityPopstateFallback"]) {
      window[POPSTATE_FALLBACK_INITIALIZED] = () => {
        if (!window["_qCityHistory"])
          location.reload();
      };
      setTimeout(() => {
        addEventListener("popstate", window["_qCityPopstateFallback"]);
      }, 0);
    }
  }, "RouterOutlet_component_useOnDocument_sKCu0TvdkZI"));
  const context = useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      cmp = jsx(context.value[i].default, {
        children: cmp
      });
    return cmp;
  }
  return SkipRender;
}, "RouterOutlet_component_AKetNByE5TM"));
const Content = RouterOutlet;
const MODULE_CACHE = /* @__PURE__ */ new WeakMap();
const CLIENT_DATA_CACHE = /* @__PURE__ */ new Map();
const QACTION_KEY = "qaction";
const toPath = (url) => url.pathname + url.search + url.hash;
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const isSamePath = (a, b) => a.pathname + a.search === b.pathname + b.search;
const isSamePathname = (a, b) => a.pathname === b.pathname;
const isSameOriginDifferentPathname = (a, b) => isSameOrigin(a, b) && !isSamePath(a, b);
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
      const linkUrl = toUrl(href, baseUrl);
      const currentUrl = toUrl("", baseUrl);
      if (isSameOrigin(linkUrl, currentUrl))
        return toPath(linkUrl);
    } catch (e) {
      console.error(e);
    }
  else if (props.reload)
    return toPath(toUrl("", baseUrl));
  return null;
};
const getPrefetchDataset = (props, clientNavPath, currentLoc) => {
  if (props.prefetch === true && clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc);
    if (!isSamePathname(prefetchUrl, toUrl("", currentLoc)))
      return "";
  }
  return null;
};
const clientNavigate = (win, newUrl, routeNavigate) => {
  const currentUrl = win.location;
  if (isSameOriginDifferentPathname(currentUrl, newUrl)) {
    handleScroll(win, currentUrl, newUrl);
    win.history.pushState("", "", toPath(newUrl));
  }
  if (!win._qCityHistory) {
    win._qCityHistory = 1;
    win.addEventListener("popstate", () => {
      const currentUrl2 = win.location;
      const previousUrl = toUrl(routeNavigate.value, currentUrl2);
      if (isSameOriginDifferentPathname(currentUrl2, previousUrl)) {
        handleScroll(win, previousUrl, currentUrl2);
        routeNavigate.value = toPath(currentUrl2);
      }
    });
    win.removeEventListener("popstate", win._qCityPopstateFallback);
  }
};
const handleScroll = async (win, previousUrl, newUrl) => {
  const doc = win.document;
  const newHash = newUrl.hash;
  if (isSamePath(previousUrl, newUrl)) {
    if (previousUrl.hash !== newHash) {
      await domWait();
      if (newHash)
        scrollToHashId(doc, newHash);
      else
        win.scrollTo(0, 0);
    }
  } else {
    if (newHash)
      for (let i = 0; i < 24; i++) {
        await domWait();
        if (scrollToHashId(doc, newHash))
          break;
      }
    else {
      await domWait();
      win.scrollTo(0, 0);
    }
  }
};
const domWait = () => new Promise((resolve) => setTimeout(resolve, 12));
const scrollToHashId = (doc, hash) => {
  const elmId = hash.slice(1);
  const elm = doc.getElementById(elmId);
  if (elm)
    elm.scrollIntoView();
  return elm;
};
const dispatchPrefetchEvent = (prefetchData) => {
  if (typeof document !== "undefined")
    document.dispatchEvent(new CustomEvent("qprefetch", {
      detail: prefetchData
    }));
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
    if (data instanceof Promise)
      throw new Error("Loaders returning a function can not be refered to in the head function.");
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
      if (redirectedURL.origin !== location.origin || !isQDataJson(redirectedURL.pathname)) {
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
const isQDataJson = (pathname) => {
  return pathname.endsWith("/q-data.json");
};
const useContent = () => useContext(ContentContext);
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useNavigate = () => useContext(RouteNavigateContext);
const useAction = () => useContext(RouteActionContext);
const useQwikCityEnv = () => noSerialize(useEnvData("qwikcity"));
const QwikCityProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(() => {
  const env = useQwikCityEnv();
  if (!env?.params)
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    href: url.href,
    pathname: url.pathname,
    query: url.searchParams,
    params: env.params,
    isNavigating: false
  });
  const loaderState = _weakSerialize(useStore(env.response.loaders));
  const navPath = useSignal(toPath(url));
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
  const goto = /* @__PURE__ */ inlinedQrl(async (path, forceReload) => {
    const [actionState2, navPath2, routeLocation2] = useLexicalScope();
    if (path === void 0) {
      path = navPath2.value;
      navPath2.value = "";
    } else if (forceReload)
      navPath2.value = "";
    else if (navPath2.value === path)
      return;
    navPath2.value = path;
    if (isBrowser) {
      const prefetchURL = new URL(path, routeLocation2.url);
      loadClientData(prefetchURL, _getContextElement());
      loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, prefetchURL.pathname);
    }
    actionState2.value = void 0;
    routeLocation2.isNavigating = true;
  }, "QwikCityProvider_component_goto_fX0bDjeJa0E", [
    actionState,
    navPath,
    routeLocation
  ]);
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(({ track }) => {
    const [actionState2, content2, contentInternal2, documentHead2, env2, loaderState2, navPath2, routeLocation2] = useLexicalScope();
    async function run() {
      const [path, action] = track(() => [
        navPath2.value,
        actionState2.value
      ]);
      const locale = getLocale("");
      let url2 = new URL(path, routeLocation2.url);
      let clientPageData;
      let loadedRoute = null;
      if (isServer) {
        loadedRoute = env2.loadedRoute;
        clientPageData = env2.response;
      } else {
        if (url2.pathname.endsWith("/")) {
          if (!qwikCity.trailingSlash)
            url2.pathname = url2.pathname.slice(0, -1);
        } else if (qwikCity.trailingSlash)
          url2.pathname += "/";
        let loadRoutePromise = loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, url2.pathname);
        const element = _getContextElement();
        const pageData = clientPageData = await loadClientData(url2, element, true, action);
        if (!pageData) {
          navPath2.untrackedValue = toPath(url2);
          return;
        }
        const newHref = pageData.href;
        const newURL = new URL(newHref, url2.href);
        if (newURL.pathname !== url2.pathname) {
          url2 = newURL;
          loadRoutePromise = loadRoute(qwikCity.routes, qwikCity.menus, qwikCity.cacheModules, url2.pathname);
        }
        loadedRoute = await loadRoutePromise;
      }
      if (loadedRoute) {
        const [params, mods, menu] = loadedRoute;
        const pageModule = mods[mods.length - 1];
        routeLocation2.url = url2;
        routeLocation2.href = url2.href;
        routeLocation2.pathname = url2.pathname;
        routeLocation2.params = {
          ...params
        };
        routeLocation2.query = url2.searchParams;
        navPath2.untrackedValue = toPath(url2);
        const resolvedHead = resolveHead(clientPageData, routeLocation2, mods, locale);
        content2.headings = pageModule.headings;
        content2.menu = menu;
        contentInternal2.value = noSerialize(mods);
        documentHead2.links = resolvedHead.links;
        documentHead2.meta = resolvedHead.meta;
        documentHead2.styles = resolvedHead.styles;
        documentHead2.title = resolvedHead.title;
        documentHead2.frontmatter = resolvedHead.frontmatter;
        if (isBrowser) {
          const loaders = clientPageData?.loaders;
          if (loaders)
            Object.assign(loaderState2, loaders);
          CLIENT_DATA_CACHE.clear();
          clientNavigate(window, url2, navPath2);
          routeLocation2.isNavigating = false;
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
    loaderState,
    navPath,
    routeLocation
  ]));
  return /* @__PURE__ */ jsx$1(Slot, {}, "qY_0");
}, "QwikCityProvider_component_TxCFOy819ag"));
const QwikCity = QwikCityProvider;
const Html = QwikCityProvider;
const QwikCityMockProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const urlEnv = props.url ?? "http://localhost/";
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    href: url.href,
    pathname: url.pathname,
    query: url.searchParams,
    params: props.params ?? {},
    isNavigating: false
  });
  const loaderState = useSignal({});
  const goto = /* @__PURE__ */ inlinedQrl(async (path) => {
    throw new Error("Not implemented");
  }, "QwikCityMockProvider_component_goto_BUbtvTyvVRE");
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useSignal();
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  return /* @__PURE__ */ jsx$1(Slot, {}, "qY_1");
}, "QwikCityMockProvider_component_WmYC5H00wtI"));
const Link = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl((props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const originalHref = props.href;
  const linkProps = {
    ...props
  };
  const clientNavPath = getClientNavPath(linkProps, loc);
  const prefetchDataset = getPrefetchDataset(props, clientNavPath, loc);
  linkProps["preventdefault:click"] = !!clientNavPath;
  linkProps.href = clientNavPath || originalHref;
  return /* @__PURE__ */ jsx$1("a", {
    ...linkProps,
    onClick$: /* @__PURE__ */ inlinedQrl(() => {
      const [clientNavPath2, linkProps2, nav2] = useLexicalScope();
      if (clientNavPath2)
        nav2(linkProps2.href, linkProps2.reload);
    }, "Link_component_a_onClick_kzjavhDI3L0", [
      clientNavPath,
      linkProps,
      nav
    ]),
    "data-prefetch": prefetchDataset,
    onMouseOver$: /* @__PURE__ */ inlinedQrl((_, elm) => prefetchLinkResources(elm), "Link_component_a_onMouseOver_yiXwCC0m3jY"),
    onFocus$: /* @__PURE__ */ inlinedQrl((_, elm) => prefetchLinkResources(elm), "Link_component_a_onFocus_PrXIxv2vNXY"),
    onQVisible$: /* @__PURE__ */ inlinedQrl((_, elm) => prefetchLinkResources(elm, true), "Link_component_a_onQVisible_EpaZ5qQ4Lg4"),
    children: /* @__PURE__ */ jsx$1(Slot, {}, "AD_0")
  }, "AD_1");
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
const ServiceWorkerRegister = (props) => jsx("script", {
  dangerouslySetInnerHTML: swRegister,
  nonce: props.nonce
});
const routeActionQrl = (actionQrl2, ...rest) => {
  const { id, validators } = getValidators(rest, actionQrl2);
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
    initialState.run = /* @__PURE__ */ inlinedQrl((input = {}) => {
      const [currentAction2, id2, loc2, state2] = useLexicalScope();
      if (isServer)
        throw new Error(`Actions can not be invoked within the server during SSR.
Action.run() can only be called on the browser, for example when a user clicks a button, or submits a form.`);
      let data;
      let form;
      if (input instanceof SubmitEvent) {
        form = input.target;
        data = new FormData(form);
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
    }, "routeActionQrl_action_X5cKKrhH8rs", [
      currentAction,
      id,
      loc,
      state
    ]);
    return state;
  }
  action.__brand = "server_action";
  action.__validators = validators;
  action.__qrl = actionQrl2;
  action.__id = id;
  action.use = action;
  return action;
};
const globalActionQrl = (actionQrl2, ...rest) => {
  const action = routeActionQrl(actionQrl2, ...rest);
  if (isServer) {
    if (typeof globalThis._qwikActionsMap === "undefined")
      globalThis._qwikActionsMap = /* @__PURE__ */ new Map();
    globalThis._qwikActionsMap.set(action.__id, action);
  }
  return action;
};
const routeAction$ = /* @__PURE__ */ implicit$FirstArg(routeActionQrl);
const globalAction$ = /* @__PURE__ */ implicit$FirstArg(globalActionQrl);
const routeLoaderQrl = (loaderQrl2, ...rest) => {
  const { id, validators } = getValidators(rest, loaderQrl2);
  function loader() {
    return useContext(RouteStateContext, (state) => {
      if (!(id in state))
        throw new Error(`Loader (${id}) was used in a path where the 'loader$' was not declared.
    This is likely because the used loader was not exported in a layout.tsx or index.tsx file of the existing route.
    For more information check: https://qwik.builder.io/qwikcity/route-loader/`);
      return _wrapSignal(state, id);
    });
  }
  loader.__brand = "server_loader";
  loader.__qrl = loaderQrl2;
  loader.__validators = validators;
  loader.__id = id;
  loader.use = loader;
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
  function client() {
    return /* @__PURE__ */ inlinedQrl(async (...args) => {
      const [qrl2] = useLexicalScope();
      if (isServer)
        return qrl2(...args);
      else {
        const filtered = args.map((arg) => {
          if (arg instanceof Event)
            return null;
          else if (arg instanceof Node)
            return null;
          return arg;
        });
        const hash = qrl2.getHash();
        const path = `?qfunc=${qrl2.getHash()}`;
        const body = await _serializeData([
          qrl2,
          ...filtered
        ], false);
        const res = await fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/qwik-json",
            "X-QRL": hash
          },
          body
        });
        if (!res.ok)
          throw new Error(`Server function failed: ${res.statusText}`);
        const str = await res.text();
        const obj = await _deserializeData(str);
        return obj;
      }
    }, "serverQrl_client_b0uBOzEpu7U", [
      qrl
    ]);
  }
  return client();
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
const actionQrl = globalActionQrl;
const action$ = globalAction$;
const loaderQrl = routeLoaderQrl;
const loader$ = routeLoader$;
const Form = ({ action, spaReset, reloadDocument, onSubmit$, ...rest }) => {
  return jsx("form", {
    ...rest,
    action: action.actionPath,
    "preventdefault:submit": !reloadDocument,
    onSubmit$: [
      !reloadDocument ? action.run : void 0,
      onSubmit$
    ],
    method: "post",
    ["data-spa-reset"]: spaReset ? "true" : void 0
  });
};
export {
  Content,
  Form,
  Html,
  Link,
  QwikCity,
  QwikCityMockProvider,
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
  action$,
  actionQrl,
  globalAction$,
  globalActionQrl,
  loader$,
  loaderQrl,
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
  validator$,
  validatorQrl,
  z2 as z,
  zod$,
  zodQrl
};
