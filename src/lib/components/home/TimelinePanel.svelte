<script lang="ts">
	import { onMount } from 'svelte';
	import TimelineMarker from './TimelineMarker.svelte';

    let {t = (slug: string) => null, index = 0, visible = false, register = null } = $props()
	let panelRef: HTMLElement;

	onMount(() => {
		register?.(panelRef ?? null);
		return () => register?.(null);
	});
</script>

<article
	class="timeline-panel relative"
	data-visible={visible}
	data-align={t('journey.items.' + index + '.align') ?? (index % 2 === 0 ? 'left' : 'right')}
	data-timeline-index={index}
	bind:this={panelRef}
>
	<TimelineMarker visible={visible} align={t('journey.items.' + index + '.align') ?? (index % 2 === 0 ? 'left' : 'right')} />

	<div class="timeline-panel__body grid gap-8 md:grid-cols-2 md:items-center">
		<div class="timeline-panel__content timeline-panel__text space-y-3" style="--stagger: 0ms">
			<p class="text-xs font-mono uppercase tracking-[0.4em] text-accent">
				Arc {index + 1} — {t('journey.items.' + index + '.year')}
			</p>
			<p class="text-3xl font-display uppercase tracking-[0.2em]">{t('journey.items.' + index + '.title')}</p>
			<p class="mt-2 text-sm font-mono text-paper/70 leading-relaxed">{t('journey.items.' + index + '.description')}</p>
		</div>

		<div class="timeline-panel__content timeline-panel__card" style="--stagger: 120ms">
			<div class="p-6">
				<div class="flex items-center justify-between text-xs font-mono uppercase tracking-[0.4em] text-paper/70">
					<span>FEATS</span>
				</div>
				<div class="mt-5 space-y-3">
					{#if t('journey.items.' + index + '.sub_events') && t('journey.items.' + index + '.sub_events').length}
						<ul class="space-y-2 font-mono text-sm text-paper/80">
							{#each t('journey.items.' + index + '.sub_events') as sub, i}
								<li class="timeline-panel__subitem flex items-start gap-2" style="--subitem-index: {i};">
									<span class="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
									<span>{sub}</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="font-mono text-sm text-paper/60 leading-relaxed">{t('misc.empty_list')}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</article>

<style>
	.timeline-panel {
		--panel-offset: 0px;
		--panel-tilt: 0deg;
	}

	.timeline-panel__body {
		--panel-offset: 0px;
		--panel-tilt: 0deg;
		opacity: 0;
		transform: translate3d(0, 30px, 0) scale(0.97);
		transition: opacity 0.65s ease, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.timeline-panel[data-align='left'] .timeline-panel__body {
		--panel-offset: -40px;
		--panel-tilt: -0.6deg;
	}

	.timeline-panel[data-align='right'] .timeline-panel__body {
		--panel-offset: 40px;
		--panel-tilt: 0.6deg;
	}

	.timeline-panel[data-visible='true'] .timeline-panel__body {
		opacity: 1;
		transform: translate3d(0, 0, 0) scale(1);
	}

	@media (min-width: 768px) {
		.timeline-panel__body {
			transform: translate3d(var(--panel-offset), 30px, 0) rotate(var(--panel-tilt)) scale(0.98);
		}

		.timeline-panel[data-visible='true'] .timeline-panel__body {
			transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
		}

		.timeline-panel[data-align='right'] .timeline-panel__text {
			text-align: right;
			order: 2;
		}

		.timeline-panel[data-align='right'] .timeline-panel__card {
			order: 1;
		}
	}

	.timeline-panel__content {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.55s ease, transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
		transition-delay: var(--stagger, 0ms);
	}

	.timeline-panel[data-visible='true'] .timeline-panel__content {
		opacity: 1;
		transform: translateY(0);
	}

	.timeline-panel__card .manga-panel {
		position: relative;
		overflow: hidden;
	}

	.timeline-panel__card .manga-panel::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(120deg, rgba(255, 255, 255, 0.08), transparent 65%);
		transform: translateX(-105%);
	}

	.timeline-panel[data-visible='true'] .timeline-panel__card .manga-panel::before {
		animation: panel-shine 1.6s cubic-bezier(0.23, 1, 0.32, 1) 0.5s forwards;
	}

	.timeline-panel__subitem {
		opacity: 0;
		transform: translateX(-8px);
	}

	.timeline-panel[data-visible='true'] .timeline-panel__subitem {
		animation: 
			subitem-pop
			0.5s
			cubic-bezier(0.23, 1, 0.32, 1)
			forwards
			calc(0.5s + var(--subitem-index, 0) * 120ms);
	}

	@keyframes panel-shine {
		to {
			transform: translateX(105%);
		}
	}

	@keyframes subitem-pop {
		from {
			opacity: 0;
			transform: translateX(-8px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
