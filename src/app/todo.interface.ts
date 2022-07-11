export interface Todo {
    _id: string;
    summary: string;
    description?: string;
    dueDate: Date;
    isCompleted: boolean;
    priority: number;
}
