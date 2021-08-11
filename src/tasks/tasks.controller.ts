import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { pipe } from 'rxjs';
import { GetUser } from 'src/auth/get-user.decorator';
import User from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidatorPipe } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './tak-status.enums';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService:TasksService){}

    @Get()
    getAllTasks(): Promise<Task[]>{
        return this.taskService.getAllTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
         @Body() createTaskDto:CreateTaskDto,
         @GetUser() user: User,
         ):Promise<Task>{
             console.log(user)
        return this.taskService.createTask(createTaskDto,user);

     }

     @Get('/user-tasks')
     getUserTasks(
         @GetUser() user:User
     ){
         console.log("user")
         return this.taskService.getUserTasks(user);
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
