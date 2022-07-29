import { ExtractJwt, Strategy } from "passport-jwt";
import { LoginService } from "./login.service";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "./login.dto";
import { jwtConstants } from "./login.controller";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: CreateDto, done: Function) {
    const user = await this.loginService.validateUser(payload.userName);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}

export const callback = (err, user, info) => {
  let message;
  if (err) {
    //return (err || new UnauthorizedException(info.message));
    throw err;
  } else if (typeof info !== "undefined" || !user) {
    switch (info.message) {
      case "No auth token":
      case "invalid signature":
      case "jwt malformed":
      case "invalid token":
      case "invalid signature":
        message = "You must provide a valid authenticated access token";
        break;
      case "jwt expired":
        message = "Your session has expired";
        break;
      default:
        message = info.message;
        break;
    }
    throw new UnauthorizedException(message);
  }
  return user;
};
