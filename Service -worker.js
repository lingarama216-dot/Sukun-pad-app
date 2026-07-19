self.addEventListener('install', e => e.waitUntil(caches.open('sukoon-v1')));
self.addEventListener('fetch', e => e.respondWith(fetch(e.request)));
