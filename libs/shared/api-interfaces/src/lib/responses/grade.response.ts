import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserResponse } from "./user.response";
import { ClassResponse } from "./class.response";

@ObjectType()
export class GradeResponse {
    @Field(() => ID)
    id!: string;
    @Field()
    grade!: number;
    @Field()
    student!: UserResponse;
    @Field()
    class!: ClassResponse;
    @Field()
    created_at!: Date;
    @Field()
    updated_at!: Date;
}