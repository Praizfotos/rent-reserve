import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
  code?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
    code: err.code,
  });
}
