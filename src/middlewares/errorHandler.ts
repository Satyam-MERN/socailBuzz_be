import { NextFunction, Request, Response } from "express";
import logger from "../utilities/winstonLogger";
import { ValidationError } from "class-validator";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err.httpCode &&
    err.errors instanceof ValidationError
  ) {
    logger.error("Validation Error", err.errors[0].constraints);
    return res.status(422).json({
      status: "error",
      message: err.errors[0].constraints,
    });
  }
  let statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  let message = err.message || "Internal Server Error";
  // Log the error
  logger.error(`${message} - ${err.stack}`);

  // Send error response to client
  res.status(statusCode).json({
    status: "error",
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in development
    data:null
  });
};
