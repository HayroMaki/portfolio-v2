<script lang="ts">
	import { ArrowLeft, Box, Ruler, TrendingUp, Monitor, Sparkles, Eye } from 'lucide-svelte';

	const stats = [
		{ label: 'Configurateurs créés', value: '3', sub: 'Easy' },
		{ label: '3D', value: 'Temps réel', sub: 'viewer propriétaire' },
		{ label: '1 min', value: 'setup', sub: 'UX ultra guidée' }
	];

	const configurators = [
		{
			icon: Box,
			title: 'Caisson simple',
			copy: [
				'Canvas interactif pour tracer les dimensions à la main',
				'Paramètres auto pour les matériaux récurrents',
				'Preview 3D rafraîchie à chaque étape'
			]
		},
		{
			icon: TrendingUp,
			title: 'Meubles escaliers',
			copy: [
				'Algorithme confort qui calcule marches & hauteurs idéales',
				'Projection 3D et plan technique en parallèle',
				'Optimisation pour production interne'
			]
		},
		{
			icon: Monitor,
			title: 'Vidéoprojecteurs',
			copy: [
				'Interface adaptée aux contraintes de ventilation/lens',
				'Slots audio & câblage directement configurables',
				'UX orientée installateur'
			]
		}
	];

	const innovations = [
		{
			icon: Ruler,
			title: 'Canvas interactifs',
			desc: 'Dessin vectoriel dynamique pour régler les cotes sans formulaire indigeste.'
		},
		{
			icon: Eye,
			title: 'Viewer 3D proprio',
			desc: 'Streaming des modèles texturés avec mise à jour temps réel.'
		},
		{
			icon: Sparkles,
			title: 'Stack Svelte/TS',
			desc: 'Composants headless pour réutiliser chaque module de configuration.'
		}
	];

	const learnings = [
		'Simplifier des workflows complexes côté client comme côté atelier.',
		'Construire des algorithmes métiers (indice confort, auto-dimensionnement).',
		'Designer des interfaces canvas + 3D cohérentes avec la prod.',
		'Livrer des outils modulaires faciles à décliner.'
	];
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="border-b-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					retour atelier
				</a>
				<span class="kanji-tag bg-paper">projet entreprise</span>
			</div>

			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">Configurateurs <strong>Easy</strong></h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">
					J'ai condensé l'ADN du configurateur 3D principal en trois expériences ultra ciblées. Objectif : permettre aux conseillers
					de créer un meuble standard en moins d'une minute, tout en gardant la puissance du viewer 3D propriétaire.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each stats as stat}
					<div class="manga-panel p-6 text-center">
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/60">{stat.label}</p>
						<p class="text-3xl font-display mt-1">{stat.value}</p>
						<p class="text-[0.65rem] font-mono uppercase tracking-[0.35em] text-ink/50 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-5">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">Contexte</h2>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Le configurateur historique est un monstre de précision mais pas toujours adapté aux demandes récurrentes. On a identifié trois
					typologies demandées tous les jours et je les ai transformées en expériences ultra guidées : canvas minimaliste, champs intelligents
					et viewer photo-réaliste qui suit chaque clic.
				</p>
				<ul class="space-y-3 font-mono text-xs uppercase tracking-[0.35em] text-ink/70">
					<li class="flex justify-between border-b border-ink/20 py-2">
						<span>Scope</span>
						<span>3 configurateurs</span>
					</li>
					<li class="flex justify-between border-b border-ink/20 py-2">
						<span>Temps cible</span>
						<span>&lt; 60s</span>
					</li>
					<li class="flex justify-between py-2">
						<span>Stack</span>
						<span>Svelte + TS + viewer 3D</span>
					</li>
				</ul>
			</div>
			<div class="manga-panel p-6 space-y-4">
				<div class="kanji-tag bg-paper">workflow</div>
				<p class="font-mono text-sm text-ink/80 leading-relaxed">
					Toutes les interfaces sont construites comme des planches : croquis noir sur fond papier, repères métriques, focus sur les gestes.
					Chaque clic déclenche l’update du viewer 3D interne pour contrôler textures et proportions en temps réel.
				</p>
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-5xl px-6 space-y-8">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">les 3 modules</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">focus sur les essentiels</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each configurators as card}
					<div class="manga-panel border-paper bg-black/20 p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/70">
							<svelte:component this={card.icon} size={18} />
							{card.title}
						</div>
						<ul class="mt-4 space-y-3 text-sm font-mono text-paper/80">
							{#each card.copy as line}
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
									<span>{line}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">innovations clés</h2>
			<div class="grid gap-6 md:grid-cols-3">
				{#each innovations as innovationItem}
					<div class="manga-panel p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-ink/60">
							<svelte:component this={innovationItem.icon} size={18} />
							{innovationItem.title}
						</div>
						<p class="mt-4 text-sm font-mono text-ink/80 leading-relaxed">{innovationItem.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">Impact & apprentissages</h3>
				<ul class="space-y-3 font-mono text-sm text-ink/80">
					{#each learnings as learning}
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
							<span>{learning}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">Technos utilisées</h3>
				<div class="grid gap-3 text-xs font-mono uppercase tracking-[0.35em]">
					<p>Framework — Svelte + TypeScript</p>
					<p>Visualisation — Canvas + Viewer 3D</p>
					<p>Compétences — UX, Algorithmes, Dev outil interne</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">Images à venir</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Les captures du viewer et des canvas seront ajoutées dès que possible pour montrer le flow complet.
				</p>
			</div>
		</div>
	</section>
</main>
