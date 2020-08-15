import { Router } from "express";
import { addressController } from "./address.route";

const addressRouter = Router();

// addressRouter.post("/save", addressController);
addressRouter.use("/*/tg_passport=success", addressController);

export { addressRouter };
