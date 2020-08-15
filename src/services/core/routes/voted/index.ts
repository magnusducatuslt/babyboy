import { Router } from "express";
import { votedController } from "./voted.route";

const votedRouter = Router();

votedRouter.post("/", votedController);

export { votedRouter };
