import { Hono } from "hono";
import registerRouter from "./auth/register/register.js";
import loginRouter from "./auth/login/login.js";
import { authMiddleware } from "#/middleware/auth.js";
import templatesRouter from "./templates/index.js";
import meRouter from "./auth/me/me.js";
import logoutRouter from "./auth/logout/logout.js";
import projectsRouter from "./projects/projects.js";
import tagsRouter from "./templates/tags/tags.js";
import { categoriesRouter } from "./tags/categories.js";
import { prioritiesRouter } from "./tags/priorities.js";
import { statusesRouter } from "./tags/statuses.js";

const v1Router = new Hono();

v1Router.use('/templates/*', authMiddleware);
v1Router.use('/projects/*', authMiddleware);
v1Router.use('/tags/*', authMiddleware);
v1Router.use('/priorities/*', authMiddleware);
v1Router.use('/statuses/*', authMiddleware);

export const appRouterV1 = v1Router
    .route("/auth", registerRouter)
    .route("/auth", loginRouter)
    .route("/auth", meRouter)
    .route("/auth", logoutRouter)
    .route('/templates', templatesRouter)
    .route('/projects', projectsRouter)
    .route('/tags', tagsRouter)
    .route('/tags', categoriesRouter)
    .route('/statuses', statusesRouter)
    .route('/priorities', prioritiesRouter)

export type AppRouterV1 = typeof appRouterV1;
export default v1Router;