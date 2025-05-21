/// <reference path="./modules.d.ts" />

import { Component } from '@builder.io/qwik';
import { Cookie } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieValue } from '@builder.io/qwik-city/middleware/request-handler';
import { DeferReturn } from '@builder.io/qwik-city/middleware/request-handler';
import type { EnvGetter } from '@builder.io/qwik-city/middleware/request-handler';
import { JSXOutput } from '@builder.io/qwik';
import { QRL } from '@builder.io/qwik';
import { QRLEventHandlerMulti } from '@builder.io/qwik';
import { QwikIntrinsicElements } from '@builder.io/qwik';
import { QwikJSX } from '@builder.io/qwik';
import type { ReadonlySignal } from '@builder.io/qwik';
import { RequestEvent } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventAction } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventBase } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventCommon } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventLoader } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolveSyncValue } from '@builder.io/qwik-city/middleware/request-handler';
import type * as v from 'valibot';
import type { ValueOrPromise } from '@builder.io/qwik';
import { z } from 'zod';
import type * as z_2 from 'zod';

/** @public */
export declare type Action<RETURN, INPUT = Record<string, unknown>, OPTIONAL extends boolean = true> = {
    /**
     * Returns the `ActionStore` containing the current action state and methods to invoke it from a
     * component$(). Like all `use-` functions and methods, it can only be invoked within a
     * `component$()`.
     */
    (): ActionStore<RETURN, INPUT, OPTIONAL>;
};

/** @public */
export declare type ActionConstructor = {
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR, ...REST];
    }): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: (data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR];
    }): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: REST;
    }): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: VALIDATOR, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: (data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: VALIDATOR): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ>(actionQrl: (form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, options?: {
        readonly id?: string;
    }): Action<StrictUnion<OBJ>>;
};

/** @public */
declare type ActionConstructorQRL = {
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR, ...REST];
    }): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: QRL<(data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR];
    }): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: REST;
    }): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: VALIDATOR, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: QRL<(data: GetValidatorOutputType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: VALIDATOR): Action<StrictUnion<OBJ | FailReturn<ValidatorErrorType<GetValidatorInputType<VALIDATOR>>>>, GetValidatorInputType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, options?: {
        readonly id?: string;
    }): Action<StrictUnion<OBJ>>;
};

/** @public */
export declare type ActionReturn<RETURN> = {
    readonly status?: number;
    readonly value: RETURN;
};

