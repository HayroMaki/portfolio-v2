<script lang="ts">
	import { ArrowLeft, Database, Globe, Code, Zap, Users, PenTool } from 'lucide-svelte';
	const stats = [
		{ label: 'Technologies', value: '5+', sub: 'multi-langages' },
		{ label: 'Algorithme', value: 'A*', sub: 'optimisé' },
		{ label: 'Architecture', value: '100%', sub: 'modulaire' }
	];

	const collaborators = [
		{ name: 'Nom du binôme', role: 'Rôle / classe' },
		{ name: 'Autre membre', role: 'Mission' }
	];
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative overflow-hidden border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					retour atelier
				</a>
				<span class="kanji-tag bg-paper">projet universitaire</span>
			</div>
			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">Travia <strong>Star Routes</strong></h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">
					Application web qui trace des itinéraires optimisés dans la galaxie Star Wars. Architecture modulaire : Java + C + JS
					qui collaborent comme un équipage rebelle. L'algorithme A* se charge de trouver la route la plus rapide entre les planètes.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each stats as stat}
					<div class="manga-panel p-6 text-center">
						<p class="text-4xl font-display">{stat.value}</p>
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/70 mt-2">{stat.label}</p>
						<p class="text-xs font-mono text-ink/60 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-6">
				<div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em]">
					<span>crew</span>
					<span>réseau</span>
				</div>
				<ul class="mt-4 space-y-3 font-mono text-sm text-ink/80">
					{#each collaborators as person}
						<li class="flex flex-wrap items-center justify-between border-b border-ink/10 pb-2">
							<span class="font-display text-lg">{person.name}</span>
							<span class="text-xs uppercase tracking-[0.3em] text-ink/60">{person.role}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink bg-paper py-20">
		<div class="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-6">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">vue d'ensemble</h2>
				<div class="space-y-4 font-mono text-sm leading-relaxed text-ink/80">
					<p>
						Travia explore comment faire collaborer des modules écrits en C, Java et JavaScript autour d'un même objectif : trouver des trajets
						ultra rapides entre les systèmes planétaires.
					</p>
					<p>
						L'interface utilise Leaflet pour cartographier la galaxie Star Wars alors que l'algorithme A* compilé en C calcule les routes optimales.
						Java orchestre les données MySQL et rappelle chaque station dans l'ordre parfait.
					</p>
				</div>
			</div>

			<div class="space-y-4">
				<div class="kanji-tag bg-paper">Stack croisée</div>
				<ul class="space-y-3 font-mono text-xs uppercase tracking-[0.4em]">
					<li class="flex items-center justify-between border-b border-ink/30 py-2">
						<span>Frontend</span>
						<span>HTML / CSS / Leaflet</span>
					</li>
					<li class="flex items-center justify-between border-b border-ink/30 py-2">
						<span>Serveur</span>
						<span>Java + JDBC</span>
					</li>
					<li class="flex items-center justify-between border-b border-ink/30 py-2">
						<span>Algo</span>
						<span>C + A*</span>
					</li>
					<li class="flex items-center justify-between py-2">
						<span>Data</span>
						<span>MySQL</span>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="bg-ink text-paper py-24">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex flex-wrap items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">Architecture technique</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">modules alignés</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="manga-panel border-paper bg-black/20 p-6">
					<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
						<Globe size={18} />
						Serveur Web
					</div>
					<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">
						Passerelle qui distribue les requêtes entre modules. Tous les appels transitent ici avant d'être routés vers l'algorithme A* ou les services de données Java.
					</p>
				</div>
				<div class="manga-panel border-paper bg-black/20 p-6">
					<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
						<Code size={18} />
						Interface Leaflet
					</div>
					<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">
						Canvas interactif pour parcourir la galaxie et poser des waypoints. Tout est animé en JS pur + Leaflet pour avoir une carte fluide et granuleuse.
					</p>
				</div>
				<div class="manga-panel border-paper bg-black/20 p-6">
					<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
						<Database size={18} />
						Java + MySQL
					</div>
					<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">
						Modules JDBC alimentent le graphe interplanétaire, calculent les heuristiques et exposent des endpoints propres pour l'algorithme C.
					</p>
				</div>
				<div class="manga-panel border-paper bg-black/20 p-6">
					<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
						<Zap size={18} />
						Algorithme A*
					</div>
					<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">
						Implémenté en C pour maximiser la perf. Les résultats retournent au serveur qui les transforme en routes lisibles et en overlays graphiques.
					</p>
				</div>
				<div class="manga-panel border-paper bg-black/20 p-6 md:col-span-2">
					<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/60">
						<Users size={18} />
						Gestion Users
					</div>
					<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">
						Création, connexion, récupération de compte + captcha : tout un workflow sécurisé pour que chaque padawan puisse sauvegarder ses parcours favoris.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex flex-wrap items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">apprentissages clés</h2>
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<PenTool size={16} />
					notes atelier
				</div>
			</div>
			<ul class="space-y-4 font-mono text-sm leading-relaxed text-ink/90">
				<li class="flex items-start gap-3 border-b border-ink/20 pb-4">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Composer une architecture multi-langages sans friction et partager les contrats entre modules.</span>
				</li>
				<li class="flex items-start gap-3 border-b border-ink/20 pb-4">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Optimiser un chemin A* en C et exposer ses résultats via une API propre.</span>
				</li>
				<li class="flex items-start gap-3 border-b border-ink/20 pb-4">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Créer des interfaces map + overlay immersives en JS pur et Leaflet.</span>
				</li>
				<li class="flex items-start gap-3 border-b border-ink/20 pb-4">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Concevoir un backend Java qui alimente à la fois la data et la sécurité utilisateurs.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Sculpter une UX manga-ready même pour un outil technique.</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-4">Technos utilisées</h3>
				<div class="grid gap-4 text-sm font-mono">
					<div>
						<p class="text-xs uppercase tracking-[0.4em] text-ink/60">Frontend</p>
						<div class="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
							<span class="border-2 border-ink px-3 py-1">HTML/CSS</span>
							<span class="border-2 border-ink px-3 py-1">JavaScript</span>
							<span class="border-2 border-ink px-3 py-1">Leaflet</span>
						</div>
					</div>
					<div>
						<p class="text-xs uppercase tracking-[0.4em] text-ink/60">Backend</p>
						<div class="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
							<span class="border-2 border-ink px-3 py-1">Java</span>
							<span class="border-2 border-ink px-3 py-1">JDBC</span>
							<span class="border-2 border-ink px-3 py-1">MySQL</span>
						</div>
					</div>
					<div>
						<p class="text-xs uppercase tracking-[0.4em] text-ink/60">Algorithme</p>
						<div class="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]">
							<span class="border-2 border-ink px-3 py-1">C</span>
							<span class="border-2 border-ink px-3 py-1">A*</span>
						</div>
					</div>
				</div>
			</div>
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-4">Images à venir</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Screens, cartes et prototypes arriveront bientôt pour illustrer les routes hyperspace façon manga.
				</p>
			</div>
		</div>
	</section>
</main>
