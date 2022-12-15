import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { EntityQuestion } from "./dto/question.entity";
import { EntityTask } from '../task/dto/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityQuestion,EntityTask])],
  exports: [QuestionService],
  providers: [QuestionService],
  controllers: [QuestionController],
})

export class QuestionModule { };