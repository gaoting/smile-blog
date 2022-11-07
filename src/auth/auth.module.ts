
import { TypeOrmModule } from "@nestjs/typeorm";

import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { User } from "../user/user.entity";
import { jwtConstants } from "./constants";
import { Global, Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { LocalStorage } from "./local.strategy";
import { JwtStorage } from "./jwt.strategy";

const jwtModule = JwtModule.registerAsync({
  useFactory: async () => {
    return {
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "24h" },
    };
  },
});
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule], // 因为auth模块需要导入到User模块，所以需要配置导出
})
export class AuthModule {}
