import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tasks } from './app.interfaces';
import { TodolistService } from './todolist.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    taskList: Tasks;
    subscription: Subscription;

    constructor(private todolistService: TodolistService) {}

    ngOnInit() {
        this.subscription = this.todolistService.getTasks()
            .subscribe(list => {
                this.taskList = list;
            });
    }

    ngOnDestroy() {
        // For performance
        this.subscription.unsubscribe();
    }

    // Auto listen to the service and get its values from method getAllTasks()
    filteredTaskList(status: boolean, tasks: Tasks) {
        return this.todolistService.filteredTasks(status, tasks);
    }
}
