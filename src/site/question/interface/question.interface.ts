import { CreateQustionDto, FilterQuestionDto, IdDto, RandomCount, TaskIdDto } from "../dto/question.dto";
import { EntityQuestion } from '../dto/question.entity';

export interface QuestionInterface{
  addQuestion:(createQustionDto:CreateQustionDto,user:any)=> void;
  getQuestionsByTaskId:(taskIdDto:TaskIdDto,user:any)=> void;
  deleteQuestion:(idDto:IdDto,user:any)=>void;
  updateQuestion:(entityQuestion:EntityQuestion,user:any)=> void;
  filterQuestion:(filterQuestionDto:FilterQuestionDto,user:any)=>void;
  getRandomQuestions:(randomCount:RandomCount,user:any)=>void;
}