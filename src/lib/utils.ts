import type { AvatarConfig } from "$lib/types.js";
import { AvatarStyleCount } from "$lib/constant.js";
type SvgPath = {
    path: string;
    svg: string | unknown;
}

const updateSvgPath = (data: SvgPath) => {
    return { path: extractNumberFromPath(data.path), svg: data.svg, part: getPartName(data.path) }
}
export const getPartName = (path: string) => path.split('/').pop()?.split('-').shift();

function extractNumberFromPath(path: string) {
    const filename = path.split('/').pop();
    if (!filename) return 0;
    const number = filename.split('-').pop()?.split('.')[0];
    return Number(number);
}


const getRandomStyle = () => {
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


export { updateSvgPath, extractNumberFromPath, getRandomStyle }