import { onMount, onDestroy } from 'svelte';
import { writable, type Readable } from 'svelte/store';

type ScrollProgressOptions = {
	/**
	 * Extra pixels added before/after the section to smooth the progress.
	 * Can be a static number or a function that returns a value based on the current viewport/element.
	 */
	offset?: number | ((context: { rect: DOMRect; viewportHeight: number }) => number);
};

/**
 * Returns a readable store with a normalized 0-1 progress representing how much
 * of the provided section has been traversed inside the viewport.
 */
export function useScrollProgress(getNode: () => HTMLElement | null | undefined, options: ScrollProgressOptions = {}) {
	const { offset = 0 } = options;
	const progress = writable(0);
	let frame: number | null = null;

	function measure() {
		const node = getNode();
		if (!node) return;

		const rect = node.getBoundingClientRect();
		const viewportHeight = window.innerHeight || 1;
		const total = rect.height + viewportHeight;
		if (total <= 0) return;

		const computedOffset = typeof offset === 'function' ? offset({ rect, viewportHeight }) : offset ?? 0;
		const raw = 1 - Math.max(0, (rect.bottom - computedOffset) / (total + computedOffset));
		const clamped = Math.min(1, Math.max(0, raw));
		progress.set(clamped);
	}

	function queue() {
		if (frame !== null) return;
		frame = requestAnimationFrame(() => {
			frame = null;
			measure();
		});
	}

	function handleScroll() {
		queue();
	}

	function handleResize() {
		queue();
	}

	onMount(() => {
		queue();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);
		return () => {
			if (frame !== null) {
				cancelAnimationFrame(frame);
				frame = null;
			}
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});

	onDestroy(() => {
		if (frame !== null) {
			cancelAnimationFrame(frame);
			frame = null;
		}
	});

	return progress as Readable<number>;
}
