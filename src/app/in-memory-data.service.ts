import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const todos: Todo[] = [
      {
         id: 2,
         summary: 'Finish the assessments',
         priority: 2,
         isCompleted: false,
         dueDate: new Date(2022, 5, 25),
         description: 'Investigate the requirements, develop the application with Angular, SCSS, and Angular Material'
      },
      {
         id: 1,
         summary: 'Continue learning Angular',
         priority: 3,
         isCompleted: false,
         dueDate: new Date(2022, 5, 30),
      },
      {
         id: 3,
         summary: 'Research about css',
         description: 'Research about pre-processor and post-processor',
         priority: 1,
         isCompleted: true,
         dueDate: new Date(2022, 5, 30),
         completedDate: new Date(),
      },
      {
         id: 4,
         summary: 'Reading Augular Form',
         priority: 3,
         isCompleted: false,
         dueDate: new Date(2022, 5, 29),
      },
      {
         id: 5,
         summary: 'Reading Augular Form Twice',
         priority: 3,
         isCompleted: true,
         dueDate: new Date(2022, 6, 28),
         completedDate: new Date(2022, 5, 23),
      },
      {
         id: 6,
         summary: "Test",
         description: 'Learning Angular material UI',
         isCompleted: false,
         dueDate: new Date(2022, 5, 25),
         priority: 3
      },
      {
         id: 7,
         summary: "Test the hightlight",
         description: 'Todo item must be hightlighted if the deadline is one day left',
         isCompleted: false,
         dueDate: new Date(2022, 5, 28),
         priority: 3
      },
     ]
    return {todos}
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
