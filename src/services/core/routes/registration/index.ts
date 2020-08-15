import { Router } from "express";
import { registrationController } from "./registration.route";

const registrationRouter = Router();

registrationRouter.post("/", registrationController);

export { registrationRouter };
