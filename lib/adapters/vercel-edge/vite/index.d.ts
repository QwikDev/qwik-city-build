import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

export { StaticGenerateRenderOptions }

/** @public */
export declare function vercelEdgeAdapter(opts?: VercelEdgeAdapterOptions): any;

/** @public */
export declare interface VercelEdgeAdapterOptions extends ServerAdapterOptions {
    /**
     * Determines if the build should auto-generate the `.vercel/output/config.json` config.
     *
     * Defaults to `true`.
     */
    outputConfig?: boolean;
    /**
     * The `entrypoint` property in the `.vc-config.json` file. Indicates the initial file where code
     * will be executed for the Edge Function.
     *
     * Defaults to `entry.vercel-edge.js`.
     */
    vcConfigEntryPoint?: string;
    /**
     * The `envVarsInUse` property in the `.vc-config.json` file. List of environment variable names
     * that will be available for the Edge Function to utilize.
     *
     * Defaults to `undefined`.
     */
    vcConfigEnvVarsInUse?: string[];
    /**
     * Manually add pathnames that should be treated as static paths and not SSR. For example, when
     * these pathnames are requested, their response should come from a static file, rather than a
     * server-side rendered response.
     */
    staticPaths?: string[];
    /**
     * Define the `target` property in the `ssr` object in the `vite.config.ts` file.
     *
     * Defaults to `webworker`.
     */
    target?: 'webworker' | 'node';
}

export { }
