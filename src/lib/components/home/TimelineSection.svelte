<script lang="ts">
	import { onMount } from 'svelte';
	import TimelinePanel from './TimelinePanel.svelte';

	let { t = (slug: string) => null, sectionId = 'timeline' } = $props();

	const timelineItems = $derived(t('journey.items') ?? []);
	const totalTimelinePanels = $derived(timelineItems.length);
	let timelineVisible = $state(false);
	let timelinePanelsVisible = $state<boolean[]>([]);
	let timelinePanelObserver: IntersectionObserver | null = null;
	const timelinePanelNodes = new Map<number, HTMLElement>();
	let timelineSectionRef: HTMLElement;
	let timelineWrapperRef: HTMLElement;
	let timelineSpineProgress = $state(0);
	let timelineProgressRaf: number | null = null;
	let maxTimelineSpineProgress = 0;

	$effect(() => {
		if (timelinePanelsVisible.length !== totalTimelinePanels) {
			timelinePanelsVisible = Array.from({ length: totalTimelinePanels }, () => false);
			maxTimelineSpineProgress = 0;
			timelineSpineProgress = 0;
		}
	});

	onMount(() => {
		const sectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					timelineVisible = true;
					sectionObserver.unobserve(entry.target);
				});
			},
			{ threshold: 0.35 }
		);

		if (timelineSectionRef) {
			sectionObserver.observe(timelineSectionRef);
		}

		timelinePanelObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const indexAttr = entry.target.getAttribute('data-timeline-index');
					if (!indexAttr) return;
					const index = Number(indexAttr);
					if (Number.isNaN(index)) return;
					timelinePanelsVisible = timelinePanelsVisible.with(index, true);
					updateSpineProgressFromPanel(index);
					timelinePanelObserver?.unobserve(entry.target);
				});
			},
			{ threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
		);

		timelinePanelNodes.forEach((node) => timelinePanelObserver?.observe(node));

		const handleTimelineScroll = () => queueTimelineProgressUpdate();

		window.addEventListener('scroll', handleTimelineScroll, { passive: true });
		window.addEventListener('resize', handleTimelineScroll);

		queueTimelineProgressUpdate();

		return () => {
			sectionObserver.disconnect();
			timelinePanelObserver?.disconnect();
			window.removeEventListener('scroll', handleTimelineScroll);
			window.removeEventListener('resize', handleTimelineScroll);
			if (timelineProgressRaf !== null) {
				cancelAnimationFrame(timelineProgressRaf);
				timelineProgressRaf = null;
			}
		};
	});

	function registerTimelinePanel(index: number) {
		return (node: HTMLElement | null) => {
			const previous = timelinePanelNodes.get(index);
			if (previous && timelinePanelObserver) {
				timelinePanelObserver.unobserve(previous);
			}

			if (!node) {
				timelinePanelNodes.delete(index);
				return;
			}

			timelinePanelNodes.set(index, node);
			if (timelinePanelObserver) {
				timelinePanelObserver.observe(node);
			}
		};
	}

	function queueTimelineProgressUpdate() {
		if (typeof window === 'undefined') return;
		if (timelineProgressRaf !== null) return;

		timelineProgressRaf = requestAnimationFrame(() => {
			timelineProgressRaf = null;
			updateTimelineSpineProgress();
		});
	}

	function updateTimelineSpineProgress() {
		if (!timelineSectionRef) return;

		const sectionRect = timelineSectionRef.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		if (sectionRect.height === 0 || viewportHeight === 0) return;

		const scrollProgress =
			1 - Math.max(0, (sectionRect.bottom - viewportHeight * 0.2) / (sectionRect.height + viewportHeight * 0.2));
		applyTimelineProgress(scrollProgress);
	}

	function updateSpineProgressFromPanel(index: number) {
		if (totalTimelinePanels === 0) return;
		const node = timelinePanelNodes.get(index);
		const normalized =
			index === totalTimelinePanels - 1
				? 1
				: measurePanelProgress(node) ?? Math.min(1, (index + 1) / totalTimelinePanels);
		applyTimelineProgress(normalized);
	}

	function measurePanelProgress(node: HTMLElement | undefined) {
		if (!node || !timelineWrapperRef) return null;
		const wrapperRect = timelineWrapperRef.getBoundingClientRect();
		const panelRect = node.getBoundingClientRect();
		const wrapperHeight = wrapperRect.height;
		if (wrapperHeight <= 0) return null;
		const panelCenter = panelRect.top + panelRect.height / 2;
		const progressPx = panelCenter - wrapperRect.top;
		return Math.min(1, Math.max(0, progressPx / wrapperHeight));
	}

	function applyTimelineProgress(rawProgress: number) {
		const normalized = Math.min(1, Math.max(0, rawProgress));
		const nextProgress = Math.max(normalized, maxTimelineSpineProgress);

		if (nextProgress === maxTimelineSpineProgress) return;

		maxTimelineSpineProgress = nextProgress;
		timelineSpineProgress = nextProgress;
	}
