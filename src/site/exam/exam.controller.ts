import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { ExamAnswerJson, SetScoreDto, TestIdDto } from './dto/exam.dto';
import { ExamService } from './exam.service';



@Controller('exam')
export class ExamController{
  constructor(private readonly examService:ExamService){

  }

  @Post('add')
  async addExam(
    @Body(ValidationPipe) examAnswerJson:ExamAnswerJson,
    @Session() session:Record<string, any>
  ){
    return await this.examService.addExam(examAnswerJson,session.park_user)
  }

  @Post('recode')
  async getRecode(
    @Session() session:Record<string, any>
  ){
    return await this.examService.getExamRecode(session.park_user);
  }

  @Post('info')
  async getExamByTestId(
    @Body(ValidationPipe) testIdDto:TestIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.examService.getExamByTestId(testIdDto,session.park_user)
  }

  @Post('setscore')
  async updateScore(
    @Body(ValidationPipe) setScoreDto:SetScoreDto,
    @Session() session:Record<string, any>
  ){
    return await this.examService.setScore(setScoreDto,session.park_user)
  }
}