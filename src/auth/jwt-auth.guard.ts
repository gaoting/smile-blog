import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  // getRequest(context: ExecutionContext) {
  //   const ctx = context.switchToHttp();
  //   const request = ctx.getRequest();
  //   console.log("rrrrrrrrrrr111", request);
  //   return request;
  // }

  // handleRequest<User>(err, userName): User {
  //   console.log("rrrrrrrrrrr2222", err, userName);
  //   // if (err || !userName) {
  //   //   throw new UnauthorizedException("身份验证失败 ayay ");
  //   // }
  //   return userName;
  // }
}
