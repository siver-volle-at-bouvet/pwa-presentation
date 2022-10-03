/* Based on Mozilla Developer Networks guide: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers */

const cacheName = 'pwa-presentation-basic-v1';
const contentToCache = [
  '/pwa-presentation/basic/icon.png',
  '/pwa-presentation/basic/manifest.webmanifest',
  '/pwa-presentation/basic/index.html',
  '/pwa-presentation/basic/script.js',
  '/pwa-presentation/basic/style.css',
  '/pwa-presentation/basic/sw.js',
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all');
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
