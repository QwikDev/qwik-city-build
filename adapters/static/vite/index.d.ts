import type { StaticGenerateRenderOptions } from '../../../static';

/**
 * @alpha
 */
export declare function staticAdapter(opts: StaticGenerateAdapterOptions): any;

/**
 * @alpha
 * @deprecated Use `staticAdapter` exported from `@builder.io/qwik-city/adapters/static/vite` instead.
 */
export declare const staticAdaptor: typeof staticAdapter;

/**
 * @alpha
 */
export declare interface StaticGenerateAdapterOptions extends Omit<StaticGenerateRenderOptions, 'outDir'> {
}

/**
 * @alpha
 * @deprecated Use `StaticGenerateAdapterOptions` instead.
 */
export declare type StaticGenerateAdaptorOptions = StaticGenerateAdapterOptions;

export { }
