import { writable } from 'svelte/store';

export const isTransitioning = writable(false);
export const transitionDirection = writable<'in' | 'out'>('in');
