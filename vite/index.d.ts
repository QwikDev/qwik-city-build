import { CompileOptions } from '@mdx-js/mdx/lib/compile';
import { ConfigEnv } from 'vite';
import { UserConfigExport } from 'vite';

declare interface BuildEntry extends ParsedPathname {
    id: string;
    chunkFileName: string;
    filePath: string;
}

declare interface BuildLayout {
    filePath: string;
    dirPath: string;
    id: string;
    layoutType: 'top' | 'nested';
    layoutName: string;
}

declare interface BuildRoute extends ParsedPathname {
    /**
     * Unique id built from its relative file system path
     */
    id: string;
    /**
     * Local file system path
     */
    filePath: string;
    ext: string;
    /**
     * URL Pathname
     */
    pathname: string;
    layouts: BuildLayout[];
}

/**
 * @alpha
 */
export declare function extendConfig(baseConfigExport: UserConfigExport, serverConfigExport: UserConfigExport): (env: ConfigEnv) => Promise<Record<string, any>>;

/**
 * @alpha
 */
export declare type MdxOptions = CompileOptions;

declare interface MdxPlugins {
    remarkGfm: boolean;
    rehypeSyntaxHighlight: boolean;
    rehypeAutolinkHeadings: boolean;
}

declare interface ParsedPathname {
    pattern: RegExp;
    paramNames: string[];
    segments: PathnameSegment[];
}

declare type PathnameSegment = PathnameSegmentPart[];

declare interface PathnameSegmentPart {
    content: string;
    dynamic: boolean;
    rest: boolean;
}

/**
 * @alpha
 */
declare interface PluginOptions {
    /**
     * Directory of the `routes`. Defaults to `src/routes`.
     */
    routesDir?: string;
    /**
     * The base pathname is used to create absolute URL paths up to
     * the `hostname`, and must always start and end with a
     * `/`.  Defaults to `/`.
     */
    basePathname?: string;
    /**
     * Ensure a trailing slash ends page urls. Defaults to `false`.
     */
    trailingSlash?: boolean;
    /**
     * Enable or disable MDX plugins included by default in qwik-city.
     */
    mdxPlugins?: MdxPlugins;
    /**
     * MDX Options https://mdxjs.com/
     */
    mdx?: any;
    /**
     * @deprecated Please use "basePathname" instead.
     */
    baseUrl?: string;
}

/**
 * @alpha
 */
export declare function qwikCity(userOpts?: QwikCityVitePluginOptions): any;

/**
 * @alpha
 */
export declare interface QwikCityPlugin {
    name: 'vite-plugin-qwik-city';
    api: QwikCityPluginApi;
}

/**
 * @alpha
 */
declare interface QwikCityPluginApi {
    getRoutes: () => BuildRoute[];
    getServiceWorkers: () => BuildEntry[];
}

/**
 * @alpha
 */
export declare interface QwikCityVitePluginOptions extends PluginOptions {
    mdxPlugins?: MdxPlugins;
    mdx?: MdxOptions;
}

export { }
