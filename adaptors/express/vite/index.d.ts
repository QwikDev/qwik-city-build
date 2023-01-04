import type { StaticGenerateRenderOptions } from '../../../static';

/**
 * @alpha
 */
export declare function expressAdaptor(opts?: ExpressAdaptorOptions): any;

/**
 * @alpha
 */
export declare interface ExpressAdaptorOptions {
    staticGenerate?: Omit<StaticGenerateRenderOptions, 'outDir'> | true;
}

export { }
