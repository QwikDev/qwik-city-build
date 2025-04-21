import type { ClientConn } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityDenoOptions): {
    router: (request: Request, info: ServeHandlerInfo) => Promise<Response | null>;
    notFound: (request: Request) => Promise<Response>;
    staticFile: (request: Request) => Promise<Response | null>;
};

/** @public */
export declare interface NetAddr {
    transport: 'tcp' | 'udp';
    hostname: string;
    port: number;
}

/** @public */
export declare interface QwikCityDenoOptions extends ServerRenderOptions {
    /** Options for serving static files */
    static?: {
        /** The root folder for statics files. Defaults to /dist */
        root?: string;
        /** Set the Cache-Control header for all static files */
        cacheControl?: string;
    };
    getClientConn?: (request: Request, info: ServeHandlerInfo) => ClientConn;
}

/** @public */
export declare interface ServeHandlerInfo {
    remoteAddr: NetAddr;
}

export { }
