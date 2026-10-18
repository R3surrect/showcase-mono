import z from 'zod';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

dotenv.config({
    path: [
        path.join(root, './packages/backend/.env.local'),
        path.join(root, './packages/backend/.env.production'),
        path.join(root, './packages/database/.env.local'),
        path.join(root, './packages/database/.env.production'),
    ],
});

export const envSchema = z.object({
    PORT: z.string().transform(Number).default(8080),
    PGDATABASE: z.string().default('test_db'),
    PGUSER: z.string().default('postgres'),
    PGPASSWORD: z.string().default('postgres'),
    PGPORT: z.coerce
        .number()
        .int({ message: "Port value must me number" })
        .min(0, { message: "Min: 0" })
        .max(65535, { message: "Max: 65535" }),
    PGHOST: z.string().default('localhost'),
    JWT_SECRET: z.string().default('test_jwt_secret'),
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
        PGHOST: env.PGHOST,
        PGPORT: env.PGPORT
    },
    jwtSecret: env.JWT_SECRET,
    allowedOrigins: env.ALLOWED_ORIGINS,
    isProduction: env.NODE_ENV === 'production',
} as const;