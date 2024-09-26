const getCacheToDelete = (appBundles, cachedUrls) => cachedUrls.filter((url) => !appBundles.some((appBundle) => url.endsWith(appBundle[0])));
const useCache = (request, response) => !!response && !hasNoCacheHeader(response);
const hasNoCacheHeader = (r) => {
    const cacheControl = r.headers.get('Cache-Control') || '';
    return cacheControl.includes('no-cache') || cacheControl.includes('max-age=0');
};
const isAppBundleRequest = (appBundles, requestPathname) => appBundles.some((b) => requestPathname.endsWith('/' + b[0]));
const getAppBundleByName = (appBundles, appBundleName) => appBundles.find((b) => b[0] === appBundleName);
const getAppBundlesNamesFromIds = (appBundles, bundleIds) => bundleIds.map((bundleId) => (appBundles[bundleId] ? appBundles[bundleId][0] : null));
const resolveSymbols = (appSymbols, symbolsHashes) => symbolsHashes.map((s) => appSymbols.get(s)).filter((s) => s != null);
const computeAppSymbols = (appBundles) => {
    const appSymbols = new Map();
    for (const bundle of appBundles) {
        const hashes = bundle[2];
        if (hashes) {
            for (const hash of hashes) {
                appSymbols.set(hash, bundle[0]);
            }
        }
    }
    return appSymbols;
};

const cachedFetch = (cache, fetch, awaitingRequests, request) => new Promise((promiseResolve, promiseReject) => {
    const url = request.url;
    const awaitingRequestResolves = awaitingRequests.get(url);
    if (awaitingRequestResolves) {
        // there's already an active request happening
        // don't start a new request
        awaitingRequestResolves.push([promiseResolve, promiseReject]);
    }
    else {
        // there isn't already an active request for this url
        // start a new request
        const resolve = (response) => {
            // the response has been resolved
            const resolves = awaitingRequests.get(url);
            if (resolves) {
                awaitingRequests.delete(url);
                // loop through each of the active requests
                for (const [awaitingResolve] of resolves) {
                    // clone a new response for each of the active requests
                    awaitingResolve(response.clone());
                }
            }
            else {
                // somehow the array of awaiting requests doesn't exist
                promiseResolve(response.clone());
            }
        };
        const reject = (msg) => {
            const resolves = awaitingRequests.get(url);
            if (resolves) {
                awaitingRequests.delete(url);
                for (const [_, awaitingReject] of resolves) {
                    awaitingReject(msg);
                }
            }
            else {
                promiseReject(msg);
            }
        };
        // create a new array of the request waiting to be resolved
        awaitingRequests.set(url, [[promiseResolve, promiseReject]]);
        cache
            .match(url)
            .then((cachedResponse) => {
            if (useCache(request, cachedResponse)) {
                // cached response found and user did not specifically send
                // a request header to NOT use the cache (wasn't a hard refresh)
                resolve(cachedResponse);
            }
            else {
                // no cached response found or user didn't want to use the cache
                // do a full network request
                return fetch(request).then(async (networkResponse) => {
                    if (networkResponse.ok) {
                        // network response was good, let's cache it
                        await cache.put(url, networkResponse.clone());
                    }
                    resolve(networkResponse);
                });
            }
        })
            .catch((err) => {
            // network error, probably offline
            return cache.match(url).then((cachedResponse) => {
                if (cachedResponse) {
                    // luckily we have a cached version, let's use it instead of an offline message
                    resolve(cachedResponse);
                }
                else {
                    // darn, we've got no connectivity and no cached response
                    reject(err);
                }
            });
        });
    }
});

const qBuildCacheName = 'QwikBuild';
const existingPrefetchUrls = new Set();
const awaitingRequests = new Map();
const prefetchQueue = [];

