import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import z from 'zod';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

dotenv.config({
    path: [
        path.join(root, './packages/backend/.env.local'),
        path.join(root, './packages/backend/.env'),
        path.join(root, '.env.local'),
        path.join(root, '.env'),
    ],
});

export const envSchema = z.object({
    PORT: z.string().transform(Number).default(8080),
    PGPORT: z.string().transform(Number).default(5173),
    PGDATABASE: z.string().default('test_db'),
    PGUSER: z.string().default('postgres'),
    PGPASSWORD: z.string().default('postgres'),
    JWT_SECRET: z.string().default('test_jwt'),
    ALLOWED_ORIGINS: z
        .string()
        .min(1, '.env ALLOWED_ORIGINS must not be null')
        .transform(str => str.split(',').map(item => item.trim()))
        .pipe(
            z.array(
                z.url({ error: 'One or more origins isn\'t valid' })
            )
        ),
    NODE_ENV: z
        .string()
        .toLowerCase()
        .pipe(z.enum(['development', 'production']))
        .default('development')
});

export type EnvSchema = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    const { fieldErrors } = z.flattenError(parsedEnv.error);
    console.error("❌ Error while parsing dotenv data: ");
    console.dir(fieldErrors, { depth: null });
    process.exit(1);
}

const env = parsedEnv.data;

export const config = {
    port: env.PORT,
    db: {
        PGDATABASE: env.PGDATABASE,
        PGUSER: env.PGUSER,
        PGPASSWORD: env.PGPASSWORD,
    },
    jwtSecret: env.JWT_SECRET,
    allowedOrigins: env.ALLOWED_ORIGINS,
    isProduction: env.NODE_ENV === 'production',
} as const;