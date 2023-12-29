/// <reference path="./modules.d.ts" />

import { Component } from '@builder.io/qwik';
import { Cookie } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieOptions } from '@builder.io/qwik-city/middleware/request-handler';
import { CookieValue } from '@builder.io/qwik-city/middleware/request-handler';
import { DeferReturn } from '@builder.io/qwik-city/middleware/request-handler';
import type { EnvGetter } from '@builder.io/qwik-city/middleware/request-handler';
import { JSXNode } from '@builder.io/qwik';
import { PropFunctionProps } from '@builder.io/qwik';
import { QRL } from '@builder.io/qwik';
import { QwikIntrinsicElements } from '@builder.io/qwik';
import { QwikJSX } from '@builder.io/qwik';
import type { ReadonlySignal } from '@builder.io/qwik';
import { RequestEvent } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventAction } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventBase } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventCommon } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestEventLoader } from '@builder.io/qwik-city/middleware/request-handler';
import { RequestHandler } from '@builder.io/qwik-city/middleware/request-handler';
import type { ResolveSyncValue } from '@builder.io/qwik-city/middleware/request-handler';
import { ValueOrPromise } from '@builder.io/qwik';
import { z } from 'zod';
import type * as zod from 'zod';

/** @public */
export declare type Action<RETURN, INPUT = Record<string, unknown>, OPTIONAL extends boolean = true> = {
    /**
     * Returns the `ActionStore` containing the current action state and methods to invoke it from a
     * component$(). Like all `use-` functions and methods, it can only be invoked within a
     * `component$()`.
     */
    (): ActionStore<RETURN, INPUT, OPTIONAL>;
};

/** @public */
export declare type ActionConstructor = {
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR, ...REST];
    }): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: (data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR];
    }): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, options: {
        readonly id?: string;
        readonly validation: REST;
    }): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: VALIDATOR, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: (data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>, options: VALIDATOR): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: (form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ>(actionQrl: (form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>, options?: {
        readonly id?: string;
    }): Action<StrictUnion<OBJ>>;
};

/** @public */
declare type ActionConstructorQRL = {
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR, ...REST];
    }): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: QRL<(data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: [VALIDATOR];
    }): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: {
        readonly id?: string;
        readonly validation: REST;
    }): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: VALIDATOR, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>> | FailReturn<FailOfRest<REST>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, VALIDATOR extends TypedDataValidator>(actionQrl: QRL<(data: GetValidatorType<VALIDATOR>, event: RequestEventAction) => ValueOrPromise<OBJ>>, options: VALIDATOR): Action<StrictUnion<OBJ | FailReturn<zod.typeToFlattenedError<GetValidatorType<VALIDATOR>>>>, GetValidatorType<VALIDATOR>, false>;
    <OBJ extends Record<string, any> | void | null, REST extends [DataValidator, ...DataValidator[]]>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, ...rest: REST): Action<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
    <OBJ>(actionQrl: QRL<(form: JSONObject, event: RequestEventAction) => ValueOrPromise<OBJ>>, options?: {
        readonly id?: string;
    }): Action<StrictUnion<OBJ>>;
};

/** @public */
export declare type ActionReturn<RETURN> = {
    readonly status?: number;
    readonly value: RETURN;
};

