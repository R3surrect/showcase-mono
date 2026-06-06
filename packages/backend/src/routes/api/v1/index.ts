import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import { authMiddleware } from "#/middleware/auth.js";
import templatesRouter from "./templates/index.js";

const v1Router = new Hono();

const routes = v1Router
    .route("/auth", registerRouter)
    .route("/auth", loginRouter)
    .use('/*', authMiddleware)
    .route('/templates', templatesRouter);

export default v1Router;

export type AppRouterV1 = typeof routes;