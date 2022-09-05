import { Log4jsService } from "./log4js.service";
import { Log4jsConfig } from "./log4js.config";
import { Provider } from "@nestjs/common";

import { LOG4JS_PROVIDER, LOG4JS_CONFIG } from "./log4js.constants";

export const log4jsProvider: Provider = {
  provide: LOG4JS_PROVIDER,
  useFactory: (config: Log4jsConfig): Log4jsService => {
    return new Log4jsService(config);
  },
  inject: [{ token: LOG4JS_CONFIG, optional: true }],
};
