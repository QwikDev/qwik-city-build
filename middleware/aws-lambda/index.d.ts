/// <reference types="node" />

import type { EnvGetter } from '@builder.io/qwik-city/middleware/request-handler';
import { Http2ServerRequest } from 'http2';
import { IncomingMessage } from 'http';
import { NodeRequestNextFunction } from '@builder.io/qwik-city/middleware/node';
import type { QwikIntrinsicElements } from '@builder.io/qwik';
import type { QwikManifest } from '@builder.io/qwik/optimizer';
import type { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolvedManifest } from '@builder.io/qwik/optimizer';
import type { ResolveSyncValue } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { ServerResponse } from 'http';
import type { SnapshotResult } from '@builder.io/qwik';
import type { StreamWriter } from '@builder.io/qwik';
import type { SymbolMapperFn } from '@builder.io/qwik/optimizer';

declare interface AwsOpt {
    render: Render;
    manifest: QwikManifest;
    qwikCityPlan: QwikCityPlan;
}

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

declare type ContentModuleLoader = () => Promise<ContentModule>;

/** @public */
export declare function createQwikCity(opts: AwsOpt): {
    fixPath: (pathT: string) => string;
    router: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse<IncomingMessage>, next: NodeRequestNextFunction) => Promise<void>;
    staticFile: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse<IncomingMessage>, next: (e?: any) => void) => Promise<void>;
    notFound: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse<IncomingMessage>, next: (e: any) => void) => Promise<void>;
    handle: (req: any, res: any) => void;
};

/** @public */
declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/** @public */
declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue;
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

declare type EndpointModuleLoader = () => Promise<RouteModule>;

/** @public */
declare interface InOrderAuto {
    strategy: 'auto';
    maximumInitialChunk?: number;
    maximumChunk?: number;
}

/** @public */
declare interface InOrderDirect {
    strategy: 'direct';
}

/** @public */
declare interface InOrderDisabled {
    strategy: 'disabled';
}

/** @public */
declare type InOrderStreaming = InOrderAuto | InOrderDisabled | InOrderDirect;

declare interface LayoutModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
}

/** @public */
declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/** @public */
declare interface PageModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/** @public */
declare type PathParams = Record<string, string>;

/** @public */
export declare interface PlatformAwsLambda extends Object {
}

/** @public */
declare interface PrefetchImplementation {
    /**
     * `js-append`: Use JS runtime to create each `<link>` and append to the body.
     *
     * `html-append`: Render each `<link>` within html, appended at the end of the body.
     */
    linkInsert?: 'js-append' | 'html-append' | null;
    /**
     * Value of the `<link rel="...">` attribute when link is used. Defaults to `prefetch` if links
     * are inserted.
     */
    linkRel?: 'prefetch' | 'preload' | 'modulepreload' | null;
    /**
     * Value of the `<link fetchpriority="...">` attribute when link is used. Defaults to `null` if
     * links are inserted.
     */
    linkFetchPriority?: 'auto' | 'low' | 'high' | null;
    /**
     * `always`: Always include the worker fetch JS runtime.
     *
     * `no-link-support`: Only include the worker fetch JS runtime when the browser doesn't support
     * `<link>` prefetch/preload/modulepreload.
     */
    workerFetchInsert?: 'always' | 'no-link-support' | null;
    /**
     * Dispatch a `qprefetch` event with detail data containing the bundles that should be prefetched.
     * The event dispatch script will be inlined into the document's HTML so any listeners of this
     * event should already be ready to handle the event.
     *
     * This implementation will inject a script similar to:
     *
     * ```
     * <script type="module">
     *   document.dispatchEvent(new CustomEvent("qprefetch", { detail:{ "bundles": [...] } }))
     * </script>
     * ```
     *
     * By default, the `prefetchEvent` implementation will be set to `always`.
     */
    prefetchEvent?: 'always' | null;
}

/** @public */
declare interface PrefetchResource {
    url: string;
    imports: PrefetchResource[];
}

/** @public */
declare interface PrefetchStrategy {
    implementation?: PrefetchImplementation;
    symbolsToPrefetch?: SymbolsToPrefetch;
}

/** @public */
export declare interface QwikCityAwsLambdaOptions extends ServerRenderOptions {
}

/** @public */
declare interface QwikCityPlan {
    readonly routes: RouteData[];
    readonly serverPlugins?: RouteModule[];
    readonly basePathname?: string;
    readonly menus?: MenuData[];
    readonly trailingSlash?: boolean;
    readonly cacheModules?: boolean;
}

