import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @alpha
 */
export declare function cloudRunAdapter(opts?: CloudRunAdapterOptions): any;

/**
 * @alpha
 */
export declare interface CloudRunAdapterOptions extends ServerAdapterOptions {
}

/**
 * @alpha
 * @deprecated Use `cloudRunAdapter` exported from `@builder.io/qwik-city/adapters/cloud-run/vite` instead.
 */
export declare const cloudRunAdaptor: typeof cloudRunAdapter;

/**
 * @alpha
 * @deprecated Use `CloudRunAdapterOptions` instead.
 */
export declare type CloudRunAdaptorOptions = CloudRunAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
