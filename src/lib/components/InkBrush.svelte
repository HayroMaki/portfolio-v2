<script lang="ts">
	import { onMount } from 'svelte';
	import brush1 from '$lib/assets/brush/brush1.svg?raw';
	import brush2 from '$lib/assets/brush/brush2.svg?raw';
	import brush3 from '$lib/assets/brush/brush3.svg?raw';

	type Stroke = {
		id: number;
		x: number;
		y: number;
		size: number;
		brushIndex: number;
		rotation: number;
		active: boolean;
		tick: number;
	};

	const MAX_STROKES = 30;
	const toDataUrl = (raw: string) => `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;
	const BRUSHES = [brush1, brush2, brush3].map(toDataUrl);

	const createStroke = (id: number): Stroke => ({
		id,
		x: -999,
		y: -999,
		size: 0,
		brushIndex: id % BRUSHES.length,
		rotation: 0,
		active: false,
		tick: 0
	});

	const buildPool = () => Array.from({ length: MAX_STROKES }, (_, i) => createStroke(i));

	let { enabled = true } = $props<{ enabled?: boolean }>();

	let strokes = $state<Stroke[]>(buildPool());
	let strokeId = 0;
	let lastPaint = 0;
	let poolIndex = 0;

	onMount(() => {
		const handlePointerMove = (event: PointerEvent) => {
			if (!enabled) return;
			if (event.pointerType === 'touch') return;

			const now = performance.now();
			if (now - lastPaint < 45) return; // throttle pour éviter trop de nodes
			lastPaint = now;

			const { clientX, clientY } = event;
			const size = 650 + Math.random() * 100;
			const brushIndex = Math.floor(Math.random() * BRUSHES.length);
			const rotation = Math.random() * 50 - 25;

			const index = poolIndex;
			poolIndex = (poolIndex + 1) % MAX_STROKES;

			strokes = strokes.with(index, {
				...strokes[index],
				id: strokeId++,
				x: clientX,
				y: clientY,
				size,
				brushIndex,
				rotation,
				active: true,
				tick: strokes[index].tick + 1
			});

			requestAnimationFrame(() => {
				if (!enabled) return;
				strokes = strokes.with(index, {
					...strokes[index],
					active: true
				});
			});
		};

		const handleVisibility = () => {
			if (document.hidden) {
				strokes = buildPool();
				strokeId = 0;
				poolIndex = 0;
			}
		};

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		document.addEventListener('visibilitychange', handleVisibility);

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			document.removeEventListener('visibilitychange', handleVisibility);
		};
	});
</script>

<div class="ink-overlay pointer-events-none" aria-hidden="true">
    {#each strokes as stroke (stroke.id)}
        {@const brushUrl = BRUSHES[stroke.brushIndex]}
        <span
            class={`ink-stroke brush-${stroke.brushIndex}`}
            data-active={stroke.active}
            style={`--x: ${stroke.x}px; --y: ${stroke.y}px; --size: ${stroke.size}px; --brush-url: url('${brushUrl}'); transform: rotate(${stroke.rotation}deg);`}
        ></span>
    {/each}
</div>

<style>
	.ink-overlay {
		position: fixed;
		inset: 0;
		z-index: 60;
		pointer-events: none;
		mix-blend-mode: difference;
	}

	.ink-stroke {
		position: absolute;
		left: calc(var(--x) - var(--size) / 2);
		top: calc(var(--y) - var(--size) / 2);
		width: var(--size);
		height: var(--size);
		background-color: transparent;
		background-image: var(--brush-url);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		filter: invert(1) contrast(120%) saturate(110%);
		opacity: 0.6;
		opacity: 0;
	}

	.ink-stroke[data-active='true'] {
		animation: brush-fade 900ms ease-out forwards;
		will-change: transform, opacity;
	}

	@keyframes brush-fade {
		from {
			opacity: 0.9;
			transform: scale(1);
		}
		70% {
			opacity: 0.45;
		}
		to {
			opacity: 0;
			transform: scale(1.1);
		}
	}
</style>
