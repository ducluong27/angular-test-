import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() color: string;
  @Output() btnClick = new EventEmitter();
  @Output() onGetEdit: EventEmitter<boolean> = new EventEmitter();
  isEdit: boolean = false;
  constructor() {
    this.text = '';
    this.color = '';
  }
  onClick() {
    this.btnClick.emit();
    this.onGetEdit.emit(this.isEdit)
  }
}