declare namespace Express {
  interface Request {
    log: import("bunyan");
    reqId: string;
    db: import("../src/db").DbType;
  }

  interface Response {
    log: import("bunyan");
  }
}
