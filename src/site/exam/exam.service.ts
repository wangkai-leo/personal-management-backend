import { Injectable, HttpException } from '@nestjs/common';
import { ExamInterface } from "./interface/exam.interface";
import { EntityExam } from './dto/exam.entity';
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionService } from '../question/question.service';
import { ExamAnswerJson, SetScoreDto, TestIdDto } from './dto/exam.dto';
import {randomString} from '../../leo.wang.core/common/operator.string';

@Injectable()
export class ExamService implements ExamInterface {
  constructor(
    @InjectRepository(EntityExam)
    private examRepository: Repository<EntityExam>,
    private dataSource: DataSource,
    private questionService: QuestionService
  ) {
    
  }
  async addExam(examAnswerJson: ExamAnswerJson,user:any){
    try {
      const answers=JSON.parse(examAnswerJson.exam_answer);

      const Exams=[];
      const test_id=randomString(12);
      for(let i=0;i<answers.length;i++){
        const exam=new EntityExam()
        exam.scope_type=answers[i].scopeId;
        exam.answer_context=answers[i].answer_context===undefined?'':answers[i].answer_context;
        exam.create_time=new Date();
        exam.test_id=test_id;
        exam.user=user;
        exam.question=answers[i].id;
        Exams.push(exam);
      }
      return await this.examRepository.save(Exams);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };
  
  async setScore(setScoreDto: SetScoreDto,user:any) {
    try {
      return await this.examRepository
      .update({ id: setScoreDto.id,user:user },{test_score:parseInt(setScoreDto.test_score)});
    } catch (error) {
      throw new HttpException(error,400);
    }
  };

  async getExamByTestId(testIdDto: TestIdDto,user:any) {
    try {
      return await this.examRepository.createQueryBuilder('exam')
      .leftJoinAndSelect('exam.question', 'question')
      .where(testIdDto)
      .getMany();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async getExamRecode(user:any) {
    try {
      // return await this.dataSource.query('SELECT DISTINCT test_id , create_time from exam_entity ORDER BY create_time DESC');
      return await this.examRepository.createQueryBuilder('exam')
      .leftJoin('exam.user','user')
      .select('exam.create_time as create_time,exam.test_id as test_id')
      .where('exam.user=:id',{id:user.id})
      .distinct() //distinct the data
      .getRawMany();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };
}