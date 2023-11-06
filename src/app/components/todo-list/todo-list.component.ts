import { Component, OnInit } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalTodoDeleteComponent } from '../modal-todo-delete/modal-todo-delete.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todoItems: any = [];
  currentTodo: any = null;
  currentIndex: number = -1;
  numItemsTodo: number = 0;
  numItemsDone: number = 0;

  constructor(
    private todolistService: TodolistService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.retrieveAllTasks();
  }

  // *** "GET TASKS" METHODS ***
  // Get all tasks
  retrieveAllTasks() {
    this.todolistService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.todoItems = data;
          this.refreshCounters(data);
        },
        error => {
          console.log(error);
        });
  }

  // Get tasks by status 'done' = (True | False)
  retrieveByStatus(status: boolean) {
    let strStatus: string = '';

    // "done" tasks -> status = 'true'
    // "to-do" tasks -> status = 'false'
    if (status) {
      strStatus = 'done'
    } else { strStatus = 'undone' }

    this.todolistService.getByStatus(strStatus)
      .subscribe(
        data => {
          this.todoItems = data;
          this.refreshCounters(data);
        },
        error => {
          console.log(error);
        });
  }

  // *** "AUX" METHODS ***
  // Check current status filter and refresh the list
  refreshList() {
    let filter_option = this.checkFilterButtons();
    this.filterHandler(filter_option);
  }

  // Select To-Do that is being edited
  setActiveTodo(todo: any, index: number) {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  // Clear selected To-Do
  clearActiveTodo() {
    this.currentTodo = null;
    this.currentIndex = -1;
  }

  // *** "FILTER" METHODS ***
  // Check which radio button is set as "checked" and returns a 'filter' string
  checkFilterButtons() {
    const btnFilterAll = document.getElementById('opt-all') as HTMLInputElement;
    const btnFilterTodo = document.getElementById('opt-todo') as HTMLInputElement;
    const btnFilterDone = document.getElementById('opt-done') as HTMLInputElement;
    let filter = '';

    if (btnFilterAll.checked) {
      filter = '';
    }
    else if (btnFilterTodo.checked) {
      filter = 'todo';
    }
    else if (btnFilterDone.checked) {
      filter = 'done';
    }

    return filter;
  }
  
  // Get the tasks according to the given 'filter_option'
  filterHandler(filter_option: string) {
    if (filter_option == '') {
      this.retrieveAllTasks();
    }
    else if (filter_option == 'todo') {
      this.retrieveByStatus(false);
    }
    else if (filter_option == 'done') {
      this.retrieveByStatus(true);
    }

    this.clearActiveTodo();
  }

  // *** "TASK COUNTER" METHODS ***
  // Refresh the values of the task counters "to-do" and "done"
  refreshCounters(data: any) {
    this.numItemsDone = 0;
    this.numItemsTodo = 0;

    for (const item of data) {
      if (item.done === true) {
        this.numItemsDone++; // Increments the counter of tasks "done"
      }
      else {
        this.numItemsTodo++; // Increments the counter of tasks "to-do"
      }
    }
  }

  // *** "UPDATE" METHODS ***
  // Update task 'done' property = (True | False), according to the checkbox value
  updateStatus(todo: any, index: number) {
    const inputElement = document.getElementById(`todo-checkbox-${index}`) as HTMLInputElement;

    // Ensure the input element is not null before proceeding
    if (inputElement) {
      // Get the 'checked' status of the checkbox input
      const updatedStatus = inputElement.checked;

      // Update the 'done' property of the selected todo
      todo.done = updatedStatus;

      this.todolistService.update(todo.id, todo)
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }

  // Update task 'name' property
  updateName(todo: any, index: number) {
    const inputElement = document.getElementById(`todo-input-${index}`) as HTMLInputElement;

    // Ensure the input element is not null before proceeding
    if (inputElement) {
      // Get the value of the input field
      const updatedName = inputElement.value.trim();

      // Update the name property of the selected todo
      todo.name = updatedName;

      this.todolistService.update(todo.id, todo)
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
          },
          error => {
            console.log(error);
          });
    }
  }

  // *** "DELETE" METHODS ***
  // Delete task
  deleteTodo(todo: any) {
    this.todolistService.delete(todo.id)
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  // Open modal window to confirm the delete action
  openDeleteConfirmation(todo: any) {
    const modalRef = this.modalService.open(ModalTodoDeleteComponent);
    modalRef.componentInstance.todo = todo;

    modalRef.result.then(
      (result) => {
        if (result === 'Confirm click') {
          this.deleteTodo(todo);
        }
      }
    );
  }
}