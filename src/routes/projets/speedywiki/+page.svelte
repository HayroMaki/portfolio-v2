<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, Zap, Users, GitBranch, Globe, MessageSquare, Wifi, Server, Package, Code, Sparkles } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';
	import SequenceDiagram from '$lib/components/projects/SequenceDiagram.svelte';
	import { getSpeedyWikiWorkflowData } from '$lib/data/speedyWikiWorkflowData';
	import { GraphVisualizer, generateRandomGraph, findOppositeCornerNodes, type LabyrinthControls } from '@hayro_o7/labyrinth';

	const iconMap = {
		message_square: MessageSquare,
		globe: Globe,
		git_branch: GitBranch,
		wifi: Wifi,
		server: Server
	} as const;

	const t = $derived(getTranslations($locale));
	const page = $derived(t.project_pages.speedywiki);
	const hero = $derived(page.hero);
	const sections = $derived(page.sections);
	const crew = $derived(page.crew);
	const workflowData = $derived(getSpeedyWikiWorkflowData(sections.workflow));
	const architectureCards = $derived(
		sections.architecture.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? MessageSquare;
			return { ...card, Component };
		})
	);

	let graphControls = $state<LabyrinthControls | null>(null);
	let isPlaying = $state(false);
	let nodeCount = $state(100);
	let animSpeed = $state(0);
	let width = $state(700);
	let height = $state(600);
	let maxConnectionsPerNode = $state(3);
	let connectionRadius = $state(200);
	let minNodeDistance = $state(200);
	let currentGraph = $state<any | null>(null);
	let currentStartNode = $state<any | null>(null);
	let currentGoalNodes = $state<any | null>(null);
	let numberOfGoals = $state(3);

	function handleControls(controls: LabyrinthControls) {
		graphControls = controls;
	}
	
	function togglePlay() {
		if (isPlaying) {
			graphControls?.pause();
		} else {
			graphControls?.play();
		}
		isPlaying = !isPlaying;
	}
	
	function handleReset() {
		graphControls?.reset();
		isPlaying = false;
	}
	
	function regenerateGraph() {
		const newGraph = generateRandomGraph({
			nodeCount,
			width,
			height,
			maxConnectionsPerNode,
			connectionRadius,
			minNodeDistance
		});
		
		const corners = findOppositeCornerNodes(newGraph);
		const nodeIds = Array.from(newGraph.nodes.keys());
		const availableNodes = nodeIds.filter(id => id !== corners.topLeft && id !== corners.bottomRight);
		
		let goalNodes = [];
		for (let i = 0; i < numberOfGoals-1; i++) {
			goalNodes.push(availableNodes[Math.floor(Math.random() * availableNodes.length)]);
		}
		goalNodes.push(corners.bottomRight);	
		
		currentGraph = newGraph;
		currentStartNode = corners.topLeft;
		currentGoalNodes = goalNodes;
		isPlaying = false;
	}

	function adaptRadiusAndDistance(nodeCount: number) {
		// Base values for 40 nodes
		const baseNodeCount = 60;
		const baseConnectionRadius = 200;
		const baseMinNodeDistance = 50;
		
		// Scale inversely with node count
		const scale = Math.sqrt(baseNodeCount / nodeCount);
		
		connectionRadius = Math.max(50, Math.round(baseConnectionRadius * scale));
		minNodeDistance = Math.max(20, Math.round(baseMinNodeDistance * scale));
	}
	
	function updateNodeCount(e: Event) {
		nodeCount = parseInt((e.target as HTMLInputElement).value);
		adaptRadiusAndDistance(nodeCount);
		regenerateGraph();
	}
	
	function updateSpeed(e: Event) {
		animSpeed = parseInt((e.target as HTMLInputElement).value);
		graphControls?.pause();
		graphControls?.play();
	}

	adaptRadiusAndDistance(nodeCount);
	regenerateGraph();
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-6xl px-6 py-20 space-y-12">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{hero.back}
				</a>
				<span class="kanji-tag bg-paper">{hero.badge}</span>
			</div>
			
			<div class="space-y-8">
				<h1 class="stroke-title leading-[0.8]">
					{hero.title.regular} <strong>{hero.title.highlight}</strong>
				</h1>
				<p class="max-w-3xl font-mono text-lg leading-relaxed text-ink/80">{hero.description}</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-3">
				{#each hero.stats as stat}
					<div class="manga-panel p-8 text-center space-y-2">
						<p class="text-5xl font-display">{stat.value}</p>
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70">{stat.label}</p>
						<p class="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/50">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-8">
				<div class="flex items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-ink/20">
					<h2 class="font-display text-2xl uppercase tracking-[0.3em]">{hero.crew.title}</h2>
					<span class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60">{hero.crew.subtitle}</span>
				</div>
				<div class="grid gap-4 sm:grid-cols-2">
					{#each crew as person}
						<div class="border-2 border-ink p-4 hover:bg-ink hover:text-paper transition-colors">
							<p class="font-display text-xl mb-2">{person.name}</p>
							<p class="text-xs font-mono uppercase tracking-[0.3em] opacity-70">{person.role}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-6xl px-6">
			<div class="space-y-6 mb-12">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.highlight.title}</h2>
				<div class="grid gap-8 lg:grid-cols-2">
					{#each sections.highlight.paragraphs as paragraph}
						<p class="font-mono text-sm leading-relaxed text-ink/80">{paragraph}</p>
					{/each}
				</div>
			</div>

			<!-- SpeedyWiki Workflow Sequence Diagram -->
			<div class="mt-16">
				<SequenceDiagram 
					actors={workflowData.actors} 
					steps={workflowData.steps}
					title={sections.workflow.title}
					subtitle={sections.workflow.subtitle}
				/>
			</div>
		</div>
	</section>

	<section class="bg-ink text-paper py-24">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">{sections.architecture.tag}</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{sections.architecture.subtitle}</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each architectureCards as card}
					<div class="manga-panel border-paper bg-black/20 p-6 hover:bg-black/30 transition-all duration-300">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 border-2 border-paper rounded-full flex items-center justify-center">
								<card.Component size={20} />
							</div>
							<span class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{card.title}</span>
						</div>
						<p class="text-sm font-mono text-paper/80 leading-relaxed">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	{#if sections.solver}
		<section class="border-t border-b border-ink py-24 bg-paper">
			<div class="mx-auto max-w-7xl px-6 space-y-12">
				<div class="space-y-6 text-center max-w-3xl mx-auto">
					<div class="kanji-tag bg-paper mx-auto">{sections.solver.tag}</div>
					<div class="space-y-2">
						<h2 class="text-4xl font-display uppercase tracking-[0.3em] leading-tight">{sections.solver.title}</h2>
						<p class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60">{sections.solver.subtitle}</p>
					</div>
					<div class="space-y-4 font-mono text-sm leading-relaxed text-ink/80">
						{#each sections.solver.paragraphs as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</div>
				
				<div class="grid gap-8 lg:grid-cols-[380px,1fr]">
					<div class="space-y-6 z-20">
						<div class="manga-panel p-6 space-y-4">
							<h3 class="font-mono text-xs uppercase tracking-[0.4em] text-ink/70">{sections.solver.controls.title}</h3>
							
							<div>
								<label
									for="node-count"
									class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
								>
									<span>{sections.solver.controls.nodes}</span>
									<span class="text-ink">{nodeCount}</span>
								</label>
								<input
									id="node-count"
									type="range"
									min="60"
									max="400"
									step="10"
									value={nodeCount}
									oninput={updateNodeCount}
									class="mt-2 h-2 w-full cursor-ew-resize appearance-none bg-ink/10 accent-ink"
								/>
							</div>
							
							<div>
								<label
									for="anim-speed"
									class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-ink/60"
								>
									<span>{sections.solver.controls.speed}</span>
									<span class="text-ink">{animSpeed}</span>
								</label>
								<input
									id="anim-speed"
									type="range"
									min="0"
									max="200"
									step="10"
									value={animSpeed}
									oninput={updateSpeed}
									class="mt-2 h-2 w-full cursor-ew-resize appearance-none bg-ink/10 accent-ink"
								/>
							</div>
							
							<button
								type="button"
								class="w-full border-2 border-ink bg-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.4em] text-paper transition hover:bg-paper hover:text-ink"
								onclick={regenerateGraph}
							>
								{sections.solver.controls.regenerate}
							</button>
						</div>
						
						<div class="manga-panel p-6 space-y-4">
							<div>
								<p class="font-mono text-xs uppercase tracking-[0.35em]">{sections.solver.controls.legend.title}</p>
								<p class="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-1">{sections.solver.controls.legend.subtitle}</p>
							</div>
							<div class="grid gap-3 grid-cols-2">
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #22c55e"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.start}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #ef4444"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.goals}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #f59e0b"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.forward}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #f97316"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.backward}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #fef3c7"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.fwd_queue}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #fed7aa"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.bwd_queue}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #e5e7eb"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.fwd_visited}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #fecaca"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.bwd_visited}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #a855f7"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.intersection}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #3b82f6"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.path}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #fbbf24"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.testing}</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="h-5 w-5 border border-ink flex-shrink-0" style="background-color: #10b981"></span>
									<span class="font-mono text-[10px] uppercase tracking-[0.25em] leading-tight">{sections.solver.controls.legend.best}</span>
								</div>
							</div>
						</div>
						
						<div class="flex z-20 gap-3 flex-wrap">
							<button 
								onclick={togglePlay}
								class="flex-1 border-2 border-ink px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition"
							>
								{isPlaying ? sections.solver.controls.pause : sections.solver.controls.play}
							</button>
							<button 
								onclick={handleReset}
								class="flex-1 border-2 border-ink px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition"
							>
								{sections.solver.controls.reset}
							</button>
						</div>
						<div class="flex gap-3 flex-wrap">
							<button 
								onclick={() => graphControls?.stepBackward()}
								class="flex-1 border-2 border-ink px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition"
							>
								{sections.solver.controls.step_back}
							</button>
							<button 
								onclick={() => graphControls?.stepForward()}
								class="flex-1 border-2 border-ink px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition"
							>
								{sections.solver.controls.step_forward}
							</button>
						</div>
					</div>
					
					<div class="manga-panel z-20 max-h-[660px] p-8">
						<GraphVisualizer 
							graph={currentGraph}
							startNode={currentStartNode}
							goalNodes={currentGoalNodes}
							nodeRadius={Math.max(8, Math.min(20, Math.round(16 / (nodeCount / 100))))}
							animationSpeed={animSpeed}
							showMultiGoal={true}
							showNodeIds={false}
							onControls={handleControls}
							colors={{
								start: '#22c55e',
								end: '#ef4444',
								current: '#f59e0b',
								visiting: '#fef3c7',
								visited: '#e5e7eb',
								path: '#3b82f6',
								background: '#ffffff',
								wall: '#1f2937',
								grid: '#d1d5db'
							}}
						/>
					</div>
				</div>
				
				<div class="max-w-3xl mx-auto">
					<ul class="space-y-3">
						{#each sections.solver.bullets as bullet}
							<li class="flex items-start gap-3 font-mono text-sm text-ink/90">
								<span class="flex-shrink-0 mt-1 inline-block h-2 w-2 bg-ink"></span>
								<span>{bullet}</span>
							</li>
						{/each}
					</ul>
					<p class="mt-6 font-mono text-xs text-ink/60 text-center italic">{sections.solver.footnote}</p>
				</div>
			</div>
		</section>
	{/if}

	<section class="py-20 border-t border-b border-dashed border-ink bg-paper/50">
		<div class="mx-auto max-w-6xl px-6 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
			<div class="manga-panel z-20 p-8 space-y-6">
				<div class="flex items-center gap-3">
					<Zap size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.features.title}</h3>
				</div>
				<ul class="space-y-4 font-mono text-sm text-ink/80">
					{#each sections.features.list as feat, index}
						<li class="flex items-start gap-3 pb-3 border-b border-ink/10 last:border-b-0 last:pb-0">
							<span class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center font-display text-xs">{index + 1}</span>
							<span class="leading-relaxed">{feat}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel z-20 p-8 space-y-6">
				<div class="flex items-center gap-3">
					<Package size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.technologies.title}</h3>
				</div>
				<div class="space-y-5">
					{#each sections.technologies.sections as techSection}
						<div class="space-y-3">
							<div class="flex items-center gap-2">
								<span class="inline-block h-2 w-2 bg-accent"></span>
								<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70">{techSection.label}</p>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each techSection.items as tech}
									<span class="border border-ink px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition-colors">{tech}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="flex items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.teamwork.title}</h2>
				<div class="inline-flex items-center gap-2 border-2 border-paper px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<Users size={16} />
					{sections.teamwork.tag}
				</div>
			</div>
			<div class="grid gap-8 lg:grid-cols-2">
				<div class="manga-panel border-paper bg-black/20 p-8 space-y-4">
					<h3 class="text-xl font-display uppercase tracking-[0.2em] mb-4">Collaboration</h3>
					{#each sections.teamwork.items as item}
						<p class="font-mono text-sm text-paper/80 leading-relaxed">{item}</p>
					{/each}
				</div>
				<div class="manga-panel border-paper bg-black/20 p-8">
					<h3 class="text-xl font-display uppercase tracking-[0.2em] mb-6">Apprentissages</h3>
					<ul class="space-y-4 font-mono text-sm text-paper/80">
						{#each sections.learnings.items as learning, index}
							<li class="flex items-start gap-3 pb-3 border-b border-paper/20 last:border-b-0 last:pb-0">
								<span class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-paper flex items-center justify-center font-display text-xs">{index + 1}</span>
								<span class="leading-relaxed">{learning}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="py-20 border-t-2 border-ink">
		<div class="mx-auto max-w-6xl px-6">
			<div class="manga-panel p-8">
				<div class="flex items-center gap-3 mb-4">
					<Sparkles size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.gallery.title}</h3>
				</div>
				<p class="font-mono text-sm leading-relaxed text-ink/80 mb-6">{sections.gallery.description}</p>
				<div class="grid gap-4 md:grid-cols-3">
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">Lobby UI</p>
					</div>
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">Gameplay</p>
					</div>
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">Podium</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
