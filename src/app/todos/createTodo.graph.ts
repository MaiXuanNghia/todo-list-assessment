import { Injectable } from "@angular/core";
import { gql, Mutation } from "apollo-angular";
import { Todo } from "../todo.interface";

const CREATE_TODO = gql`
  mutation CreateTodo($summary: String, $description: String, $dueDate: Date, $priority: Int) {
    createTodo(summary: $summary, description: $description, dueDate: $dueDate, priority: $priority) {
      _id
      summary
      description
      isCompleted
      dueDate
    }
  }
`
@Injectable({
    providedIn: "root"
})
export class CreateTodo extends Mutation {
    override document = CREATE_TODO;
}