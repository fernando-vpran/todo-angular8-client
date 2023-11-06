import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  constructor(private http: HttpClient) { }

  // get all tasks
  getAll() {
    return this.http.get(baseUrl);
  }

  // get tasks filtered by status ('done' | 'undone' )
  getByStatus(status: string) {
    return this.http.get(`${baseUrl}/status/${status}`);
  }

  // create a task
  create(data: {name: string}) {
    return this.http.post(baseUrl, data);
  }

  // update a task
  update(id: number, data: {name: string, done: boolean}) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // delete a task
  delete(id: number) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
