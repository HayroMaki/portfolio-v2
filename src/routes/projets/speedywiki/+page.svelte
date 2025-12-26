<script lang="ts">
	import { ArrowLeft, Zap, Users, GitBranch, Globe, MessageSquare, PenTool } from 'lucide-svelte';

	const heroStats = [
		{ label: 'mode', value: 'TEMPS RÉEL', sub: 'websocket' },
		{ label: 'players', value: 'MULTI', sub: 'jusqu\'à 6' },
		{ label: 'workflow', value: 'GIT', sub: 'team play' }
	];

	const features = [
		{
			icon: MessageSquare,
			title: 'Serveur WebSocket',
			description:
				'Interactions instantanées, synchronisation des courses et scoreboard en direct. Le serveur pilote tout le rythme des speedruns.',
			tags: ['WebSocket', 'Temps réel']
		},
		{
			icon: Globe,
			title: 'Proxy Wikipedia',
			description:
				'Express + Axios + CORS pour modifier les pages Wiki à la volée et injecter le tracking des liens dans la couche front.',
			tags: ['Express', 'Axios', 'CORS']
		},
		{
			icon: GitBranch,
			title: 'Cadence Git',
			description:
				'Workflow strict avec branches, PR, revues quotidiennes et règles de merge. On a tout documenté comme un vrai studio.',
			tags: ['Git', 'GitHub']
		}
	];

	const learnings = [
		'Composer une communication temps réel robuste pour un jeu multi.',
		'Négocier les conflits Git et écrire des PR claires.',
		'Industrialiser un proxy HTTP sans exposer de secrets.',
		'Imaginer un UI manga pour une app hyper dynamique.'
	];

	const collaborators = [
		{ name: 'Binôme 01', role: 'backend & proxy' },
		{ name: 'Binôme 02', role: 'UX & sockets' }
	];
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="relative border-b-2 border-ink">
		<div class="relative z-10 mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					retour atelier
				</a>
				<span class="kanji-tag bg-paper">jeu multijoueur</span>
			</div>
			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">SpeedyWiki <strong>Race</strong></h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">
					Speedrun Wikipedia en équipe, tout dans le navigateur. On part d’une page, on atteint la cible via les liens internes. Pendant
					ce temps, le serveur WebSocket calcule les moves, le proxy réécrit les pages et l’UI affiche les trajectoires façon planche manga.
				</p>
			</div>
			<div class="grid gap-4 sm:grid-cols-3">
				{#each heroStats as stat}
					<div class="manga-panel p-5 text-center">
						<p class="text-xs font-mono uppercase tracking-[0.4em] text-ink/60">{stat.label}</p>
						<p class="text-3xl font-display mt-2">{stat.value}</p>
						<p class="text-xs font-mono text-ink/60 mt-1">{stat.sub}</p>
					</div>
				{/each}
			</div>

			<div class="manga-panel p-6">
				<div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.4em]">
					<span>crew</span>
					<span>co-dev</span>
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

	<section class="border-b-2 border-dashed border-ink py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">concept</h2>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Un duel nerveux : chaque joueur clique sur les liens internes jusqu’à atteindre la page cible. Chaque action est transmise en WebSocket
					et l’interface trace la progression avec des effets glitch. L’objectif était de rendre la course lisible tout en gardant l’énergie
					des interfaces arcade.
				</p>
			</div>
			<div class="manga-panel p-6 space-y-4">
				<div class="kanji-tag bg-paper">boucle jeu</div>
				<ul class="space-y-2 font-mono text-xs uppercase tracking-[0.35em]">
					<li class="flex justify-between border-b border-ink/20 py-2">
						<span>Lobby</span>
						<span>création / invitation</span>
					</li>
					<li class="flex justify-between border-b border-ink/20 py-2">
						<span>Course</span>
						<span>tracking temps réel</span>
					</li>
					<li class="flex justify-between py-2">
						<span>Résultat</span>
						<span>replay + stats</span>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="bg-ink text-paper py-24">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">stack technique</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">tout est synchrone</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each features as feature}
					<div class="manga-panel border-paper bg-black/30 p-6">
						<div class="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-paper/70">
							<svelte:component this={feature.icon} size={20} />
							{feature.title}
						</div>
						<p class="mt-4 text-sm font-mono text-paper/80 leading-relaxed">{feature.description}</p>
						<div class="mt-4 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.3em]">
							{#each feature.tags as tag}
								<span class="border border-paper px-2 py-0.5">{tag}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2	border-ink">
		<div class="mx-auto max-w-5xl px-6 space-y-10">
			<div class="flex flex-wrap items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">travail d'équipe</h2>
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<Users size={16} />
					crew
				</div>
			</div>
			<ul class="space-y-3 font-mono text-sm leading-relaxed text-ink/90">
				<li class="flex items-start gap-3 border-b border-ink/15 pb-3">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Daily stand-up + board Trello custom pour assigner chaque sprint.</span>
				</li>
				<li class="flex items-start gap-3 border-b border-ink/15 pb-3">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Pair programming sur les modules critiques (proxy + socket handler).</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
					<span>Session de review pour chaque PR afin de garder un style cohérent.</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="py-20">
		<div class="mx-auto max-w-5xl px-6 grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">apprentissages</h3>
				<ul class="space-y-3 font-mono text-sm text-ink/80">
					{#each learnings as item}
						<li class="flex items-start gap-3">
							<span class="mt-1 inline-block h-2 w-2 bg-ink"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-6 space-y-4">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em]">stack</h3>
				<div class="grid gap-3 text-xs font-mono uppercase tracking-[0.35em]">
					<p>Frontend — HTML / CSS / JS</p>
					<p>Serveur — Express + Node</p>
					<p>Realtime — WebSocket</p>
					<p>Collab — Git / GitHub</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="manga-panel p-6">
				<h3 class="text-2xl font-display uppercase tracking-[0.2em] mb-2">Images à venir</h3>
				<p class="font-mono text-sm leading-relaxed text-ink/80">
					Captures d’écran du lobby et des races seront ajoutées pour montrer comment l’interface réagit en mode speedrun.
				</p>
			</div>
		</div>
	</section>
</main>
