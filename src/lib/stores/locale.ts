import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Locale } from '$lib/i18n';

const storedLocale = browser ? (localStorage.getItem('locale') || 'fr') : 'fr';
export const locale = writable<Locale>(storedLocale as Locale);

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
	});
}
