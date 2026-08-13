import type { ZodIssue } from "zod"

export const zodToApiErrors = (errors: ZodIssue[]) => errors.map((error: ZodIssue) => ({
    field: error.path.join('.'),
    message: error.message
}))