import { Hono } from "hono";
import { authMiddleware } from "#/middleware/auth.js";
import tagsRouter from "./tags/tags.js";

const templatesRouter = new Hono();

templatesRouter.route("/tags", tagsRouter);

export default templatesRouter;