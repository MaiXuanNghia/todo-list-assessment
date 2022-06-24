import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Validators } from '@angular/forms';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

export interface CreateTodoDialogData {
  reloadTodoList: Function;
}

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  today = new Date();

  priorities: number[] = [1, 2, 3]

  private defaultDeadline = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 3
  );

  createTodoForm = new FormGroup({
    summary: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    description: new FormControl<string>(''),
    dueDate: new FormControl<Date>(this.defaultDeadline),
    priority: new FormControl<number>(1),
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: CreateTodoDialogData,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitCreateTodoForm(formData: Record<any, any>) {
    this.todoService
      .createTodo({ ...formData, isCompleted: false } as Todo)
      .subscribe(() => {
        alert('Todo Item Created');
        this.data.reloadTodoList();
        this.onClose();
      });
  }
}
