import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @alpha
 */
export declare function cloudflarePagesAdapter(opts?: CloudflarePagesAdapterOptions): any;

/**
 * @alpha
 */
export declare interface CloudflarePagesAdapterOptions extends ServerAdapterOptions {
    /**
     * Determines if the build should generate the function invocation routes `_routes.json` file.
     *
     * https://developers.cloudflare.com/pages/platform/functions/function-invocation-routes/
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
 * @deprecated Use `cloudflarePagesAdapter` exported from `@builder.io/qwik-city/adapters/cloudflare-pages/vite` instead.
 */
export declare const cloudflarePagesAdaptor: typeof cloudflarePagesAdapter;

/**
 * @alpha
 * @deprecated Use `CloudflarePagesAdapterOptions` instead.
 */
export declare type CloudflarePagesAdaptorOptions = CloudflarePagesAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
