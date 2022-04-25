import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  RequestTimeoutException,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable, throwError, TimeoutError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
   
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: "请求成功",
        };
      })
    );
  }
}
