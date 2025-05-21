import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/** @public */
export declare function cloudflarePagesAdapter(opts?: CloudflarePagesAdapterOptions): any;

/** @public */
export declare interface CloudflarePagesAdapterOptions extends ServerAdapterOptions {
    /**
     * Determines if the build should generate the function invocation routes `_routes.json` file.
     *
     * https://developers.cloudflare.com/pages/platform/functions/routing/#functions-invocation-routes
     *
     * Defaults to `true`.
     */
    functionRoutes?: boolean;
    /**
     * Manually add pathnames that should be treated as static paths and not SSR. For example, when
     * these pathnames are requested, their response should come from a static file, rather than a
     * server-side rendered response.
     */
    staticPaths?: string[];
}

export { StaticGenerateRenderOptions }

export { }
