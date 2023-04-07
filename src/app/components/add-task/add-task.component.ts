import { UiService } from './../../services/ui.service';
import { Subscription } from 'rxjs';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/Task';
import {v4 as uuidv4} from 'uuid';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onGetFuncEdit: EventEmitter<any> = new EventEmitter();
  @Input() taskEdit: Task = {
    id:"",
    text:"",
    day:"",
    reminder:false,
  };
  @Input() isEdit: boolean = false;
  taskForm: FormGroup;
  // id: string ='';
  // text: string = '';
  // day: string = '';
  // reminder: boolean = false;
  subscription: Subscription;
  showAddTask: boolean = false;
  constructor(private uiService:UiService, private taskService: TaskService, private _fb: FormBuilder){
    this.subscription=this.uiService.onToggle().subscribe(value => this.showAddTask = value);    
    this.taskForm = _fb.group({
      id: '',
      text: '',
      day: '',
      reminder: ''
    });
  }
  ngOnInit(){
    this.taskForm = this._fb.group({
      id: uuidv4(),
      text: '',
      day: '',
      reminder: false
    });
    this.onGetFuncEdit.emit(this.updateForm);
    if(this.isEdit) {
      console.log();
      
    }
  }
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskForm.value
      console.log(this.taskForm.value);
      if(!this.isEdit) {
        this.onAddTask.emit(this.taskForm.value);
      }
      else {

      }
    }
  }
  updateForm() {
    if( this.isEdit ){
      this.taskForm.patchValue({
        text: this.taskEdit.text,
        day: this.taskEdit.day,
        reminder: this.taskEdit.reminder
      })
    }
  }
}
