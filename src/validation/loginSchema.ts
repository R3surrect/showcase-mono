import { z as zod } from 'zod';

export const loginSchema = zod
  .object({
          email: zod
              .string()
              .min(1, 'Required field') 
              .pipe(zod.email({message: 'Invalid email'})),
          password: zod
              .string()
              .min(1, 'Required field')
    })

export type loginInput = zod.infer<typeof loginSchema>;
