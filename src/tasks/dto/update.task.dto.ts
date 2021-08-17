import {CreateTaskDto} from './create-task.dto'
import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../tak-status.enums';


export class UpdateTaskDto extends PartialType(CreateTaskDto){
    status: TaskStatus
}