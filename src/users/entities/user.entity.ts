import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Task } from "src/tasks/entities/tasks.entity";
import { Roles } from "../roles.enum";

@Entity('users')
@Unique(['username'])
class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

  @Column()
    role:Roles;

    @OneToMany(type => Task, task=> task.user, { eager: true })
    tasks: Task[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
      }
      checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }
}

export default User;