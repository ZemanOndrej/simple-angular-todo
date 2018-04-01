import { Component, OnInit, } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos)
  }

  addTodo(text: string): void {
    text = text.trim();
    if (!text) return;

    this.todoService.addTodo(new Todo({text: text }))
      .subscribe(t => {
        this.todos.push(t);
      });
  }

  removeTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.removeTodo(todo).subscribe();
  }

  editState(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe();
    this.updateTodo(todo);
  }

  editTodo(todo: Todo): void {
    todo.isEditing = true;
    this.updateTodo(todo);

  }

  saveTodo(todo: Todo): void {
    todo.isEditing = false;
    this.updateTodo(todo);
    this.todoService.updateTodo(todo).subscribe();
  }

  updateTodo(todo: Todo): void {
    this.todos = this.todos.map(el => {
      if (el.id === todo.id) {
        return Object.assign(el, todo);
      }
      return el;
    });
  }

}
