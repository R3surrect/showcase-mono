import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";

const v1Router = new Hono();

v1Router.route("/auth", registerRouter);
v1Router.route("/auth", loginRouter);

export default v1Router;