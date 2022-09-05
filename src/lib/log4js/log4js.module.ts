import { DynamicModule, Global, Module } from '@nestjs/common';

import { log4jsProvider } from './log4js.provider';
import { Log4jsConfig } from './log4js.config';
import { LOG4JS_CONFIG } from './log4js.constants';

@Module({
  providers: [log4jsProvider],
  exports: [log4jsProvider]
})
@Global()
export class Log4jsModule {
  public static widhConfig(config:Log4jsConfig): DynamicModule{
    const providers = [{provide:LOG4JS_CONFIG, useValue: config}]
    return {
      module: Log4jsModule,
      providers: providers,
      exports: providers
    }
  }
}
