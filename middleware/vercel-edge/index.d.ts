import type { ServerRenderOptions } from '@qwik.dev/city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityVercelEdgeOptions): (request: Request) => Promise<Response>;

/** @public */
export declare interface PlatformVercel {
}

/** @public */
export declare interface QwikCityVercelEdgeOptions extends ServerRenderOptions {
}

export { }
