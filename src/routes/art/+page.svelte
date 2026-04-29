<script lang="ts">
	import { ArrowLeft, PlayCircle } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';

	const t = $derived(getTranslations($locale));
	const page = $derived(t.art_gallery);

	let hoveredItems = $state<Record<string, boolean>>({});
	let videos = $state<Record<string, HTMLVideoElement>>({});
	
	function handleMouseEnter(id: string) {
		hoveredItems[id] = true;
		if (videos[id]) {
			videos[id].play().catch(e => console.error("Video play failed", e));
		}
	}
	
	function handleMouseLeave(id: string) {
		hoveredItems[id] = false;
		if (videos[id]) {
			videos[id].pause();
		}
	}
</script>

<div itemscope itemtype="https://schema.org/CollectionPage" class="min-h-screen bg-paper text-ink">
	<section class="border-b-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{page.back}
				</a>
				<span class="kanji-tag bg-paper">{page.badge}</span>
			</div>

			<div class="space-y-6">
				<h1 itemprop="name" class="text-5xl md:text-7xl font-display uppercase tracking-[0.3em] transition-all duration-700 ease-out delay-100">
					{page.title}
				</h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">{page.description}</p>
				<p class="font-mono text-sm text-ink/60 flex items-center gap-2 border border-ink/30 px-3 py-1 inline-flex uppercase tracking-[0.2em] bg-ink/5">
					<PlayCircle size={16} class="text-accent" />
					{page.hover_hint}
				</p>
			</div>
		</div>
	</section>

	<section class="py-24 relative overflow-hidden">
		<!-- Diagonal abstract lines in the background -->
		<div class="absolute inset-0 pointer-events-none opacity-10">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
				<pattern id="diagonal-dots" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
					<rect width="2" height="2" fill="currentColor" />
				</pattern>
				<rect width="100%" height="100%" fill="url(#diagonal-dots)" />
			</svg>
		</div>

		<div class="mx-auto max-w-6xl px-6 relative z-10">
			<div class="grid gap-12 md:grid-cols-2">
				{#each page.list as item}
					<article class="manga-panel p-6 space-y-6 group bg-paper">
						<!-- Content Area -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div 
							class="relative aspect-[3/4] overflow-hidden border-2 border-ink cursor-crosshair bg-ink/5"
							onmouseenter={() => handleMouseEnter(item.id)}
							onmouseleave={() => handleMouseLeave(item.id)}
						>
							<!-- Image -->
							<img 
								src={item.image} 
								alt={item.title} 
								class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out" 
								class:opacity-100={!item.video || !hoveredItems[item.id]} 
								class:opacity-0={item.video && hoveredItems[item.id]} 
							/>
							
							<!-- Video -->
							{#if item.video}
								<video 
									bind:this={videos[item.id]}
									src={item.video}
									loop muted playsinline preload="auto"
									class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out" 
									class:opacity-100={hoveredItems[item.id]}
									class:opacity-0={!hoveredItems[item.id]}
								></video>
							{/if}

							<!-- Overlay Borders -->
							<div class="absolute inset-4 border-2 border-dashed border-ink/40 pointer-events-none transition-transform duration-500 group-hover:scale-[0.98]"></div>
						</div>
						
						<!-- Info Area -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<h2 class="text-3xl font-display uppercase tracking-[0.2em]">{item.title}</h2>
								{#if item.video}
									<span class="px-2 py-1 bg-ink text-paper text-[0.6rem] font-mono uppercase tracking-[0.4em] flex items-center gap-1">
										<PlayCircle size={12} /> Timelapse
									</span>
								{/if}
							</div>
							<p class="font-mono text-sm leading-relaxed text-ink/80">{item.description}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>
</div>
