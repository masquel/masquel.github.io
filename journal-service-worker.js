var precacheConfig = [];

var cacheName = 'TroikaJournalAssetsCache';

seld.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll([]);
		});
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.filter(function(cache){
				return cacheName === cache
			})).map(function(cache) {
				return caches.delete(cache)
			})
		})
	);
});

self.addEventListener('fetch', function() {
	
});