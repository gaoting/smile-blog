import { User } from './../user/user.entity';
import { UserModule } from './../user/user.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageBoardController } from "./messageboard.controller";
import { MessageBoardService } from "./messageboard.service";
import { MessageBoard as MessageBoard } from "./messageboard.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MessageBoard,User]), UserModule],
  controllers: [MessageBoardController],
  providers: [MessageBoardService],
})
export class MessageBoardModule {}
