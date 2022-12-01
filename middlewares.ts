/**
 *
 * !!!!!!!!!!!!!  IMPORTANT  !!!!!!!!!!!!!!!!!
 *
 * Please do not modify this file
 *
 */
import { NODE_ENV } from "./env";
import { NextFunction, Request, Response } from "express";

function notFound(req: Request, res: Response) {
  res.status(404);
  res.json({
    error: "The route is not defined",
  });
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === "production" ? "" : err.stack,
  });
}

export { notFound, errorHandler };
