import { BeforeCreate, BeforeUpdate, Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, User, UserRole } from '@schoolinc/shared/api-interfaces';
import argon2 from 'argon2';

@ObjectType()
@Entity()
export class UserEntity extends BaseEntity implements User {
  
  @Field()
  @Property()
  firstName!: string;

  @Field()
  @Property()
  lastName!: string;

  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  password!: string;

  @Field(() => UserRole, { defaultValue: UserRole.STUDENT, nullable: true })
  @Property()
  role: UserRole = UserRole.STUDENT;
  
  @BeforeCreate()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
  
}
