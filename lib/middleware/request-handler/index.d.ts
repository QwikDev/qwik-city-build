import type { Action } from '@builder.io/qwik-city';
import type { _deserializeData } from '@builder.io/qwik';
import type { EnvGetter as EnvGetter_2 } from '@builder.io/qwik-city/middleware/request-handler';
import type { FailReturn } from '@builder.io/qwik-city';
import type { Loader as Loader_2 } from '@builder.io/qwik-city';
import type { QwikCityPlan } from '@builder.io/qwik-city';
import type { QwikIntrinsicElements } from '@builder.io/qwik';
import type { Render } from '@builder.io/qwik/server';
import type { RenderOptions } from '@builder.io/qwik/server';
import type { RequestEvent as RequestEvent_2 } from '@builder.io/qwik-city';
import type { RequestHandler as RequestHandler_2 } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolveSyncValue as ResolveSyncValue_2 } from '@builder.io/qwik-city/middleware/request-handler';
import type { _serializeData } from '@builder.io/qwik';
import type { ValueOrPromise } from '@builder.io/qwik';
import type { _verifySerializable } from '@builder.io/qwik';

/** @public */
export declare class AbortMessage {
}

/** @public */
export declare type CacheControl = CacheControlOptions | number | 'day' | 'week' | 'month' | 'year' | 'no-cache' | 'immutable' | 'private';

/** @public */
declare interface CacheControlOptions {
    /**
     * The max-age=N response directive indicates that the response remains fresh until N seconds
     * after the response is generated. Note that max-age is not the elapsed time since the response
     * was received; it is the elapsed time since the response was generated on the origin server. So
     * if the other cache(s) — on the network route taken by the response — store the response for 100
     * seconds (indicated using the Age response header field), the browser cache would deduct 100
     * seconds from its freshness lifetime.
     */
    maxAge?: number;
    /**
     * The s-maxage response directive also indicates how long the response is fresh for (similar to
     * max-age) — but it is specific to shared caches, and they will ignore max-age when it is
     * present.
     */
    sMaxAge?: number;
    /**
     * The stale-while-revalidate response directive indicates that the cache could reuse a stale
     * response while it revalidates it to a cache.
     */
    staleWhileRevalidate?: number;
    /**
     * The stale-if-error response directive that indicates if a stale response can be used when
     * there's an error from the origin.
     */
    staleIfError?: number;
    /**
     * The no-store response directive indicates that any caches of any kind (private or shared)
     * should not store this response.
     */
    noStore?: boolean;
    /**
     * The no-cache response directive indicates that the response can be stored in caches, but the
     * response must be validated with the origin server before each reuse, even when the cache is
     * disconnected from the origin server.
     */
    noCache?: boolean;
    /**
     * The public response directive indicates that the response can be stored in a shared cache.
     * Responses for requests with Authorization header fields must not be stored in a shared cache;
     * however, the public directive will cause such responses to be stored in a shared cache.
     */
    public?: boolean;
    /**
     * The private response directive indicates that the response can be stored only in a private
     * cache (e.g. local caches in browsers). You should add the private directive for
     * user-personalized content, especially for responses received after login and for sessions
     * managed via cookies. If you forget to add private to a response with personalized content, then
     * that response can be stored in a shared cache and end up being reused for multiple users, which
     * can cause personal information to leak.
     */
    private?: boolean;
    /**
     * The immutable response directive indicates that the response will not be updated while it's
     * fresh.
     *
     * A modern best practice for static resources is to include version/hashes in their URLs, while
     * never modifying the resources — but instead, when necessary, updating the resources with newer
     * versions that have new version-numbers/hashes, so that their URLs are different. That's called
     * the cache-busting pattern.
     */
    immutable?: boolean;
}

/** @public */
declare type CacheControlTarget = 'Cache-Control' | 'CDN-Cache-Control' | 'Cloudflare-CDN-Cache-Control' | 'Vercel-CDN-Cache-Control' | '~ANY-OTHER-STRING' | (string & {});

/** @public */
export declare interface ClientConn {
    ip?: string;
    country?: string;
}

