import type z from "zod";
import type { projectSchema } from "./projects.schema.js";
import type {
    projectDbUpdateValidation,
    projectUpdateOutputSchema,
    projectUpdateValidation
} from "./validations/project.update.js";
import type {
    projectDbDeleteValidation,
    projectDeleteValidation
} from "./validations/project.delete.js";
import type {
    projectCreateOutputSchema,
    projectCreateDbInputValidation,
    projectCreateInputValidation,
} from "./validations/project.create.js";

//* GENERAL
export type Project = z.infer<typeof projectSchema>;
export type ProjectId = Project['id'];
export type ProjectOwnerId = Project['ownerId'];

//* GET
export type ProjectGetOutput = Omit<Project, 'ownerId' | 'updatedAt'>;

//* CREATE
export type ProjectCreateInput = z.infer<typeof projectCreateInputValidation>;
export type ProjectDbCreateInput = z.infer<typeof projectCreateDbInputValidation>;
export type ProjectCreateOutput = z.infer<typeof projectCreateOutputSchema>;

//* UPDATE
export type ProjectUpdateInput = z.infer<typeof projectUpdateValidation>;
export type ProjectDbUpdateInput = z.infer<typeof projectDbUpdateValidation>;
export type ProjectUpdateOutput = z.infer<typeof projectUpdateOutputSchema>;

//* DELETE
export type ProjectDbDeleteInput = z.infer<typeof projectDbDeleteValidation>;
export type ProjectDeleteInput = z.infer<typeof projectDeleteValidation>;