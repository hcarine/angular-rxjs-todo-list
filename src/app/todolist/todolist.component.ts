import { Component, OnInit, Input } from '@angular/core';
import { Task, Tasks } from '../app.interfaces';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
    @Input()taskStatus: boolean;

    statusText: string;
    taskList: Tasks;

    constructor(private todolistService: TodolistService) { }

    ngOnInit() {
        this.todolistService.getTasks(this.taskStatus)
                            .subscribe(listByStatus => {
                                console.log('within todolis-component-subscribe-before', this.taskStatus, listByStatus);
                                this.taskList = listByStatus;
                                this.statusText = this.taskStatus ? 'Completed tasks' : 'Uncompleted tasks';
                                console.log('within todolis-component-subscribe-after', this.taskStatus, listByStatus);
                                console.log('get direct from service', this.todolistService.tasks.filter(item => item.isDone));
                            });
    }

    // Auto listen to the service and get its values from method getAllTasks()
    /* get getTaskList() {
        return this.todolistService.getTasks(this.taskStatus);
    } */

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

