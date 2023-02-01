/// <reference path="./modules.d.ts" />

import { Component } from '@builder.io/qwik';
import { Cookie } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieValue } from '@builder.io/qwik-city/middleware/request-handler';
import type { FailReturn as FailReturn_2 } from '@builder.io/qwik-city';
import type { GetSyncData } from '@builder.io/qwik-city/middleware/request-handler';
import { JSXNode } from '@builder.io/qwik';
import { QRL } from '@builder.io/qwik';
import { QwikIntrinsicElements } from '@builder.io/qwik';
import { QwikJSX } from '@builder.io/qwik';
import { RequestEvent } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventCommon } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventLoader } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerAction as ServerAction_2 } from '@builder.io/qwik-city';
import type { ServerLoader as ServerLoader_2 } from '@builder.io/qwik-city';
import type { Signal } from '@builder.io/qwik';
import { ValueOrPromise } from '@builder.io/qwik';
import { z } from 'zod';

declare class AbortMessage {
}

/**
 * @alpha
 */
export declare const action$: Action;

/**
 * @alpha
 */
export declare interface Action {
    <O>(actionQrl: (form: DefaultActionType, event: RequestEventLoader) => ValueOrPromise<O>): ServerAction<O>;
    <O, B extends ZodReturn>(actionQrl: (data: GetValidatorType<B>, event: RequestEventLoader) => ValueOrPromise<O>, options: B): ServerAction<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>>, GetValidatorType<B>>;
}

/**
 * @alpha
 */
export declare type ActionOptions = z.ZodRawShape;

/**
 * @alpha
 */
export declare const actionQrl: <B, A>(actionQrl: QRL<(form: DefaultActionType, event: RequestEventLoader_2) => ValueOrPromise<B>>, options?: ZodReturn) => ServerAction<B, A>;

declare type AnchorAttributes = QwikIntrinsicElements['a'];

/**
 * @deprecated Please use `RouterOutlet` instead.
 * @alpha
 */
export declare const Content: Component<    {}>;

/**
 * @alpha
 */
export declare interface ContentHeading {
    text: string;
    id: string;
    level: number;
}

/**
 * @alpha
 */
