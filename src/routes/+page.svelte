<script lang="ts">
	import { ArrowRight, PenTool, Sparkles, Zap, BookHeart } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import TimelineSection from '$lib/components/home/TimelineSection.svelte';
	import { useIntersectionVisibility } from '$lib/hooks/useIntersectionVisibility';
	import { _t } from '$lib/i18n';

	/**
	 * Wrapper to not have to put locale every time
	 * @param slug the translation slug path
	 */
	function t(slug: string) {
		return _t(slug, $locale)
	}

	let heroReady = $state(false);
	let skillsOpen = $state(false);
	let atelierSection: HTMLElement | null = null;
	let projectsSection: HTMLElement | null = null;

	const { visible: atelierVisible } = useIntersectionVisibility(() => atelierSection, { threshold: 0.4 });
	const { visible: projectsVisible } = useIntersectionVisibility(() => projectsSection, { threshold: 0.35 });

	const projectsData = [
		{ href: '/projets/mcp', featured: true },
		{ href: '/projets/configurateurs', featured: true },
		{ href: '/projets/travia', featured: false },
		{ href: '/projets/speedywiki', featured: false }
	];

	onMount(() => {
		heroReady = true;

		return () => {
			// nothing to cleanup for heroReady
		};
	});

	const tickerItems = ["SVELTE ENTHUSIAST", "BUILDING WITH AI", "3D CONFIGURATORS", "FULL-STACK DEVELOPER", "ALWAYS LEARNING", "SHIP FAST, ITERATE FASTER"];
</script>

