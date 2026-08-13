import { z } from 'zod';

export const isValidTimeZone = (tz: string) => {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch { return false }
};

export const timezoneSchema = z
    .string()
    .refine(
        isValidTimeZone, {
        message: 'Incorrect IANA (expecting format: "Europe/Moscow")',
    });

export const registerSchema = z
    .object({
        email: z
            .string()
            .min(1, 'Required field')
            .trim()
            .pipe(z.email({ message: 'Invalid email' })),
        password: z
            .string()
            .min(8, 'Password length must be at least 8 characters')
            .regex(/[A-Z]/, 'Min 1 capital letter')
            .regex(/[a-z]/, 'Min 1 lower letter')
            .regex(/[0-9]/, 'Min 1 digit')
            .regex(/[^A-Za-z0-9]/, 'Special symbol required'),
        timezone: timezoneSchema,
        confirmPassword: z
            .string()
            .min(1, 'Confirm password')
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match!",
        path: ['confirmPassword'],
    })

export type RegisterInput = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterInput, 'confirmPassword'>;
