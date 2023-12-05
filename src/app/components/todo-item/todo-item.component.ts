import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo, TodoService } from '../../services/todo.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  completeFormControl!: FormControl;

  private _destroy = new Subject();

  constructor(private _todoSrv: TodoService) {}

  ngOnInit(): void {
    this.completeFormControl = new FormControl(!!this.todo.completed);

    this.completeFormControl.valueChanges
      .pipe(
        takeUntil(this._destroy),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((completed) => {
          return this._todoSrv.updateTodo({ ...this.todo, completed });
        }),
        map((res) => {
          if (!res) return;

          this.todo.completed = res.completed;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  selectItem() {
    this._todoSrv.setSelectedTodo({ ...this.todo });
  }
}
