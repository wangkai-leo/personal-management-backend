import { ExamAnswerJson, SetScoreDto, TestIdDto } from "../dto/exam.dto";
import { EntityExam } from "../dto/exam.entity";

export interface ExamInterface{
  addExam:(examAnswerJson: ExamAnswerJson,user:any) => void;
  getExamByTestId:(testIdDto:TestIdDto,user:any) => void;
  getExamRecode:(user:any)=>void;
  setScore:(setScoreDto:SetScoreDto,user:any)=>void;
}