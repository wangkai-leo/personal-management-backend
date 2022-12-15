import { NestMiddleware, HttpException } from '@nestjs/common';

export class UserLoginMiddleware implements NestMiddleware{
  use(req: any, res: any, next: (error?: any) => void) {
    console.log('***********')
    console.log(req.session)
    if(req.session.park_user){
      next();
    }else{
      //invalidate user throw a exception
      throw new HttpException({message:'Please sign up'},300)
    }
  }
}