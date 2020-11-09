import { Router } from "express";
import pointRouter from "./point.router";
import clientRouter from "./client.router";
import itemsRouter from "./items.router";
import authRouter from "./auth.router";

const routes = Router();


routes.use('/auth', authRouter);
routes.use('/point', pointRouter);
routes.use('/client', clientRouter);
routes.use('/items', itemsRouter);

export default routes;