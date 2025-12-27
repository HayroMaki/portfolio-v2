<script lang="ts">
	import { ArrowLeft, Database, Globe, Code, Zap, Users, PenTool } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { _t } from '$lib/i18n';

	/**
	 * Wrapper to not have to put locale every time
	 * @param slug the translation slug path
	 */
	function t(slug: string) {
		return _t('projets.travia.' + slug, $locale)
	}

	const iconMap = {
		globe: Globe,
		code: Code,
		database: Database,
		zap: Zap,
		users: Users
	} as const;
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative overflow-hidden border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{t('hero.back')}
				</a>
				<span class="kanji-tag bg-paper">{t('hero.badge')}</span>
			</div>
			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">
					{t('hero.title.regular')} <strong>{t('hero.title.highlight')}</strong>
				</h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">{t('hero.description')}</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each t('hero.stats') as stat}
					<div class="manga-panel p-6 text-center">
						<p class="text-4xl font-display">{stat.value}</p>
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70 mt-2">{stat.label}</p>
						<p class="text-xs font-mono text-ink/60 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-6">
				<div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em]">
					<span>{t('hero.crew.title')}</span>
					<span>{t('hero.crew.subtitle')}</span>
				</div>
				<ul class="mt-4 space-y-3 font-mono text-sm text-ink/80">
					{#each t('hero.crew') as person}
						<li class="flex flex-wrap items-center justify-between border-b border-ink/10 pb-2">
							<span class="font-display text-lg">{person.name}</span>
							<span class="text-xs uppercase tracking-[0.3em] text-ink/60">{person.role}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink bg-paper py-20">
		<div class="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-6">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{t('sections.overview.title')}</h2>
				<div class="space-y-4 font-mono text-sm leading-relaxed text-ink/80">
					{#each t('sections.overview.paragraphs') as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
			</div>

			<div class="space-y-4">
				<div class="kanji-tag bg-paper">{t('sections.stack.tag')}</div>
				<ul class="space-y-3 font-mono text-xs uppercase tracking-[0.4em]">
					{#each t('sections.stack.items') as item}
						<li class="flex items-center justify-between border-b border-ink/30 py-2 last:border-b-0">
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
			<div class="flex flex-wrap items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">{t('sections.architecture.tag')}</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{t('sections.architecture.subtitle')}</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				{#each t('journey.items') as card}
					<div class={`manga-panel border-paper bg-black/20 p-6 ${card.fullWidth ? 'md:col-span-2' : ''}`}>
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
							<card.Component size={18} />
							{card.title}
						</div>
						<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex flex-wrap items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{t('sections.learnings.title')}</h2>
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<PenTool size={16} />
					{t('sections.learnings.tag')}
				</div>
			</div>
			<ul class="space-y-4 font-mono text-sm leading-relaxed text-ink/90">
				{#each t('sections.learnings.items') as learning}
					<li class="flex items-start gap-3 border-b border-ink/20 pb-4 last:border-0 last:pb-0">
						<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
						<span>{learning}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-4">{t('sections.technologies.title')}</h3>
				<div class="grid gap-4 text-sm font-mono">
					{#each t('sections.technologies.sections') as techSection}
						<div>
							<p class="text-xs uppercase tracking-[0.4em] text-ink/60">{techSection.label}</p>
							<div class="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
								{#each techSection.items as item}
									<span class="border-2 border-ink px-3 py-1">{item}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-4">{t('sections.gallery.title')}</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">{t('sections.gallery.description')}</p>
			</div>
		</div>
	</section>
</main>
