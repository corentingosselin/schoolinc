import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@schoolinc/shared/api-interfaces';
import { ClassEntity } from './class.entity';
import { ClassStudentEntity } from './class-student.entity';

@ObjectType()
@Entity()
export class GradeEntity extends BaseEntity {
  
  @Field()
  @Property()
  grade!: number;

  @Field(() => ClassEntity)
  @ManyToOne(() => ClassEntity)
  class!: ClassEntity;

  @Field(() => ClassStudentEntity)
  @ManyToOne(() => ClassStudentEntity)
  student!:  ClassStudentEntity;
}
