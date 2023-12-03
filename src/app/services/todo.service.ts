import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface Todo {
  _id: string;
  title: string;
  completed?: boolean;
  description: string;
  date: string;
}

const TODO_KEY = 'TODO_KEY';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  END_POINT = `${environment.baseUrl}/todos`;

  selectedTodo = new BehaviorSubject<Todo | undefined>(undefined);
  selectedTodo$ = this.selectedTodo.asObservable();

  currentTodos = new BehaviorSubject<Todo[]>([]);
  currentTodos$ = this.currentTodos.asObservable();

  constructor(private _httpSrv: HttpClient) {}

  setSelectedTodo(todo?: Todo) {
    this.selectedTodo.next(todo);
  }

  getSelectedTodo() {
    this.selectedTodo.getValue();
  }

  getTodos(): Observable<Todo[]> {
    return this._httpSrv.get<Todo[]>(this.END_POINT).pipe(
      tap((todos) => {
        this.currentTodos.next(todos);
      })
    );
  }

  saveTodo(todo: Partial<Todo>) {
    if (!todo.title) throw 'NO TITLE';

    const todos = this.currentTodos.value;

    return this._httpSrv.post<Todo>(this.END_POINT, todo).pipe(
      tap((newTodo) => {
        todos.unshift(newTodo);

        this.currentTodos.next([...todos]);
      })
    );
  }

  updateTodo(newTodo: Partial<Todo>): Observable<Todo | null> {
    if (!newTodo) return of();

    return this._httpSrv.put<Todo>(this.END_POINT, newTodo).pipe(
      map((todo) => {
        const todos = this.currentTodos.value;

        const index = todos.findIndex(({ _id }) => _id === todo._id);

        if (index === -1) return null;

        todos[index] = todo;

        this.currentTodos.next([...todos]);

        return todo;
      })
    );
  }

  deleteTodo(_id: string) {
    return this._httpSrv.delete(`${this.END_POINT}?_id=${_id}`).pipe(
      tap(() => {
        const todos = [...this.currentTodos.value];
        const findIndex = todos.findIndex((todo) => todo._id === _id);

        if (findIndex === -1) return;

        todos.splice(findIndex, 1);

        if (this.selectedTodo.value?._id === _id) {
          this.selectedTodo.next(undefined);
        }

        this.currentTodos.next([...todos]);
      })
    );
  }

  getElementById(_id: string) {
    return this._httpSrv.get<Todo>(`${this.END_POINT}/${_id}`).pipe(
      tap((res) => {
        this.setSelectedTodo(res);
      })
    );
  }
}
