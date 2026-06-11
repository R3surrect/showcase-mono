import { z } from "zod";

export const tagCreateValidation = z.object({
    label: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Tag label is too long')
        .trim(),
    color: z.object({
        h: z.number().min(0, 'Min h: 0').max(360, 'Max h: 360'),
        s: z.number().min(0, 'Min s: 0').max(100, 'Max s: 100'),
        l: z.number().min(0, 'Min l: 0').max(100, 'Max l: 100')
    }, 'Incorrect format'),
    emoji: z
        .string()
        .trim()

        .refine(emoji =>
            emoji === undefined
            || [...emoji].length === 1,
            // * [...emoji] is graphemes dividing
            'Should be exactly 1 emoji'
        ),

})