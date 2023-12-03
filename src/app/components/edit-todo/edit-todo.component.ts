import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TITLE_MAX_LENGTH,
  getTodoTitleFormControl,
} from '../../common/forms/todo.forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent {
  TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;

  loading: boolean = false;
  private _destroy = new Subject();

  todoFormGroup: FormGroup = new FormGroup({
    title: getTodoTitleFormControl(),
  });

  constructor(public todoSrv: TodoService) {
    this._initSelectTodoListener().subscribe();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  submitHandler() {
    if (!this.todoFormGroup.valid) return;

    this.loading = true;
    this.todoSrv.updateTodo(this.todoFormGroup.value).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  deleteTodo() {
    const { _id } = this.todoFormGroup.value;

    if (!_id) return;

    this.todoSrv.deleteTodo(_id).subscribe();
  }

  private _initSelectTodoListener() {
    return this.todoSrv.selectedTodo$.pipe(
      takeUntil(this._destroy),
      filter(Boolean),
      tap((todo) => {
        this.todoFormGroup = new FormGroup({
          _id: new FormControl(todo._id),
          title: getTodoTitleFormControl(todo.title),
          description: new FormControl(todo.description),
        });
      })
    );
  }
}
