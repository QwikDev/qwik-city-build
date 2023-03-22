import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @public
 */
export declare function cloudRunAdapter(opts?: CloudRunAdapterOptions): any;

/**
 * @public
 */
export declare interface CloudRunAdapterOptions extends ServerAdapterOptions {
}

/**
 * @public
 * @deprecated Use `cloudRunAdapter` exported from `@builder.io/qwik-city/adapters/cloud-run/vite` instead.
 */
export declare const cloudRunAdaptor: typeof cloudRunAdapter;

/**
 * @public
 * @deprecated Use `CloudRunAdapterOptions` instead.
 */
export declare type CloudRunAdaptorOptions = CloudRunAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
