<script lang="ts">
	import { ArrowRight, Code2, Briefcase, GraduationCap, ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	
	let scrollY = $state(0);
	let mounted = $state(false);
	let aboutVisible = $state(false);
	let parcoursVisible = $state(false);
	let projetsVisible = $state(false);
	
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
	
	const projects = [
		{
			title: 'MCP Server',
			description: 'Serveur MCP pour la création de meubles via IA avec intégration ChatGPT/Claude',
			tags: ['TypeScript', 'Svelte', 'IA', 'MCP'],
			href: '/projets/mcp',
			featured: true
		},
		{
			title: 'Configurateurs Easy',
			description: 'Suite de configurateurs 3D interactifs pour meubles sur mesure',
			tags: ['Svelte', 'TypeScript', '3D', 'Canvas'],
			href: '/projets/configurateurs',
			featured: true
		},
		{
			title: 'Travia',
			description: 'Application web de recherche de trajets optimisés dans Star Wars',
			tags: ['Java', 'C', 'JavaScript', 'MySQL'],
			href: '/projets/travia'
		},
		{
			title: 'SpeedyWiki',
			description: 'Jeu multijoueur de speedrun Wikipedia en temps réel',
			tags: ['WebSocket', 'Express', 'Git'],
			href: '/projets/speedywiki'
		}
	];
	
	const timeline = [
		{ year: '2026', event: 'Diplôme BUT Informatique + École d\'ingénieur', status: 'future' },
		{ year: '2025', event: 'Stage puis alternance chez Dessine ton meuble/Aryga', status: 'current' },
		{ year: '2023', event: 'BAC STI2D mention Très Bien + Entrée en BUT', status: 'past' }
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
							Développeur Full-Stack
						</div>
						<h1 class="text-5xl md:text-7xl font-bold leading-tight">
							Jules<br/>
							<span class="text-gradient">Renaud-Grange</span>
						</h1>
						<p class="text-xl text-white/70 max-w-xl">
							Étudiant en BUT Informatique, passionné par le développement web moderne et l'innovation technologique.
						</p>
					</div>
					
					<div class="flex flex-wrap gap-4">
						<a href="#projets" class="group inline-flex items-center gap-2 px-6 py-3 bg-[#00ffc8] text-black font-medium rounded-lg hover:bg-[#00d4aa] transition-all hover:scale-105">
							Voir mes projets
							<ArrowRight size={18} class="group-hover:translate-x-1 transition-transform" />
						</a>
						<a href="#parcours" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
							Mon parcours
						</a>
					</div>
					
					<div class="flex items-center gap-8 pt-4">
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">4+</div>
							<div class="text-sm text-white/50">Projets majeurs</div>
						</div>
						<div class="w-px h-12 bg-white/10"></div>
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">2+</div>
							<div class="text-sm text-white/50">Ans d'expérience</div>
						</div>
						<div class="w-px h-12 bg-white/10"></div>
						<div class="space-y-1">
							<div class="text-3xl font-bold text-gradient">∞</div>
							<div class="text-sm text-white/50">Motivation</div>
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
			<div class="grid lg:grid-cols-3 gap-8" style="opacity: {aboutVisible ? 1 : 0}; transform: translateY({aboutVisible ? 0 : 40}px); transition: all 0.8s ease-out;">
				<div class="lg:col-span-2 space-y-6">
					<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium">
						À propos
					</div>
					<h2 class="text-4xl md:text-5xl font-bold">
						Un développeur passionné,<br/>
						<span class="text-gradient">toujours en mouvement</span>
					</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Grand lecteur de manga et de romans, j'aime créer des expériences web qui racontent une histoire. 
							Mon approche du développement mélange esthétique street et brut avec des animations fluides et une UX soignée.
						</p>
						<p>
							Actuellement en alternance chez <span class="text-white font-medium">Dessine ton meuble/Aryga</span>, 
							je travaille sur des projets innovants alliant 3D, IA et développement web moderne.
						</p>
						<p>
							Mec chill mais sérieux quand il le faut, je cherche toujours à apprendre et à repousser les limites 
							de ce qui est possible avec le code.
						</p>
					</div>
				</div>
				
				<div class="space-y-6">
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
						<Code2 size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">Stack technique</h3>
						<div class="flex flex-wrap gap-2">
							{#each ['TypeScript', 'Svelte', 'React', 'Java', 'C', 'MySQL', 'Git'] as tech}
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">
									{tech}
								</span>
							{/each}
						</div>
					</div>
					
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
						<Briefcase size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">Expérience</h3>
						<p class="text-white/70">
							Alternance chez Dessine ton meuble/Aryga depuis 2025
						</p>
					</div>
					
					<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
						<GraduationCap size={32} class="text-[#00ffc8] mb-4" />
						<h3 class="text-xl font-bold mb-2">Formation</h3>
						<p class="text-white/70">
							BUT Informatique<br/>
							BAC STI2D mention TB (2023)
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<section id="parcours" class="py-32 bg-white/[0.02]">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16" style="opacity: {parcoursVisible ? 1 : 0}; transform: translateY({parcoursVisible ? 0 : 40}px); transition: all 0.8s ease-out;">
				<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium mb-4">
					Timeline
				</div>
				<h2 class="text-4xl md:text-5xl font-bold">
					Mon <span class="text-gradient">parcours</span>
				</h2>
			</div>
			
			<div class="relative max-w-3xl mx-auto" style="opacity: {parcoursVisible ? 1 : 0}; transform: translateY({parcoursVisible ? 0 : 40}px); transition: all 0.8s ease-out 0.2s;">
				<div class="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ffc8] via-white/20 to-[#00d4aa]"></div>
				
				{#each timeline as item, i}
					<div class="relative mb-12 last:mb-0">
						<div class="flex items-center gap-8 {i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}">
							<div class="flex-1 {i % 2 === 0 ? 'text-right' : 'text-left'}">
								<div class="inline-block p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
									<div class="text-2xl font-bold text-[#00ffc8] mb-2">{item.year}</div>
									<div class="text-white/90">{item.event}</div>
								</div>
							</div>
							
							<div class="relative z-10">
								<div class="w-4 h-4 rounded-full bg-[#00ffc8] ring-4 ring-[#0a0a0a] {item.status === 'current' ? 'animate-pulse' : ''}"></div>
							</div>
							
							<div class="flex-1"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<section id="projets" class="py-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16" style="opacity: {projetsVisible ? 1 : 0}; transform: translateY({projetsVisible ? 0 : 40}px); transition: all 0.8s ease-out;">
				<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium mb-4">
					Portfolio
				</div>
				<h2 class="text-4xl md:text-5xl font-bold mb-4">
					Mes <span class="text-gradient">projets</span>
				</h2>
				<p class="text-white/70 text-lg max-w-2xl mx-auto">
					Une sélection de mes réalisations les plus significatives, des projets universitaires aux développements en entreprise.
				</p>
			</div>
			
			<div class="grid md:grid-cols-2 gap-6" style="opacity: {projetsVisible ? 1 : 0}; transform: translateY({projetsVisible ? 0 : 40}px); transition: all 0.8s ease-out 0.2s;">
				{#each projects as project}
					<a 
						href={project.href}
						class="group relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-[1.02] {project.featured ? 'md:col-span-2 lg:col-span-1' : ''}"
					>
						{#if project.featured}
							<div class="absolute top-4 right-4 px-3 py-1 bg-[#00ffc8]/20 border border-[#00ffc8]/50 rounded-full text-xs text-[#00ffc8] font-medium">
								Featured
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
							Voir le projet
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
