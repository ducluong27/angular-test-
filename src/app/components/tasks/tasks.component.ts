import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TASKS } from '../../mock-tasks';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  taskEdit: Task = {
    id:"",
    text:"",
    day:"",
    reminder:false,
  };
  func: any;
  isEdit: boolean = false;
  showAddTask: boolean = false;
  constructor(private taskService: TaskService) {

  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      // console.log(tasks[0].text);
    });
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    });
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateRemiderTask(task).subscribe();
  }
  addTask(task: Task) {
    console.log(task);
    
    this.taskService.addTask(task).subscribe(() => this.tasks.push(task));
  }
  getTaskEdit(task: Task){
    // console.log(task);
    
    this.taskEdit = task;
  }
  getIsEdit(isEdit: boolean){
    this.isEdit = isEdit;
    console.log(isEdit);
  }
  getFunctionEdit (func: any) {
    this.func = func;
  }
}
