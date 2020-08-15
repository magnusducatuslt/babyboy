import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { db } from "@core/db";
import { routes } from "./routes";
import { validationError, internalServerError } from "@core/utils";
import { logger } from "./utils/logger";

const app = express();

// Applying logging service
app.use(logger.middleware());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  req.db = db;
  next();
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// Parsing JSON request body
app.use(
  bodyParser.json({
    limit: 81920,
  })
);

// Handling express-validation errors
app.use(validationError);

// Handling express-validation errors
app.use(internalServerError);

// Registering routes
app.use(routes);

export { app };
