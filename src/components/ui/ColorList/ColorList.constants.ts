import type { ColorSet } from "./ColorList.types";

export const INITIAL_COLORS: ColorSet[] = [
    { id: 'clr-66a', color: 'hsl(66, 26%, 35%)' },
    { id: 'clr-11b', color: 'hsl(11, 35%, 47%)' },
    { id: 'clr-35c', color: 'hsl(35, 36%, 53%)' },
    { id: 'clr-207d', color: 'hsl(207, 10%, 42%)' },
    { id: 'clr-37e', color: 'hsl(37, 13%, 56%)' },
    { id: 'clr-34f', color: 'hsl(34, 39%, 40%)' },
    { id: 'clr-94g', color: 'hsl(94, 18%, 25%)' },
    { id: 'clr-300h', color: 'hsl(300, 11%, 33%)' },
    { id: 'clr-20i', color: 'hsl(20, 39%, 65%)' },
    { id: 'clr-205j', color: 'hsl(205, 15%, 29%)' },
    { id: 'clr-300k', color: 'hsl(300, 9%, 60%)' },
    { id: 'clr-175l', color: 'hsl(175, 11%, 59%)' },
    { id: 'clr-37m', color: 'hsl(37, 29%, 57%)' },
    { id: 'clr-11n', color: 'hsl(11, 26%, 24%)' },
    { id: 'clr-11o', color: 'hsl(11, 36%, 35%)' },
]

export const getLocalStorageColors = () => {
    try {
        return JSON.parse(localStorage.getItem('colorSet') || '[]');
    }
    catch (e) {
        console.log(e);
    }
}
