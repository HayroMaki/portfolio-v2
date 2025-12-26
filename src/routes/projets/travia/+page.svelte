<script lang="ts">
	import { ArrowLeft, Database, Globe, Code, Zap, Users } from 'lucide-svelte';
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
					<span class="text-gradient">Travia</span>
				</h1>
				<p class="text-xl text-white/70 max-w-3xl">
					Application web de recherche de trajets optimisés dans l'univers de Star Wars, 
					développée avec une architecture modulaire multi-langages.
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-6 mb-16">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">5+</div>
					<div class="text-white/70">Technologies</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">A*</div>
					<div class="text-white/70">Algorithme optimisé</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">100%</div>
					<div class="text-white/70">Modulaire</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
		<div class="grid lg:grid-cols-3 gap-12 mb-20">
			<div class="lg:col-span-2 space-y-12">
				<section>
					<h2 class="text-3xl font-bold mb-6">Vue d'ensemble</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Travia est une application web permettant de rechercher des trajets optimisés dans l'univers de Star Wars. 
							Ce projet universitaire m'a permis d'explorer l'intégration de plusieurs technologies et langages au sein 
							d'une architecture logicielle modulaire.
						</p>
						<p>
							L'application utilise l'algorithme A* implémenté en C pour calculer les itinéraires optimaux entre les planètes, 
							tout en offrant une interface utilisateur interactive avec une carte de la galaxie.
						</p>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Architecture technique</h2>
					<div class="space-y-6">
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Globe size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Serveur Web</h3>
									<p class="text-white/70">
										Serveur faisant le lien entre l'interface utilisateur et les modules de traitement. 
										Gestion des requêtes et orchestration des différents composants.
									</p>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Code size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Interface Utilisateur</h3>
									<p class="text-white/70 mb-3">
										Développée en HTML/CSS et JavaScript avec la bibliothèque Leaflet pour afficher 
										une carte interactive de la galaxie Star Wars.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">HTML/CSS</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">JavaScript</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Leaflet</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Database size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Génération de Graphe</h3>
									<p class="text-white/70 mb-3">
										Module en Java exploitant JDBC pour récupérer les données depuis une base MySQL 
										et générer le graphe de la galaxie.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Java</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">JDBC</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">MySQL</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Zap size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Algorithme A*</h3>
									<p class="text-white/70 mb-3">
										Implémentation en C de l'algorithme A* pour calculer les itinéraires optimaux 
										entre les planètes avec une performance maximale.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">C</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Algorithmes</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Users size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Gestion des Utilisateurs</h3>
									<p class="text-white/70">
										Système complet de gestion des utilisateurs : création de compte, connexion, 
										récupération de compte avec intégration de captcha pour la sécurité.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Apprentissages clés</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Ce projet m'a permis de travailler sur l'intégration de plusieurs technologies et langages 
							au sein d'une même application. J'ai appris à :
						</p>
						<ul class="space-y-3 ml-6">
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Concevoir une architecture logicielle modulaire et maintenable</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Faire communiquer des modules développés dans différents langages</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Implémenter et optimiser des algorithmes de recherche de chemin</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Gérer une base de données relationnelle avec MySQL et JDBC</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Créer une interface utilisateur interactive avec des bibliothèques de cartographie</span>
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
							<div class="text-sm text-white/50 mb-2">Frontend</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">HTML/CSS</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">JavaScript</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Leaflet</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Backend</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Java</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">C</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">JDBC</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Base de données</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">MySQL</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Algorithmes</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">A*</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="p-6 bg-gradient-to-br from-[#00ffc8]/10 to-[#00d4aa]/10 border border-[#00ffc8]/20 rounded-xl">
					<h3 class="text-xl font-bold mb-2 text-[#00ffc8]">Image à venir</h3>
					<p class="text-white/70 text-sm">
						Captures d'écran et démonstrations visuelles du projet seront ajoutées prochainement.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