export declare interface ContentMenu {
    text: string;
    href?: string;
    items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

declare interface ContentState {
    headings: ContentHeading[] | undefined;
    menu: ContentMenu | undefined;
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
declare type DefaultActionType = {
    [x: string]: JSONValue;
};

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
    readonly getData: GetSyncData;
}

/**
 * @alpha
 */
export declare interface DocumentHeadValue {
    /**
     * Sets `document.title`.
     */
    title?: string;
    /**
     * Used to manually set meta tags in the head. Additionally, the `data`
     * property could be used to set arbitrary data which the `<head>` component
     * could later use to generate `<meta>` tags.
     */
    meta?: DocumentMeta[];
    /**
     * Used to manually append `<link>` elements to the `<head>`.
     */
    links?: DocumentLink[];
    /**
     * Used to manually append `<style>` elements to the `<head>`.
     */
    styles?: DocumentStyle[];
    /**
     * Arbitrary object containing custom data. When the document head is created from
     * markdown files, the frontmatter attributes that are not recognized as a well-known
     * meta names (such as title, description, author, etc...), are stored in this property.
     */
    frontmatter?: Record<string, any>;
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
    content?: string;
    httpEquiv?: string;
    name?: string;
    property?: string;
    key?: string;
    itemprop?: string;
}

/**
 * @alpha
 */
export declare interface DocumentStyle {
    style: string;
    props?: {
        [propName: string]: string;
    };
    key?: string;
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

/**
 * @alpha
 */
export declare type FailReturn<T> = T & {
    __brand: 'fail';
};

/**
 * @alpha
 */
export declare const Form: <O, I>({ action, spaReset, reloadDocument, onSubmit$, ...rest }: FormProps<O, I>) => JSXNode<"form">;

/**
 * @alpha
 */
export declare interface FormProps<O, I> extends Omit<QwikJSX.IntrinsicElements['form'], 'action' | 'method'> {
    action: ServerActionUse<O, I>;
    reloadDocument?: boolean;
    spaReset?: boolean;
    onSubmit$?: (event: Event, form: HTMLFormElement) => ValueOrPromise<void>;
    onSubmitSuccess$?: (event: CustomEvent<FormSubmitSuccessDetail<O>>, form: HTMLFormElement) => ValueOrPromise<void>;
    onSubmitFail$?: (event: CustomEvent<FormSubmitFailDetail<O>>, form: HTMLFormElement) => ValueOrPromise<void>;
}

/**
 * @alpha
 */
export declare interface FormSubmitFailDetail<T> {
    status: number;
    fail: GetFailReturn<T>;
}

/**
 * @alpha
 */
export declare interface FormSubmitSuccessDetail<T> {
    status: number;
    value: GetValueReturn<T>;
}

/**
 * @alpha
 */
declare interface GetData {
    <T>(loader: ServerLoader_2<T>): Promise<T>;
    <T>(loader: ServerAction_2<T>): Promise<T | undefined>;
}

/**
 * @alpha
 */
export declare type GetFailReturn<T> = T extends FailReturn<infer I> ? I & {
    [key: string]: undefined;
} : never;

declare type GetValidatorType<B extends ZodReturn<any>> = B extends ZodReturn<infer TYPE> ? z.infer<z.ZodObject<TYPE>> : never;

/**
 * @alpha
 */
declare type GetValueReturn<T> = T extends FailReturn<{}> ? never : T;

/**
 * @alpha
 * @deprecated - The "Html" component has been renamed to "QwikCity".
 */
export declare const Html: Component<QwikCityProps>;

declare const isServerLoader: unique symbol;

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
}

/**
 * @alpha
 */
export declare const loader$: <RETURN, PLATFORM = unknown>(first: (event: RequestEventLoader_2<PLATFORM>) => RETURN) => ServerLoader<RETURN>;

/**
 * @alpha
 */
export declare const loaderQrl: <RETURN, PLATFORM = unknown>(loaderQrl: QRL<(event: RequestEventLoader_2<PLATFORM>) => RETURN>) => ServerLoader<RETURN>;

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
    routes: RouteData[];
    serverPlugins?: RouteModule[];
    basePathname?: string;
    menus?: MenuData[];
    trailingSlash?: boolean;
    cacheModules?: boolean;
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

declare class RedirectMessage extends AbortMessage {
}

export { RequestEvent }

export { RequestEventCommon }

/**
 * @alpha
 */
declare interface RequestEventCommon_2<PLATFORM = unknown> {
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
    readonly redirect: (statusCode: number, url: string) => RedirectMessage;
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
    readonly params: Record<string, string>;
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
}

export { RequestEventLoader }

/**
 * @alpha
 */
declare interface RequestEventLoader_2<PLATFORM = unknown> extends RequestEventCommon_2<PLATFORM> {
    getData: GetData;
    fail: <T extends Record<string, any>>(status: number, returnData: T) => FailReturn_2<T>;
}

export { RequestHandler }

/**
 * @alpha
 */
export declare type ResolvedDocumentHead = Required<DocumentHeadValue>;

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
export declare interface RouteLocation {
    readonly params: Record<string, string>;
    readonly href: string;
    readonly pathname: string;
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
export declare type RouteNavigate = QRL<(path?: string) => Promise<void>>;

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
export declare interface ServerAction<RETURN, INPUT = Record<string, any>> {
    readonly [isServerLoader]?: true;
    use(): ServerActionUse<RETURN, INPUT>;
}

declare type ServerActionExecute<RETURN, INPUT> = QRL<(form: FormData | INPUT | SubmitEvent) => Promise<RETURN>>;

/**
 * @alpha
 */
export declare interface ServerActionUse<RETURN, INPUT> {
    readonly id: string;
    readonly actionPath: string;
    readonly isRunning: boolean;
    readonly status?: number;
    readonly formData: FormData | undefined;
    readonly value: GetValueReturn<RETURN> | undefined;
    readonly fail: GetFailReturn<RETURN> | undefined;
    readonly run: ServerActionExecute<RETURN, INPUT>;
}

/**
 * @alpha
 */
export declare interface ServerLoader<RETURN> {
    readonly [isServerLoader]?: true;
    use(): ServerLoaderUse<RETURN>;
}

/**
 * @alpha
 */
export declare type ServerLoaderUse<T> = Awaited<T> extends () => ValueOrPromise<infer B> ? Signal<ValueOrPromise<B>> : Signal<Awaited<T>>;

/**
 * @alpha
 */
export declare const ServiceWorkerRegister: () => JSXNode<"script">;

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

export { z }

/**
 * @alpha
 */
export declare const zod$: Zod;

/**
 * @alpha
 */
export declare interface Zod {
    <T extends ActionOptions>(schema: T): ZodReturn<T>;
    <T extends ActionOptions>(schema: (z: z) => T): ZodReturn<T>;
}

/**
 * @alpha
 */
export declare const zodQrl: (qrl: QRL<z.ZodRawShape | ((z: z) => ActionOptions)>) => Promise<z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}> | undefined>;

/**
 * @alpha
 */
export declare type ZodReturn<T extends ActionOptions = any> = Promise<z.ZodObject<T>>;

export { }
