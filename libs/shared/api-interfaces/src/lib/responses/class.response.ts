import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserResponse } from "./user.response";

@ObjectType()
export class ClassResponse {
    @Field(() => ID)
    id!: string;
    @Field()
    professor!: UserResponse;
    @Field(() => [UserResponse])
    students!: UserResponse[];
    @Field()
    created_at!: Date;
    @Field()
    updated_at!: Date;
}