<main class="relative overflow-hidden bg-paper text-ink">
	<section class="relative min-h-[90vh] overflow-hidden">
		<div class="relative z-10 container mx-auto max-w-6xl px-6 py-24">
			<div class="grid lg:grid-cols-[1.2fr,0.8fr] gap-14">
				<div
					class="space-y-8 transition-all duration-700 ease-out"
					class:opacity-0={!heroReady}
					class:-translate-y-8={!heroReady}
				>
					<div class="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.5em]">
						<span class="kanji-tag bg-paper">{t('hero.badge')}</span>
					</div>

					<div class="space-y-5">
						<h1 class="stroke-title leading-[0.85]">
							{t('hero.name')} <strong>{t('hero.surname')}</strong>
						</h1>
						<p class="max-w-2xl text-lg leading-relaxed font-mono text-ink/80">
							{t('hero.description')}
						</p>
					</div>

					<div class="flex flex-wrap gap-4">
						<a
							href="#projects"
							class="inline-flex items-center gap-3 bg-ink text-paper px-7 py-3 uppercase tracking-[0.3em] border-2 border-ink shadow-panel transition hover:-translate-y-1"
						>
							{t('hero.cta_projects')}
							<ArrowRight size={18} />
						</a>
						<a
							href="#timeline"
							class="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed border-ink uppercase tracking-[0.3em] font-mono hover:bg-ink/90 hover:text-paper transition"
						>
							{t('hero.cta_journey')}
						</a>
					</div>

					<div class="flex flex-wrap gap-8 border-y-2 border-ink py-6 font-mono uppercase tracking-[0.4em] text-sm">
						<div>
							<p class="text-4xl font-display">{t('hero.stats.projects_nb')}</p>
							<p>{t('hero.stats.projects')}</p>
						</div>
						<div>
							<p class="text-4xl font-display">{t('hero.stats.experience_nb')}</p>
							<p>{t('hero.stats.experience')}</p>
						</div>
						<div>
							<p class="text-4xl font-display">{t('hero.stats.motivation_nb')}</p>
							<p>{t('hero.stats.motivation')}</p>
						</div>
					</div>
				</div>

				<div class="relative flex items-center justify-center">
					<div class="manga-panel relative w-full max-w-sm overflow-hidden bg-paper/80">
						<div class="absolute inset-4 border-2 border-dashed border-ink pointer-events-none"></div>
						<div class="relative aspect-[3/4] w-full">
							<div class="absolute inset-0 bg-[radial-gradient(circle_at_1px,rgba(0,0,0,0.2)_1px,transparent_0)] bg-[length:14px_14px]"></div>
							<div class="relative flex h-full w-full items-center justify-center">
								<div class="text-center font-mono text-xs uppercase tracking-[0.4em] text-ink/70">
									<p class="text-sm font-display tracking-[0.3em]">Portrait</p>
								</div>
							</div>
						</div>
						<div class="absolute top-4 left-4 border border-ink bg-paper px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.4em]">
							self-portrait
						</div>
						<div class="absolute bottom-4 right-4 border border-ink bg-ink px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-paper">
							incoming
						</div>
					</div>
					<div class="absolute p-2 -bottom-8 -right-6 hidden h-24 w-24 rotate-3 border-2 border-dotted border-ink bg-paper font-display text-2xl md:flex items-center justify-center">
						Working hard as always
					</div>
				</div>
			</div>
		</div>

		<div class="relative z-10 border-y-2 border-ink bg-ink text-paper overflow-hidden">
			<div class="marquee" style="--marquee-duration: 22s">
				<div class="marquee__inner">
					{#each [0, 1] as loopIndex}
						<div class="marquee__group font-mono uppercase tracking-[0.5em]" aria-hidden={loopIndex === 1}>
							{#each tickerItems as label}
								<span class="flex items-center gap-4">
									{label}
									<span class="inline-block h-2 w-2 rounded-full bg-paper"></span>
								</span>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="atelier" class="relative py-28" bind:this={atelierSection}>
		<div class="atelier-bg" aria-hidden="true">
			<span class="atelier-blueprint blueprint-one"></span>
			<span class="atelier-blueprint blueprint-two"></span>
		</div>
		<div class="absolute inset-x-0 top-12 mx-auto w-11/12 h-full border-2 border-dashed border-ink pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-7xl px-6">
			<div
				class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start"
				class:opacity-0={!$atelierVisible}
				class:translate-y-12={!$atelierVisible}
			>
				<div class="space-y-8">
					<div class="kanji-tag bg-paper">{t('about.badge')}</div>
					<h2 class="text-4xl md:text-5xl font-display leading-tight uppercase tracking-[0.3em]">
						{t('about.title')}
						<span class="block text-ink/40">{t('about.title_highlight')}</span>
					</h2>
					<div class="space-y-4 font-mono text-base leading-relaxed text-ink/80">
						<p>{t('about.p1')}</p>
						<p>{t('about.p2')}</p>
						<p>{t('about.p3')}</p>
					</div>

					<div class="manga-panel p-6 space-y-6 atelier-skills atelier-skills--visible">
						<div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.35em]">
							<span>{t('about.skills.title')}</span>
							<span class="text-[0.6rem] text-ink/60">{t('about.skills.subtitle')}</span>
						</div>
						<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{#each t('about.skills.groups') as skillGroup, groupIndex}
								<div class="space-y-3">
									<div class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-ink/70">
										<span class="inline-block h-2 w-2 bg-accent"></span>
										{skillGroup.name}
									</div>
									<div class="flex flex-wrap gap-2">
										{#each skillGroup.items as skill}
											<span class="px-3 py-1.5 border border-ink bg-paper text-xs font-mono uppercase tracking-[0.25em] hover:bg-ink hover:text-paper transition-colors">
												{skill}
											</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<div class="space-y-6">
					<div class="manga-panel p-6 space-y-6">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<PenTool size={20} />
							{t('about.experience.title')}
						</div>
						<div class="space-y-3 text-sm font-mono leading-relaxed text-ink/80">
							<p>{t('about.experience.current')}</p>
							<p>{t('about.experience.uni')}</p>
						</div>
					</div>

					<div class="manga-panel p-6 space-y-6">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<Sparkles size={20} />
							{t('about.education.title')}
						</div>
						<div class="space-y-3 text-sm font-mono leading-relaxed text-ink/80">
							<p>{t('about.education.degree')}</p>
							<p>{t('about.education.bac')}</p>
						</div>
					</div>

					<div class="manga-panel p-6 space-y-6">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<Zap size={20} />
							{t('about.mentality.title')}
						</div>
						<p class="text-sm font-mono leading-relaxed text-ink/80">
							{t('about.mentality.p1')}
						</p>
					</div>
				</div>
			</div>

			<div class="mt-16 pt-10 border-t-2 border-dashed border-ink">
				<div class="manga-panel p-6 space-y-5 atelier-journal" data-visible={$atelierVisible}>
					<div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.35em]">
						<span>{t('about.atelier.journal.title')}</span>
						<span class="text-[0.6rem] text-ink/60">{t('about.atelier.journal.subtitle')}</span>
					</div>
					<ul class="atelier-journal__entries">
						{#each t('about.atelier.journal.entries') as entry, index}
							<li class="atelier-journal__entry">
								<div class="atelier-journal__index">{index + 1}</div>
								<div class="atelier-journal__body">
									<div class="atelier-journal__meta">
										<span class="atelier-journal__date">{entry.date}</span>
										<span class="atelier-journal__tag">{entry.tag}</span>
									</div>
									<p class="atelier-journal__label">{entry.label}</p>
									<p class="atelier-journal__detail">{entry.detail}</p>
								</div>
							</li>
						{/each}
					</ul>
					<p class="text-right text-[0.65rem] font-mono uppercase tracking-[0.3em] text-ink/60">
						{t('about.atelier.journal.footer')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<TimelineSection t={t} sectionId="timeline" />

	<section
		id="projects"
		class="relative py-32"
		class:opacity-0={!$projectsVisible}
		class:translate-y-10={!$projectsVisible}
		bind:this={projectsSection}
	>
		<div class="absolute inset-x-6 top-12 bottom-12 border-2 border-ink/70 pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-6xl px-6 space-y-12">
			<div class="text-center space-y-4">
				<div class="inline-flex px-4 py-2 border-2 border-ink uppercase font-mono tracking-[0.4em]">
					{t('projects.badge')}
				</div>
				<h2 class="text-5xl font-display uppercase tracking-[0.35em]">
					{t('projects.title')}
					<span class="text-accent"> {t('projects.title_highlight')}</span>
				</h2>
				<p class="mx-auto max-w-2xl font-mono text-base text-ink/80 leading-relaxed">{t('projects.description')}</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each projectsData as projectData, i}
					<a
						href={projectData.href}
						class={`manga-panel block p-8 transition-all hover:-translate-y-2 hover:shadow-divider ${
							projectData.featured ? 'md:col-span-2 lg:col-span-1' : ''
						}`}
					>
						<div class="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.4em]">
							<span>project {i + 1}</span>
							{#if projectData.featured}
								<span class="px-3 py-1 border border-ink bg-ink text-paper">{t('projects.featured')}</span>
							{/if}
						</div>
						<h3 class="mt-4 text-3xl font-display uppercase tracking-[0.2em]">{t('projects.list.' + i + '.title')}</h3>
						<p class="mt-3 font-mono text-sm text-ink/80 leading-relaxed">{t('projects.list.' + i + '.description')}</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each t('projects.list.' + i + '.tags') as tag}
								<span class="px-3 py-1 border border-dashed border-ink text-xs font-mono uppercase tracking-[0.3em]">
									{tag}
								</span>
							{/each}
						</div>
						<div class="mt-6 inline-flex items-center gap-3 border-b-2 border-ink text-sm font-mono uppercase tracking-[0.4em]">
							{t('projects.cta')}
							<ArrowRight size={16} />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section id="contact" class="relative py-32 bg-ink text-paper">
		<div class="absolute inset-0 opacity-10 bg-paper-fiber mix-blend-screen pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-4xl px-6">
			<div class="text-center space-y-6 mb-16">
				<div class="inline-flex px-4 py-2 border border-paper/60 uppercase font-mono tracking-[0.4em]">
					{t('contact.badge')}
				</div>
				<h2 class="text-5xl font-display uppercase tracking-[0.35em]">
					{t('contact.title')}
					<span class="text-accent"> {t('contact.title_highlight')}</span>
				</h2>
				<p class="mx-auto max-w-2xl font-mono text-base text-paper/80 leading-relaxed">{t('contact.description')}</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 mb-12">
				<div class="manga-panel border-paper bg-black/20 p-8 space-y-6">
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{t('contact.availability.title')}</h3>
					<div class="space-y-4 font-mono text-sm text-paper/80">
						<div class="flex items-center gap-3">
							<span class="inline-block h-3 w-3 rounded-full bg-accent animate-pulse"></span>
							<span>{t('contact.availability.status')}</span>
						</div>
						<p class="leading-relaxed">{t('contact.availability.description')}</p>
					</div>
				</div>

				<div class="manga-panel border-paper bg-black/20 p-8 space-y-6">
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{t('contact.info.title')}</h3>
					<div class="space-y-4 font-mono text-sm text-paper/80">
						<div class="flex items-start gap-3">
							<span class="text-accent">→</span>
							<div>
								<p class="text-xs uppercase tracking-[0.3em] text-paper/60">{t('contact.info.email_label')}</p>
								<a href="mailto:julesgrange@outlook.fr" class="hover:text-accent transition">julesgrange@outlook.fr</a>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<span class="text-accent">→</span>
							<div>
								<p class="text-xs uppercase tracking-[0.3em] text-paper/60">{t('contact.info.location_label')}</p>
								<p>Paris, France</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<span class="text-accent">→</span>
							<div>
								<p class="text-xs uppercase tracking-[0.3em] text-paper/60">{t('contact.info.response_label')}</p>
								<p>{t('contact.info.response_time')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="mailto:julesgrange@outlook.fr"
					class="inline-flex items-center gap-3 bg-paper text-ink px-8 py-4 uppercase tracking-[0.3em] border-2 border-paper shadow-panel transition hover:-translate-y-1 font-mono text-sm"
				>
					{t('contact.cta.email')}
					<ArrowRight size={18} />
				</a>
				<a
					href="https://www.linkedin.com/in/julesrenaudgrange/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-3 px-8 py-4 border-2 border-paper uppercase tracking-[0.3em] font-mono text-sm hover:bg-paper hover:text-ink transition"
				>
					{t('contact.cta.linkedin')}
				</a>
				<a
					href="/CV"
					class="inline-flex items-center gap-3 px-8 py-4 border-2 border-dashed border-paper uppercase tracking-[0.3em] font-mono text-sm hover:bg-paper/10 transition"
				>
					{t('contact.cta.cv')}
				</a>
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
	.marquee {
		position: relative;
		overflow: hidden;
	}

	.marquee__inner {
		display: flex;
		width: max-content;
		animation: marquee-slide var(--marquee-duration, 20s) linear infinite;
	}

	.marquee__group {
		margin-left: 1.5rem;
		display: inline-flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 0;
		flex-shrink: 0;
	}

	.marquee:hover .marquee__inner {
		
	}

	@media (max-width: 767px) {
		.timeline-spine,
		.timeline-spine__glow {
			display: none;
		}
	}

	@keyframes marquee-slide {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.atelier-bg {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 20% 30%, rgba(0, 0, 0, 0.05), transparent 45%),
			radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.08), transparent 40%);
		overflow: hidden;
		pointer-events: none;
	}

	.atelier-blueprint {
		position: absolute;
		inset: 10%;
		border: 2px dashed rgba(0, 0, 0, 0.15);
		transform-origin: center;
	}

	.blueprint-one {
		transform: rotate(3deg);
	}

	.blueprint-two {
		inset: 18%;
		transform: rotate(-6deg);
		animation-duration: 26s;
	}

	.atelier-stamp {
		position: absolute;
		top: 2rem;
		right: 3rem;
		padding: 0.4rem 1rem;
		border: 2px solid #000;
		text-transform: uppercase;
		font-size: 0.7rem;
		font-family: var(--font-mono, 'Space Mono', monospace);
		letter-spacing: 0.55em;
		background: rgba(255, 255, 255, 0.8);
		transform: rotate(-8deg);
		box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.2);
	}

	.atelier-skills {
		position: relative;
		overflow: hidden;
	}

	.atelier-skills::after {
		content: '';
		position: absolute;
		inset: 1.25rem;
		border: 1px dashed rgba(0, 0, 0, 0.2);
		pointer-events: none;
	}


	.atelier-stack {
		position: relative;
		overflow: hidden;
	}

	.atelier-stack::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(120deg, rgba(0, 0, 0, 0.04), transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.atelier-stack[data-visible='true']::before {
		opacity: 1;
	}

	.atelier-stack__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.atelier-stack-card {
		display: inline-flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1.1rem;
		border: 2px solid #000;
		background: #fff;
		box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.15);
		opacity: 0;
		transform: translateY(12px) scale(0.96);
	}

	.atelier-stack-card--visible {
		animation: card-rise 0.45s var(--card-delay, 0ms) cubic-bezier(0.2, 0.75, 0.25, 1.1) forwards;
	}

	@keyframes card-rise {
		0% {
			opacity: 0;
			transform: translateY(12px) scale(0.9);
		}
		70% {
			opacity: 1;
			transform: translateY(-4px) scale(1.04);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.atelier-journal {
		background: repeating-linear-gradient(
				transparent,
				transparent 22px,
				rgba(0, 0, 0, 0.04) 23px
			),
			#fff;
		position: relative;
	}

	.atelier-journal::before {
		content: '';
		position: absolute;
		top: 1.5rem;
		bottom: 1.5rem;
		left: 2.5rem;
		width: 2px;
		background: rgba(0, 0, 0, 0.2);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
	}

	.atelier-journal__entries {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.atelier-journal__entry {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.2rem;
		font-family: var(--font-mono, 'Space Mono', monospace);
	}

	.atelier-journal__index {
		width: 2.6rem;
		height: 2.6rem;
		border: 2px solid #000;
		border-radius: 999px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		background: #fff;
	}

	.atelier-journal__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		color: rgba(0, 0, 0, 0.6);
	}

	.atelier-journal__tag {
		border: 1px solid #000;
		padding: 0.2rem 0.6rem;
	}

	.atelier-journal__label {
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.25em;
	}

	.atelier-journal__detail {
		font-size: 0.8rem;
		color: rgba(0, 0, 0, 0.75);
		line-height: 1.6;
		max-width: 48ch;
	}

	@keyframes blueprint-pan {
		from {
			transform: rotate(var(--initial-rotation, 0deg)) translateY(0);
		}
		to {
			transform: rotate(var(--initial-rotation, 0deg)) translateY(60px);
		}
	}
</style>
