import { Todo } from "./todo.interface";

export const TODOS: Todo[] = [
 {
    id: 1,
    summary: 'Finish the assessments',
    priority: 3,
    isCompleted: false,
    dueDate: new Date(2022, 6, 23),
 },
 {
    id: 2,
    summary: 'Continue learning Angular',
    priority: 2,
    isCompleted: false,
    dueDate: new Date(2022, 6, 30),
 },
 {
    id: 3,
    summary: 'Research about pre-processor and post-processor',
    priority: 1,
    isCompleted: false,
    dueDate: new Date(2022, 7, 30),
 },
]