/** @public */
export declare type ActionStore<RETURN, INPUT, OPTIONAL extends boolean = true> = {
    /**
     * It's the "action" path that a native `<form>` should have in order to call the action.
     *
     * ```tsx
     *  <form action={action.actionPath} />
     * ```
     *
     * Most of the time this property should not be used directly, instead use the `Form` component:
     *
     * ```tsx
     * import {action$, Form} from '@builder.io/qwik-city';
     *
     * export const useAddUser = action$(() => { ... });
     *
     * export default component$(() => {
     *   const action = useAddUser();
     *   return (
     *     <Form action={action}/>
     *   );
     * });
     * ```
     */
    readonly actionPath: string;
    /**
     * Reactive property that becomes `true` only in the browser, when a form is submitted and
     * switched back to false when the action finish, ie, it describes if the action is actively
     * running.
     *
     * This property is specially useful to disable the submit button while the action is processing,
     * to prevent multiple submissions, and to inform visually to the user that the action is actively
     * running.
     *
     * It will be always `false` in the server, and only becomes `true` briefly while the action is
     * running.
     */
    readonly isRunning: boolean;
    /**
     * Returned HTTP status code of the action after its last execution.
     *
     * It's `undefined` before the action is first called.
     */
    readonly status?: number;
    /**
     * When calling an action through a `<form>`, this property contains the previously submitted
     * `FormData`.
     *
     * This is useful to keep the filled form data even after a full page reload.
     *
     * It's `undefined` before the action is first called.
     */
    readonly formData: FormData | undefined;
    /**
     * Returned successful data of the action. This reactive property will contain the data returned
     * inside the `action$` function.
     *
     * It's `undefined` before the action is first called.
     */
    readonly value: RETURN | undefined;
    /**
     * Method to execute the action programmatically from the browser. Ie, instead of using a
     * `<form>`, a 'click' handle can call the `run()` method of the action in order to execute the
     * action in the server.
     */
    readonly submit: QRL<OPTIONAL extends true ? (form?: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>> : (form: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>>>;
    /** Is action.submit was submitted */
    readonly submitted: boolean;
};

declare type AnchorAttributes = QwikIntrinsicElements['a'];

/** @public */
export declare interface ContentHeading {
    readonly text: string;
    readonly id: string;
    readonly level: number;
}

/** @public */
export declare interface ContentMenu {
    readonly text: string;
    readonly href?: string;
    readonly items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

/** @public */
declare interface ContentState {
    readonly headings: ContentHeading[] | undefined;
    readonly menu: ContentMenu | undefined;
}

export { Cookie }

export { CookieOptions }

export { CookieValue }

/** @public */
export declare type DataValidator<T extends Record<string, any> = {}> = {
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn<T>>;
};

export { DeferReturn }

/** @public */
export declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/** @public */
export declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue;
}

/** @public */
export declare interface DocumentHeadValue<FrontMatter extends Record<string, any> = Record<string, unknown>> {
    /** Sets `document.title`. */
    readonly title?: string;
    /**
     * Used to manually set meta tags in the head. Additionally, the `data` property could be used to
     * set arbitrary data which the `<head>` component could later use to generate `<meta>` tags.
     */
    readonly meta?: readonly DocumentMeta[];
    /** Used to manually append `<link>` elements to the `<head>`. */
    readonly links?: readonly DocumentLink[];
    /** Used to manually append `<style>` elements to the `<head>`. */
    readonly styles?: readonly DocumentStyle[];
    /** Used to manually append `<script>` elements to the `<head>`. */
    readonly scripts?: readonly DocumentScript[];
    /**
     * Arbitrary object containing custom data. When the document head is created from markdown files,
     * the frontmatter attributes that are not recognized as a well-known meta names (such as title,
     * description, author, etc...), are stored in this property.
     */
    readonly frontmatter?: Readonly<FrontMatter>;
}

/** @public */
export declare interface DocumentLink {
    as?: string;
    crossorigin?: string;
    disabled?: boolean;
    href?: string;
    hreflang?: string;
    id?: string;
    imagesizes?: string;
    imagesrcset?: string;
    integrity?: string;
    media?: string;
    prefetch?: string;
    referrerpolicy?: string;
    rel?: string;
    sizes?: string;
    title?: string;
    type?: string;
    key?: string;
}

/** @public */
export declare interface DocumentMeta {
    readonly content?: string;
    readonly httpEquiv?: string;
    readonly name?: string;
    readonly property?: string;
    readonly key?: string;
    readonly itemprop?: string;
    readonly media?: string;
}

/** @alpha */
export declare interface DocumentScript {
    readonly script?: string;
    readonly props?: Readonly<QwikIntrinsicElements['script']>;
    readonly key?: string;
}

/** @public */
export declare interface DocumentStyle {
    readonly style: string;
    readonly props?: Readonly<QwikIntrinsicElements['style']>;
    readonly key?: string;
}

declare type EndpointModuleLoader = () => Promise<RouteModule>;

/** @public */
export declare const ErrorBoundary: Component<ErrorBoundaryProps>;

/** @public */
declare interface ErrorBoundaryProps {
    fallback$?: QRL<(error: any) => any>;
}

declare type Failed = {
    failed: true;
};

/** @public */
export declare type FailOfRest<REST extends readonly DataValidator[]> = REST extends readonly DataValidator<infer ERROR>[] ? ERROR : never;

/** @public */
export declare type FailReturn<T> = T & Failed;

/** @public */
export declare const Form: <O, I>({ action, spaReset, reloadDocument, onSubmit$, ...rest }: FormProps<O, I>, key: string | null) => JSXOutput;

/** @public */
export declare interface FormProps<O, I> extends Omit<QwikJSX.IntrinsicElements['form'], 'action' | 'method'> {
    /** Reference to the action returned by `action()`. */
    action?: ActionStore<O, I, true | false>;
    /**
     * When `true` the form submission will cause a full page reload, even if SPA mode is enabled and
     * JS is available.
     */
    reloadDocument?: boolean;
    /**
     * When `true` all the form inputs will be reset in SPA mode, just like happens in a full page
     * form submission.
     *
     * Defaults to `false`
     */
    spaReset?: boolean;
    /** Event handler executed right when the form is submitted. */
    onSubmit$?: QRLEventHandlerMulti<SubmitEvent, HTMLFormElement> | undefined;
    /** Event handler executed right after the action is executed successfully and returns some data. */
    onSubmitCompleted$?: QRLEventHandlerMulti<CustomEvent<FormSubmitSuccessDetail<O>>, HTMLFormElement> | undefined;
    key?: string | number | null;
}

/** @public */
export declare interface FormSubmitSuccessDetail<T> {
    status: number;
    value: T;
}

/** @public */
export declare type GetValidatorInputType<VALIDATOR extends TypedDataValidator> = VALIDATOR extends ValibotDataValidator<infer TYPE> ? v.InferInput<TYPE> : VALIDATOR extends ZodDataValidator<infer TYPE> ? z_2.input<TYPE> : never;

/** @public */
export declare type GetValidatorOutputType<VALIDATOR extends TypedDataValidator> = VALIDATOR extends ValibotDataValidator<infer TYPE> ? v.InferOutput<TYPE> : VALIDATOR extends ZodDataValidator<infer TYPE> ? z_2.output<TYPE> : never;

/** @public */
export declare type GetValidatorType<VALIDATOR extends TypedDataValidator> = GetValidatorOutputType<VALIDATOR>;

/** @public */
export declare const globalAction$: ActionConstructor;

/** @public */
export declare const globalActionQrl: ActionConstructorQRL;

declare type IsAny<Type> = 0 extends 1 & Type ? true : false;

/** @public */
export declare type JSONObject = {
    [x: string]: JSONValue;
};

/** @public */
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;

declare interface LayoutModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
}

/** @public */
export declare const Link: Component<LinkProps>;

/** @public */
export declare interface LinkProps extends AnchorAttributes {
    /**
     * **Defaults to _true_.**
     *
     * Whether Qwik should prefetch and cache the target page of this **`Link`**, this includes
     * invoking any **`routeLoader$`**, **`onGet`**, etc.
     *
     * This **improves UX performance** for client-side (**SPA**) navigations.
     *
     * Prefetching occurs when a the Link enters the viewport in production (**`on:qvisible`**), or
     * with **`mouseover`/`focus`** during dev.
     *
     * Prefetching will not occur if the user has the **data saver** setting enabled.
     *
     * Setting this value to **`"js"`** will prefetch only javascript bundles required to render this
     * page on the client, **`false`** will disable prefetching altogether.
     */
    prefetch?: boolean | 'js';
    reload?: boolean;
    replaceState?: boolean;
    scroll?: boolean;
}

/** @public */
declare type Loader_2<RETURN> = {
    /**
     * Returns the `Signal` containing the data returned by the `loader$` function. Like all `use-`
     * functions and methods, it can only be invoked within a `component$()`.
     */
    (): LoaderSignal<RETURN>;
};
export { Loader_2 as Loader }

/** @public */
declare type LoaderConstructor = {
    <OBJ>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<OBJ>, options?: LoaderOptions): Loader_2<[Extract<OBJ, Failed>] extends [never] ? OBJ : StrictUnion<OBJ>>;
    <OBJ extends Record<string, any> | void | null, REST extends readonly DataValidator[]>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<OBJ>, ...rest: REST): Loader_2<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
};

