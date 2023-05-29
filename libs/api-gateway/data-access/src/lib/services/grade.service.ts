import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateGradeDto,
  GradeResponse,
  SCHOOL_SERVICE,
  UpdateClassDto
} from '@schoolinc/shared/api-interfaces';
import {
  CREATE_GRADE_CMD,
  DELETE_GRADE_CMD,
  FIND_ALL_CLASS_CMD,
  FIND_GRADE_BY_CLASS_CMD,
  FIND_GRADE_BY_STUDENT_CMD,
  GET_GRADE_CMD,
  UPDATE_GRADE_CMD
} from '@schoolinc/shared/message-broker';
import { RpcService } from '@schoolinc/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class GradeService implements IService<GradeResponse, CreateGradeDto> {
  private readonly rpcService: RpcService;
  constructor(@Inject(SCHOOL_SERVICE) private readonly service: ClientProxy) {
    this.rpcService = new RpcService(this.service);
  }
  findAll(id?: string | undefined): Promise<GradeResponse[]> {
    throw new Error('Method not implemented.');
  }

  async create(createDto: CreateGradeDto) {
    return this.rpcService.sendWithRpcExceptionHandler<GradeResponse>(
      CREATE_GRADE_CMD,
      createDto
    );
  }

  async findOne(id: string) {
    const response = await this.rpcService.sendWithRpcExceptionHandler<GradeResponse>(
      GET_GRADE_CMD,
      id
    );
    return response;
  }

  async delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_GRADE_CMD,
      id
    );
  }

  async update(updateDto: UpdateClassDto) {
    return this.rpcService.sendWithRpcExceptionHandler<GradeResponse>(
      UPDATE_GRADE_CMD,
      updateDto
    );
  }

  async findByStudentId(studentId: string) {
    return this.rpcService.sendWithRpcExceptionHandler<GradeResponse[]>(
      FIND_GRADE_BY_STUDENT_CMD,
      studentId
    );
  }

  async findByClassId(classId: string) {
    return this.rpcService.sendWithRpcExceptionHandler<GradeResponse[]>(
      FIND_GRADE_BY_CLASS_CMD,
      classId
    );
  }


}
