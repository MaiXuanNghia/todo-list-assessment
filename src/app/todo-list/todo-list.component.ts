import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  public itemInEdit!: Todo;

  public today = new Date();

  public priorities: number[] = [1, 2, 3];

  public columnsToDisplay: string[] = [
    'summary',
    'isCompleted',
    'completedDate',
    'action',
  ];

  public isLoading: boolean = false;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTodos();
  }

  public getTodos() {
    this.isLoading = true;
    this.todoService
      .getTodos()
      .pipe(delay(2000))
      .subscribe((todos) => {
        this.todos = todos
          .filter((item) => !item.isCompleted)
          .sort((a, b) => this.sortTodo(a, b));
        this.isLoading = false;
      });
  }

  public sortTodo(current: Todo, next: Todo) {
    if (!current.isCompleted && !next.isCompleted) {
      //sort by due date if 2 items have the same status isCompleted=false and have the same priority
      if (current.priority === next.priority) {
        return (
          new Date(current.dueDate).getDate() - new Date(next.dueDate).getDate()
        );
      }
      //sort by priority descending
      else {
        return next.priority - current.priority;
      }
    }
    //in case 2 close items have different isCompleted status, sort by isCompleted with order true value first, then false
    else {
      return current.isCompleted ? 1 : -1;
    }
  }

  public onEditFormShow(todo: Todo) {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '300px',
      data: {
        reloadTodoList: () => this.getTodos(),
        todoItem: todo,
        isEditForm: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public restoreTodo(todo: Todo): void {
    const updateTodo = { ...todo };
    updateTodo.isCompleted = false;
    delete updateTodo.completedDate;
    this.todoService
      .updateTodo(updateTodo)
      .pipe(delay(2000))
      .subscribe(() => this.getTodos());
  }

  public onOpenRestoreDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: `Are you sure to restore item with ID=${todo.id}?`,
        onConfirm: () => {
          this.restoreTodo(todo);
          dialogRef.close();
        },
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  public onOpenCreateTodoDialog() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '300px',
      data: {
        reloadTodoList: () => this.getTodos(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public onMarkTodoAsFinish(todo: Todo) {
    const updateTodo = { ...todo };
    updateTodo.isCompleted = true;
    updateTodo.isCompleted
      ? (updateTodo.completedDate = new Date())
      : delete updateTodo.completedDate;
    this.todoService
      .updateTodo(updateTodo)
      .pipe(delay(2000))
      .subscribe(() => {
        this.todos = [
          ...this.todos.filter((item) => item.id !== todo.id),
          updateTodo,
        ];
      });
  }

  public onOpenRemoveDialog(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: `Are you sure to remove item with ID=${todo.id}?`,
        onConfirm: () => {
          this.removeTodo(todo);
          dialogRef.close();
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public removeTodo(todo: Todo) {
    this.todoService
      .removeTodo(todo)
      .pipe(delay(2000))
      .subscribe(() => this.getTodos());
  }
}
