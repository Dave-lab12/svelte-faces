import type { AvatarConfig } from '$lib/types.js'
import { AvatarStyleCount, SVGFilter, extractNumberFromPath } from '$lib/constant.js'
import html2canvas from 'html2canvas';

class AvatarBuilder {
    private config = {} as AvatarConfig;

    private avatarParts = [] as { path: string, svg: string | unknown }[];
    private avatarPreview = [] as { path: string, svg: string | unknown }[];

    constructor({ defaultParts }: { defaultParts: AvatarConfig }) {
        if (defaultParts) {
            this.config = defaultParts;
        }
        this.initialize();
    }

    public async initialize() {
        await this.loadSvgPreview();
        await this.loadSvgPart();
    }

    private getRandomStyle() {
        const config: AvatarConfig = Object.keys(AvatarStyleCount).reduce(
            (prev, next) =>
                Object.assign(prev, {
                    [next]: Math.floor(
                        Math.random() * (AvatarStyleCount[next as keyof typeof AvatarStyleCount] + 1),
                    ),
                }),
            {} as AvatarConfig,
        );

        config.beard = 0;
        config.details = 0;
        config.accessories = 0;

        return config;
    }

    private async loadSvgPreview() {
        const modules = import.meta.glob('./assets/avatar/preview/**/*.svg', { query: '?raw', import: 'default', eager: true });
        const promises = Object.entries(modules).map(async ([path, loadModule]) => {
            this.avatarPreview.push({ path, svg: loadModule });
        });
        await Promise.all(promises);
    }

    private async loadSvgPart() {
        const modules = import.meta.glob('./assets/avatar/part/**/*.svg', { query: '?raw', import: 'default', eager: true });
        const promises = Object.entries(modules).map(async ([path, loadModule]) => {
            this.avatarParts.push({ path, svg: loadModule });
        });
        await Promise.all(promises);
        // console.log(this.avatarParts)
    }

    public loadPartPreviews(part: keyof AvatarConfig) {
        // this.avatarParts ,path and svg

        // {path: './assets/avatar/part/beard/beard-0.svg', svg: '<?xml version="1.0" encoding="UTF-8"?>\n<svg width=…h="1" fill="none" fill-rule="evenodd"></g>\n</svg>'}
        // replace path dir to number  extractNumberFromPath
        const refactored = (data: {
            path: string;
            svg: unknown;
        }) => {
            return { path: extractNumberFromPath(data.path), svg: data.svg }
        }
        const parts = this.avatarParts.filter((data) => data.path.includes(part)).map(refactored)

        return parts
        // Sort previews by number to ensure they are in the correct order
        // return previews.sort((a, b) => a.number - b.number);
    }
    private getSvgContent(part: string, type: number) {
        const svg = this.avatarPreview.find((data) => data.path.includes(`${part}/${type}.svg`));
        return svg;
    }

    public randomize(parts: (keyof AvatarConfig)[]): AvatarBuilder {
        parts.forEach(part => {
            if (part in AvatarStyleCount) {
                const maxIndex = AvatarStyleCount[part];
                const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
                this.config[part] = randomIndex;
            }
        });
        return this;
    }


    public async generatePreview(flipped: boolean = false) {
        let svgContent = '';
        const groups = await Promise.all(
            Object.keys(AvatarStyleCount).map(async (type) => {
                const svgRaw = this.getSvgContent(type, this.config[type as keyof typeof this.config])?.svg

                return `\n<g id="notion-avatar-${type}" ${type === 'face' ? 'fill="#fff"' : ''
                    } ${flipped ? 'transform="scale(-1,1) translate(-1080, 0)"' : ''}>\n
          ${svgRaw?.replace(/<svg.*(?=>)>/, '').replace('</svg>', '')}
        \n</g>\n`;
            })
        );
        svgContent = `<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${SVGFilter}
      <g id="notion-avatar" filter="url(#filter)">
        ${groups.join('\n\n')}
      </g>
    </svg>`
            .trim()
            .replace(/(\n|\t)/g, '');
        return svgContent;
    }

    public getRandomAvatar() {
        this.config = this.getRandomStyle();
        return this.generatePreview();
    }

    public listAvailableParts(): string[] {
        return Object.keys(AvatarStyleCount);
    }

    public getStyleRangeForPart(part: (keyof AvatarConfig)): { min: number, max: number } {
        const max = AvatarStyleCount[part as keyof typeof AvatarStyleCount];
        return max !== undefined ? { min: 0, max } : { min: 0, max: 0 };
    }

    public async convertToImage(dom: HTMLElement): Promise<string> {

        const canvas = await html2canvas(dom, {
            logging: false,
            scale: window.devicePixelRatio,
            width: dom.offsetWidth,
            height: dom.offsetHeight,
        });
        return canvas.toDataURL('image/png');
    }


    public setPart(part: keyof AvatarConfig, style: number): AvatarBuilder {
        if (Object.keys(AvatarStyleCount).includes(part)) {
            this.config[part] = style;
        } else {
            console.warn(`Invalid part: ${part}`);
        }
        return this;
    }
    public setFace(style: number): AvatarBuilder {
        return this.setPart('face', style);
    }
    public setNose(style: number): AvatarBuilder {
        return this.setPart('nose', style);
    }
    public setMouth(style: number): AvatarBuilder {
        return this.setPart('mouth', style);
    }
    public setEyes(style: number): AvatarBuilder {
        return this.setPart('eyes', style);
    }
    public setEyebrows(style: number): AvatarBuilder {
        return this.setPart('eyebrows', style);
    }
    public setBeard(style: number): AvatarBuilder {
        return this.setPart('beard', style);
    }
    public setDetails(style: number): AvatarBuilder {
        return this.setPart('details', style);
    }
    public setHair(style: number): AvatarBuilder {
        return this.setPart('hair', style);
    }
    public setGlasses(style: number): AvatarBuilder {
        return this.setPart('glasses', style);
    }
    public setAccessories(style: number): AvatarBuilder {
        return this.setPart('accessories', style);
    }

}
export { AvatarBuilder };
