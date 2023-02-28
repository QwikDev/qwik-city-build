/// <reference path="./modules.d.ts" />

import { Component } from '@builder.io/qwik';
import { Cookie } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieValue } from '@builder.io/qwik-city/middleware/request-handler';
import { DeferReturn } from '@builder.io/qwik-city/middleware/request-handler';
import { JSXNode } from '@builder.io/qwik';
import { QRL } from '@builder.io/qwik';
import { QwikIntrinsicElements } from '@builder.io/qwik';
import { QwikJSX } from '@builder.io/qwik';
import { RequestEvent } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventAction } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventCommon } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventLoader } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolveSyncValue } from '@builder.io/qwik-city/middleware/request-handler';
import type { Signal } from '@builder.io/qwik';
import { ValueOrPromise } from '@builder.io/qwik';
import { z } from 'zod';

/**
 * @alpha
 * @deprecated - use `globalAction$()` instead
 */
export declare const action$: ActionConstructor;

/**
 * @alpha
 */
export declare interface Action<RETURN, INPUT = Record<string, any>, OPTIONAL extends boolean = true> {
    /**
     * Returns the `ActionStore` containing the current action state and methods to invoke it from a component$().
     * Like all `use-` functions and methods, it can only be invoked within a `component$()`.
     */
    (): ActionStore<RETURN, INPUT, OPTIONAL>;
    /**
     * @deprecated - call as a function instead
     */
    use(): ActionStore<RETURN, INPUT, OPTIONAL>;
}

/**
 * @alpha
 */
export declare interface ActionConstructor {
    <O, B extends TypedDataValidator>(actionQrl: (data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>, options: B | ActionOptionsWithValidation<B>): Action<StrictUnion<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>>>, GetValidatorType<B>, false>;
    <O, B extends TypedDataValidator, REST extends DataValidator[]>(actionQrl: (data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>, options: B, ...rest: REST): Action<StrictUnion<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>> | FailOfRest<REST>>, GetValidatorType<B>, false>;
    <O>(actionQrl: (form: JSONObject, event: RequestEventAction, options: ActionOptions) => ValueOrPromise<O>, options?: ActionOptions): Action<O>;
    <O, REST extends DataValidator[]>(actionQrl: (form: JSONObject, event: RequestEventAction) => ValueOrPromise<O>, ...rest: REST): Action<StrictUnion<O | FailReturn<FailOfRest<REST>>>>;
}

/**
 * @alpha
 */
declare interface ActionConstructorQRL {
    <O, B extends TypedDataValidator>(actionQrl: QRL<(data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>>, options: B | ActionOptionsWithValidation<B>): Action<StrictUnion<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>>>, GetValidatorType<B>, false>;
    <O, B extends TypedDataValidator, REST extends DataValidator[]>(actionQrl: QRL<(data: GetValidatorType<B>, event: RequestEventAction) => ValueOrPromise<O>>, options: B, ...rest: REST): Action<StrictUnion<O | FailReturn<z.typeToFlattenedError<GetValidatorType<B>>> | FailOfRest<REST>>, GetValidatorType<B>, false>;
    <O>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction, options: ActionOptions) => ValueOrPromise<O>>, options?: ActionOptions): Action<O>;
    <O, REST extends DataValidator[]>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<O>>, ...rest: REST): Action<StrictUnion<O | FailReturn<FailOfRest<REST>>>>;
}

/**
 * @alpha
 */
export declare interface ActionOptions {
    readonly id?: string;
    readonly validation?: DataValidator[];
}

/**
 * @alpha
 */
export declare interface ActionOptionsWithValidation<B extends TypedDataValidator = TypedDataValidator> {
    readonly id?: string;
    readonly validation: [val: B, ...a: DataValidator[]];
}

/**
 * @alpha
 * @deprecated - use `globalAction$()` instead
 */
export declare const actionQrl: ActionConstructorQRL;

/**
 * @alpha
 */
declare interface ActionReturn<RETURN> {
    readonly status?: number;
    readonly value: RETURN;
}

/**
 * @alpha
 */