/** @public */
declare type LoaderConstructorQRL = {
    <OBJ>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<OBJ>>, options?: LoaderOptions): Loader_2<[Extract<OBJ, Failed>] extends [never] ? OBJ : StrictUnion<OBJ>>;
    <OBJ extends Record<string, any> | void | null, REST extends readonly DataValidator[]>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<OBJ>>, ...rest: REST): Loader_2<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
};

/** @public */
declare type LoaderOptions = {
    id?: string;
};

/** @public */
export declare type LoaderSignal<TYPE> = TYPE extends () => ValueOrPromise<infer VALIDATOR> ? ReadonlySignal<ValueOrPromise<VALIDATOR>> : ReadonlySignal<TYPE>;

/** @public */
export declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/** @public */
export declare type NavigationType = 'initial' | 'form' | 'link' | 'popstate';

/** @public */
export declare interface PageModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/** @public */
export declare type PathParams = Record<string, string>;

declare type Prettify<T> = {} & {
    [K in keyof T]: T[K];
};

/**
 * @param url - The URL that the user is trying to navigate to, or a number to indicate the user is
 *   trying to navigate back/forward in the application history. If it is missing, the event is sent
 *   by the browser and the user is trying to reload or navigate away from the page. In this case,
 *   the function should decide the answer synchronously.
 * @returns `true` to prevent navigation, `false` to allow navigation, or a Promise that resolves to
 *   `true` or `false`. For browser events, returning `true` or a Promise may show a confirmation
 *   dialog, at the browser's discretion. If the user confirms, the navigation will still be
 *   allowed.
 * @public
 */
