import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { Diary as diaryEntity } from './diary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryService } from './diary.service';
@Module({
    imports: [TypeOrmModule.forFeature([diaryEntity])],
    controllers: [DiaryController],
    providers: [DiaryService],
})
export class DiaryModule {}