/** @public */
export declare type ActionStore<RETURN, INPUT, OPTIONAL extends boolean = true> = {
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
     *   const action = useAddUser();
     *   return (
     *     <Form action={action}/>
     *   );
     * });
     * ```
     */
    readonly actionPath: string;
    /**
     * Reactive property that becomes `true` only in the browser, when a form is submitted and
     * switched back to false when the action finish, ie, it describes if the action is actively
     * running.
     *
     * This property is specially useful to disable the submit button while the action is processing,
     * to prevent multiple submissions, and to inform visually to the user that the action is actively
     * running.
     *
     * It will be always `false` in the server, and only becomes `true` briefly while the action is
     * running.
     */
    readonly isRunning: boolean;
    /**
     * Returned HTTP status code of the action after its last execution.
     *
     * It's `undefined` before the action is first called.
     */
    readonly status?: number;
    /**
     * When calling an action through a `<form>`, this property contains the previously submitted
     * `FormData`.
     *
     * This is useful to keep the filled form data even after a full page reload.
     *
     * It's `undefined` before the action is first called.
     */
    readonly formData: FormData | undefined;
    /**
     * Returned successful data of the action. This reactive property will contain the data returned
     * inside the `action$` function.
     *
     * It's `undefined` before the action is first called.
     */
    readonly value: RETURN | undefined;
    /**
     * Method to execute the action programmatically from the browser. Ie, instead of using a
     * `<form>`, a 'click' handle can call the `run()` method of the action in order to execute the
     * action in the server.
     */
    readonly submit: QRL<OPTIONAL extends true ? (form?: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>> : (form: INPUT | FormData | SubmitEvent) => Promise<ActionReturn<RETURN>>>;
};

declare type AnchorAttributes = QwikIntrinsicElements['a'];

/** @public */
export declare interface ContentHeading {
    readonly text: string;
    readonly id: string;
    readonly level: number;
}

/** @public */
export declare interface ContentMenu {
    readonly text: string;
    readonly href?: string;
    readonly items?: ContentMenu[];
}

declare type ContentModule = PageModule | LayoutModule;

declare type ContentModuleHead = DocumentHead | ResolvedDocumentHead;

declare type ContentModuleLoader = () => Promise<ContentModule>;

/** @public */
declare interface ContentState {
    readonly headings: ContentHeading[] | undefined;
    readonly menu: ContentMenu | undefined;
}

export { Cookie }

export { CookieOptions }

export { CookieValue }

/** @public */
export declare type DataValidator<T extends Record<string, any> = {}> = {
    validate(ev: RequestEvent, data: unknown): Promise<ValidatorReturn<T>>;
};

export { DeferReturn }

/** @public */
export declare type DocumentHead = DocumentHeadValue | ((props: DocumentHeadProps) => DocumentHeadValue);

/** @public */
export declare interface DocumentHeadProps extends RouteLocation {
    readonly head: ResolvedDocumentHead;
    readonly withLocale: <T>(fn: () => T) => T;
    readonly resolveValue: ResolveSyncValue;
}

/** @public */
export declare interface DocumentHeadValue<FrontMatter extends Record<string, any> = Record<string, unknown>> {
    /** Sets `document.title`. */
    readonly title?: string;
    /**
     * Used to manually set meta tags in the head. Additionally, the `data` property could be used to
     * set arbitrary data which the `<head>` component could later use to generate `<meta>` tags.
     */
    readonly meta?: readonly DocumentMeta[];
    /** Used to manually append `<link>` elements to the `<head>`. */
    readonly links?: readonly DocumentLink[];
    /** Used to manually append `<style>` elements to the `<head>`. */
    readonly styles?: readonly DocumentStyle[];
    /** Used to manually append `<script>` elements to the `<head>`. */
    readonly scripts?: readonly DocumentScript[];
    /**
     * Arbitrary object containing custom data. When the document head is created from markdown files,
     * the frontmatter attributes that are not recognized as a well-known meta names (such as title,
     * description, author, etc...), are stored in this property.
     */
    readonly frontmatter?: Readonly<FrontMatter>;
}

/** @public */
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

/** @public */
export declare interface DocumentMeta {
    readonly content?: string;
    readonly httpEquiv?: string;
    readonly name?: string;
    readonly property?: string;
    readonly key?: string;
    readonly itemprop?: string;
    readonly media?: string;
}

/** @alpha */
export declare interface DocumentScript {
    readonly script?: string;
    readonly props?: Readonly<QwikIntrinsicElements['script']>;
    readonly key?: string;
}

/** @public */
export declare interface DocumentStyle {
    readonly style: string;
    readonly props?: Readonly<QwikIntrinsicElements['style']>;
    readonly key?: string;
}

declare type EndpointModuleLoader = () => Promise<RouteModule>;

declare type Failed = {
    failed: true;
};

/** @public */
export declare type FailOfRest<REST extends readonly DataValidator[]> = REST extends readonly DataValidator<infer ERROR>[] ? ERROR : never;

/** @public */
export declare type FailReturn<T> = T & Failed;

/** @public */
export declare const Form: <O, I>({ action, spaReset, reloadDocument, onSubmit$, ...rest }: FormProps<O, I>, key: string | null) => QwikJSX.Element;

/** @public */
export declare interface FormProps<O, I> extends Omit<QwikJSX.IntrinsicElements['form'], 'action' | 'method'> {
    /** Reference to the action returned by `action()`. */
    action?: ActionStore<O, I, true | false>;
    /**
     * When `true` the form submission will cause a full page reload, even if SPA mode is enabled and
     * JS is available.
     */
    reloadDocument?: boolean;
    /**
     * When `true` all the form inputs will be reset in SPA mode, just like happens in a full page
     * form submission.
     *
     * Defaults to `false`
     */
    spaReset?: boolean;
    /** Event handler executed right when the form is submitted. */
    onSubmit$?: (event: Event, form: HTMLFormElement) => ValueOrPromise<void>;
    /** Event handler executed right after the action is executed successfully and returns some data. */
    onSubmitCompleted$?: (event: CustomEvent<FormSubmitSuccessDetail<O>>, form: HTMLFormElement) => ValueOrPromise<void>;
    key?: string | number | null;
}

/** @public */
export declare interface FormSubmitSuccessDetail<T> {
    status: number;
    value: T;
}

/** @public */
export declare type GetValidatorType<VALIDATOR extends TypedDataValidator> = VALIDATOR extends TypedDataValidator<infer TYPE> ? zod.infer<TYPE> : never;

/** @public */
export declare const globalAction$: ActionConstructor;

/** @public */
export declare const globalActionQrl: ActionConstructorQRL;

/** @public */
export declare type JSONObject = {
    [x: string]: JSONValue;
};

/** @public */
export declare type JSONValue = string | number | boolean | {
    [x: string]: JSONValue;
} | Array<JSONValue>;

declare interface LayoutModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
}

/** @public */
export declare const Link: Component<PropFunctionProps<LinkProps>>;

/** @public */
export declare interface LinkProps extends AnchorAttributes {
    prefetch?: boolean;
    reload?: boolean;
    replaceState?: boolean;
    scroll?: boolean;
    'link:app'?: boolean;
}

/** @public */
export declare type Loader<RETURN> = {
    /**
     * Returns the `Signal` containing the data returned by the `loader$` function. Like all `use-`
     * functions and methods, it can only be invoked within a `component$()`.
     */
    (): LoaderSignal<RETURN>;
};

/** @public */
declare type LoaderConstructor = {
    <OBJ>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<OBJ>, options?: LoaderOptions): Loader<[Extract<OBJ, Failed>] extends [never] ? OBJ : StrictUnion<OBJ>>;
    <OBJ extends Record<string, any> | void | null, REST extends readonly DataValidator[]>(loaderFn: (event: RequestEventLoader) => ValueOrPromise<OBJ>, ...rest: REST): Loader<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
};

/** @public */
declare type LoaderConstructorQRL = {
    <OBJ>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<OBJ>>, options?: LoaderOptions): Loader<[Extract<OBJ, Failed>] extends [never] ? OBJ : StrictUnion<OBJ>>;
    <OBJ extends Record<string, any> | void | null, REST extends readonly DataValidator[]>(loaderQrl: QRL<(event: RequestEventLoader) => ValueOrPromise<OBJ>>, ...rest: REST): Loader<StrictUnion<OBJ | FailReturn<FailOfRest<REST>>>>;
};

/** @public */
declare type LoaderOptions = {
    id?: string;
};

/** @public */
export declare type LoaderSignal<TYPE> = TYPE extends () => ValueOrPromise<infer VALIDATOR> ? ReadonlySignal<ValueOrPromise<VALIDATOR>> : ReadonlySignal<TYPE>;

/** @public */
export declare type MenuData = [pathname: string, menuLoader: MenuModuleLoader];

declare interface MenuModule {
    readonly default: ContentMenu;
}

declare type MenuModuleLoader = () => Promise<MenuModule>;

declare type ModuleLoader = ContentModuleLoader | EndpointModuleLoader;

/** @public */
export declare type NavigationType = 'initial' | 'form' | 'link' | 'popstate';

/** @public */
export declare interface PageModule extends RouteModule {
    readonly default: unknown;
    readonly head?: ContentModuleHead;
    readonly headings?: ContentHeading[];
    readonly onStaticGenerate?: StaticGenerateHandler;
}

/** @public */
export declare type PathParams = Record<string, string>;

declare type Prettify<T> = {} & {
    [K in keyof T]: T[K];
};

/** @public */
export declare interface QwikCityMockProps {
    url?: string;
    params?: Record<string, string>;
}

/** @public */
export declare const QwikCityMockProvider: Component<PropFunctionProps<QwikCityMockProps>>;

/** @public */
export declare interface QwikCityPlan {
    readonly routes: RouteData[];
    readonly serverPlugins?: RouteModule[];
    readonly basePathname?: string;
    readonly menus?: MenuData[];
    readonly trailingSlash?: boolean;
    readonly cacheModules?: boolean;
}

/** @public */
export declare interface QwikCityProps {
    /**
     * Enable the ViewTransition API
     *
     * Default: `true`
     *
     * @see https://github.com/WICG/view-transitions/blob/main/explainer.md
     * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     * @see https://caniuse.com/mdn-api_viewtransition
     */
    viewTransition?: boolean;
}

/** @public */
export declare const QwikCityProvider: Component<PropFunctionProps<QwikCityProps>>;

export { RequestEvent }

export { RequestEventAction }

export { RequestEventBase }

export { RequestEventCommon }

export { RequestEventLoader }

export { RequestHandler }

/** @public */
export declare type ResolvedDocumentHead<FrontMatter extends Record<string, any> = Record<string, unknown>> = Required<DocumentHeadValue<FrontMatter>>;

/** @public */
export declare const routeAction$: ActionConstructor;

/** @public */
export declare const routeActionQrl: ActionConstructorQRL;

/** @public */
export declare type RouteData = [routeName: string, loaders: ModuleLoader[]] | [
routeName: string,
loaders: ModuleLoader[],
originalPathname: string,
routeBundleNames: string[]
];

/** @public */
export declare const routeLoader$: LoaderConstructor;

/** @public */
export declare const routeLoaderQrl: LoaderConstructorQRL;

/** @public */
export declare interface RouteLocation {
    readonly params: Readonly<Record<string, string>>;
    readonly url: URL;
    readonly isNavigating: boolean;
    readonly prevUrl: URL | undefined;
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

/** @public */
export declare type RouteNavigate = QRL<(path?: string, options?: {
    type?: Exclude<NavigationType, 'initial'>;
    forceReload?: boolean;
    replaceState?: boolean;
    scroll?: boolean;
} | boolean) => Promise<void>>;

/** @public */
export declare const RouterOutlet: Component<PropFunctionProps<Record<any, any>>>;

/** @public */
export declare const server$: <T extends ServerFunction>(first: T) => ServerQRL<T>;

declare type ServerFunction = {
    (this: RequestEventBase, ...args: any[]): any;
};

/**
 * You can pass an AbortSignal as the first argument of a `server$` function and it will use it to
 * abort the fetch when fired.
 */
declare type ServerQRL<T extends ServerFunction> = QRL<((abort: AbortSignal, ...args: Parameters<T>) => ReturnType<T>) | ((...args: Parameters<T>) => ReturnType<T>)>;

/** @public */
export declare const serverQrl: <T extends ServerFunction>(qrl: QRL<T>) => ServerQRL<T>;

/** @public */
export declare const ServiceWorkerRegister: (props: {
    nonce?: string;
}) => JSXNode<"script">;

/** @public */
export declare interface StaticGenerate {
    params?: PathParams[];
}

/** @public */
export declare type StaticGenerateHandler = ({ env, }: {
    env: EnvGetter;
}) => Promise<StaticGenerate> | StaticGenerate;

/** @public */
export declare type StrictUnion<T> = Prettify<StrictUnionHelper<T, T>>;

declare type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;

/** @public */
export declare type TypedDataValidator<T extends zod.ZodType = zod.ZodType> = {
    __zod: zod.ZodSchema<T>;
    validate(ev: RequestEvent, data: unknown): Promise<zod.SafeParseReturnType<T, T>>;
};

declare type UnionKeys<T> = T extends T ? keyof T : never;

/** @public */
export declare const useContent: () => ContentState;

/**
 * Returns the document head for the current page. The generic type describes the front matter.
 *
 * @public
 */
export declare const useDocumentHead: <FrontMatter extends Record<string, unknown> = Record<string, any>>() => Required<Required<DocumentHeadValue<FrontMatter>>>;

/** @public */
export declare const useLocation: () => RouteLocation;

/** @public */
export declare const useNavigate: () => RouteNavigate;

/** @public */
export declare const validator$: ValidatorConstructor;

declare type ValidatorConstructor = {
    <T extends ValidatorReturn>(validator: (ev: RequestEvent, data: unknown) => ValueOrPromise<T>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
};

declare type ValidatorConstructorQRL = {
    <T extends ValidatorReturn>(validator: QRL<(ev: RequestEvent, data: unknown) => ValueOrPromise<T>>): T extends ValidatorReturnFail<infer ERROR> ? DataValidator<ERROR> : DataValidator<never>;
};

/** @public */
export declare const validatorQrl: ValidatorConstructorQRL;

/** @public */
export declare type ValidatorReturn<T extends Record<string, any> = {}> = ValidatorReturnSuccess | ValidatorReturnFail<T>;

declare type ValidatorReturnFail<T extends Record<string, any> = {}> = {
    readonly success: false;
    readonly error: T;
    readonly status?: number;
};

declare type ValidatorReturnSuccess = {
    readonly success: true;
    readonly data?: unknown;
};

export { z }

/** @public */
export declare const zod$: ZodConstructor;

/** @public */
export declare type ZodConstructor = {
    <T extends zod.ZodRawShape>(schema: T): TypedDataValidator<zod.ZodObject<T>>;
    <T extends zod.ZodRawShape>(schema: (z: typeof zod, ev: RequestEvent) => T): TypedDataValidator<zod.ZodObject<T>>;
    <T extends zod.Schema>(schema: T): TypedDataValidator<T>;
    <T extends zod.Schema>(schema: (z: typeof zod, ev: RequestEvent) => T): TypedDataValidator<T>;
};

/** @public */
declare type ZodConstructorQRL = {
    <T extends zod.ZodRawShape>(schema: QRL<T>): TypedDataValidator<zod.ZodObject<T>>;
    <T extends zod.ZodRawShape>(schema: QRL<(zs: typeof zod, ev: RequestEvent) => T>): TypedDataValidator<zod.ZodObject<T>>;
    <T extends zod.Schema>(schema: QRL<T>): TypedDataValidator<T>;
    <T extends zod.Schema>(schema: QRL<(z: typeof zod, ev: RequestEvent) => T>): TypedDataValidator<T>;
};

/** @public */
export declare const zodQrl: ZodConstructorQRL;

export { }
