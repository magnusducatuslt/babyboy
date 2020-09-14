import express, { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { db } from "@core/db";
import { routes } from "./routes";
import { validationError, internalServerError } from "@core/utils";
import { logger } from "./utils/logger";
import { cacheClientCreate } from "@core/cache";
import { Telegraf } from "telegraf";
import { config } from "@core/config";
import { telegramController } from "./telegram";

const app = express();
const cacheInstance = cacheClientCreate({
  host: config.redis.domain,
  port: config.redis.port,
});
// Applying logging service
app.use(logger.middleware());

const bot = new Telegraf(config.telegram.botToken);
app.use(bot.webhookCallback(`/telegram`));
telegramController(db, logger.logger, bot, cacheInstance);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  req.db = db;
  req.cache = cacheInstance;
  next();
});

app.use("*", (req, res, next) => {
  console.log(req.path);
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
