const cacheVersion = 'notes-v1';
const archives = [
    '/index.html',
    '/primitiveUI.css',
    '/css/style.css',
    '.',
    '/src/components/ReactiveState.js',
    '/src/app.js',
    '/src/movilDisplay.js',
    '/src/tasksDisplay.js',
    '/src/theme.js',
    '/src/animations/taskSavedAnimation.js',
];

self.addEventListener('install', e =>{
    e.waitUntil( 
        caches.open(cacheVersion)
            .then(cache => {
                cache.addAll(archives);
            })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== cacheVersion)
                        .map(key => caches.delete(key))
                )
            })
    );
});

self.addEventListener('fetch', async function(event) {
    await new Promise(function(res){setTimeout(function(){res("fetch request allowed")}, 9999)})
    return false
});