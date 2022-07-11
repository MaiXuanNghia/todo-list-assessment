import { Injectable } from "@angular/core";
import { gql, Query, TypedDocumentNode } from "apollo-angular";
import { EmptyObject } from "apollo-angular/types";
import { DocumentNode } from "graphql";
import { Todo } from "../todo.interface";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
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
export class GetTodos extends Query<{getTodos: Todo[]}> {
    override document = GET_TODOS;
}