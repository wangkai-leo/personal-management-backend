import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminLoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('[common/adminlogin] middelware running');
    if (req.cookies.park_admin_user) {
      next();
    } else {
      res.json({
        code: 205,
        msg: 'admin login middleware 没有登陆',
      });
    }
  }
}
