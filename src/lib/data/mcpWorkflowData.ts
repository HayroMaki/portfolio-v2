import { User, Globe, Brain, Server } from 'lucide-svelte';

export const mcpActors = [
	{ id: 'client', label: 'Client', icon: User },
	{ id: 'site', label: 'Site Web', icon: Globe },
	{ id: 'ai', label: 'AI Provider', icon: Brain },
	{ id: 'mcp', label: 'MCP Server', icon: Server }
];

export const mcpSteps = [
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
