// src/interceptors/fastify-multer.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Multer } from 'fastify-multer';
import { Observable } from 'rxjs';

@Injectable()
export class FastifyMulterInterceptor implements NestInterceptor {
  private multer: Multer;

  constructor(options: any) {
    this.multer = Multer(options);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return new Promise((resolve, reject) => {
      this.multer.any()(request, request.res, (err: any) => {
        if (err) {
          return reject(err);
        }
        resolve(next.handle());
      });
    });
  }
}
