import { IsString, IsInt } from 'class-validator';



export class TestIdDto{
  @IsString()
  test_id:string;
}

export class SetScoreDto{
  @IsString()
  id:number;
  @IsString()
  test_score:string;
}

export class ExamAnswerJson{
  @IsString()
  exam_answer:string;
}