export declare interface ActionStore<RETURN, INPUT, OPTIONAL extends boolean = true> {
    /**
     * It's the "action" path that a native `<form>` should have in order to call the action.
     *
     * ```tsx
     *  <form action={action.actionPath} />
     * ```
     *
     * Most of the time this property should not be used directly, instead use the `Form` component:
     *
     * ```tsx
     * import {action$, Form} from '@builder.io/qwik-city';
     *
     * export const useAddUser = action$(() => { ... });
     *
     * export default component$(() => {
     *   const action = useAddUser()l
     *   return (
     *     <Form action={action}/>
     *   );
     * });
     * ```
     */
    readonly actionPath: string;
    /**
     * Reactive property that becomes `true` only in the browser, when a form is submited and switched back to false when the action finish, ie, it describes if the action is actively running.
     *
     * This property is specially useful to disable the submit button while the action is processing, to prevent multiple submissions, and to inform visually to the user that the action is actively running.
     *
     * It will be always `false` in the server, and only becomes `true` briefly while the action is running.
     */
    readonly isRunning: boolean;
    /**
     * Returned HTTP status code of the action after its last execution.
     *
     * It's `undefined` before the action is first called.
     */
    readonly status?: number;
    /**
     * When calling an action through a `<form>`, this property contains the previously submitted `FormData`.
     *
     * This is useful to keep the filled form data even after a full page reload.
     *
     * It's `undefined` before the action is first called.
     */
    readonly formData: FormData | undefined;
    /**
     * Returned succesful data of the action. This reactive property will contain the data returned inside the `action$` function.
     *
     * It's `undefined` before the action is first called.
     */
    readonly value: RETURN | undefined;
    /**
     * Method to execute the action programatically from the browser. Ie, instead of using a `<form>`, a 'click' handle can call the `run()` method of the action
     * in order to execute the action in the server.
     */
    readonly run: QRL<OPTIONAL extends true ? (form?: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>> : (form: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>>>;
}

declare type AnchorAttributes = QwikIntrinsicElements['a'];

/**
 * @deprecated Please use `RouterOutlet` instead.
 * @alpha
 */
export declare const Content: Component<    {}>;

/**
 * @alpha
 */
export declare interface ContentHeading {
    readonly text: string;
    readonly id: string;
    readonly level: number;
}

/**
 * @alpha
 */
export declare interface ContentMenu {
    readonly text: string;
    readonly href?: string;
    readonly items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

/**
 * @alpha
 */
declare interface ContentState {
    readonly headings: ContentHeading[] | undefined;
    readonly menu: ContentMenu | undefined;
}

export { Cookie }

export { CookieOptions }

export { CookieValue }

/**
 * @alpha
 */
declare interface DataValidator<T extends Record<string, any> = {}> {
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn<T>>;
}

export { DeferReturn }

/**
 * @alpha
 */
export declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/**
 * @alpha
 */
export declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue;
}

/**
 * @alpha
 */
export declare interface DocumentHeadValue {
    /**
     * Sets `document.title`.
     */
    readonly title?: string;
    /**
     * Used to manually set meta tags in the head. Additionally, the `data`
     * property could be used to set arbitrary data which the `<head>` component
     * could later use to generate `<meta>` tags.
     */
    readonly meta?: readonly DocumentMeta[];
    /**
     * Used to manually append `<link>` elements to the `<head>`.
     */
    readonly links?: readonly DocumentLink[];
    /**
     * Used to manually append `<style>` elements to the `<head>`.
     */
    readonly styles?: readonly DocumentStyle[];
    /**
     * Arbitrary object containing custom data. When the document head is created from
     * markdown files, the frontmatter attributes that are not recognized as a well-known
     * meta names (such as title, description, author, etc...), are stored in this property.
     */
    readonly frontmatter?: Readonly<Record<string, any>>;
}

/**
 * @alpha
 */
export declare interface DocumentLink {
    as?: string;
    crossorigin?: string;
    disabled?: boolean;
    href?: string;
    hreflang?: string;
    id?: string;
    imagesizes?: string;
    imagesrcset?: string;
    integrity?: string;
    media?: string;
    prefetch?: string;
    referrerpolicy?: string;
    rel?: string;
    sizes?: string;
    title?: string;
    type?: string;
    key?: string;
}

/**
 * @alpha
 */
export declare interface DocumentMeta {
    readonly content?: string;
    readonly httpEquiv?: string;
    readonly name?: string;
    readonly property?: string;
    readonly key?: string;
    readonly itemprop?: string;
}

/**
 * @alpha
 */
export declare interface DocumentStyle {
    readonly style: string;
    readonly props?: Readonly<{
        [propName: string]: string;
    }>;
    readonly key?: string;
}

/**
 * @alpha
 * @deprecated Please use `RequestHandler` instead.
 */
export declare type EndpointHandler<BODY = unknown> = RequestHandler<BODY>;

declare type EndpointModuleLoader = () => Promise<RouteModule>;

declare type FailOfRest<REST extends readonly DataValidator[]> = REST extends readonly DataValidator<infer ERROR>[] ? ERROR : never;

/**
 * @alpha
 */
export declare type FailReturn<T> = T & {
    failed: true;
};

/**
 * @alpha
 */
export declare const Form: <O, I>({ action, spaReset, reloadDocument, onSubmit$, ...rest }: FormProps<O, I>) => JSXNode<"form">;

/**
 * @alpha
 */
export declare interface FormProps<O, I> extends Omit<QwikJSX.IntrinsicElements['form'], 'action' | 'method'> {
    /**
     * Reference to the action returned by `action()`.
     */
    action: ActionStore<O, I, true | false>;
    /**
     * When `true` the form submission will cause a full page reload, even if SPA mode is enabled and JS is available.
     */
    reloadDocument?: boolean;
    /**
     * When `true` all the form inputs will be reset in SPA mode, just like happens in a full page form submission.
     *
     * Defaults to `false`
     */
    spaReset?: boolean;
    /**
     * Event handler executed right when the form is submitted.
     */
    onSubmit$?: (event: Event, form: HTMLFormElement) => ValueOrPromise<void>;
    /**
     * Event handler executed right after the action is executed sucesfully and returns some data.
     */
    onSubmitCompleted$?: (event: CustomEvent<FormSubmitSuccessDetail<O>>, form: HTMLFormElement) => ValueOrPromise<void>;
}

/**
 * @alpha
 */
export declare interface FormSubmitSuccessDetail<T> {
    status: number;
    value: T;
}

declare type GetValidatorType<B extends TypedDataValidator> = B extends TypedDataValidator<infer TYPE> ? z.infer<TYPE> : never;

/**
 * @alpha
 */
export declare const globalAction$: ActionConstructor;

/**
 * @alpha
 */
export declare const globalActionQrl: ActionConstructorQRL;

/**
 * @alpha
 * @deprecated - The "Html" component has been renamed to "QwikCityProvider".
 */
export declare const Html: Component<QwikCityProps>;

/**
 * @alpha
 */
declare type JSONObject = {
    [x: string]: JSONValue;
};

/**
 * @alpha
 */
declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;

declare interface LayoutModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
}

/**
 * @alpha
 */
export declare const Link: Component<LinkProps>;

/**
 * @alpha
 */
export declare interface LinkProps extends AnchorAttributes {
    prefetch?: boolean;
    reload?: boolean;
}

/**
 * @alpha
 * @deprecated - use `routeLoader$()` instead
 */
export declare const loader$: LoaderConstructor;

/**
 * @alpha
 */
export declare interface Loader<RETURN> {
    /**
     * Returns the `Signal` containing the data returned by the `loader$` function.
     * Like all `use-` functions and methods, it can only be invoked within a `component$()`.
     */
    (): LoaderSignal<RETURN>;
    /**
     * @deprecated - call as a function instead
     */
    use(): LoaderSignal<RETURN>;
}

/**
 * @alpha
 */
declare interface LoaderConstructor {
    <O>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<O>, options?: LoaderOptions): Loader<O>;
    <O, REST extends readonly DataValidator[]>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<O>, ...rest: REST): Loader<StrictUnion<O | FailReturn<FailOfRest<REST>>>>;
}

