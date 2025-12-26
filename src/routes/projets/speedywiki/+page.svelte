<script lang="ts">
	import { ArrowLeft, Zap, Users, GitBranch, Globe, MessageSquare } from 'lucide-svelte';
</script>

<div class="min-h-screen">
	<div class="relative py-20 overflow-hidden">
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00ffc8]/20 rounded-full blur-[120px]"></div>
		</div>
		
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<a href="/" class="inline-flex items-center gap-2 text-white/70 hover:text-[#00ffc8] transition-colors mb-8">
				<ArrowLeft size={20} />
				Retour
			</a>
			
			<div class="space-y-6 mb-12">
				<div class="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-[#00ffc8] font-medium">
					Projet Universitaire
				</div>
				<h1 class="text-5xl md:text-7xl font-bold">
					<span class="text-gradient">SpeedyWiki</span>
				</h1>
				<p class="text-xl text-white/70 max-w-3xl">
					Jeu multijoueur de speedrun Wikipedia dans le navigateur, développé en équipe 
					avec des outils collaboratifs et des bonnes pratiques de communication.
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-6 mb-16">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">Temps réel</div>
					<div class="text-white/70">WebSocket</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">Multi</div>
					<div class="text-white/70">Joueurs</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">Équipe</div>
					<div class="text-white/70">Collaboration</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
		<div class="grid lg:grid-cols-3 gap-12 mb-20">
			<div class="lg:col-span-2 space-y-12">
				<section>
					<h2 class="text-3xl font-bold mb-6">Concept du jeu</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							SpeedyWiki est un jeu multijoueur compétitif où les joueurs doivent naviguer le plus rapidement 
							possible d'une page Wikipedia à une autre en utilisant uniquement les liens internes.
						</p>
						<p>
							Le jeu se déroule entièrement dans le navigateur et permet à plusieurs joueurs de s'affronter 
							en temps réel, créant une expérience dynamique et engageante.
						</p>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Fonctionnalités techniques</h2>
					<div class="space-y-6">
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<MessageSquare size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Serveur WebSocket</h3>
									<p class="text-white/70 mb-3">
										Mise en place d'un serveur WebSocket permettant une interaction en temps réel entre les joueurs. 
										Synchronisation instantanée des actions et des scores.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">WebSocket</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Temps réel</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Globe size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Serveur Proxy</h3>
									<p class="text-white/70 mb-3">
										Serveur proxy développé avec Express, Axios et CORS permettant la modification 
										et l'affichage des pages Wikipedia dans le jeu.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Express</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Axios</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">CORS</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<GitBranch size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Versionnement Git</h3>
									<p class="text-white/70 mb-3">
										Utilisation de Git et GitHub pour le versionnement et la gestion collaborative du code. 
										Workflow avec branches, pull requests et revues de code.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Git</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">GitHub</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Travail d'équipe</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Ce projet m'a particulièrement appris à travailler en équipe sur un projet de développement web. 
							Les défis de la collaboration ont été nombreux mais enrichissants :
						</p>
						<ul class="space-y-3 ml-6">
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Utilisation de Git pour gérer les contributions de chaque membre</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Résolution de conflits de code et merge de branches</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Communication efficace sur les fonctionnalités et les bugs</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Adoption de bonnes pratiques de développement collaboratif</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Revues de code et amélioration continue du projet</span>
							</li>
						</ul>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Apprentissages clés</h2>
					<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
						<p class="text-white/70 text-lg leading-relaxed mb-4">
							SpeedyWiki m'a permis de développer mes compétences en :
						</p>
						<div class="grid md:grid-cols-2 gap-4">
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Communication WebSocket</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Développement collaboratif</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Gestion de projet Git</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Architecture client-serveur</span>
							</div>
						</div>
					</div>
				</section>
			</div>
			
			<div class="space-y-6">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm sticky top-24">
					<h3 class="text-xl font-bold mb-4">Technologies utilisées</h3>
					<div class="space-y-3">
						<div>
							<div class="text-sm text-white/50 mb-2">Frontend</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">HTML/CSS</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">JavaScript</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Backend</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Express</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">WebSocket</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Axios</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Outils</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Git</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">GitHub</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">CORS</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="p-6 bg-gradient-to-br from-[#00ffc8]/10 to-[#00d4aa]/10 border border-[#00ffc8]/20 rounded-xl">
					<h3 class="text-xl font-bold mb-2 text-[#00ffc8]">Image à venir</h3>
					<p class="text-white/70 text-sm">
						Captures d'écran du jeu en action seront ajoutées prochainement.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
