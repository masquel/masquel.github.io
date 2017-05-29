/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */
'use strict';

function safeConfirm(params, cb) {
	if(typeof params === 'string') {
		params = {message: params}
	}
	var result = false;
	try {
		result = window.confirm(params.message);
	} catch (e) {
		console.log('error', e);
	} finally {
		cb(result);
	}
}

var declined = false;

function updateApplication() {
	if(!declined){
		safeConfirm({type: 'TROIKA_JOURNAL_UPDATED_RELOAD', message: 'Доступна новая версия. Обновить?'}, function(result){
			if(result){
				window.location.reload();
			} else {
				declined = true;
			}
		});
	}
}

if ('serviceWorker' in navigator) {
	// Your service-worker.js *must* be located at the top-level directory relative to your site.
	// It won't be able to control pages unless it's located at the same level or higher than them.
	// *Don't* register service worker file in, e.g., a scripts/ sub-directory!
	// See https://github.com/slightlyoff/ServiceWorker/issues/468
	navigator.serviceWorker.register('service-worker.js').then(function(reg) {
		console.log('[SW] Registered with scope:', reg.scope);
		// updatefound is fired if service-worker.js changes.
		reg.addEventListener('updatefound', function() {
			// The updatefound event implies that reg.installing is set; see
			// https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
			var installingWorker = reg.installing;

			installingWorker.addEventListener('statechange', function() {
				switch (installingWorker.state) {
					case 'installed':
						if (navigator.serviceWorker.controller) {
							// At this point, the old content will have been purged and the fresh content will
							// have been added to the cache.
							// It's the perfect time to display a "New content is available; please refresh."
							// message in the page's interface.
							console.log('[SW] Ready to update');
							updateApplication();
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a "Content is cached for offline use." message.
							console.log('[SW] Content is now available offline!');
						}
						break;

					case 'redundant':
						console.error('[SW] The installing service worker became redundant.');
						break;
				}
			});
		});
	}).catch(function(e) {
		console.error('[SW] Error during service worker registration:', e);
	});
}