import { Router } from "express";
import ClientController from "../controller/ClientController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const clientRouter = Router();

clientRouter.post('/',[checkJwt,checkRole(['CLIENT'])], ClientController.create);

clientRouter.get('/', ClientController.listAll);

clientRouter.get('/:name', ClientController.listOne);

clientRouter.put('/update', ClientController.update);

clientRouter.delete('/delete', ClientController.delete);

export default clientRouter;