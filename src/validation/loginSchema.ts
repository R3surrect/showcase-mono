import { z as zod } from 'zod';

export const loginSchema = zod
  .object({
          email: zod
              .string()
              .min(1, 'Required field') 
              .pipe(
                zod.
                email({message: 'Incorrect EMail format'})
            ),
          password: zod
              .string()
              .min(8, 'Password length must be at least 8 characters')
    })

export type loginInput = zod.infer<typeof loginSchema>;
