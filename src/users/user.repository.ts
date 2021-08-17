import User from "src/users/entities/user.entity";
import { Entity, EntityRepository, Repository } from "typeorm";

import { NotFoundException } from "@nestjs/common";

@EntityRepository(User)
 class UserRepository extends Repository<User>{


    
    // async getAllTasks() :Promise<User[]>{
    //     const tasks = await  this.find();
    //     return tasks;
    // }

    // async createTask(createTaskDto: CreateTaskDto, user:User) : Promise<Task>{
    //     const {title, description} = createTaskDto;
    //     const task = new Task();
    //     task.title = title;
    //     task.description = description;
    //     task.status = TaskStatus.OPEN;
    //     task.user = user;
    //     await task.save();
    //     return task;
    // }

    async getUserById(id: number): Promise<User>{
        const found = await this.findOne(id);
        if(!found){
             throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
     } 
 

    //  deleteTask(id: string){
    //     const found =  this.delete(id);
    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //     return found;
    // } 


    // async updateTaskStatus(task : Task) : Promise<Task>{
    //     await task.save();
    //     return task;
    // }

    // async getUserTasks(user: User):Promise<Task[]>{
    //     const tasks = await this.find({user: user});
    //     return tasks;
    // }
}

export default UserRepository;