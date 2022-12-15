import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import fastifyCookie from '@fastify/cookie';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/logging.interceptor';
import * as session from 'express-session';
import { TransformInterceptor } from './common/interceptors/response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//cross-origin
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // forbidUnknownValues: true,
      enableDebugMessages: true,
    }),
  );
  app.use(cookieParser());
  // app.useLogger(new MyLogger());
  app.use(
    session({
      secret: 'leo.wang',
      cookie:{
        maxAge:1000*60*30, //30分钟
        secure:false
      },
      //session 有操作顺延
      rolling:true,
      resave:true,
      saveUninitialized:false
    }),
  );
  await app.listen(3000);
}

bootstrap();
