import { useSyncExternalStore } from "react";

type Devices = 'mobile' | 'tablet' | 'desktop';

const getCSSVariable = (varName: string): string => {
    if (typeof window === 'undefined') {
        throw new Error(
            `[useDevice] Runtime Error: getCSSVariable('${varName}') was called in a non-browser environment. ` +
            `This hook can only be executed on the client side.`,
            { cause: 'SSR_OR_NODE_ENVIRONMENT' }
        );
    }

    const value = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

    if (!value) {
        throw new Error(
            `[useDevice] CSS Variable Error: The variable "${varName}" is missing or empty in your CSS (:root).`,
            { cause: 'MISSING_CSS_VARIABLE' }
        );
    }

    return value;
};

export const useDevice = (device: Devices) => {
    return useSyncExternalStore(
        (cb) => {
            const mobileWidth = getCSSVariable('--mobile-width');
            const desktopWidth = getCSSVariable('--desktop-width');
            const queries: Record<Devices, string> = {
                mobile: `(width < ${mobileWidth})`,
                tablet: `(${mobileWidth} <= width < ${desktopWidth})`,
                desktop: `(width >= ${desktopWidth})`,
            };

            const media = window.matchMedia(queries[device]);
            media.addEventListener('change', cb);
            return () => media.removeEventListener('change', cb);
        },

        () => {
            const mobileWidth = getCSSVariable('--mobile-width');
            const desktopWidth = getCSSVariable('--desktop-width');
            const queries: Record<Devices, string> = {
                mobile: `(width < ${mobileWidth})`,
                tablet: `(${mobileWidth} <= width < ${desktopWidth})`,
                desktop: `(width >= ${desktopWidth})`,
            };
            return window.matchMedia(queries[device]).matches;
        },

        () => {
            throw new Error(
                `[useDevice] Error: Execution of this responsiveness hook is strictly prohibited on the server side. ` +
                `Ensure this component renders only on the client.`,
                { cause: 'SERVER_SIDE_EXECUTION_PROHIBITED' }
            );
        }
    );
};