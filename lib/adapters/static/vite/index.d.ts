import type { StaticGenerateRenderOptions } from '../../../static';

/** @public */
export declare function staticAdapter(opts: StaticGenerateAdapterOptions): any;

/** @public */
export declare interface StaticGenerateAdapterOptions extends Omit<StaticGenerateRenderOptions, 'outDir'> {
}

export { }
