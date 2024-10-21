import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@qwik.dev/city/static';

/** @alpha */
export declare function nodeServerAdapter(opts?: NodeServerAdapterOptions): any;

/** @alpha */
export declare interface NodeServerAdapterOptions extends ServerAdapterOptions {
    name?: string;
}

export { StaticGenerateRenderOptions }

export { }
