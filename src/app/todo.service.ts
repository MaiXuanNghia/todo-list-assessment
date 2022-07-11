import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Todo } from './todo.interface';
import { CreateTodo } from './todos/createTodo.graph';
import { GetTodoDetail } from './todos/getTodoDetail.graph';
import { RemoveTodo } from './todos/removeTodo.graph';
import { UpdateTodo } from './todos/updateTodo.graph';



@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor(private apollo: Apollo, private getTodoDetail: GetTodoDetail, private createNewTodo: CreateTodo, private updateTodoItem: UpdateTodo, private removeTodoItem: RemoveTodo) {}


  getTodos(): QueryRef<{getTodos: Todo[]}> {
    return this.apollo.watchQuery<{getTodos: Todo[]}>({
      query: gql`
      query GetTodos {
        getTodos {
          _id
          summary
          description
          isCompleted
          dueDate
          priority
        }
      }
    `,
    });
  }

  getTodo(id: string): Observable<Todo> {
    return this.getTodoDetail.watch({id}).valueChanges.pipe(map(result => result.data))
  }

  createTodo(todo: Todo) {
    return this.createNewTodo.mutate({...todo, dueDate: `${todo.dueDate.getFullYear()}-${todo.dueDate.getMonth() + 1}-${todo.dueDate.getDate()}`});
  }

  updateTodo(todo: Todo) {
    todo.dueDate = new Date(todo.dueDate);
    return this.updateTodoItem.mutate({...todo,id: todo._id, dueDate: `${todo?.dueDate?.getFullYear()}-${todo?.dueDate?.getMonth() + 1}-${todo?.dueDate?.getDate()}`});
  }

  removeTodo(todo: Todo) {
    return this.removeTodoItem.mutate({id: todo._id});
    
  }

}
