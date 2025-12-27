<script lang="ts">
	import { ArrowLeft, Brain, Shield, Package, Zap, Lock, Globe, Pen } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';

	const iconMap = {
		brain: Brain,
		package: Package,
		pen: Pen,
		lock: Lock,
		shield: Shield,
		globe: Globe,
		zap: Zap
	} as const;

	const t = $derived(getTranslations($locale));
	const page = $derived(t.project_pages.mcp);
	const hero = $derived(page.hero);
	const sections = $derived(page.sections);
	const architectureCards = $derived(
		sections.architecture.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? Brain;
			return { ...card, Component };
		})
	);
	const securityCards = $derived(
		sections.security.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? Shield;
			return { ...card, Component };
		})
	);
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="border-b-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 py-20 space-y-10">
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
					<div class="manga-panel p-6 text-center">
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/60">{stat.label}</p>
						<p class="text-2xl font-display mt-1">{stat.value}</p>
						<p class="text-[0.65rem] font-mono uppercase tracking-[0.35em] text-ink/50 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-5xl px-6 space-y-6">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.highlight.title}</h2>
			<div class="grid gap-8 md:grid-cols-2">
				{#each sections.highlight.paragraphs as paragraph}
					<p class="font-mono text-sm leading-relaxed text-ink/80">{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-5xl px-6 space-y-8">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">{sections.architecture.tag}</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{sections.architecture.subtitle}</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each architectureCards as block}
					<div class="manga-panel border-paper bg-black/20 p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/70">
							<block.Component size={18} />
							{block.title}
						</div>
						<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">{block.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.security.title}</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each securityCards as item}
					<div class="manga-panel p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-ink/60">
							<item.Component size={18} />
							{item.title}
						</div>
						<p class="mt-3 text-sm font-mono text-ink/80 leading-relaxed">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-20 border-t border-b border-dashed border-ink">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.features.title}</h3>
				<ul class="space-y-3 font-mono text-sm text-ink/80">
					{#each sections.features.list as feat}
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
							<span>{feat}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">{sections.technologies.title}</h3>
				<div class="grid gap-3 text-xs font-mono uppercase tracking-[0.35em]">
					{#each sections.technologies.items as tech}
						<p>{tech}</p>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="py-24">
		<div class="mx-auto max-w-5xl px-6 space-y-8">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.impact.title}</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="manga-panel p-6">
					{#each sections.impact.paragraphs as paragraph}
						<p class="font-mono text-sm text-ink/80 leading-relaxed">{paragraph}</p>
					{/each}
				</div>
				<div class="manga-panel p-6 space-y-3">
					<ul class="space-y-3 font-mono text-sm text-ink/80">
						{#each sections.impact.learnings as learning}
							<li class="flex items-start gap-3">
								<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
								<span>{learning}</span>
							</li>
						{/each}
					</ul>
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
