import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @public
 * @deprecated - Use `nodeServerAdapter` exported from `@builder.io/qwik-city/adapters/node-server/vite` instead.
 */
export declare function expressAdapter(opts?: ExpressAdapterOptions): any;

/**
 * @public
 * @deprecated - Use `NodeServerAdapterOptions` exported from `@builder.io/qwik-city/adapters/node-server/vite` instead.
 */
export declare interface ExpressAdapterOptions extends ServerAdapterOptions {
}

/**
 * @public
 * @deprecated - Use `nodeServerAdapter` exported from `@builder.io/qwik-city/adapters/node-server/vite` instead.
 */
export declare const expressAdaptor: typeof expressAdapter;

/**
 * @public
 * @deprecated - Use `NodeServerAdapterOptions` exported from `@builder.io/qwik-city/adapters/node-server/vite` instead.
 */
export declare type ExpressAdaptorOptions = ExpressAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
