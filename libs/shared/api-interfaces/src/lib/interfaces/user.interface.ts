import { registerEnumType } from "@nestjs/graphql";

  export enum UserRole {
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT',
  }

  registerEnumType(UserRole, {
    name: 'UserRole',
  });

  export interface JwtUserSession {
    sub: string;
    email: string;
    exp?: number;
    iat?: number;
    role: UserRole;
  }
  