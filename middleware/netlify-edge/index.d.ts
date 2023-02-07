import type { Context } from '@netlify/edge-functions';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/**
 * @alpha
 */
export declare function createQwikCity(opts: QwikCityNetlifyOptions): (request: Request, context: Context) => Promise<Response>;

/**
 * @alpha
 */
export declare interface PlatformNetlify extends Omit<Context, 'next' | 'cookies'> {
}

/**
 * @alpha
 */
export declare interface QwikCityNetlifyOptions extends ServerRenderOptions {
}

export { }
