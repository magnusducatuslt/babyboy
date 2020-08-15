import { Router } from "express";
import { telegramController } from "./telegram.route";

const telegramRouter = Router();

telegramRouter.post("/", telegramController);

export { telegramRouter };
