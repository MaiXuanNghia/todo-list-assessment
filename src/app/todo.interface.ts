export interface Todo {
    id: number;
    summary: string;
    description?: string;
    dueDate: Date;
    completedDate?: Date;
    isCompleted: boolean;
    priority: number;
}