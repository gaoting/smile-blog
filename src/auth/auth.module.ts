import { TypeOrmModule } from "@nestjs/typeorm";

import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { User } from "../user/user.entity";
import { jwtConstants } from "./constants";
import { Global, Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    // .register({ defaultStrategy: "jwt" })
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "30m" }, // token 过期时效
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule], // 因为auth模块需要导入到User模块，所以需要配置导出
})
export class AuthModule {}
