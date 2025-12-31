<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft, AlertTriangle } from 'lucide-svelte';

	const errorCode = $derived($page.status || 404);
	const errorMessage = $derived($page.error?.message || 'Page not found');
</script>

<main class="min-h-screen bg-paper text-ink flex items-center justify-center px-6 relative overflow-hidden">
	<!-- Animated background elements -->
	<div class="fixed top-0 min-h-screen inset-0 pointer-events-none overflow-hidden">
        <div class="fixed top-[0%] left-[50%] w-44 h-44 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow"></div>
		<div class="fixed top-[10%] left-[20%] w-40 h-40 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow"></div>
        <div class="fixed top-[80%] right-[20%] w-32 h-32 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow-inverted"></div>
        <div class="fixed top-[40%] left-[20%] w-20 h-20 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow-inverted-quicker"></div>
        <div class="fixed top-[60%] right-[20%] w-16 h-16 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow-quicker"></div>
        <div class="fixed top-[20%] left-[80%] w-20 h-20 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow-inverted-quicker"></div>
        <div class="fixed top-[85%] right-[60%] w-40 h-40 border-2 border-dashed border-ink/20 rotate-12 animate-spin-slow-inverted"></div>
	</div>

	<div class="relative z-10 max-w-3xl w-full">
		<div class="manga-panel p-12 space-y-6 text-center">
			<div class="relative inline-block">
				<div class="absolute inset-0 bg-accent/20 blur-2xl"></div>
				<div class="relative manga-panel border-4 border-ink p-8 bg-paper inline-block">
					<AlertTriangle size={80} class="text-accent" strokeWidth={2.5} />
				</div>
				<div class="absolute -top-4 -right-4 bg-ink text-paper px-4 py-2 font-display text-3xl rotate-12 border-2 border-ink">
					{errorCode}
				</div>
			</div>

			<div class="space-y-4">
				<h1 class="text-5xl md:text-6xl font-display uppercase tracking-[0.3em]">
					{#if errorCode === 404}
						Lost in <strong class="text-accent">Space</strong>
					{:else}
						Error <strong class="text-accent">{errorCode}</strong>
					{/if}
				</h1>
				<p class="font-mono text-lg text-ink/80 leading-relaxed max-w-xl mx-auto">
					{#if errorCode === 404}
						The page you're looking for has vanished into the void. Maybe it never existed... Who knows.
					{:else}
						{errorMessage}
					{/if}
				</p>
			</div>

			<div class="relative inline-block max-w-md mx-auto">
				<div class="manga-panel p-6 bg-ink text-paper relative">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-ink"></div>
					<p class="font-mono text-sm uppercase tracking-[0.3em]">
						{#if errorCode === 404}
							"This is not the page you're looking for..."
						{:else}
							"Something went wrong..."
						{/if}
					</p>
				</div>
			</div>

			<div class="flex flex-wrap gap-4 justify-center pt-4">
				<a
					href="/"
					class="inline-flex items-center gap-3 bg-ink text-paper px-7 py-3 uppercase tracking-[0.3em] border-2 border-ink shadow-panel transition hover:-translate-y-1 font-mono text-sm"
				>
					<ArrowLeft size={18} />
					Back Home
				</a>
			</div>
		</div>
	</div>
</main>

<style>
	@keyframes spin-slow {
		from {
			transform: rotate(12deg);
		}
		to {
			transform: rotate(372deg);
		}
	}

    	@keyframes spin-slow-inverted {
		from {
			transform: rotate(372deg);
		}
		to {
			transform: rotate(12deg);
		}
	}

	.animate-spin-slow {
		animation: spin-slow 20s linear infinite;
	}

    .animate-spin-slow-quicker {
		animation: spin-slow 12s linear infinite;
	}

    .animate-spin-slow-inverted {
        animation: spin-slow-inverted 20s linear infinite;
    }

    .animate-spin-slow-inverted-quicker {
        animation: spin-slow-inverted 12s linear infinite;
    }
</style>
