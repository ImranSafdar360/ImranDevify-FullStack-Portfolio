// Kill-switch service worker. The old site registered a PWA service worker
// at this path; browsers that visited it keep that worker (and its caches)
// for this origin indefinitely. The rebuilt site does not use a service
// worker, so this replacement unregisters itself, deletes all caches, and
// reloads any open tabs so they leave SW control. Keep this file deployed
// until old-site traffic has cycled out.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
