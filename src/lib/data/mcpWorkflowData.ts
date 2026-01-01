import { User, Globe, Brain, Server } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export interface WorkflowActor {
	id: string;
	label: string;
	icon: ComponentType;
}

export interface WorkflowStep {
	id: number;
	label: string;
	code: string;
	from: string;
	to: string;
}

const iconMap = {
	client: User,
	site: Globe,
	ai: Brain,
	mcp: Server
};

const stepFlow = [
	{ from: 'client', to: 'site' },
	{ from: 'site', to: 'ai' },
	{ from: 'ai', to: 'mcp' },
	{ from: 'mcp', to: 'ai' },
	{ from: 'ai', to: 'mcp' },
	{ from: 'mcp', to: 'ai' },
	{ from: 'ai', to: 'mcp' },
	{ from: 'mcp', to: 'ai' },
	{ from: 'ai', to: 'mcp' },
	{ from: 'mcp', to: 'ai' },
	{ from: 'ai', to: 'site' },
	{ from: 'site', to: 'client' }
];

export function getMCPWorkflowData(workflowTranslations: any): {
	actors: WorkflowActor[];
	steps: WorkflowStep[];
} {
	const actors = workflowTranslations.actors.map((actor: any) => ({
		id: actor.id,
		label: actor.label,
		icon: iconMap[actor.id as keyof typeof iconMap]
	}));

	const steps = workflowTranslations.steps.map((step: any, index: number) => ({
		id: index,
		label: step.label,
		code: step.code,
		from: stepFlow[index].from,
		to: stepFlow[index].to
	}));

	return { actors, steps };
}
