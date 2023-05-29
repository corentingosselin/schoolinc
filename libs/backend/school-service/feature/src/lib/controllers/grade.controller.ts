import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GradeService } from '@schoolinc/backend/school-service/data-access';
import {
    CreateGradeDto,
    UpdateGradeDto
} from '@schoolinc/shared/api-interfaces';
import {
    CREATE_GRADE_CMD,
    DELETE_GRADE_CMD,
    FIND_GRADE_BY_CLASS_CMD,
    FIND_GRADE_BY_STUDENT_CMD,
    GET_GRADE_CMD,
    UPDATE_GRADE_CMD
} from '@schoolinc/shared/message-broker';

@Controller()
export class GradeController {
  constructor(private readonly service: GradeService) {}

  @MessagePattern(CREATE_GRADE_CMD)
  createUser(@Payload() createDto: CreateGradeDto) {
    return this.service.create(createDto);
  }

  @MessagePattern(UPDATE_GRADE_CMD)
  updateUser(@Payload() updateDto: UpdateGradeDto) {
    return this.service.update(updateDto);
  }

  @MessagePattern(GET_GRADE_CMD)
  getUser(@Payload() id: string) {
    return this.service.get(id);
  }

  @MessagePattern(DELETE_GRADE_CMD)
  deleteUser(@Payload() id: string) {
    return this.service.delete(id);
  }

  @MessagePattern(FIND_GRADE_BY_STUDENT_CMD)
  findGradeByStudent(@Payload() studentId: string) {
    return this.service.findGradesByStudentId(studentId);
  }

  @MessagePattern(FIND_GRADE_BY_CLASS_CMD)
  findGradeByClass(@Payload() classId: string) {
    return this.service.findGradesByClassId(classId);
  }


}
