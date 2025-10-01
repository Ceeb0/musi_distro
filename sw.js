const CACHE_NAME = 'cacs-distro-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
];
const DYNAMIC_CACHE_NAME = 'cacs-distro-dynamic-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Use stale-while-revalidate for all GET requests to keep the app fast and offline-capable.
    if (request.method === 'GET') {
        event.respondWith(staleWhileRevalidate(request));
    }
});

function staleWhileRevalidate(request) {
    return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
            const fetchPromise = fetch(request).then(networkResponse => {
                // Check if we received a valid response
                if (networkResponse && networkResponse.status === 200) {
                    cache.put(request, networkResponse.clone());
                }
                return networkResponse;
            }).catch(err => {
                console.error('Fetch failed; returning cached response if available.', err);
                // If fetch fails, the cachedResponse will be returned if it exists.
            });

            return cachedResponse || fetchPromise;
        });
    });
}
