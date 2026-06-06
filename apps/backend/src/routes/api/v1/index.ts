import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import { authMiddleware } from "#/middleware/auth.js";
import templatesRouter from "./templates/index.js";

const v1Router = new Hono();

v1Router.route("/auth", registerRouter);
v1Router.route("/auth", loginRouter);

v1Router.use('/*', authMiddleware);

v1Router.route('/templates', templatesRouter);
export default v1Router;

export type AppType = typeof v1Router;