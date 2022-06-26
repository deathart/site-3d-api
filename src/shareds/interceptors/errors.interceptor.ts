import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  GatewayTimeoutException,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ErrorsInterceptor<T> implements NestInterceptor<T, Response<T>> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();

          if (
            response.statusCode >= 200 &&
            response.statusCode <= 204 &&
            !data
          ) {
            response.status(204);
            return {
              statusCode: 204,
              message: 'No Content',
            };
          }
          return data;
        }),
      )
      .pipe(
        catchError((e) => {
          if (e.response) {
            if (e.response.statusCode) {
              throw new HttpException(
                e.response.message,
                e.response.statusCode,
              );
            }
            throw new HttpException(
              `Code API : ${e.response.data.code} - ${e.response.data.message}`,
              e.response.status,
            );
          }
          if (e.request) {
            throw new GatewayTimeoutException(e);
          }
          throw new BadRequestException(e);
        }),
      );
  }
}