const prefetchBundleNames = (appBundles, qBuildCache, fetch, baseUrl, prefetchAppBundleNames, highPriority = false) => {
    if (Array.isArray(prefetchAppBundleNames)) {
        addBundlesToPrefetchQueue(prefetchAppBundleNames, appBundles, baseUrl, highPriority);
    }
    drainQueue(qBuildCache, fetch);
};
function addBundlesToPrefetchQueue(bundlesToPrefetch, appBundles, baseUrl, highPriority) {
    for (const prefetchAppBundleName of bundlesToPrefetch) {
        try {
            const appBundle = getAppBundleByName(appBundles, prefetchAppBundleName);
            if (appBundle) {
                const importedBundleNames = getAppBundlesNamesFromIds(appBundles, appBundle[1]);
                const url = new URL(prefetchAppBundleName, baseUrl).href;
                const queueIndex = prefetchQueue.indexOf(url);
                if (queueIndex > -1) {
                    // already in the queue
                    if (highPriority) {
                        // move to the front of the queue
                        prefetchQueue.splice(queueIndex, 1);
                        prefetchQueue.unshift(url);
                    }
                }
                else {
                    if (highPriority) {
                        // add to the front of the queue
                        prefetchQueue.unshift(url);
                    }
                    else {
                        // add to the end of the queue
                        prefetchQueue.push(url);
                    }
                    addBundlesToPrefetchQueue(importedBundleNames, appBundles, baseUrl, highPriority);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}
function drainQueue(qBuildCache, fetch) {
    // do not prefetch more than 6 requests at a time to ensure
    // the browser is able to handle a user request as soon as possible
    while (prefetchQueue.length > 0 && awaitingRequests.size < 6) {
        const url = prefetchQueue.shift();
        if (!existingPrefetchUrls.has(url)) {
            const request = new Request(url);
            existingPrefetchUrls.add(url);
            cachedFetch(qBuildCache, fetch, awaitingRequests, request)
                .catch(() => {
                existingPrefetchUrls.delete(url);
            })
                .finally(() => drainQueue(qBuildCache, fetch));
        }
    }
}
const prefetchLinkBundles = (appBundles, libraryBundleIds, linkBundles, qBuildCache, fetch, baseUrl, linkPathnames) => {
    try {
        prefetchBundleNames(appBundles, qBuildCache, fetch, baseUrl, getAppBundlesNamesFromIds(appBundles, libraryBundleIds));
    }
    catch (e) {
        console.error(e);
    }
    for (const linkPathname of linkPathnames) {
        try {
            for (const linkBundle of linkBundles) {
                const [route, linkBundleIds] = linkBundle;
                console;
                if (route.test(linkPathname)) {
                    prefetchBundleNames(appBundles, qBuildCache, fetch, baseUrl, getAppBundlesNamesFromIds(appBundles, linkBundleIds));
                    break;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
};
const prefetchWaterfall = (appBundles, qBuildCache, fetch, requestedBuildUrl) => {
    try {
        const { baseUrl, requestedBundleName } = splitUrlToBaseAndBundle(requestedBuildUrl);
        prefetchBundleNames(appBundles, qBuildCache, fetch, baseUrl, [requestedBundleName], true);
    }
    catch (e) {
        console.error(e);
    }
};
function splitUrlToBaseAndBundle(fullUrl) {
    const segments = fullUrl.href.split('/');
    const requestedBundleName = segments[segments.length - 1];
    segments[segments.length - 1] = '';
    const baseUrl = new URL(segments.join('/'));
    return {
        baseUrl,
        requestedBundleName,
    };
}

const setupServiceWorkerScope = (swScope, appBundles, libraryBundleIds, linkBundles) => {
    const swFetch = swScope.fetch.bind(swScope);
    const appSymbols = computeAppSymbols(appBundles);
    swScope.addEventListener('activate', (event) => {
        (async () => {
            try {
                // Delete any other caches that are not the current SW cache name
                event.waitUntil(swScope.caches.keys().then((keys) => Promise.all(keys.map((key) => {
                    if (key !== qBuildCacheName) {
                        return caches.delete(key);
                    }
                }))));
                // Delete old bundles
                const qBuildCache = await swScope.caches.open(qBuildCacheName);
                const cachedRequestKeys = await qBuildCache.keys();
                const cachedUrls = cachedRequestKeys.map((r) => r.url);
                const cachedRequestsToDelete = getCacheToDelete(appBundles, cachedUrls);
                await Promise.all(cachedRequestsToDelete.map((r) => qBuildCache.delete(r)));
            }
            catch (e) {
                console.error(e);
            }
        })();
    });
    swScope.addEventListener('message', async ({ data }) => {
        if (data.type === 'qprefetch' && typeof data.base === 'string') {
            const qBuildCache = await swScope.caches.open(qBuildCacheName);
            const baseUrl = new URL(data.base, swScope.origin);
            if (Array.isArray(data.links)) {
                prefetchLinkBundles(appBundles, libraryBundleIds, linkBundles, qBuildCache, swFetch, baseUrl, data.links);
            }
            if (Array.isArray(data.bundles)) {
                prefetchBundleNames(appBundles, qBuildCache, swFetch, baseUrl, data.bundles);
            }
            if (Array.isArray(data.symbols)) {
                prefetchBundleNames(appBundles, qBuildCache, swFetch, baseUrl, resolveSymbols(appSymbols, data.symbols));
            }
        }
    });
    swScope.addEventListener('fetch', (event) => {
        const request = event.request;
        if (request.method === 'GET') {
            const url = new URL(request.url);
            if (isAppBundleRequest(appBundles, url.pathname)) {
                event.respondWith(swScope.caches.open(qBuildCacheName).then((qBuildCache) => {
                    prefetchWaterfall(appBundles, qBuildCache, swFetch, url);
                    return cachedFetch(qBuildCache, swFetch, awaitingRequests, request);
                }));
            }
        }
    });
};

/** @public */
const setupServiceWorker = () => {
    if (typeof self !== 'undefined' && typeof appBundles !== 'undefined') {
        setupServiceWorkerScope(self, appBundles, libraryBundleIds, linkBundles);
    }
};

export { setupServiceWorker };
