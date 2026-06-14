import z from "zod";

export const zodToApiErrors = (errors: z.core.$ZodIssue[]) => errors.map((error: z.core.$ZodIssue) => ({
    field: error.path.join('.'),
    message: error.message
}))