</script>

<section
	id={sectionId}
	class="relative py-32 overflow-hidden bg-ink text-paper"
	bind:this={timelineSectionRef}
>
	<div class="absolute inset-0 opacity-10 bg-paper-fiber mix-blend-screen pointer-events-none"></div>
	<div class="container relative z-10 mx-auto max-w-5xl px-6">
		<div
			class="text-center space-y-4 transition-all duration-700"
			class:opacity-0={!timelineVisible}
			class:-translate-y-6={!timelineVisible}
		>
			<div class="inline-flex px-4 py-2 border border-paper/60 uppercase font-mono tracking-[0.4em]">
				{t('journey.badge')}
			</div>
			<h2 class="text-5xl font-display uppercase tracking-[0.35em]">
				{t('journey.title')}
				<span class="text-accent"> {t('journey.title_highlight')}</span>
			</h2>
		</div>

		<div
			class="mt-16 relative timeline-wrapper"
			data-visible={timelineVisible}
			style={`--spine-progress: ${timelineSpineProgress * 100}%`}
			bind:this={timelineWrapperRef}
		>
			<div class="timeline-spine" aria-hidden="true"></div>
			<div class="timeline-spine__glow" aria-hidden="true"></div>
			<div class="relative z-1 flex flex-col gap-32">
				{#each timelineItems as _, index}
					<TimelinePanel
						t={t}
						index={index}
						visible={timelinePanelsVisible[index]}
						register={registerTimelinePanel(index)}
					/>
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.timeline-wrapper {
		position: relative;
		padding-block: 6rem;
		color: theme('colors.paper');
		--spine-progress: 0%;
	}

	.timeline-spine {
		position: absolute;
		inset: 0;
		margin: 0 auto;
		width: 2px;
		background: transparent;
		overflow: hidden;
		border-radius: 999px;
		mask-image: linear-gradient(to bottom, transparent, white 10%, white 90%, transparent);
	}

	.timeline-spine::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: var(--spine-progress, 0%);
		background: linear-gradient(
			to bottom,
			transparent 0%,
			theme('colors.paper') 15%,
			theme('colors.paper') 85%,
			transparent 100%
		);
		opacity: 0.85;
		transition: height 0.55s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: height;
	}

	.timeline-spine__glow {
		position: absolute;
		inset: 0;
		margin: 0 auto;
		width: 4px;
		background: transparent;
		filter: blur(12px);
		opacity: 0;
		transition: opacity 0.6s ease;
		overflow: hidden;
	}

	.timeline-spine__glow::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: var(--spine-progress, 0%);
		background: radial-gradient(circle, rgba(255, 255, 255, 0.35), transparent 70%);
		transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: height;
	}

	.timeline-wrapper[data-visible='true'] .timeline-spine__glow {
		opacity: clamp(var(--spine-progress, 0%), 0, 1);
	}

	@media (max-width: 767px) {
		.timeline-spine,
		.timeline-spine__glow {
			display: none;
		}
	}
</style>
