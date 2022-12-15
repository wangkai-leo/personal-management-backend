import { Body, Controller, Get, HttpException, Post, Req, Res, Session } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';
import { EntityUser } from './dto/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Post('regist')
  async userRegist(
    @Body() entityUser: EntityUser
  ) {
    return await this.userService.registUser(entityUser);
  }

  @Post('login')
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>
  ) {
    const user=await this.userService.loginUser(userLoginDto);
    session.park_user=user;
    return user;
  }

  @Post('info')
  async userInfo(
    @Session() session: Record<string, any>
  ) {
    const login_user = session.park_user;
    if (login_user) {
      return login_user;
    } else {
      throw new HttpException({ message: 'Please Sign up！' }, 300)
    }
  }

  @Post('logout')
  async logOut(
    @Res() res: Response,
    @Req() req: Request,
    @Session() session: Record<string, any>
  ) {
    req.session.destroy(() => {
      res.json({
        code: 200
      })
    });
  }

  test() {
    return 'test';
  }
}
