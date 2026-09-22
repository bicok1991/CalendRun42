/**
 * CalenRun42 — Service Worker
 * 
 * Strategia: Cache-First per asset statici, Network-First per tutto il resto.
 * Permette il funzionamento offline completo dell'app.
 */

const CACHE_NAME = 'calenrun42-v1';

// Asset da precachare all'installazione
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json'
];

// ─── Install: precache degli asset ───────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate: pulizia vecchie cache ─────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── Fetch: Cache-First con fallback network ─────────
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) {
          return cached;
        }
        return fetch(event.request)
          .then(response => {
            // Non cachare richieste non-GET o cross-origin
            if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
              return response;
            }
            // Cacha la risposta per uso futuro
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));
            return response;
          });
      })
  );
});
