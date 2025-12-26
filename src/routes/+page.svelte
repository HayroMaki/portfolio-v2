<script lang="ts">
	import { ArrowRight, PenTool, Sparkles, Zap, BookHeart } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';

	const tickerItems = ["I HATE PHP", "LET'S WORK (or not)", "I HOPE YOU LIKE MY PORTFOLIO", "", "PROPAGANDA !!!"];
	const technos = ['Python','Java','C','Bash','HTML/CSS', 'PHP','JS/TS','React','Svelte','MySQL','MongoDB','Git','Docker', "j'en ai peut-être oublié..."];

	type TimelineAlign = 'left' | 'right' | 'center';
	type TimelineEvent = {
		date: string;
		title: string;
		description: string;
		align: TimelineAlign;
		subEvents?: string[];
	};

	const t = $derived(getTranslations($locale));
	const timelineEvents = $derived<TimelineEvent[]>(
		t.journey.items.map((item, i) => {
			const enriched = item as typeof item & { sub_events?: string[] };
			return {
				date: item.year,
				title: item.title,
				description: item.description,
				subEvents: enriched.sub_events ?? [],
				align: (item.align ?? (i % 2 === 0 ? 'left' : 'right')) as TimelineAlign
			};
		})
	);

	let heroReady = $state(false);
	let atelierVisible = $state(false);
	let timelineVisible = $state(false);
	let projectsVisible = $state(false);

	const projectsData = [
		{ href: '/projets/mcp', featured: true },
		{ href: '/projets/configurateurs', featured: true },
		{ href: '/projets/travia', featured: false },
		{ href: '/projets/speedywiki', featured: false }
	];

	onMount(() => {
		heroReady = true;

		type SectionId = 'atelier' | 'timeline' | 'projects';
		const sectionConfig: Record<SectionId, (value: boolean) => void> = {
			atelier: (value) => (atelierVisible = value),
			timeline: (value) => (timelineVisible = value),
			projects: (value) => (projectsVisible = value)
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const setter = sectionConfig[entry.target.id as SectionId];
					if (setter) {
						setter(true);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.35 }
		);

		(Object.keys(sectionConfig) as SectionId[]).forEach((id) => {
			const node = document.getElementById(id);
			if (node) observer.observe(node);
		});

		return () => observer.disconnect();
	});
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
						<span class="kanji-tag bg-paper animate-scribble">{t.hero.badge}</span>
					</div>

					<div class="space-y-5">
						<h1 class="stroke-title leading-[0.85]">
							{t.hero.name} <strong>{t.hero.surname}</strong>
						</h1>
						<p class="max-w-2xl text-lg leading-relaxed font-mono text-ink/80">
							{t.hero.description}
						</p>
					</div>

					<div class="flex flex-wrap gap-4">
						<a
							href="#projects"
							class="inline-flex items-center gap-3 bg-ink text-paper px-7 py-3 uppercase tracking-[0.3em] border-2 border-ink shadow-panel transition hover:-translate-y-1"
						>
							{t.hero.cta_projects}
							<ArrowRight size={18} />
						</a>
						<a
							href="#timeline"
							class="inline-flex items-center gap-2 px-6 py-3 border-2 border-dashed border-ink uppercase tracking-[0.3em] font-mono hover:bg-ink/90 hover:text-paper transition"
						>
							{t.hero.cta_journey}
						</a>
					</div>

					<div class="flex flex-wrap gap-8 border-y-2 border-ink py-6 font-mono uppercase tracking-[0.4em] text-sm">
						<div>
							<p class="text-4xl font-display">8+</p>
							<p>{t.hero.stats.projects}</p>
						</div>
						<div>
							<p class="text-4xl font-display">2+</p>
							<p>{t.hero.stats.experience}</p>
						</div>
						<div>
							<p class="text-4xl font-display">∞</p>
							<p>{t.hero.stats.motivation}</p>
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
			<div class="flex gap-10 py-4 font-mono uppercase tracking-[0.5em] whitespace-nowrap tape-marquee">
				{#each [...tickerItems, ...tickerItems] as label}
					<span class="flex items-center gap-4">
						{label}
						<span class="inline-block h-2 w-2 rounded-full bg-paper"></span>
					</span>
				{/each}
			</div>
		</div>
	</section>

	<section id="atelier" class="relative py-28">
		<div class="absolute inset-x-0 top-12 mx-auto w-11/12 h-full border-2 border-dashed border-ink pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-6xl px-6">
			<div
				class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-start"
				class:opacity-0={!atelierVisible}
				class:translate-y-12={!atelierVisible}
			>
				<div class="space-y-6">
					<div class="kanji-tag bg-paper">{t.about.badge}</div>
					<h2 class="text-4xl md:text-5xl font-display leading-tight uppercase tracking-[0.3em]">
						{t.about.title}
						<span class="block text-ink/40">{t.about.title_highlight}</span>
					</h2>
					<div class="space-y-4 font-mono text-base leading-relaxed text-ink/80">
						<p>{t.about.p1}</p>
						<p>{t.about.p2}</p>
						<p>{t.about.p3}</p>
					</div>
					<div class="flex flex-wrap gap-3 pt-4">
						{#each technos as tech}
							<span class="px-4 py-2 border-2 border-ink bg-paper shadow-panel text-xs font-mono uppercase tracking-[0.3em]">
								{tech}
							</span>
						{/each}
					</div>
				</div>

				<div class="grid gap-6 md:grid-cols-2">
					<div class="manga-panel p-6 space-y-4 animate-panel-rise delay-150">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<PenTool size={20} />
							{t.about.experience.title}
						</div>
						<p class="text-sm font-mono leading-relaxed text-ink/80">{t.about.experience.current}</p>
					</div>
					<div class="manga-panel p-6 space-y-4 animate-panel-rise delay-200">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<Sparkles size={20} />
							{t.about.education.title}
						</div>
						<p class="text-sm font-mono leading-relaxed text-ink/80">
							{t.about.education.degree}<br />
							{t.about.education.bac}
						</p>
					</div>
					<div class="manga-panel p-6 space-y-4 animate-panel-rise delay-300 md:col-span-2">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<Zap size={20} />
							{t.about.mentality.title}
						</div>
						<p class="text-sm font-mono leading-relaxed text-ink/80">
							{t.about.mentality.p1}
						</p>
					</div> 
					<div class="manga-panel p-6 space-y-4 animate-panel-rise delay-400 md:col-span-2">
						<div class="flex items-center gap-3 font-mono uppercase text-xs tracking-[0.3em]">
							<BookHeart size={20} />
							{t.about.passions.title}
						</div>
						<p class="text-sm font-mono leading-relaxed text-ink/80">
							{t.about.passions.p1}
							<br />
							{t.about.passions.p2}
							<br />
							{t.about.passions.p3}
							<br />
							{t.about.passions.p4}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="timeline" class="relative py-32 overflow-hidden bg-ink text-paper">
		<div class="absolute inset-0 opacity-10 bg-paper-fiber mix-blend-screen pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-5xl px-6">
			<div
				class="text-center space-y-4 transition-all duration-700"
				class:opacity-0={!timelineVisible}
				class:-translate-y-6={!timelineVisible}
			>
				<div class="inline-flex px-4 py-2 border border-paper/60 uppercase font-mono tracking-[0.4em]">
					{t.journey.badge}
				</div>
				<h2 class="text-5xl font-display uppercase tracking-[0.35em]">
					{t.journey.title}
					<span class="text-accent"> {t.journey.title_highlight}</span>
				</h2>
			</div>

			<div class="mt-16 relative">
				<div class="absolute inset-0 mx-auto hidden w-px bg-paper/20 md:block"></div>
				<div
					class="space-y-12"
					class:opacity-0={!timelineVisible}
					class:translate-y-10={!timelineVisible}
				>
					{#each timelineEvents as event, index}
						<article class="relative grid gap-8 md:grid-cols-2 md:items-center">
							<div class="hidden md:block h-3 w-3 rounded-full border-2 border-paper absolute left-1/2 -translate-x-1/2 bg-ink" style={`top: calc(50% - 0.375rem);`}></div>
							<div class="space-y-3">
								<p class="text-xs font-mono uppercase tracking-[0.4em] text-accent">Arc {index + 1} — {event.date}</p>
								<p class="text-3xl font-display uppercase tracking-[0.2em]">{event.title}</p>
								<p class="mt-2 text-sm font-mono text-paper/70 leading-relaxed">{event.description}</p>
							</div>
							<div class="relative">
								<div class="manga-panel bg-black/30 p-6">
									<div class="flex items-center justify-between text-xs font-mono uppercase tracking-[0.4em] text-paper/70">
										<span>Panel {index + 1}</span>
										<span>進化</span>
									</div>
									<div class="mt-5 space-y-3">
										{#if event.subEvents && event.subEvents.length}
											<ul class="space-y-2 font-mono text-sm text-paper/80">
												{#each event.subEvents as sub}
													<li class="flex items-start gap-2">
														<span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
														<span>{sub}</span>
													</li>
												{/each}
											</ul>
										{:else}
											<p class="font-mono text-sm text-paper/60 leading-relaxed">
												... c'est vide ici...
											</p>
										{/if}
									</div>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section
		id="projects"
		class="relative py-32"
		class:opacity-0={!projectsVisible}
		class:translate-y-10={!projectsVisible}
	>
		<div class="absolute inset-x-6 top-12 bottom-12 border-2 border-ink/70 pointer-events-none"></div>
		<div class="container relative z-10 mx-auto max-w-6xl px-6 space-y-12">
			<div class="text-center space-y-4">
				<div class="inline-flex px-4 py-2 border-2 border-ink uppercase font-mono tracking-[0.4em]">
					{t.projects.badge}
				</div>
				<h2 class="text-5xl font-display uppercase tracking-[0.35em]">
					{t.projects.title}
					<span class="text-accent"> {t.projects.title_highlight}</span>
				</h2>
				<p class="mx-auto max-w-2xl font-mono text-base text-ink/80 leading-relaxed">{t.projects.description}</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				{#each projectsData as projectData, i}
					{@const project = t.projects.list[i]}
					<a
						href={projectData.href}
						class={`manga-panel block p-8 transition-all hover:-translate-y-2 hover:shadow-divider ${
							projectData.featured ? 'md:col-span-2 lg:col-span-1' : ''
						}`}
					>
						<div class="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.4em]">
							<span>project {i + 1}</span>
							{#if projectData.featured}
								<span class="px-3 py-1 border border-ink bg-ink text-paper">{t.projects.featured}</span>
							{/if}
						</div>
						<h3 class="mt-4 text-3xl font-display uppercase tracking-[0.2em]">{project.title}</h3>
						<p class="mt-3 font-mono text-sm text-ink/80 leading-relaxed">{project.description}</p>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span class="px-3 py-1 border border-dashed border-ink text-xs font-mono uppercase tracking-[0.3em]">
									{tag}
								</span>
							{/each}
						</div>
						<div class="mt-6 inline-flex items-center gap-3 border-b-2 border-ink text-sm font-mono uppercase tracking-[0.4em]">
							{t.projects.cta}
							<ArrowRight size={16} />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
	.tape-marquee {
		animation: marquee 18s linear infinite;
	}

	.tape-marquee:hover {
		animation-play-state: paused;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
