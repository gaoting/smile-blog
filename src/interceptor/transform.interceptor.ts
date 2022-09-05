import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
// import { Log4jsService } from "../lib/log4js/log4js.service";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  // public constructor(private readonly log4js: Log4jsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
