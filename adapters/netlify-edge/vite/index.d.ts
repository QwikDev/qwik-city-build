import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @alpha
 * @deprecated Use `netlifyEdgeAdapter` exported from `@builder.io/qwik-city/adapters/netlify-edge/vite` instead.
 */
export declare const netifyEdgeAdapter: typeof netlifyEdgeAdapter;

/**
 * @alpha
 * @deprecated Use `netlifyEdgeAdapter` exported from `@builder.io/qwik-city/adapters/netlify-edge/vite` instead.
 */
export declare const netifyEdgeAdaptor: typeof netlifyEdgeAdapter;

/**
 * @alpha
 */
export declare function netlifyEdgeAdapter(opts?: NetlifyEdgeAdapterOptions): any;

/**
 * @alpha
 */
export declare interface NetlifyEdgeAdapterOptions extends ServerAdapterOptions {
    /**
     * Determines if the build should generate the edge functions declarations `manifest.json` file.
     *
     * https://docs.netlify.com/edge-functions/declarations/
     *
     * Defaults to `true`.
     */
    functionRoutes?: boolean;
    /**
     * Manually add pathnames that should be treated as static paths and not SSR.
     * For example, when these pathnames are requested, their response should
     * come from a static file, rather than a server-side rendered response.
     */
    staticPaths?: string[];
}

/**
 * @alpha
 * @deprecated Use `NetlifyEdgeAdapterOptions` instead.
 */
export declare type NetlifyEdgeAdaptorOptions = NetlifyEdgeAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