export declare type PreventNavigateCallback = (url?: number | URL) => ValueOrPromise<boolean>;

/** @public */
export declare const QWIK_CITY_SCROLLER = "_qCityScroller";

/** @public */
export declare interface QwikCityMockProps {
    url?: string;
    params?: Record<string, string>;
    goto?: RouteNavigate;
}

/** @public */
export declare const QwikCityMockProvider: Component<QwikCityMockProps>;

/** @public */
export declare interface QwikCityPlan {
    readonly routes: RouteData[];
    readonly serverPlugins?: RouteModule[];
    readonly basePathname?: string;
    readonly menus?: MenuData[];
    readonly trailingSlash?: boolean;
    readonly cacheModules?: boolean;
}

/** @public */
export declare interface QwikCityProps {
    /**
     * Enable the ViewTransition API
     *
     * Default: `true`
     *
     * @see https://github.com/WICG/view-transitions/blob/main/explainer.md
     * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     * @see https://caniuse.com/mdn-api_viewtransition
     */
    viewTransition?: boolean;
}

/** @public */
export declare const QwikCityProvider: Component<QwikCityProps>;

export { RequestEvent }

export { RequestEventAction }

export { RequestEventBase }

export { RequestEventCommon }

export { RequestEventLoader }

export { RequestHandler }

/** @public */
export declare type ResolvedDocumentHead<FrontMatter extends Record<string, any> = Record<string, unknown>> = Required<DocumentHeadValue<FrontMatter>>;

/** @public */
export declare const routeAction$: ActionConstructor;

/** @public */
export declare const routeActionQrl: ActionConstructorQRL;

/** @public */
export declare type RouteData = [routeName: string, loaders: ModuleLoader[]] | [
routeName: string,
loaders: ModuleLoader[],
originalPathname: string,
routeBundleNames: string[]
];

/** @public */
export declare const routeLoader$: LoaderConstructor;

/** @public */
export declare const routeLoaderQrl: LoaderConstructorQRL;

/** @public */
export declare interface RouteLocation {
    readonly params: Readonly<Record<string, string>>;
    readonly url: URL;
    readonly isNavigating: boolean;
    readonly prevUrl: URL | undefined;
}

declare interface RouteModule<BODY = unknown> {
    onDelete?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onGet?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onHead?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onOptions?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPatch?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPost?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPut?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onRequest?: RequestHandler<BODY> | RequestHandler<BODY>[];
}

/** @public */
export declare type RouteNavigate = QRL<(path?: string | number | URL, options?: {
    type?: Exclude<NavigationType, 'initial'>;
    forceReload?: boolean;
    replaceState?: boolean;
    scroll?: boolean;
} | boolean) => Promise<void>>;

/** @public */
export declare const RouterOutlet: Component<unknown>;

/** @public */
export declare const server$: <T extends ServerFunction>(qrl: T, options?: ServerConfig | undefined) => ServerQRL<T>;

/** @public */
declare interface ServerConfig {
    origin?: string;
    method?: 'get' | 'post';
    headers?: Record<string, string>;
    fetchOptions?: any;
}

