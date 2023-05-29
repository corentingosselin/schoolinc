import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUserSession } from '@schoolinc/shared/api-interfaces';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async loadToken(authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UserInputError('Invalid token, Bearer not found');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = (await this.jwtService.verify(token)) as JwtUserSession;
      return decoded;
    } catch (error) {
      throw new UserInputError('Invalid token');
    }
  }
}
