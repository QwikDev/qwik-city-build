import type { Context } from '@netlify/edge-functions';
import type { ServerRenderOptions } from '@qwik.dev/city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityNetlifyOptions): (request: Request, context: Context) => Promise<Response>;

/** @public */
export declare interface PlatformNetlify extends Partial<Omit<Context, 'next' | 'cookies'>> {
}

/** @public */
export declare interface QwikCityNetlifyOptions extends ServerRenderOptions {
}

export { }
