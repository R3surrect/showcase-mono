import type { HslColor } from "colord";
import type { ColorSet } from "./ColorList.types";

export const INITIAL_COLORS: ColorSet[] = [
    { id: 'clr-66a', color: { h: 66, s: 26, l: 35 } },
    { id: 'clr-11b', color: { h: 11, s: 35, l: 47 } },
    { id: 'clr-35c', color: { h: 35, s: 36, l: 53 } },
    { id: 'clr-207d', color: { h: 207, s: 10, l: 42 } },
    { id: 'clr-37e', color: { h: 37, s: 13, l: 56 } },
    { id: 'clr-34f', color: { h: 34, s: 39, l: 40 } },
    { id: 'clr-94g', color: { h: 94, s: 18, l: 25 } },
    { id: 'clr-300h', color: { h: 300, s: 11, l: 33 } },
    { id: 'clr-20i', color: { h: 20, s: 39, l: 65 } },
    { id: 'clr-205j', color: { h: 205, s: 15, l: 29 } },
    { id: 'clr-300k', color: { h: 300, s: 9, l: 60 } },
    { id: 'clr-175l', color: { h: 175, s: 11, l: 59 } },
    { id: 'clr-37m', color: { h: 37, s: 29, l: 57 } },
    { id: 'clr-11n', color: { h: 11, s: 26, l: 24 } },
    { id: 'clr-11o', color: { h: 11, s: 36, l: 35 } },
]

export const getLocalStorageColors = () => {
    try {
        return JSON.parse(localStorage.getItem('colorSet') || '[]');
    }
    catch (e) {
        console.log(e);
    }
}

export const getHslString = (hslObject: HslColor) => `hsl(${hslObject.h}, ${hslObject.s}%, ${hslObject.l}%)`