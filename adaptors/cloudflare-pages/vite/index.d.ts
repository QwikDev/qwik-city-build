import type { QwikManifest } from '@builder.io/qwik/optimizer';
import type { SymbolMapper } from '@builder.io/qwik/optimizer';
import type { SymbolMapperFn } from '@builder.io/qwik/optimizer';

/**
 * @alpha
 */
export declare function cloudflarePagesAdaptor(opts?: CloudflarePagesAdaptorOptions): any;

/**
 * @alpha
 */
export declare interface CloudflarePagesAdaptorOptions {
    staticGenerate?: StaticGenerateRenderOptions | true;
}

/**
 * `link-prefetch-html`: Render link rel=prefetch within the html
 *
 * `link-prefetch`: Use JS to add link rel=prefetch, add worker-fetch if not supported
 *
 * `link-preload-html`: Render link rel=preload within the html
 *
 * `link-preload`: Use JS to add link rel=preload, add worker-fetch if not supported
 *
 * `link-modulepreload-html`: Render link rel=modulepreload within the html
 *
 * `link-modulepreload`: Use JS to add link rel=modulepreload, add worker-fetch if not supported
 *
 * `worker-fetch`: Add worker-fetch JS
 *
 * `none`: Do not add any prefetch links
 *
 * @deprecated Use the `PrefetchImplementation` object options instead.
 * @alpha
 */
declare type DeprecatedPrefetchImplementation = 'link-prefetch-html' | 'link-prefetch' | 'link-preload-html' | 'link-preload' | 'link-modulepreload-html' | 'link-modulepreload' | 'worker-fetch' | 'none';

/**
 * @alpha
 */
declare interface PrefetchImplementation {
    /**
     * `js-append`: Use JS runtime to create each `<link>` and append to the body.
     *
     * `html-append`: Render each `<link>` within html, appended at the end of the body.
     */
    linkInsert?: 'js-append' | 'html-append' | null;
    /**
     * Value of the `<link rel="...">` attribute when link is used.
     * Defaults to `prefetch` if links are inserted.
     */
    linkRel?: 'prefetch' | 'preload' | 'modulepreload' | null;
    /**
     * `always`: Always include the worker fetch JS runtime.
     *
     * `no-link-support`: Only include the worker fetch JS runtime when the browser doesn't support `<link>` prefetch/preload/modulepreload.
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

/**
 * @alpha
 */
declare interface PrefetchResource {
    url: string;
    imports: PrefetchResource[];
}

/**
 * @alpha
 */
declare interface PrefetchStrategy {
    implementation?: PrefetchImplementation | DeprecatedPrefetchImplementation;
    symbolsToPrefetch?: SymbolsToPrefetch;
}

/**
 * @alpha
 */
declare interface QwikLoaderOptions {
    events?: string[];
    include?: 'always' | 'never' | 'auto';
    position?: 'top' | 'bottom';
}

/**
 * @alpha
 */
declare interface RenderOptions extends SerializeDocumentOptions {
    /**
     * Defaults to `true`
     */
    snapshot?: boolean;
    /**
     * Specifies the root of the JS files of the client build.
     * Setting a base, will cause the render of the `q:base` attribute in the `q:container` element.
     */
    base?: string | ((options: RenderOptions) => string);
    /**
     * Language to use when rendering the document.
     */
    locale?: string | ((options: RenderOptions) => string);
    /**
     * Specifies if the Qwik Loader script is added to the document or not. Defaults to `{ include: true }`.
     */
    qwikLoader?: QwikLoaderOptions;
    prefetchStrategy?: PrefetchStrategy | null;
    /**
     * When set, the app is serialized into a fragment. And the returned html is not a complete document.
     * Defaults to `html`
     */
    containerTagName?: string;
    containerAttributes?: Record<string, string>;
    envData?: Record<string, any>;
}

declare interface ResolvedManifest {
    mapper: SymbolMapper;
    manifest: QwikManifest;
}

/**
 * @alpha
 */
declare interface SerializeDocumentOptions {
    manifest?: QwikManifest | ResolvedManifest;
    symbolMapper?: SymbolMapperFn;
    debug?: boolean;
}

/**
 * @alpha
 */
declare interface StaticGenerateRenderOptions extends RenderOptions {
    /**
     * File system directory where the static files should be written.
     */
    outDir: string;
    /**
     * The URL `origin`, which is a combination of the scheme (protocol) and hostname (domain).
     * For example, `https://qwik.builder.io` has the protocol `https://` and domain `qwik.builder.io`.
     * However, the `origin` does not include a `pathname`.
     *
     * The `origin` is used to provide a full URL during Static Site Generation (SSG), and to
     * simulate a complete URL rather than just the `pathname`. For example, in order to
     * render a correct canonical tag URL or URLs within the `sitemap.xml`, the `origin` must
     * be provided too.
     *
     * If the site also starts with a pathname other than `/`, please use the `basePathname`
     * option in the Qwik City config options.
     */
    origin: string;
    /**
     * Maximum number of workers to use while generating the static pages.
     * Defaults to the number of CPUs available.
     */
    maxWorkers?: number;
    /**
     * Maximum number of tasks to be running at one time per worker.
     * Defaults to `20`.
     */
    maxTasksPerWorker?: number;
    /**
     * File system path to write the `sitemap.xml` to. Defaults to `sitemap.xml`
     * and written to the root of the `outDir`. Setting to `null` will prevent
     * the sitemap from being created.
     */
    sitemapOutFile?: string;
    /**
     * Log level.
     */
    log?: 'debug';
    /**
     * Set to `false` if the generated static HTML files should not be written to disk. Setting
     * to `false` is useful if the SSG should only write the `q-data.json` files to disk.
     * Defaults to `true`.
     */
    emitHtml?: boolean;
    /**
     * Set to `false` if the generated `q-data.json` data files should not be written to disk.
     * Defaults to `true`.
     */
    emitData?: boolean;
}

/**
 * auto: Prefetch all possible QRLs used by the document. Default
 *
 * @alpha
 */
declare type SymbolsToPrefetch = 'auto' | ((opts: {
    manifest: QwikManifest;
}) => PrefetchResource[]);

export { }
