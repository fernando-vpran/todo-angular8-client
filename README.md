# Todolist App - Angular 8 Client

### Introduction
This is a simple todolist interface, that retrieves the list of tasks from an API (check out the Django API project here: <https://github.com/fernando-vpran/todo-django-rest-api>)

### Features
- Basic CRUD operations 
	- create a task
	- retrieve list of tasks
	- update task name
	- update task status (mark as complete)
	- delete task
- Filter tasks by status
	- all tasks
	- to-do
	- done
- Task Counter (number of **to-do** and **done** tasks)

### Requirements
- Make sure you have **Node.js** installed... Run `node -v` in the terminal to check the current installed version
	- check the LTS version at <https://nodejs.org/en>


- Package Manager for Node (npm, yarn, pnpm, or another)

### Install all project dependencies
	cd ./todo-angular8-client
	npm i

### Run the app
_* the default port is 4200, but you need to run it on port 8081 to connect with my Django API_

	ng serve --port 8081
