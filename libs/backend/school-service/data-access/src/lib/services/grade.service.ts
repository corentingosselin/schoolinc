import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApolloError, UserInputError } from 'apollo-server-express';
import { GradeEntity } from '../entities/grade.entity';
import {
  ClassResponse,
  CreateGradeDto,
  GradeResponse,
  USER_SERVICE,
  UpdateGradeDto,
  UserResponse,
} from '@schoolinc/shared/api-interfaces';
import { RpcService } from '@schoolinc/shared/network';
import {
  FIND_USER_BY_ID,
  FIND_USER_BY_IDS,
} from '@schoolinc/shared/message-broker';
import { ClassStudentEntity } from '../entities/class-student.entity';
import { ClassEntity } from '../entities/class.entity';

@Injectable()
export class GradeService {
  private readonly rpcService: RpcService;

  constructor(
    private readonly orm: MikroORM,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.userService);
  }

  private readonly repository = this.orm.em.getRepository(GradeEntity);
  private readonly repositoryClass = this.orm.em.getRepository(ClassEntity);
  private readonly repositoryStudentClass =
    this.orm.em.getRepository(ClassStudentEntity);

  @UseRequestContext()
  async create(createDto: CreateGradeDto) {
    const classEntity = await this.repositoryClass.findOne({
      id: createDto.classId,
    });
    if (!classEntity) {
      throw new RpcException(
        new UserInputError(
          `Class with id ${createDto.classId} doest not exists`
        )
      );
    }

    const entity = new GradeEntity();
    entity.class = classEntity;

    const classStudentEntity = new ClassStudentEntity();
    classStudentEntity.studentId = createDto.studentId;
    classStudentEntity.class = classEntity;

    entity.class = classEntity;
    entity.student = classStudentEntity;
    await this.repositoryStudentClass.persist(classStudentEntity).flush();

    Object.assign(entity, createDto);

    await this.repository.persist(entity).flush();

    const gradeResponse = new GradeResponse();
    gradeResponse.id = entity.id;
    gradeResponse.student =
      await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        createDto.studentId
      );
    gradeResponse.grade = entity.grade;
    gradeResponse.created_at = entity.created_at;
    gradeResponse.updated_at = entity.updated_at;

    await classEntity.students.init();
    const students = await this.rpcService.sendWithRpcExceptionHandler<
      UserResponse[]
    >(
      FIND_USER_BY_IDS,
      classEntity.students.toArray().map((s) => s.studentId)
    );

    const professor =
      await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        classEntity.professorId
      );

    gradeResponse.class = {
      id: classEntity.id,
      students: students,
      professor: professor,
      created_at: classEntity.created_at,
      updated_at: classEntity.updated_at,
    };

    return gradeResponse;
  }

  @UseRequestContext()
  async get(id: string) {
    const entity = await this.repository.findOne({ id });
    if (!entity) {
      throw new RpcException(new UserInputError(`Grade not found`));
    }
    const gradeResponse = {
      id: entity.id,
      student: await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        entity.student.studentId
      ),
      class: {
        id: entity.class.id,
        professor:
          await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
            FIND_USER_BY_ID,
            entity.class.professorId
          ),
        students: await this.rpcService.sendWithRpcExceptionHandler<
          UserResponse[]
        >(
          FIND_USER_BY_IDS,
          entity.class.students.toArray().map((s) => s.studentId)
        ),
      } as ClassResponse,

      grade: entity.grade,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
    return gradeResponse;
  }

  @UseRequestContext()
  async delete(id: string) {
    const entity = this.repository.getReference(id);
    if (!entity) {
      throw new RpcException(new UserInputError(`Grade not found`));
    }
    await this.repository.remove(entity).flush();
    return true;
  }

  @UseRequestContext()
  async update(updateDto: UpdateGradeDto) {
    const ref = this.repository.getReference(updateDto.id);
    if (!ref) {
      throw new RpcException(new ApolloError(`Grade not found`));
    }
    Object.assign(ref, updateDto);
    await this.repository.flush();
    const gradeResponse = {
      id: ref.id,
      student: await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        ref.student.studentId
      ),
      grade: ref.grade,
      created_at: ref.created_at,
      updated_at: ref.updated_at,
    };
    return gradeResponse;
  }

  @UseRequestContext()
  async findGradesByStudentId(studentId: string) {
    //check if user exists
    const user =
      await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        studentId
      );
    if (!user) {
      throw new RpcException(new UserInputError(`User not found`));
    }

    //find grades
    const grades = await this.repository.find({
      student: { studentId: studentId },
    });

    const gradesResponse = grades.map((g) => {
      const gradeResponse = {
        id: g.id,
        student: user,
        grade: g.grade,
        class: {
          id: g.class.id,
          professor: user,
        } as ClassResponse,
        created_at: g.created_at,
        updated_at: g.updated_at,
      };
      return gradeResponse;
    });
    return gradesResponse as GradeResponse[];
  }

  @UseRequestContext()
  async findGradesByClassId(classId: string) {
    //check if class exists
    const classEntity = await this.repositoryClass.findOne({ id: classId });
    if (!classEntity) {
      throw new RpcException(new UserInputError(`Class not found`));
    }
    await classEntity.students.init();
    //find grades
    const grades = await this.repository.find({
      class: { id: classId },
    });
    const professor =
      await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
        FIND_USER_BY_ID,
        classEntity.professorId
      );

    const studentIDs = classEntity.students.toArray().map((s) => {
      return s.studentId;
    });
    const students = await this.rpcService.sendWithRpcExceptionHandler<
      UserResponse[]
    >(FIND_USER_BY_IDS, studentIDs);

    const gradesResponse = grades.map((g) => {
      const student = students.find((s) => s.id === g.student.studentId);
      if (!student) {
        throw new RpcException(new UserInputError(`Student not found`));
      }

      const gradeResponse = {
        id: g.id,
        student,
        class: {
          students,
          professor,
          id: g.class.id,
          created_at: g.class.created_at,
          updated_at: g.class.updated_at,
        } as ClassResponse,
        grade: g.grade,
        created_at: g.created_at,
        updated_at: g.updated_at,
      } as GradeResponse;
      return gradeResponse;
    });

    return gradesResponse;
  }
}
