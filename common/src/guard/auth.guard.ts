import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { jwtVerify } from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    // const permissions = this.reflector.get(Permissions, context.getHandler());
    const roles = this.reflector.get(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();

    let bearerToken = request.headers['authorization'];


    if (!bearerToken) {
      throw new UnauthorizedException('Required to sign in');
    }

    const token = bearerToken.replace('Bearer ', '');

    const currentAuth = await jwtVerify(token);

    if (!currentAuth) {
      throw new UnauthorizedException('Required to sign in');
    }

    // @ts-ignore
    request.user = currentAuth;

    // // admin has all access
    // if (currentAuth.role === 'admin') {
    //   return true;
    // }

    // check role
    if (roles && roles.length > 0) {
      const matched = roles.find((role) => currentAuth.role === role);
      if (!matched) {
        throw new ForbiddenException('Insufficient permissions');
      }
    }

    // // check permissions
    // if (permissions && permissions.length > 0) {
    //   const matched = permissions.find((permit) => currentAuth.permissions && currentAuth.permissions.includes(permit) );
    //   if (!matched) {
    //     throw new ForbiddenException('Insufficient permissions');
    //   }
    // }

    return true;
  }
}
