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

@InputType()
export class UpdateUserDto {

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  email?: string;

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  @IsPasswordSecure()
  password?: string;

  @Field({ nullable: true})
  @IsOptional()
  @IsString()
  @Match('password')
  confirmPassword?: string;

  @Field(() => UserRole, { nullable: true})
  @IsOptional()
  @IsString()
  role?: UserRole;
}
