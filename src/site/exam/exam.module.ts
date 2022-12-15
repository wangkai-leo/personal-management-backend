import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { EntityExam } from './dto/exam.entity';
import { QuestionModule } from '../question/question.module';



@Module({
  imports:[
    TypeOrmModule.forFeature([ EntityExam ]),
    QuestionModule
  ],
  exports:[ExamService],
  providers:[ExamService],
  controllers:[ExamController],
})

export class ExamModule{};