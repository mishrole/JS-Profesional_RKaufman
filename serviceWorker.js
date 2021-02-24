const VERSION = "v1";

// Self es similar al this pero para Service Workers
self.addEventListener('install', event => {
    // Pre-cache
    event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
    // Extraer la petición
    const request = event.request;
    // Sólo queremos hacer algo con la petición GET
    if(request.method !== 'GET') {
        return;
    }

    // Buscar en el caché
    event.respondWith(cachedResponse(request))

    // Actualizar cache
    event.waitUntil(updateCache(request))
})

async function precache() {
    // parte del API del DOM, regresa una promesa
    const cache = await caches.open(VERSION);
    // añadimos todos estos elementos al caché
    return cache.addAll([
        './',
        './index.html',
        './assets/index.js',
        './assets/MediaPlayer.js',
        './assets/plugins/AutoPlay.js',
        './assets/plugins/AutoPause.js',
        './assets/index.css',
        './assets/BigBuckBunny.mp4',   
    ])
}

async function cachedResponse(request) {
    // Instanciamos caché (devuelve promesa) para tener acceso a "v1"
    const cache = await caches.open(VERSION);
    // Usamos match para preguntar:
    // ¿Tienes una copia que le corresponde al request?
    const response = await cache.match(request);
    console.log(response)
    // Si no tiene la información en caché, la respuesta es Undefined
    // Si es Undefined, entonces haz la petición
    return response || fetch(request) 
}

// El usuario siempre recibe contenido actualizado
async function updateCache(request) {
    // Instanciamos caché (devuelve promesa) para tener acceso a "v1"
    const cache = await caches.open(VERSION);
    // Buscamos una copia actualizada
    const response = await fetch(request);
    // Añadimos nuevo contenido al caché
    return cache.put(request, response)
}