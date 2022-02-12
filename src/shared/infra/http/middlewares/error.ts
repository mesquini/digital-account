import AppError from '@shared/utils/AppError';
import { CelebrateError, isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import log4js from 'log4js';

export default function error(
  err: AppError | CelebrateError,
  _: Request,
  res: Response,
  __: NextFunction,
): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message || 'Internal Server Error',
    });
  }

  if (isCelebrateError(err)) {
    return res.status(400).json({
      message: err.details.entries().next().value[1].message,
    });
  }

  log4js.getLogger('error').error(err);

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}
