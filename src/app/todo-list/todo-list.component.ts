import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  columnsToDisplay: string[] = ['id', 'summary', 'priority', 'isCompleted', 'dueDate', 'completedDate', 'action'];

  constructor(private todoService: TodoService) { }

  sortTodo(current: Todo, next: Todo) {
    if(current.completedDate && next.completedDate) {
      return new Date(next.completedDate).getDate() - new Date(current.completedDate).getDate();
    }
    if(current.isCompleted === next.isCompleted) {
      return next.priority - current.priority
    }
    else {
      return current.isCompleted ? 1 : -1;
    }
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos.sort(
      (a, b) => this.sortTodo(a, b)
    ));
  }

  markTodoAsComplete(todo: Todo) {
    todo.isCompleted = true;
    todo.completedDate = new Date();
    this.todoService.updateTodo(todo).subscribe(() => this.getTodos())
  }

  handleTodoStatus(status: boolean, dueDate: Date) {
    const deadline = new Date(dueDate).getDate();
    const today = new Date().getDate();
    const remainingTime = deadline - today;
    if(status) {
      return 'Done';
    } else {
      if(remainingTime > 0) {
        return 'In Progress';
      }
      return 'Fail';
    }
  }

}
