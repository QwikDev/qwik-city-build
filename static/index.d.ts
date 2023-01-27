/// <reference types="node" />

import type { RenderOptions } from '@builder.io/qwik/server';

/**
 * Use this function when SSG should be generated from another module, such as a Vite plugin.
 * This function's should be passed the paths of the entry module and Qwik City Plan.
 * @alpha
 */
export declare function generate(opts: StaticGenerateOptions): Promise<StaticGenerateResult>;

/**
 * @alpha
 */
export declare interface StaticGenerateOptions extends StaticGenerateRenderOptions {
    /**
     * Path to the SSR module exporting the default render function.
     * In most cases it'll be `./src/entry.ssr.tsx`.
     */
    renderModulePath: string;
    /**
     * Path to the Qwik City Plan module exporting the default `@qwik-city-plan`.
     */
    qwikCityPlanModulePath: string;
    /**
     * Defaults to `/`
     */
    basePathname?: string;
    rootDir?: string;
}

/**
 * @alpha
 */
export declare type StaticGeneratePathFilter = (filterOpts: {
    pathname: string;
    params: Record<string, string> | undefined;
    isStatic: boolean | undefined;
}) => boolean;

/**
 * @alpha
 */
export declare interface StaticGenerateRenderOptions extends RenderOptions {
    /**
     * File system directory where the static files should be written.
     */
    outDir: string;
    /**
     * The URL `origin`, which is a combination of the scheme (protocol) and hostname (domain).
     * For example, `https://qwik.builder.io` has the protocol `https://` and domain `qwik.builder.io`.
     * However, the `origin` does not include a `pathname`.
     *
     * The `origin` is used to provide a full URL during Static Site Generation (SSG), and to
     * simulate a complete URL rather than just the `pathname`. For example, in order to
     * render a correct canonical tag URL or URLs within the `sitemap.xml`, the `origin` must
     * be provided too.
     *
     * If the site also starts with a pathname other than `/`, please use the `basePathname`
     * option in the Qwik City config options.
     */
    origin: string;
    /**
     * Maximum number of workers to use while generating the static pages.
     * Defaults to the number of CPUs available.
     */
    maxWorkers?: number;
    /**
     * Maximum number of tasks to be running at one time per worker.
     * Defaults to `20`.
     */
    maxTasksPerWorker?: number;
    /**
     * File system path to write the `sitemap.xml` to. Defaults to `sitemap.xml`
     * and written to the root of the `outDir`. Setting to `null` will prevent
     * the sitemap from being created.
     */
    sitemapOutFile?: string;
    /**
     * Log level.
     */
    log?: 'debug';
    /**
     * Set to `false` if the generated static HTML files should not be written to disk. Setting
     * to `false` is useful if the SSG should only write the `q-data.json` files to disk.
     * Defaults to `true`.
     */
    emitHtml?: boolean;
    /**
     * Set to `false` if the generated `q-data.json` data files should not be written to disk.
     * Defaults to `true`.
     */
    emitData?: boolean;
    /**
     * Set to `false` if the static build should not write custom or default `404.html` pages.
     * Defaults to `true`.
     */
    emit404Pages?: boolean;
    /**
     * The `filter` callback function can be used to determine if a page should be statically
     * generated or not. The filter function is passed the `pathname` and `params` data,
     * and should return `true` if the page should be statically generated. Returning `false`
     * will prevent the page from being statically generated. If a `filter` function is not
     * provided then all pages will be statically generated.
     */
    filter?: StaticGeneratePathFilter;
}

/**
 * @alpha
 */
export declare interface StaticGenerateResult {
    duration: number;
    rendered: number;
    errors: number;
    staticPaths: string[];
}

export { }
