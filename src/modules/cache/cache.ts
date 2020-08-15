import { createClient } from "redis";
import { config } from "@core/config";

export const cacheInit = ({ host, port }: { host?: string; port?: number }) =>
  createClient({
    host: host || config.redis.domain,
    port: port || config.redis.port,
  });
