// ABOUTME: Service worker caching core game assets so the app is installable and works offline.
// ABOUTME: Uses cache-first strategy with a versioned cache name for easy invalidation on updates.
const CACHE="kucinglari-v1";
const ASSETS=["./","./index.html","./style.css","./game.js","./ui.js","./data.js","./storage.js","./icons.js","./audio.js","./particles.js","./manifest.json","./icon-192.png","./icon-512.png"];

self.addEventListener("install",e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
 self.skipWaiting();
});
self.addEventListener("activate",e=>{
 e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
 self.clients.claim();
});
self.addEventListener("fetch",e=>{
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
