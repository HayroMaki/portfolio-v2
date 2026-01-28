<script lang="ts">
	import { onMount } from 'svelte';
	import { drawSteps, drawBase, drawTopFloor } from './StairsUtils';

	export let width: number = 1800;
	export let height: number = 1800;
	export let steps: number = 8;
	export let topStepWidth: number = 0;
	export let botStepWidth: number = 0;
	export let botHeight: number = 0;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;

	// Stairs configuration matching sharedsvelte defaults
	const stepNose = 30;
	const baseThickness = 18;
	const plinthHeight = 80;
	const plinthLeft = 0;
	const plinthRight = 0;
	const side: 'left' | 'right' = 'left';
	const boxesClose = 0;
	const countersteps = 0;
	const topVertical = 0;
	const v2 = false;
	const baseType = 2;

	/**
	 * Calculate scale to fit stairs in canvas
	 */
	function calculateScale(canvasWidth: number, canvasHeight: number): number {
		const horizontalScale = (canvasWidth - 150) / (width * 1.3);
		const verticalScale = (canvasHeight - 150) / (height * 1.3);
		return Math.min(horizontalScale, verticalScale);
	}

	/**
	 * Draw the complete stairs on canvas
	 */
	function draw() {
		if (!ctx || !canvas) return;

		const canvasWidth = canvas.width;
		const canvasHeight = canvas.height;
		const scale = calculateScale(canvasWidth*1.5, canvasHeight*1.5);

		// Clear canvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Calculate default step width
		const defaultStepWidth = (width - stepNose) / steps;
		
		// Determine if step widths are "custom" or "default"
		// If they're within 10% of default, treat as default (pass 0)
		const threshold = defaultStepWidth * 0.1;
		const useTopStepWidth = Math.abs(topStepWidth - defaultStepWidth) > threshold ? topStepWidth : 0;
		const useBotStepWidth = Math.abs(botStepWidth - defaultStepWidth) > threshold ? botStepWidth : 0;
		
		// For botHeight, use a fixed threshold (plinth + small margin)
		const defaultBotHeightThreshold = plinthHeight + 100;
		const useBotHeight = botHeight > defaultBotHeightThreshold ? botHeight : 0;

		// Calculate giron (step width) for comfort calculation
		const stepHeight = (height - useBotHeight) / (steps + 1);
		const practicalSteps = steps - (useBotStepWidth > 0 ? 1 : 0) - (useTopStepWidth > 0 ? 1 : 0);
		const giron = (width - stepNose - useTopStepWidth - useBotStepWidth) / practicalSteps;

		// Draw components in order
		drawTopFloor(ctx, height, width, side, scale, canvasWidth, canvasHeight, width, height);
		drawBase(ctx, width, height, plinthHeight, plinthLeft, plinthRight, stepNose, side, scale, canvasWidth, canvasHeight, width, height, baseType);
		drawSteps(ctx, width, height, steps, useTopStepWidth, useBotStepWidth, useBotHeight, stepNose, baseThickness, giron, plinthHeight, side, scale, canvasWidth, canvasHeight, width, height, boxesClose, countersteps, topVertical, v2);
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d');
			draw();
		}
	});

	// Redraw when dimensions or design options change
	$: if (ctx && canvas) {
		width, height, steps, topStepWidth, botStepWidth, botHeight;
		draw();
	}
</script>

<canvas
	bind:this={canvas}
	width={600}
	height={400}
	class="w-full h-full"
></canvas>

<style>
	canvas {
		display: block;
	}
</style>
