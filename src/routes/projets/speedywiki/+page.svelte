<script lang="ts">
	import { ArrowLeft, Zap, Users, GitBranch, Globe, MessageSquare, Wifi, Server, Package, Code, Sparkles } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';
	import SequenceDiagram from '$lib/components/projects/SequenceDiagram.svelte';
	import { getSpeedyWikiWorkflowData } from '$lib/data/speedyWikiWorkflowData';

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
