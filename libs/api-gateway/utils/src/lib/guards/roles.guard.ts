import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '@schoolinc/shared/api-interfaces';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext(); // we assume that the request object is part of the GraphQL context
    const authHeader = req.headers.authorization;

    const jwtUserSession = await this.jwtService.loadToken(authHeader);
    req.user = jwtUserSession;

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      throw new UnauthorizedException('Insufficient role');
    }

    return true;
  }
}