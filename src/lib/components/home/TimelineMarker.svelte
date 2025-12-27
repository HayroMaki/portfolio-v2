<script lang="ts">
	export let visible = false;
	export let align: 'left' | 'right' | 'center' = 'left';
</script>

<div class="timeline-marker z-10 hidden md:block" data-visible={visible} data-align={align} aria-hidden="true">
	<span class="timeline-marker__speed-lines timeline-marker__speed-lines--top"></span>
	<span class="timeline-marker__dot"></span>
	<span class="timeline-marker__pulse"></span>
	<span class="timeline-marker__speed-lines timeline-marker__speed-lines--bottom"></span>
</div>

<style>
	.timeline-marker {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(calc(-50% - 1px), -50%);
		width: 20px;
		height: 20px;
		pointer-events: none;
		color: currentColor;
	}

	.timeline-marker__dot {
		position: absolute;
		inset: 0;
		border-radius: 999px;
		border: 2px solid currentColor;
		background: rgba(0, 0, 0, 0.95);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
	}

	.timeline-marker__pulse {
		position: absolute;
		inset: -12px;
		border-radius: 999px;
		border: 1.5px dashed currentColor;
		opacity: 0;
		transform: scale(0.6);
	}

	.timeline-marker[data-visible='true'] .timeline-marker__pulse {
		animation: marker-pulse 1.8s ease-out forwards;
	}

	.timeline-marker__speed-lines {
		position: absolute;
		left: 50%;
		width: 2px;
		height: 28px;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 0%,
			currentColor 55%,
			rgba(255, 255, 255, 0) 100%
		);
		opacity: 0;
	}

	.timeline-marker__speed-lines--top {
		top: -36px;
		transform-origin: bottom center;
	}

	.timeline-marker__speed-lines--bottom {
		bottom: -36px;
		transform-origin: top center;
	}

	.timeline-marker[data-visible='true'] .timeline-marker__speed-lines {
		animation: marker-lines 900ms ease-out forwards;
	}

	.timeline-marker[data-align='right'] .timeline-marker__speed-lines {
		transform: rotate(-5deg);
	}

	.timeline-marker[data-align='left'] .timeline-marker__speed-lines {
		transform: rotate(5deg);
	}

	@keyframes marker-pulse {
		from {
			opacity: 0.45;
			transform: scale(0.7);
		}
		40% {
			opacity: 0.85;
		}
		to {
			opacity: 0;
			transform: scale(1.2);
		}
	}

	@keyframes marker-lines {
		from {
			opacity: 0;
			transform: scaleY(0.5);
		}
		to {
			opacity: 0.85;
			transform: scaleY(1);
		}
	}
</style>
