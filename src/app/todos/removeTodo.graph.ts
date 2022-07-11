import { Injectable } from "@angular/core";
import { gql, Mutation } from "apollo-angular";
import { Todo } from "../todo.interface";

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String) {
    removeTodo(id: $id) {
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
export class RemoveTodo extends Mutation<{removePosts: Todo[]}> {
    override document = REMOVE_TODO;
}