// Definition interface for a Task object
export interface Task {
    id: number;
    description: string;
    isDone: boolean;
}

// Definition interface for a Tasks array
export interface Tasks extends Array<Task> { }
