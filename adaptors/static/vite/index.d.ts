import type { StaticGenerateRenderOptions } from '../../../static';

/**
 * @alpha
 */
export declare function staticAdaptor(opts: StaticGenerateAdaptorOptions): any;

/**
 * @alpha
 */
export declare interface StaticGenerateAdaptorOptions extends Omit<StaticGenerateRenderOptions, 'outDir'> {
}

export { }
