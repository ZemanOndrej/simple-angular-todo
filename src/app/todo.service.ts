import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo';
import { of } from 'rxjs/observable/of';
import { JsonPipe } from '@angular/common';
import {AppSettings}from "./app-settings";

@Injectable()
export class TodoService {

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of(this.getStorage());
  }

  addTodo(todo: Todo): Observable<Todo> {
    let list = this.getStorage();
    todo.id = Math.max.apply(Math, list.map(function (o) { return o.id; })) + 1;
    if (todo.id === -Infinity) {
      todo.id = 1;
    }
    todo.completed = false;
    list.push(todo);
    this.updateStorage(list);
    return of(todo);
  }

  removeTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    let list = this.getStorage();
    todo = list.find(t => t.id === id);
    this.updateStorage(list.filter(t => t !== todo));

    return of(todo);

  }

  updateTodo(todo: Todo): Observable<Todo> {
    let list = this.getStorage();
    list = list.map(
      el => el.id === todo.id ? Object.assign(el, todo) : el
    );
    this.updateStorage(list);
    return of(todo);

  }

  private updateStorage(todos: Array<Todo>): void {
    todos.forEach((part, index) => {
      delete todos[index].isEditing;
    });
    localStorage.setItem(AppSettings.STORAGE_NAME, JSON.stringify(todos));
  }

  private getStorage(): Array<Todo> {

    let tmp = localStorage.getItem(AppSettings.STORAGE_NAME)
    if (!tmp || tmp == undefined || tmp === "undefined") {
      tmp = "[]";
    }

    return JSON.parse(tmp) as Array<Todo>;
  }
}
