import { Entity, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.model";
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
}

export default TaskRepository;