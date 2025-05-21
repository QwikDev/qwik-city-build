import type { AzureFunction } from '@azure/functions';
import type { Context } from '@azure/functions';
import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityAzureOptions): AzureFunction;

/** @public */
export declare interface PlatformAzure extends Partial<Context> {
}

/** @public */
export declare interface QwikCityAzureOptions extends ServerRenderOptions {
}

export { }
