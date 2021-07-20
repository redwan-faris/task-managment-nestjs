import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

}

export default User;