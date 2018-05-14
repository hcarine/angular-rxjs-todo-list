import { Injectable } from '@angular/core';
import { Task, Tasks } from './app.interfaces';

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TodolistService {
    tasks: Tasks = [];
    constructor() { }

    addTask(newTask: Task) {
        this.tasks = [...this.tasks, newTask];
        return this;
    }

    completeTask(taskId: number) {
        const itemIndex = this.tasks.findIndex((item: Task) => item.id === taskId);
        this.tasks = this.tasks.map((item: Task, index: number) => index === itemIndex ? {...item, isDone: !item.isDone} : item);
        return this;
    }

    removeTask(taskId: number) {
        this.tasks = this.tasks.filter((item: Task) => item.id !== taskId);
        return this;
    }

    removeCompleted() {
        this.tasks = this.tasks.filter((item: Task) => !item.isDone);
        return this;
    }

    getTasks(status: boolean): Observable<Tasks> {
        // Convert to observable object
        let results: any = [];
        const tasksObservable = of(this.tasks.filter(item => item.isDone === status));
        const subscription = tasksObservable.subscribe(
            val => {
                results = val;
            },
            error => console.log(error),
            () => console.log('Done')
        );
        subscription.unsubscribe(); // For performance
        return results;
    }
}
