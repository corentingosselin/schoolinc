import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ClassResponse,
  CreateClassDto,
  USER_SERVICE,
  UpdateClassDto,
  UserResponse,
} from '@schoolinc/shared/api-interfaces';

import { ApolloError, UserInputError } from 'apollo-server-express';
import { ClassEntity } from '../entities/class.entity';
import { RpcService } from '@schoolinc/shared/network';
import { FIND_USER_BY_ID, FIND_USER_BY_IDS } from '@schoolinc/shared/message-broker';
import { ClassStudentEntity } from '../entities/class-student.entity';

@Injectable()
export class ClassService {
  private readonly rpcService: RpcService;

  constructor(
    private readonly orm: MikroORM,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.userService);
  }

  private readonly repository = this.orm.em.getRepository(ClassEntity);

  @UseRequestContext()
  async create(createDto: CreateClassDto): Promise<ClassResponse> {
    const classEntity = await this.repository.findOne({ id: createDto.id });
    if (classEntity) {
      throw new RpcException(
        new UserInputError(`Class with id ${createDto.id} already exists`)
      );
    } 
  
    const entity = new ClassEntity();
    Object.assign(entity, createDto);
    const students = await this.rpcService.sendWithRpcExceptionHandler<UserResponse[]>(
      FIND_USER_BY_IDS,
      createDto.studentIds
    );
  
    students.forEach((studentData) => {
      const student = new ClassStudentEntity();
      student.studentId = studentData.id;
      entity.students.add(student);
    });
  
    await this.repository.persist(entity).flush();
  
    // Create a new ClassResponse and populate it with the entity data
    const classResponse = new ClassResponse();
    classResponse.id = entity.id;
    classResponse.professor = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, entity.professorId);
    classResponse.created_at = entity.created_at;
    classResponse.updated_at = entity.updated_at;
    
    const studentResponses: UserResponse[] = [];
    for (const classStudentEntity of entity.students) {
      const studentResponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID,classStudentEntity.studentId);
      studentResponses.push(studentResponse);
    }
    classResponse.students = studentResponses;
  
    return classResponse;
  }
  
  @UseRequestContext()
  async get(id: string): Promise<ClassResponse> {
    const entity = await this.repository.findOne(id, { populate: ['students'] });
    if (!entity) {
      throw new RpcException(new UserInputError(`Class not found`));
    }
  
    const classResponse = new ClassResponse();
    classResponse.id = entity.id;
    classResponse.professor = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, entity.professorId);
    classResponse.created_at = entity.created_at;
    classResponse.updated_at = entity.updated_at;
    
    const studentResponses: UserResponse[] = [];
    for (const classStudentEntity of entity.students) {
      const studentResponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, classStudentEntity.studentId);
      studentResponses.push(studentResponse);
    }
    classResponse.students = studentResponses;
  
    return classResponse;
  }
  @UseRequestContext()
  async delete(id: string) {
    const entity = this.repository.getReference(id);
    if (!entity) {
      throw new RpcException(new UserInputError(`Class not found`));
    }

    if(entity.students.length > 0) {
      throw new RpcException(new UserInputError(`Cannot delete class with students`));
    }

    await this.repository.remove(entity).flush();
    return true;
  }

  @UseRequestContext()
  async update(updateDto: UpdateClassDto): Promise<ClassResponse> {
    const ref = this.repository.getReference(updateDto.id);
    if (!ref) {
      throw new RpcException(new ApolloError(`Class not found`));
    }
    Object.assign(ref, updateDto);
    await this.repository.flush();
  
    // Create a new ClassResponse and populate it with the updated entity data
    const classResponse = new ClassResponse();
    classResponse.id = ref.id;
    classResponse.professor = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, ref.professorId);
    classResponse.created_at = ref.created_at;
    classResponse.updated_at = ref.updated_at;
    
    const studentResponses: UserResponse[] = [];
    for (const classStudentEntity of ref.students) {
      const studentResponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID,classStudentEntity.studentId);
      studentResponses.push(studentResponse);
    }
    classResponse.students = studentResponses;
  
    return classResponse;
  }
  @UseRequestContext()
  async findAll(sortBy: 'id' | 'created_at' | 'updated_at' = 'id') {
    const classes = await this.repository.find({}, { populate: ['students'], orderBy: { [sortBy]: 'asc' } });
  
    const classResponses: ClassResponse[] = [];
    
    for (const classEntity of classes) {
      const classResponse = new ClassResponse();
      classResponse.id = classEntity.id;
      classResponse.professor = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, classEntity.professorId);
      classResponse.created_at = classEntity.created_at;
      classResponse.updated_at = classEntity.updated_at;
  
      const studentResponses: UserResponse[] = [];
      for (const classStudentEntity of classEntity.students) {
        const studentResponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID,classStudentEntity.studentId);
        studentResponses.push(studentResponse);
      }
      classResponse.students = studentResponses;
      
      classResponses.push(classResponse);
    }
  
    return classResponses;
  }

  @UseRequestContext()
  async addStudentToClass(classId: string, studentId: string): Promise<ClassResponse> {
    const classEntity = await this.repository.findOne(classId, { populate: ['students'] });
    if (!classEntity) {
      throw new RpcException(new UserInputError(`Class not found`));
    }
  
    const student = new ClassStudentEntity();
    student.studentId = studentId;
    classEntity.students.add(student);
  
    await this.repository.persist(classEntity).flush();
  
    const classResponse = new ClassResponse();
    classResponse.id = classEntity.id;
    classResponse.professor = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID, classEntity.professorId);
    classResponse.created_at = classEntity.created_at;
    classResponse.updated_at = classEntity.updated_at;
  
    const studentResponses: UserResponse[] = [];
    for (const classStudentEntity of classEntity.students) {
      const studentResponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(FIND_USER_BY_ID,classStudentEntity.studentId);
      studentResponses.push(studentResponse);
    }
    classResponse.students = studentResponses;
  
    return classResponse;
  }
}
