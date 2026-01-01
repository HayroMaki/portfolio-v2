<script lang="ts">
	import { Shield, Lock, Key, AlertTriangle, CheckCircle, Globe } from 'lucide-svelte';

	interface Props {
		data: {
			title: string;
			subtitle: string;
			steps: Array<{
				title: string;
				description: string;
				code: string[];
				badge: string;
			}>;
			flow: {
				steps: Array<{
					label: string;
					sublabel: string;
				}>;
			};
			endpoints: {
				title: string;
				list: Array<{
					method: string;
					path: string;
					desc: string;
				}>;
			};
		};
	}

	let { data }: Props = $props();

	const stepIcons = [Key, Shield, Lock];
	const badgeIcons = [CheckCircle, AlertTriangle, Globe];
	const badgeTypes = ['success', 'warning', 'info'];

	const badgeClassMap = {
		success: 'bg-emerald-100 border-emerald-500 text-emerald-800',
		warning: 'bg-amber-100 border-amber-400 text-amber-700',
		info: 'bg-sky-100 border-sky-500 text-sky-700'
	} as const;
</script>

<div class="z-20 flex flex-col gap-8">
	<div class="text-center pb-6 border-b-2 border-dashed border-black">
		<h3 class="text-2xl font-display uppercase tracking-[0.2em]">{data.title}</h3>
		<p class="font-mono text-sm text-ink/70">{data.subtitle}</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each data.steps as step, index}
			{@const Icon = stepIcons[index]}
			{@const BadgeIcon = badgeIcons[index]}
			{@const badgeType = badgeTypes[index]}
			
			<div class="border-2 z-20 border-black bg-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
				<div class="flex items-center gap-4 p-6 border-b-2 border-black bg-black text-white">
					<div class="flex items-center justify-center w-12 h-12 border-2 border-white rounded-full">
						<Icon size={24} />
					</div>
					<h4 class="font-display text-base uppercase tracking-[0.2em]">{step.title}</h4>
				</div>
				<div class="flex flex-col gap-4 p-6">
					<p class="font-mono text-sm text-black/70">{step.description}</p>
					<div class="flex flex-col gap-2 p-4 bg-zinc-100 border-2 border-black font-mono text-xs">
						{#each step.code as codeLine}
							<code>{codeLine}</code>
						{/each}
					</div>
					<div class={`inline-flex items-center gap-2 px-4 py-2 border-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] w-fit ${badgeClassMap[badgeType as keyof typeof badgeClassMap]}`}>
						<BadgeIcon size={14} />
						<span>{step.badge}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Security Flow Diagram -->
	<div class="flex flex-col items-stretch justify-center gap-4 p-8 bg-zinc-100 border-2 border-dashed border-black overflow-x-auto md:flex-row md:items-center">
		{#each data.flow.steps as flowStep, index}
			<div class="flex items-center gap-4">
				<div
					class="flex min-w-[140px] flex-col items-center gap-2 z-20 p-6 border-2 border-black bg-white"
					class:bg-amber-100={index === 1 || index === 2}
					class:border-amber-400={index === 1 || index === 2}
					class:bg-emerald-100={index === 3}
					class:border-emerald-500={index === 3}
				>
					<p class="font-display text-sm uppercase tracking-[0.2em] text-center">{flowStep.label}</p>
					<p class="font-mono text-xs text-black/60 text-center">{flowStep.sublabel}</p>
				</div>
				{#if index < data.flow.steps.length - 1}
					<div class="text-2xl font-bold rotate-90 md:rotate-0">→</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Protected Endpoints -->
	<div class="p-8 z-20 border-2 border-black bg-white">
		<h4 class="font-display text-xl uppercase tracking-[0.2em] mb-6 pb-4 border-b-2 border-dashed border-black">{data.endpoints.title}</h4>
		<div class="flex flex-col gap-4">
			{#each data.endpoints.list as endpoint}
				<div class="grid grid-cols-1 gap-2 p-4 border-2 border-black bg-zinc-100 font-mono text-sm text-black/80 sm:grid-cols-[auto_minmax(0,_1fr)_auto] sm:gap-4 sm:items-center">
					<span class="px-3 py-1 bg-black text-white font-bold uppercase tracking-[0.1em]">{endpoint.method}</span>
					<span class="font-semibold">{endpoint.path}</span>
					<span class="text-right text-black/60 sm:text-right">{endpoint.desc}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
