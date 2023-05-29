import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {  ClassStudentEntity } from './class-student.entity';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
export class ClassEntity {

  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Field(() => ID)
  @Property({nullable: true})
  professorId?: string;

  @Field(() => [ClassStudentEntity])
  @OneToMany(() => ClassStudentEntity, cs => cs.class)
  students = new Collection<ClassStudentEntity>(this);

  @Field()
  @Property()
  created_at: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();
}
