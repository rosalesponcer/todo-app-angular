import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

export interface Todo {
  id: string;
  title: string;
  completed?: boolean;
  description: string;
}

const TODO_KEY = 'TODO_KEY';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  selectedTodo = new BehaviorSubject<Todo | undefined>(undefined);
  selectedTodo$ = this.selectedTodo.asObservable();

  constructor() {}

  setSelectedTodo(todo?: Todo) {
    this.selectedTodo.next(todo);
  }

  getSelectedTodo() {
    this.selectedTodo.getValue();
  }

  getTodos(): Observable<Todo[]> {
    const todosString = localStorage.getItem(TODO_KEY);

    if (!todosString) return of([]);

    const todoObject = JSON.parse(todosString) ?? [];

    return of(todoObject);
  }

  saveTodo(todo: Partial<Todo>) {
    if (!todo.title) throw 'NO TITLE';

    const id = crypto.randomUUID();

    return this.getTodos().pipe(
      map((todos) => {
        const newTodo = {
          ...todo,
          id,
        } as Todo;

        todos.unshift(newTodo);

        localStorage.setItem(TODO_KEY, JSON.stringify(todos));

        return newTodo;
      })
    );
  }

  updateTodo(newTodo: Partial<Todo>): Observable<Todo | null> {
    if (!newTodo) return of();

    return this.getTodos().pipe(
      map((todos) => {
        console.log('updateTodo');

        let findIndex = todos.findIndex((todo) => newTodo.id === todo.id);

        if (findIndex === -1) return null;

        todos[findIndex] = { ...todos[findIndex], ...newTodo };

        localStorage.setItem(TODO_KEY, JSON.stringify(todos));

        return { ...todos[findIndex] };
      })
    );
  }
}
