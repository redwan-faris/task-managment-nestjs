import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import User from 'src/users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Task } from './entities/tasks.entity';
import { TasksService } from './tasks.service';
import { JwtAtuhGuard } from 'src/auth/guards/jwt-guard';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';


@Controller('tasks')
@UseGuards(JwtAtuhGuard,RolesGuard)
export class TasksController {
    constructor(private taskService:TasksService){}
   // @hasRoles("Admin")
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

     
     @hasRoles('Admin')
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
    updateTaskStatus(@Body() updateTaskDto: UpdateTaskDto, @Param("id") id:number){
        
           return this.taskService.updateTaskStatus(updateTaskDto,id)
        
    }

   
}
