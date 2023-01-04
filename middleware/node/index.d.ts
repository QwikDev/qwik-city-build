/// <reference types="node" />

import type { IncomingMessage } from 'node:http';
import type { Render } from '@builder.io/qwik/server';
import type { RenderOptions } from '@builder.io/qwik';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';
import type { ServerResponse } from 'node:http';

/**
 * @alpha
 */
export declare function createQwikCity(opts: QwikCityNodeRequestOptions): {
    router: (req: IncomingMessage, res: ServerResponse, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage, res: ServerResponse, next: (e: any) => void) => Promise<void>;
    staticFile: (req: IncomingMessage, res: ServerResponse, next: (e?: any) => void) => Promise<void>;
};

/**
 * @alpha
 */ export declare interface NodeRequestNextFunction {
    (err?: any): void;
}

/**
 * @alpha
 * @deprecated Please use `createQwikCity()` instead.
 *
 * Example:
 *
 * ```ts
 * import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
 * import qwikCityPlan from '@qwik-city-plan';
 * import render from './entry.ssr';
 *
 * const { router, notFound } = createQwikCity({ render, qwikCityPlan });
 * ```
 */
export declare function qwikCity(render: Render, opts?: RenderOptions): {
    router: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: NodeRequestNextFunction) => Promise<void>;
    notFound: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: (e: any) => void) => Promise<void>;
    staticFile: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, next: (e?: any) => void) => Promise<void>;
};

/**
 * @alpha
 */
export declare interface QwikCityNodeRequestOptions extends ServerRenderOptions {
    /** Options for serving static files */
    static?: {
        /** The root folder for statics files. Defaults to /dist */
        root?: string;
        /** Set the Cache-Control header for all static files */
        cacheControl?: string;
    };
}

export { }
