import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../interfaces/user.interface';
import { IsPasswordSecure, Match } from '@schoolinc/shared/utils';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto  {
  
  @Field()
  @IsString()
  firstName!: string;

  @Field()
  @IsString()
  lastName!: string;

  @Field()
  @IsEmail()
  @IsString()
  email!: string;

  @Field()
  @IsString()
  @IsPasswordSecure()
  password!: string;

  @Field()
  @IsString()
  @Match('password')
  confirmPassword!: string;

  @Field(() => UserRole, { nullable: true, defaultValue: UserRole.STUDENT })
  @IsOptional()
  @IsString()
  role?: UserRole;
}

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @IsPasswordSecure()
  password?: string;

  @IsOptional()
  @IsString()
  @Match('password')
  confirmPassword?: string;
}
