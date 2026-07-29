import { colorSchema } from "#/shared/validations/customizable.validation.js";
import { z } from "zod";

export const TAG_TYPES = [
    'custom',
    'project_status',
    'task_status',
    'priority',
    'tag_type',
] as const;

export const tagTypeSchema = z.enum(TAG_TYPES, { error: 'Tag type mismatch' });
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

export interface TagTypeConfig {
    label: string;
    color: { h: number; s: number; l: number };
    icon: string;
}

export const TAG_TYPE_CONFIGS: Record<string, TagTypeConfig> = {
    custom: {
        label: 'Custom Tag',
        color: { h: 207, s: 20, l: 50 },
        icon: 'user',
    },
    project_status: {
        label: 'Project Status',
        color: { h: 35, s: 39, l: 53 },
        icon: 'briefcase',
    },
    task_status: {
        label: 'Task Status',
        color: { h: 207, s: 20, l: 50 },
        icon: 'square-check',
    },
    priority: {
        label: 'Priority Level',
        color: { h: 11, s: 35, l: 47 },
        icon: 'arrow-up-circle',
    },
    tag_type: {
        label: 'Tag Type',
        color: { h: 275, s: 25, l: 52 },
        icon: 'tags',
    },
};

export type TagType = z.infer<typeof tagTypeSchema>;