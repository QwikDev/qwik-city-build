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
    manifest?: QwikManifest;
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
    maximunInitialChunk?: number;
    maximunChunk?: number;
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

/** @public @deprecated Use `preloader` instead */
declare interface PrefetchImplementation {
    /** @deprecated No longer used. */
    linkRel?: 'prefetch' | 'preload' | 'modulepreload' | null;
    /** @deprecated No longer used. */
    linkFetchPriority?: 'auto' | 'low' | 'high' | null;
    /** @deprecated No longer used. */
    linkInsert?: 'js-append' | 'html-append' | null;
    /** @deprecated No longer used. */
    workerFetchInsert?: 'always' | 'no-link-support' | null;
    /** @deprecated No longer used. */
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
declare interface PreloaderOptions {
    /**
     * Maximum number of preload links to add during SSR. These instruct the browser to preload likely
     * bundles before the preloader script is active. This most likely includes the core and the
     * preloader script itself. Setting this to 0 will disable all preload links.
     *
     * Preload links can delay LCP, which is a Core Web Vital, but it can increase TTI, which is not a
     * Core Web Vital but more noticeable to the user.
     *
     * Defaults to `5`
     */
    ssrPreloads?: number;
    /**
     * The minimum probability for a bundle to be added as a preload link during SSR.
     *
     * Defaults to `0.7` (70% probability)
     */
    ssrPreloadProbability?: number;
    /**
     * Log preloader debug information to the console.
     *
     * Defaults to `false`
     */
    debug?: boolean;
    /**
     * Maximum number of simultaneous preload links that the preloader will maintain. If you set this
     * higher, the browser will have all JS files in memory sooner, but it will contend with other
     * resource downloads. Furthermore, if a bundle suddenly becomes more likely, it will have to wait
     * longer to be preloaded.
     *
     * Bundles that reach 100% probability (static imports of other bundles) will always be preloaded
     * immediately, no limit.
     *
     * Defaults to `25`
     */
    maxIdlePreloads?: number;
    /**
     * The minimum probability for a bundle to be added to the preload queue.
     *
     * Defaults to `0.35` (35% probability)
     */
    preloadProbability?: number;
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
 * @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts.
 * @public
 */
declare interface QwikPrefetchServiceWorkerOptions {
    /** @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts. */
    include?: boolean;
    /** @deprecated This is no longer used as the preloading happens automatically in qrl-class.ts. */
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
    preloader?: PreloaderOptions | false;
    /** @deprecated Use `preloader` instead */
    qwikPrefetchServiceWorker?: QwikPrefetchServiceWorkerOptions;
    /** @deprecated Use `preloader` instead */
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
    manifest?: Partial<QwikManifest | ResolvedManifest>;
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
