import z from "zod";

// *-- Pick/Omit Objects
export const baseEntityFields = {
    id: true,
    createdAt: true,
    updatedAt: true,
} as const;

export const pinnableEntityFields = {
    isPinned: true,
    pinnedAt: true,
} as const;

export const archivableEntityFields = {
    isArchived: true,
} as const;

// *-- Zod mixins
export const hasTagsReferenceMixin = {
    tagIds: z.array(z.number().positive()).default([]),
};

export const hasProjectsReferenceMixin = {
    projectIds: z.array(z.number().positive()).default([]),
};