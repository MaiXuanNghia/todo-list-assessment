import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  void: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateTodoArgs = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  priority?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveTodoArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTodoArgs = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Scalars['Int']>;
  summary?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getTodo?: Maybe<Todo>;
  getTodos?: Maybe<Array<Maybe<Todo>>>;
};


export type QueryGetTodoArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetTodosArgs = {
  term?: InputMaybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  _id?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  priority?: Maybe<Scalars['Int']>;
  summary?: Maybe<Scalars['String']>;
};
