import { Module } from '@nestjs/common';
import { BackendSchoolServiceDataAccessModule } from '@schoolinc/backend/school-service/data-access';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { ClassController } from './controllers/class.controller';
import { GradeController } from './controllers/grade.controller';

@Module({
  controllers: [
    ClassController,
    GradeController
  ],
  providers: [],
  exports: [],
  imports: [
    SharedMessageBrokerModule,
    BackendSchoolServiceDataAccessModule
  ]
})
export class BackendSchoolServiceFeatureModule {}
