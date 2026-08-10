import { colorSchema } from "#/shared/validations/customizable.validation.js";
import { z } from "zod";

export interface TagTypeConfig {
    type: string;
    id: string;
    label: string;
    color: { h: number; s: number; l: number };
    icon: string;
}

export const TAG_TYPE_CONFIGS: TagTypeConfig[] = [
    {
        type: 'default',
        id: 'ttc-2fcd10',
        label: 'Custom Tag',
        color: { h: 207, s: 20, l: 50 },
        icon: 'user',
    },
    {
        type: 'project_status',
        id: 'ttc-0b1d25',
        label: 'Project Status',
        color: { h: 35, s: 39, l: 53 },
        icon: 'briefcase',
    },
    {
        type: 'task_status',
        id: 'ttc-j85x3b',
        label: 'Task Status',
        color: { h: 207, s: 20, l: 50 },
        icon: 'square-check',
    },
    {
        type: 'priority',
        id: 'ttc-0wnv41',
        label: 'Priority Level',
        color: { h: 11, s: 35, l: 47 },
        icon: 'arrow-up-circle',
    },
];

export type TagType = z.infer<typeof tagTypeSchema>;
export const tagTypeSchema = z.enum(Object.keys(TAG_TYPE_CONFIGS), { error: 'Tag type mismatch' });

export const tagSchema = z.object({
    id: z.number().int().positive(),

    label: z
        .string()
        .min(1, 'Required field')
        .max(64, 'Tag label is too large')
        .trim(),

    color: colorSchema,
    type: tagTypeSchema,

    category: z
        .string()
        .min(1, 'Required field')
        .max(32, 'Tag category is too large')
        .trim(),

    ownerId: z.number().int().positive(),
    createdAt: z.date().or(z.iso.datetime()),
    updatedAt: z.date().or(z.iso.datetime()),
})