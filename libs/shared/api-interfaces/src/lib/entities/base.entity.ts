import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export abstract class BaseEntity {

  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Field()
  @Property()
  created_at: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();
  
}
