import { Response, Request } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log('[common/http-exception] get the request exception!!');
    const status = exception.getStatus();
    const msg = exception.getResponse();
    let error_msg = '';
    if (typeof msg == 'object' && msg['message']) {
      error_msg = msg['message'];
    }
    response.status(status).json({
      statusCode: status,
      message: 'something wrong with this :' + error_msg,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
