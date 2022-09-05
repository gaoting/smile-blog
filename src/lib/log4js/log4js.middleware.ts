import { Injectable, NestMiddleware, Inject } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { LOG4JS_PROVIDER } from "./log4js.constants";
import { Log4jsService } from "./log4js.service";

@Injectable()
export class Log4jsMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOG4JS_PROVIDER)
    private readonly log4js: Log4jsService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // this.log4js.useLogger(req, res, next);
    next()
  }
}
