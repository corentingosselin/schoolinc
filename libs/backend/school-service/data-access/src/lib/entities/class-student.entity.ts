import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClassEntity } from './class.entity';
import { v4 } from 'uuid';

@ObjectType()
@Entity()
export class ClassStudentEntity {
  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => ClassEntity)
  @Field(() => ClassEntity)
  class!: ClassEntity;

  @Field(() => ID)
  @Property()
  studentId!: string;

  @Field()
  @Property()
  created_at: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();
}
