/// <reference types="node" />

import type { ClientConn } from '@builder.io/qwik-city/middleware/request-handler';
import type { Http2ServerRequest } from 'node:http2';
import type { IncomingMessage } from 'node:http';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerResponse } from 'node:http';

/** @public */
export declare function createQwikCity(opts: QwikCityNodeRequestOptions): {
    router: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse, next: (e: any) => void) => Promise<void>;
    staticFile: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse, next: (e?: any) => void) => Promise<void>;
};

/** @public */
export declare interface NodeRequestNextFunction {
    (err?: any): void;
}

/** @public */
export declare interface PlatformNode {
    ssr?: true;
    incomingMessage?: IncomingMessage | Http2ServerRequest;
    node?: string;
}

/** @public */
export declare interface QwikCityNodeRequestOptions extends ServerRenderOptions {
    /** Options for serving static files */
    static?: {
        /** The root folder for statics files. Defaults to /dist */
        root?: string;
        /** Set the Cache-Control header for all static files */
        cacheControl?: string;
    };
    /**
     * Provide a function that computes the origin of the server, used to resolve relative URLs and
     * validate the request origin against CSRF attacks.
     *
     * When not specified, it defaults to the `ORIGIN` environment variable (if set).
     *
     * If `ORIGIN` is not set, it's derived from the incoming request, which is not recommended for
     * production use. You can specify the `PROTOCOL_HEADER`, `HOST_HEADER` to `X-Forwarded-Proto` and
     * `X-Forwarded-Host` respectively to override the default behavior.
     */
    getOrigin?: (req: IncomingMessage | Http2ServerRequest) => string | null;
    /** Provide a function that returns a `ClientConn` for the given request. */
    getClientConn?: (req: IncomingMessage | Http2ServerRequest) => ClientConn;
    /** @deprecated Use `getOrigin` instead. */
    origin?: string;
}

export { }
