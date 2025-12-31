<script lang="ts">
	import { ArrowLeft, Brain, Shield, Package, Zap, Lock, Globe, Pen, Code, Sparkles } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';
	import MCPWorkflowAnimation from '$lib/components/projects/MCPWorkflowAnimation.svelte';
	import MCPSecurityFlow from '$lib/components/projects/MCPSecurityFlow.svelte';

	const iconMap = {
		brain: Brain,
		package: Package,
		pen: Pen,
		lock: Lock,
		shield: Shield,
		globe: Globe,
		zap: Zap
	} as const;

	const t = $derived(getTranslations($locale));
	const page = $derived(t.project_pages.mcp);
	const hero = $derived(page.hero);
	const sections = $derived(page.sections);
	const architectureCards = $derived(
		sections.architecture.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? Brain;
			return { ...card, Component };
		})
	);
	const securityCards = $derived(
		sections.security.cards.map((card) => {
			const Component = iconMap[card.icon as keyof typeof iconMap] ?? Shield;
			return { ...card, Component };
		})
	);
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="border-b-2 border-ink">
		<div class="mx-auto max-w-5xl px-6 py-20 space-y-10">
			<div class="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em]">
				<a href="/" class="inline-flex items-center gap-2 border-2 border-ink px-3 py-1 hover:bg-ink hover:text-paper transition">
					<ArrowLeft size={16} />
					{hero.back}
				</a>
				<span class="kanji-tag bg-paper">{hero.badge}</span>
			</div>

			<div class="space-y-6">
				<h1 class="stroke-title leading-[0.8]">
					{hero.title.regular} <strong>{hero.title.highlight}</strong>
				</h1>
				<p class="max-w-3xl font-mono text-base leading-relaxed text-ink/80">{hero.description}</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				{#each hero.stats as stat}
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
		<div class="mx-auto max-w-6xl px-6">
			<div class="space-y-6 mb-12">
				<div class="inline-flex items-center gap-2 border-2 border-ink px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<span class="inline-block h-3 w-3 mr-3 rounded-full bg-red-500 animate-pulse"></span>
					Live in Production
				</div>
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.highlight.title}</h2>
				<div class="grid gap-8 lg:grid-cols-2">
					{#each sections.highlight.paragraphs as paragraph}
						<p class="font-mono text-sm leading-relaxed text-ink/80">{paragraph}</p>
					{/each}
				</div>
			</div>

			<!-- MCP Workflow Animation -->
			<div class="mt-16">
				<MCPWorkflowAnimation />
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="flex items-center gap-4">
				<div class="kanji-tag bg-ink border-paper text-paper">{sections.architecture.tag}</div>
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{sections.architecture.subtitle}</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				{#each architectureCards as block, index}
					<div class="manga-panel border-paper bg-black/20 p-6 hover:bg-black/30 transition-all duration-300">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 border-2 border-paper rounded-full flex items-center justify-center">
								<block.Component size={20} />
							</div>
							<span class="font-mono text-xs uppercase tracking-[0.4em] text-paper/70">{block.title}</span>
						</div>
						<p class="text-sm font-mono text-paper/80 leading-relaxed">{block.description}</p>
					</div>
				{/each}
			</div>

			<!-- Code Example -->
			<div class="manga-panel border-paper bg-black/30 p-6">
				<div class="flex items-center gap-3 mb-4">
					<Code size={20} />
					<h3 class="font-display text-lg uppercase tracking-[0.2em]">Exemple de Tool MCP</h3>
				</div>
				<pre class="font-mono text-xs text-paper/90 overflow-x-auto p-4 bg-black/40 border border-paper/30"><code>
{`
	server.registerTool(
        "create-project",
        {
            title: "Create New Project",
            description: 'Create a new furniture project (e.g. cabinet) with optional initial configuration.
            
            When to use:
            - User wants to start designing new furniture as a single cabinet project.
            
            Behavior:
            - Supports types: {FURNITURE_TYPES.join(", ")}.
            - Optional pre-parameters: dimensions, backOption, baseOption, columns (can all be changed later with update tools).
            - columns will be auto-calibrated if not provided.
            - Returns a new project ID and data; call get-project afterwards to inspect the 3D model.
            - The newly created project does not have any column structure, it is empty until you modify it.
            
            IMPORTANT FOR STAIRS PROJECTS:
            - You CANNOT directly control the number or size of individual steps.
            - Steps are AUTOMATICALLY calculated based on total height/width for optimal comfort and safety.
            - The staircase parameters only control platform extensions and base offset (see below).',

            _meta: {
                "openai/toolInvocation/invoking": "Creating new project...",
                "openai/toolInvocation/invoked": "Project created successfully"
            },
            inputSchema: {
                name: z.string().describe("Descriptive name for the project"),
                type: z.enum(FURNITURE_TYPES as any).describe("Furniture type: {FURNITURE_TYPES.join(", ")}"),
                
                // Optional pre-parameters for quick setup
                // Global dimensions
                dimensions: z.object({
                    width: z.number().nonnegative().optional().describe("Initial width in mm (optional)"),
                    height: z.number().nonnegative().optional().describe("Initial height in mm (optional)"),
                    depth: z.number().nonnegative().optional().describe("Initial depth in mm (optional)"),
                }).optional().describe("Initial dimensions (optional)"),
                
                // Staircase-specific dimensions
                staircase: z.object({
                    bottom_platform_height_mm: z.number().nonnegative().optional().describe("Height of empty space UNDER the first step (creates a raised base platform) - stairs only"),
                    top_platform_extension_mm: z.number().nonnegative().optional().describe("Extra depth added to the TOP-MOST step to create a larger landing platform - stairs only"),
                    bottom_platform_extension_mm: z.number().nonnegative().optional().describe("Extra depth added to the BOTTOM-MOST step to create a larger entry platform - stairs only"),
                }).optional().describe("Platform/offset parameters for stairs (does NOT control step count or individual step sizes - those are automatic)"),
                
                // Back option
                backOption: z.enum(["no-back", "hdf-back", "hard-back"]).optional().describe("Back panel type (optional)"),

                // Base option
                baseOption: z.enum(Object.keys(BASE_OPTION_MAP) as any).optional().describe("Base/plinth type (optional)"),
                baseCustomization: z.object({
                    plinthHeight: z.number().nonnegative().optional().describe("Plinth height in mm"),
                    frontSpace: z.number().nonnegative().optional().describe("Front space in mm"),
                    backSpace: z.number().nonnegative().optional().describe("Back space in mm"),
                    leftSpace: z.number().nonnegative().optional().describe("Left space in mm (clipped only)"),
                    rightSpace: z.number().nonnegative().optional().describe("Right space in mm (clipped only)"),
                }).optional().describe("Custom plinth dimensions (optional)"),
                
                // Column count
                columns: z.object({
                    columnCount: z.number().int().min(1).optional().describe("Number of columns (optional, default: 1)"),
                    autoFillColumns: z.boolean().optional().default(true).describe("Auto-distribute column width evenly (default: true)"),
                    customWidths: z.array(z.object({
                        col: z.number().int().min(1).describe("Column number"),
                        width: z.number().positive().min(150).max(650).describe("Width in mm")
                    })).optional().describe("Custom width for each column (optional)"),
                }).optional().describe("Initial column count"),
            }
        } as any,
        async ({ name, type, dimensions, staircase, backOption, baseOption, baseCustomization, columns }) => {
            try {
        		// Tool's business function
            } catch (error) {
				// Error handling
            }
        }
    );`
}
				</code></pre>
			</div>
		</div>
	</section>

	<section class="py-24 border-t-2 border-ink">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="space-y-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.security.title}</h2>
				<p class="font-mono text-sm text-ink/70 max-w-3xl">Système de sécurité multi-couches pour protéger l'accès aux outils MCP et contrôler les coûts d'utilisation de l'IA.</p>
			</div>

			<!-- Security Flow Component -->
			<MCPSecurityFlow />

			<!-- Security Cards -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each securityCards as item}
					<div class="manga-panel p-6 hover:shadow-lg transition-shadow">
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 border-2 border-ink rounded-full flex items-center justify-center">
								<item.Component size={18} />
							</div>
						</div>
						<h4 class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60 mb-2">{item.title}</h4>
						<p class="text-sm font-mono text-ink/80 leading-relaxed">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-20 border-t border-b border-dashed border-ink bg-paper/50">
		<div class="mx-auto max-w-6xl px-6 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
			<div class="manga-panel p-8 space-y-6">
				<div class="flex items-center gap-3">
					<Zap size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.features.title}</h3>
				</div>
				<ul class="space-y-4 font-mono text-sm text-ink/80">
					{#each sections.features.list as feat, index}
						<li class="flex items-start gap-3 pb-3 border-b border-ink/10 last:border-b-0 last:pb-0">
							<span class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center font-display text-xs">{index + 1}</span>
							<span class="leading-relaxed">{feat}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="manga-panel p-8 space-y-6">
				<div class="flex items-center gap-3">
					<Package size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.technologies.title}</h3>
				</div>
				<div class="space-y-3">
					{#each sections.technologies.items as tech}
						<div class="px-4 py-3 border-2 border-ink bg-paper font-mono text-xs uppercase tracking-[0.35em] hover:bg-ink hover:text-paper transition-colors">
							{tech}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="py-24 bg-ink text-paper">
		<div class="mx-auto max-w-6xl px-6 space-y-12">
			<div class="flex items-center gap-4">
				<h2 class="text-4xl font-display uppercase tracking-[0.3em]">{sections.impact.title}</h2>
				<div class="inline-flex items-center gap-2 border-2 border-paper px-4 py-1 font-mono text-xs uppercase tracking-[0.4em]">
					<Brain size={16} />
					En Production
				</div>
			</div>
			<div class="grid gap-8 lg:grid-cols-2">
				<div class="manga-panel border-paper bg-black/20 p-8 space-y-4">
					<h3 class="text-xl font-display uppercase tracking-[0.2em] mb-4">Utilisation Réelle</h3>
					{#each sections.impact.paragraphs as paragraph}
						<p class="font-mono text-sm text-paper/80 leading-relaxed">{paragraph}</p>
					{/each}
				</div>
				<div class="manga-panel border-paper bg-black/20 p-8">
					<h3 class="text-xl font-display uppercase tracking-[0.2em] mb-6">Apprentissages</h3>
					<ul class="space-y-4 font-mono text-sm text-paper/80">
						{#each sections.impact.learnings as learning, index}
							<li class="flex items-start gap-3 pb-3 border-b border-paper/20 last:border-b-0 last:pb-0">
								<span class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-paper flex items-center justify-center font-display text-xs">{index + 1}</span>
								<span class="leading-relaxed">{learning}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="py-20 border-t-2 border-ink">
		<div class="mx-auto max-w-6xl px-6">
			<div class="manga-panel p-8">
				<div class="flex items-center gap-3 mb-4">
					<Sparkles size={24} />
					<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{sections.gallery.title}</h3>
				</div>
				<p class="font-mono text-sm leading-relaxed text-ink/80 mb-6">{sections.gallery.description}</p>
				<div class="grid gap-4 md:grid-cols-3">
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">Chat Interface</p>
					</div>
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">3D Viewer</p>
					</div>
					<div class="aspect-video border-2 border-dashed border-ink bg-ink/5 flex items-center justify-center">
						<p class="font-mono text-xs uppercase tracking-[0.3em] text-ink/40">Tool Execution</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
