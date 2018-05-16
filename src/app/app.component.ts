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
        // Auto listening from service
        this.subscription = this.todolistService.getTasks()
                                .subscribe(list => {
                                    this.taskList = list;
                                });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe(); // For performance
    }

    filteredTaskList(status: boolean, tasks: Tasks) {
        return this.todolistService.filteredTasks(status, tasks);
    }
}
