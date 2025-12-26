<script lang="ts">
	import { ArrowRight, Code2, Briefcase, GraduationCap, ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';
	
	let scrollY = $state(0);
	let mounted = $state(false);
	let aboutVisible = $state(false);
	let parcoursVisible = $state(false);
	let projetsVisible = $state(false);
	
	const t = $derived(getTranslations($locale));
	
	onMount(() => {
		mounted = true;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);
		
		// Intersection Observer pour les animations au scroll
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target.id === 'about') aboutVisible = true;
						if (entry.target.id === 'parcours') parcoursVisible = true;
						if (entry.target.id === 'projets') projetsVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);
		
		const aboutSection = document.getElementById('about');
		const parcoursSection = document.getElementById('parcours');
		const projetsSection = document.getElementById('projets');
		
		if (aboutSection) observer.observe(aboutSection);
		if (parcoursSection) observer.observe(parcoursSection);
		if (projetsSection) observer.observe(projetsSection);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
	
	const projectsData = [
		{ href: '/projets/mcp', featured: true },
		{ href: '/projets/configurateurs', featured: true },
		{ href: '/projets/travia', featured: false },
		{ href: '/projets/speedywiki', featured: false }
	];
</script>

<div class="relative">
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<div class="absolute inset-0 opacity-30">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ffc8]/20 rounded-full blur-[120px] animate-pulse"></div>
			<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4aa]/20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1s;"></div>
		</div>
		
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div class="grid lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-8" style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px); transition: all 0.8s ease-out;">
					<div class="space-y-4">
						<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium">
							{t.hero.badge}
						</div>
						<h1 class="text-5xl md:text-7xl font-bold leading-tight">
							{t.hero.name} <span class="text-gradient">{t.hero.surname}</span>
						</h1>
						<p class="text-xl text-white/70 max-w-xl">
							{t.hero.description}
						</p>
					</div>
					
					<div class="flex flex-wrap gap-4">
						<a href="#projets" class="group inline-flex items-center gap-2 px-6 py-3 bg-[#00ffc8] text-black font-medium rounded-lg hover:bg-[#00d4aa] transition-all hover:scale-105">
							{t.hero.cta_projects}
							<ArrowRight size={18} class="group-hover:translate-x-1 transition-transform" />
						</a>
						<a href="#parcours" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
							{t.hero.cta_journey}
						</a>
					</div>
					
					<div class="flex items-center gap-8 pt-4">
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">4+</div>
							<div class="text-sm text-white/50">{t.hero.stats.projects}</div>
						</div>
						<div class="w-px h-12 bg-white/10"></div>
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">2+</div>
							<div class="text-sm text-white/50">{t.hero.stats.experience}</div>
						</div>
						<div class="w-px h-12 bg-white/10"></div>
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">∞</div>
							<div class="text-sm text-white/50">{t.hero.stats.motivation}</div>
						</div>
					</div>
				</div>
				
				<div class="relative" style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px); transition: all 0.8s ease-out 0.2s;">
					<div class="relative aspect-square max-w-md mx-auto">
						<div class="absolute inset-0 bg-gradient-to-br from-[#00ffc8]/20 to-[#00d4aa]/20 rounded-2xl blur-2xl"></div>
						<div class="relative w-full h-full border-2 border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm flex items-center justify-center">
							<div class="text-white/30 text-center">
								<div class="text-6xl mb-4">📸</div>
								<p class="text-sm">Photo à venir</p>
							</div>
						</div>
						<div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#00ffc8] rounded-lg rotate-12"></div>
						<div class="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-[#00d4aa] rounded-lg -rotate-6"></div>
					</div>
				</div>
			</div>
		</div>
		
		<a href="#about" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-[#00ffc8] transition-colors animate-bounce">
			<ChevronDown size={32} />
		</a>
	</section>
	
	<section id="about" class="py-32 relative">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-3 gap-8">
				<div class="lg:col-span-2 space-y-6" style="opacity: {aboutVisible ? 1 : 0}; transform: translateX({aboutVisible ? 0 : -60}px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);">
					<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium">
						{t.about.badge}
					</div>
					<h2 class="text-4xl md:text-5xl font-bold">
						{t.about.title}<br/>
						<span class="text-gradient">{t.about.title_highlight}</span>
					</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>{t.about.p1}</p>
						<p>
							{t.about.p2.split('Dessine ton meuble/Aryga')[0]}
							<span class="text-white font-medium">Dessine ton meuble/Aryga</span>{t.about.p2.split('Dessine ton meuble/Aryga')[1]}
						</p>
						<p>{t.about.p3}</p>
					</div>
				</div>
				
				<div class="space-y-6" style="opacity: {aboutVisible ? 1 : 0}; transform: translateX({aboutVisible ? 0 : 60}px) rotate({aboutVisible ? 0 : 5}deg); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;">
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300">
						<Code2 size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">{t.about.stack.title}</h3>
						<div class="flex flex-wrap gap-2">
							{#each ['TypeScript', 'Svelte', 'React', 'Java', 'C', 'MySQL', 'Git'] as tech}
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">
									{tech}
								</span>
							{/each}
						</div>
					</div>
					
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300">
						<Briefcase size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">{t.about.experience.title}</h3>
						<p class="text-white/70">{t.about.experience.current}</p>
					</div>
					
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300">
						<GraduationCap size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">{t.about.education.title}</h3>
						<p class="text-white/70">
							{t.about.education.degree}<br/>
							{t.about.education.bac}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="parcours" class="py-32 bg-white/[0.02] overflow-hidden">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16" style="opacity: {parcoursVisible ? 1 : 0}; transform: scale({parcoursVisible ? 1 : 0.9}); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
				<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium mb-4">
					{t.journey.badge}
				</div>
				<h2 class="text-4xl md:text-5xl font-bold">
					{t.journey.title} <span class="text-gradient">{t.journey.title_highlight}</span>
				</h2>
			</div>
			
			<!-- Timeline horizontale avec scroll -->
			<div class="relative" style="opacity: {parcoursVisible ? 1 : 0}; transform: translateY({parcoursVisible ? 0 : 60}px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;">
				<!-- Ligne horizontale principale -->
				<div class="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00ffc8] via-white/20 to-[#00d4aa] -translate-y-1/2"></div>
				
				<!-- Items de la timeline -->
				<div class="relative flex justify-between items-center min-h-[400px] py-8">
					{#each t.journey.items as item, i}
						<div class="flex-1 relative" style="opacity: {parcoursVisible ? 1 : 0}; transform: translateY({parcoursVisible ? 0 : 40}px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) {0.4 + i * 0.15}s;">
							<!-- Point sur la ligne -->
							<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
								<div class="w-6 h-6 rounded-full bg-[#00ffc8] ring-4 ring-[#0a0a0a] {i === 2 ? 'animate-pulse scale-125' : ''} hover:scale-150 transition-transform duration-300"></div>
							</div>
							
							<!-- Carte alternée haut/bas -->
							<div class="absolute left-1/2 -translate-x-1/2 {i % 2 === 0 ? 'bottom-full mb-12' : 'top-full mt-12'} w-64">
								<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:scale-105 hover:rotate-2 transition-all duration-300 group">
									<div class="text-3xl font-bold text-[#00ffc8] mb-2 group-hover:scale-110 transition-transform">{item.year}</div>
									<h3 class="text-lg font-bold text-white mb-2">{item.title}</h3>
									<p class="text-sm text-white/70">{item.description}</p>
									
									<!-- Flèche vers le point -->
									<div class="absolute left-1/2 -translate-x-1/2 {i % 2 === 0 ? 'bottom-0 translate-y-full' : 'top-0 -translate-y-full'}">
										<div class="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
	
	<section id="projets" class="py-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16" style="opacity: {projetsVisible ? 1 : 0}; transform: translateY({projetsVisible ? 0 : 40}px) rotate({projetsVisible ? 0 : -3}deg); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);">
				<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium mb-4">
					{t.projects.badge}
				</div>
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					{t.projects.title} <span class="text-gradient">{t.projects.title_highlight}</span>
				</h2>
				<p class="text-white/70 text-lg max-w-2xl mx-auto">
					{t.projects.description}
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-6">
				{#each projectsData as projectData, i}
					{@const project = t.projects.list[i]}
					<a 
						href={projectData.href}
						class="group relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-[1.02] hover:-rotate-1 {projectData.featured ? 'md:col-span-2 lg:col-span-1' : ''}"
						style="opacity: {projetsVisible ? 1 : 0}; transform: translateX({projetsVisible ? 0 : (i % 2 === 0 ? -60 : 60)}px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) {0.2 + i * 0.1}s;"
					>
						{#if projectData.featured}
							<div class="absolute top-4 right-4 px-3 py-1 bg-[#00ffc8]/20 border border-[#00ffc8]/50 rounded-full text-xs text-[#00ffc8] font-medium">
								{t.projects.featured}
							</div>
						{/if}
						
						<h3 class="text-2xl font-bold mb-3 group-hover:text-[#00ffc8] transition-colors">
							{project.title}
						</h3>
						<p class="text-white/70 mb-6">
							{project.description}
						</p>
						
						<div class="flex flex-wrap gap-2 mb-6">
							{#each project.tags as tag}
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">
									{tag}
								</span>
							{/each}
						</div>
						
						<div class="flex items-center gap-2 text-[#00ffc8] font-medium">
							{t.projects.cta}
							<ArrowRight size={16} class="group-hover:translate-x-1 transition-transform" />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	@keyframes pulse {
		0%, 100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.5;
		}
	}
	
	@keyframes bounce {
		0%, 100% {
			transform: translateY(0) translateX(-50%);
		}
		50% {
			transform: translateY(-10px) translateX(-50%);
		}
	}
	
	.animate-pulse {
		animation: pulse 3s ease-in-out infinite;
	}
	
	.animate-bounce {
		animation: bounce 2s ease-in-out infinite;
	}
</style>
