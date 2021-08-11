import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tak-status.enums';

import  TaskRepository  from './task.repository';
import { Task } from './tasks.entity';


@Injectable()
export class TasksService {
  

    constructor(@InjectRepository(TaskRepository)
    private taskRpository: TaskRepository
    ){}

    async getAllTasks() :Promise<Task[]>{
        const tasks = await  this.taskRpository.find();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User) : Promise<Task>{
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        return this.taskRpository.createTask(task);

    }

    async getTaskById(id: number): Promise<Task>{
       const found = await this.taskRpository.findOne(id);
       if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
       }
       return found;
    } 

    deleteTask(id: string){
        const found =  this.taskRpository.delete(id);
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    } 

    async updateTaskStatus(id: number, status: TaskStatus){
        const task = await this.getTaskById(id);
        task.status = status;
        console.log(task)
        return this.taskRpository.updateTaskStatus(task);
    }

    async getUserTasks(user:User){
        return this.taskRpository.getUserTasks(user);
    }
}