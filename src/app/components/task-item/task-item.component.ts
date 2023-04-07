import { Subscription } from 'rxjs';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task = {
    id: '',
    text: '',
    day: '',
    reminder: true,
  };
  @Input() func: any;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onGetTaskEdit: EventEmitter<Task> = new EventEmitter();
  @Output() onGetIsEdit: EventEmitter<any> = new EventEmitter();
  isEdit: boolean = true;
  faTimes = faTimes;
  faEdit = faEdit;
  showAddTask: boolean = false;
  subscription: Subscription;
  constructor(private uiService: UiService) {
    this.subscription=this.uiService.onToggle().subscribe(value => this.showAddTask = value);
    this.isEdit= true;
  }
  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }
  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
  onEdit(task: Task) {
    this.onGetTaskEdit.emit(task);
    this.onGetIsEdit.emit(this.isEdit);
    this.func;
    if(this.showAddTask === true) {

    }
    else {
      this.uiService.toggleAddTask();
    }
  }
}
