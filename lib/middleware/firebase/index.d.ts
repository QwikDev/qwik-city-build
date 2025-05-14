import type { ServerRenderOptions } from '@builder.io/qwik-city/middleware/request-handler';

/** @public */
export declare function createQwikCity(opts: QwikCityFirebaseOptions): (req: any, res: any) => Promise<void>;

/** @public */
export declare interface PlatformFirebase extends Object {
}

/** @public */
export declare interface QwikCityFirebaseOptions extends ServerRenderOptions {
}

export { }
