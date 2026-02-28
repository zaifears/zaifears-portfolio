// Service Worker - zaifears.vercel.app
// Minimal SW to enable PWA installability without causing load stalls

const CACHE_NAME = 'zaifears-v1';

// Only cache these static assets
const STATIC_ASSETS = [
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  // Skip waiting so new SW activates immediately on update
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Silently fail if any asset can't be cached
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  // NOTE: We intentionally do NOT call self.clients.claim() here.
  // clients.claim() can intercept in-flight requests mid-page-load
  // and cause the browser to stall on first visit. The new SW will
  // take control naturally on the next page load instead.
  
  event.waitUntil(
    // Clean up old caches from previous SW versions
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // For navigation requests (HTML pages), always go network-first.
  // This ensures users always get the latest page content and avoids
  // stale HTML being served from cache.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        // If network fails (offline), try cache as fallback
        return caches.match(request);
      })
    );
    return;
  }

  // For static assets (images, fonts, etc.), use cache-first
  if (
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
  }
});
