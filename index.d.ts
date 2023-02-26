/// <reference path="./modules.d.ts" />

import type { Action as Action_2 } from '@builder.io/qwik-city';
import { Component } from '@builder.io/qwik';
import { Cookie } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieValue } from '@builder.io/qwik-city/middleware/request-handler';
import { DeferReturn } from '@builder.io/qwik-city/middleware/request-handler';
import type { FailReturn as FailReturn_2 } from '@builder.io/qwik-city';
import { JSXNode } from '@builder.io/qwik';
import type { Loader as Loader_2 } from '@builder.io/qwik-city';
import { QRL } from '@builder.io/qwik';
import { QwikIntrinsicElements } from '@builder.io/qwik';
import { QwikJSX } from '@builder.io/qwik';
import { RequestEvent } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventAction } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventCommon } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventLoader } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolveSyncValue } from '@builder.io/qwik-city/middleware/request-handler';
import type { Signal } from '@builder.io/qwik';
import { ValueOrPromise } from '@builder.io/qwik';
import { z } from 'zod';

declare class AbortMessage {
}

/**
 * @alpha
 * @deprecated - use `globalAction$()` instead
 */
export declare const action$: ActionConstructor;

/**
 * @alpha
 */
export declare interface Action<RETURN, INPUT = Record<string, any>, OPTIONAL extends boolean = true> {
    /**
     * Returns the `ActionStore` containing the current action state and methods to invoke it from a component$().
     * Like all `use-` functions and methods, it can only be invoked within a `component$()`.
     */
    (): ActionStore<RETURN, INPUT, OPTIONAL>;
    /**
     * @deprecated - call as a function instead
     */
    use(): ActionStore<RETURN, INPUT, OPTIONAL>;
}

/**
 * @alpha
 */
