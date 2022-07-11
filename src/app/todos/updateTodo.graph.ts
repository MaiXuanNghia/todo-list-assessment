import { Injectable } from "@angular/core";
import { gql, Mutation } from "apollo-angular";
import { Todo } from "../todo.interface";

const CREATE_TODO = gql`
  mutation UpdateTodo($id: String, $summary: String, $description: String, $isCompleted: Boolean = false, $dueDate: Date, $priority: Int) {
    updateTodo(id: $id, summary: $summary, description: $description, isCompleted: $isCompleted, dueDate: $dueDate, priority: $priority) {
      _id
      summary
      description
      isCompleted
      dueDate
      priority
    }
  }
`
@Injectable({
    providedIn: "root"
})
export class UpdateTodo extends Mutation {
    override document = CREATE_TODO;
}