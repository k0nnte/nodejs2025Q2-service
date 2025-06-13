import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import { LoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    this.logger.log(
      `Request... ${method} ${originalUrl} ${JSON.stringify(query)} body: ${JSON.stringify(body)}`,
    );
    const time = Date.now();
    res.on('finish', () => {
      const responseLog = `Response... ${res.statusCode} ${res.statusMessage} - ${Date.now() - time}ms`;
      this.logger.log(responseLog);
    });

    next();
  }
}
