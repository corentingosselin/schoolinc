import { Options } from "@mikro-orm/core";
import { ClassEntity, ClassStudentEntity, GradeEntity } from "@schoolinc/backend/school-service/data-access";

export default {
    type: "mysql" as const,
    host: process.env["SCHOOL_SERVICE_MYSQL_HOST"],
    port: process.env["SCHOOL_SERVICE_DB_PORT"] ? parseInt(process.env["SCHOOL_SERVICE_DB_PORT"]) : undefined,
    dbName: process.env["MYSQL_DATABASE"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    entities: [GradeEntity, ClassEntity, ClassStudentEntity],
    migrations: {
      path: "apps/school-service/migrations",
    },
  } as Options;