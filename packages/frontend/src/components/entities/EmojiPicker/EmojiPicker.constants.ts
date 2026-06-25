export const emojiToUnified = (emoji?: string): string => {
    if (!emoji) return '';

    let cleanEmoji: string = emoji;

    if (cleanEmoji.includes('\\u')) {
        try {
            cleanEmoji = JSON.parse(`"${cleanEmoji}"`);
        } catch (e) {
            console.error(e);
        }
    }

    const isUnified = /^[0-9a-fA-F-]+$/.test(cleanEmoji);
    if (isUnified) return cleanEmoji.toLowerCase();

    const parts = Array.from(cleanEmoji)
        .map(char => {
            const codePoint = char.codePointAt(0);
            return codePoint !== undefined ? codePoint.toString(16).toLowerCase() : '';
        })
        .filter(Boolean);

    if (parts.length === 1) {
        const hex = parseInt(parts[0], 16);

        const needsFe0f =
            (hex >= 0x2000 && hex <= 0x27af) ||
            (hex >= 0x3000 && hex <= 0x3300) ||
            (hex >= 0x0020 && hex <= 0x007f);

        if (needsFe0f && parts[0] !== 'fe0f') {
            parts.push('fe0f');
        }
    }

    if (parts.length > 1 && parts[parts.length - 1] === 'fe0f') {
        const hex = parseInt(parts[0], 16);
        if (hex >= 0x27b0 && hex <= 0x27bf) {
            parts.pop();
        }
    }

    return parts.join('-');
}

export const unifiedToEmoji = (unified: string): string => {
    if (!unified) return '';

    return unified
        .split('-')
        .map(hex => parseInt(hex, 16))
        .map(codePoint => String.fromCodePoint(codePoint))
        .join('');
}