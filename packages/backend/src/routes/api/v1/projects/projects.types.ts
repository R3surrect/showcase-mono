import type z from "zod";
import type { projectSchema } from "./projects.schema.js";
import type {
    projectCreateOutputSchema,
    projectCreateDbInputValidation,
    projectCreateInputValidation
} from "./validations/project.create.js";
import type { projectUpdateValidation } from "./validations/project.update.js";
import type { projectDeleteValidation } from "./validations/project.delete.js";

//* GENERAL

export type Project = z.infer<typeof projectSchema>;
export type ProjectId = Project['id'];
export type ProjectOwnerId = Project['ownerId'];

//* INPUT

export type ProjectDbCreateInput = z.infer<typeof projectCreateDbInputValidation>
export type ProjectCreateInput = z.infer<typeof projectCreateInputValidation>
export type ProjectUpdateInput = z.infer<typeof projectUpdateValidation>
export type ProjectDeleteInput = z.infer<typeof projectDeleteValidation>

//* OUTPUT

export type ProjectGetOutput = Omit<Project, 'ownerId' | 'updatedAt'>
export type ProjectCreateOutput = z.infer<typeof projectCreateOutputSchema>
export type ProjectUpdateOutput = ProjectCreateOutput;