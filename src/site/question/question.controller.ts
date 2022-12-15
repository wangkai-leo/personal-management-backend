import { Body, Controller, Module, Post, Res, Session, ValidationPipe } from "@nestjs/common";
import { CreateQustionDto, FilterQuestionDto, IdDto, RandomCount, TaskIdDto } from "./dto/question.dto";
import {QuestionService} from "./question.service";
import { EntityQuestion } from "./dto/question.entity";

@Controller('ques')
export class QuestionController{
  constructor(
    private questionService:QuestionService,
  ){}
  
  @Post('add')
  async addQuestionList(
    @Body(ValidationPipe) createQustionDto:CreateQustionDto,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.addQuestion(createQustionDto,session.park_user)
  }

  @Post('listbytask')
  async getQuestionListByTaskId(
    @Body(ValidationPipe) taskIdDto:TaskIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.getQuestionsByTaskId(taskIdDto,session.park_user)
  }

  @Post('update')
  async updateQuestion(
    @Body(ValidationPipe) entityQuestion:EntityQuestion,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.updateQuestion(entityQuestion,session.park_user)
  }

  @Post('delete')
  async deleteQuestion(
    @Body(ValidationPipe) idDto:IdDto,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.deleteQuestion(idDto,session.park_user)
  }

  @Post('filter')
  async filterQuestion(
    @Body(ValidationPipe) filterQuestionDto:FilterQuestionDto,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.filterQuestion(filterQuestionDto,session.park_user)
  }

  @Post('random')
  async getRandomQuestion(
    @Body(ValidationPipe) randomCount:RandomCount,
    @Session() session:Record<string, any>
  ){
    return await this.questionService.getRandomQuestions(randomCount,session.park_user)
  }
}