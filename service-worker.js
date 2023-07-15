const cacheName = 'model-viewer-cache-v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching Files');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activating');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('[Service Worker] Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetching', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
