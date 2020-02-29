const cache_name = "city-app-lite-v1.5.23";
var urlsToCache = [
    "/",
    "/icon.png", "/icon-3x-144.png",  
    "/manifest.json",

    "/img/notification.png", "/img/profile.jpg",
    "/img/banner.jpg",
    "/img/icon-1x-96.png", "/img/icon-2x-128.png", "/img/icon-3x-144.png",
    "/img/icon-4x-192.png", "/img/icon-5x-512.png",

    "/nav.html", "/match_detail.html", "/team_detail.html",
    "/index.html", "/player_detail.html",
    
    "/pages/home.html", "/pages/favorit.html",
    "/pages/klasemen.html", 
    "/pages/about.html",
    "/pages/match.html",

    "/css/fontawesome/fontawesome.min.css", "/css/fontawesome/all.min.css",
    "/css/materialize.min.css", "/css/style.css",
    
    "/css/webfonts/fa-brands-400.eot", "/css/webfonts/fa-brands-400.svg", "/css/webfonts/fa-brands-400.ttf",
    "/css/webfonts/fa-brands-400.woff", "/css/webfonts/fa-brands-400.woff2",
    "/css/webfonts/fa-regular-400.eot", "/css/webfonts/fa-regular-400.svg", "/css/webfonts/fa-regular-400.ttf",
    "/css/webfonts/fa-regular-400.woff", "/css/webfonts/fa-regular-400.woff2",
    "/css/webfonts/fa-solid-900.eot", "/css/webfonts/fa-solid-900.svg", "/css/webfonts/fa-solid-900.ttf",
    "/css/webfonts/fa-solid-900.woff", "/css/webfonts/fa-solid-900.woff2",  

    "/js/allcity-match.js", "/js/api.js", "/js/app-db.js", "/js/city-upcoming.js", "/js/firstreq.js",
    "/js/helper.js", "/js/idb.js", "/js/klasemen.js", "/js/main-db.js", "/js/match-detail.js",
    "/js/match-list.js", "/js/materialize.js", "/js/materialize.min.js", "/js/nav.js",
    "/js/other-details.js"

];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cache_name).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(cache_name).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true}).then(function(response) {
                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return response || fetch (event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil (
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != cache_name) {
                        console.log("ServiceWorker: cache" + cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'push message no payload';
    }

    var options = {
        body: body,
        icon: '/img/notification.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});