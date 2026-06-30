// Service Worker für 1LIVE Player PWA
// Minimal – nur für Installierbarkeit, kein Offline-Cache
// (Radio-Streams können nicht gecacht werden)

const CACHE_NAME = '1live-player-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Netzwerk-first: alles direkt durchleiten
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => {
    return new Response('Offline – bitte Internetverbindung prüfen.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }));
});
