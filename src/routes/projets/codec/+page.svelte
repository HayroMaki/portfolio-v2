<script lang="ts">
	import { ArrowLeft, Database, Globe, Code, Zap, Users, PenTool, Monitor } from 'lucide-svelte';
    import { CoDec, Histogram } from 'codecjs';
    import { fade } from 'svelte/transition';
	import { locale } from '$lib/stores/locale';
	import { _t } from '$lib/i18n';

	/**
	 * Wrapper to not have to put locale every time
	 * @param slug the translation slug path
	 */
	function t(slug: string) {
		return _t('project_pages.codec.' + slug, $locale);
	}

	const iconMap: Record<string, typeof PenTool> = {
		code: Code,
		zap: Zap,
		database: Database,
		monitor: Monitor,
        globe: Globe,
        users: Users
	} as const;

    let currentStep = 0;
    
    function nextStep() {
        if (currentStep < 3) currentStep++;
    }

    function prevStep() {
        if (currentStep > 0) currentStep--;
    }

    function resetDemo(resetFn: () => void) {
        currentStep = 0;
        resetFn();
    }
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
						<p class="text-3xl font-display">{stat.value}</p>
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
					{#each t('crew') as person}
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

				<div class="manga-panel p-8 z-20 space-y-6">
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
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
				{#each t('sections.architecture.cards') as card}
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

	<!-- Interactive Demo Section -->
    <section class="border-t-2 border-ink bg-paper py-24">
        <div class="mx-auto max-w-7xl px-6 space-y-12">
            <div class="max-w-3xl">
                <div class="kanji-tag bg-paper mb-6">{t('sections.demo.tag')}</div>
                <h2 class="text-4xl md:text-5xl font-display uppercase tracking-[0.3em] mb-6">{t('sections.demo.title')}</h2>
                <div class="space-y-4 font-mono text-sm leading-relaxed text-ink/80">
                    {#each t('sections.demo.description') as paragraph}
                        <p>{paragraph}</p>
                    {/each}
                </div>
            </div>

            <CoDec let:processFile let:isProcessing let:originalUrl let:diffUrl let:reconstructedUrl let:originalImageData let:reconstructedImageData let:diffImageData let:stats let:reset>
                <div class="manga-panel z-20 p-8 min-h-[600px] flex flex-col relative overflow-hidden">
                    
                    <!-- Progress Steps -->
                    {#if originalUrl}
                        <div class="flex justify-between items-center mb-8 border-b-2 border-ink/10 pb-4">
                            {#each t('sections.demo.ui.steps') as step, i}
                                <div class="flex items-center gap-2 {i === currentStep ? 'opacity-100' : 'opacity-30'} transition-opacity">
                                    <div class="w-8 h-8 flex items-center justify-center border-2 border-ink font-display text-sm {i === currentStep ? 'bg-ink text-paper' : ''}">
                                        {i}
                                    </div>
                                    <span class="hidden sm:inline font-mono text-xs uppercase tracking-[0.2em]">{step}</span>
                                </div>
                                {#if i < t('sections.demo.ui.steps').length - 1}
                                    <div class="flex-1 h-px bg-ink/20 mx-4 hidden sm:block"></div>
                                {/if}
                            {/each}
                        </div>
                    {/if}

                    <div class="flex-1 flex flex-col items-center justify-center relative">
                        {#if !originalUrl}
                            <!-- Step 0: Upload -->
                            <div class="text-center space-y-8" in:fade>
                                <input type="file" id="demo-file" class="hidden" accept="image/*" 
                                       on:change={(e) => {
                                           const input = e.currentTarget;
                                           if(input.files?.length) {
                                               processFile(input.files[0]);
                                               currentStep = 1;
                                           }
                                       }} 
                                />
                                <button 
                                    type="button"
                                    class="relative group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/40"
                                    on:click={() => document.getElementById('demo-file')?.click()}
                                    on:keydown={(event) => {
                                        if(event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            document.getElementById('demo-file')?.click();
                                        }
                                    }}
                                    on:drop|preventDefault={(e) => {
                                        if(e.dataTransfer?.files.length) processFile(e.dataTransfer.files[0]);
                                    }}
                                    on:dragover|preventDefault
                                >
                                    <span class="sr-only">{t('sections.demo.controls.drop')}</span>
                                    <div class="w-64 h-64 border-4 border-dashed border-ink/30 flex flex-col items-center justify-center gap-4 transition-all group-hover:border-ink group-hover:bg-ink/5">
                                        {#if isProcessing}
                                            <div class="animate-spin w-12 h-12 border-4 border-ink border-t-transparent rounded-full"></div>
                                            <p class="font-mono text-xs uppercase tracking-[0.2em] animate-pulse">{t('sections.demo.controls.compressing')}</p>
                                        {:else}
                                            <Zap size={48} class="text-ink/40 group-hover:scale-110 transition-transform" />
                                            <p class="font-mono text-lg uppercase tracking-[0.2em]">{t('sections.demo.controls.drop')}</p>
                                            <p class="text-xs font-mono text-ink/50">{t('sections.demo.controls.formats')}</p>
                                        {/if}
                                    </div>
                                </button>
                            </div>
                        {:else}
                            <!-- Content Slides -->
                            <div class="w-full h-full flex flex-col items-center gap-6" in:fade>
                                
                                <div class="relative flex-1 w-full flex items-center justify-center bg-ink/5 border-2 border-ink p-4 min-h-[300px]">
                                    {#if currentStep === 1 && originalUrl}
                                        <div class="absolute inset-0 flex items-center justify-center p-4" in:fade={{ duration: 400 }}>
                                            <img src={originalUrl} alt={t('sections.demo.ui.alts.original')} class="max-w-full max-h-full object-contain shadow-lg" />
                                        </div>
                                    {:else if currentStep === 2 && diffUrl}
                                        <div class="absolute inset-0 flex items-center justify-center p-4" in:fade={{ duration: 400 }}>
                                            <img src={diffUrl} alt={t('sections.demo.ui.alts.diff')} class="w-auto max-w-full max-h-full object-contain shadow-lg" />
                                        </div>

                                    {:else if currentStep === 3 && reconstructedUrl}
                                        <div class="absolute inset-0 flex items-center justify-center p-4" in:fade={{ duration: 400 }}>
                                            <img src={reconstructedUrl} alt={t('sections.demo.ui.alts.reconstructed')} class="max-w-full max-h-full object-contain shadow-lg" />
                                        </div>
                                    {/if}
                                </div>

                                <!-- Histograms & Stats area -->
                                <div class="w-full grid md:grid-cols-[1fr,auto] gap-6 items-end">
                                    <div class="space-y-2">
                                        <p class="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
                                            {#if currentStep === 1}{t('sections.demo.ui.histograms.original')}
                                            {:else if currentStep === 2}{t('sections.demo.ui.histograms.differential')}
                                            {:else if currentStep === 3}{t('sections.demo.ui.histograms.reconstructed')}{/if}
                                        </p>
                                        <div class="h-24 bg-paper border border-ink/20 relative">
                                            {#if currentStep === 1 && originalImageData}
                                                <div class="absolute inset-0" in:fade>
                                                    <Histogram data={originalImageData} height={96} className="w-full h-full" color="rgb" />
                                                </div>
                                            {:else if currentStep === 2 && diffImageData}
                                                <div class="absolute inset-0" in:fade>
                                                    <Histogram data={diffImageData} height={96} className="w-full h-full" color="rgb" />
                                                </div>
                                            {:else if currentStep === 3 && reconstructedImageData}
                                                <div class="absolute inset-0" in:fade>
                                                    <Histogram data={reconstructedImageData} height={96} className="w-full h-full" color="rgb" />
                                                </div>
                                            {/if}
                                        </div>
                                    </div>


                                    <div class="min-w-60 flex flex-col gap-1">
                                        {#if currentStep === 3}
                                            <div class="flex flex-col mr-4 text-right">
                                                <span class="font-display text-2xl text-accent">{stats.ratio.toFixed(1)}%</span>
                                                <span class="font-mono text-xs text-ink/50">{t('sections.demo.ui.stats.ratio')}</span>
                                            </div>
                                        {/if}
                                        <!-- Navigation -->
                                        <div class="flex justify-end gap-4">
                                            <button 
                                                class="border-2 border-ink bg-paper px-6 py-2 font-mono text-xs uppercase tracking-[0.35em] transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/30 disabled:hover:bg-ink/30"
                                                on:click={prevStep} 
                                                disabled={currentStep <= 1}
                                            >
                                                {t('sections.demo.ui.buttons.prev')}
                                            </button>
                                            
                                            {#if currentStep < 3}
                                                <button 
                                                    class="border-2 border-ink bg-ink text-paper px-6 py-2 font-mono text-xs uppercase tracking-[0.35em] transition hover:bg-paper hover:text-ink"
                                                    on:click={nextStep}
                                                >
                                                    {t('sections.demo.ui.buttons.next')}
                                                </button>
                                            {:else}
                                                <button 
                                                    class="border-2 border-ink bg-ink text-paper px-6 py-2 font-mono text-xs uppercase tracking-[0.35em] transition hover:bg-paper hover:text-ink"
                                                    on:click={() => resetDemo(reset)}
                                                >
                                                    {t('sections.demo.ui.buttons.reset')}
                                                </button>
                                            {/if}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        {/if}
                    </div>
                </div>
            </CoDec>
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
					<div class="manga-panel z-20 p-6 flex items-start gap-4 hover:shadow-divider transition-shadow">
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
			<div class="manga-panel z-20 p-10 space-y-8">
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
