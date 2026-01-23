const CACHE_NAME = 'horas-2026-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdn-icons-png.flaticon.com/512/2972/2972531.png'
];

// Instalación: guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación: Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devolverlo. Si no, pedir a internet.
        return response || fetch(event.request);
      })
  );
});

// Limpieza de cachés antiguas si actualizas la versión
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
