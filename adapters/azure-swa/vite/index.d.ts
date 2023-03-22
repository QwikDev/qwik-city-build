import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

/**
 * @public
 */
export declare function azureSwaAdapter(opts?: AzureSwaAdapterOptions): any;

/**
 * @public
 */
export declare interface AzureSwaAdapterOptions extends ServerAdapterOptions {
}

/**
 * @public
 * @deprecated Please use `azureSwaAdapter` exported from `@builder.io/qwik-city/adapters/azure-swa/vite` instead.
 */
export declare const azureSwaAdaptor: typeof azureSwaAdapter;

/**
 * @public
 * @deprecated Please use `AzureSwaAdapterOptions` instead.
 */
export declare type AzureSwaAdaptorOptions = AzureSwaAdapterOptions;

export { StaticGenerateRenderOptions }

export { }