/** @public */
export declare type ServerFunction = {
    (this: RequestEventBase, ...args: any[]): any;
    options?: ServerConfig;
};

/**
 * You can pass an AbortSignal as the first argument of a `server$` function and it will use it to
 * abort the fetch when fired.
 *
 * @public
 */
export declare type ServerQRL<T extends ServerFunction> = QRL<((abort: AbortSignal, ...args: Parameters<T>) => ReturnType<T>) | ((...args: Parameters<T>) => ReturnType<T>)>;

/** @public */
export declare const serverQrl: <T extends ServerFunction>(qrl: QRL<T>, options?: ServerConfig) => ServerQRL<T>;

/**
 * Loads the service workers that are defined in the routes. Any file named `service-worker.*` (all
 * JS extensions are allowed) will be picked up, bundled into a separate file, and registered as a
 * service worker.
 *
 * @public
 */
export declare const ServiceWorkerRegister: (props: {
    nonce?: string;
}) => JSXOutput;

/** @public */
export declare interface StaticGenerate {
    params?: PathParams[];
}

/** @public */
export declare type StaticGenerateHandler = ({ env, }: {
    env: EnvGetter;
}) => Promise<StaticGenerate> | StaticGenerate;

/** @public */
export declare type StrictUnion<T> = Prettify<StrictUnionHelper<T, T>>;

declare type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

/** @public */
export declare type TypedDataValidator = ValibotDataValidator | ZodDataValidator;

declare type UnionKeys<T> = T extends T ? keyof T : never;

/** @public */
export declare const useContent: () => ContentState;

/**
 * Returns the document head for the current page. The generic type describes the front matter.
 *
 * @public
 */
export declare const useDocumentHead: <FrontMatter extends Record<string, unknown> = Record<string, any>>() => Required<ResolvedDocumentHead<FrontMatter>>;

/** @public */
export declare const useLocation: () => RouteLocation;

/** @public */
export declare const useNavigate: () => RouteNavigate;

/**
 * Prevent navigation attempts. This hook registers a callback that will be called before SPA or
 * browser navigation.
 *
 * Return `true` to prevent navigation.
 *
 * #### SPA Navigation
 *
 * For Single-Page-App (SPA) navigation (via `<Link />`, `const nav = useNavigate()`, and browser
 * backwards/forwards inside SPA history), the callback will be provided with the target, either a
 * URL or a number. It will only be a number if `nav(number)` was called to navigate forwards or
 * backwards in SPA history.
 *
 * If you return a Promise, the navigation will be blocked until the promise resolves.
 *
 * This can be used to show a nice dialog to the user, and wait for the user to confirm, or to
 * record the url, prevent the navigation, and navigate there later via `nav(url)`.
 *
 * #### Browser Navigation
 *
 * However, when the user navigates away by clicking on a regular `<a />`, reloading, or moving
 * backwards/forwards outside SPA history, this callback will not be awaited. This is because the
 * browser does not provide a way to asynchronously prevent these navigations.
 *
 * In this case, returning returning `true` will tell the browser to show a confirmation dialog,
 * which cannot be customized. You are also not able to show your own `window.confirm()` dialog
 * during the callback, the browser won't allow it. If you return a Promise, it will be considered
 * as `true`.
 *
 * When the callback is called from the browser, no url will be provided. Use this to know whether
 * you can show a dialog or just return `true` to prevent the navigation.
 *
 * @public
 */
export declare const usePreventNavigate$: (qrl: PreventNavigateCallback) => void;

/** @internal Implementation of usePreventNavigate$ */
export declare const usePreventNavigateQrl: (fn: QRL<PreventNavigateCallback>) => void;

/** @alpha */
export declare const valibot$: ValibotConstructor;

/** @alpha */
declare type ValibotConstructor = {
    <T extends v.GenericSchema | v.GenericSchemaAsync>(schema: T): ValibotDataValidator<T>;
    <T extends v.GenericSchema | v.GenericSchemaAsync>(schema: (ev: RequestEvent) => T): ValibotDataValidator<T>;
};

