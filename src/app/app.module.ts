import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {ApolloModule, APOLLO_OPTIONS, APOLLO_FLAGS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { FinishDirective } from './directives/finished-item.directive';
import { HightLightDirective } from './directives/hightlight.directive';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { IndicatorComponent } from './indicator/indicator.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoListComponent,
    FinishDirective,
    HightLightDirective,
    CreateTodoComponent,
    ConfirmDialogComponent,
    IndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatIconModule,
    ApolloModule
  ],
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useInitialLoading: true, // enable it here
      },
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql?',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
