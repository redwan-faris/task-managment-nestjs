import User from "src/auth/user.entity";
import { Entity, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./tasks.entity";


@EntityRepository(Task)
 class TaskRepository extends Repository<Task>{

    async createTask(task: Task) : Promise<Task>{
        await task.save();
        return task;
    }

    async updateTaskStatus(task : Task) : Promise<Task>{
        await task.save();
        return task;
    }

    async getUserTasks(user: User):Promise<Task[]>{
        const tasks = await this.find({user: user});
        return tasks;
    }
}

export default TaskRepository;