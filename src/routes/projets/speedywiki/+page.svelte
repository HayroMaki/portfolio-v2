<script lang="ts">
	import { ArrowLeft, Zap, Users, GitBranch, Globe, MessageSquare, PenTool } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';

	const iconMap = {
		message_square: MessageSquare,
		globe: Globe,
		git_branch: GitBranch
	} as const;

	const t = $derived(getTranslations($locale));
	const page = $derived(t.project_pages.speedywiki);
	const hero = $derived(page.hero);
	const sections = $derived(page.sections);
	const crew = $derived(page.crew);
	const featureCards = $derived(
		sections.features.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? MessageSquare;
			return { ...card, Component };
		})
	);
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{hero.back}
				</a>
				<span class="kanji-tag bg-paper">{hero.badge}</span>
			</div>
			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">
					{hero.title.regular} <strong>{hero.title.highlight}</strong>
				</h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">{hero.description}</p>
			</div>
			<div class="grid gap-4 sm:grid-cols-3">
				{#each hero.stats as stat}
					<div class="manga-panel p-5 text-center">
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/60">{stat.label}</p>
						<p class="text-3xl font-display mt-2">{stat.value}</p>
						<p class="text-xs font-mono text-ink/60 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-6">
				<div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em]">
					<span>{hero.crew.title}</span>
					<span>{hero.crew.subtitle}</span>
				</div>
				<ul class="mt-4 space-y-3 font-mono text-sm text-ink/80">
					{#each crew as person}
						<li class="flex flex-wrap items-center justify-between border-b border-ink/10 pb-2">
							<span class="font-display text-lg">{person.name}</span>
							<span class="text-xs uppercase tracking-[0.3em] text-ink/60">{person.role}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.concept.title}</h2>
				{#each sections.concept.paragraphs as paragraph}
					<p class="font-mono text-sm leading-relaxed text-ink/80">{paragraph}</p>
				{/each}
			</div>
			<div class="manga-panel p-6 space-y-4">
				<div class="kanji-tag bg-paper">{sections.loop.tag}</div>
				<ul class="space-y-2 font-mono text-xs uppercase tracking-[0.35em]">
					{#each sections.loop.items as item}
						<li class="flex justify-between border-b border-ink/20 py-2 last:border-b-0">
							<span>{item.label}</span>
							<span>{item.value}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="bg-ink text-paper py-24">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">{sections.features.tag}</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{sections.features.subtitle}</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each featureCards as feature}
					<div class="manga-panel border-paper bg-black/30 p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/70">
							<feature.Component size={20} />
							{feature.title}
						</div>
						<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">{feature.description}</p>
						<div class="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.3em]">
							{#each feature.tags as tag}
								<span class="border border-paper px-2 py-0.5">{tag}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2	border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex flex-wrap items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.teamwork.title}</h2>
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<Users size={16} />
					{sections.teamwork.tag}
				</div>
			</div>
			<ul class="space-y-3 font-mono text-sm leading-relaxed text-ink/90">
				{#each sections.teamwork.items as item}
					<li class="flex items-start gap-3 border-b border-ink/15 pb-3 last:border-b-0 last:pb-0">
						<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.learnings.title}</h3>
				<ul class="space-y-3 font-mono text-sm text-ink/80">
					{#each sections.learnings.items as item}
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.stack.title}</h3>
				<div class="grid gap-3 text-xs font-mono uppercase tracking-[0.35em]">
					{#each sections.stack.items as item}
						<p>{item}</p>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">{sections.gallery.title}</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">{sections.gallery.description}</p>
			</div>
		</div>
	</section>
</main>
