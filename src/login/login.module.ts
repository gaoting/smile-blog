import { Module } from "@nestjs/common";
import { LoginController, jwtConstants } from "./login.controller";
import { LoginService } from "./login.service";
import { Login as LoginEntity } from "./login.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([LoginEntity]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
})
export class LoginModule {}
