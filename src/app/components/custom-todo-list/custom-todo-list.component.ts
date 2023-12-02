import { Component } from '@angular/core';

import { Subject, takeUntil, tap } from 'rxjs';
import { Todo, TodoService } from '../../services/todo.service';
import { getTodoTitleFormControl } from '../../common/forms/todo.forms';

@Component({
  selector: 'custom-todo-list',
  templateUrl: './custom-todo-list.component.html',
  styleUrls: ['./custom-todo-list.component.scss'],
})
export class CustomTodoListComponent {
  maxLength = 12;
  newTodo = getTodoTitleFormControl();

  todoInputBlur = new Subject();

  todoList: Todo[] = [];

  private _destroy = new Subject<boolean>();
  constructor(public todoSrv: TodoService) {
    this._initInputBlurValuechanges();
  }

  ngOnInit(): void {
    this._getTodos();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  trackBy(index: number, todo: Todo): string {
    return todo.id;
  }

  private _initInputBlurValuechanges() {
    this.todoInputBlur
      .asObservable()
      .pipe(
        takeUntil(this._destroy),
        tap(() => {
          const { valid, value } = this.newTodo;

          if (!valid) return;

          this._saveNewTodo(value);
        })
      )
      .subscribe();
  }

  private _getTodos() {
    this.todoSrv.getTodos().subscribe((res) => {
      this.todoList = [...res];
    });
  }

  private _saveNewTodo(title: string) {
    this.todoSrv.saveTodo({ title, description: '' }).subscribe(() => {
      this.newTodo.reset();
      this._getTodos();
    });
  }
}
