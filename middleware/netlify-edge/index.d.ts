import type { Context } from '@netlify/edge-functions';
import type { RequestHandler } from '@builder.io/qwik-city';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/**
 * @alpha
 */
export declare function createQwikCity(opts: QwikCityNetlifyOptions): (request: Request, context: Context) => Promise<Response>;

/**
 * @alpha
 */
export declare interface EventPluginContext extends Context {
}

/**
 * @alpha
 */
export declare interface QwikCityNetlifyOptions extends ServerRenderOptions {
}

/**
 * @alpha
 */
export declare type RequestHandlerNetlify = RequestHandler<Omit<Context, 'next' | 'cookies'>>;

export { }
