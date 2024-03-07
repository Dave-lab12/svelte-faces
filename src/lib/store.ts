import { writable, type Writable } from 'svelte/store';
import type { LoadedParts } from './types.js';

export const avatarParts = writable({
    face: 0,
    nose: 0,
    mouth: 0,
    eyes: 0,
    eyebrows: 0,
    glasses: 0,
    hair: 0,
    accessories: 0,
    details: 0,
    beard: 0,
});

export const loadedParts: Writable<LoadedParts[]> = writable([]);

export const loadedPreview: Writable<LoadedParts[]> = writable([]);

export const avatarPreview = writable({});

export const isInitialized = writable(false);