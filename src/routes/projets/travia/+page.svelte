<script lang="ts">
	import { ArrowLeft, Database, Globe, Code, Zap, Users, PenTool } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import { _t } from '$lib/i18n';
	import type { Graph, AlgorithmType, ColorScheme, LabyrinthControls } from '@hayro_o7/labyrinth';
	import { generateLabyrinth, Labyrinth } from '@hayro_o7/labyrinth';

	/**
	 * Wrapper to not have to put locale every time
	 * @param slug the translation slug path
	 */
	function t(slug: string) {
		return _t('project_pages.travia.' + slug, $locale);
	}

	const labyrinthColors: ColorScheme = {
		start: '#050505',
		end: '#d90429',
		current: '#111111',
		visiting: '#fdfaf0',
		visited: '#cfcab5',
		path: '#e895a3',
		background: '#fffdf5',
		wall: '#050505',
		grid: '#e7e1cb',
	};

	const legendSwatches: (keyof ColorScheme)[] = ['start', 'end', 'current', 'visiting', 'visited', 'path'];
	const algorithmOptions: { value: AlgorithmType; label: string }[] = [
		{ value: 'astar', label: 'A*' },
		{ value: 'dijkstra', label: 'Dijkstra' }
	];

	const MIN_HEIGHT = 6;
	const MAX_HEIGHT = 20;
	const MIN_WIDTH = 6;
	const MAX_WIDTH = 30;
	const MIN_CELL_SIZE = 10;
	const MAX_CELL_SIZE = 50;
	const MIN_REFRESH_RATE = 1;
	const MAX_REFRESH_RATE = 100;
	const AUTO_PLAY = true;

	let algorithm = $state<AlgorithmType>('astar');
	let width = $state(18);
	let height = $state(12);
	let cellSize = $state(24);
	let refreshRate = $state(MAX_REFRESH_RATE);
	let graph = $state<Graph | null>(null);
	let hydrated = $state(false);
	let windowWidth = $state(0);
	let targetWidth = $state(520);
	let targetHeight = $state(520);

	let controls = $state<LabyrinthControls | null>(null);

	const swatchColor = (key: keyof ColorScheme) => labyrinthColors[key] ?? '#ffffff';

	const regenerate = () => {
		if (!hydrated) return;
		graph = generateLabyrinth(width, height);
		controls?.reset();
	};

	const updateWidth = (event: Event) => {
		const value = Number((event.currentTarget as HTMLInputElement).value);
		width = value;
		recalculateCellSize(width, height);
	};

	const updateHeight = (event: Event) => {
		const value = Number((event.currentTarget as HTMLInputElement).value);
		height = value;
		recalculateCellSize(width, height);
	};

	const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	const recalculateCellSize = (w: number, h: number) => {
		const estimated = Math.floor(Math.min(targetWidth / w, targetHeight / h));
		cellSize = clamp(estimated, MIN_CELL_SIZE, MAX_CELL_SIZE);
		console.log("recalc", cellSize)
	};

	const updateTargetDimensions = () => {
		if (typeof window === 'undefined') return;
		windowWidth = window.innerWidth;
		console.log("upd w", windowWidth)
		
		// Mobile (tablet & phone)
		if (windowWidth < 1024) {
			targetWidth = Math.min(windowWidth, 1024) - 120;
			targetHeight = Math.min(windowWidth, 1024) - 120;
		}
		// Desktop
		else {
			targetWidth = Math.min(windowWidth, 700);
			targetHeight = Math.min(windowWidth, 400);
		}
		
		recalculateCellSize(width, height);
	};

	const updateRefreshRate = (event: Event) => {
		const value = Number((event.currentTarget as HTMLInputElement).value);
		refreshRate = value;
		controls?.pause();
		controls?.play();
	};

	onMount(() => {
		hydrated = true;
		updateTargetDimensions();
		
		const handleResize = () => {
			updateTargetDimensions();
		};
		
		window.addEventListener('resize', handleResize);
		
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	$effect(regenerate);

	
	const iconMap: Record<string, typeof PenTool> = {
		globe: Globe,
		code: Code,
		database: Database,
		zap: Zap,
		users: Users
	} as const;
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative overflow-hidden border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-6xl px-6 py-20 space-y-12">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{t('hero.back')}
				</a>
				<span class="kanji-tag bg-paper">{t('hero.badge')}</span>
			</div>
			
			<div class="space-y-8">
				<h1 class="stroke-title leading-[0.8]">
					{t('hero.title.regular')} <strong>{t('hero.title.highlight')}</strong>
				</h1>
				<p class="max-w-3xl font-mono text-lg leading-relaxed text-ink/80">{t('hero.description')}</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-3">
				{#each t('hero.stats') as stat}
					<div class="manga-panel p-8 text-center space-y-2">
						<p class="text-5xl font-display">{stat.value}</p>
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70">{stat.label}</p>
						<p class="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/50">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-8">
				<div class="flex items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
					<h2 class="font-display text-2xl uppercase tracking-[0.3em]">{t('hero.crew.title')}</h2>
					<span class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60">{t('hero.crew.subtitle')}</span>
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					{#each t('hero.crew') as person}
						<div class="border-2 border-ink p-4 hover:bg-ink hover:text-paper transition-colors">
							<p class="font-display text-xl mb-2">{person.name}</p>
							<p class="text-xs font-mono uppercase tracking-[0.3em] opacity-70">{person.role}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink bg-paper py-24">
		<div class="mx-auto max-w-6xl px-6">
			<div class="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
				<div class="space-y-8">
					<h2 class="text-4xl md:text-5xl font-display uppercase tracking-[0.3em]">{t('sections.overview.title')}</h2>
					<div class="space-y-5 font-mono text-base leading-relaxed text-ink/80">
						{#each t('sections.overview.paragraphs') as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>

				<div class="manga-panel p-8 space-y-6">
					<div class="kanji-tag bg-paper">{t('sections.stack.tag')}</div>
					<ul class="space-y-4 font-mono text-sm uppercase tracking-[0.35em]">
						{#each t('sections.stack.items') as item}
							<li class="flex items-center justify-between border-b-2 border-ink/20 pb-3 last:border-b-0">
								<span class="text-ink/70">{item.label}</span>
								<span class="text-ink font-semibold">{item.value}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-ink text-paper py-24">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="max-w-3xl">
				<div class="kanji-tag bg-ink border-paper text-paper mb-6">{t('sections.architecture.tag')}</div>
				<h2 class="text-4xl md:text-5xl font-display uppercase tracking-[0.3em]">{t('sections.architecture.subtitle')}</h2>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each t('sections.architecture.cards') as card, index}
					{@const Icon = iconMap[card.icon]}
					<div class="manga-panel border-paper bg-black/20 p-8 space-y-4 hover:-translate-y-1 transition-transform">
						<div class="flex items-center gap-3">
							<div class="p-2 border-2 border-paper/30">
								<Icon size={24} class="text-paper" />
							</div>
							<h3 class="font-display text-xl uppercase tracking-[0.2em]">{card.title}</h3>
						</div>
						<p class="text-sm font-mono text-paper/80 leading-relaxed">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-t-2 border-ink bg-paper py-24">
		<div class="mx-auto max-w-7xl px-6 space-y-12">
			<div class="max-w-3xl">
				<div class="kanji-tag bg-paper mb-6">{t('sections.labyrinth.tag')}</div>
				<h2 class="text-4xl md:text-5xl font-display uppercase tracking-[0.3em] mb-6">{t('sections.labyrinth.title')}</h2>
				<div class="space-y-4 font-mono text-sm leading-relaxed text-ink/80">
					{#each t('sections.labyrinth.description') as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>

			<div class="grid gap-8 lg:grid-cols-[380px,1fr]">
				<div class="space-y-6">
					<div class="manga-panel p-6 space-y-4">
						<h3 class="font-mono text-xs uppercase tracking-[0.4em] text-ink/70">{t('sections.labyrinth.controls.title')}</h3>
						<div>
							<label class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60" for="labyrinth-algorithm">
								{t('sections.labyrinth.controls.algorithm')}
							</label>
							<select
								id="labyrinth-algorithm"
								class="mt-2 w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-ink"
								bind:value={algorithm}
							>
								{#each algorithmOptions as option}
									<option value={option.value}>{option.label}</option>
								{/each}
							</select>
						</div>
						<div>
							<label
								for="labyrinth-width"
								class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
							>
								<span>{t('sections.labyrinth.controls.width')}</span>
								<span class="text-ink">{width}</span>
							</label>
							<input
								id="labyrinth-width"
								type="range"
								min="{MIN_WIDTH}"
								max="{MAX_WIDTH}"
								step="1"
								value={width}
								oninput={updateWidth}
								class="mt-2 h-2 w-full cursor-ew-resize appearance-none bg-ink/10 accent-ink"
							/>
						</div>
						<div>
							<label
								for="labyrinth-height"
								class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
							>
								<span>{t('sections.labyrinth.controls.height')}</span>
								<span class="text-ink">{height}</span>
							</label>
							<input
								id="labyrinth-height"
								type="range"
								min="{MIN_HEIGHT}"
								max="{MAX_HEIGHT}"
								step="1"
								value={height}
								oninput={updateHeight}
								class="mt-2 h-2 w-full cursor-ew-resize appearance-none bg-ink/10 accent-ink"
							/>
						</div>
						<div>
							<label
								for="refresh-rate"
								class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
							>
								<span>{t('sections.labyrinth.controls.rate')}</span>
								<span class="text-ink">{refreshRate}</span>
							</label>
							<input
								id="refresh-rate"
								type="range"
								min="{MIN_REFRESH_RATE}"
								max="{MAX_REFRESH_RATE}"
								step="1"
								value={refreshRate}
								oninput={updateRefreshRate}
								class="mt-2 h-2 w-full cursor-ew-resize appearance-none bg-ink/10 accent-ink"
							/>
						</div>
						<button
							type="button"
							class="w-full border-2 border-ink bg-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.4em] text-paper transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:bg-ink/30 disabled:text-paper/50"
							onclick={regenerate}
							disabled={!hydrated}
						>
							{t('sections.labyrinth.controls.regenerate')}
						</button>
					</div>

					<div class="manga-panel p-6 space-y-4">
						<div>
							<p class="font-mono text-xs uppercase tracking-[0.35em]">{t('sections.labyrinth.controls.legendTitle')}</p>
							<p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">{t('sections.labyrinth.controls.legendSubtitle')}</p>
						</div>
						<div class="grid gap-3 grid-cols-2">
							{#each legendSwatches as key}
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style={`background-color: ${swatchColor(key)}`}></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{t(`sections.labyrinth.legend.${key}`)}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="manga-panel p-6 flex flex-col items-center justify-center min-h-[600px]">
					{#if graph}
						<div class="w-full h-full flex items-center justify-center">
							<Labyrinth
								{graph}
								{algorithm}
								{cellSize}
								wallThickness={2}
								animationSpeed={refreshRate}
								autoPlay={AUTO_PLAY}
								showGrid={false}
								legend={false}
								buttons={false}
								stepCount={false}
								colors={labyrinthColors}
								onControls={(c) => (controls = c)}
							/>
						</div>
						<div class="w-full space-y-4 border-t border-ink/20 pt-4">
							<div class="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
								<button
									type="button"
									class="border-2 border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30 disabled:hover:bg-ink/30"
									onclick={() => controls?.play()}
								>
									{t('sections.labyrinth.controls.play')}
								</button>
								<button
									type="button"
									class="border-2 border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30 disabled:hover:bg-ink/30"
									onclick={() => controls?.pause()}
								>
									{t('sections.labyrinth.controls.pause')}
								</button>
								<button
									type="button"
									class="border-2 border-ink bg-paper px-4 py-3 font-mono text-[10px] uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30"
									onclick={() => controls?.reset()}
								>
									{t('sections.labyrinth.controls.reset')}
								</button>
								<button
									type="button"
									class="border-2 border-dashed border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30 "
									onclick={() => controls?.stepBackward()}
								>
									{t('sections.labyrinth.controls.stepBackward')}
								</button>
								<button
									type="button"
									class="border-2 border-dashed border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30"
									onclick={() => controls?.stepForward()}
								>
									{t('sections.labyrinth.controls.stepForward')}
								</button>
							</div>
						</div>
					{:else}
						<div class="flex items-center justify-center font-mono text-xs uppercase tracking-[0.4em] text-ink/50">
							{t('sections.labyrinth.controls.loading')}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="flex flex-wrap items-center gap-4">
				<h2 class="text-4xl md:text-5xl font-display uppercase tracking-[0.3em]">{t('sections.learnings.title')}</h2>
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.4em]">
					<PenTool size={18} />
					{t('sections.learnings.tag')}
				</div>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each t('sections.learnings.items') as learning, index}
					<div class="manga-panel p-6 flex items-start gap-4 hover:shadow-divider transition-shadow">
						<span class="flex-shrink-0 w-8 h-8 border-2 border-ink flex items-center justify-center font-display text-sm">
							{index + 1}
						</span>
						<p class="font-mono text-sm leading-relaxed text-ink/90">{learning}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-dashed border-ink">
		<div class="mx-auto max-w-6xl px-6">
			<div class="manga-panel p-10 space-y-8">
				<h3 class="text-3xl font-display uppercase tracking-[0.2em]">{t('sections.technologies.title')}</h3>
				<div class="grid gap-8 md:grid-cols-3">
					{#each t('sections.technologies.sections') as techSection}
						<div class="space-y-4">
							<div class="flex items-center gap-2">
								<span class="inline-block h-2 w-2 bg-accent"></span>
								<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70">{techSection.label}</p>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each techSection.items as item}
									<span class="border border-ink px-3 py-1.5 text-xs font-mono uppercase tracking-[0.25em] hover:bg-ink hover:text-paper transition-colors">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="py-20 bg-ink/5">
		<div class="mx-auto max-w-4xl px-6">
			<div class="manga-panel p-10 text-center space-y-6">
				<h3 class="text-3xl font-display uppercase tracking-[0.2em]">{t('sections.gallery.title')}</h3>
				<p class="font-mono text-base leading-relaxed text-ink/80 max-w-2xl mx-auto">{t('sections.gallery.description')}</p>
				<div class="pt-4">
					<div class="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed border-ink font-mono text-xs uppercase tracking-[0.4em] text-ink/60">
						<span>Coming soon</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
