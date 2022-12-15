import { UserIdDto } from 'src/site/user/dto/user.dto';
import { ParentTaskIdDto, TaskDateDto, TaskFilterDto, TaskIdDto, TreeTaskFilterDto } from '../dto/task.dto';
import { EntityTask } from '../dto/task.entity';
export interface TaskInterface {
  addTask:(entityTask:EntityTask,user:any)=>void; //add a new task
  updateTask:(entityTask: EntityTask,user:any)=>void; //update task information
  getTaskInfoById:(taskIdDto:TaskIdDto,user:any)=>void; //get task information by id
  completeTask:(taskIdDto:TaskIdDto,user:any)=>void; //complete task by id
  deleteTaskById:(taskIdDto:TaskIdDto,user:any)=>void; //delete task by id
  getTaskList:(taskFilterDto:TaskFilterDto,user:any)=>void;
  getTreeTasks:(treeTaskFilterDto:TreeTaskFilterDto,user:any)=>void; //get tree model tasks
}
