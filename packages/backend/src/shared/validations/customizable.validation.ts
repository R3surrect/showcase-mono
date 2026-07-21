import z from "zod";
import { hexEmojiRegular } from "../constants.js";

const baseColorSchema = z.object({
    h: z.number().min(0, 'Min h: 0').max(360, 'Max h: 360'),
    s: z.number().min(0, 'Min s: 0').max(100, 'Max s: 100'),
    l: z.number().min(0, 'Min l: 0').max(100, 'Max l: 100')
}, { message: 'Incorrect format' });

export const colorSchema = z.any().transform((val, ctx) => {
    if (typeof val === 'string') {
        try {
            return JSON.parse(val);
        } catch {
            return val;
        }
    }
    return val;
}).pipe(baseColorSchema);

export const emojiSchema = z
    .string()
    .trim()
    .nullable()
    .refine(emoji => {
        if (emoji === '' || emoji === null) return true;
        return hexEmojiRegular.test(emoji) || [...emoji].length === 1;
    }, 'Should be exactly 1 emoji')

export type ColorSchema = z.infer<typeof colorSchema>;