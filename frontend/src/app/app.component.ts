import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'yellow-todo-app';
  todos: any[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo({ task: this.newTodo, completed: false }).subscribe(() => {
        this.newTodo = '';
        this.getTodos();
      });
    }
  }

  toggleComplete(todo: any): void {
    this.todoService.updateTodo(this.todos.indexOf(todo), { completed: !todo.completed }).subscribe(() => {
      this.getTodos();
    });
  }

  deleteTodo(todo: any): void {
    // Bug 4: Incorrect usage of todo.id, no ID on frontend
    this.todoService.deleteTodo(this.todos.indexOf(todo)).subscribe(() => {
      this.getTodos();
    });
  }
}
