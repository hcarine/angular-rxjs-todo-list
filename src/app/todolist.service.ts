import { Injectable } from '@angular/core';
import { Task, Tasks } from './app.interfaces';

import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodolistService {
    tasks: Tasks = [];
    observer: any;

    constructor() {
        this.tasks = [];
    }

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

    getTasks(status: boolean): Observable<Tasks> {
        // Convert to observable object
        /* let results: any = [];
        const tasksObservable = of(this.tasks.filter(item => item.isDone === status));
        const subscription = tasksObservable.subscribe(
            val => {
                results = val;
            },
            error => console.log(error),
            () => console.log('Done')
        );
        subscription.unsubscribe(); // For performance
        return results; */

        return new Observable(localObserver => { // create obsercerable object
            console.log('service-status', status);
            this.observer = localObserver; // convert this.observer to Observable's child object which is observer
            const filteredTasks = this.tasks.filter(item => item.isDone === status);
            localObserver.next(filteredTasks);
        });
    }
}
