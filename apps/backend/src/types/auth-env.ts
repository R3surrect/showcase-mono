import type { JWTPayload } from 'hono/utils/jwt/types'
import type { User } from './user.js'

export type AuthEnv = {
    Variables: {
        user: User;
        jwtPayload?: JWTPayload & { email: string }
    }
};