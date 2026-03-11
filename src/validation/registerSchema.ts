
import { z as zod } from 'zod';

export const registerSchema = zod
  .object({
          email: zod
              .string()
              .min(1, 'Required field')
              .trim()
              .pipe(zod.email({message: 'Invalid email'})),
          password: zod
              .string()
              .min(8, 'Min 8 symbols required')
              .regex(/[A-Z]/, 'Min 1 capital letter')
              .regex(/[0-9]/, 'Min 1 digit')
              .regex(/[@$!%*?&]/, 'Special symbol required'),
          confirmPassword: zod.string().min(1, 'Confirm password')
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords are different!",
        path: ['confirmPassword'],
    })

export type RegisterInput = zod.infer<typeof registerSchema>;
