import { Component, OnInit } from '@angular/core';
import { Task, Tasks } from '../app.interfaces';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
    constructor(private todolistService: TodolistService) { }

    ngOnInit() {}

    // Auto listen to the service and get its values from method getAllTasks()
    get completedTasks() {
        return this.todolistService.getTasks(true);
    }

    get uncompletedTasks() {
        return this.todolistService.getTasks(false);
    }

    handleCheck(taskId: number) {
        this.todolistService.completeTask(taskId);
    }

    handleRemove(taskId: number) {
        this.todolistService.removeTask(taskId);
    }

    handleRemoveCompleted() {
        this.todolistService.removeCompleted();
    }
}

