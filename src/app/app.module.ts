import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomTodoListComponent } from './components/custom-todo-list/custom-todo-list.component';
import { MainViewComponent } from './view/main-view/main-view.component';
import { PrimeNgModule } from './primeng.module';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { EditViewComponent } from './view/edit-view/edit-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTodoListComponent,
    MainViewComponent,
    TodoItemComponent,
    EditTodoComponent,
    EditViewComponent,
  ],
  providers: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
