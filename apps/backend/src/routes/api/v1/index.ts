import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";

const v1Router = new Hono();

v1Router.route("/", registerRouter);

export default v1Router;