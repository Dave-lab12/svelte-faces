import type { AvatarConfig } from '$lib/types.js'
import { AvatarStyleCount, SVGFilter } from '$lib/constant.js'
import { updateSvgPath, getRandomStyle } from '$lib/utils.js'
import html2canvas from 'html2canvas';
import { avatarParts, loadedParts, loadedPreview, avatarPreview, isInitialized } from '$lib/store.js'
import { get } from 'svelte/store';

const loadParts = async () => {
    const modules = import.meta.glob('./assets/avatar/part/**/*.svg', { query: '?raw', import: 'default', eager: true });
    loadedParts.set([]);
    const promises = Object.entries(modules).map(async ([path, loadModule]) => {
        loadedParts.update((parts) => {
            parts.push({ path, svg: loadModule });
            return parts;
        })
    });
    await Promise.all(promises);
}

const loadPreview = async () => {
    const modules = import.meta.glob('./assets/avatar/preview/**/*.svg', { query: '?raw', import: 'default', eager: true });
    loadedPreview.set([]);
    const promises = Object.entries(modules).map(async ([path, loadModule]) => {
        loadedPreview.update((parts) => {
            parts.push({ path, svg: loadModule });
            return parts;
        })
    });
    await Promise.all(promises);
}

const initializeAvatar = async () => {
    await loadParts();
    await loadPreview();
    isInitialized.set(true);
}

const getFeatureOptions = (parts: (keyof AvatarConfig)[]) => {
    const featureOptions = parts.map((part) => {
        const max = AvatarStyleCount[part];
        const parts = get(loadedParts).filter((data) => data.path.includes(part)).map(updateSvgPath)
        return { max, parts }
    });
    return featureOptions;
}

const getAllParts = () => {
    const allPartsWithType = get(loadedParts).map(updateSvgPath);
    return allPartsWithType
}

const getAvailableParts = () => {
    return Object.keys(AvatarStyleCount);
}

function generatePreview(config, flipped = false) {
    const groups = Object.keys(AvatarStyleCount).map((feature) => {
        const svgRaw = get(loadedPreview).find(data => data.path.includes(`${feature}/${config[feature]}.svg`))?.svg;

        if (!svgRaw) {
            return
        }

        const faceAttributes = feature === 'face' ? 'fill="#fff"' : '';
        const flipTransform = flipped ? 'transform="scale(-1,1) translate(-1080, 0)"' : '';
        const groupElement = `
            <g id="avatar-${feature}" ${faceAttributes} ${flipTransform}>
                ${svgRaw.replace(/<svg.*(?=>)>/, '').replace('</svg>', '')}
            </g>
        `;

        return groupElement.trim();
    });

    const svgContent = `
        <svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${SVGFilter}
            <g id="avatar" filter="url(#filter)">
                ${groups.join('')}
            </g>
        </svg>
    `.trim().replace(/(\n|\t)/g, '');

    return svgContent;
}

const getPng = async (dom: HTMLElement) => {
    const canvas = await html2canvas(dom, {
        logging: false,
        scale: window.devicePixelRatio,
        width: dom.offsetWidth,
        height: dom.offsetHeight,
    });
    return canvas.toDataURL('image/png');
}

const generateRandomAvatar = async () => {
    const config = getRandomStyle();

    avatarParts.update((parts) => {
        parts = config;
        return parts;
    });

    return avatarParts;
}

const avatarGenerator = {
    initialize: initializeAvatar,
    getFeatureOptions,
    getAllParts,
    generatePreview,
    getPng,
    generateRandomAvatar,
    avatarPreview,
    getRandomStyle,
    getAvailableParts,
    avatarParts,
    isInitialized
};

export { avatarGenerator };