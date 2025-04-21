import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityCloudflarePagesOptions): (request: PlatformCloudflarePages['request'], env: PlatformCloudflarePages['env'] & {
    ASSETS: {
        fetch: (req: Request) => Response;
    };
}, ctx: PlatformCloudflarePages['ctx']) => Promise<Response>;

/** @public */
export declare interface PlatformCloudflarePages {
    request: Request;
    env?: Record<string, any>;
    ctx: {
        waitUntil: (promise: Promise<any>) => void;
    };
}

/** @public */
export declare interface QwikCityCloudflarePagesOptions extends ServerRenderOptions {
}

export { }
