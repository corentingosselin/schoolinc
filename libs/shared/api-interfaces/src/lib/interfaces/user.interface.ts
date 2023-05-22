import { Entity } from "./entity.interface";
import { registerEnumType } from "@nestjs/graphql";

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }

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
  