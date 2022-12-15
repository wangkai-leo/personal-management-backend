import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { EntityQuestion } from './dto/question.entity';
import { QuestionInterface } from './interface/question.interface';
import { CreateQustionDto, FilterQuestionDto, IdDto, RandomCount, TaskIdDto } from './dto/question.dto';
import { EntityTask } from '../task/dto/task.entity';

@Injectable()
export class QuestionService implements QuestionInterface {
  constructor(
    @InjectRepository(EntityQuestion)
    private readonly questionRepository: Repository<EntityQuestion>,
    @InjectRepository(EntityTask)
    private readonly taskRepository: Repository<EntityTask>,

  ) { }
  async getRandomQuestions(randomCount: RandomCount,user:any){
    try {
      return await this.questionRepository.query('select * from entity_question ORDER BY RAND() LIMIT '+randomCount.count);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async filterQuestion(filterQuestionDto: FilterQuestionDto,user:any){
    try {
      let query=this.questionRepository.createQueryBuilder('question')
      .leftJoin('question.user','user')
      .leftJoinAndSelect('question.task','task')
      .where('user.id=:id',{id:user.id});

      if(filterQuestionDto.sovle_status==1){
        return await query
        .andWhere('question.correct_answer=:correct_answer',{correct_answer:''})
        .getMany()
      }else if(filterQuestionDto.sovle_status==2){
        return await query
        .andWhere('question.correct_answer!=:correct_answer',{correct_answer:''})
        .getMany()
      }else{
        return await query
        .getMany()
      }
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async addQuestion(createQustionDto:any,user:any) {
    try {
        const task=await this.taskRepository.createQueryBuilder('task')
        .where({id:createQustionDto.task_id})
        .andWhere({is_complete:0})
        .getOne();

        if(!task){
          throw new HttpException({message:'任务不存在'}, 400);
        }else{
          createQustionDto.task=task;
        }
        createQustionDto.user=user;
        createQustionDto.create_time = new Date();
        return await this.questionRepository.save(createQustionDto);
        
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async deleteQuestion(idDto: IdDto,user:any){
    try {
      const quesiton=await this.questionRepository.createQueryBuilder('question')
      .leftJoin('question.user','user')
      .where('user.id='+user.id)
      .andWhere(idDto)
      .getOne()
      if(quesiton){
        return await this.questionRepository.remove(quesiton);
      }else{
        throw new HttpException({message:'没有该问题'}, 400);
      }
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };
  
  async updateQuestion(entityQuestion:EntityQuestion, user:any){
    try {
      const count=await this.questionRepository.createQueryBuilder('question')
      .leftJoin('question.user','user')
      .where({id:entityQuestion.id})
      .andWhere('user.id='+user.id)
      .getCount()
      if(count){
        return await this.questionRepository.update({id:entityQuestion.id},{
          title:entityQuestion.title,
          correct_answer:entityQuestion.correct_answer,
          for_exam:entityQuestion.for_exam,
        })
      }else{
        throw new HttpException({message:'没有该问题'}, 400);
      }
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async getQuestionsByTaskId(taskIdDto: TaskIdDto, user:any) {
    try {
      return await this.questionRepository.createQueryBuilder('questions')
        .leftJoin('questions.task', 'task')
        .leftJoin('questions.user','user')
        .andWhere('task.id='+taskIdDto.task_id)
        .andWhere('user.id='+user.id)
        .getMany()
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };
  
}; 