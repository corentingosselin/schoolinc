import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateClassDto {
  @Field()
  @IsString()
  id!: string;

  @Field()
  @IsString()
  professorId!: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  studentIds?: string[];
}

@InputType()
export class UpdateClassDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  professorId?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  studentIds?: string[];
}
