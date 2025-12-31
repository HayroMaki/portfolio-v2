<script lang="ts">
	import { onMount } from 'svelte';
	import type { ComponentType } from 'svelte';

	interface Actor {
		id: string;
		label: string;
		icon: ComponentType;
	}

	interface Step {
		id: number;
		label: string;
		code: string;
		from: string;
		to: string;
	}

	interface Props {
		actors: Actor[];
		steps: Step[];
		title?: string;
		subtitle?: string;
	}

	let { 
		actors, 
		steps, 
		title = 'Workflow', 
		subtitle = 'Scroll pour voir le flux de communication' 
	}: Props = $props();

	let container: HTMLElement;
	let visibleSteps = $state<number[]>([]);

	$effect(() => {
		visibleSteps = steps.map((step) => step.id);
	});

	function handleScroll() {
		if (!container) return;

		const viewportHeight = window.innerHeight;
		const triggerPoint = viewportHeight * 0.7;

		const stepElements = container.querySelectorAll('[data-step-id]');
		const newVisibleSteps: number[] = [];

		stepElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			const stepId = parseInt(el.getAttribute('data-step-id') || '0');

			if (rect.top < triggerPoint) {
				newVisibleSteps.push(stepId);
			}
		});

		visibleSteps = newVisibleSteps;
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="border-2 border-[var(--ink)]" bind:this={container}>
	<div class="relative py-8 text-center bg-[var(--paper)] z-20">
		<h3 class="font-[family-name:var(--font-display)] text-[1.75rem] uppercase tracking-[0.2em] mb-2">{title}</h3>
		<p class="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--ink)] opacity-60">{subtitle}</p>
	</div>

	<!-- Sticky Actors Header -->
	<div class="grid gap-4 sticky top-16 z-20 bg-[var(--paper)] p-4 border-b-2 border-[var(--ink)] sm:gap-2" style="grid-template-columns: repeat({actors.length}, 1fr);">
		{#each actors as actor}
			<div class="flex flex-col items-center gap-2">
				<div class="w-12 h-12 border-2 border-[var(--ink)] rounded-full flex items-center justify-center bg-[var(--paper)] sm:w-9 sm:h-9">
					<actor.icon size={20} />
				</div>
				<p class="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.2em] text-center sm:text-[0.55rem]">{actor.label}</p>
			</div>
		{/each}
	</div>

	<div class="relative overflow-x-auto pb-12 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-[var(--ink)]">
		<div class="relative min-w-[960px]">
			<div class="absolute inset-0 grid pointer-events-none z-0" aria-hidden="true" style="grid-template-columns: repeat({actors.length}, 1fr);">
				{#each actors as actor}
					<div class="w-0.5 mx-auto bg-[var(--ink)] opacity-20"></div>
				{/each}
			</div>

			<!-- Sequence Diagram Steps -->
			<div class="relative z-[5] flex flex-col gap-16 py-40 pb-12">
				{#each steps as step}
					{@const fromIndex = actors.findIndex((a) => a.id === step.from)}
					{@const toIndex = actors.findIndex((a) => a.id === step.to)}
					{@const isVisible = visibleSteps.includes(step.id)}
					{@const isReverse = fromIndex > toIndex}
					{@const leftPos = Math.min(fromIndex, toIndex)}
					{@const rightPos = Math.max(fromIndex, toIndex)}
					{@const arrowWidth = Math.max(15, (rightPos - leftPos) * 25)}
					{@const colWidth = 100 / actors.length}
					
					<div class="relative min-h-20" data-step-id={step.id}>
						<div 
							class="absolute top-0 h-0.5 flex items-center z-[5] transition-opacity duration-400 ease-in-out"
							class:opacity-0={!isVisible}
							class:opacity-100={isVisible}
							style:left={`calc(${leftPos * colWidth}% + ${colWidth / 2}%)`}
							style:width={`${arrowWidth}%`}
						>
							<!-- Label above arrow -->
							<div class="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap z-10 transition-all duration-400 ease-in-out" 
								class:opacity-0={!isVisible}
								class:translate-y-2.5={!isVisible}
								class:opacity-100={isVisible}
								class:translate-y-0={isVisible}
								style="transition-delay: 0.95s;">
								<span class="inline-block py-1 px-3 bg-[var(--paper)] border border-[var(--ink)] font-[family-name:var(--font-mono)] text-[0.7rem] uppercase tracking-[0.1em]">{step.label}</span>
							</div>
							
							<!-- Arrow line and head -->
							<div class="arrow-line-container" class:reverse={isReverse}>
								<div class="arrow-line" class:visible={isVisible} class:reverse={isReverse}></div>
								<div class="arrow-head" class:visible={isVisible} class:reverse={isReverse}></div>
							</div>
							
							<!-- Code below arrow -->
							<div class="absolute top-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-400 ease-in-out"
								class:opacity-0={!isVisible}
								class:-translate-y-2.5={!isVisible}
								class:opacity-100={isVisible}
								class:translate-y-0={isVisible}
								style="transition-delay: 1.05s;">
								<code class="inline-block py-1.5 px-2.5 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] font-[family-name:var(--font-mono)] text-[0.65rem] max-w-[300px] sm:text-[0.55rem] sm:max-w-[180px]">{step.code}</code>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.arrow-line-container {
		position: absolute;
		left: 0;
		right: 0;
		height: 3px;
	}

	.arrow-line {
		position: absolute;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--ink);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.arrow-line.reverse {
		transform-origin: right;
	}

	.arrow-line.visible {
		transform: scaleX(1);
	}

	.arrow-line.reverse.visible {
		left: 6px;
	}

	.arrow-line:not(.reverse).visible {
		right: 6px;
	}

	.arrow-head {
		position: absolute;
		top: -4px;
		left: 0;
		width: 0;
		height: 0;
		border-left: 10px solid var(--ink);
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		opacity: 0;
		transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.2s;
	}

	.arrow-head.visible {
		left: calc(100% - 8px);
		opacity: 1;
	}

	.arrow-head.reverse {
		left: calc(100% - 12px);
		border-left: none;
		border-right: 10px solid var(--ink);
	}

	.arrow-head.reverse.visible {
		left: 0;
	}
</style>
