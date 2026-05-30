export function emojiToUnified(emoji: string): string {
    const isUnified = /^[0-9a-fA-F-]+$/.test(emoji);
    if (isUnified) return emoji;

    return Array.from(emoji)
        .map(char => {
            const codePoint = char.codePointAt(0);
            return codePoint !== undefined ? codePoint.toString(16) : '';
        })
        .filter(Boolean)
        .join('-');
}