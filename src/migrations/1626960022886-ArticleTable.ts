import User from "src/auth/user.entity";
import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleTable1626960022886 implements MigrationInterface {

    
    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        await User.save(user);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