export declare interface ActionConstructor {
    <O>(actionQrl: (form: JSONObject, event: RequestEventAction, options: ActionOptions) => ValueOrPromise<O>, options?: ActionOptions): Action<O>;
    <O, B extends TypedDataValidator>(actionQrl: (data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>, options: B | ActionOptionsWithValidation<B>): Action<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>>, GetValidatorType<B>, false>;
    <O, B extends TypedDataValidator>(actionQrl: (data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>, options: B, ...rest: DataValidator[]): Action<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>>, GetValidatorType<B>, false>;
}

declare interface ActionInternal extends Action<any, any> {
    readonly __brand: 'server_action';
    __id: string;
    __qrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<any>>;
    __validators: ValidatorInternal[] | undefined;
    (): ActionStore<any, any>;
}

/**
 * @alpha
 */
export declare interface ActionOptions {
    readonly id?: string;
}

/**
 * @alpha
 */
export declare interface ActionOptionsWithValidation<B extends TypedDataValidator = TypedDataValidator> extends ActionOptions {
    readonly id?: string;
    readonly validation: [val: B, ...a: DataValidator[]];
}

/**
 * @alpha
 * @deprecated - use `globalAction$()` instead
 */
export declare const actionQrl: <B, A>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<B>>, ...rest: (CommonLoaderActionOptions | DataValidator)[]) => Action<B, A, true>;

/**
 * @alpha
 */
declare interface ActionReturn<RETURN> {
    readonly status?: number;
    readonly value: GetValueReturn<RETURN>;
}

/**
 * @alpha
 */
export declare interface ActionStore<RETURN, INPUT, OPTIONAL extends boolean = true> {
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
     *   const action = useAddUser()l
     *   return (
     *     <Form action={action}/>
     *   );
     * });
     * ```
     */
    readonly actionPath: string;
    /**
     * Reactive property that becomes `true` only in the browser, when a form is submited and switched back to false when the action finish, ie, it describes if the action is actively running.
     *
     * This property is specially useful to disable the submit button while the action is processing, to prevent multiple submissions, and to inform visually to the user that the action is actively running.
     *
     * It will be always `false` in the server, and only becomes `true` briefly while the action is running.
     */
    readonly isRunning: boolean;
    /**
     * Returned HTTP status code of the action after its last execution.
     *
     * It's `undefined` before the action is first called.
     */
    readonly status?: number;
    /**
     * When calling an action through a `<form>`, this property contains the previously submitted `FormData`.
     *
     * This is useful to keep the filled form data even after a full page reload.
     *
     * It's `undefined` before the action is first called.
     */
    readonly formData: FormData | undefined;
    /**
     * Returned succesful data of the action. This reactive property will contain the data returned inside the `action$` function.
     *
     * It's `undefined` before the action is first called.
     */
    readonly value: GetValueReturn<RETURN> | undefined;
    /**
     * Method to execute the action programatically from the browser. Ie, instead of using a `<form>`, a 'click' handle can call the `run()` method of the action
     * in order to execute the action in the server.
     */
    readonly run: QRL<OPTIONAL extends true ? (form?: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>> : (form: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>>>;
}

declare type AnchorAttributes = QwikIntrinsicElements['a'];

/**
 * @alpha
 */
declare interface CommonLoaderActionOptions {
    readonly id?: string;
    readonly validation?: DataValidator[];
}

/**
 * @deprecated Please use `RouterOutlet` instead.
 * @alpha
 */
export declare const Content: Component<    {}>;

/**
 * @alpha
 */
export declare interface ContentHeading {
    readonly text: string;
    readonly id: string;
    readonly level: number;
}

/**
 * @alpha
 */
export declare interface ContentMenu {
    readonly text: string;
    readonly href?: string;
    readonly items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

/**
 * @alpha
 */
declare interface ContentState {
    readonly headings: ContentHeading[] | undefined;
    readonly menu: ContentMenu | undefined;
}

export { Cookie }

/**
 * @alpha
 */
declare interface Cookie_2 {
    /**
     * Gets a `Request` cookie header value by name.
     */
    get(name: string): CookieValue_2 | null;
    /**
     * Gets all `Request` cookie headers.
     */
    getAll(): Record<string, CookieValue_2>;
    /**
     * Checks if the `Request` cookie header name exists.
     */
    has(name: string): boolean;
    /**
     * Sets a `Response` cookie header using the `Set-Cookie` header.
     */
    set(name: string, value: string | number | Record<string, any>, options?: CookieOptions_2): void;
    /**
     * Deletes cookie value by name using the `Response` cookie header.
     */
    delete(name: string, options?: Pick<CookieOptions_2, 'path' | 'domain'>): void;
    /**
     * Returns an array of all the set `Response` `Set-Cookie` header values.
     */
    headers(): string[];
}

export { CookieOptions }

/**
 * @alpha
 */
/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 * @alpha
 */
declare interface CookieOptions_2 {
    /**
     * Defines the host to which the cookie will be sent. If omitted, this attribute defaults
     * to the host of the current document URL, not including subdomains.
     */
    domain?: string;
    /**
     * Indicates the maximum lifetime of the cookie as an HTTP-date timestamp.
     * If both `expires` and `maxAge` are set, `maxAge` has precedence.
     */
    expires?: Date | string;
    /**
     * Forbids JavaScript from accessing the cookie, for example, through the `document.cookie` property.
     */
    httpOnly?: boolean;
    /**
     * Indicates the number of seconds until the cookie expires. A zero or negative number will
     * expire the cookie immediately. If both `expires` and `maxAge` are set, `maxAge` has precedence.
     * You can also use the array syntax to set the max-age using minutes, hours, days or weeks.
     * For example, `{ maxAge: [3, "days"] }` would set the cookie to expire in 3 days.
     */
    maxAge?: number | [number, 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks'];
    /**
     * Indicates the path that must exist in the requested URL for the browser to send the Cookie header.
     */
    path?: string;
    /**
     * Controls whether or not a cookie is sent with cross-site requests, providing some protection
     * against cross-site request forgery attacks (CSRF).
     */
    sameSite?: 'strict' | 'lax' | 'none';
    /**
     * Indicates that the cookie is sent to the server only when a request is made with
     * the `https:` scheme (except on localhost)
     */
    secure?: boolean;
}

export { CookieValue }

/**
 * @alpha
 */
declare interface CookieValue_2 {
    value: string;
    json: <T = unknown>() => T;
    number: () => number;
}

/**
 * @alpha
 */
declare interface DataValidator {
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn>;
}

export { DeferReturn }

/**
 * @alpha
 */
declare type DeferReturn_2<T> = () => Promise<T>;

/**
 * @alpha
 */
export declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/**
 * @alpha
 */
export declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue;
}

/**
 * @alpha
 */
export declare interface DocumentHeadValue {
    /**
     * Sets `document.title`.
     */
    readonly title?: string;
    /**
     * Used to manually set meta tags in the head. Additionally, the `data`
     * property could be used to set arbitrary data which the `<head>` component
     * could later use to generate `<meta>` tags.
     */
    readonly meta?: readonly DocumentMeta[];
    /**
     * Used to manually append `<link>` elements to the `<head>`.
     */
    readonly links?: readonly DocumentLink[];
    /**
     * Used to manually append `<style>` elements to the `<head>`.
     */
    readonly styles?: readonly DocumentStyle[];
    /**
     * Arbitrary object containing custom data. When the document head is created from
     * markdown files, the frontmatter attributes that are not recognized as a well-known
     * meta names (such as title, description, author, etc...), are stored in this property.
     */
    readonly frontmatter?: Readonly<Record<string, any>>;
}

/**
 * @alpha
 */
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

/**
 * @alpha
 */
export declare interface DocumentMeta {
    readonly content?: string;
    readonly httpEquiv?: string;
    readonly name?: string;
    readonly property?: string;
    readonly key?: string;
    readonly itemprop?: string;
}

/**
 * @alpha
 */
export declare interface DocumentStyle {
    readonly style: string;
    readonly props?: Readonly<{
        [propName: string]: string;
    }>;
    readonly key?: string;
}

/**
 * @alpha
 * @deprecated Please use `RequestHandler` instead.
 */
export declare type EndpointHandler<BODY = unknown> = RequestHandler<BODY>;

declare type EndpointModuleLoader = () => Promise<RouteModule>;

declare interface EnvGetter {
    get(key: string): string | undefined;
}

declare class ErrorResponse extends Error {
    status: number;
    constructor(status: number, message?: string);
}

declare type F<T> = T extends FailReturn<any> ? T : never;

/**
 * @alpha
 */
export declare type FailReturn<T> = T & {
    failed: true;
};

/**
 * @alpha
 */
export declare const Form: <O, I>({ action, spaReset, reloadDocument, onSubmit$, ...rest }: FormProps<O, I>) => JSXNode<"form">;

/**
 * @alpha
 */
export declare interface FormProps<O, I> extends Omit<QwikJSX.IntrinsicElements['form'], 'action' | 'method'> {
    /**
     * Reference to the action returned by `action()`.
     */
    action: ActionStore<O, I, true | false>;
    /**
     * When `true` the form submission will cause a full page reload, even if SPA mode is enabled and JS is available.
     */
    reloadDocument?: boolean;
    /**
     * When `true` all the form inputs will be reset in SPA mode, just like happens in a full page form submission.
     *
     * Defaults to `false`
     */
    spaReset?: boolean;
    /**
     * Event handler executed right when the form is submitted.
     */
    onSubmit$?: (event: Event, form: HTMLFormElement) => ValueOrPromise<void>;
    /**
     * Event handler executed right after the action is executed sucesfully and returns some data.
     */
    onSubmitCompleted$?: (event: CustomEvent<FormSubmitSuccessDetail<O>>, form: HTMLFormElement) => ValueOrPromise<void>;
}

/**
 * @alpha
 */
export declare interface FormSubmitSuccessDetail<T> {
    status: number;
    value: T;
}

declare type GetValidatorType<B extends TypedDataValidator> = B extends TypedDataValidator<infer TYPE> ? z.infer<TYPE> : never;

declare type GetValueReturn<T> = (V<T> & Record<keyof F<T>, undefined>) | (F<T> & Record<keyof V<T>, undefined>);

/**
 * @alpha
 */
export declare const globalAction$: ActionConstructor;

/**
 * @alpha
 */
export declare const globalActionQrl: <B, A>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<B>>, ...rest: (CommonLoaderActionOptions | DataValidator)[]) => Action<B, A, true>;

/**
 * @alpha
 * @deprecated - The "Html" component has been renamed to "QwikCityProvider".
 */
export declare const Html: Component<QwikCityProps>;

/**
 * @alpha
 */
declare type JSONObject = {
    [x: string]: JSONValue;
};

/**
 * @alpha
 */
declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;

declare interface LayoutModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
}

/**
 * @alpha
 */
export declare const Link: Component<LinkProps>;

/**
 * @alpha
 */
export declare interface LinkProps extends AnchorAttributes {
    prefetch?: boolean;
    reload?: boolean;
}

/**
 * @alpha
 * @deprecated - use `routeLoader$()` instead
 */
export declare const loader$: <RETURN>(first: (event: RequestEventLoader_2) => RETURN, ...rest: (DataValidator | CommonLoaderActionOptions)[]) => Loader<RETURN>;

/**
 * @alpha
 */
export declare interface Loader<RETURN> {
    /**
     * Returns the `Signal` containing the data returned by the `loader$` function.
     * Like all `use-` functions and methods, it can only be invoked within a `component$()`.
     */
    (): LoaderSignal<RETURN>;
    /**
     * @deprecated - call as a function instead
     */
    use(): LoaderSignal<RETURN>;
}

/**
 * @alpha
 * @deprecated - use `routeLoader$()` instead
 */
export declare const loaderQrl: <RETURN>(loaderQrl: QRL<(event: RequestEventLoader_2) => RETURN>, ...rest: (CommonLoaderActionOptions | DataValidator)[]) => Loader<RETURN>;

/**
 * @alpha
 */
export declare type LoaderSignal<T> = Awaited<T> extends () => ValueOrPromise<infer B> ? Readonly<Signal<ValueOrPromise<B>>> : Readonly<Signal<Awaited<T>>>;

/**
 * @alpha
 */
export declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/**
 * @alpha
 */
export declare interface PageModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/**
 * @alpha
 */
export declare type PathParams = Record<string, string>;

/**
 * @alpha
 * @deprecated - The "QwikCity" component has been renamed to "QwikCityProvider".
 */
export declare const QwikCity: Component<QwikCityProps>;

/**
 * @alpha
 */
declare interface QwikCityMockProps {
    url?: string;
    params?: Record<string, string>;
}

/**
 * @alpha
 */
export declare const QwikCityMockProvider: Component<QwikCityMockProps>;

/**
 * @alpha
 */
export declare interface QwikCityPlan {
    readonly routes: RouteData[];
    readonly serverPlugins?: RouteModule[];
    readonly basePathname?: string;
    readonly menus?: MenuData[];
    readonly trailingSlash?: boolean;
    readonly cacheModules?: boolean;
}

/**
 * @alpha
 */
declare interface QwikCityProps {
    /**
     * The QwikCity component must have only two direct children: `<head>` and `<body>`, like the following example:
     *
     * ```tsx
     * <QwikCityProvider>
     *   <head>
     *     <meta charSet="utf-8" />
     *   </head>
     *   <body lang="en"></body>
     * </QwikCityProvider>
     * ```
     */
    children?: [JSXNode, JSXNode];
}

/**
 * @alpha
 */
export declare const QwikCityProvider: Component<QwikCityProps>;

declare type RedirectCode = 301 | 302 | 303 | 307 | 308;

declare class RedirectMessage extends AbortMessage {
}

export { RequestEvent }

export { RequestEventAction }

/**
 * @alpha
 */
declare interface RequestEventAction_2<PLATFORM = QwikCityPlatform> extends RequestEventCommon_2<PLATFORM> {
    fail: <T extends Record<string, any>>(status: number, returnData: T) => FailReturn_2<T>;
}

export { RequestEventCommon }

/**
 * @alpha
 */
declare interface RequestEventCommon_2<PLATFORM = QwikCityPlatform> {
    /**
     * HTTP response status code. Sets the status code when called with an
     * argument. Always returns the status code, so calling `status()` without
     * an argument will can be used to return the current status code.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    readonly status: (statusCode?: number) => number;
    /**
     * Which locale the content is in.
     *
     * The locale value can be retrieved from selected methods using `getLocale()`:
     */
    readonly locale: (local?: string) => string;
    /**
     * URL to redirect to. When called, the response will immediately
     * end with the correct redirect status and headers.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
     */
    readonly redirect: (statusCode: RedirectCode, url: string) => RedirectMessage;
    /**
     * When called, the response will immediately end with the given
     * status code. This could be useful to end a response with `404`,
     * and use the 404 handler in the routes directory.
     * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     * for which status code should be used.
     */
    readonly error: (statusCode: number, message: string) => ErrorResponse;
    /**
     * Convenience method to send an text body response. The response will be automatically
     * set the `Content-Type` header to`text/plain; charset=utf-8`.
     *  An `text()` response can only be called once.
     */
    readonly text: (statusCode: number, text: string) => AbortMessage;
    /**
     * Convenience method to send an HTML body response. The response will be automatically
     * set the `Content-Type` header to`text/html; charset=utf-8`.
     *  An `html()` response can only be called once.
     */
    readonly html: (statusCode: number, html: string) => AbortMessage;
    /**
     * Convenience method to JSON stringify the data and send it in the response.
     * The response will be automatically set the `Content-Type` header to
     * `application/json; charset=utf-8`. A `json()` response can only be called once.
     */
    readonly json: (statusCode: number, data: any) => AbortMessage;
    /**
     * Send a body response. The `Content-Type` response header is not automatically set
     * when using `send()` and must be set manually. A `send()` response can only be called once.
     */
    readonly send: SendMethod;
    readonly exit: () => AbortMessage;
    /**
     * HTTP response headers.
     *
     * https://developer.mozilla.org/en-US/docs/Glossary/Response_header
     */
    readonly headers: Headers;
    /**
     * HTTP request and response cookie. Use the `get()` method to retrieve a request cookie value.
     * Use the `set()` method to set a response cookie value.
     */
    readonly cookie: Cookie_2;
    /**
     * HTTP request method.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
     */
    readonly method: string;
    /**
     * URL pathname. Does not include the protocol, domain, query string (search params) or hash.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
     */
    readonly pathname: string;
    /**
     * URL path params which have been parsed from the current url pathname segments.
     * Use `query` to instead retrieve the query string search params.
     */
    readonly params: Readonly<Record<string, string>>;
    /**
     * URL Query Strings (URL Search Params).
     * Use `params` to instead retrieve the route params found in the url pathname.
     */
    readonly query: URLSearchParams;
    /**
     * HTTP request URL.
     */
    readonly url: URL;
    /**
     * The base pathname of the request, which can be configured at build time.
     * Defaults to `/`.
     */
    readonly basePathname: string;
    /**
     * HTTP request information.
     */
    readonly request: Request;
    /**
     * Platform specific data and functions
     */
    readonly platform: PLATFORM;
    /**
     * Platform provided environment variables.
     */
    readonly env: EnvGetter;
    /**
     * Shared Map across all the request handlers. Every HTTP request will get a new instance of
     * the shared map. The shared map is useful for sharing data between request handlers.
     */
    readonly sharedMap: Map<string, any>;
    /**
     * This method will check the request headers for a `Content-Type` header and parse the body accordingly.
     * It supports `application/json`, `application/x-www-form-urlencoded`, and `multipart/form-data` content types.
     *
     * If the `Content-Type` header is not set, it will return `null`.
     */
    readonly parseBody: () => Promise<unknown>;
}

export { RequestEventLoader }

/**
 * @alpha
 */
declare interface RequestEventLoader_2<PLATFORM = QwikCityPlatform> extends RequestEventAction_2<PLATFORM> {
    resolveValue: ResolveValue;
    defer: <T>(returnData: Promise<T> | (() => Promise<T>)) => DeferReturn_2<T>;
}

export { RequestHandler }

/**
 * @alpha
 */
export declare type ResolvedDocumentHead = Required<DocumentHeadValue>;

/**
 * @alpha
 */
declare interface ResolveValue {
    <T>(loader: Loader_2<T>): Awaited<T> extends () => any ? never : Promise<T>;
    <T>(action: Action_2<T>): Promise<T | undefined>;
}

/**
 * @alpha
 */
export declare const routeAction$: ActionConstructor;

/**
 * @alpha
 */
export declare const routeActionQrl: <B>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<B>>, ...rest: (CommonLoaderActionOptions | DataValidator)[]) => ActionInternal;

/**
 * @alpha
 */
export declare type RouteData = [pattern: RegExp, loaders: ModuleLoader[]] | [pattern: RegExp, loaders: ModuleLoader[], paramNames: string[]] | [
pattern: RegExp,
loaders: ModuleLoader[],
paramNames: string[],
originalPathname: string,
routeBundleNames: string[]
];

/**
 * @alpha
 */
export declare const routeLoader$: <RETURN>(first: (event: RequestEventLoader_2) => RETURN, ...rest: (DataValidator | CommonLoaderActionOptions)[]) => Loader<RETURN>;

/**
 * @alpha
 */
export declare const routeLoaderQrl: <RETURN>(loaderQrl: QRL<(event: RequestEventLoader_2) => RETURN>, ...rest: (CommonLoaderActionOptions | DataValidator)[]) => Loader<RETURN>;

/**
 * @alpha
 */
export declare interface RouteLocation {
    readonly params: Readonly<Record<string, string>>;
    readonly url: URL;
    /**
     * @deprecated Please use `url` instead of href
     */
    readonly href: string;
    /**
     * @deprecated Please use `url` instead of pathname
     */
    readonly pathname: string;
    /**
     * @deprecated Please use `url` instead of query
     */
    readonly query: URLSearchParams;
    readonly isNavigating: boolean;
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

/**
 * @alpha
 */
export declare type RouteNavigate = QRL<(path?: string, forceReload?: boolean) => Promise<void>>;

/**
 * @alpha
 * @deprecated Please update to `PathParams` instead
 */
export declare type RouteParams = Record<string, string>;

/**
 * @alpha
 */
export declare const RouterOutlet: Component<    {}>;

/**
 * @alpha
 */
declare interface SendMethod {
    (statusCode: number, data: any): AbortMessage;
    (response: Response): AbortMessage;
}

/**
 * @alpha
 */
export declare const server$: Server;

declare interface Server {
    <T extends ServerFunction>(fn: T): QRL<T>;
}

declare interface ServerFunction {
    (this: RequestEvent, ...args: any[]): any;
}

/**
 * @alpha
 */
export declare const serverQrl: <T extends (...args: any[]) => any>(qrl: QRL<T>) => QRL<T>;

/**
 * @alpha
 */
export declare const ServiceWorkerRegister: (props: {
    nonce?: string;
}) => JSXNode<"script">;

/**
 * @alpha
 */
export declare interface StaticGenerate {
    params?: PathParams[];
}

/**
 * @alpha
 */
export declare type StaticGenerateHandler = () => Promise<StaticGenerate> | StaticGenerate;

/**
 * @alpha
 */
declare interface TypedDataValidator<T extends z.ZodType = any> {
    __zod: z.ZodSchema<T>;
    validate(ev: RequestEvent, data: unknown): Promise<z.SafeParseReturnType<T, T>>;
}

/**
 * @alpha
 */
export declare const useContent: () => ContentState;

/**
 * @alpha
 */
export declare const useDocumentHead: () => Required<ResolvedDocumentHead>;

/**
 * @alpha
 */
export declare const useLocation: () => RouteLocation;

/**
 * @alpha
 */
export declare const useNavigate: () => RouteNavigate;

/**
 * @alpha
 */
declare type V<T> = T extends FailReturn<any> ? never : T;

declare type ValidatorFromShape<T extends z.ZodRawShape> = TypedDataValidator<z.ZodObject<T>>;

/**
 * @alpha
 */
declare interface ValidatorInternal {
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn>;
}

declare interface ValidatorReturn {
    success: boolean;
    status?: number;
    data?: any;
    error?: any;
}

export { z }

/**
 * @alpha
 */
export declare const zod$: Zod;

/**
 * @alpha
 */
export declare interface Zod {
    <T extends z.ZodRawShape>(schema: T): ValidatorFromShape<T>;
    <T extends z.ZodRawShape>(schema: (z: z) => T): ValidatorFromShape<T>;
    <T extends z.Schema>(schema: T): TypedDataValidator<T>;
    <T extends z.Schema>(schema: (z: z) => T): TypedDataValidator<T>;
}

/**
 * @alpha
 */
export declare const zodQrl: (qrl: QRL<z.ZodType<any, z.ZodTypeDef, any> | z.ZodRawShape | ((z: z) => z.ZodRawShape)>) => ValidatorInternal;

export { }
