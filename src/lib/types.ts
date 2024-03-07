export interface AvatarConfig {
    face: number;
    nose: number;
    mouth: number;
    eyes: number;
    eyebrows: number;
    glasses: number;
    hair: number;
    accessories: number;
    details: number;
    beard: number;
}
export interface LoadedParts {
    path: string;
    svg: string | unknown;
}