import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { pipe } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidatorPipe } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './task.model';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}

    @Get()
    getAllTasks(): Promise<Task[]>{
        return this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
        return this.taskService.createTask(createTaskDto);

     }

    @Get('/:id')
    getTaskById(@Param("id", ParseIntPipe) id:number){
     return this.taskService.getTaskById(id)
        
    }

    @Delete('/:id')
    deleteTask(@Param("id") id:string): void{
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Body("status", TaskStatusValidatorPipe) status:TaskStatus, @Param("id") id:number){
        
           return this.taskService.updateTaskStatus(id,status)
        
    }
}
