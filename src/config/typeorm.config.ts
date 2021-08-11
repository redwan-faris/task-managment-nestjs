import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : "password",
    database: "task_management_orm",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [
        "src/migration/**/*.ts"],
    synchronize : true
}