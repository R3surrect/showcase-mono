import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import { authMiddleware } from "#/middleware/auth.js";
import templatesRouter from "./templates/index.js";
import meRouter from "./auth/me/me.js";

const v1Router = new Hono();

v1Router.use('/templates/*', authMiddleware);

export const appRouterV1 = v1Router
    .route("/auth", registerRouter)
    .route("/auth", loginRouter)
    .route("/auth", meRouter)
    .route('/templates', templatesRouter);

export type AppRouterV1 = typeof appRouterV1;
export default v1Router;