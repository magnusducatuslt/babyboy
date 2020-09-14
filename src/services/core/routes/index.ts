import express from "express";
import { notFoundController } from "./notfound";
import { healthController } from "./health";
import { registrationRouter } from "./registration";
import { addressRouter } from "./address";
import { candidateRouter } from "./candidates";
import { votedRouter } from "./voted";
import { userRouter } from "./user";

// Server state check

const routes = express.Router();

routes.use("/registration", registrationRouter);
routes.use("/address", addressRouter);
routes.use("/candidates", candidateRouter);
routes.get("/health", healthController);
routes.use("/voted", votedRouter);
routes.use("/user", userRouter);

const router = express.Router();
// API routes
router.use(`/`, routes);

// Not found routes
router.use("*", notFoundController);

export { router as routes };
