// config should be imported before importing any other file
import "module-alias/register";
import { config } from "@core/config";
import { app } from "../app";
import { logger as loggerInstace } from "../utils/logger";
import http from "http";

const port = config.core.port;
const logger = loggerInstace.logger;

app.set("port", port);

function onSignal(signal: string): void {
  logger.debug(`Signal on ${signal}`);
  switch (signal) {
    case "SIGINT":
      process.exit();
      break;
    case "SIGTERM":
      process.exit();
      break;
    case "SIGQUIT":
      process.exit();
      break;
    default:
      process.exit();
      break;
  }
}

function onError(error: any) {
  logger.error({ err: error });
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${port}` : `Port ${port}`;
  logger.debug(`Listening on ${bind}`);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

process.on("SIGINT", onSignal);
process.on("SIGTERM", onSignal);
process.on("SIGQUIT", onSignal);
