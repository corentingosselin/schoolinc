import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClassService } from '@schoolinc/api-gateway/data-access';
import { Roles, RolesGuard } from '@schoolinc/api-gateway/utils';
import { ClassEntity } from '@schoolinc/backend/school-service/data-access';
import {
  ClassResponse,
  CreateClassDto,
  UpdateClassDto,
  UserRole,
} from '@schoolinc/shared/api-interfaces';

@Resolver(() => ClassEntity)
export class ClassResolver {
  constructor(private readonly service: ClassService) {}

  @Mutation(() => ClassResponse)
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async createClass(@Args('createClassDto') createDto: CreateClassDto) {
    return this.service.create(createDto);
  }

  @Query(() => [ClassResponse])
  async getClasses(
    @Args('sortBy', { type: () => String, defaultValue: 'id' })
    sortBy: 'id' | 'created_at' | 'updated_at' = 'id'
  ) {
    return this.service.findAll(sortBy);
  }

  @Query(() => ClassResponse)
  async getClass(@Args('classId') classId: string) {
    return this.service.findOne(classId);
  }

  @Mutation(() => ClassResponse)
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async updateClass(
    @Args('updateUserDto') updateDto: UpdateClassDto,
    @Context('req') req: any
  ) {
    return this.service.update(updateDto);
  }

  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  @Mutation(() => Boolean)
  async deleteClass(@Args('classId') classId: string) {
    return this.service.delete(classId);
  }

  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  @Mutation(() => ClassResponse)
  async addStudentToClass(
    @Args('classId') classId: string,
    @Args('studentId') studentId: string
  ) {
    return this.service.addStudentToClass(classId, studentId);
  }
}
