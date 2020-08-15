import { Router } from "express";
import { candidatesController } from "./candidates.route";

const candidateRouter = Router();

candidateRouter.use("*", candidatesController);

export { candidateRouter };
