import { Log4jsConfig } from "./log4js.config";
import { Injectable, Logger } from "@nestjs/common";
import * as log4js from "log4js";
import { NextFunction } from "express";

@Injectable()
export class Log4jsService {
  public constructor(private readonly config: Log4jsConfig) {
    this.init();
  }

  private init(): void {
    try {
      log4js.configure({
        appenders: {
          ruleFile: {
            type: "dateFile",
            alwaysIncludePattern: true,
            filename: this.config.filename || "logs/http",
            pattern: this.config.fileNameSuffixPattern || "yyyy-mm-dd.log",
            numBackups: this.config.numBackups || 90,
          },
          ruleConsole: { type: "stdout" },
        },
        categories: {
          default: { appenders: ["ruleFile"], level: "info" },
          error: { appenders: ["ruleFile", "ruleConsole"], level: "error" },
        },
      });
      Logger.log("Initialize success!");
    } catch (err) {
      Logger.error("Initialize fail!", err);
    }
  }

  // 格式化log并写入文件，一般在中间件中调用
  public useLogger(req: Request, res: Response, next: NextFunction) {
    log4js.connectLogger(log4js.getLogger(), {
      level: "info",
    })(req, res, next);
  }

  public logError(message: any): void {
    log4js.getLogger("error").error(message);
  }
}
