import { Request, Response } from "express";

const now = new Date();

const tags = process.env.HEALTH_TAGS;
const date = `${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;

export function healthController(req: Request, res: Response) {
  res.json({
    status: "OK",
    tags,
    date,
  });
}
