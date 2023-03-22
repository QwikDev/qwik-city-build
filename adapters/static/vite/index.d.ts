import type { StaticGenerateRenderOptions } from '../../../static';

/**
 * @public
 */
export declare function staticAdapter(opts: StaticGenerateAdapterOptions): any;

/**
 * @public
 * @deprecated Use `staticAdapter` exported from `@builder.io/qwik-city/adapters/static/vite` instead.
 */
export declare const staticAdaptor: typeof staticAdapter;

/**
 * @public
 */
export declare interface StaticGenerateAdapterOptions extends Omit<StaticGenerateRenderOptions, 'outDir'> {
}

/**
 * @public
 * @deprecated Use `StaticGenerateAdapterOptions` instead.
 */
export declare type StaticGenerateAdaptorOptions = StaticGenerateAdapterOptions;

export { }
