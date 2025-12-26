<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Menu, X, Github, Linkedin, Mail, Languages, Wallet } from 'lucide-svelte';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';
	
	let mobileMenuOpen = $state(false);

	let { children } = $props();
	
	const t = $derived(getTranslations($locale));
	
	function toggleLocale() {
		$locale = $locale === 'fr' ? 'en' : 'fr';
	}
</script>

<div class="min-h-screen bg-paper text-ink font-sans">
	<nav class="fixed top-0 left-0 right-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-sm">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<a href="/" class="flex flex-col leading-none">
					<span class="font-display text-2xl tracking-[0.35em] uppercase">Jules</span>
					<span class="text-xs font-mono uppercase tracking-[0.5em]">Grange</span>
				</a>

				<div class="hidden md:flex items-center gap-6">
					{#each [
						{ href: '/', label: t.nav.home }
					] as link}
						<a
							href={link.href}
							class={`text-xs font-mono uppercase tracking-[0.4em] border-b-2 ${
								$page.url.pathname === link.href ? 'border-ink text-ink' : 'border-transparent text-ink/60'
							} hover:border-ink hover:text-ink transition`}
						>
							{link.label}
						</a>
					{/each}
				</div>

				<div class="hidden md:flex items-center gap-3">
					<button
						onclick={toggleLocale}
						class="inline-flex items-center gap-2 border-2 border-ink px-3 py-2 font-mono text-xs uppercase tracking-[0.4em] hover:bg-ink hover:text-paper transition"
					>
						<Languages size={18}/><span class="ml-1">{$locale}</span>
					</button>
					<a href="https://github.com/HayroMaki" target="_blank" rel="noopener noreferrer" class="p-2 border-2 border-ink hover:bg-ink hover:text-paper transition">
						<Github size={18} />
					</a>
					<a href="https://www.linkedin.com/in/julesrenaudgrange/" target="_blank" rel="noopener noreferrer" class="p-2 border-2 border-ink hover:bg-ink hover:text-paper transition">
						<Linkedin size={18} />
					</a>
					<a href="mailto:julesgrange@outlook.fr" class="p-2 border-2 border-ink hover:bg-ink hover:text-paper transition">
						<Mail size={18} />
					</a>
					<a href="CV" class="p-2 border-2 border-ink hover:bg-ink hover:text-paper transition">
						<Wallet size={18} />
					</a>
				</div>

				<button
					class="md:hidden border-2 border-ink p-2"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
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
			<div class="md:hidden border-t-2 border-ink bg-paper">
				<div class="px-4 py-4 space-y-3">
					{#each [
						{ href: '/', label: t.nav.home },
						{ href: '/projets/travia', label: t.nav.travia },
						{ href: '/projets/speedywiki', label: t.nav.speedywiki },
						{ href: '/projets/configurateurs', label: t.nav.configurateurs },
						{ href: '/projets/mcp', label: t.nav.mcp }
					] as link}
						<a
							href={link.href}
							onclick={() => (mobileMenuOpen = false)}
							class={`block text-xs font-mono uppercase tracking-[0.4em] border-b ${
								$page.url.pathname === link.href ? 'border-ink text-ink' : 'border-transparent text-ink/70'
							} py-2`}
						>
							{link.label}
						</a>
					{/each}
					<div class="flex flex-wrap items-center gap-3 pt-4 border-t border-ink/40">
						<button
							onclick={toggleLocale}
							class="inline-flex flex-1 items-center justify-center gap-2 border-2 border-ink px-3 py-2 font-mono text-xs uppercase tracking-[0.4em]"
						>
							<Languages size={16} />
							<span>{$locale}</span>
						</button>
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="p-2 border-2 border-ink">
							<Github size={18} />
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="p-2 border-2 border-ink">
							<Linkedin size={18} />
						</a>
						<a href="mailto:contact@example.com" class="p-2 border-2 border-ink">
							<Mail size={18} />
						</a>
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<main class="pt-20">
		{@render children()}
	</main>

	<footer class="mt-24 border-t-2 border-ink bg-paper">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<div class="flex flex-col md:flex-row justify-between gap-6">
				<div>
					<p class="font-mono text-xs uppercase tracking-[0.4em]">Portfolio v2</p>
					<p class="text-base text-ink/70">{t.footer.copyright}</p>
				</div>
				<div class="flex items-center gap-4">
					<a href="https://github.com/HayroMaki" target="_blank" rel="noopener noreferrer" class="px-4 py-2 border-2 border-ink font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition">
						Github
					</a>
					<a href="https://linkedin.com/in/julesrenaudgrange" target="_blank" rel="noopener noreferrer" class="px-4 py-2 border-2 border-ink font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition">
						LinkedIn
					</a>
					<a href="mailto:julesgrange@outlook.fr" class="px-4 py-2 border-2 border-ink font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition">
						Mail
					</a>
					<a href="CV" class="px-4 py-2 border-2 border-ink font-mono text-xs uppercase tracking-[0.3em] hover:bg-ink hover:text-paper transition">
						CV
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
