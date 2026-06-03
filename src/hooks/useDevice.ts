import { useSyncExternalStore } from "react";

type Devices = 'mobile' | 'tablet' | 'desktop';

let queries: Record<Devices, string> | null = null;

const getQueries = (): Record<Devices, string> => {
    if (queries) return queries;

    const root = window.getComputedStyle(document.documentElement);
    const mobileWidth = root.getPropertyValue('--mobile-width').trim();
    const desktopWidth = root.getPropertyValue('--desktop-width').trim();

    if (!mobileWidth || !desktopWidth)
        throw new Error(`[useDevice] error: CSS variables (--mobile-width or --desktop-width) are missing in :root.`);

    queries = {
        mobile: `(width < ${mobileWidth})`,
        tablet: `(${mobileWidth} <= width < ${desktopWidth})`,
        desktop: `(width >= ${desktopWidth})`,
    };

    return queries;
};

export const useDevice = (device: Devices): boolean => {
    const media = window.matchMedia(getQueries()[device]);

    return useSyncExternalStore(
        (cb) => {
            media.addEventListener('change', cb);
            return () => media.removeEventListener('change', cb);
        },
        () => media.matches
    );
};
