<script lang="ts">
	import { onMount } from 'svelte';
	import { User, Globe, Brain, Server } from 'lucide-svelte';

	let container: HTMLElement;

	const actors = [
		{ id: 'client', label: 'Client', icon: User },
		{ id: 'site', label: 'Site Web', icon: Globe },
		{ id: 'ai', label: 'AI Provider', icon: Brain },
		{ id: 'mcp', label: 'MCP Server', icon: Server }
	];

	const steps = [
		{
			id: 0,
			label: 'Demande meuble',
			code: '"Je voudrais un meuble de 120cm..."',
			from: 'client',
			to: 'site'
		},
		{
			id: 1,
			label: 'POST /api/chat',
			code: 'Transmission de la demande',
			from: 'site',
			to: 'ai'
		},
		{
			id: 2,
			label: '*/mcp',
			code: 'Connexion au serveur MCP : récupération des tools, resources, templates...',
			from: 'ai',
			to: 'mcp'
		},
		{
			id: 3,
			label: 'Connexion établie - envoie les tools, resources...',
			code: '["create-project", "update-column-structure", ...]',
			from: 'mcp',
			to: 'ai'
		},
		{
			id: 4,
			label: 'create-project',
			code: '{ "name": "Cabinet", "type": "cabinet", "dimensions": {...} }',
			from: 'ai',
			to: 'mcp'
		},
		{
			id: 5,
			label: 'Project ID',
			code: '{ "projectId": "proj_abc123" }',
			from: 'mcp',
			to: 'ai'
		},
		{
			id: 6,
			label: 'update-column-structure',
			code: '{ "projectId": "...", "structure": { "columns": [...] } }',
			from: 'ai',
			to: 'mcp'
		},
		{
			id: 7,
			label: 'Confirmation',
			code: '{ "success": true }',
			from: 'mcp',
			to: 'ai'
		},
		{
			id: 8,
			label: 'get-viewer-url',
			code: '{ "projectId": "proj_abc123" }',
			from: 'ai',
			to: 'mcp'
		},
		{
			id: 9,
			label: 'Viewer URL',
			code: '{ "url": "https://..." }',
			from: 'mcp',
			to: 'ai'
		},
		{
			id: 10,
			label: 'Affichage 3D',
			code: '<ViewerComponent />',
			from: 'ai',
			to: 'site'
		},
		{
			id: 11,
			label: 'Meuble visualisé',
			code: '✓ Rendu final',
			from: 'site',
			to: 'client'
		}
	];

	let visibleSteps = $state<number[]>(steps.map((step) => step.id));

	function handleScroll() {
		if (!container) return;

		const containerRect = container.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const triggerPoint = viewportHeight * 0.7;

		const stepElements = container.querySelectorAll('[data-step-id]');
		const newVisibleSteps: number[] = [];

		stepElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			const stepId = parseInt(el.getAttribute('data-step-id') || '0');

			if (rect.top < triggerPoint) {
				newVisibleSteps.push(stepId);
			}
		});

		visibleSteps = newVisibleSteps;
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="mcp-workflow-animation" bind:this={container}>
	<div class="workflow-header">
		<h3 class="workflow-title">MCP Workflow</h3>
		<p class="workflow-subtitle">Scroll pour voir le flux de communication</p>
	</div>

	<!-- Sticky Actors Header -->
	<div class="actors-sticky-header">
		{#each actors as actor, index}
			<div class="actor-header-item">
				<div class="actor-icon">
					<actor.icon size={20} />
				</div>
				<p class="actor-label">{actor.label}</p>
			</div>
		{/each}
	</div>

	<div class="diagram-wrapper">
		<div class="diagram-grid">
			<div class="grid-lines" aria-hidden="true">
				{#each actors as actor}
					<div class="grid-line"></div>
				{/each}
			</div>

			<!-- Sequence Diagram Steps -->
			<div class="sequence-diagram">
				{#each steps as step, index}
					{@const fromIndex = actors.findIndex((a) => a.id === step.from)}
					{@const toIndex = actors.findIndex((a) => a.id === step.to)}
					{@const isVisible = visibleSteps.includes(step.id)}
					{@const isReverse = fromIndex > toIndex}
					{@const leftPos = Math.min(fromIndex, toIndex)}
					{@const rightPos = Math.max(fromIndex, toIndex)}
					{@const arrowWidth = Math.max(15, (rightPos - leftPos) * 25)}
					
					<div class="sequence-step" data-step-id={step.id}>
						<!-- Arrow with label on top -->
						<div 
						class="arrow-container {isVisible ? 'visible' : ''}" 
						class:reverse={isReverse}
						style:left={`calc(${leftPos * 25}% + 12.5%)`}
						style:width={`${arrowWidth}%`}
					>
						<!-- Label above arrow -->
						<div class="arrow-label">
							<span class="label-text">{step.label}</span>
						</div>
						
						<!-- Arrow line and head -->
						<div class="arrow-body">
							<div class="arrow-line"></div>
							<div class="arrow-head"></div>
						</div>
						
						<!-- Code below arrow -->
						<div class="arrow-code">
							<code>{step.code}</code>
						</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.mcp-workflow-animation {
		border: 2px solid var(--ink);
	}

	.workflow-header {
        position:relative;
        padding: 2rem 0;
		text-align: center;
        background: var(--paper);
        z-index: 20;
	}

	.workflow-title {
		font-family: var(--font-display);
		font-size: 1.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		margin-bottom: 0.5rem;
	}

	.workflow-subtitle {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		color: var(--ink);
		opacity: 0.6;
	}

	.actors-sticky-header {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		position: sticky;
		top: 4rem;
		z-index: 20;
        background: var(--paper);
        padding: 1rem;
		border-bottom: 2px solid var(--ink);
	}

	.actor-header-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.actor-icon {
		width: 3rem;
		height: 3rem;
		border: 2px solid var(--ink);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--paper);
	}

	.actor-label {
		font-family: var(--font-mono);
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		text-align: center;
	}

	.diagram-wrapper {
		position: relative;
		overflow-x: auto;
		padding-bottom: 3rem;
	}

	.diagram-wrapper::-webkit-scrollbar {
		height: 6px;
	}

	.diagram-wrapper::-webkit-scrollbar-thumb {
		background: var(--ink);
	}

	.diagram-grid {
		position: relative;
		min-width: 960px;
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		pointer-events: none;
		z-index: 0;
	}

	.grid-line {
		width: 2px;
		margin: 0 auto;
		background: var(--ink);
		opacity: 0.2;
	}

	.sequence-diagram {
		position: relative;
		z-index: 5;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		padding: 10rem 0 3rem 0;
	}

	.sequence-step {
		position: relative;
		min-height: 5rem;
	}

	.arrow-container {
		position: absolute;
		top: 0;
		height: 3px;
		display: flex;
		align-items: center;
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 5;
	}

	.arrow-container.visible {
		opacity: 1;
	}

	.arrow-label {
		position: absolute;
		top: -2.25rem;
		left: 50%;
		transform: translate(-50%, 10px);
		white-space: nowrap;
		z-index: 10;
		opacity: 0;
		transition: opacity 0.4s ease 0.95s, transform 0.5s ease 0.95s;
	}

	.label-text {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: var(--paper);
		border: 1px solid var(--ink);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.arrow-container.visible .arrow-label {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	.arrow-line {
		position: absolute;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--ink);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.arrow-container.reverse .arrow-line {
		transform-origin: right;
	}

	.arrow-container.visible .arrow-line {
		transform: scaleX(1);
	}

	.arrow-container.reverse.visible .arrow-line {
		left: 6px;
	}

	.arrow-container:not(.reverse).visible .arrow-line {
		right: 6px;
	}

	.arrow-head {
		position: absolute;
		top: -3px;
		left: 0;
		width: 0;
		height: 0;
		border-left: 10px solid var(--ink);
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		opacity: 0;
		transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.2s;
	}

	.arrow-container.visible .arrow-head {
		left: calc(100% - 8px);
		opacity: 1;
	}

	.arrow-container.reverse .arrow-head {
		left: calc(100% - 12px);
		border-left: none;
		border-right: 10px solid var(--ink);
	}

	.arrow-container.reverse.visible .arrow-head {
		left: 0;
	}

	.arrow-code {
		position: absolute;
		top: 0.75rem;
		left: 50%;
		transform: translate(-50%, -10px);
		white-space: nowrap;
		z-index: 10;
		opacity: 0;
		transition: opacity 0.4s ease 1.05s, transform 0.5s ease 1.05s;
	}

	.arrow-code code {
		display: inline-block;
		padding: 0.35rem 0.65rem;
		background: var(--ink);
		color: var(--paper);
		border: 1px solid var(--ink);
		font-family: var(--font-mono);
		font-size: 0.65rem;
		max-width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.arrow-container.visible .arrow-code {
		opacity: 1;
		transform: translate(-50%, 0);
	}


	@media (max-width: 640px) {
		.mcp-workflow-animation {
			padding: 1.5rem 0.5rem;
		}

		.actors-sticky-header {
			grid-template-columns: repeat(2, 1fr);
			gap: 0.5rem;
		}

		.actor-icon {
			width: 2.25rem;
			height: 2.25rem;
		}

		.actor-label {
			font-size: 0.55rem;
		}

		.arrow-code code {
			font-size: 0.55rem;
			max-width: 180px;
		}
	}
</style>
