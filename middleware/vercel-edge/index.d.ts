import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/**
 * @alpha
 */
export declare function createQwikCity(opts: QwikCityVercelEdgeOptions): (request: Request) => Promise<Response>;

/**
 * @alpha
 */
export declare interface QwikCityVercelEdgeOptions extends ServerRenderOptions {
}

export { }
