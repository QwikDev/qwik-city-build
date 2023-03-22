import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/**
 * @public
 */
export declare function createQwikCity(opts: QwikCityCloudflarePagesOptions): ({ request, env, waitUntil, next }: EventPluginContext) => Promise<Response>;

/**
 * @public
 */
export declare interface EventPluginContext {
    request: Request;
    waitUntil: (promise: Promise<any>) => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    env: Record<string, any>;
}

/**
 * @public
 */
export declare interface PlatformCloudflarePages {
    env?: EventPluginContext['env'];
}

/**
 * @public
 */
export declare interface QwikCityCloudflarePagesOptions extends ServerRenderOptions {
}

export { }
