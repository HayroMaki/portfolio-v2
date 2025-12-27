import { onMount, onDestroy } from 'svelte';
import { writable, type Readable } from 'svelte/store';

type VisibilityOptions = {
	threshold?: number | number[];
	root?: Element | Document | null;
	rootMargin?: string;
	/**
	 * When true (default), the observer disconnects after the first intersecting event.
	 */
	once?: boolean;
};

type VisibilityResult = {
	visible: Readable<boolean>;
	refresh(): void;
};

/**
 * Shared helper around IntersectionObserver that exposes a readable store.
 * Pass a getter returning the element reference so it can be lazily resolved after mount.
 */
export function useIntersectionVisibility(
	getNode: () => HTMLElement | null | undefined,
	options: VisibilityOptions = {}
): VisibilityResult {
	const { threshold = 0.35, root = null, rootMargin = '0px', once = true } = options;
	const visible = writable(false);
	let observer: IntersectionObserver | null = null;
	let currentNode: HTMLElement | null | undefined = null;

	function cleanup() {
		observer?.disconnect();
		observer = null;
	}

	function observe() {
		cleanup();
		currentNode = getNode();
		if (!currentNode) return;

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					visible.set(true);
					if (once) {
						cleanup();
					}
				});
			},
			{
				threshold,
				root,
				rootMargin
			}
		);

		observer.observe(currentNode);
	}

	onMount(() => {
		observe();
		return cleanup;
	});

	onDestroy(cleanup);

	return {
		visible,
		refresh: observe
	};
}
