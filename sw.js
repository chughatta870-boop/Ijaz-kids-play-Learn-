const CACHE_VERSION = 'ijaz-kids-v3';
const FONT_CACHE = 'ijaz-kids-fonts-v1';

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
      Promise.all(
        keys
          .filter(k=> k!==CACHE_VERSION && k!==FONT_CACHE)
          .map(k=> caches.delete(k))
      )
    ).then(()=> self.clients.claim())
     .then(()=> self.clients.matchAll())
     .then(clients=> clients.forEach(c=> c.postMessage({ type:'SW_UPDATED' })))
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);
  const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  // Google Fonts: stale-while-revalidate so Baloo 2 / Noto Nastaliq Urdu
  // keep working fully offline after the first successful load.
  if(isGoogleFont){
    event.respondWith(
      caches.open(FONT_CACHE).then(cache=>
        cache.match(req).then(cached=>{
          const networkFetch = fetch(req).then(response=>{
            if(response && response.status===200) cache.put(req, response.clone());
            return response;
          }).catch(()=> cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // App shell: cache-first, falling back to network, falling back to offline shell
  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(response=>{
        if(response && response.status===200 && response.type==='basic'){
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache=> cache.put(req, clone));
        }
        return response;
      }).catch(()=>{
        if(req.mode === 'navigate') return caches.match('.');
        return caches.match('index.html');
      });
    })
  );
});
                       
