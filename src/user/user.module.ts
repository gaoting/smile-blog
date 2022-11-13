
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
