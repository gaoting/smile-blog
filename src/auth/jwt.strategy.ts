import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { StrategyOptions, Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "./../user/user.entity";
import { jwtConstants } from "./constants";

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    const info = payload.info;

    // const userInfo = crypto.AES.decrypt(info, 'salt').toString(crypto.enc.Utf8);

    // console.log(JSON.parse(userInfo));
    return {
      info,
    };
  }
}
