// Minimal service worker to satisfy installability (has a fetch handler)
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

// An empty fetch handler is enough for Chrome's PWA criteria
self.addEventListener('fetch', () => {});
