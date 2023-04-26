import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('user guard');
    const role = this.reflector.get<string[]>('role', context.getHandler())
    const req = context.switchToHttp().getRequest<Request>()
    console.log(role, req.query);
    if (role.includes(req.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
