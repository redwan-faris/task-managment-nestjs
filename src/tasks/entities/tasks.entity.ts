
import User from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../tak-status.enums";

@Entity("tasks")
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type => User, user=> user.tasks, { eager: false})
    user: User;

}