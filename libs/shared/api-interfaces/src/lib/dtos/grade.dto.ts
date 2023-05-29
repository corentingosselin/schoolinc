import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateGradeDto {
  @Field()
  @IsNumber()
  grade!: number;

  @Field()
  @IsString()
  studentId!: string;

  @Field()
  @IsString()
  classId!: string;
}

@InputType()
export class UpdateGradeDto {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id!: string;

  @Field()
  @IsNumber()
  grade!: number;

  @Field()
  @IsString()
  studentId!: string;
}
