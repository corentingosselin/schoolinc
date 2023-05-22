import { PrimaryKey, Property } from '@mikro-orm/core';
import { Entity } from '../interfaces/entity.interface';
import { v4 } from 'uuid';
import { Field, ID } from '@nestjs/graphql';


export abstract class BaseEntity implements Entity {

  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Field(() => Date)
  @Property()
  created_at: Date = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();
  
}
