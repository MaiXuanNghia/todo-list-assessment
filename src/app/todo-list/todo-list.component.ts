import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  isEditable: boolean = false;
  itemInEdit!: Todo;

  today = new Date();

  priorities: number[] = [1, 2, 3];

  editForm = new FormGroup({
      summary: new FormControl<string>(''),
      description: new FormControl<string>(''),
      dueDate: new FormControl<Date>(new Date(), {
        nonNullable: false
      }),
      completedDate: new FormControl<Date|null>(null),
      priority: new FormControl<number|null>(null),
  })

  columnsToDisplay: string[] = ['id', 'summary', 'priority', 'isCompleted', 'dueDate', 'completedDate', 'action'];

  constructor(private todoService: TodoService, public dialog: MatDialog) { }

  sortTodo(current: Todo, next: Todo) {
    //sort by complete date for item which finished
    if(current.completedDate && next.completedDate) {
      return new Date(current.completedDate).getDate() - new Date(next.completedDate).getDate();
    }
    if(!current.isCompleted && !next.isCompleted) {
      //sort by due date if 2 items have the same status isCompleted=false and have the same priority
      if(current.priority === next.priority) {
        return new Date(current.dueDate).getDate() - new Date(next.dueDate).getDate();
      }
      //sort by priority descending
      else {
        return next.priority - current.priority
      }
    }
    //in case 2 close items have different isCompleted status, sort by isCompleted with order true value first, then false
    else {
      return current.isCompleted ? 1 : -1;
    }
  }

  onEditFormShow(todo: Todo) {
    this.editForm.patchValue({
      ...todo
    })
    this.isEditable = true;
    this.itemInEdit = todo;
  }

  submitEditForm(formValue: Record<any, any>) {
    this.todoService.updateTodo({id: this.itemInEdit.id ,...formValue} as Todo).subscribe(() => {
      this.onEditFormHide();
      this.getTodos();
    })
  }

  onEditFormHide() {
    this.isEditable = false;
  }

  onOpenRestoreDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: `Are you sure to restore item with ID=${todo.id}?`,
        onConfirm: () => {
        this.onToggleTodoStatus(todo);
        dialogRef.close();
      }},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onOpenCreateTodoDialog() {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      width: '300px',
      data: {
        reloadTodoList: () => this.getTodos()
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos.sort(
      (a, b) => this.sortTodo(a, b)
    ));
  }

  onToggleTodoStatus(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    todo.isCompleted ? todo.completedDate = new Date() : delete todo.completedDate;
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

  onOpenRemoveDialog(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: `Are you sure to remove item with ID=${todo.id}?`,
        onConfirm: () => {
        this.removeTodo(todo);
        dialogRef.close();
      }},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo).subscribe(() => this.getTodos())
  }

}
