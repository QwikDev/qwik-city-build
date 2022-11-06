/// <reference types="node" />

import type { IncomingMessage } from 'node:http';
import type { Render } from '@builder.io/qwik/server';
import type { RenderOptions } from '@builder.io/qwik/server';
import type { RenderOptions as RenderOptions_2 } from '@builder.io/qwik';
import type { ServerResponse } from 'node:http';

/**
 * @alpha
 */
declare interface ContentHeading {
    text: string;
    id: string;
    level: number;
}

/**
 * @alpha
 */
declare interface ContentMenu {
    text: string;
    href?: string;
    items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

/**
 * @alpha
 */
declare interface Cookie {
    /**
     * Gets a `Request` cookie header value by name.
     */
    get(name: string): CookieValue | null;
    /**
     * Checks if the `Request` cookie header name exists.
     */
    has(name: string): boolean;
    /**
     * Sets a `Response` cookie header using the `Set-Cookie` header.
     */
    set(name: string, value: string | number | Record<string, any>, options?: CookieOptions): void;
    /**
     * Deletes cookie value by name using the `Response` cookie header.
     */
    delete(name: string): void;
    /**
     * Returns an array of all the set `Response` `Set-Cookie` header values.
     */
    headers(): string[];
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 * @alpha
 */
declare interface CookieOptions {
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

/**
 * @alpha
 */
declare interface CookieValue {
    value: string;
    json: <T = unknown>() => T;
    number: () => number;
}

/**
 * @alpha
 */
export declare function createQwikCity(opts: QwikCityNodeRequestOptions): {
    router: (req: IncomingMessage, res: ServerResponse, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage, res: ServerResponse, next: (e: any) => void) => Promise<void>;
};

/**
 * @alpha
 */
declare type DocumentHead<T = unknown> = DocumentHeadValue | ((props: DocumentHeadProps<GetEndpointData<T>>) => DocumentHeadValue);

/**
 * @alpha
 */
declare interface DocumentHeadProps<T = unknown> extends RouteLocation {
    data: T;
    head: ResolvedDocumentHead;
    withLocale: <T>(fn: () => T) => T;
}

/**
 * @alpha
 */
declare interface DocumentHeadValue {
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
declare interface DocumentLink {
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
declare interface DocumentMeta {
    content?: string;
    httpEquiv?: string;
    name?: string;
    property?: string;
    key?: string;
}

/**
 * @alpha
 */
declare interface DocumentStyle {
    style: string;
    props?: {
        [propName: string]: string;
    };
    key?: string;
}

declare type EndpointModuleLoader = () => Promise<RouteModule>;

declare class ErrorResponse extends Error {
    status: number;
    constructor(status: number, message?: string);
}

declare type GetEndpointData<T> = T extends RequestHandler<infer U> ? U : T;

declare interface LayoutModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
}

declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/**
 * @alpha
 */ export declare interface NodeRequestNextFunction {
    (err?: any): void;
}

declare interface PageModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/**
 * @alpha
 * @deprecated Please use `createQwikCity()` instead.
 *
 * Example:
 *
 * ```ts
 * import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
 * import qwikCityPlan from '@qwik-city-plan';
 * import render from './entry.ssr';
 *
 * const { router, notFound } = createQwikCity({ render, qwikCityPlan });
 * ```
 */
export declare function qwikCity(render: Render, opts?: RenderOptions_2): {
    router: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: (e: any) => void) => Promise<void>;
};

declare interface QwikCityHandlerOptions extends RenderOptions {
    render: Render;
    qwikCityPlan: QwikCityPlan;
}

/**
 * @alpha
 */
export declare interface QwikCityNodeRequestOptions extends QwikCityHandlerOptions {
}

/**
 * @alpha
 */
declare interface QwikCityPlan {
    routes: RouteData[];
    basePathname?: string;
    menus?: MenuData[];
    trailingSlash?: boolean;
    cacheModules?: boolean;
}

declare class RedirectResponse {
    url: string;
    status: number;
    headers: Headers;
    location: string;
    constructor(url: string, status?: number, headers?: Headers);
}

/**
 * @alpha
 */
declare interface RequestContext {
    formData(): Promise<FormData>;
    headers: Headers;
    json(): Promise<any>;
    method: string;
    text(): Promise<string>;
    url: string;
}

/**
 * @alpha
 */
declare interface RequestEvent<PLATFORM = unknown> {
    request: RequestContext;
    response: ResponseContext;
    url: URL;
    /** URL Route params which have been parsed from the current url pathname. */
    params: RouteParams;
    /** Platform specific data and functions */
    platform: PLATFORM;
    cookie: Cookie;
    next: () => Promise<void>;
    abort: () => void;
}

/**
 * @alpha
 */
declare type RequestHandler<BODY = unknown, PLATFORM = unknown> = (ev: RequestEvent<PLATFORM>) => RequestHandlerResult<BODY>;

declare type RequestHandlerBody<BODY> = BODY | string | number | boolean | undefined | null | void;

declare type RequestHandlerBodyFunction<BODY> = () => RequestHandlerBody<BODY> | Promise<RequestHandlerBody<BODY>>;

declare type RequestHandlerResult<BODY> = (RequestHandlerBody<BODY> | RequestHandlerBodyFunction<BODY>) | Promise<RequestHandlerBody<BODY> | RequestHandlerBodyFunction<BODY>>;

/**
 * @alpha
 */
declare type ResolvedDocumentHead = Required<DocumentHeadValue>;

/**
 * @alpha
 */
declare interface ResponseContext {
    /**
     * HTTP response status code.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    status: number;
    /**
     * Which locale the content is in.
     *
     * The locale value can be retrieved from selected methods using `getLocale()`:
     */
    locale: string | undefined;
    /**
     * HTTP response headers.
     *
     * https://developer.mozilla.org/en-US/docs/Glossary/Response_header
     */
    readonly headers: Headers;
    /**
     * URL to redirect to. When called, the response will immediately
     * end with the correct redirect status and headers.
     * Defaults to use the `307` response status code, but can be
     * overridden by setting the `status` argument.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
     */
    readonly redirect: (url: string, status?: number) => RedirectResponse;
    /**
     * When called, the response will immediately end with the given
     * status code. This could be useful to end a response with `404`,
     * and use the 404 handler in the routes directory.
     * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     * for which status code should be used.
     */
    readonly error: (status: number) => ErrorResponse;
}

/**
 * @alpha
 */
declare type RouteData = [pattern: RegExp, loaders: ModuleLoader[]] | [pattern: RegExp, loaders: ModuleLoader[], paramNames: string[]] | [
pattern: RegExp,
loaders: ModuleLoader[],
paramNames: string[],
originalPathname: string,
routeBundleNames: string[]
];

/**
 * @alpha
 */
declare interface RouteLocation {
    readonly params: RouteParams;
    readonly href: string;
    readonly pathname: string;
    readonly query: Record<string, string>;
}

declare interface RouteModule<BODY = unknown> {
    onDelete?: RequestHandler<BODY>;
    onGet?: RequestHandler<BODY>;
    onHead?: RequestHandler<BODY>;
    onOptions?: RequestHandler<BODY>;
    onPatch?: RequestHandler<BODY>;
    onPost?: RequestHandler<BODY>;
    onPut?: RequestHandler<BODY>;
    onRequest?: RequestHandler<BODY>;
}

/**
 * @alpha
 */
declare type RouteParams = Record<string, string>;

declare interface StaticGenerate {
    params?: RouteParams[];
}

/**
 * @alpha
 */
declare type StaticGenerateHandler = () => Promise<StaticGenerate> | StaticGenerate;

export { }
