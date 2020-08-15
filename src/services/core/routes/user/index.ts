import { Router } from "express";
import { userController } from "./user.route";

const userRouter = Router();

userRouter.get("/:id", userController);

export { userRouter };
