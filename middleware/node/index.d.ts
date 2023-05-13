/// <reference types="node" />

import type { IncomingMessage } from 'node:http';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerResponse } from 'node:http';

/**
 * @public
 */
export declare function createQwikCity(opts: QwikCityNodeRequestOptions): {
    router: (req: IncomingMessage, res: ServerResponse, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage, res: ServerResponse, next: (e: any) => void) => Promise<void>;
    staticFile: (req: IncomingMessage, res: ServerResponse, next: (e?: any) => void) => Promise<void>;
};

/**
 * @public
 */ export declare interface NodeRequestNextFunction {
    (err?: any): void;
}

/**
 * @public
 */
export declare interface PlatformNode {
    ssr?: true;
    incomingMessage?: IncomingMessage;
    node?: string;
}

/**
 * @public
 */
export declare interface QwikCityNodeRequestOptions extends ServerRenderOptions {
    /** Options for serving static files */
    static?: {
        /** The root folder for statics files. Defaults to /dist */
        root?: string;
        /** Set the Cache-Control header for all static files */
        cacheControl?: string;
    };
    /**
     * Origin of the server, used to resolve relative URLs and validate the request origin against CSRF attacks.
     *
     * When not specified, it defaults to the `ORIGIN` environment variable (if set) or derived from the incoming request.
     */
    origin?: string;
}

export { }
