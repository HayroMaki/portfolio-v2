import { User, Wifi, Server, Globe } from 'lucide-svelte';
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
	client1: User,
	client2: User,
	websocket: Wifi,
	proxy: Server,
	wikipedia: Globe
};

const stepFlow = [
	{ from: 'client1', to: 'websocket' },
	{ from: 'client1', to: 'websocket' },
	{ from: 'websocket', to: 'client1' },
	{ from: 'client1', to: 'client2' },
	{ from: 'client2', to: 'websocket' },
	{ from: 'websocket', to: 'client2' },
	{ from: 'client1', to: 'websocket' },
	{ from: 'websocket', to: 'wikipedia' },
	{ from: 'wikipedia', to: 'websocket' },
	{ from: 'websocket', to: 'client1' },
	{ from: 'websocket', to: 'client2' },
	{ from: 'client1', to: 'proxy' },
	{ from: 'proxy', to: 'wikipedia' },
	{ from: 'wikipedia', to: 'proxy' },
	{ from: 'proxy', to: 'client1' },
	{ from: 'client2', to: 'proxy' },
	{ from: 'proxy', to: 'wikipedia' },
	{ from: 'wikipedia', to: 'proxy' },
	{ from: 'proxy', to: 'client2' },
	{ from: 'client1', to: 'websocket' },
	{ from: 'websocket', to: 'client1' },
	{ from: 'websocket', to: 'client2' }
];

export function getSpeedyWikiWorkflowData(workflowTranslations: any): {
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
