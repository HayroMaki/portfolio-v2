<script lang="ts">
	import { ArrowLeft, Brain, Shield, Package, Zap, Lock, Globe } from 'lucide-svelte';

	const heroStats = [
		{ label: 'LLM', value: 'ChatGPT + Claude', sub: 'via MCP' },
		{ label: 'Sécurité', value: 'Rate-limit', sub: 'tokens & origin' },
		{ label: 'Prod', value: 'clients actifs', sub: 'tools exposés' }
	];

	const architecture = [
		{
			icon: Brain,
			title: 'Outils MCP',
			desc: 'Mapping des fonctions métier pour les LLM: création de meubles, calculs structurels, exports.'
		},
		{
			icon: Globe,
			title: 'ChatGPT App SDK',
			desc: 'Viewer 3D directement embarqué dans ChatGPT pour visualiser chaque meuble généré.'
		},
		{
			icon: Package,
			title: 'Package Svelte',
			desc: 'Handlers headless (chat, tools, manuels) + composant UI pour brancher l’atelier à l’IA.'
		}
	];

	const security = [
		{ icon: Lock, title: 'Tokens signés', desc: 'Liés aux IP/clients pour suivre l’usage et couper à la volée.' },
		{ icon: Shield, title: 'Rate limiting', desc: 'Contrôle strict des coûts API IA via quotas par utilisateur.' },
		{ icon: Globe, title: 'Origin check', desc: 'Seul le domaine officiel peut appeler les endpoints sensibles.' },
		{ icon: Zap, title: 'APIs cloisonnées', desc: 'Récupération de tokens et appels IA uniquement côté serveur.' }
	];

	const features = [
		'Génération de meubles depuis texte ou croquis client.',
		'Visualisation 3D en temps réel dans l’interface de chat.',
		'Package Svelte réutilisable pour toutes les équipes.',
		'Monitoring et alertes sur la consommation IA.',
		'Support multi-models (GPT, Claude) via même protocole.'
	];

	const learnings = [
		'Traduire des workflows meubles en outils IA compréhensibles.',
		'Concevoir un plan de sécurité multi-couches pour l’IA.',
		'Livrer des packages réutilisables plutôt qu’un monolithe.',
		'Piloter un déploiement production utilisé par des clients finaux.'
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
				<span class="kanji-tag bg-paper">projet actuel</span>
			</div>

			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">MCP <strong>Server</strong></h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">
					Serveur Model Context Protocol qui permet à ChatGPT / Claude de générer des meubles comme un conseiller humain.
					Chaque outil IA reflète une fonction métier réelle, avec un niveau de sécurité digne d’une prod client.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each heroStats as stat}
					<div class="manga-panel p-6 text-center">
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/60">{stat.label}</p>
						<p class="text-2xl font-display mt-1">{stat.value}</p>
						<p class="text-[0.65rem] font-mono uppercase tracking-[0.35em] text-ink/50 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-5xl px-6 space-y-6">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">Pourquoi c’est mon projet phare</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					L’objectif: rendre la prise de brief IA aussi précise qu’un expert atelier. Les LLM manipulent mes outils MCP pour générer un meuble
					à partir d’un devis, d’un croquis ou d’un vocal. Chaque outil encapsule de la logique métier (calculs, accès DB, viewer 3D) et renvoie
					des réponses formatées prêtes pour la prod.
				</p>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					J’ai dû designer la sécurité comme un système bancaire: tokens, origin, quotas, logs. Et emballer le tout dans un package Svelte +
					TypeScript pour que l’équipe puisse intégrer de nouveaux outils IA en quelques minutes.
				</p>
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-5xl px-6 space-y-8">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">architecture</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">LLM ready</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each architecture as block}
					<div class="manga-panel border-paper bg-black/20 p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/70">
							<svelte:component this={block.icon} size={18} />
							{block.title}
						</div>
						<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">{block.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">Sécurité & production</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each security as item}
					<div class="manga-panel p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-ink/60">
							<svelte:component this={item.icon} size={18} />
							{item.title}
						</div>
						<p class="mt-3 text-sm font-mono text-ink/80 leading-relaxed">{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-20 border-t border-b border-dashed border-ink">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">Fonctionnalités clés</h3>
				<ul class="space-y-3 font-mono text-sm text-ink/80">
					{#each features as feat}
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
							<span>{feat}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">Technologies</h3>
				<div class="grid gap-3 text-xs font-mono uppercase tracking-[0.35em]">
					<p>Core — TypeScript, Node, MCP</p>
					<p>Frontend — Svelte, Viewer 3D</p>
					<p>IA — ChatGPT SDK, Claude</p>
					<p>Sécurité — Tokens, Rate-limit, Origin check</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-24">
		<div class="mx-auto max-w-5xl px-6 space-y-8">
			<h2 class="text-4xl font-display uppercase tracking-[0.3em]">Impact & apprentissages</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="manga-panel p-6">
					<p class="font-mono text-sm text-ink/80 leading-relaxed">
						Projet en prod, utilisé par l’équipe commerciale pour pré-maquetter des meubles avec l’aide d’un LLM. Il a servi de base à notre stratégie IA
						et prouve que les outils artisanaux peuvent devenir des super-pouvoirs pour les conseillers.
					</p>
				</div>
				<div class="manga-panel p-6 space-y-3">
					<ul class="space-y-3 font-mono text-sm text-ink/80">
						{#each learnings as learning}
							<li class="flex items-start gap-3">
								<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
								<span>{learning}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">Images à venir</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Ajout prochain des captures ChatGPT + viewer 3D en action pour montrer comment l’IA manipule mes outils.
				</p>
			</div>
		</div>
	</section>
</main>
