<script lang="ts">
	import { ArrowLeft, Brain, Shield, Package, Zap, Lock, Globe } from 'lucide-svelte';
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
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00ffc8]/20 to-[#00d4aa]/20 border border-[#00ffc8]/30 rounded-full text-sm text-[#00ffc8] font-medium">
					<Zap size={16} />
					Projet Actuel - Featured
				</div>
				<h1 class="text-5xl md:text-7xl font-bold">
					<span class="text-gradient">MCP Server</span>
				</h1>
				<p class="text-xl text-white/70 max-w-3xl">
					Serveur MCP (Model Context Protocol) pour la création de meubles via IA, avec intégration 
					ChatGPT/Claude et déploiement sécurisé pour les clients.
				</p>
			</div>
			
			<div class="grid md:grid-cols-3 gap-6 mb-16">
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">IA</div>
					<div class="text-white/70">ChatGPT & Claude</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">Sécurisé</div>
					<div class="text-white/70">Rate-limiting & tokens</div>
				</div>
				<div class="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
					<div class="text-3xl font-bold text-[#00ffc8] mb-2">Production</div>
					<div class="text-white/70">Déployé pour clients</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
		<div class="grid lg:grid-cols-3 gap-12 mb-20">
			<div class="lg:col-span-2 space-y-12">
				<section>
					<h2 class="text-3xl font-bold mb-6">Mon projet préféré</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<p>
							Ce projet représente le summum de mon travail en alternance. J'ai créé un serveur MCP complet 
							permettant aux LLM (ChatGPT, Claude) de créer des meubles sur mesure à partir d'un devis client, 
							avec ou sans croquis.
						</p>
						<p>
							Le défi principal était de rendre des fonctions métier complexes accessibles à l'IA tout en 
							garantissant la sécurité et la fiabilité du système pour une utilisation en production par les clients.
						</p>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Architecture du système</h2>
					<div class="space-y-6">
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Brain size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Outils MCP</h3>
									<p class="text-white/70 mb-3">
										Création d'une panoplie d'outils utilisables par les LLM, liés à des fonctions métier 
										complexes de l'entreprise. Chaque outil expose une fonctionnalité spécifique de manière 
										compréhensible pour l'IA.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">MCP Protocol</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">TypeScript</span>
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
									<h3 class="text-xl font-bold mb-2">Intégration ChatGPT App SDK</h3>
									<p class="text-white/70 mb-3">
										Intégration du viewer 3D directement dans l'application ChatGPT via leur SDK, 
										permettant aux utilisateurs de voir leurs meubles se créer en temps réel pendant 
										la conversation avec l'IA.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">ChatGPT SDK</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Viewer 3D</span>
									</div>
								</div>
							</div>
						</div>
						
						<div class="p-6 bg-white/5 border border-white/10 rounded-xl">
							<div class="flex items-start gap-4">
								<div class="p-3 bg-[#00ffc8]/10 rounded-lg">
									<Package size={24} class="text-[#00ffc8]" />
								</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">Package Svelte Headless</h3>
									<p class="text-white/70 mb-3">
										Création d'un package Svelte exportant des fonctions handler pour setup facile des API 
										(chat, tools, appels manuels) et un composant headless pour gérer le chat de manière 
										entièrement personnalisable.
									</p>
									<div class="flex flex-wrap gap-2">
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Svelte</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">Headless UI</span>
										<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">NPM Package</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Sécurité et production</h2>
					<div class="space-y-6">
						<p class="text-white/70 text-lg">
							L'intégration dans le site principal nécessitait des mesures de sécurité robustes pour 
							éviter les abus, car les appels aux API d'IA représentent un coût significatif :
						</p>
						
						<div class="grid md:grid-cols-2 gap-4">
							<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
								<div class="flex items-center gap-3 mb-3">
									<Lock size={20} class="text-[#00ffc8]" />
									<h3 class="font-bold">Gestion par Token</h3>
								</div>
								<p class="text-white/60 text-sm">
									Système de tokens liés à l'adresse IP pour authentifier et tracer les requêtes légitimes.
								</p>
							</div>
							
							<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
								<div class="flex items-center gap-3 mb-3">
									<Shield size={20} class="text-[#00ffc8]" />
									<h3 class="font-bold">Rate-Limiting</h3>
								</div>
								<p class="text-white/60 text-sm">
									Limitation du nombre de requêtes par utilisateur pour prévenir les abus et contrôler les coûts.
								</p>
							</div>
							
							<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
								<div class="flex items-center gap-3 mb-3">
									<Globe size={20} class="text-[#00ffc8]" />
									<h3 class="font-bold">Origin Validation</h3>
								</div>
								<p class="text-white/60 text-sm">
									Vérification de l'origine des requêtes pour s'assurer qu'elles proviennent du site officiel.
								</p>
							</div>
							
							<div class="p-6 bg-gradient-to-br from-[#00ffc8]/5 to-[#00d4aa]/5 border border-white/10 rounded-xl">
								<div class="flex items-center gap-3 mb-3">
									<Zap size={20} class="text-[#00ffc8]" />
									<h3 class="font-bold">API Sécurisées</h3>
								</div>
								<p class="text-white/60 text-sm">
									Récupération de tokens et appels API uniquement depuis des sources autorisées.
								</p>
							</div>
						</div>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Fonctionnalités clés</h2>
					<div class="space-y-4 text-white/70 text-lg leading-relaxed">
						<ul class="space-y-3 ml-6">
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Création de meubles à partir de descriptions textuelles ou de croquis</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Intégration transparente avec ChatGPT et Claude via MCP</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Visualisation 3D en temps réel dans l'interface de chat</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Package Svelte réutilisable pour faciliter l'intégration</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Système de sécurité multi-couches pour la production</span>
							</li>
							<li class="flex items-start gap-3">
								<span class="text-[#00ffc8] mt-1">▸</span>
								<span>Déploiement pour utilisation par les clients finaux</span>
							</li>
						</ul>
					</div>
				</section>
				
				<section>
					<h2 class="text-3xl font-bold mb-6">Impact et apprentissages</h2>
					<div class="p-6 bg-gradient-to-br from-[#00ffc8]/10 to-[#00d4aa]/10 border border-[#00ffc8]/20 rounded-xl">
						<p class="text-white/70 text-lg leading-relaxed mb-4">
							Ce projet m'a permis de travailler sur des technologies de pointe et de résoudre des 
							problèmes complexes d'architecture, de sécurité et d'intégration IA. C'est le projet 
							dont je suis le plus fier car il combine innovation technique et valeur business réelle.
						</p>
						<div class="grid md:grid-cols-2 gap-3 mt-6">
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Architecture MCP</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Intégration IA</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Sécurité production</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-2 h-2 bg-[#00ffc8] rounded-full"></div>
								<span class="text-white/90">Package development</span>
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
							<div class="text-sm text-white/50 mb-2">Core</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">TypeScript</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">MCP</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Frontend</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Svelte</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Viewer 3D</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">IA</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">ChatGPT</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Claude</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">GPT SDK</span>
							</div>
						</div>
						
						<div class="border-t border-white/10 pt-3">
							<div class="text-sm text-white/50 mb-2">Sécurité</div>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Tokens</span>
								<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">Rate-limiting</span>
							</div>
						</div>
					</div>
				</div>
				
				<div class="p-6 bg-gradient-to-br from-[#00ffc8]/10 to-[#00d4aa]/10 border border-[#00ffc8]/20 rounded-xl">
					<h3 class="text-xl font-bold mb-2 text-[#00ffc8]">Images à venir</h3>
					<p class="text-white/70 text-sm">
						Captures d'écran de l'intégration ChatGPT et démonstrations du système seront ajoutées prochainement.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
