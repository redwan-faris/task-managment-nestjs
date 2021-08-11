import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tak-status.enums";



export class TaskStatusValidatorPipe implements PipeTransform{
    
    readonly allowedStatses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    
    
    transform(value : any){
        value = value.toUpperCase();
        
            if(!this.isStatusValid(value)){
                throw new BadRequestException(`${value} is an invalid status`);
            }
        return value;
    }

    private isStatusValid(status: any){
        const allowedStatus = this.allowedStatses.indexOf(status);
        return allowedStatus !== -1;
    }

}