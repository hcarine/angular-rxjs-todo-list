import { Injectable } from '@angular/core';
import { Task, Tasks } from './app.interfaces';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodolistService {
    tasks: Tasks = [];
    observer: any;

    constructor() { }

    addTask(newTask: Task) {
        this.tasks = [...this.tasks, newTask];
        this.observer.next(this.tasks);
    }

    completeTask(taskId: number) {
        const itemIndex = this.tasks.findIndex((item: Task) => item.id === taskId);
        this.tasks = this.tasks.map((item: Task, index: number) => index === itemIndex ? {...item, isDone: !item.isDone} : item);
        this.observer.next(this.tasks);
    }

    removeTask(taskId: number) {
        this.tasks = this.tasks.filter((item: Task) => item.id !== taskId);
        this.observer.next(this.tasks);
    }

    removeCompleted() {
        this.tasks = this.tasks.filter((item: Task) => !item.isDone);
        this.observer.next(this.tasks);
    }

    getTasks(): Observable<Tasks> {
        return new Observable(localObserver => { // create observable object
            this.observer = localObserver; // convert this.observer from any to Observable's child object which is observer
            this.observer.next(this.tasks);
        });
    }

    filteredTasks(status: boolean, taskList: Tasks) {
        return taskList.filter(item => item.isDone === status);
    }
}
