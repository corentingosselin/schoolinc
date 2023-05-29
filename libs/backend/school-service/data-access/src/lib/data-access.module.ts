import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClassEntity } from './entities/class.entity';
import { GradeEntity } from './entities/grade.entity';
import { ClassService } from './services/class.service';
import { GradeService } from './services/grade.service';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { USER_SERVICE } from '@schoolinc/shared/api-interfaces';
import { ClassStudentEntity } from './entities/class-student.entity';

@Module({
  controllers: [],
  providers: [ClassService, GradeService],
  exports: [ClassService, GradeService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
    MikroOrmModule.forFeature([ClassEntity,GradeEntity,ClassStudentEntity])
  ]
})
export class BackendSchoolServiceDataAccessModule {}
