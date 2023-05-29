import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClassService } from '@schoolinc/backend/school-service/data-access';
import {
  CreateClassDto,
  UpdateClassDto,
} from '@schoolinc/shared/api-interfaces';
import {
  ADD_STUDENT_TO_CLASS_CMD,
  CREATE_CLASS_CMD,
  DELETE_CLASS_CMD,
  FIND_ALL_CLASS_CMD,
  GET_CLASS_CMD,
  UPDATE_CLASS_CMD,
} from '@schoolinc/shared/message-broker';

@Controller()
export class ClassController {
  constructor(private readonly service: ClassService) {}

  @MessagePattern(CREATE_CLASS_CMD)
  create(@Payload() createDto: CreateClassDto) {
    return this.service.create(createDto);
  }

  @MessagePattern(UPDATE_CLASS_CMD)
  update(@Payload() updateDto: UpdateClassDto) {
    return this.service.update(updateDto);
  }

  @MessagePattern(GET_CLASS_CMD)
  get(@Payload() id: string) {
    return this.service.get(id);
  }

  @MessagePattern(DELETE_CLASS_CMD)
  delete(@Payload() id: string) {
    return this.service.delete(id);
  }

  @MessagePattern(FIND_ALL_CLASS_CMD)
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern(ADD_STUDENT_TO_CLASS_CMD)
  addStudentToClass(@Payload() payload: { classId: string; studentId: string }) {
    return this.service.addStudentToClass(payload.classId, payload.studentId);
  }

}
