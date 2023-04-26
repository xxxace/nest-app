import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

// 可以使用applyDecorators组合注解

export const Role = (...args: string[]) => SetMetadata('role', args);

export const ReqUrl = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log('createParamDecorator:', data)
    return req.url;
})