var cacheName = 'petstore-v1'
var cacheFiles =[
    'index.html',
    'products.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.jpg',

];

self.addEventListener('install',(e) =>{
    console.log('[Service Worker] Install')
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles)
        })
    );
});

// self.addEventListener('fetch',function(e){
//     e.respondWith(
//         caches.match(e.request).then(function (r){
//             console.log('[Service Worker] Fetching Resource: ' + e.request.url);
//             return r
//         })
//     );
// });

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            console.log('[Service Worker] Fetching Resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    );
});