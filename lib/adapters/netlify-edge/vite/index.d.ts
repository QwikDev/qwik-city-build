import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/** @public */
export declare function netlifyEdgeAdapter(opts?: NetlifyEdgeAdapterOptions): any;

/** @public */
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
     * Manually add pathnames that should be treated as static paths and not SSR. For example, when
     * these pathnames are requested, their response should come from a static file, rather than a
     * server-side rendered response.
     */
    staticPaths?: string[];
    /**
     * Manually add path pattern that should be excluded from the edge function routes that are
     * created by the 'manifest.json' file.
     *
     * If not specified, the following paths are excluded by default:
     *
     * - /build/*
     * - /favicon.ico
     * - /robots.txt
     * - /mainifest.json
     * - /~partytown/*
     * - /service-worker.js
     * - /sitemap.xml
     *
     * https://docs.netlify.com/edge-functions/declarations/#declare-edge-functions-in-netlify-toml
     */
    excludedPath?: string | string[];
}

export { StaticGenerateRenderOptions }

export { }
