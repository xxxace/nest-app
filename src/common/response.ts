import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface ResponseData<T> {
    data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<ResponseData<T>> | Promise<Observable<ResponseData<T>>> {
        return next.handle().pipe(map(data => {
            if (typeof data !== 'object') {
                return {
                    data,
                    status: 200,
                    message: 'success',
                    success: true
                }
            } else {
                return data;
            }
        }))
    }
}