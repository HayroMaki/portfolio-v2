<script lang="ts">
	import cvPdf from '$lib/assets/CV_Jules-Grange.pdf?url';
	import { locale } from '$lib/stores/locale';
	import { getTranslations } from '$lib/i18n';

	const t = $derived(getTranslations($locale));
	const cvContent = $derived(t.cv_page);
</script>

<main class="min-h-screen bg-paper text-ink">
	<section class="border-b-2 border-ink">
		<div class="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center">
			<div class="space-y-6">
				<p class="kanji-tag bg-paper uppercase">{cvContent.badge}</p>
				<h1 class="stroke-title leading-[0.8]">
					{cvContent.title.regular} <strong>{cvContent.title.highlight}</strong>
				</h1>
				<div class="flex flex-wrap gap-4">
					<a
						href={cvPdf}
						target="_blank"
						rel="noreferrer"
						class="inline-flex items-center gap-3 bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.4em] text-paper border-2 border-ink shadow-panel transition hover:-translate-y-1"
					>
						{cvContent.ctas.open}
					</a>
					<a
						href={cvPdf}
						download="Jules_Renaud_Grange_CV.pdf"
						class="inline-flex items-center gap-3 border-2 border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.4em] hover:bg-ink hover:text-paper transition"
					>
						{cvContent.ctas.download}
					</a>
				</div>
				<p class="text-xs font-mono uppercase tracking-[0.35em] text-ink/60">
					{cvContent.last_update}
				</p>
			</div>

			<div class="manga-panel w-1/3 border-2 border-ink bg-paper p-6 font-mono text-sm leading-relaxed text-ink/80 space-y-2">
				<p class="font-mono text-xs uppercase tracking-[0.4em] text-ink/60">{cvContent.contact.title}</p>
				{#each cvContent.contact.items as item}
					<p>{item.label} — {item.value}</p>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-12 border-b border-dashed border-ink bg-paper">
		<div class="mx-auto max-w-5xl px-6">
			<div class="manga-panel overflow-hidden border-2 border-ink">
				<div class="border-b border-dashed border-ink/50 bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.4em]">
					{cvContent.viewer.banner}
				</div>
				<div class="relative h-[calc(100vh-100px)] max-h-[900px] bg-paper">
					<iframe
						src={`${cvPdf}#view=fitH`}
						class="h-full w-full"
						title="CV Jules Renaud-Grange"
					></iframe>
					<div class="pointer-events-none absolute inset-4 border-2 border-dashed border-ink"></div>
					<p class="pointer-events-none absolute left-4 top-4 bg-paper px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.4em]">
						{cvContent.viewer.hint}
					</p>
				</div>
			</div>
		</div>
	</section>
</main>
