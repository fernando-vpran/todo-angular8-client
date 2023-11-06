import { Component, Output, EventEmitter } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {
  @Output() todoAdded = new EventEmitter<void>();
  todo: {name: string, done: boolean} = {
    name: '',
    done: false
  };

  constructor(private todolistService: TodolistService) { }

  // Create a new To-Do
  addTodo() {
    const data = {
      name: this.todo.name.trim()
    };
    this.todolistService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.todoAdded.emit();
          // this.submitted = true;
          this.newTodo()
        },
        error => {
          console.log(error);
        });
  }

  // Set up a To-Do to be added next
  newTodo() {
    this.todo = {
      name: '',
      done: false
    };
  }
}
