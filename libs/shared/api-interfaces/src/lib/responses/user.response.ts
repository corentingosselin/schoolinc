import { Field, ID, InputType } from "@nestjs/graphql";
import { UserRole } from "../interfaces/user.interface";

@InputType()
export class UserResponse {

    @Field(() => ID)
    id!: string;
    @Field()
    firstName!: string;
    @Field()
    lastName!: string;
    @Field()
    email!: string;
    @Field(() => UserRole, { defaultValue: UserRole.STUDENT, nullable: true })
    role?: UserRole;
    @Field()
    created_at!: Date;
    @Field()
    updated_at!: Date;
}

@InputType()
export class UserSessionResponse {

    @Field()
    token!: string;
    @Field()
    user!: UserResponse;
}


