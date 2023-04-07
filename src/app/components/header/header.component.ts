import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() onGetIsEdit: EventEmitter<boolean> = new EventEmitter();
  title: string = "Tasks Tracker";
  showAddTask: boolean = false;
  isEdit: boolean = true;
  subscription: Subscription
  constructor(private uiService: UiService){
    this.subscription=this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }
  getEdit(isEdit: boolean) {
    this.isEdit = isEdit;
    this.onGetIsEdit.emit(this.isEdit)
  }
}
