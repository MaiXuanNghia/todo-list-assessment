import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryRef } from 'apollo-angular';
import { delay, from, map, Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
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

  public todosQuery!: QueryRef<{getTodos: Todo[]}>;

  private todoSubscription!: Subscription;

  public isLoading: boolean = false;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
  }

  public getTodos() {
    this.isLoading = true;
    this.todosQuery = this.todoService.getTodos();
    this.todoSubscription = this.todosQuery.valueChanges
      .pipe(delay(2000))
      .subscribe(({data, loading}) => {
        this.todos = data?.getTodos
          ?.filter(item => !item.isCompleted)
          ?.sort((a, b) => this.sortTodo(a, b));
        this.isLoading = loading;
      });
  }

  public sortTodo(current: Todo, next: Todo) {
    if (current.priority === next.priority) {
      return (
        new Date(current.dueDate).getDate() - new Date(next.dueDate).getDate()
      );
    }
    else {
      return next.priority - current.priority;
    }
  }

  refresh() {
    this.isLoading = true;
    this.todosQuery.refetch();
  }

  public onEditFormShow(todo: Todo) {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '300px',
      data: {
        reloadTodoList: () => this.refresh(),
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
    this.todoService
      .updateTodo(updateTodo)
      .pipe(delay(2000))
      .subscribe(() => this.refresh());
  }

  public onOpenRestoreDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Are you sure to restore item with ID=${todo._id}?`,
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
        reloadTodoList: () => this.refresh(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public onMarkTodoAsFinish(todo: Todo) {
    const updateTodo = { ...todo };
    updateTodo.isCompleted = true;
    this.todoService
      .updateTodo(updateTodo)
      .pipe(delay(2000))
      .subscribe(() => {
        this.todos = [
          ...this.todos.filter((item) => item._id !== todo._id),
          updateTodo,
        ];
      });
  }

  public onOpenRemoveDialog(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Are you sure to remove item with ID=${todo._id}?`,
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

  private removeTodo(todo: Todo) {
    this.todoService
      .removeTodo(todo).subscribe(() => this.refresh())
  }

  public dropTodoItem(event: CdkDragDrop<Todo[]>) {
    if(event.previousContainer !== event.container) {
      this.onOpenRemoveDialog(this.todos[event.previousIndex])
    }
  }
}