/** @alpha */
declare type ValibotConstructorQRL = {
    <T extends v.GenericSchema | v.GenericSchemaAsync>(schema: QRL<T>): ValibotDataValidator<T>;
    <T extends v.GenericSchema | v.GenericSchemaAsync>(schema: QRL<(ev: RequestEvent) => T>): ValibotDataValidator<T>;
};

/** @alpha */
declare type ValibotDataValidator<T extends v.GenericSchema | v.GenericSchemaAsync = v.GenericSchema | v.GenericSchemaAsync> = {
    readonly __brand: 'valibot';
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn<ValidatorErrorType<v.InferInput<T>>>>;
};

/** @alpha */
export declare const valibotQrl: ValibotConstructorQRL;

/** @public */
export declare const validator$: ValidatorConstructor;

declare type ValidatorConstructor = {
    <T extends ValidatorReturn>(validator: (ev: RequestEvent, data: unknown) => ValueOrPromise<T>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
};

declare type ValidatorConstructorQRL = {
    <T extends ValidatorReturn>(validator: QRL<(ev: RequestEvent, data: unknown) => ValueOrPromise<T>>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
};

/** @public */
export declare type ValidatorErrorKeyDotNotation<T, Prefix extends string = ''> = IsAny<T> extends true ? never : T extends object ? {
    [K in keyof T & string]: IsAny<T[K]> extends true ? never : T[K] extends (infer U)[] ? IsAny<U> extends true ? never : U extends object ? `${Prefix}${K}[]` | ValidatorErrorKeyDotNotation<U, `${Prefix}${K}[].`> : `${Prefix}${K}[]` : T[K] extends object ? ValidatorErrorKeyDotNotation<T[K], `${Prefix}${K}.`> : `${Prefix}${K}`;
}[keyof T & string] : never;

/** @public */
export declare type ValidatorErrorType<T, U = string> = {
    formErrors: U[];
    fieldErrors: Partial<{
        [K in ValidatorErrorKeyDotNotation<T>]: K extends `${infer _Prefix}[]${infer _Suffix}` ? U[] : U;
    }>;
};

/** @public */
export declare const validatorQrl: ValidatorConstructorQRL;

/** @public */
export declare type ValidatorReturn<T extends Record<string, any> = {}> = ValidatorReturnSuccess | ValidatorReturnFail<T>;

declare type ValidatorReturnFail<T extends Record<string, any> = {}> = {
    readonly success: false;
    readonly error: T;
    readonly status?: number;
};

declare type ValidatorReturnSuccess = {
    readonly success: true;
    readonly data?: unknown;
};

export { z }

/** @public */
export declare const zod$: ZodConstructor;

/** @public */
export declare type ZodConstructor = {
    <T extends z_2.ZodRawShape>(schema: T): ZodDataValidator<z_2.ZodObject<T>>;
    <T extends z_2.ZodRawShape>(schema: (zod: typeof z_2.z, ev: RequestEvent) => T): ZodDataValidator<z_2.ZodObject<T>>;
    <T extends z_2.Schema>(schema: T): ZodDataValidator<T>;
    <T extends z_2.Schema>(schema: (zod: typeof z_2.z, ev: RequestEvent) => T): ZodDataValidator<T>;
};

/** @public */
declare type ZodConstructorQRL = {
    <T extends z_2.ZodRawShape>(schema: QRL<T>): ZodDataValidator<z_2.ZodObject<T>>;
    <T extends z_2.ZodRawShape>(schema: QRL<(zod: typeof z_2.z, ev: RequestEvent) => T>): ZodDataValidator<z_2.ZodObject<T>>;
    <T extends z_2.Schema>(schema: QRL<T>): ZodDataValidator<T>;
    <T extends z_2.Schema>(schema: QRL<(zod: typeof z_2.z, ev: RequestEvent) => T>): ZodDataValidator<T>;
};

/** @public */
declare type ZodDataValidator<T extends z_2.ZodType = z_2.ZodType> = {
    readonly __brand: 'zod';
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn<ValidatorErrorType<z_2.input<T>>>>;
};

/** @public */
export declare const zodQrl: ZodConstructorQRL;

export { }
