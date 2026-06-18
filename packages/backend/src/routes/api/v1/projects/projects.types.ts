import type z from "zod";
import type { projectSchema } from "./projects.schema.js";
import type { projectCreateClientPayloadSchema, projectCreateValidation } from "./validations/project.create.js";
import type { projectUpdateValidation } from "./validations/project.update.js";
import type { projectDeleteValidation } from "./validations/project.delete.js";

export type Project = z.infer<typeof projectSchema>;
export type ProjectCreateInput = z.infer<typeof projectCreateValidation>
export type ProjectUpdateInput = z.infer<typeof projectUpdateValidation>
export type ProjectDeleteInput = z.infer<typeof projectDeleteValidation>

export type ProjectId = Project['id'];
export type ProjectOwnerId = Project['ownerId'];

export type ProjectCreateClientPayload = z.infer<typeof projectCreateClientPayloadSchema>

export type ProjectGetClientPayload = Omit<Project, 'ownerId' | 'updatedAt'>