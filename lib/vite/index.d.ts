import type { BuiltinsWithOptionalParams } from 'svgo/plugins/plugins-types';
import type { CompileOptions } from '@mdx-js/mdx';
import type { Config } from 'svgo';
import { ConfigEnv } from 'vite';
import type { Plugin as Plugin_2 } from 'vite';
import type { PluginOption } from 'vite';
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
    /** Unique id built from its relative file system path */
    id: string;
    /** Local file system path */
    filePath: string;
    ext: string;
    /** URL Pathname */
    pathname: string;
    layouts: BuildLayout[];
}

/** @public */
export declare function extendConfig(baseConfigExport: UserConfigExport, serverConfigExport: UserConfigExport): (env: ConfigEnv) => Promise<Record<string, any>>;

/** @public */
declare interface ImageOptimizationOptions {
    jsxDirectives?: {
        quality?: `${number}`;
        format?: 'webp' | 'avif' | 'png';
        w?: string;
        h?: string;
        [key: string]: string | undefined;
    };
    svgo?: Pick<Config, 'floatPrecision' | 'multipass' | 'plugins'> & {
        defaultPresetOverrides?: BuiltinsWithOptionalParams['preset-default']['overrides'];
        prefixIds?: BuiltinsWithOptionalParams['prefixIds'] | false;
    };
    enabled?: boolean | 'only-production';
}

/** @public */
export declare type MdxOptions = CompileOptions;

declare interface MdxPlugins {
    remarkGfm: boolean;
    rehypeSyntaxHighlight: boolean;
    rehypeAutolinkHeadings: boolean;
}

declare type P<T> = Plugin_2<T> & {
    api: T;
};

declare interface ParsedPathname {
    routeName: string;
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

/** @public */
declare interface PluginOptions {
    /** Directory of the `routes`. Defaults to `src/routes`. */
    routesDir?: string;
    /** Directory of the `server plugins`. Defaults to `src/server-plugins`. */
    serverPluginsDir?: string;
    /**
     * The base pathname is used to create absolute URL paths up to the `hostname`, and must always
     * start and end with a `/`. Defaults to `/`.
     */
    basePathname?: string;
    /**
     * Ensure a trailing slash ends page urls. Defaults to `true`. (Note: Previous versions defaulted
     * to `false`).
     */
    trailingSlash?: boolean;
    /** Enable or disable MDX plugins included by default in qwik-city. */
    mdxPlugins?: MdxPlugins;
    /** MDX Options https://mdxjs.com/ */
    mdx?: any;
    /** The platform object which can be used to mock the Cloudflare bindings. */
    platform?: Record<string, unknown>;
    /** Configuration to rewrite url paths */
    rewriteRoutes?: RewriteRouteOption[];
}

/** @public */
export declare function qwikCity(userOpts?: QwikCityVitePluginOptions): PluginOption[];

/** @public */
export declare interface QwikCityPlugin extends P<QwikCityPluginApi> {
    name: 'vite-plugin-qwik-city';
}

/** @public */
declare interface QwikCityPluginApi {
    getBasePathname: () => string;
    getRoutes: () => BuildRoute[];
    getServiceWorkers: () => BuildEntry[];
}

/** @public */
export declare interface QwikCityVitePluginOptions extends Omit<PluginOptions, 'basePathname'> {
    mdxPlugins?: MdxPlugins;
    mdx?: MdxOptions;
    platform?: Record<string, unknown>;
    imageOptimization?: ImageOptimizationOptions;
}

/** @public */
declare interface RewriteRouteOption {
    prefix?: string;
    paths: Record<string, string>;
}

export { }
