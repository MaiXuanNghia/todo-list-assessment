import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, Observable, of, tap } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private baseApiEndpoint = 'http://localhost:3000/todos'

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseApiEndpoint}`).pipe(
      tap(todos => console.log(todos)),
      catchError(this.handleError('getTodos', []))
    )
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseApiEndpoint}/${id}`).pipe(
      catchError(this.handleError<Todo>(`getTodo/${id}`))
    )
  }

  createTodo(todo: Todo) {
    return this.http.post<Todo>(this.baseApiEndpoint, todo, this.headerOptions).pipe(
      catchError(this.handleError<Todo>(`postTodo`))
    )
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseApiEndpoint}/${todo.id}`, todo, this.headerOptions).pipe(
      catchError(this.handleError<Todo>(`putTodo/${todo.id}`))
    )
  }

  removeTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.baseApiEndpoint}/${todo.id}`).pipe(
      catchError(this.handleError<Todo>(`deleteTdo/${todo.id}`))
    )
  }

}
