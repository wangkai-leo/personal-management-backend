import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
//middlewares
import { LoggerMiddleware } from './common/logger.middleware'; //Middleware Logger to do
import { UserLoginMiddleware } from './common/middlewares/user.login.middleware';
//Guards

//modules
import { UserModule } from './site/user/user.module'; //Development Module-用户
import { TaskModule } from './site/task/task.module'; //Development Module-任务
import { QuestionModule } from './site/question/question.module';
import { ExamModule } from './site/exam/exam.module';
import { WorkModule } from './site/work/work.module';
import { PlanningModule } from './site/planning/planning.module';
import { ScopeModule } from './site/scope/scope.module';
import { MaximModule } from './site/maxim/maxim.module';


import { PurposeModule } from './site/purpose/purpose.module';

//controller
import { TaskController } from './site/task/task.controller';
import { PlanningController } from './site/planning/planning.controller';
import { UserController } from './site/user/user.controller';
import { WorkController } from './site/work/work.controller';
import { QuestionController } from './site/question/question.controller';

//entitys
import { EntityExam } from './site/exam/dto/exam.entity';
import { EntityMaxim } from './site/maxim/dto/maxim.entity';
import { EntityPlanning } from './site/planning/dto/planning.entity';
import { EntityPurpose } from './site/purpose/dto/purpose.entity';
import { EntityQuestion } from './site/question/dto/question.entity';
import { DimScope } from './site/scope/dto/scope.entity';
import { EntityTask } from './site/task/dto/task.entity';
import { EntityUser } from './site/user/dto/user.entity'; 
import { EntityWork } from './site/work/dto/work.entity';
import { EntityFinance } from './site/finance/dto/finance.entity';
import { EntityCompany } from './site/company/dto/company.entity';
import { EntityEmployee } from './site/employee/dto/empoyee.entity';


/*************************************************************************** */
//middlewares
import { AdminLoginMiddleware } from './common/adminlogin.middleware'; //Middleware Login
//Guards
import { AdminRolesGuard } from 'src/common/adminroles.guard';

//Module

/*************************************************************************** */

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      // database: 'personnal',
      database: 'personnal_test',
      autoLoadEntities: true,
      entities: [
        EntityExam,
        EntityMaxim,
        EntityPlanning,
        EntityPurpose,
        EntityQuestion,
        DimScope,
        EntityTask,
        EntityUser,
        EntityWork,
        EntityFinance,
        EntityCompany,
        EntityEmployee
      ],
      synchronize: true,
    }),

    //site
    UserModule, //
    TaskModule,
    ScopeModule,
    PlanningModule,
    QuestionModule,
    MaximModule,
    ExamModule,
    WorkModule,

    // PurposeModule

    // //admin
    // AdminRoleModule,

    ScheduleModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AdminRolesGuard, //权限守卫
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {} //使用数据库
  //中间组件
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes(AdminRoleController);
    // consumer
    //   .apply(AdminLoginMiddleware)
    //   .exclude({ path: 'admin/login', method: RequestMethod.POST })
    //   .forRoutes(AdminRoleController);

    consumer
      .apply(UserLoginMiddleware)
      .forRoutes(TaskController,PlanningController,QuestionController,WorkController)
  }
}
