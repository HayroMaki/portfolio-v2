<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Menu, X, Github, Linkedin, Mail } from 'lucide-svelte';
	
	let mobileMenuOpen = $state(false);

	let { children } = $props();
	
	const navItems = [
		{ href: '/', label: 'Accueil' },
		{ href: '/projets/travia', label: 'Travia' },
		{ href: '/projets/speedywiki', label: 'SpeedyWiki' },
		{ href: '/projets/configurateurs', label: 'Configurateurs' },
		{ href: '/projets/mcp', label: 'MCP Server' }
	];
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white">
	<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<a href="/" class="text-xl font-bold">
					<span class="text-gradient">JRG</span>
				</a>
				
				<div class="hidden md:flex items-center gap-8">
					{#each navItems as item}
						<a 
							href={item.href}
							class="text-sm font-medium transition-colors hover:text-[#00ffc8] {$page.url.pathname === item.href ? 'text-[#00ffc8]' : 'text-white/70'}"
						>
							{item.label}
						</a>
					{/each}
				</div>
				
				<div class="hidden md:flex items-center gap-4">
					<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-[#00ffc8] transition-colors">
						<Github size={20} />
					</a>
					<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-[#00ffc8] transition-colors">
						<Linkedin size={20} />
					</a>
					<a href="mailto:contact@example.com" class="text-white/70 hover:text-[#00ffc8] transition-colors">
						<Mail size={20} />
					</a>
				</div>
				
				<button 
					class="md:hidden text-white"
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<X size={24} />
					{:else}
						<Menu size={24} />
					{/if}
				</button>
			</div>
		</div>
		
		{#if mobileMenuOpen}
			<div class="md:hidden border-t border-white/5 bg-[#0a0a0a]">
				<div class="px-4 py-4 space-y-3">
					{#each navItems as item}
						<a 
							href={item.href}
							class="block text-sm font-medium transition-colors hover:text-[#00ffc8] {$page.url.pathname === item.href ? 'text-[#00ffc8]' : 'text-white/70'}"
							onclick={() => mobileMenuOpen = false}
						>
							{item.label}
						</a>
					{/each}
					<div class="flex items-center gap-4 pt-4 border-t border-white/5">
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-[#00ffc8] transition-colors">
							<Github size={20} />
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white/70 hover:text-[#00ffc8] transition-colors">
							<Linkedin size={20} />
						</a>
						<a href="mailto:contact@example.com" class="text-white/70 hover:text-[#00ffc8] transition-colors">
							<Mail size={20} />
						</a>
					</div>
				</div>
			</div>
		{/if}
	</nav>
	
	<main class="pt-16">
		{@render children()}
	</main>
	
	<footer class="border-t border-white/5 mt-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<p class="text-white/50 text-sm"> 2025 Jules Renaud-Grange. Tous droits rservs.</p>
				<div class="flex items-center gap-6">
					<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-white/50 hover:text-[#00ffc8] transition-colors">
						<Github size={18} />
					</a>
					<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white/50 hover:text-[#00ffc8] transition-colors">
						<Linkedin size={18} />
					</a>
					<a href="mailto:contact@example.com" class="text-white/50 hover:text-[#00ffc8] transition-colors">
						<Mail size={18} />
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
