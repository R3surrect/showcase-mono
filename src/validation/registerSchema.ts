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
              .min(8, 'Password length must be at least 8 characters')
              .regex(/[A-Z]/, 'Min 1 capital letter')
              .regex(/[a-z]/, 'Min 1 lower letter')
              .regex(/[0-9]/, 'Min 1 digit')
              .regex(/[^A-Za-z0-9]/, 'Special symbol required'),
          confirmPassword: zod.string().min(1, 'Confirm password')
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ['confirmPassword'],
    })

export type RegisterInput = zod.infer<typeof registerSchema>;

export type RegisterPayload = Omit<RegisterInput, 'confirmPassword'>;