/** @public */
declare interface QwikLoaderOptions {
    include?: 'always' | 'never' | 'auto';
    position?: 'top' | 'bottom';
}

/**
 * Options which determine how the Qwik Prefetch Service Worker is added to the document.
 *
 * Qwik Prefetch Service Worker is used to prefetch resources so that the QwikLoader will always
 * have a cache hit. This will ensure that there will not be any delays for the end user while
 * interacting with the application.
 *
 * @public
 */
declare interface QwikPrefetchServiceWorkerOptions {
    /**
     * Should the Qwik Prefetch Service Worker be added to the container. Defaults to `false` until
     * the QwikCity Service Worker is deprecated.
     */
    include?: boolean;
    /**
     * Where should the Qwik Prefetch Service Worker be added to the container. Defaults to `top` to
     * get prefetching going as fast as possible.
     */
    position?: 'top' | 'bottom';
}

/** @public */
declare type Render = RenderToString | RenderToStream;

/** @public */
declare interface RenderOptions extends SerializeDocumentOptions {
    /** Defaults to `true` */
    snapshot?: boolean;
    /**
     * Specifies the root of the JS files of the client build. Setting a base, will cause the render
     * of the `q:base` attribute in the `q:container` element.
     */
    base?: string | ((options: RenderOptions) => string);
    /** Language to use when rendering the document. */
    locale?: string | ((options: RenderOptions) => string);
    /**
     * Specifies if the Qwik Loader script is added to the document or not.
     *
     * Defaults to `{ include: true }`.
     */
    qwikLoader?: QwikLoaderOptions;
    /**
     * Specifies if the Qwik Prefetch Service Worker script is added to the document or not.
     *
     * Defaults to `{ include: false }`. NOTE: This may be change in the future.
     */
    qwikPrefetchServiceWorker?: QwikPrefetchServiceWorkerOptions;
    prefetchStrategy?: PrefetchStrategy | null;
    /**
     * When set, the app is serialized into a fragment. And the returned html is not a complete
     * document. Defaults to `html`
     */
    containerTagName?: string;
    containerAttributes?: Record<string, string>;
    serverData?: Record<string, any>;
}

/** @public */
declare interface RenderResult {
    prefetchResources: PrefetchResource[];
    snapshotResult: SnapshotResult | undefined;
    isStatic: boolean;
    manifest?: QwikManifest;
    /** @internal TODO: Move to snapshotResult */
    _symbols?: string[];
}

/** @public */
declare type RenderToStream = (opts: RenderToStreamOptions) => Promise<RenderToStreamResult>;

/** @public */
declare interface RenderToStreamOptions extends RenderOptions {
    stream: StreamWriter;
    streaming?: StreamingOptions;
}

/** @public */
declare interface RenderToStreamResult extends RenderResult {
    flushes: number;
    size: number;
    timing: {
        firstFlush: number;
        render: number;
        snapshot: number;
    };
}

/** @public */
declare type RenderToString = (opts: RenderToStringOptions) => Promise<RenderToStringResult>;

/** @public */
declare interface RenderToStringOptions extends RenderOptions {
}

/** @public */
declare interface RenderToStringResult extends RenderResult {
    html: string;
    timing: {
        firstFlush: number;
        render: number;
        snapshot: number;
    };
}

/** @public */
declare type ResolvedDocumentHead<FrontMatter extends Record<string, any> = Record<string, unknown>> = Required<DocumentHeadValue<FrontMatter>>;

/** @public */
declare type RouteData = [routeName: string, loaders: ModuleLoader[]] | [
routeName: string,
loaders: ModuleLoader[],
originalPathname: string,
routeBundleNames: string[]
];

/** @public */
declare interface RouteLocation {
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
declare interface SerializeDocumentOptions {
    manifest?: QwikManifest | ResolvedManifest;
    symbolMapper?: SymbolMapperFn;
    debug?: boolean;
}

/** @public */
declare interface StaticGenerate {
    params?: PathParams[];
}

/** @public */
declare type StaticGenerateHandler = ({ env, }: {
    env: EnvGetter;
}) => Promise<StaticGenerate> | StaticGenerate;

/** @public */
declare interface StreamingOptions {
    inOrder?: InOrderStreaming;
}

/**
 * Auto: Prefetch all possible QRLs used by the document. Default
 *
 * @public
 */
declare type SymbolsToPrefetch = 'auto' | ((opts: {
    manifest: QwikManifest;
}) => PrefetchResource[]);

export { }
