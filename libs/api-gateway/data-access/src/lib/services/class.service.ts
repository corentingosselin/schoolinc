import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClassEntity } from '@schoolinc/backend/school-service/data-access';
import {
    ClassResponse,
    CreateClassDto,
    SCHOOL_SERVICE,
    UpdateClassDto
} from '@schoolinc/shared/api-interfaces';
import {
  ADD_STUDENT_TO_CLASS_CMD,
    CREATE_CLASS_CMD,
    DELETE_CLASS_CMD,
    FIND_ALL_CLASS_CMD,
    GET_CLASS_CMD,
    UPDATE_CLASS_CMD
} from '@schoolinc/shared/message-broker';
import { RpcService } from '@schoolinc/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class ClassService implements IService<ClassResponse, CreateClassDto> {
  private readonly rpcService: RpcService;
  constructor(@Inject(SCHOOL_SERVICE) private readonly service: ClientProxy) {
    this.rpcService = new RpcService(this.service);
  }

  create(createDto: CreateClassDto) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassResponse>(
      CREATE_CLASS_CMD,
      createDto
    );
  }

  async findOne(id: string) {
    const response = await this.rpcService.sendWithRpcExceptionHandler<ClassResponse>(
      GET_CLASS_CMD,
      id
    );
    return response;
  }

  delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_CLASS_CMD,
      id
    );
  }

  update(updateDto: UpdateClassDto) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassResponse>(
      UPDATE_CLASS_CMD,
      updateDto
    );
  }

  findAll(sortBy: 'id' | 'created_at' | 'updated_at' = 'id'): Promise<ClassResponse[]> {
    return this.rpcService.sendWithRpcExceptionHandler<ClassResponse[]>(
        FIND_ALL_CLASS_CMD,
        sortBy
      );
  }

  async addStudentToClass(classId: string, studentId: string) {
    const response = await this.rpcService.sendWithRpcExceptionHandler<ClassEntity>(
      ADD_STUDENT_TO_CLASS_CMD,
      { classId, studentId }
    );
    return response;
  }

}
