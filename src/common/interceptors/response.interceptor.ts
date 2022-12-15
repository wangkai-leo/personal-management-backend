import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import {map} from 'rxjs/operators';
import DateUtil from '../../leo.wang.core/common/operator.date';

export interface Response<T> {
  code:200,
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> {
    // const response=context.switchToHttp().getResponse();
    // console.log('---');
    // console.log(response);
    return next.handle().pipe(
      map(
        data=>(
          {code:200,data:data}
        )
      )
    )
  }
}
