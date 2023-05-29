import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GradeService } from '@schoolinc/api-gateway/data-access';
import {
  CreateGradeDto,
  GradeResponse,
  UpdateGradeDto
} from '@schoolinc/shared/api-interfaces';

@Resolver(() => GradeResponse)
export class GradeResolver {
  constructor(private readonly service: GradeService) {}

  @Mutation(() => GradeResponse)
  async createGrade(@Args('createGradeDto') createDto: CreateGradeDto) {
    return this.service.create(createDto);
  }


  @Mutation(() => GradeResponse)
  async updateGrade(
    @Args('updateGradeDto') updateDto: UpdateGradeDto,
    @Context('req') req: any
  ) {
    return this.service.update(updateDto);
  }

  @Mutation(() => Boolean)
  async deleteGrade(@Args('gradeId') id: string) {
    return this.service.delete(id);
  }

  @Query(() => [GradeResponse])
  async findGradeByStudent(@Args('studentId') studentId: string) {
    return this.service.findByStudentId(studentId);
  }

  @Query(() => [GradeResponse])
  async findGradeByClass(@Args('classId') classId: string) {
    return this.service.findByClassId(classId);
  }


}
