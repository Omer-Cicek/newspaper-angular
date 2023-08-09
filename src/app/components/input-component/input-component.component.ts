import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.css'],
})
export class InputComponentComponent {
  @Output() inputValueChange: EventEmitter<any> = new EventEmitter();

  valueInput: string = '';

  passTheData() {
    this.inputValueChange.emit(this.valueInput); // Emit the input value
  }

  onHeaderValueChange(event: any) {
    this.valueInput = event.target.value;
  }
}
