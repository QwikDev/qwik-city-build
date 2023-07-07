import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

export { StaticGenerateRenderOptions }

/**
 * @public
 */
export declare function vercelServerlessAdapter(opts?: VercelServerlessAdapterOptions): any;

/**
 * @public
 */
export declare interface VercelServerlessAdapterOptions extends ServerAdapterOptions {
    /**
     * Determines if the build should auto-generate the `.vercel/output/config.json` config.
     *
     * Defaults to `true`.
     */
    outputConfig?: boolean;
    /**
     * The `entrypoint` property in the `.vc-config.json` file.
     * Indicates the initial file where code will be executed for the Serverless Function.
     *
     * Defaults to `entry.vercel-serverless.js`.
     */
    vcConfigEntryPoint?: string;
    /**
     * Specifies which "runtime" will be used to execute the Serverless Function.
     * Defaults to `nodejs18.x`.
     */
    runtime?: string;
    /**
     * Amount of memory (RAM in MB) that will be allocated to the Serverless Function.
     */
    memory?: number;
    /**
     * Maximum execution duration (in seconds) that will be allowed for the Serverless Function.
     */
    maxDuration?: number;
    /**
     * Map of additional environment variables that will be available to the Serverless Function,
     * in addition to the env vars specified in the Project Settings.
     */
    environment?: Record<string, string>[];
    /**
     * List of Vercel Regions where the Serverless Function will be deployed to.
     */
    regions?: string[];
    /**
     * True if a custom runtime has support for Lambda runtime wrappers.
     */
    supportsWrapper?: boolean;
    /**
     * When true, the Serverless Function will stream the response to the client.
     * Defaulted to true since Qwik streams its content.
     */
    supportsResponseStreaming?: boolean;
    /**
     * Manually add pathnames that should be treated as static paths and not SSR.
     * For example, when these pathnames are requested, their response should
     * come from a static file, rather than a server-side rendered response.
     */
    staticPaths?: string[];
}

export { }
