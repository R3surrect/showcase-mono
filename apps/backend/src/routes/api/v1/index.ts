import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import { authMiddleware } from "#/middleware/auth.js";

const v1Router = new Hono();

v1Router.route("/auth", registerRouter);
v1Router.route("/auth", loginRouter);

v1Router.use('/*', authMiddleware)

export default v1Router;