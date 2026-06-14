import z from "zod";

export const tagColorSchema = z.object({
    h: z.number().min(0, 'Min h: 0').max(360, 'Max h: 360'),
    s: z.number().min(0, 'Min s: 0').max(100, 'Max s: 100'),
    l: z.number().min(0, 'Min l: 0').max(100, 'Max l: 100')
}, 'Incorrect format')

export const hexEmojiRegular = /^[0-9a-fA-F-]+$/;

export const tagSchema = z.object({
    id: z.number(),

    label: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Tag label is too long')
        .trim(),

    color: z.preprocess((val) => {
        if (typeof val === 'string') {
            try { return JSON.parse(val) }
            catch { return val; }
        }
        return val;
    }, tagColorSchema),

    emoji: z
        .string()
        .trim()
        .optional()
        .refine(emoji => {
            if (emoji === undefined || emoji === '') return true;
            return hexEmojiRegular.test(emoji) || [...emoji].length === 1;
        }, 'Should be exactly 1 emoji'),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
})