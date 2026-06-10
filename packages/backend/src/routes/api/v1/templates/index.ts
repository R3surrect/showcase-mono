import { Hono } from "hono";
import tagsRouter from "./tags/tags.js";

const templatesRouter = new Hono()
    .route("/tags", tagsRouter);

export default templatesRouter;