import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Validators } from '@angular/forms';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';
import { delay } from 'rxjs';

export interface CreateTodoDialogData {
  reloadTodoList: Function;
  todoItem?: Todo;
  isEditForm: boolean;
}

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit, OnDestroy {
  today = new Date();
  isEdit = false;

  priorities: number[] = [1, 2, 3]

  private defaultDeadline = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate() + 3
  );

  todoForm = new FormGroup({
    summary: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    description: new FormControl<string>(''),
    dueDate: new FormControl<Date>(this.defaultDeadline),
    completedDate: new FormControl<Date|null>(null),
    priority: new FormControl<number>(1),
  });

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: CreateTodoDialogData,
  ) {}

  ngOnInit(): void {
    this.isEdit = this.data.isEditForm;
    if(this.isEdit) {
      this.todoForm.patchValue({
        ...this.data.todoItem
      })
    }
  }
  
  ngOnDestroy(): void {
    this.isEdit = false;
    this.todoForm.reset();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmitTodoForm(formData: Record<any, any>) {
    if(this.isEdit) {
      this.todoService.updateTodo({...this.data.todoItem ,...formData} as Todo).pipe(delay(2000)).subscribe(() => {
        alert('Todo Item Updated');
        this.data.reloadTodoList();
        this.onClose();
      })
    }
    else {
      this.todoService
      .createTodo({ ...formData, isCompleted: false } as Todo)
      .subscribe(() => {
        this.data.reloadTodoList();
        this.onClose();
      });
    }
  }
}
