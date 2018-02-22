import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo';
import { of } from 'rxjs/observable/of';
import { JsonPipe } from '@angular/common';

const listName = 'NGTodoList';

@Injectable()
export class TodoService {

  constructor() { }

  getTodos(): Observable<Todo[]> {
    let list: Array<Todo> = JSON.parse(localStorage.getItem(listName));

    if (!list) {
      list = [];
    }
    return of(list);
  }

  addTodo(todo: Todo): Observable<Todo> {
    let list: Array<Todo> = JSON.parse(localStorage.getItem(listName));
    if (!list) {
      list = []
    }
    todo.id = Math.max.apply(Math, list.map(function (o) { return o.id; })) + 1;
    if (todo.id === -Infinity) {
      todo.id = 1;
    }
    todo.completed = false;
    list.push(todo);
    localStorage.setItem(listName, JSON.stringify(list));
    return of(todo);
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    let list: Array<Todo> = JSON.parse(localStorage.getItem(listName));
    todo = list.find(t => t.id === id);
    localStorage.setItem(listName, JSON.stringify(list.filter(t => t !== todo)))
    return of(todo);

  }

  updateTodo(todo: Todo): Observable<Todo> {
    let list: Array<Todo> = JSON.parse(localStorage.getItem(listName));
    list = list.map(
      el => el.id === todo.id ? Object.assign(el, todo) : el
    );
    localStorage.setItem(listName, JSON.stringify(list));
    return of(todo);

  }
}
