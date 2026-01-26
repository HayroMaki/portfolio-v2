<script lang="ts">
	import { onMount } from 'svelte';
	import { MonitorSmartphone, Move3d, ArrowUpFromLine, StretchHorizontal } from 'lucide-svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import StairsCanvas from './stairs/StairsCanvas.svelte';

	interface FlowProps {
		steps: {
			title: string;
			description: string;
		}[];
		title: string;
	}

	let { steps, title }: FlowProps = $props();

	let activeStep = $state(0);
	let stepElements: HTMLElement[] = $state([]);

	// Calculate semantic default values (what 0 actually means visually)
	function getDefaultStepWidth(w: number, h: number, steps: number): number {
		const stepNose = 30;
		const practicalSteps = steps;
		return (w - stepNose) / practicalSteps;
	}

	const plinthHeight = 80;
	const defaultBotHeightBase = 150; // Higher baseline for visibility

	// Calculate initial defaults for step 0
	const initialWidth = 1000;
	const initialHeight = 1000;
	const initialSteps = 5;
	const initialDefaultStepWidth = getDefaultStepWidth(initialWidth, initialHeight, initialSteps);

	// Animation stores - use calculated defaults as initial values
	const width = tweened(initialWidth, { duration: 800, easing: cubicOut });
	const height = tweened(initialHeight, { duration: 800, easing: cubicOut });
	const numSteps = tweened(initialSteps, { duration: 800, easing: cubicOut });
	const topStepWidth = tweened(initialDefaultStepWidth, { duration: 800, easing: cubicOut });
	const botStepWidth = tweened(initialDefaultStepWidth, { duration: 800, easing: cubicOut });
	const botHeight = tweened(defaultBotHeightBase, { duration: 800, easing: cubicOut });

	// Scrollytelling logic
	function handleScroll() {
		if (!stepElements.length) return;
		const triggerPoint = window.innerHeight * 0.6;

		stepElements.forEach((el, index) => {
			const rect = el.getBoundingClientRect();
			if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
				if (activeStep !== index) {
					activeStep = index;
					updateStairState(index);
				}
			}
		});
	}

	function updateStairState(index: number) {
		switch (index) {
			case 0: // Step 0: Basic canvas view
				const w0 = 1000;
				const h0 = 1000;
				const s0 = 5;
				const defaultWidth0 = getDefaultStepWidth(w0, h0, s0);
				
				width.set(w0);
				height.set(h0);
				numSteps.set(s0);
				topStepWidth.set(defaultWidth0);
				botStepWidth.set(defaultWidth0);
				botHeight.set(defaultBotHeightBase);
				break;
			case 1: // Step 1: Dimensions resize
				const w1 = 3000;
				const h1 = 2200;
				const s1 = 9;
				const defaultWidth1 = getDefaultStepWidth(w1, h1, s1);
				
				width.set(w1);
				height.set(h1);
				numSteps.set(s1);
				topStepWidth.set(defaultWidth1);
				botStepWidth.set(defaultWidth1);
				botHeight.set(defaultBotHeightBase);
				break;
			case 2: // Step 2: Base height (botHeight only)
				const w2 = 3000;
				const h2 = 2200;
				const s2 = 9;
				const defaultWidth2 = getDefaultStepWidth(w2, h2, s2);
				
				width.set(w2);
				height.set(h2);
				numSteps.set(s2);
				topStepWidth.set(defaultWidth2);
				botStepWidth.set(defaultWidth2);
				botHeight.set(800); // Significantly raised
				break;
			case 3: // Step 3: Asymmetric steps (add topStepWidth/botStepWidth)
				const w3 = 3000;
				const h3 = 2200;
				const s3 = 9;
				const defaultWidth3 = getDefaultStepWidth(w3, h3, s3);
				
				width.set(w3);
				height.set(h3);
				numSteps.set(s3);
				topStepWidth.set(defaultWidth3 * 2.5); // 3x default width for visibility
				botStepWidth.set(defaultWidth3 * 2.5);
				botHeight.set(800);
				break;
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

</script>

<div class="py-20 bg-ink/5">
	<div class="mx-auto max-w-6xl px-6">
		<h2 class="text-4xl font-display uppercase tracking-[0.3em] mb-16 text-center">{title}</h2>

		<div class="grid lg:grid-cols-[1fr,1fr] gap-10 relative">
			<!-- Sticky Graphic Side -->
			<div class="hidden lg:block">
				<div class="z-20 sticky top-32 h-[500px] bg-paper border-2 border-ink p-4 manga-panel transition-all duration-500">
					<div class="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
					
					<!-- Canvas Stairs -->
					<div class="relative w-full h-full">
						<StairsCanvas 
							width={Math.round($width)} 
							height={Math.round($height)} 
							steps={Math.round($numSteps)}
							topStepWidth={Math.round($topStepWidth)}
							botStepWidth={Math.round($botStepWidth)}
							botHeight={Math.round($botHeight)}
						/>
                        
						<!-- Step Badge -->
						<div class="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] bg-ink text-paper px-2 py-1">
							{steps[activeStep].title.split('.')[1] || 'Step'}
						</div>
					</div>
				</div>
			</div>

			<!-- Scrolling Text Side -->
			<div class="z-10 space-y-[50vh] py-[10vh]">
				{#each steps as step, i}
					<div 
						bind:this={stepElements[i]}
						class="manga-panel p-8 bg-paper border-2 border-ink transition-all duration-500 
							   {activeStep === i ? 'scale-105 shadow-xl opacity-100' : 'scale-100 opacity-40 blur-[1px]'}"
					>
						<div class="flex items-center gap-4 mb-4 text-accent">
							{#if i === 0} <MonitorSmartphone size={32} />
							{:else if i === 1} <Move3d size={32} />
							{:else if i === 2} <ArrowUpFromLine size={32} />
							{:else} <StretchHorizontal size={32} />
							{/if}
							<span class="font-mono text-xl font-bold">0{i + 1}</span>
						</div>
						<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-4">{step.title}</h3>
						<p class="font-mono text-sm leading-relaxed text-ink/80">{step.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
