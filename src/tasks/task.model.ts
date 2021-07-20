export interface Task{
    title: string;
    description: string;
    status : TaskStatus;
    id: string;
}

export interface UserResponse {
    status: boolean;
    data : Task[]
}

export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

