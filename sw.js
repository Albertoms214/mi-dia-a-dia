// Mi día a día: funciona sin conexión. Versión e3e1003361
const CACHE='mi-dia-e3e1003361';
const FILES=["./", "index.html", "manifest.webmanifest", "fonts.css", "manrope-latin-400-normal.woff2", "manrope-latin-500-normal.woff2", "manrope-latin-600-normal.woff2", "manrope-latin-700-normal.woff2", "manrope-latin-800-normal.woff2", "jspdf.umd.min.js", "jspdf.plugin.autotable.min.js", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(k=>k.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c))}return res})));
});