/**
 * HTTP Client Error Status Codes Status codes in the 4xx range indicate that the client's request
 * was malformed or invalid and could not be understood or processed by the server.
 */
declare type ClientErrorCode = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 499;

/** @public */
declare interface ContentHeading {
    readonly text: string;
    readonly id: string;
    readonly level: number;
}

/** @public */
declare interface ContentMenu {
    readonly text: string;
    readonly href?: string;
    readonly items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

/** @public */
export declare interface Cookie {
    /** Gets a `Request` cookie header value by name. */
    get(name: string): CookieValue | null;
    /** Gets all `Request` cookie headers. */
    getAll(): Record<string, CookieValue>;
    /** Checks if the `Request` cookie header name exists. */
    has(name: string): boolean;
    /** Sets a `Response` cookie header using the `Set-Cookie` header. */
    set(name: string, value: string | number | Record<string, any>, options?: CookieOptions): void;
    /**
     * Appends a `Response` cookie header using the `Set-Cookie` header.
     *
     * The difference between `set()` and `append()` is that if the specified header already exists,
     * `set()` will overwrite the existing value with the new one, whereas `append()` will append the
     * new value onto the end of the set of values.
     */
    append(name: string, value: string | number | Record<string, any>, options?: CookieOptions): void;
    /** Deletes cookie value by name using the `Response` cookie header. */
    delete(name: string, options?: Pick<CookieOptions, 'path' | 'domain' | 'sameSite'>): void;
    /** Returns an array of all the set `Response` `Set-Cookie` header values. */
    headers(): string[];
}

/** @public */
/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 *
 * @public
 */
export declare interface CookieOptions {
    /**
     * Defines the host to which the cookie will be sent. If omitted, this attribute defaults to the
     * host of the current document URL, not including subdomains.
     */
    domain?: string;
    /**
     * Indicates the maximum lifetime of the cookie as an HTTP-date timestamp. If both `expires` and
     * `maxAge` are set, `maxAge` has precedence.
     */
    expires?: Date | string;
    /**
     * Forbids JavaScript from accessing the cookie, for example, through the `document.cookie`
     * property.
     */
    httpOnly?: boolean;
    /**
     * Indicates the number of seconds until the cookie expires. A zero or negative number will expire
     * the cookie immediately. If both `expires` and `maxAge` are set, `maxAge` has precedence. You
     * can also use the array syntax to set the max-age using minutes, hours, days or weeks. For
     * example, `{ maxAge: [3, "days"] }` would set the cookie to expire in 3 days.
     */
    maxAge?: number | [number, 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks'];
    /**
     * Indicates the path that must exist in the requested URL for the browser to send the Cookie
     * header.
     */
    path?: string;
    /**
     * Controls whether or not a cookie is sent with cross-site requests, providing some protection
     * against cross-site request forgery attacks (CSRF).
     */
    sameSite?: 'strict' | 'lax' | 'none' | 'Strict' | 'Lax' | 'None' | boolean;
    /**
     * Indicates that the cookie is sent to the server only when a request is made with the `https:`
     * scheme (except on localhost)
     */
    secure?: boolean;
}

/** @public */
export declare interface CookieValue {
    value: string;
    json: <T = unknown>() => T;
    number: () => number;
}

/** @public */
export declare type DeferReturn<T> = () => Promise<T>;

/** @public */
declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/** @public */
declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue_2;
}

/** @public */
declare interface DocumentHeadValue<FrontMatter extends Record<string, any> = Record<string, unknown>> {
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

/** @public */
declare interface DocumentMeta {
    readonly content?: string;
    readonly httpEquiv?: string;
    readonly name?: string;
    readonly property?: string;
    readonly key?: string;
    readonly itemprop?: string;
    readonly media?: string;
}

/** @alpha */
declare interface DocumentScript {
    readonly script?: string;
    readonly props?: Readonly<QwikIntrinsicElements['script']>;
    readonly key?: string;
}

/** @public */
declare interface DocumentStyle {
    readonly style: string;
    readonly props?: Readonly<QwikIntrinsicElements['style']>;
    readonly key?: string;
}

/** @public */
export declare interface EnvGetter {
    get(key: string): string | undefined;
}

declare type ErrorCodes = ClientErrorCode | ServerErrorCode;

/** @public */
export declare function getErrorHtml(status: number, e: any): string;

/**
 * HTTP Informational Status Codes Status codes in the 1xx range indicate that the server has
 * received and is processing the request, but no response is available yet.
 */
declare type InformationalCode = 100 | 101 | 102 | 103;

declare interface LayoutModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
}

declare type LoadedRoute = [
routeName: string,
params: PathParams,
mods: (RouteModule | ContentModule)[],
menu: ContentMenu | undefined,
routeBundleNames: string[] | undefined
];

/** @public */
export declare const mergeHeadersCookies: (headers: Headers, cookies: Cookie) => Headers;

/** @public */
declare interface PageModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/** @public */
declare type PathParams = Record<string, string>;

declare interface QwikCityRun<T> {
    response: Promise<T | null>;
    requestEv: RequestEvent_2;
    completion: Promise<unknown>;
}

/** @public */
declare interface QwikSerializer {
    _deserializeData: typeof _deserializeData;
    _serializeData: typeof _serializeData;
    _verifySerializable: typeof _verifySerializable;
}

/**
 * HTTP Redirect Status Codes Status codes in the 3xx range indicate that further action must be
 * taken by the client to complete the request.
 */
declare type RedirectCode = 300 | 301 | 302 | 303 | 304 | 305 | 307 | 308;

/** @public */
export declare class RedirectMessage extends AbortMessage {
}

/** @public */
export declare interface RequestEvent<PLATFORM = QwikCityPlatform> extends RequestEventCommon<PLATFORM> {
    /** True if headers have been sent, preventing any more headers from being set. */
    readonly headersSent: boolean;
    /** True if the middleware chain has finished executing. */
    readonly exited: boolean;
    /**
     * Low-level access to write to the HTTP response stream. Once `getWritableStream()` is called,
     * the status and headers can no longer be modified and will be sent over the network.
     */
    readonly getWritableStream: () => WritableStream<Uint8Array>;
    /**
     * Invoke the next middleware function in the chain.
     *
     * NOTE: Ensure that the call to `next()` is `await`ed.
     */
    readonly next: () => Promise<void>;
}

/** @public */
export declare interface RequestEventAction<PLATFORM = QwikCityPlatform> extends RequestEventCommon<PLATFORM> {
    fail: <T extends Record<string, any>>(status: number, returnData: T) => FailReturn<T>;
}

/** @public */
export declare interface RequestEventBase<PLATFORM = QwikCityPlatform> {
    /**
     * HTTP response headers. Notice it will be empty until you first add a header. If you want to
     * read the request headers, use `request.headers` instead.
     *
     * https://developer.mozilla.org/en-US/docs/Glossary/Response_header
     */
    readonly headers: Headers;
    /**
     * HTTP request and response cookie. Use the `get()` method to retrieve a request cookie value.
     * Use the `set()` method to set a response cookie value.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
     */
    readonly cookie: Cookie;
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
     * URL path params which have been parsed from the current url pathname segments. Use `query` to
     * instead retrieve the query string search params.
     */
    readonly params: Readonly<Record<string, string>>;
    /**
     * URL Query Strings (URL Search Params). Use `params` to instead retrieve the route params found
     * in the url pathname.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
     */
    readonly query: URLSearchParams;
    /** HTTP request URL. */
    readonly url: URL;
    /** The base pathname of the request, which can be configured at build time. Defaults to `/`. */
    readonly basePathname: string;
    /** HTTP request information. */
    readonly request: Request;
    /** Platform specific data and functions */
    readonly platform: PLATFORM;
    /** Platform provided environment variables. */
    readonly env: EnvGetter;
    /**
     * Shared Map across all the request handlers. Every HTTP request will get a new instance of the
     * shared map. The shared map is useful for sharing data between request handlers.
     */
    readonly sharedMap: Map<string, any>;
    /**
     * This method will check the request headers for a `Content-Type` header and parse the body
     * accordingly. It supports `application/json`, `application/x-www-form-urlencoded`, and
     * `multipart/form-data` content types.
     *
     * If the `Content-Type` header is not set, it will return `null`.
     */
    readonly parseBody: () => Promise<unknown>;
    /**
     * Convenience method to set the Cache-Control header. Depending on your CDN, you may want to add
     * another cacheControl with the second argument set to `CDN-Cache-Control` or any other value (we
     * provide the most common values for auto-complete, but you can use any string you want).
     *
     * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control and
     * https://qwik.dev/docs/caching/#CDN-Cache-Controls for more information.
     */
    readonly cacheControl: (cacheControl: CacheControl, target?: CacheControlTarget) => void;
    /**
     * Provides information about the client connection, such as the IP address and the country the
     * request originated from.
     */
    readonly clientConn: ClientConn;
    /**
     * Request's AbortSignal (same as `request.signal`). This signal indicates that the request has
     * been aborted.
     */
    readonly signal: AbortSignal;
}

/** @public */
export declare interface RequestEventCommon<PLATFORM = QwikCityPlatform> extends RequestEventBase<PLATFORM> {
    /**
     * HTTP response status code. Sets the status code when called with an argument. Always returns
     * the status code, so calling `status()` without an argument will can be used to return the
     * current status code.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
     */
    readonly status: (statusCode?: StatusCodes) => number;
    /**
     * Which locale the content is in.
     *
     * The locale value can be retrieved from selected methods using `getLocale()`:
     */
    readonly locale: (local?: string) => string;
    /**
     * URL to redirect to. When called, the response will immediately end with the correct redirect
     * status and headers.
     *
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
     */
    readonly redirect: (statusCode: RedirectCode, url: string) => RedirectMessage;
    /**
     * When called, the response will immediately end with the given status code. This could be useful
     * to end a response with `404`, and use the 404 handler in the routes directory. See
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status for which status code should be used.
     */
    readonly error: <T = any>(statusCode: ErrorCodes, message: T) => ServerError<T>;
    /**
     * Convenience method to send an text body response. The response will be automatically set the
     * `Content-Type` header to`text/plain; charset=utf-8`. An `text()` response can only be called
     * once.
     */
    readonly text: (statusCode: StatusCodes, text: string) => AbortMessage;
    /**
     * Convenience method to send an HTML body response. The response will be automatically set the
     * `Content-Type` header to`text/html; charset=utf-8`. An `html()` response can only be called
     * once.
     */
    readonly html: (statusCode: StatusCodes, html: string) => AbortMessage;
    /**
     * Convenience method to JSON stringify the data and send it in the response. The response will be
     * automatically set the `Content-Type` header to `application/json; charset=utf-8`. A `json()`
     * response can only be called once.
     */
    readonly json: (statusCode: StatusCodes, data: any) => AbortMessage;
    /**
     * Send a body response. The `Content-Type` response header is not automatically set when using
     * `send()` and must be set manually. A `send()` response can only be called once.
     */
    readonly send: SendMethod;
    readonly exit: () => AbortMessage;
}

declare interface RequestEventInternal extends RequestEvent, RequestEventLoader {
    [RequestEvLoaders]: Record<string, ValueOrPromise<unknown> | undefined>;
    [RequestEvMode]: ServerRequestMode;
    [RequestEvTrailingSlash]: boolean;
    [RequestEvRoute]: LoadedRoute | null;
    [RequestEvQwikSerializer]: QwikSerializer;
    /**
     * Check if this request is already written to.
     *
     * @returns `true`, if `getWritableStream()` has already been called.
     */
    isDirty(): boolean;
}

/** @public */
export declare interface RequestEventLoader<PLATFORM = QwikCityPlatform> extends RequestEventAction<PLATFORM> {
    resolveValue: ResolveValue;
    defer: <T>(returnData: Promise<T> | (() => Promise<T>)) => DeferReturn<T>;
}

declare const RequestEvLoaders: unique symbol;

declare const RequestEvMode: unique symbol;

declare const RequestEvQwikSerializer: unique symbol;

declare const RequestEvRoute: unique symbol;

declare const RequestEvTrailingSlash: unique symbol;

/** @public */
export declare type RequestHandler<PLATFORM = QwikCityPlatform> = (ev: RequestEvent<PLATFORM>) => Promise<void> | void;

/**
 * The request handler for QwikCity. Called by every integration.
 *
 * @public
 */
export declare function requestHandler<T = unknown>(serverRequestEv: ServerRequestEvent<T>, opts: ServerRenderOptions, qwikSerializer: QwikSerializer): Promise<QwikCityRun<T> | null>;

/** @public */
declare type ResolvedDocumentHead<FrontMatter extends Record<string, any> = Record<string, unknown>> = Required<DocumentHeadValue<FrontMatter>>;

/** @public */
export declare interface ResolveSyncValue {
    <T>(loader: Loader_2<T>): Awaited<T> extends () => any ? never : Awaited<T>;
    <T>(action: Action<T>): Awaited<T> | undefined;
}

/** @public */
export declare interface ResolveValue {
    <T>(loader: Loader_2<T>): Awaited<T> extends () => any ? never : Promise<T>;
    <T>(action: Action<T>): Promise<T | undefined>;
}

/** @public */
declare interface RouteLocation {
    readonly params: Readonly<Record<string, string>>;
    readonly url: URL;
    readonly isNavigating: boolean;
    readonly prevUrl: URL | undefined;
}

declare interface RouteModule<BODY = unknown> {
    onDelete?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onGet?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onHead?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onOptions?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onPatch?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onPost?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onPut?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
    onRequest?: RequestHandler_2<BODY> | RequestHandler_2<BODY>[];
}

/** @public */
declare interface SendMethod {
    (statusCode: StatusCodes, data: any): AbortMessage;
    (response: Response): AbortMessage;
}

/** @public */
export declare class ServerError<T = any> extends Error {
    status: number;
    data: T;
    constructor(status: number, data: T);
}

/**
 * HTTP Server Error Status Codes Status codes in the 5xx range indicate that the server encountered
 * an error or was unable to fulfill the request due to unexpected conditions.
 */
declare type ServerErrorCode = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

/** @public */
export declare interface ServerRenderOptions extends RenderOptions {
    render: Render;
    qwikCityPlan: QwikCityPlan;
    /**
     * Protection against cross-site request forgery (CSRF) attacks.
     *
     * When `true`, for every incoming POST, PUT, PATCH, or DELETE form submissions, the request
     * origin is checked to match the server's origin.
     *
     * Be careful when disabling this option as it may lead to CSRF attacks.
     *
     * Defaults to `true`.
     */
    checkOrigin?: boolean;
}

/**
 * @public
 * Request event created by the server.
 */
export declare interface ServerRequestEvent<T = unknown> {
    mode: ServerRequestMode;
    url: URL;
    locale: string | undefined;
    platform: QwikCityPlatform;
    request: Request;
    env: EnvGetter;
    getClientConn: () => ClientConn;
    getWritableStream: ServerResponseHandler<T>;
}

/** @public */
export declare type ServerRequestMode = 'dev' | 'static' | 'server';

/** @public */
export declare type ServerResponseHandler<T = any> = (status: number, headers: Headers, cookies: Cookie, resolve: (response: T) => void, requestEv: RequestEventInternal) => WritableStream<Uint8Array>;

/** @public */
declare interface StaticGenerate {
    params?: PathParams[];
}

/** @public */
declare type StaticGenerateHandler = ({ env, }: {
    env: EnvGetter_2;
}) => Promise<StaticGenerate> | StaticGenerate;

declare type StatusCodes = InformationalCode | SuccessCode | ClientErrorCode | ServerErrorCode | RedirectCode | number;

/**
 * HTTP Success Status Codes Status codes in the 2xx range indicate that the client's request was
 * successfully received, understood, and accepted by the server.
 */
declare type SuccessCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

/**
 * TextEncoderStream polyfill based on Node.js' implementation
 * https://github.com/nodejs/node/blob/3f3226c8e363a5f06c1e6a37abd59b6b8c1923f1/lib/internal/webstreams/encoding.js#L38-L119
 * (MIT License)
 */
/** @internal */
export declare class _TextEncoderStream_polyfill {
    #private;
    get encoding(): string;
    get readable(): ReadableStream<Uint8Array>;
    get writable(): WritableStream<string>;
    get [Symbol.toStringTag](): string;
}

export { }
