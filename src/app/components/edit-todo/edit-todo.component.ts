import { Component, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  Subject,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  takeUntil,
  tap,
} from 'rxjs';
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
  @Input() fullWidth: boolean = false;
  TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
  minDate = new Date();
  value: string = '';
  loading: boolean = false;
  private _destroy = new Subject();

  todoFormGroup: FormGroup = new FormGroup({
    title: getTodoTitleFormControl(),
    description: new FormControl(''),
    dateControl: new FormControl(''),
    date: new FormControl(''),
    _id: new FormControl(''),
  });

  private _dateFormatter = new Intl.DateTimeFormat('en-US');

  dateFormControl = new FormControl('');

  constructor(public todoSrv: TodoService) {
    this._initSelectTodoListener().subscribe();

    this._dateListener().subscribe();

    this.minDate = this._getMinDay();
  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  submitHandler() {
    if (!this.todoFormGroup.valid) return;

    this.loading = true;

    const formValue = { ...this.todoFormGroup.value };
    delete formValue.dateControl;

    this.todoSrv.updateTodo(formValue).subscribe({
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

  private _dateListener() {
    return this.todoFormGroup.get('dateControl')!.valueChanges.pipe(
      takeUntil(this._destroy),
      tap((res) => console.log('_dateListener', res)),
      map((date) => {
        return date ? this._dateFormatter.format(date as Date) : '';
      }),
      startWith(''),
      distinctUntilChanged(),
      tap((res) => {
        this.todoFormGroup.get('date')!.setValue(res);
      })
    );
  }

  private _initSelectTodoListener() {
    return this.todoSrv.selectedTodo$.pipe(
      takeUntil(this._destroy),
      filter(Boolean),
      tap((todo) => {
        this.todoFormGroup.patchValue({
          _id: todo._id,
          title: todo.title,
          description: todo.description,
          date: todo.date,
          dateControl: todo.date ? new Date(todo.date) : '',
        });
      })
    );
  }

  private _getMinDay() {
    let actualDate = new Date();

    // Restar un día a la fecha actual
    actualDate.setDate(actualDate.getDate() - 1);

    // Obtener el año, mes y día por separado
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth() + 1; // ¡Recuerda que los meses comienzan desde 0!
    let day = actualDate.getDate();

    // Formatear la fecha como desees (por ejemplo, como una cadena YYYY-MM-DD)
    let berofeDay =
      (month < 10 ? '0' : '') +
      month +
      '/' +
      (day < 10 ? '0' : '') +
      day +
      '/' +
      year;

    return new Date(berofeDay);
  }
}
