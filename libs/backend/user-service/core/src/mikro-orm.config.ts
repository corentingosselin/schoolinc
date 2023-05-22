import { Options } from "@mikro-orm/core";
import { UserEntity } from "@schoolinc/backend/user-service/data-access";

export default {
    type: "mysql" as const,
    host: process.env["USER_SERVICE_MYSQL_HOST"],
    port: process.env["USER_SERVICE_DB_PORT"] ? parseInt(process.env["USER_SERVICE_DB_PORT"]) : undefined,
    dbName: process.env["MYSQL_DATABASE"],
    user: process.env["MYSQL_USER"],
    password: process.env["MYSQL_PASSWORD"],
    entities: [UserEntity],
    migrations: {
      path: "apps/user-service/migrations",
    },
  } as Options;