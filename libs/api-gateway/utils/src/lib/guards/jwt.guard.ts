import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthService } from '../services/jwt-auth.service';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new UserInputError('Authorization header not found');
    }

    const decoded = this.jwtService.loadToken(authorizationHeader);
    req.user = decoded;
    return true;
  }
}