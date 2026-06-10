import dotenv from 'dotenv';
import z, { boolean } from 'zod';

dotenv.config({ quiet: true });

export const envSchema = z.object({
    PORT: z.string().transform(Number).default(8080),
    DB_PORT: z.string().transform(Number).default(5173),
    DB_NAME: z.string().default('test_db'),
    DB_USER: z.string().default('postgres'),
    DB_PASSWORD: z.string().default('postgres'),
    JWT_SECRET: z.string().default('test_jwt'),
    ALLOWED_ORIGINS: z
        .string()
        .min(1, '.env ALLOWED_ORIGINS must not be null')
        .transform(str => str.split(',').map(item => item.trim()))
        .pipe(
            z.array(
                z.url({ error: 'One or ore origins isn\'t valid' })
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
        DB_NAME: env.DB_NAME,
        DB_USER: env.DB_USER,
        DB_PASSWORD: env.DB_PASSWORD,
    },
    jwtSecret: env.JWT_SECRET,
    allowedOrigins: env.ALLOWED_ORIGINS,
    nodeEnv: env.NODE_ENV === 'production',
} as const;