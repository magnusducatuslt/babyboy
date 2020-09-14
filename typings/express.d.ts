declare namespace Express {
  interface Request {
    log: import("bunyan");
    reqId: string;
    db: import("../src/db").DbType;
    cache: import("../src/cache").CacheClientCreateType;
  }

  interface Response {
    log: import("bunyan");
  }
}
