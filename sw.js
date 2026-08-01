const CACHE_VERSION = 'ijaz-kids-v2';
const ASSETS = [
  '.',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-192-maskable.png',
  'icon-512-maskable.png',
  'screenshot-narrow.png',
  'screenshot-wide.png'
];

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache=>{
      return Promise.allSettled(ASSETS.map(url=>cache.add(url)));
    }).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE_VERSION).map(k=>caches.delete(k)))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (event)=>{
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(response=>{
        if(response && response.status===200 && response.type==='basic'){
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache=> cache.put(event.request, clone));
        }
        return response;
      }).catch(()=> caches.match('index.html'));
    })
  );
});
