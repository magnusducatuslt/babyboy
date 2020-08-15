import { Request, Response } from "express";
import { createFailResponse } from "@core/utils";

export function notFoundController(req: Request, res: Response) {
  return createFailResponse(req, res, 404, "Not Found");
}