/**
 * @alpha
 */
declare interface LoaderConstructorQRL {
    <O>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<O>>, options?: LoaderOptions): Loader<O>;
    <O, REST extends readonly DataValidator[]>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<O>>, ...rest: REST): Loader<StrictUnion<O | FailReturn<FailOfRest<REST>>>>;
}

/**
 * @alpha
 */
declare interface LoaderOptions {
    id?: string;
}

/**
 * @alpha
 * @deprecated - use `routeLoader$()` instead
 */
export declare const loaderQrl: LoaderConstructorQRL;

/**
 * @alpha
 */
export declare type LoaderSignal<T> = T extends () => ValueOrPromise<infer B> ? Readonly<Signal<ValueOrPromise<B>>> : Readonly<Signal<T>>;

/**
 * @alpha
 */
export declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/**
 * @alpha
 */
export declare interface PageModule extends RouteModule {
    readonly default: any;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/**
 * @alpha
 */
export declare type PathParams = Record<string, string>;

declare type Prettify<T> = {} & {
    [K in keyof T]?: T[K];
};

/**
 * @alpha
 * @deprecated - The "QwikCity" component has been renamed to "QwikCityProvider".
 */
export declare const QwikCity: Component<QwikCityProps>;

/**
 * @alpha
 */
declare interface QwikCityMockProps {
    url?: string;
    params?: Record<string, string>;
}

/**
 * @alpha
 */
export declare const QwikCityMockProvider: Component<QwikCityMockProps>;

/**
 * @alpha
 */
export declare interface QwikCityPlan {
    readonly routes: RouteData[];
    readonly serverPlugins?: RouteModule[];
    readonly basePathname?: string;
    readonly menus?: MenuData[];
    readonly trailingSlash?: boolean;
    readonly cacheModules?: boolean;
}

/**
 * @alpha
 */
declare interface QwikCityProps {
    /**
     * The QwikCity component must have only two direct children: `<head>` and `<body>`, like the following example:
     *
     * ```tsx
     * <QwikCityProvider>
     *   <head>
     *     <meta charSet="utf-8" />
     *   </head>
     *   <body lang="en"></body>
     * </QwikCityProvider>
     * ```
     */
    children?: [JSXNode, JSXNode];
}

/**
 * @alpha
 */
export declare const QwikCityProvider: Component<QwikCityProps>;

export { RequestEvent }

export { RequestEventAction }

export { RequestEventCommon }

export { RequestEventLoader }

export { RequestHandler }

/**
 * @alpha
 */
export declare type ResolvedDocumentHead = Required<DocumentHeadValue>;

/**
 * @alpha
 */
export declare const routeAction$: ActionConstructor;

/**
 * @alpha
 */
export declare const routeActionQrl: ActionConstructorQRL;

/**
 * @alpha
 */
export declare type RouteData = [pattern: RegExp, loaders: ModuleLoader[]] | [pattern: RegExp, loaders: ModuleLoader[], paramNames: string[]] | [
pattern: RegExp,
loaders: ModuleLoader[],
paramNames: string[],
originalPathname: string,
routeBundleNames: string[]
];

/**
 * @alpha
 */
export declare const routeLoader$: LoaderConstructor;

/**
 * @alpha
 */
export declare const routeLoaderQrl: LoaderConstructorQRL;

/**
 * @alpha
 */
export declare interface RouteLocation {
    readonly params: Readonly<Record<string, string>>;
    readonly url: URL;
    /**
     * @deprecated Please use `url` instead of href
     */
    readonly href: string;
    /**
     * @deprecated Please use `url` instead of pathname
     */
    readonly pathname: string;
    /**
     * @deprecated Please use `url` instead of query
     */
    readonly query: URLSearchParams;
    readonly isNavigating: boolean;
}

declare interface RouteModule<BODY = unknown> {
    onDelete?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onGet?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onHead?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onOptions?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPatch?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPost?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onPut?: RequestHandler<BODY> | RequestHandler<BODY>[];
    onRequest?: RequestHandler<BODY> | RequestHandler<BODY>[];
}

/**
 * @alpha
 */
export declare type RouteNavigate = QRL<(path?: string, forceReload?: boolean) => Promise<void>>;

/**
 * @alpha
 * @deprecated Please update to `PathParams` instead
 */
export declare type RouteParams = Record<string, string>;

/**
 * @alpha
 */
export declare const RouterOutlet: Component<    {}>;

/**
 * @alpha
 */
export declare const server$: <T extends ServerFunction>(first: T) => QRL<T>;

declare interface ServerConstructorQRL {
    <T extends ServerFunction>(fnQrl: QRL<T>): QRL<T>;
}

declare interface ServerFunction {
    (this: RequestEvent, ...args: any[]): any;
}

/**
 * @alpha
 */
export declare const serverQrl: ServerConstructorQRL;

/**
 * @alpha
 */
export declare const ServiceWorkerRegister: (props: {
    nonce?: string;
}) => JSXNode<"script">;

/**
 * @alpha
 */
export declare interface StaticGenerate {
    params?: PathParams[];
}

/**
 * @alpha
 */
export declare type StaticGenerateHandler = () => Promise<StaticGenerate> | StaticGenerate;

declare type StrictUnion<T> = Prettify<StrictUnionHelper<T, T>>;

declare type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

/**
 * @alpha
 */
declare interface TypedDataValidator<T extends z.ZodType = any> {
    __zod: z.ZodSchema<T>;
    validate(ev: RequestEvent, data: unknown): Promise<z.SafeParseReturnType<T, T>>;
}

declare type UnionKeys<T> = T extends T ? keyof T : never;

/**
 * @alpha
 */
export declare const useContent: () => ContentState;

/**
 * @alpha
 */
export declare const useDocumentHead: () => Required<ResolvedDocumentHead>;

/**
 * @alpha
 */
export declare const useLocation: () => RouteLocation;

/**
 * @alpha
 */
export declare const useNavigate: () => RouteNavigate;

/**
 * @alpha
 */
export declare const validator$: ValidatorConstructor;

declare interface ValidatorConstructor {
    <T extends ValidatorReturn>(validator: (ev: RequestEvent, data: unknown) => ValueOrPromise<T>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
}

declare interface ValidatorConstructorQRL {
    <T extends ValidatorReturn>(validator: QRL<(ev: RequestEvent, data: unknown) => ValueOrPromise<T>>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
}

/**
 * @alpha
 */
export declare const validatorQrl: ValidatorConstructorQRL;

declare type ValidatorReturn<T extends Record<string, any> = {}> = ValidatorReturnSuccess | ValidatorReturnFail<T>;

declare interface ValidatorReturnFail<T extends Record<string, any> = {}> {
    readonly success: false;
    readonly error: T;
    readonly status?: number;
}

declare interface ValidatorReturnSuccess {
    readonly success: true;
    readonly data?: any;
}

export { z }

/**
 * @alpha
 */
export declare const zod$: Zod;

/**
 * @alpha
 */
export declare interface Zod {
    <T extends z.ZodRawShape>(schema: T): TypedDataValidator<z.ZodObject<T>>;
    <T extends z.ZodRawShape>(schema: (z: z) => T): TypedDataValidator<z.ZodObject<T>>;
    <T extends z.Schema>(schema: T): TypedDataValidator<T>;
    <T extends z.Schema>(schema: (z: z) => T): TypedDataValidator<T>;
}

/**
 * @alpha
 */
declare interface ZodConstructorQRL {
    <T extends z.ZodRawShape>(schema: QRL<T>): TypedDataValidator<z.ZodObject<T>>;
    <T extends z.ZodRawShape>(schema: QRL<(z: z) => T>): TypedDataValidator<z.ZodObject<T>>;
    <T extends z.Schema>(schema: QRL<T>): TypedDataValidator<T>;
    <T extends z.Schema>(schema: QRL<(z: z) => T>): TypedDataValidator<T>;
}

/**
 * @alpha
 */
export declare const zodQrl: ZodConstructorQRL;

export { }
