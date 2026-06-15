export function emojiToUnified(emoji?: string): string {
    if (!emoji) return '';

    let cleanEmoji: string = emoji;

    if (cleanEmoji.includes('\\u')) {
        try {
            cleanEmoji = JSON.parse(`"${cleanEmoji}"`);
        } catch (e) {
            console.error(`emojiToUnified converting '${emoji}' error; skipping...`, e)
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

    if (parts.length === 1 && parseInt(parts[0], 16) < 0x1f000) {
        if (parts[0] !== 'fe0f') {
            parts.push('fe0f');
        }
    }

    return parts.join('-');
}
