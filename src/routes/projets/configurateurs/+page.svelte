<script lang="ts">
	import { ArrowLeft, Box, Ruler, TrendingUp, Monitor, Sparkles, Eye } from 'lucide-svelte';
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
					Projets Entreprise
				</div>
				<h1 class="text-5xl md:text-7xl font-bold">
					<span class="text-gradient">Configurateurs Easy</span>
				</h1>
				<p class="text-xl text-white/70 max-w-3xl">
					Suite de trois configurateurs 3D interactifs développés pour simplifier l'expérience utilisateur 
					sur les meubles les plus récurrents de Dessine ton meuble.
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-6 mb-16">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">3</div>
					<div class="text-white/70">Configurateurs créés</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">3D</div>
					<div class="text-white/70">Visualisation temps réel</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">1 min</div>
					<div class="text-white/70">Création rapide</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
		<div class="grid lg:grid-cols-3 gap-12 mb-20">
			<div class="lg:col-span-2 space-y-12">
				<section>
					<h2 class="text-3xl font-bold mb-6">Contexte du projet</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Dessine ton meuble propose un configurateur 3D extrêmement complet permettant aux clients de créer 
							leurs meubles sur mesure. Cependant, sa complexité peut parfois rendre l'expérience difficile pour 
							certains types de meubles récurrents.
						</p>
						<p>
							J'ai donc développé trois configurateurs "Easy" spécialisés pour simplifier drastiquement l'expérience 
							utilisateur sur les types de meubles les plus demandés, tout en conservant la visualisation 3D en temps réel.
						</p>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Les trois configurateurs</h2>
					<div class="space-y-6">
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Box size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Caisson Simple</h3>
									<p class="text-white/70 mb-3">
										Premier projet expérimental permettant de créer un caisson sur mesure en moins d'une minute. 
										Intégration de canvas dessinés et interactifs pour une expérience fluide et intuitive.
									</p>
									<div class="space-y-2 text-white/60 text-sm">
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Interface simplifiée avec canvas interactifs</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Visualisation 3D en temps réel</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Configuration en moins d'une minute</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<TrendingUp size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Meubles Escaliers</h3>
									<p class="text-white/70 mb-3">
										Configurateur avancé pour meubles escaliers avec algorithme de calcul automatique du nombre 
										de marches basé sur un indice de confort. Reprise et amélioration de la formule du caisson simple.
									</p>
									<div class="space-y-2 text-white/60 text-sm">
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Algorithme de calcul intelligent</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Indice de confort automatique</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Canvas interactifs améliorés</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Monitor size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Meubles Vidéoprojecteurs</h3>
									<p class="text-white/70 mb-3">
										Configurateur spécialisé pour meubles vidéoprojecteurs offrant une haute personnalisation 
										tout en restant simple d'utilisation. Adaptation de l'interface pour ce type de meuble spécifique.
									</p>
									<div class="space-y-2 text-white/60 text-sm">
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Haute personnalisation</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Interface adaptée au cas d'usage</span>
										</div>
										<div class="flex items-center gap-2">
											<span class="text-[#00ffc8]">▸</span>
											<span>Expérience utilisateur optimisée</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Technologies et innovations</h2>
					<div class="space-y-6">
						<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Ruler size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Canvas Interactifs</h3>
									<p class="text-white/70">
										Utilisation de canvas HTML5 pour créer des interfaces de dessin interactives permettant 
										aux utilisateurs de visualiser et modifier leurs meubles de manière intuitive.
									</p>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Eye size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Viewer 3D Propriétaire</h3>
									<p class="text-white/70">
										Intégration du viewer 3D propriétaire de l'entreprise permettant de voir le meuble 
										se mettre à jour en temps réel à chaque modification de paramètre.
									</p>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Sparkles size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Svelte & TypeScript</h3>
									<p class="text-white/70">
										Les trois projets ont été développés avec Svelte et TypeScript, garantissant 
										une performance optimale et une maintenabilité du code.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Impact et apprentissages</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Ces projets m'ont permis de développer une expertise en UX design et en optimisation 
							d'interfaces complexes. Les principaux apprentissages incluent :
						</p>
						<ul class="space-y-3 ml-6">
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Simplification d'interfaces complexes sans perte de fonctionnalités</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Manipulation avancée de canvas HTML5 pour des interfaces interactives</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Intégration de viewers 3D propriétaires avec mise à jour en temps réel</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Développement d'algorithmes métier (calcul de confort pour escaliers)</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Itération et amélioration continue basée sur les retours utilisateurs</span>
							</li>
						</ul>
					</div>
				</section>
			</div>
			
			<div class="space-y-6">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm sticky top-24">
					<h3 class="text-xl font-bold mb-4">Technologies utilisées</h3>
					<div class="space-y-3">
						<div>
							<div class="text-sm text-white/50 mb-2">Framework</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Svelte</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">TypeScript</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Visualisation</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Canvas</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Viewer 3D</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Compétences</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">UX Design</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Algorithmes</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="p-6 bg-gradient-to-br from-[#00ffc8]/10 to-[#00d4aa]/10 border border-[#00ffc8]/20 rounded-xl">
					<h3 class="text-xl font-bold mb-2 text-[#00ffc8]">Images à venir</h3>
					<p class="text-white/70 text-sm">
						Captures d'écran des trois configurateurs et démonstrations visuelles seront ajoutées prochainement.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
