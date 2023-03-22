import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @public
 */
export declare function expressAdapter(opts?: ExpressAdapterOptions): any;

/**
 * @public
 */
export declare interface ExpressAdapterOptions extends ServerAdapterOptions {
}

/**
 * @public
 * @deprecated Use `expressAdapter` exported from `@builder.io/qwik-city/adapters/express/vite` instead.
 */
export declare const expressAdaptor: typeof expressAdapter;

/**
 * @public
 * @deprecated Use `ExpressAdapterOptions` instead.
 */
export declare type ExpressAdaptorOptions = ExpressAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
