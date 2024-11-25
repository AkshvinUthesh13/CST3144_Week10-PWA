var cacheName = 'petstore-v1'
var cacheFiles =[
    'petDepot.html',
    'products.js',
    'petStore.webmanifest',
    'images/cat-litter.jpg',
    'images/cat-toy.jpg',
    'images/dog-food.jpg',
    'images/dog-shampoo.png',
    'images/pet-carrier.jpg',
    'images/dog-treats.png',
    'images/fullsize-product1.jpg',
    'images/product-fullsize.png',
    'images/scratching-post.jpg',
    'images/icon-store-512.png',

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