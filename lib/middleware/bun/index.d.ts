import type { ClientConn } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityBunOptions): {
    router: (request: Request) => Promise<Response | null>;
    notFound: (request: Request) => Promise<Response>;
    staticFile: (request: Request) => Promise<Response | null>;
};

/** @public */
export declare interface QwikCityBunOptions extends ServerRenderOptions {
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
     * production use.
     */
    getOrigin?: (request: Request) => string | null;
    /** Provide a function that returns a `ClientConn` for the given request. */
    getClientConn?: (request: Request) => ClientConn;
}

export { }
