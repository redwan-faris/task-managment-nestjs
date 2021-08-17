import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import  TaskRepository  from './task.repository';
import { Task } from './entities/tasks.entity';


@Injectable()
export class TasksService {
  

    constructor(@InjectRepository(TaskRepository)
    private taskRpository: TaskRepository
    ){}

    async getAllTasks() :Promise<Task[]>{
        return this.taskRpository.getAllTasks();
    }

    async createTask(createTaskDto: CreateTaskDto, user: User) : Promise<Task>{
        
        return this.taskRpository.createTask(createTaskDto,user);

    }

    async getTaskById(id: number): Promise<Task>{
        return this.taskRpository.getTaskById(id);
    } 

    deleteTask(id: string): any{
        return this.taskRpository.deleteTask(id);
    }  

    async updateTaskStatus(updateTaskDto: UpdateTaskDto,id){
        const { status } = updateTaskDto;
        const task = await this.getTaskById(id);
        task.status = status;
        return this.taskRpository.updateTaskStatus(task);
    }

    async getUserTasks(user:User){
        return this.taskRpository.getUserTasks(user);
    }
}