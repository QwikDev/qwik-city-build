import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @alpha
 */
export declare function netifyEdgeAdaptor(opts?: NetlifyEdgeAdaptorOptions): any;

/**
 * @alpha
 */
export declare interface NetlifyEdgeAdaptorOptions {
    /**
     * Determines if the build should generate the edge functions declarations `manifest.json` file.
     *
     * https://docs.netlify.com/edge-functions/declarations/
     *
     * Defaults to `true`.
     */
    functionRoutes?: boolean;
    /**
     * Determines if the adaptor should also run Static Site Generation (SSG).
     */
    staticGenerate?: Omit<StaticGenerateRenderOptions, 'outDir'> | true;
    /**
     * Manually add pathnames that should be treated as static paths and not SSR.
     * For example, when these pathnames are requested, their response should
     * come from a static file, rather than a server-side rendered response.
     */
    staticPaths?: string[];
}

export { StaticGenerateRenderOptions }

export { }
