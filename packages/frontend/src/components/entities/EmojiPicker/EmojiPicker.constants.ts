export function emojiToUnified(emoji?: string): string {
    if (!emoji) return '';
    const isUnified = /^[0-9a-fA-F-]+$/.test(emoji);
    if (isUnified) return emoji;

    const parts = Array.from(emoji)
        .map(char => {
            const codePoint = char.codePointAt(0);
            return codePoint !== undefined ? codePoint.toString(16) : '';
        })
        .filter(Boolean);

    if (parts.length === 1 && parseInt(parts[0], 16) < 0x1F000 && parts[0] !== 'fe0f')
        parts.push('fe0f')

    return parts.join('-');
}