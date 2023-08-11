/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith('/_')) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  // createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
  async ({ event }) => {
    try {
      // 네비게이션 요청 성공 시 캐시된 리소스 반환
      return await caches.match(event.request);
    } catch (error) {
      // 네비게이션 요청 실패 시 오프라인 페이지 반환
      return caches.match('./offline.html'); // 실제 오프라인 페이지의 경로로 수정
    }
  }
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 캐시 이름
const CACHE_NAME = "cache-v1";

// // 캐싱할 파일
// const FILES_TO_CACHE = [
//     "./offline.html"
// ];

// // 상술한 파일 캐싱
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
//     );
// });

// // CACHE_NAME이 변경되면 오래된 캐시 삭제
// self.addEventListener("activate", (event) => {
//     event.waitUntil(
//         caches.keys().then((keyList) =>
//             Promise.all(
//                 keyList.map((key) => {
//                     if (CACHE_NAME !== key) return caches.delete(key);
//                 })
//             )
//         )
//     );
// });

// 요청에 실패하면 오프라인 페이지 표시
self.addEventListener("fetch", (event) => {
    if ("navigate" !== event.request.mode) return;

    event.respondWith(
        fetch(event.request).catch(() =>
            caches
                .open(CACHE_NAME)
                .then((cache) => cache.match("./offline.html"))
        )
    );
});

// Any other custom service worker logic can go here.