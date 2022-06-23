import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  createTodoForm = new FormGroup({
    summary: new FormControl(''),
    description: new FormControl(''),
    isCompleted: new FormControl(''),
    dueDate: new FormControl(''),
    priority: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
